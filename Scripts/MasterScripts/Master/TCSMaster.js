var searchtxt = "";
var TCSMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=TCSMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=TCSMASTER_CRUD",
        BindBalanceSheetGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        Oper: 'Add',
        File: 'TCSMaster.js',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmTCSCodeMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['TCSId', 'From date', 'To date', 'TCS Per', 'Limit', 'BalanceSheetGroupId', 'Payable Acc.', 'PAYABALEACCOUNT', 'Receivable Acc.', 'RECEIVABLEACCOUNT', 'IsActive'];
        var colModel = [
            { name: "TCSID", index: "TCSID", xmlmap: xmlvars.common_colmap + "TCSID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "FROMDATE", width: 10, index: "FROMDATE", xmlmap: xmlvars.common_colmap + "FROMDATE", stype: 'text', sortable: true, search: false },
            { name: "TODATE", width: 10, index: "TODATE", xmlmap: xmlvars.common_colmap + "TODATE", stype: 'text', sortable: true, search: false },
            { name: "TAXPER", width: 10, index: "TAXPER", xmlmap: xmlvars.common_colmap + "TAXPER", stype: 'text', sortable: true, search: false },
            { name: "TCSLIMIT", width: 10, index: "TCSLIMIT", xmlmap: xmlvars.common_colmap + "TCSLIMIT", stype: 'text', sortable: false, search: false },
            { name: "BALANCESHEETGROUPID", width: 8, index: "BALANCESHEETGROUPID", align: "center", xmlmap: xmlvars.common_colmap + "BALANCESHEETGROUPID", sortable: false, search: false, hidden: true },
            { name: "PAYACCOUNT", width: 10, index: "PAYACCOUNT", xmlmap: xmlvars.common_colmap + "PAYACCOUNT", stype: 'int', sortable: true, search: false, hidden: true, },
            { name: "PAYABALEACCOUNT", width: 10, index: "PAYABALEACCOUNT", xmlmap: xmlvars.common_colmap + "PAYABALEACCOUNT", stype: 'int', sortable: true, search: false },
            { name: "RECIVEACCOUNT", width: 10, index: "RECIVEACCOUNT", xmlmap: xmlvars.common_colmap + "RECIVEACCOUNT", stype: 'int', sortable: true, search: false, hidden: true, },
            { name: "RECEIVABLEACCOUNT", width: 10, index: "RECEIVABLEACCOUNT", xmlmap: xmlvars.common_colmap + "RECEIVABLEACCOUNT", stype: 'int', sortable: true, search: false },
            { name: "ISACTIVE", width: 10, index: "ISACTIVE", align: "center", xmlmap: xmlvars.common_colmap + "ISACTIVE", sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
            //{ name: "PARTYID", index: "PARTYID", align: "center", xmlmap: xmlvars.common_colmap + "PARTYID", sortable: false, search: false, hidden: true },

        ];

        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'TCSMasterView ', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'TCSMasterView ', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'TCSMasterView ') } });
        }
        //$("#table_TCSMaster").GridUnload();
        $.jgrid.gridUnload("#table_TCSMaster");
        $("#table_TCSMaster").jqGrid({
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
            pager: "#pager_TCSMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "TCSID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_TCSMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_TCSMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_TCSMaster').setGridWidth(width);
                    $("#gbox_table_TCSMaster").width(width);
                }, 200)
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'TCSID',
            sortorder: 'desc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    TCSMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_TCSMaster").jqGrid('navGrid', '#pager_TCSMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_TCSMaster_left").css("width", "");
        AlignJqGridHeader('table_TCSMaster', ['edit', 'delete', 'ISACTIVE']);
        // JqGrid navigations shortcuts
        jQuery("#table_TCSMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    TCSMasterView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = TCSMasterView.variables.BindMasterUrl;
        TCSMasterView.initializeJqgrid(url);
        TCSMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            $("#hdnTCSId").val(id);
            var rowData = jQuery("#table_TCSMaster").getRowData(id);
            var d = rowData['FROMDATE'].split('/');
            $("#txtFromDate").val(d[2] + '-' + d[1] + '-' + d[0]);
            d = rowData['TODATE'].split('/');
            $("#txtToDate").val(d[2] + '-' + d[1] + '-' + d[0]);
            $("#txtPercentage").val(rowData['TAXPER']);
            $("#txtLimit").val(rowData['TCSLIMIT']);
            //$("#txtAccountName").attr('PartyId', rowData['PARTYID']);
            //$("#txtAccountName").val(rowData['PARTYNAME']);

            $("#txtPayableAccount").attr('AccId', rowData['PAYACCOUNT']);
            $("#txtPayableAccount").val(rowData['PAYABALEACCOUNT']);
            $("#txtReceivableAccount").attr('AccId', rowData['RECIVEACCOUNT']);
            $("#txtReceivableAccount").val(rowData['RECEIVABLEACCOUNT']);

            $("#ddlBalnceSheetGroup").val(rowData['BALANCESHEETGROUPID']);

            if ($(rowData['ISACTIVE']).html() == "Yes") {
                $("input[name='txtIsActive']").iCheck('check');
            }
            else {
                $("input[name='txtIsActive']").iCheck('uncheck');
            }
            $("#panelTCSMasterEdit").modal("show");
            $("#panelTCSMasterDelete").modal("hide");
            $("#spanTCSMasteroper").text("Edit TCS Master");
            TCSMasterView.showTitlePermissionWise('edit');
        }
        catch (e) {
            ErrorDetails(e, TCSMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            TCSMasterView.variables.addedit = "deleted";
            TCSMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_TCSMaster").getRowData(id);
            $("#delFromDate").html(rowData['FROMDATE']);
            $("#delToDate").html(rowData['TODATE']);
            $("#delTcsper").html(rowData['TAXPER']);
            $("#delLimit").html(rowData['TCSLIMIT']);

            $("#hdnTCSId").val(id);
            $("#panelTCSMasterEdit").modal("hide");
            $("#panelTCSMasterDelete").modal("show");
        }
        catch (e) {
            ErrorDetails(e, TCSMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        TCSMasterView.clearControls();

        $("#panelTCSMasterEdit").modal("show");
        $("#panelTCSMasterDelete").modal("hide");
        //$("#spanHSNIdoper").text("Add New HSN Code");
        TCSMasterView.showTitlePermissionWise('add');
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteTCSMaster').attr('disabled', true);
            var data = {
                "oper": TCSMasterView.variables.Oper,
                "TCSID": $("#hdnTCSId").val()
            }
            TCSMasterView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, TCSMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmTCSCodeMaster").valid();
            if (!isValid)
                return;

            TCSMasterView.variables.Oper = 'Add';
            TCSMasterView.variables.addedit = "added";
            TCSMasterView.variables.Masterid = $("#hdnTCSId").val();

            if (TCSMasterView.variables.Masterid != "0" && parseInt(TCSMasterView.variables.Masterid) > 0) {
                TCSMasterView.variables.Oper = 'Edit';
                TCSMasterView.variables.addedit = 'updated';
            }
            if (TCSMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (TCSMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveTCSMaster').attr('disabled', true);
            var data = {
                "FROMDATE": $("#txtFromDate").val(),
                "TODATE": $("#txtToDate").val(),
                "TAXPER": $("#txtPercentage").val(),
                "LIMIT": $("#txtLimit").val(),
                "PAYACCOUNT": $("#txtPayableAccount").val(),    // $("#txtPayableAccount").attr('AccId')
                "RECIVEACCOUNT": $("#txtReceivableAccount").val(),
                "ISACTIVE": (($('input[name="txtIsActive"]').prop("checked") == true) ? 1 : 0),
                "oper": TCSMasterView.variables.Oper,
                "TCSID": TCSMasterView.variables.Masterid,
                //"PARTYNAME": $("#txtAccountName").val(),
                "BALANCESHEETGROUPID": $("#ddlBalnceSheetGroup").val(),
            }
            TCSMasterView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, TCSMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (TCSMasterView.variables.Oper == 'Delete')
                $('#btnDeleteTCSMaster').attr('disabled', false);
            else
                $('#btnSaveTCSMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(TCSMasterView.variables.Oper + ' Operation', 'Record is ' + TCSMasterView.variables.addedit + ' successfully', 'success');
                TCSMasterView.clearControls();
                $("#table_TCSMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        }
        catch (e) {
            ErrorDetails(e, TCSMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#panelTCSMasterEdit").modal("hide");
            $("#panelTCSMasterDelete").modal("hide");
            $("#txtFromDate").val("");
            $("#txtToDate").val("");
            $("#txtPercentage").val("");
            $("#txtLimit").val("");
            $("#txtPayableAccount").val("");
            $("#txtReceivableAccount").val("");
            $("input[name='txtIsActive']").iCheck('check');
            $("#hdnTCSId").val("");
            $("#frmTCSCodeMaster").validate().resetForm();
            TCSMasterView.variables.Oper = 'Add';
            TCSMasterView.variables.addedit = "added";
            jQuery("#table_list_HSNCodeMaster").jqGrid('resetSelection');
        }
        catch (e) {
            ErrorDetails(e, TCSMasterView.variables.File);
        }
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + TCSMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: TCSMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveTCSMaster").show();
            $("#dTCSMasterTitle").show();
            $("#dViewTCSMasterTitle").hide();
        }
        else {
            if ($("#btnSaveTCSMaster").length > 0) {
                $("#btnSaveTCSMaster").hide();
            }
            $("#dViewTCSMasterTitle").show();
            $("#dTCSMasterTitle").hide();
        }
    },

    BindBalanceSheetGroup: function () {
        $("#ddlBalnceSheetGroup").html("");
        BindDropdown('ddlBalnceSheetGroup', 'BalnceSheetGroupList', getDomain() + TCSMasterView.variables.BindBalanceSheetGroupUrl, '-- Balance Sheet Group --');
    },

};

function AutosuggestAccountName(ItemName) {
    try {
        if (ItemName) {
            var id = $(ItemName).attr('id');
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "TYPE", op: "eq", data: 'AccountName' });
            $("#" + id).autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=TCSMASTER_GET&_search=true&searchField=ACCOUNTNAME&ISACTIVE=1&searchOper=cn&searchString=" + $("#" + id).val() + "&myfilters=" + JSON.stringify(myfilter);
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
                                                    label: item.accountname,
                                                    value: item.accountname,
                                                    Id: item.accountid
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.accountname,
                                                    value: item.accountname,
                                                    Id: item.accountid
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id).val().length <= 1) {
                                        $("#" + id).val('');
                                        $("#" + id).attr('AccId', '');
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
                                    $("#" + id).attr('AccId', '');
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
                        $("#" + id).attr('AccId', ui.item.Id);
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
        ErrorDetails(e, TCSMasterView.variables.File);
    }
}

$(document).ready(function () {
    try {
        //TCSMasterView.bindTax();
        TCSMasterView.BindBalanceSheetGroup();
        var url = TCSMasterView.variables.BindMasterUrl;
        TCSMasterView.initializeJqgrid(url);
        $("#btnAddTCSMaster").click(function () {
            TCSMasterView.btnMasterShowAddPanel();
            setTimeout(function () {
                $("#txtFromDate").focus();
            }, 200);

        });
        $('.decimal').keypress(function (event) {
            return numbersOnly(this, event, true, false);
        });
        $("#btnSaveTCSMaster").click(function () {
            TCSMasterView.btnMasterSubmit();
        });

        $("#btnDeleteTCSMaster").click(function () {
            TCSMasterView.btnMasterDelete();
        });

        $('button[name="CancelTCSMaster"]').click(function () {
            TCSMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelTCSMasterEdit').on('shown.bs.modal', function () {
            $('#txtCode').focus();
        });
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = TCSMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                TCSMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = TCSMasterView.variables.BindMasterUrl;
                TCSMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = TCSMasterView.variables.BindMasterUrl;
                TCSMasterView.initializeJqgrid(url);
            }
        });
    }
    catch (e) {
        ErrorDetails(e, TCSMasterView.variables.File);
    }
});