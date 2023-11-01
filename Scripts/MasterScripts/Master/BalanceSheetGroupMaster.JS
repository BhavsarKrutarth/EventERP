var searchtxt = "";
var BalanceSheetGroupMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=BALANCESHEETGROUPMAS_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmBalanceSheetGroupMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['BalanceSheetGroupId', 'GroupCode', 'GroupName', 'BSGroupTypeId', 'BSREPORTTYPEID',/* 'TransferAccountToOther',*/ 'IsActive'];
        var colModel = [
            { name: "BALANCESHEETGROUPID", index: "BALANCESHEETGROUPID", xmlmap: xmlvars.common_colmap + "BALANCESHEETGROUPID", stype: 'int', sortable: true, hidden: true, search: false },
            { name: "BSGROUPCODE", width: 15, index: "BSGROUPCODE", xmlmap: xmlvars.common_colmap + "BSGROUPCODE", stype: 'text', sortable: true },
            { name: "BSGROUPNAME", width: 50, index: "BSGROUPNAME", xmlmap: xmlvars.common_colmap + "BSGROUPNAME", stype: 'text', sortable: true },
            { name: "BSGROUPTYPEID", index: "BSGROUPTYPEID", xmlmap: xmlvars.common_colmap + "BSGROUPTYPEID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "BSREPORTTYPEID", index: "BSREPORTTYPEID", xmlmap: xmlvars.common_colmap + "BSREPORTTYPEID", stype: 'int', sortable: false, hidden: true, search: false },
            //{ name: "BSGROUPTYPE", index: "BSGROUPTYPE", xmlmap: xmlvars.common_colmap + "BSGROUPTYPE", stype: 'int', sortable: false, search: false },
            //{ name: "TRANSFERACCOUNTTOOTHER", width: 15, index: "TRANSFERACCOUNTTOOTHER", xmlmap: xmlvars.common_colmap + "TRANSFERACCOUNTTOOTHER", stype: 'text', sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
            { name: "ISACTIVE", index: "ISACTIVE", width: 10, xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'text', sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'BalanceSheetGroupMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'BalanceSheetGroupMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 8, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'BalanceSheetGroupMasterView') } });
        }
        //$("#table_BalanceSheetGroupMaster").GridUnload();
        $.jgrid.gridUnload("#table_BalanceSheetGroupMaster");
        $("#table_BalanceSheetGroupMaster").jqGrid({
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
            pager: "#pager_BalanceSheetGroupMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "BALANCESHEETGROUPID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');


                jQuery("#table_BalanceSheetGroupMaster").jqGrid('bindKeys', {
                    "onEnter": function (rowid) {
                        if (isU()) {
                            BalanceSheetGroupMasterView.triggerId(rowid, 'edit')
                        }
                    }
                });
                // Hide column headers and top pager if no records were returned
                if ($('#table_BalanceSheetGroupMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqgrid_BalanceSheetGroupMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_BalanceSheetGroupMaster').setGridWidth(width);
                    $("#gbox_table_BalanceSheetGroupMaster").width(width);
                }, 200);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'BALANCESHEETGROUPID',
            sortorder: 'desc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    BalanceSheetGroupMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_BalanceSheetGroupMaster").jqGrid('navGrid', '#pager_BalanceSheetGroupMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_BalanceSheetGroupMaster_left").css("width", "");
        AlignJqGridHeader('table_BalanceSheetGroupMaster', ['edit', 'delete']);
    },

    triggerInitialClick: function () {
        var url = BalanceSheetGroupMasterView.variables.BindMasterUrl;
        BalanceSheetGroupMasterView.initializeJqgrid(url);
        BalanceSheetGroupMasterView.clearControls();
    },

    triggerId: function (id, oper) {
        try {
            var rowData = jQuery("#table_BalanceSheetGroupMaster").getRowData(id);
            $("#hdnBalanceSheetGroupId").val(id);
            $("#txtBSGroupCode").val(rowData['BSGROUPCODE']);
            $("#txtBSGroupName").val(rowData['BSGROUPNAME']);
            $("#ddlGroupTypeId").val(rowData['BSGROUPTYPEID']);
            $("#ddlReportGroupType").val(rowData['BSREPORTTYPEID']);
            //if ($(rowData['TRANSFERACCOUNTTOOTHER']).html() == "Yes") {
            //    $("input[name='txtTATO']").iCheck('check');
            //}
            //else {
            //    $("input[name='txtTATO']").iCheck('uncheck');
            //}
            if ($(rowData['ISACTIVE']).html() == "Yes") {
                $("input[name='txtIsActive']").iCheck('check');
            }
            else {
                $("input[name='txtIsActive']").iCheck('uncheck');
            }
            $("#panelBalanceSheetGroupMasterEdit").modal('show');
            $("#panelBalanceSheetGroupMasterDelete").modal('hide');
            BalanceSheetGroupMasterView.showTitlePermissionWise(oper);
        }
        catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            BalanceSheetGroupMasterView.variables.addedit = "deleted";
            BalanceSheetGroupMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_BalanceSheetGroupMaster").getRowData(id);
            $("#delblBSGroupCode").html(rowData['BSGROUPCODE']);
            $("#delblBSGroupName").html(rowData['BSGROUPNAME']);
            $("#hdnBalanceSheetGroupId").val(id);

            $("#panelBalanceSheetGroupMasterEdit").modal('hide');
            $("#panelBalanceSheetGroupMasterDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            BalanceSheetGroupMasterView.clearControls();

            $("#panelBalanceSheetGroupMasterEdit").modal('show');
            $("#panelBalanceSheetGroupMasterDelete").modal('hide');
            //$("#spanBalanceSheetGroupIdoper").text("Add New Balance Sheet");
            BalanceSheetGroupMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteBalanceSheetGroupMaster').attr('disabled', true);
            var data = {
                "oper": BalanceSheetGroupMasterView.variables.Oper,
                "BALANCESHEETGROUPID": $("#hdnBalanceSheetGroupId").val()
            }
            BalanceSheetGroupMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmBalanceSheetGroupMaster").valid();
            if (!isValid)
                return;

            BalanceSheetGroupMasterView.variables.Oper = 'Add';
            BalanceSheetGroupMasterView.variables.addedit = "added";
            BalanceSheetGroupMasterView.variables.Masterid = $("#hdnBalanceSheetGroupId").val();

            if (BalanceSheetGroupMasterView.variables.Masterid != "0" && parseInt(BalanceSheetGroupMasterView.variables.Masterid) > 0) {
                BalanceSheetGroupMasterView.variables.Oper = 'Edit';
                BalanceSheetGroupMasterView.variables.addedit = 'updated';
            }
            if (BalanceSheetGroupMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (BalanceSheetGroupMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveBalanceSheetGroupMaster').attr('disabled', true);
            var data = {
                "BSGROUPCODE": $("#txtBSGroupCode").val(),
                "BSGROUPNAME": $("#txtBSGroupName").val(),
                "BSGROUPTYPEID": $("#ddlGroupTypeId").val(),
                "BSREPORTTYPEID": $("#ddlReportGroupType").val(),
                //"TRANSFERACCOUNTTOOTHER": (($('input[name="txtTATO"]').prop("checked") == true) ? 1 : 0),
                "ISACTIVE": (($('input[name="txtIsActive"]').prop("checked") == true) ? 1 : 0),
                "oper": BalanceSheetGroupMasterView.variables.Oper,
                "BALANCESHEETGROUPID": BalanceSheetGroupMasterView.variables.Masterid
            }
            BalanceSheetGroupMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (BalanceSheetGroupMasterView.variables.Oper == 'Delete')
                $('#btnDeleteBalanceSheetGroupMaster').attr('disabled', false);
            else
                $('#btnSaveBalanceSheetGroupMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(BalanceSheetGroupMasterView.variables.Oper + ' Operation', 'Record is ' + BalanceSheetGroupMasterView.variables.addedit + ' successfully', 'success');
                BalanceSheetGroupMasterView.clearControls();
                $("#table_BalanceSheetGroupMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#panelBalanceSheetGroupMasterEdit").modal('hide');
            $("#panelBalanceSheetGroupMasterDelete").modal('hide');
            $("#txtBalanceSheetGroupId").val("");
            $("#txtBSGroupCode").val("");
            $("#txtBSGroupName").val("");
            $("#ddlGroupTypeId").val("");
            $("#hdnBalanceSheetGroupId").val("");
            $("#txtTransferAccountToOther").val("");
            $("#txtIsActive").val("");
            $("#frmBSGroupMaster").validate().resetForm();
            $("label.error").hide();
            BalanceSheetGroupMasterView.variables.Oper = 'Add';
            BalanceSheetGroupMasterView.variables.addedit = "added";
            jQuery("#table_list_BalanceSheetGroupMaster").jqGrid('resetSelection');
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + BalanceSheetGroupMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: BalanceSheetGroupMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveBalanceSheetGroupMaster").show();
                $("#dBalanceSheetGroupMasterTitle").show();
                $("#dViewBalanceSheetGroupMasterTitle").hide();
            }
            else {
                if ($("#btnSaveBalanceSheetGroupMaster").length > 0) {
                    $("#btnSaveBalanceSheetGroupMaster").hide();
                }
                $("#dViewBalanceSheetGroupMasterTitle").show();
                $("#dBalanceSheetGroupMasterTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    bindGroupType: function () {
        try {
            $("#ddlGroupTypeId").html("");
            BindCommonDetailsByType('BS Group Type', 'ddlGroupTypeId', 'CommonMasterDetailDropdownList', '---select Group Type---');
        }
        catch (e) {
            ErrorDetails(e, BalanceSheetGroupMasterView.variables.File);
        }
    },

    bindReportGroupType: function () {
        try {
            $("#ddlReportGroupType").html("");
            BindCommonDetailsByType('BS Report Type', 'ddlReportGroupType', 'CommonMasterDetailDropdownList', '---select Report Group Type---');
        }
        catch (e) {
            ErrorDetails(e, BalanceSheetGroupMasterView.variables.File);
        }
    }

};

$(document).ready(function () {
    try {
        BalanceSheetGroupMasterView.bindGroupType();
        BalanceSheetGroupMasterView.bindReportGroupType();
        var url = BalanceSheetGroupMasterView.variables.BindMasterUrl;
        BalanceSheetGroupMasterView.initializeJqgrid(url);
        $("#btnAddBalanceSheetGroupMaster").click(function () {
            BalanceSheetGroupMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveBalanceSheetGroupMaster").click(function () {
            BalanceSheetGroupMasterView.btnMasterSubmit(BalanceSheetGroupMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteBalanceSheetGroupMaster").click(function () {
            BalanceSheetGroupMasterView.btnMasterDelete();
        });

        $('button[name="CancelBalanceSheetGroupMaster"]').click(function () {
            BalanceSheetGroupMasterView.clearControls();
        });
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = BalanceSheetGroupMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                BalanceSheetGroupMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = BalanceSheetGroupMasterView.variables.BindMasterUrl;
                BalanceSheetGroupMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = BalanceSheetGroupMasterView.variables.BindMasterUrl;
                BalanceSheetGroupMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, ItemGroupMasterView.variables.File);
    }
});