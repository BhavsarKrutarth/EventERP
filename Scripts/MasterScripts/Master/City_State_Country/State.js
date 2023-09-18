var searchtxt = "";
var Common_StateMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=COMMON_STATEMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_STATEMASTER_CRUD",
        BindCountryUrl: "/Common/BindMastersDetails?ServiceName=COMMON_COUNTRYMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        flagjq: false,
        // for form validation
        frmvalidator: $("#frmCommon_StateMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['StateId', 'State Name', 'Country Name', 'CountryId'];
        var colModel = [
            { name: "STATEID", index: "STATEID", xmlmap: xmlvars.common_colmap + "STATEID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "STATENAME", width: 20, index: "STATENAME", xmlmap: xmlvars.common_colmap + "STATENAME", stype: 'text', sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "COUNTRYNAME", width: 70, index: "COUNTRYNAME", xmlmap: xmlvars.common_colmap + "COUNTRYNAME", stype: 'text', sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "COUNTRYID", index: "COUNTRYID", xmlmap: xmlvars.common_colmap + "COUNTRYID", stype: 'int', sortable: false, hidden: true, search: false },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Common_StateMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'Common_StateMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Common_StateMasterView') } });
        }
        if (Common_StateMasterView.variables.flagjq == false) {
            //$("#table_Common_StateMaster").GridUnload();
            $.jgrid.gridUnload("#table_Common_StateMaster");
            $("#table_Common_StateMaster").jqGrid({
                //data: mydata,
                url: getDomain() + url,
                datatype: "xml",
                height: getGridHeight(),
                scroll: 1,
                autowidth: true,
                shrinkToFit: true,
                rowNum: 30,
                rowList: [20, 30, 40],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_Common_StateMaster",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "STATEID"
                },
                loadComplete: function () {
                    $("#txtsearchboxstate").focus();
                    //$('#table_Common_StateMaster').jqGrid('setSelection', $('#table_Common_StateMaster').jqGrid('getDataIDs')[0]);
                    // JqGrid navigations shortcuts
                    jQuery("#table_Common_StateMaster").jqGrid('bindKeys', {
                        "onEnter": function (rowid) {
                            if (isU()) {
                                Common_StateMasterView.triggerId(rowid, 'edit')
                            }
                        }
                    });
                    $("tr.jqgrow:even").addClass('myAltRowClass');

                    // Hide column headers and top pager if no records were returned
                    if ($('#table_Common_StateMaster').getGridParam('records') === 0) {
                        $('.gview_table_Common_StateMaster ui-jqgrid-htable').hide();
                    }
                    else
                        $('.gview_table_Common_StateMaster ui-jqgrid-htable').show();

                    setTimeout(function () {
                        var width = $('#jqGrid_Common_StateMaster').width();
                        if (width <= 630) {
                            width = 700;
                        }
                        $('#table_Common_StateMaster').setGridWidth(width);
                        $("#gbox_table_Common_StateMaster").width(width);
                    }, 200);
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'STATENAME',
                sortorder: 'asc',
            });

            // Setup buttons
            $("#table_Common_StateMaster").jqGrid('navGrid', '#pager_Common_StateMaster',
                { edit: false, add: false, del: false, search: false, refresh: false },
                { height: 200 }
            );

            $("#pager_Common_StateMaster_left").css("width", "");
            AlignJqGridHeader('table_Common_StateMaster', ['edit', 'delete']);
            Common_StateMasterView.variables.flagjq = true;
        } else {
            $("#table_Common_CityMaster").jqGrid('setGridParam', { url: getDomain() + Common_CityMasterView.variables.BindMasterUrl, page: 1 }).trigger("reloadGrid");
            $("#txtsearchboxstate").focus();
            setTimeout(function () {
                var width = $('#jqGrid_Common_StateMaster').width();
                if (width <= 630) {
                    width = 700;
                }
                $('#table_Common_StateMaster').setGridWidth(width);
                $("#gbox_table_Common_StateMaster").width(width);
            }, 200);
        }
    },

    triggerInitialClick: function () {
        var url = Common_StateMasterView.variables.BindMasterUrl;
        Common_StateMasterView.initializeJqgrid(url);
        Common_StateMasterView.clearControls();
        Common_StateMasterView.bindCountry();
    },

    triggerId: function (id) {
        try {
            Common_StateMasterView.bindCountry();
            $("#hdnStateId").val(id);
            var rowData = jQuery("#table_Common_StateMaster").getRowData(id);
            $("#txtStateId").val(rowData['STATEID']);
            $("#txtStateName").val(rowData['STATENAME']);
            //$("#ddlCountryName").val(rowData['COUNTRYID']);
            $("#ddlCountryName").select2();
            var selectedValuesTest = rowData["COUNTRYID"].split(',');
            $('#ddlCountryName').val(selectedValuesTest).trigger("change");
            $("#panelCommon_StateMasterEdit").modal('show');
            $("#panelCommon_StateMasterDelete").modal('hide');
            $("#spanCommon_StateMasteroper").text("Edit State");
            Common_StateMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            Common_StateMasterView.variables.addedit = "deleted";
            Common_StateMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_Common_StateMaster").getRowData(id);
            $("#delblStateName").html(rowData['STATENAME']);
            $("#delblCountryNameS").html(rowData['COUNTRYNAME']);
            $("#hdnStateId").val(id);

            $("#panelCommon_StateMasterEdit").modal('hide');
            $("#panelCommon_StateMasterDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            Common_StateMasterView.clearControls();

            $("#panelCommon_StateMasterEdit").modal('show');
            $("#panelCommon_StateMasterDelete").modal('hide');
            $("#spanStateIdoper").text("Add New State");
            Common_StateMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            $('#btnDeleteCommon_StateMaster').attr('disabled', true);
            var data = {
                "oper": Common_StateMasterView.variables.Oper,
                "STATEID": $("#hdnStateId").val()
            }
            Common_StateMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmCommon_StateMaster").valid();
            if (!isValid)
                return;

            Common_StateMasterView.variables.Oper = 'Add';
            Common_StateMasterView.variables.addedit = "added";
            Common_StateMasterView.variables.Masterid = $("#hdnStateId").val();

            if (Common_StateMasterView.variables.Masterid != "0" && parseInt(Common_StateMasterView.variables.Masterid) > 0) {
                Common_StateMasterView.variables.Oper = 'Edit';
                Common_StateMasterView.variables.addedit = 'updated';
            }

            $('#btnSaveCommon_StateMaster').attr('disabled', true);
            var data = {
                "STATENAME": $("#txtStateName").val(),
                "COUNTRYID": $("#ddlCountryName").val(),
                "oper": Common_StateMasterView.variables.Oper,
                "STATEID": Common_StateMasterView.variables.Masterid
            }
            Common_StateMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (Common_StateMasterView.variables.Oper == 'Delete')
                $('#btnDeleteCommon_StateMaster').attr('disabled', false);
            else
                $('#btnSaveCommon_StateMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(Common_StateMasterView.variables.Oper + ' Operation', 'Record is ' + Common_StateMasterView.variables.addedit + ' successfully', 'success');
                Common_StateMasterView.clearControls();
                $("#table_Common_StateMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#hdnStateId").val('');
            $("#panelCommon_StateMasterEdit").modal('hide');
            $("#panelCommon_StateMasterDelete").modal('hide');
            $("#txtStateId").val("");
            $("#txtStateName").val("");
            $("#ddlCountryName").val("");
            $("#ddlCountryName").select2();
            $("#frmCommon_StateMaster").validate().resetForm();
            Common_StateMasterView.variables.Oper = 'Add';
            Common_StateMasterView.variables.addedit = "added";
            jQuery("#table_list_Common_StateMaster").jqGrid('resetSelection');
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + Common_StateMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: Common_StateMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, Common_StateMasterView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveCommon_StateMaster").show();
            $("#dCommon_StateMasterTitle").show();
            $("#dViewCommon_StateMasterTitle").hide();
        }
        else {
            if ($("#btnSaveCommon_StateMaster").length > 0) {
                $("#btnSaveCommon_StateMaster").hide();
            }
            $("#dViewCommon_StateMasterTitle").show();
            $("#dCommon_StateMasterTitle").hide();
        }
    },

    bindCountry: function () {
        $("#ddlCountryName").html("");
        BindDropdown('ddlCountryName', 'CountryDropdownList', getDomain() + Common_StateMasterView.variables.BindCountryUrl, '--Select Country--', true);
        $("#ddlCountryName").select2();
    }
};

$(document).ready(function () {
    try {
        $("#btnAddCommon_StateMaster").click(function () {
            Common_StateMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveCommon_StateMaster").click(function () {
            Common_StateMasterView.btnMasterSubmit(Common_StateMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteCommon_StateMaster").click(function () {
            Common_StateMasterView.btnMasterDelete();
        });

        $('button[name="CancelCommon_StateMaster"]').click(function () {
            Common_StateMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelCommon_StateMasterEdit').on('shown.bs.modal', function () {
            $('#ddlCountryName').focus();
        });
        $("#txtsearchboxstate").keyup(function (event) {
            if ($("#txtsearchboxstate").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchboxstate").val() });
                var url = Common_StateMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                Common_StateMasterView.variables.flagjq = false;
                Common_StateMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchboxstate").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = Common_StateMasterView.variables.BindMasterUrl;
                Common_StateMasterView.variables.flagjq = false;
                Common_StateMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchboxstate").val().length == 2) {
                var url = Common_StateMasterView.variables.BindMasterUrl;
                Common_StateMasterView.variables.flagjq = false;
                Common_StateMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, Common_StateMasterView.variables.File);
    }
});