var searchtxt = "";
var Common_CityMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_CITYMASTER_CRUD",
        BindStateUrl: "/Common/BindMastersDetails?ServiceName=COMMON_STATEMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        Oper: 'Add',
        addedit: "added",
        File: 'City.js',
        flagjq: false,
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmCommon_CityMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['CityId', 'City Name', 'State Name', 'StateId'];
        var colModel = [
             { name: "CITYID", index: "CITYID", xmlmap: xmlvars.common_colmap + "CITYID", stype: 'int', sortable: true, hidden: true, search: false },
             { name: "CITYNAME", width: 20, index: "CITYNAME", xmlmap: xmlvars.common_colmap + "CITYNAME", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "STATENAME", width: 70, index: "STATENAME", xmlmap: xmlvars.common_colmap + "STATENAME", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
             { name: "STATEID", index: "STATEID", xmlmap: xmlvars.common_colmap + "STATEID", stype: 'int', hidden: true, sortable: true, searchoptions: jqGridVariables.stringSearchOption },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Common_CityMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'Common_CityMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Common_CityMasterView') } });
        }

        if (Common_CityMasterView.variables.flagjq == false) {
            //$("#table_Common_CityMaster").GridUnload();
            $.jgrid.gridUnload("#table_Common_CityMaster");
            $("#table_Common_CityMaster").jqGrid({
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
                pager: "#pager_Common_CityMaster",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "CITYID"
                },
                loadComplete: function () {
                    //$("#txtsearchboxcity").focus();
                    $("tr.jqgrow:even").addClass('myAltRowClass');

                    // Hide column headers and top pager if no records were returned
                    if ($('#table_Common_CityMaster').getGridParam('records') === 0) {
                        $('.gview_table_Common_CityMaster .ui-jqgrid-htable').hide();
                    }
                    else
                        $('.gview_table_Common_CityMaster .ui-jqgrid-htable').show();

                    setTimeout(function () {
                        var width = $('#jqGrid_Common_CityMaster').width();
                        if (width <= 630) {
                            width = 700;
                        }
                        $('#table_Common_CityMaster').setGridWidth(width);
                        $("#gbox_table_Common_CityMaster").width(width);
                    }, 200);

                    // JqGrid navigations shortcuts
                    jQuery("#table_Common_CityMaster").jqGrid('bindKeys', {
                        "onEnter": function (rowid) {
                            if (isU()) {
                                Common_CityMasterView.triggerId(rowid, 'edit')
                            }
                        }
                    });
                    //jQuery("#table_Common_CityMaster").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'CITYNAME',
                sortorder: 'asc',
            });

            // Setup buttons
            $("#table_Common_CityMaster").jqGrid('navGrid', '#pager_Common_CityMaster',
                    { edit: false, add: false, del: false, search: false, refresh: false },
                    { height: 200 }
            );

            $("#pager_Common_CityMaster_left").css("width", "");
            AlignJqGridHeader('table_Common_CityMaster', ['edit', 'delete']);
            Common_CityMasterView.variables.flagjq = true;
        } else {
            $("#table_Common_CityMaster").jqGrid('setGridParam', { url: getDomain() + Common_CityMasterView.variables.BindMasterUrl, page: 1 }).trigger("reloadGrid");
            $("#txtsearchboxcity").focus();
            setTimeout(function () {
                var width = $('#jqGrid_Common_CityMaster').width();
                if (width <= 630) {
                    width = 700;
                }
                $('#table_Common_CityMaster').setGridWidth(width);
                $("#gbox_table_Common_CityMaster").width(width);
            }, 200);
        }

    },

    triggerInitialClick: function () {
        var url = Common_CityMasterView.variables.BindMasterUrl;
        Common_CityMasterView.initializeJqgrid(url);
        Common_CityMasterView.clearControls();
        Common_CityMasterView.bindState();
    },

    triggerId: function (id) {
        try {
            $("#hdnCityId").val(id);
            Common_CityMasterView.bindState();
            var rowData = jQuery("#table_Common_CityMaster").getRowData(id);
            $("#txtCityId").val(rowData['CITYID']);
            $("#txtCityName").val(rowData['CITYNAME']);
            $("#ddlStateName").select2();
            //var selectedValuesTest = rowData["CITYID"].split(',');
            //$('#ddlStateName').val(selectedValuesTest).trigger("change");
            var selectedValuesTest = rowData["STATEID"].split(',');
            $('#ddlStateName').val(selectedValuesTest).trigger("change");
            //$("#ddlStateName").val(rowData['STATEID']);
            $("#panelCommon_CityMasterEdit").modal('show');
            $("#panelCommon_CityMasterDelete").hide();
            $("#spanCommon_CityMasteroper").text("Edit City");
            Common_CityMasterView.showTitlePermissionWise('edit');
        }
        catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            Common_CityMasterView.variables.addedit = "deleted";
            Common_CityMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_Common_CityMaster").getRowData(id);
            $("#delblCityName").html(rowData['CITYNAME']);
            $("#delblStateNameC").html(rowData['STATENAME']);
            $("#hdnCityId").val(id);

            $("#panelCommon_CityMasterEdit").modal('hide');
            $("#panelCommon_CityMasterDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            Common_CityMasterView.clearControls();

            $("#panelCommon_CityMasterEdit").modal('show');
            $("#panelCommon_CityMasterDelete").modal('hide');
            $("#spanCityIdoper").text("Add New City");
            Common_CityMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            $('#btnDeleteCommon_CityMaster').attr('disabled', true);
            var data = {
                "oper": Common_CityMasterView.variables.Oper,
                "CITYID": $("#hdnCityId").val()
            }
            Common_CityMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmCommon_CityMaster").valid();
            if (!isValid)
                return false;

            Common_CityMasterView.variables.Oper = 'Add';
            Common_CityMasterView.variables.addedit = "added";
            Common_CityMasterView.variables.Masterid = $("#hdnCityId").val();

            if (Common_CityMasterView.variables.Masterid != "0" && parseInt(Common_CityMasterView.variables.Masterid) > 0) {
                Common_CityMasterView.variables.Oper = 'Edit';
                Common_CityMasterView.variables.addedit = 'updated';
            }
            //if (Common_CityMasterView.variables.Oper == 'Add' && isA() == 0) {
            //    notificationMessage('Response', permissionvars.unauthorized, 'error');
            //    return;
            //}
            //if (Common_CityMasterView.variables.Oper == 'Edit' && isU() == 0) {
            //    notificationMessage('Response', permissionvars.unauthorized, 'error');
            //    return;
            //}

            $('#btnSaveCommon_CityMaster').attr('disabled', true);
            var data = {
                "CITYNAME": $("#txtCityName").val(),
                "STATEID": $("#ddlStateName").val(),
                "oper": Common_CityMasterView.variables.Oper,
                "CITYID": Common_CityMasterView.variables.Masterid
            }
            Common_CityMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (Common_CityMasterView.variables.Oper == 'Delete')
                $('#btnDeleteCommon_CityMaster').attr('disabled', false);
            else
                $('#btnSaveCommon_CityMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(Common_CityMasterView.variables.Oper + ' Operation', 'Record is ' + Common_CityMasterView.variables.addedit + ' successfully', 'success');
                Common_CityMasterView.clearControls();
                $("#table_Common_CityMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#panelCommon_CityMasterEdit").modal('hide');
            $("#panelCommon_CityMasterDelete").modal('hide');
            $("#txtCityId").val("");
            $("#txtCityName").val("");
            $("#ddlStateName").val("");
            $("#ddlStateName").select2();
            $("#hdnCityId").val('');
            $("#frmCommon_CityMaster").validate().resetForm();
            Common_CityMasterView.variables.Oper = 'Add';
            Common_CityMasterView.variables.addedit = "added";
            jQuery("#table_list_Common_CityMaster").jqGrid('resetSelection');
        } catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + Common_CityMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: Common_CityMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveCommon_CityMaster").show();
                $("#dCommon_CityMasterTitle").show();
                $("#dViewCommon_CityMasterTitle").hide();
            }
            else {
                if ($("#btnSaveCommon_CityMaster").length > 0) {
                    $("#btnSaveCommon_CityMaster").hide();
                }
                $("#dViewCommon_CityMasterTitle").show();
                $("#dCommon_CityMasterTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, Common_CityMasterView.variables.File);
        }
    },

    bindState: function () {
        $("#ddlStateName").html("");
        BindDropdown('ddlStateName', 'SateDropdownList', getDomain() + Common_CityMasterView.variables.BindStateUrl, '--Select State--', true);
        $("#ddlStateName").select2();
    },

};

$(document).ready(function () {
    try {
        $("#btnAddCommon_CityMaster").click(function () {
            Common_CityMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveCommon_CityMaster").click(function () {
            Common_CityMasterView.btnMasterSubmit(Common_CityMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteCommon_CityMaster").click(function () {
            Common_CityMasterView.btnMasterDelete();
        });

        $('button[name="CancelCommon_CityMaster"]').click(function () {
            Common_CityMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelCommon_CityMasterEdit').on('shown.bs.modal', function () {
            $('#ddlStateName').focus();
        });
        $("#txtsearchboxcity").keyup(function (event) {
             if ($("#txtsearchboxcity").val().length > 2) {
                var myfilter,
                myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchboxcity").val() });
                var url = Common_CityMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                Common_CityMasterView.variables.flagjq = false;
                Common_CityMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchboxcity").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = Common_CityMasterView.variables.BindMasterUrl;
                Common_CityMasterView.variables.flagjq = false;
                Common_CityMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchboxcity").val().length == 2) {
                var url = Common_CityMasterView.variables.BindMasterUrl;
                Common_CityMasterView.variables.flagjq = false;
                Common_CityMasterView.initializeJqgrid(url);
            }
        });
    }
    catch (e) {
        ErrorDetails(e, Common_CityMasterView.variables.File);
    }
});