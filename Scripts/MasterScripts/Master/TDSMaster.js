var searchtxt = "";
var TDSMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=TDSMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=TDSMASTER_CRUD",
        BindBalanceSheetGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        Oper: 'Add',
        File: 'TDSMaster.js',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmTDSCodeMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['TDSId', 'Code', 'Percentage', 'Description', 'Limit', 'SingleTransLimit', 'Payable Acc.', 'Payable Account ', 'Receivable Acc.', 'Receivable Account', 'IsActive', 'IsTDSTrading', 'BalanceSheetGroupId'];
        var colModel = [
            { name: "TDSID", index: "TDSID", xmlmap: xmlvars.common_colmap + "TDSID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "CODE", width: 8, index: "CODE", xmlmap: xmlvars.common_colmap + "CODE", stype: 'text', sortable: true, search: false },
            { name: "PERCENTAGE", width: 8, index: "PERCENTAGE", xmlmap: xmlvars.common_colmap + "PERCENTAGE", stype: 'text', sortable: true, search: false },
            { name: "DESCRIPTION", width: 18, index: "DESCRIPTION", xmlmap: xmlvars.common_colmap + "DESCRIPTION", stype: 'text', sortable: false, search: false },
            { name: "LIMIT", width: 10, index: "LIMIT", xmlmap: xmlvars.common_colmap + "LIMIT", stype: 'text', sortable: false, search: false },
            { name: "SINGLETRANSLIMIT", width: 10, index: "SINGLETRANSLIMIT", xmlmap: xmlvars.common_colmap + "SINGLETRANSLIMIT", stype: 'text', sortable: false, search: false },
            { name: "PAYABLEACCOUNT", width: 12, index: "PAYABLEACCOUNT", xmlmap: xmlvars.common_colmap + "PAYABLEACCOUNT", stype: 'int', sortable: true, search: false, hidden: true },
            { name: "PAYABLEACCOUNTNAME", width: 12, index: "PAYABLEACCOUNTNAME", xmlmap: xmlvars.common_colmap + "PAYABLEACCOUNTNAME", stype: 'int', sortable: true, search: false },
            { name: "RECEIVABLEACCOUNT", width: 12, index: "RECEIVABLEACCOUNT", xmlmap: xmlvars.common_colmap + "RECEIVABLEACCOUNT", stype: 'int', sortable: true, search: false, hidden: true },
            { name: "RECEIVABLEACCOUNTNAME", width: 12, index: "RECEIVABLEACCOUNTNAME", xmlmap: xmlvars.common_colmap + "RECEIVABLEACCOUNTNAME", stype: 'int', sortable: true, search: false },
            { name: "ISACTIVE", width: 6, index: "ISACTIVE", align: "center", xmlmap: xmlvars.common_colmap + "ISACTIVE", sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
            { name: "ISTDSTRADING", width: 8, index: "ISTDSTRADING", align: "center", xmlmap: xmlvars.common_colmap + "ISTDSTRADING", sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
            { name: "BALANCESHEETGROUPID", width: 8, index: "BALANCESHEETGROUPID", align: "center", xmlmap: xmlvars.common_colmap + "BALANCESHEETGROUPID", sortable: false, search: false, hidden: true },
        ];

        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'TDSMasterView ', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'TDSMasterView ', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'TDSMasterView ') } });
        }
        //$("#table_TDSMaster").GridUnload();
        $.jgrid.gridUnload("#table_TDSMaster");
        $("#table_TDSMaster").jqGrid({
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
            pager: "#pager_TDSMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "TDSID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_TDSMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_TDSMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_TDSMaster').setGridWidth(width);
                    $("#gbox_table_TDSMaster").width(width);
                }, 200)
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'TDSID',
            sortorder: 'desc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    TDSMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_TDSMaster").jqGrid('navGrid', '#pager_TDSMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_TDSMaster_left").css("width", "");
        AlignJqGridHeader('table_TDSMaster', ['edit', 'delete', 'ISACTIVE']);
        // JqGrid navigations shortcuts
        jQuery("#table_TDSMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    TDSMasterView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = TDSMasterView.variables.BindMasterUrl;
        TDSMasterView.initializeJqgrid(url);
        TDSMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            $("#hdnTDSId").val(id);
            var rowData = jQuery("#table_TDSMaster").getRowData(id);
            $("#txtTDSId").val(rowData['TDSID']);
            $("#txtCode").val(rowData['CODE']);
            $("#txtPercentage").val(rowData['PERCENTAGE']);
            $("#txtDescription").val(rowData['DESCRIPTION']);
            $("#txtLimit").val(rowData['LIMIT']);
            $("#txtSingleTransLimit").val(rowData['SINGLETRANSLIMIT']);
            $("#txtPayableAccount").attr('AccId', rowData['PAYABLEACCOUNT']);
            $("#txtPayableAccount").val(rowData['PAYABLEACCOUNTNAME']);
            $("#txtReceivableAccount").attr('AccId', rowData['RECEIVABLEACCOUNT']);
            $("#txtReceivableAccount").val(rowData['RECEIVABLEACCOUNTNAME']);
            $("#ddlBalnceSheetGroup").val(rowData['BALANCESHEETGROUPID']);

            if ($(rowData['ISACTIVE']).html() == "Yes") {
                $("input[name='txtIsActive']").iCheck('check');
            }
            else {
                $("input[name='txtIsActive']").iCheck('uncheck');
            }

            if ($(rowData['ISTDSTRADING']).html() == "Yes") {
                $("input[name='txtIsTDSTrading']").iCheck('check');
            }
            else {
                $("input[name='txtIsTDSTrading']").iCheck('uncheck');
            }

            $("#panelTDSMasterEdit").modal("show");
            $("#panelTDSMasterDelete").modal("hide");
            $("#spanTDSMasteroper").text("Edit TDS Master");
            TDSMasterView.showTitlePermissionWise('edit');
        }
        catch (e) {
            ErrorDetails(e, TDSMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            TDSMasterView.variables.addedit = "deleted";
            TDSMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_TDSMaster").getRowData(id);
            $("#delblTDSCode").html(rowData['CODE']);

            $("#hdnTDSId").val(id);

            $("#panelTDSMasterEdit").modal("hide");
            $("#panelTDSMasterDelete").modal("show");
        } catch (e) {
            ErrorDetails(e, TDSMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        TDSMasterView.clearControls();

        $("#panelTDSMasterEdit").modal("show");
        $("#panelTDSMasterDelete").modal("hide");
        //$("#spanHSNIdoper").text("Add New HSN Code");
        TDSMasterView.showTitlePermissionWise('add');
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteTDSMaster').attr('disabled', true);
            var data = {
                "oper": TDSMasterView.variables.Oper,
                "TDSID": $("#hdnTDSId").val()
            }
            TDSMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, TDSMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmTDSCodeMaster").valid();
            if (!isValid)
                return;

            TDSMasterView.variables.Oper = 'Add';
            TDSMasterView.variables.addedit = "added";
            TDSMasterView.variables.Masterid = $("#hdnTDSId").val();

            if (TDSMasterView.variables.Masterid != "0" && parseInt(TDSMasterView.variables.Masterid) > 0) {
                TDSMasterView.variables.Oper = 'Edit';
                TDSMasterView.variables.addedit = 'updated';
            }
            if (TDSMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (TDSMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            if ($("#txtPayableAccount").val() == '') {
                if ($("#txtReceivableAccount").val() == '') {
                    notificationMessage('Validation', 'Please, Select Payable Account Or Receivable Account.', 'error');
                    return;
                }
            }

            $('#btnSaveTDSMaster').attr('disabled', true);
            var data = {
                "CODE": $("#txtCode").val(),
                "PERCENTAGE": $("#txtPercentage").val(),
                "DESCRIPTION": $("#txtDescription").val(),
                "LIMIT": $("#txtLimit").val(),
                "SINGLETRANSLIMIT": $("#txtSingleTransLimit").val(),
                "PAYABLEACCOUNT": $("#txtPayableAccount").val(), // $("#txtPayableAccount").attr('AccId') == undefined ?: $("#txtPayableAccount").attr('AccId'),
                "RECEIVABLEACCOUNT": $("#txtReceivableAccount").val(), //$("#txtReceivableAccount").attr('AccId') == undefined ?: $("#txtReceivableAccount").attr('AccId'),
                "ISACTIVE": (($('input[name="txtIsActive"]').prop("checked") == true) ? 1 : 0),
                "ISTDSTRADING": (($('input[name="txtIsTDSTrading"]').prop("checked") == true) ? 1 : 0),
                "BALANCESHEETGROUPID": $("#ddlBalnceSheetGroup").val(),
                //"TDSACCOUNT": $("#txtAccountName").val(),
                "oper": TDSMasterView.variables.Oper,
                "TDSID": TDSMasterView.variables.Masterid
            }
            TDSMasterView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, TDSMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (TDSMasterView.variables.Oper == 'Delete')
                $('#btnDeleteTDSMaster').attr('disabled', false);
            else
                $('#btnSaveTDSMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(TDSMasterView.variables.Oper + ' Operation', 'Record is ' + TDSMasterView.variables.addedit + ' successfully', 'success');
                TDSMasterView.clearControls();
                $("#table_TDSMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        }
        catch (e) {
            ErrorDetails(e, TDSMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#panelTDSMasterEdit").modal("hide");
            $("#panelTDSMasterDelete").modal("hide");
            $("#txtTDSId").val("");
            $("#txtCode").val("");
            $("#txtPercentage").val("");
            $("#txtDescription").val("");
            $("#txtLimit").val("");
            $("#txtSingleTransLimit").val("");
            $("#txtPayableAccount").val("");
            $("#txtReceivableAccount").val("");
            $("input[name='txtIsActive']").iCheck('check');
            $("input[name='txtIsTDSTrading']").iCheck('check');
            $("#hdnTDSId").val("");
            $("#frmTDSCodeMaster").validate().resetForm();
            TDSMasterView.variables.Oper = 'Add';
            TDSMasterView.variables.addedit = "added";
            jQuery("#table_list_TDSMaster").jqGrid('resetSelection');
        }
        catch (e) {
            ErrorDetails(e, TDSMasterView.variables.File);
        }
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + TDSMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: TDSMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveTDSMaster").show();
            $("#dTDSMasterTitle").show();
            $("#dViewTDSMasterTitle").hide();
        }
        else {
            if ($("#btnSaveTDSMaster").length > 0) {
                $("#btnSaveTDSMaster").hide();
            }
            $("#dViewTDSMasterTitle").show();
            $("#dTDSMasterTitle").hide();
        }
    },

    BindBalanceSheetGroup: function () {
        $("#ddlBalnceSheetGroup").html("");
        BindDropdown('ddlBalnceSheetGroup', 'BalnceSheetGroupList', getDomain() + TDSMasterView.variables.BindBalanceSheetGroupUrl, '-- Balance Sheet Group --');
    },

};

function AutosuggestAccountName(ItemName) {
    try {
        if (ItemName) {
            var id = $(ItemName).attr('id');
            $("#" + id).autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=TDSACCOUNT_MASTER_GET&_search=true&searchField=ITEMNAME&ISACTIVE=1&searchOper=cn&searchString=" + $("#" + id).val();
                    $.ajax({
                        url: url,
                        type: "POST",
                        async: false,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                var JsonObject = xml2json.parser(data);

                                if (JsonObject.serviceresponse.detailslist != undefined) {
                                    var List;
                                    if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    else
                                        List = JsonObject.serviceresponse.detailslist;
                                    response(
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {
                                                return {
                                                    label: item.tdsaccountname,
                                                    AccId: item.accountid,
                                                    value: item.tdsaccountname,
                                                    Id: item.tdsaccid
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.tdsaccountname,
                                                    AccId: item.accountid,
                                                    value: item.tdsaccountname,
                                                    Id: item.tdsaccid
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id).val().length <= 1) {
                                        $("#" + id).val('');
                                    }
                                    var result = [
                                        {
                                            label: 'No Results Found',
                                            value: ''
                                        }
                                    ];
                                    response(result);
                                }
                            }
                            else {
                                if ($("#" + id).val().length <= 1) {
                                    $("#" + id).val('');
                                }
                                notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                            }
                        }
                    })
                },
                messages: {
                    noResults: "No Results Found"
                },
                select: function (event, ui) {
                    if (ui.item.label != 'No Results Found') {
                        $("#" + id).val(ui.item.value);
                        $("#" + id).attr('AccId', ui.item.AccId);
                    }
                    //else {
                    //    setTimeout(function () {
                    //        $("#" + id).val('');
                    //    }, 1)
                    //}
                },
                change: function (event, ui) {
                    if (ui.item) {
                    }
                },
                focus: function (event, ui) {
                },
                minLength: 1,
                autoFocus: true
            });
        }
    }
    catch (e) {
        ErrorDetails(e, TDSMasterView.variables.File);
    }
}

$(document).ready(function () {
    try {
        //TDSMasterView.bindTax();
        TDSMasterView.BindBalanceSheetGroup();
        var url = TDSMasterView.variables.BindMasterUrl;
        TDSMasterView.initializeJqgrid(url);

        /*BindDropdown('txtPartyName', 'ddlPartyName', getDomain() + "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET&IsRecordAll=true&ISACTIVE=1", '-- Select Party Name --');*/

        $("#btnAddTDSMaster").click(function () {
            TDSMasterView.btnMasterShowAddPanel();
        });
        $('.decimal').keypress(function (event) {
            return numbersOnly(this, event, true, false);
        });
        $("#btnSaveTDSMaster").click(function () {
            TDSMasterView.btnMasterSubmit(TDSMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteTDSMaster").click(function () {
            TDSMasterView.btnMasterDelete();
        });

        $('button[name="CancelTDSMaster"]').click(function () {
            TDSMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelTDSMasterEdit').on('shown.bs.modal', function () {
            $('#txtCode').focus();
        });

        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = TDSMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                TDSMasterView.initializeJqgrid(url);
            }
        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = TDSMasterView.variables.BindMasterUrl;
                TDSMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = TDSMasterView.variables.BindMasterUrl;
                TDSMasterView.initializeJqgrid(url);
            }
        });
    }
    catch (e) {
        ErrorDetails(e, TDSMasterView.variables.File);
    }
});