var searchtxt = ""
var Common_CountryMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=COMMON_COUNTRYMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_COUNTRYMASTER_CRUD",
        Oper: 'Add',
        addedit: "added",
        File: 'Country.js',
        Masterid: "",
        flagjq: false,
        // for form validation
        frmvalidator: $("#frmCommon_CountryMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },
    initializeJqgrid: function (url) {
        var colNames = ['CountryId', 'Country Name'];
        var colModel = [
             { name: "COUNTRYID", index: "COUNTRYID", xmlmap: xmlvars.common_colmap + "COUNTRYID", stype: 'int', sortable: true, hidden: true, search: false },
             { name: "COUNTRYNAME", index: "COUNTRYNAME", xmlmap: xmlvars.common_colmap + "COUNTRYNAME", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Common_CountryMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'Common_CountryMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Common_CountryMasterView') } });
        }
        if (Common_CountryMasterView.variables.flagjq == false) {
            //$("#table_Common_CountryMaster").GridUnload();
            $.jgrid.gridUnload("#table_Common_CountryMaster");
            $("#table_Common_CountryMaster").jqGrid({
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
                pager: "#pager_Common_CountryMaster",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "COUNTRYID"
                },
                loadComplete: function () {
                    $("#txtsearchboxcountry").focus();
                    // JqGrid navigations shortcuts
                    jQuery("#table_Common_CountryMaster").jqGrid('bindKeys', {
                        "onEnter": function (rowid) {
                            if (isU()) {
                                Common_CountryMasterView.triggerId(rowid, 'edit')
                            }
                        }
                    });
                    //$('#table_Common_CountryMaster').jqGrid('setSelection', $('#table_Common_CountryMaster').jqGrid('getDataIDs')[0]);

                    if ($('#table_Common_CountryMaster').getGridParam('records') === 0) {
                        $('#gview_table_Common_CountryMaster .ui-jqgrid-htable').hide();
                    }
                    else
                        $('#gview_table_Common_CountryMaster .ui-jqgrid-htable').show();

                    setTimeout(function () {
                        var width = $('#jqGrid_Common_CountryMaster').width();
                        if (width <= 630) {
                            width = 700;
                        }
                        $('#table_Common_CountryMaster').setGridWidth(width);
                        $("#gbox_table_Common_CountryMaster").width(width);
                    }, 200);
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'COUNTRYNAME',
                sortorder: 'asc',
            });

            // Setup buttons
            $("#table_Common_CountryMaster").jqGrid('navGrid', '#pager_Common_CountryMaster',
                    { edit: false, add: false, del: false, search: false, refresh: false },
                    { height: 200 }
            );

            $("#pager_Common_CountryMaster_left").css("width", "");
            AlignJqGridHeader('table_Common_CountryMaster', ['edit', 'delete']);
            Common_CountryMasterView.variables.flagjq = true;
        } else {
            $("#txtsearchboxcountry").focus();
            $("#table_Common_CityMaster").jqGrid('setGridParam', { url: getDomain() + Common_CityMasterView.variables.BindMasterUrl, page: 1 }).trigger("reloadGrid");
            setTimeout(function () {
                var width = $('#jqGrid_Common_CountryMaster').width();
                if (width <= 630) {
                    width = 700;
                }
                $('#table_Common_CountryMaster').setGridWidth(width);
                $("#gbox_table_Common_CountryMaster").width(width);
            }, 200);
        }
    },

    triggerInitialClick: function () {
        var url = Common_CountryMasterView.variables.BindMasterUrl;
        Common_CountryMasterView.initializeJqgrid(url);
        Common_CountryMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            $("#hdnCountryId").val(id);
            var rowData = jQuery("#table_Common_CountryMaster").getRowData(id);
            $("#txtCountryId").val(rowData['COUNTRYID']);
            $("#txtCountryName").val(rowData['COUNTRYNAME']);
            $("#panelCommon_CountryMasterEdit").modal('show');
            $("#panelCommon_CountryMasterDelete").modal('hide');
            $("#spanCommon_CountryMasteroper").text("Edit Country");
            Common_CountryMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    },
    deleteRow: function (id) {
        try {
            Common_CountryMasterView.variables.addedit = "deleted";
            Common_CountryMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_Common_CountryMaster").getRowData(id);
            $("#delblCountryName").html(rowData['COUNTRYNAME']);
            $("#hdnCountryId").val(id);

            $("#panelCommon_CountryMasterEdit").modal('hide');
            $("#panelCommon_CountryMasterDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    },
    btnMasterShowAddPanel: function () {
        try {
            Common_CountryMasterView.clearControls();

            $("#panelCommon_CountryMasterEdit").modal('show');
            $("#panelCommon_CountryMasterDelete").modal('hide');
            $("#spanCountryIdoper").text("Add New Country");
            Common_CountryMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    },


    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteCommon_CountryMaster').attr('disabled', true);
            var data = {
                "oper": Common_CountryMasterView.variables.Oper,
                "COUNTRYID": $("#hdnCountryId").val()
            }
            Common_CountryMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    },
    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmCommon_CountryMaster").valid();
            if (!isValid)
                return;

            Common_CountryMasterView.variables.Oper = 'Add';
            Common_CountryMasterView.variables.addedit = "added";
            Common_CountryMasterView.variables.Masterid = $("#hdnCountryId").val();

            if (Common_CountryMasterView.variables.Masterid != "0" && parseInt(Common_CountryMasterView.variables.Masterid) > 0) {
                Common_CountryMasterView.variables.Oper = 'Edit';
                Common_CountryMasterView.variables.addedit = 'updated';
            }

            $('#btnSaveCommon_CountryMaster').attr('disabled', true);
            var data = {
                "COUNTRYNAME": $("#txtCountryName").val(),
                "oper": Common_CountryMasterView.variables.Oper,
                "COUNTRYID": Common_CountryMasterView.variables.Masterid
            }
            Common_CountryMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (Common_CountryMasterView.variables.Oper == 'Delete')
                $('#btnDeleteCommon_CountryMaster').attr('disabled', false);
            else
                $('#btnSaveCommon_CountryMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(Common_CountryMasterView.variables.Oper + ' Operation', 'Record is ' + Common_CountryMasterView.variables.addedit + ' successfully', 'success');
                Common_CountryMasterView.clearControls();
                $("#table_Common_CountryMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#panelCommon_CountryMasterEdit").modal('hide');
            $("#panelCommon_CountryMasterDelete").modal('hide');
            $("#txtCountryId").val("");
            $("#txtCountryName").val("");
            $("#hdnCountryId").val('');
            $("#frmCommon_CountryMaster").validate().resetForm();
            Common_CountryMasterView.variables.Oper = 'Add';
            Common_CountryMasterView.variables.addedit = "added";
            jQuery("#table_list_Common_CountryMaster").jqGrid('resetSelection');
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    },


    savedata: function (data) {
        $.ajax({
            url: getDomain() + Common_CountryMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: Common_CountryMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveCommon_CountryMaster").show();
                $("#dCommon_CountryMasterTitle").show();
                $("#dViewCommon_CountryMasterTitle").hide();
            }
            else {
                if ($("#btnSaveCommon_CountryMaster").length > 0) {
                    $("#btnSaveCommon_CountryMaster").hide();
                }
                $("#dViewCommon_CountryMasterTitle").show();
                $("#dCommon_CountryMasterTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, Common_CountryMasterView.variables.File);
        }
    }
};

$(document).ready(function () {
    try {
        var url = Common_CountryMasterView.variables.BindMasterUrl;
        Common_CountryMasterView.initializeJqgrid(url);
        $("#btnAddCommon_CountryMaster").click(function () {
            Common_CountryMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveCommon_CountryMaster").click(function () {
            Common_CountryMasterView.btnMasterSubmit(Common_CountryMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteCommon_CountryMaster").click(function () {
            Common_CountryMasterView.btnMasterDelete();
        });

        $('button[name="CancelCommon_CountryMaster"]').click(function () {
            Common_CountryMasterView.clearControls();
            //Common_CountryMasterView.variables.frmvalidator.resetform();
        });
        // For focusing on first textbox in modal
        $('#panelCommon_CountryMasterEdit').on('shown.bs.modal', function () {
            $('#txtCountryName').focus();
        });
        $("#txtsearchboxcountry").keyup(function (event) {
            if ($("#txtsearchboxcountry").val().length > 2) {
                var myfilter,
                myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchboxcountry").val() });
                var url = Common_CountryMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                Common_CountryMasterView.variables.flagjq = false;
                Common_CountryMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchboxcountry").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = Common_CountryMasterView.variables.BindMasterUrl;
                Common_CountryMasterView.variables.flagjq = false;
                Common_CountryMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchboxcountry").val().length == 2) {
                var url = Common_CountryMasterView.variables.BindMasterUrl;
                Common_CountryMasterView.variables.flagjq = false;
                Common_CountryMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, Common_CountryMasterView.variables.File);
    }
});