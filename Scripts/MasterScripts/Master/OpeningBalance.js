var View = "OpeningBalance"
var OpeningBalanceview = {
    variables: {
        oper: 'Add',
        AddNew: true,
        File: "OpeningBalance.js",
        ListId: 1,
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=OPENINGBALANCE_GET",
        OpeningBalanceDetailUrl: "/Common/BindMastersDetails?ServiceName=OPENINGBALANCEITEM_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=OPENINGBALANCE_CRUD"
    },

    initializeJqgrid: function (url) {
        try {
            colNames = ['OPENINGBALANCEID', 'AccountId', 'Account Name','Type', 'Opening Balance', 'OpeningSign', 'Remark'
            /*    , 'AmtCredit', 'AmtDebit', 'MetalCredit', 'MetalDebit', 'DiaCredit', 'DiaDebit'*/
            ],
                colModel = [
                    { name: "OPENINGBALANCEID", index: "OPENINGBALANCEID", xmlmap: xmlvars.common_colmap + "OPENINGBALANCEID", sortable: false, search: false, hidden: true },
                    { name: "ACCOUNTID", index: "ACCOUNTID", xmlmap: xmlvars.common_colmap + "ACCOUNTID", sortable: false, search: false, hidden: true },
                { name: "PARTYNAME", width: 20, index: "PARTYNAME", xmlmap: xmlvars.common_colmap + "PARTYNAME", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "ACCOUNTTYPE", width: 20, index: "ACCOUNTTYPE", xmlmap: xmlvars.common_colmap + "ACCOUNTTYPE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "OPENINGBALANCE", width: 10, index: "OPENINGBALANCE", xmlmap: xmlvars.common_colmap + "OPENINGBALANCE", align: 'right', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "OPENINGSIGN", width: 10, index: "OPENINGSIGN", xmlmap: xmlvars.common_colmap + "OPENINGSIGN", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "REMARK", width: 10, index: "REMARK", xmlmap: xmlvars.common_colmap + "REMARK", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    //{ name: "AMTCREDIT", width: 10, index: "AMTCREDIT", xmlmap: xmlvars.common_colmap + "AMTCREDIT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    //{ name: "AMTDEBIT", width: 10, index: "AMTDEBIT", xmlmap: xmlvars.common_colmap + "AMTDEBIT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    //{ name: "METALCREDIT", width: 10, index: "METALCREDIT", xmlmap: xmlvars.common_colmap + "METALCREDIT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    //{ name: "METALDEBIT", width: 10, index: "METALDEBIT", xmlmap: xmlvars.common_colmap + "METALDEBIT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    //{ name: "DIACREDIT", width: 10, index: "DIACREDIT", xmlmap: xmlvars.common_colmap + "DIACREDIT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    //{ name: "DIADEBIT", width: 10, index: "DIADEBIT", xmlmap: xmlvars.common_colmap + "DIADEBIT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                ];

            colNames.push('Action');
            colModel.push({ name: 'act', exportcol: false, index: 'act', width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ActionBtnFmatter(cv, op, ro, 'OpeningBalanceview') } });

            //$("#table_list_OpeningBalance").GridUnload();
            $.jgrid.gridUnload("#table_list_OpeningBalance");
            $("#table_list_OpeningBalance").jqGrid({
                url: getDomain() + url,
                datatype: "xml",
                height: getGridHeight(),
                scroll: 1,
                autowidth: true,
                shrinkToFit: true,
                rowNum: 30,
                rowList: [20, 50, 100],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_list_OpeningBalance",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "OPENINGBALANCEID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');
                    setTimeout(function () {
                        var width = $('#jqgrid_OpeningBalance').width();
                        if (width <= 430) {
                            width = 1000;
                        }
                        $('#table_list_OpeningBalance').setGridWidth(width);
                    }, 200)
                    //$('#table_list_OpeningBalance').jqGrid('setSelection', $('#table_list_OpeningBalance').jqGrid('getDataIDs')[0]);
                    jQuery("#table_list_OpeningBalance").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'OPENINGBALANCEID',
                sortorder: 'desc',
                ondblClickRow: function (rowid) {
                    if (isU()) {
                        OpeningBalanceview.triggerId(rowid, 'edit')
                    }
                }
            });

            // JqGrid navigations shortcuts
            jQuery("#table_list_OpeningBalance").jqGrid('bindKeys', {
                "onEnter": function (rowid) {
                    OpeningBalanceview.triggerId(rowid, 'edit')
                }
            });

            // Setup buttons
            $("#table_list_OpeningBalance").jqGrid('navGrid', '#pager_list_OpeningBalance',
                { edit: false, add: false, del: false, search: false, refresh: false },
                { height: 320 }
            );
            $("#pager_list_OpeningBalance_left").css("width", "");
            AlignJqGridHeader('table_list_OpeningBalance', ['act']);
            RightAlignJqGridHeader('table_list_OpeningBalance', ['OPENINGBALANCE']);
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    triggerId: function (id) {
        //try {
        OpeningBalanceview.variables.AddNew = true;
        $("#panelEdit").modal('show');
        $("#hdnOpeningBalanceId").val(id);
        OpeningBalanceview.variables.oper = 'Edit';
        rowData = jQuery("#table_list_OpeningBalance").getRowData(id);
        $("#txtAccount").val(rowData['PARTYNAME']);
        $("#txtAccount").attr('AccountId', rowData['ACCOUNTID']);
        $("#txtOpeningBal").val(parseFloat(rowData['OPENINGBALANCE']).toFixed(2));
        $("#ddlOpeningSign").val(rowData['OPENINGSIGN']);
        $("#txtRemark").val(rowData['REMARK']);
        var myfilter,
            myfilter = { rules: [] };
        myfilter.rules.push({ field: "OPENINGBALANCEID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + OpeningBalanceview.variables.OpeningBalanceDetailUrl + "&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse != undefined) {
                    if (JsonObject.serviceresponse.detailslist) {
                        if (JsonObject.serviceresponse.responsecode == 0) {
                            $("#OpeningBalance_tbody").html('');
                            var list;
                            if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                list = JsonObject.serviceresponse.detailslist.details;
                            else
                                list = JsonObject.serviceresponse.detailslist;
                            OpeningBalanceview.variables.ListId = 1;
                            $.each(list, function (key, innerjsonDetails) {
                                $("#OpeningBalance_tbody").append('<tr>' +
                                    '<td style="text-align: center;"></td>' +
                                    '<td>' +
                                    '<input type="text" value="' + innerjsonDetails.itemname + '"  onkeyup="OpeningBalanceview.AutosuggestItemName(this)" class="form-control txtItemName keyboard required txtAutocomplete" onfocusout="OpeningBalanceview(this)" name="txtItemName' + OpeningBalanceview.variables.ListId + '" id="txtItemName' + OpeningBalanceview.variables.ListId + '" ItemId="' + innerjsonDetails.itemid + '">' +
                                    '</td>' +
                                    '<td>' +
                                    '<input type="text" value="' + parseFloat(innerjsonDetails.weight).toFixed(3) + '" class="form-control txtR numbers weight fixed keyboard txtWeight" decimals="3" onfocusout="OpeningBalanceview.validation(this)" name="txtWeight' + OpeningBalanceview.variables.ListId + '" id="txtWeight' + OpeningBalanceview.variables.ListId + '">' +
                                    '</td>' +
                                    '<td>' +
                                    '<select type="text" value="' + parseFloat(innerjsonDetails.itemopsign).toFixed(3) + '" style="padding: 0;" class="form-control txtR number ItemOpeningSign keyboard" onchange="ValueChange(' + OpeningBalanceview.variables.ListId + ')" name="ddlItemOpeningSign' + OpeningBalanceview.variables.ListId + '" id="ddlItemOpeningSign' + OpeningBalanceview.variables.ListId + '">' +
                                    '<option value="Credit">Credit</option>' +
                                    '<option value="Debit">Debit</option>' +
                                    '</select>' +
                                    '</td>' +
                                    '<td class="btnRemove" id="btnRemove' + OpeningBalanceview.variables.ListId + '">' +
                                    '<div>' +
                                    '<i class="icon-cancel-circle2" onclick="OpeningBalanceview.RemoveRow(this)"></i>' +
                                    '</div>' +
                                    '</td>' +

                                    '</tr>');
                                FixValue();
                                if (OpeningBalanceview.variables.AddNew == false) {
                                    setTimeout(function () {
                                        $("#OpeningBalance_tbody tr:last td:nth-child(2) input").focus();
                                    }, 100)
                                } else {
                                    OpeningBalanceview.variables.AddNew = false;
                                }
                                OpeningBalanceview.variables.ListId = OpeningBalanceview.variables.ListId + 1;
                            });

                        } else {
                            notificationTost('error', JsonObject.serviceresponse.responsemessage)
                        }
                    } else {
                        $("#OpeningBalance_tbody").html('');
                        OpeningBalanceview.variables.AddNew = true;
                        ItemAddNewRow();
                    }
                    OpeningBalanceview.validation();
                }
            },
            error: OnError
        });
        setTimeout(function () {
            $("#txtAccount").focus();
        }, 200);
    },

    RemoveRow: function (row) {
        try {
            $(row).closest('tr').remove();
            $("#PaymentList_tbody tr:last td:last").html('<div>' +
                '<i class="icon-cancel-circle2" onclick="OpeningBalanceview.RemoveRow(this)"></i>' +
                '</div>');
            if ($("#PaymentList_tbody tr").length >= 1) {
                $("#PaymentList_tbody tr:first td:last div").remove();
            }
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    RemoveEmptyRow: function () {
        try {
            var ItemName = $(".txtItemName");
            var i = 1;
            if ($("#OpeningBalance_tbody tr").length > 1) {
                for (i; ItemName.length > i; i++) {
                    if ($("#" + ItemName[i].id).val() == '') {
                        $(ItemName[i]).parent().parent().remove();
                    }
                }
            }
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    SaveData: function () {
        try {
            if (!$("#FrmItemList").valid()) {
                return false;
            }
            if ($("#txtAccount").attr('AccountId')) {
                $("#txtAccount").removeClass('table-input-error');
            } else {
                $("#txtAccount").addClass('table-input-error');
            }
            error = $(".table-input-error")
            if (error.length > 0) {
                notificationTost('warning', 'Fields with red lines are required.');
                return false;
            }
            //var xmlsaveFiles = "<OPENINGBALANCE>";
            //var resultXml = makeFileXml('#OpeningBalance_tbody');
            //if (resultXml.xmlsaveFiles != '') {
            //    xmlsaveFiles += resultXml.xmlsaveFiles;
            //    xmlsaveFiles += "</OPENINGBALANCE>";
            //} else {
            //    xmlsaveFiles = '';
            //}

            var data = {
                "OPENINGBALANCEID": $("#hdnOpeningBalanceId").val(),
                "ACCOUNTID": $("#txtAccount").attr('AccountId'),
                "OPENINGBALANCE": $("#txtOpeningBal").val(),
                "OPENINGSIGN": $("#ddlOpeningSign").val(),
                "REMARK": $("#txtRemark").val(),
                "oper": OpeningBalanceview.variables.oper,
                /*"XMLPARAM": escape(xmlsaveFiles)*/
            };
            $.ajax({
                url: getDomain() + OpeningBalanceview.variables.PerformMasterOperationUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        notificationMessage(OpeningBalanceview.variables.oper + ' Operation', $(data).find('RESPONSEMESSAGE').text(), 'success');
                        OpeningBalanceview.ClearData();
                    } else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            });
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            $("#ModalOpeningBalanceDelete").modal('show');
            rowData = jQuery("#table_list_OpeningBalance").getRowData(id);
            $("#hdnOpeningBalanceId").val(id);
            $("#delAccountName").html(rowData['ACCOUNTID']);
            $("#delOpBalance").html(rowData['OPENINGBALANCE']);
            $("#delOpSign").html(rowData['OPENINGSIGN']);
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    DeleteSubmit: function () {
        try {
            var data = {
                "OPENINGBALANCEID": $("#hdnOpeningBalanceId").val(),
                "oper": 'Delete',
            };
            $.ajax({
                url: getDomain() + OpeningBalanceview.variables.PerformMasterOperationUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        notificationMessage('Success', $(data).find('RESPONSEMESSAGE').text(), 'success');
                        $("#ModalOpeningBalanceDelete").modal('hide');
                        jQuery("#table_list_OpeningBalance").trigger('reloadGrid');
                    } else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            });
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    AutosuggestItemName: function (id) {
        try {
            var id = $(id).attr('id');
            var append = id.replace('txtItemName', '');
            $("#" + id).autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMMASTER_GET&_search=true&searchField=ITEMNAME&searchOper=cn&ISACTIVE=1&searchString=" + $("#" + id).val();
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
                                                    label: item.itemname,
                                                    value: item.itemname,
                                                    Id: item.itemid,
                                                    TOUCH: item.touch,
                                                    PURCHASERATE: item.purchaserate
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.itemname,
                                                    value: item.itemname,
                                                    Id: item.itemid,
                                                    TOUCH: item.touch,
                                                    PURCHASERATE: item.purchaserate
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id).val().length <= 1) {
                                        $("#txtTouch" + append).val('');
                                        $("#txtItemName" + append).attr('ItemId', '');
                                    }
                                }
                            }
                            else {
                                if ($("#" + id).val().length <= 1) {
                                    $('#txtTouch' + append).val('');
                                    $("#txtItemName" + append).attr('ItemId', '');
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
                    $('#txtTouch' + append).val(ui.item.TOUCH);
                    $("#txtItemName" + append).attr('ItemId', ui.item.Id);
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        $("#txtItemName" + append).val('');
                    }
                },
                focus: function (event, ui) {
                    $("#txtItemName" + append).val('');
                },
                minLength: 1,
                autoFocus: true
            });
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    ClearData: function () {
        try {
            OpeningBalanceview.variables.ListId = 1;
            OpeningBalanceview.variables.oper = 'Add';
            $("#OpeningBalance_tbody").html('');
            jQuery("#table_list_OpeningBalance").trigger('reloadGrid');
            $("#hdnOpeningBalanceId").val('');
            $("#txtAccount").val('');
            $("#txtOpeningBal").val('');
            $("#txtRemark").val('');
            OpeningBalanceview.variables.AddNew = true;
            $("#panelEdit").modal('hide');
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }
    },

    ChangeFocusTable: function (id) {
        try {
            if ($(id).val() == '') {
                $("#" + id.id).addClass('table-input-error');
            } else {
                $("#" + id.id).removeClass('table-input-error');
            }
            $("#txtItemName1").focus();
        } catch (e) {
            ErrorDetails(e, OpeningBalanceview.variables.File);
        }

    },

    AccountNameAutoComplete: function () {
        $("#txtAccount").autocomplete({
            source: function (request, response) {
                var myfilter;
                myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $('#txtAccount').val() });
                myfilter.rules.push({ field: "TYPE", op: "eq", data: 'BUYER_SELLER' });
                var url = getDomain() + "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET&myfilters=" + JSON.stringify(myfilter);   //CUSTOMERPARTY_GET
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
                                                label: item.searchdata,
                                                value: item.accountname,
                                                id: item.accountid,
                                                accounttype: item.accounttype,
                                            }
                                        }
                                        else {
                                            return {
                                                label: item.searchdata,
                                                value: item.partyname,
                                                id: item.accountid,
                                                accounttype: item.accounttype,
                                            }
                                        }
                                    }))
                            }
                            else {
                                if ($("#txtAccount").val().length <= 1) {
                                    $("#txtAccount").attr('AccountId', '');
                                    $("#txtAccount").attr('AccountType', '');
                                    $("#txtAccount").val('');
                                }
                            }
                        }
                        else {
                            if ($("#txtAccount").val().length <= 1) {
                                $("#txtAccount").attr('AccountId', '');
                                $("#txtAccount").attr('AccountType', '');
                                $("#txtAccount").val('');
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
                $("#txtAccount").attr('AccountId', ui.item.id);
                $("#txtAccount").attr('AccountType', ui.item.accounttype);
            },
            change: function (event, ui) {
                if ($("#txtAccount").val().length <= 1) {
                    if (!ui.item) {
                        $("#txtAccount").attr('AccountId', '');
                        $("#txtAccount").val('');

                    }
                }
            },
            focus: function (event, ui) {
                if ($("#txtAccount").val().length <= 1) {
                    $("#txtAccount").attr('AccountId', '');
                    $("#txtAccount").val('');
                }
            },
            minLength: 1,
            autoFocus: true
        });
    },

    GetCustomerDetails: function (id, type) {
        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "ID", op: "eq", data: id });
        myfilter.rules.push({ field: "ACCOUNTTYPE", op: "eq", data: type });
        var url = getDomain() + "/Common/BindMastersDetails?ServiceName=CUSTOMERPARTY_GET&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: url,
            type: "POST",
            async: false,
            cache: false,
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);

                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        List = JsonObject.serviceresponse.detailslist.details;

                        $("#txtAccount").val(List.accountname);
                        $("#txtAccount").attr('AccountId', List.accid);
                        $("#txtAccount").attr('AccountType', List.accounttype);
                        $("#hdnCommonNewPartyId").val('');
                        $("#hdnCommonNewCustomerId").val('');
                    }
                }
            }
        });
    },

    validation: function (obj) {
        if (obj)
            if ($(obj).hasClass('required')) {
                if (obj.value != '') {
                    $(obj).removeClass('table-input-error');
                } else {
                    $(obj).addClass('table-input-error');
                }
            }

        var sum = 0;
        $(".txtWeight").each(function () {
            sum += +(this.value || 0);
        })
        $("#totalweight").html(parseFloat(sum).toFixed(2));

    },

}

$(document).ready(function () {
    try {
        OpeningBalanceview.initializeJqgrid(OpeningBalanceview.variables.BindGroupListUrl);

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: "" });
        var Url = getDomain() + "/Common/BindMastersDetails?ServiceName=AEXAMPLE_GET" + "&myfilters=" + JSON.stringify(myfilter);
        //OpeningBalanceview.InitializeJqgridExample(Url);

        $("#btnAddOpeningBalance").click(function () {

            OpeningBalanceview.ClearData();
            ItemAddNewRow();
            setTimeout(function () {
                OpeningBalanceview.variables.AddNew = false;
                $("#txtAccount").focus();
            }, 200);
            $("#panelEdit").modal('show');
        });
        $("#btnSaveOpeningBalance").click(function () {
            OpeningBalanceview.SaveData();
        });
        $("#btncancelOpeningBalance").click(function () {
            OpeningBalanceview.ClearData();
        });
        $("#btnDeleteOpeningBalance").click(function () {
            OpeningBalanceview.DeleteSubmit();
        });
        $("#btnCancelDelete").click(function () {
            $("#ModalOpeningBalanceDelete").modal('hide');
        });
        //$("#ddlCashType").on('change', function () {
        //    OpeningBalanceview.TypeChange();
        //});


        //------------------------------------------ Grid Search ------------------------------------------//
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = OpeningBalanceview.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
                OpeningBalanceview.initializeJqgrid(url);
            }
        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = OpeningBalanceview.variables.BindGroupListUrl;
                OpeningBalanceview.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = OpeningBalanceview.variables.BindGroupListUrl;
                OpeningBalanceview.initializeJqgrid(url);
            }
        });

        FixValue();
        $("#AddEditPartyCusomerModal").on('hide.bs.modal', function () {
            if ($("#hdnCommonNewPartyId").val() != '') {    //--------------- New Party Id for new record
                OpeningBalanceview.GetCustomerDetails($("#hdnCommonNewPartyId").val(), 'PARTY');
            } else if ($("#hdnCommonNewCustomerId").val() != '') {  //--------------- New Customer Id for new record
                OpeningBalanceview.GetCustomerDetails($("#hdnCommonNewCustomerId").val(), 'CUSTOMER');
            } else {
                setTimeout(function () {
                    $("#txtAccount").focus();
                }, 100);
            }
        });
        $("#txtRemark").keydown(function (event) {
            if (event.keyCode == 13) {
                setTimeout(function () {
                    $("#OpeningBalance_tbody tr:first td:nth-child(2) input").focus();
                }, 100);
            }
        });
    } catch (e) {
        ErrorDetails(e, OpeningBalanceview.variables.File);
    }

});

function ItemAddNewRow() {
    try {
        $("#OpeningBalance_tbody").append('<tr>' +
            '<td style="text-align: center;"></td>' +
            '<td>' +
            '<input type="text"  onkeyup="OpeningBalanceview.AutosuggestItemName(this)" class="form-control txtItemName keyboard required txtAutocomplete" onfocusout="OpeningBalanceview.validation(this)" name="txtItemName' + OpeningBalanceview.variables.ListId + '" id="txtItemName' + OpeningBalanceview.variables.ListId + '">' +
            '</td>' +
            '<td>' +
            '<input type="text" class="form-control txtR numbers weight fixed keyboard required txtWeight" decimals="3" onfocusout="OpeningBalanceview.validation(this)" name="txtWeight' + OpeningBalanceview.variables.ListId + '" id="txtWeight' + OpeningBalanceview.variables.ListId + '">' +
            '</td>' +
            '<td>' +
            '<select class="form-control ddlItemOpeningSign" id="ddlItemOpeningSign' + OpeningBalanceview.variables.ListId + '" name="ddlItemOpeningSign' + OpeningBalanceview.variables.ListId + '">' +
            '<option value="Credit">Credit</option>' +
            '<option value="Debit">Debit</option>' +
            '</select>' +
            '</td>' +
            '<td class="btnRemove" id="btnRemove' + OpeningBalanceview.variables.ListId + '">' +
            '<div>' +
            '<i class="icon-cancel-circle2" onclick="OpeningBalanceview.RemoveRow(this)"></i>' +
            '</div>' +
            '</td>' +
            '</tr>');
        FixValue();
        if (OpeningBalanceview.variables.AddNew == false) {
            setTimeout(function () {
                $("#OpeningBalance_tbody tr:last td:nth-child(2) input").focus();
            }, 100)
        } else {
            OpeningBalanceview.variables.AddNew = false;
        }
        OpeningBalanceview.variables.ListId = OpeningBalanceview.variables.ListId + 1;
    } catch (e) {
        ErrorDetails(e, OpeningBalanceview.variables.File);
    }
}

function makeFileXml(saveDiv) {
    try {

        var xmlsaveFiles = '';
        $(saveDiv).find('tr').each(function (key, obj) {
            if ($(obj).find('.txtItemName').attr('ItemId')) {
                xmlsaveFiles += '<DETAILS>';
                xmlsaveFiles += '<ITEMID>' + $(obj).find('.txtItemName').attr('ItemId') + '</ITEMID>';
                xmlsaveFiles += '<WEIGHT>' + ($(obj).find('.weight').val() || 0) + '</WEIGHT>';
                xmlsaveFiles += '<ITEMOPSIGN>' + ($(obj).find('.ddlItemOpeningSign').val() || 0) + '</ITEMOPSIGN>';
                xmlsaveFiles += '</DETAILS>';
            }
        });
        return { xmlsaveFiles: xmlsaveFiles };
    } catch (e) {
        ErrorDetails(e, Quotationview.variables.File);
    }
}

function notificationTost(type, message) {
    try {
        toastr.remove();
        var positionClass = "toast-top-center";
        if (message.length > 50)
            positionClass = "toast-top-full-width";
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": positionClass,
            "onclick": null,
            "showDuration": "100",
            "hideDuration": "100",
            "timeOut": '3000',
            "extendedTimeOut": "100",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        toastr[type](message);
    } catch (e) {
        ErrorDetails(e, OpeningBalanceview.variables.File);
    }
}


