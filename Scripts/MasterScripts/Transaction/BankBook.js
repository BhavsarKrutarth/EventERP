var ordertd = '', searchtxt, rowid;
var View = "BankBookview"; // -------- variables for keyboard use in tables
var BankBookview = {
    variables: {
        oper: 'Add',
        File: "BankBook.js",
        AddNew: true,
        ListId: 1,
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=BANKTRANSACTIONMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=BANKTRANSACTIONMASTER_CRUD",
        lastelement: '',
        activeElement: '',
    },

    initializeJqgrid: function (url) {
        try {
            colNames = ['ROWNUM', 'Bank Name', 'Vou. Date', 'BANKTRANSACTIONMASID', 'ID', 'Voucher No', 'Tran. Type', 'Account name', 'Account Type', 'Account Id', 'Bank Id', 'Type',
                'Tds Applicable', 'TDS On Amt', 'TDS Id', 'TDS Per', 'Amount', 'Other Amount', 'Discount', 'Remark', 'Total Amount', 'Credit', 'Debit',
                'ISSATTLED', 'Counter Name', 'Order Id', 'Order List', 'Common BankName', 'Cheque No', 'CHEQUEBOOKDETAILID', 'CHEQUENAME', 'Is Editable', 'PAYMENTFROMID',
                'Emp Name', 'BANKPARTYID', 'ACCBALANCE', 'Print'],
                colModel = [
                    { name: "ROWNUM", index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", sortable: true, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
                    { name: "BANKNM", width: 10, index: "BANKNM", xmlmap: xmlvars.common_colmap + "BANKNM", sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "VOUCHERDATE", width: 5, index: "VOUCHERDATE", xmlmap: xmlvars.common_colmap + "VOUCHERDATE", sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "BANKTRANSACTIONMASID", index: "BANKTRANSACTIONMASID", xmlmap: xmlvars.common_colmap + "BANKTRANSACTIONMASID", sortable: true, search: false, hidden: true },
                    { name: "ID", index: "ID", xmlmap: xmlvars.common_colmap + "ID", sortable: true, search: false, hidden: true },
                    { name: "VOUCHERNO", width: 5, index: "VOUCHERNO", xmlmap: xmlvars.common_colmap + "VOUCHERNO", sortable: true, align: 'center', searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TRANTYPE", width: 5, index: "TRANTYPE", xmlmap: xmlvars.common_colmap + "TRANTYPE", sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ACCNM", width: 10, index: "ACCNM", xmlmap: xmlvars.common_colmap + "ACCNM", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ACCTYPE", hidden: true, index: "ACCTYPE", xmlmap: xmlvars.common_colmap + "ACCTYPE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ACCID", hidden: true, index: "ACCID", xmlmap: xmlvars.common_colmap + "ACCID", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "BANKID", hidden: true, index: "BANKID", xmlmap: xmlvars.common_colmap + "BANKID", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TYPE", width: 5, index: "TYPE", xmlmap: xmlvars.common_colmap + "TYPE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TDSAPPLI", hidden: true, index: "TDSAPPLI", xmlmap: xmlvars.common_colmap + "TDSAPPLI", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TDSONAMT", hidden: true, index: "TDSONAMT", xmlmap: xmlvars.common_colmap + "TDSONAMT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TDSID", hidden: true, index: "TDSID", xmlmap: xmlvars.common_colmap + "TDSID", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TDSPER", hidden: true, index: "TDSPER", xmlmap: xmlvars.common_colmap + "TDSPER", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "AMOUNT", hidden: true, index: "AMOUNT", xmlmap: xmlvars.common_colmap + "AMOUNT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "OTHERAMT", hidden: true, index: "OTHERAMT", xmlmap: xmlvars.common_colmap + "OTHERAMT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "DISCOUNT", hidden: true, index: "DISCOUNT", xmlmap: xmlvars.common_colmap + "DISCOUNT", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "REMARK", width: 15, index: "REMARK", xmlmap: xmlvars.common_colmap + "REMARK", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "TOTALAMT", hidden: true, index: "TOTALAMT", xmlmap: xmlvars.common_colmap + "TOTALAMT", sortable: true, searchoptions: jqGridVariables.stringSearchOption },
                    {
                        name: "CREDIT", width: 5, index: "CREDIT", xmlmap: xmlvars.common_colmap + "CREDIT", align: 'right', sortable: true, searchoptions: jqGridVariables.stringSearchOption,
                        summaryTpl: "{0}",
                        summaryType: "sum",
                        formatoptions: { decimalPlaces: 2 },
                        formatter: 'number'
                    },
                    {
                        name: "DEBIT", width: 5, index: "DEBIT", xmlmap: xmlvars.common_colmap + "DEBIT", align: 'right', sortable: true, searchoptions: jqGridVariables.stringSearchOption,
                        summaryTpl: "{0}",
                        summaryType: "sum",
                        formatoptions: { decimalPlaces: 2 },
                        formatter: 'number'
                    },
                    { name: "ISSETTELED", index: "ISSETTELED", xmlmap: xmlvars.common_colmap + "ISSETTELED", sortable: true, search: false, hidden: true, formatter: function (cv, op, ro) { return jqGridVariables.rowColorFmatter(cv, op, ro, 'BankBookview') } },
                    { name: "COUNTERNM", index: "COUNTERNM", xmlmap: xmlvars.common_colmap + "COUNTERNM", sortable: true, search: false, hidden: true },
                    { name: "ORDERID", index: "ORDERID", xmlmap: xmlvars.common_colmap + "ORDERID", sortable: true, search: false, hidden: true },
                    { name: "ORDERLIST", index: "ORDERLIST", xmlmap: xmlvars.common_colmap + "ORDERLIST", sortable: true, search: false, hidden: true },
                    { name: "COMMONBANKNM", index: "COMMONBANKNM", xmlmap: xmlvars.common_colmap + "COMMONBANKNM", sortable: true, search: false, hidden: true },
                    { name: "CHEQUENO", index: "CHEQUENO", xmlmap: xmlvars.common_colmap + "CHEQUENO", sortable: true, search: false, hidden: true },
                    { name: "CHEQUEBOOKDETAILID", index: "CHEQUEBOOKDETAILID", xmlmap: xmlvars.common_colmap + "CHEQUEBOOKDETAILID", sortable: true, search: false, hidden: true },
                    { name: "CHEQUENAME", index: "CHEQUENAME", xmlmap: xmlvars.common_colmap + "CHEQUENAME", sortable: true, search: false, hidden: true },
                    { name: "ISEDITABLE", index: "ISEDITABLE", xmlmap: xmlvars.common_colmap + "ISEDITABLE", sortable: true, search: false, hidden: true },
                    { name: "PAYMENTFROMID", index: "PAYMENTFROMID", xmlmap: xmlvars.common_colmap + "PAYMENTFROMID", sortable: true, search: false, hidden: true },
                    { name: "EMPNAME", width: 5, index: "EMPNAME", align: 'center', xmlmap: xmlvars.common_colmap + "EMPNAME", sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "BANKPARTYID", width: 5, index: "BANKPARTYID", align: 'center', xmlmap: xmlvars.common_colmap + "BANKPARTYID", hidden: true, sortable: true, search: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ACCBALANCE", width: 5, index: "ACCBALANCE", align: 'center', xmlmap: xmlvars.common_colmap + "ACCBALANCE", hidden: true, sortable: true, search: true },
                    /*{ name: "print", exportcol: false, index: "print", width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.printBtnFmatter(cv, op, ro, 'BankBookview') } },*/
                    {
                        name: 'print', exportcol: false, index: 'print', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) {
                            var Id = $(ro.childNodes[2])[0].innerHTML;
                            return "<button onclick=\"BankBookview.PrintProcess(" + Id + ");\" type='button' data-toggle='tooltip' data-placement='bottom' title='Record Print' class='btn acto-actionbtn actionprint'><i class='fa fa-print'></i></button>";
                            //return jqGridVariables.printBtnFmatter(cv, op, ro, 'BankBookview');
                            //return "<button onclick=\"BankBookview.print(" + op.rowId + ");\" type='button' data-toggle='tooltip' data-placement='bottom' title='Record Print' class='btn acto-actionbtn actionprint'><i class='fa fa-print'></i></button>";
                        }
                    }
                ];

            colNames.push('Action');
            colModel.push({ name: 'act', index: 'act', exportcol: false, width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ActionBtnFmatter(cv, op, ro, 'BankBookview') } });
            //$("#table_CashOnHand").GridUnload();
            $.jgrid.gridUnload("#table_CashOnHand");
            $("#table_CashOnHand").jqGrid({
                url: getDomain() + url,
                datatype: "xml",
                height: getGridHeight(),
                scroll: 1,
                autowidth: true,
                shrinkToFit: true,
                rowNum: 30,
                rowList: [20, 30, 50],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_CashOnHand",
                footerrow: true,
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: /*"ROWNUM"*/"BANKTRANSACTIONMASID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');

                    setTimeout(function () {
                        var width = $('#jqgrid_CashOnHand').width();
                        if (width <= 430) {
                            width = 1000;
                        }
                        $('#table_CashOnHand').setGridWidth(width);
                    }, 200)
                    //$('#table_CashOnHand').jqGrid('setSelection', $('#table_CashOnHand').jqGrid('getDataIDs')[0]);
                    jQuery("#table_CashOnHand").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

                    for (var i = 0; i < rowsToColor.length; i++) {
                        var status = $("#" + rowsToColor[i]).find("[aria-describedby='table_CashOnHand_ISSETTELED']").text();
                        if (status == "1") {
                            $("#" + rowsToColor[i]).find("td").css("background-color", "rgba(241, 238, 139, 0.25098039215686274)");
                        }
                    }
                    var $self = $(this);
                    $self.jqGrid("footerData", "set", {
                        CREDIT: parseFloat($self.jqGrid("getCol", "CREDIT", false, "sum")).toFixed(2),
                        DEBIT: parseFloat($self.jqGrid("getCol", "DEBIT", false, "sum")).toFixed(2),
                    });
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'VOUCHERDATE',
                sortorder: 'desc',
                ondblClickRow: function (rowid) {
                    if (isU()) {
                        BankBookview.triggerId(rowid, 'edit')
                    }
                }
            });

            // JqGrid navigations shortcuts
            jQuery("#table_CashOnHand").jqGrid('bindKeys', {
                "onEnter": function (rowid) {
                    BankBookview.triggerId(rowid, 'edit')
                }
            });

            // Setup buttons
            $("#table_CashOnHand").jqGrid('navGrid', '#pager_CashOnHand',
                { edit: false, add: false, del: false, search: false, refresh: true },
                { height: 320 }
            );
            $("#pager_CashOnHand_left").css("width", "");
            AlignJqGridHeader('table_CashOnHand', ['edit', 'act', 'VOUCHERNO', 'CREDIT', 'DEBIT']);
        }
        catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },

    triggerId: function (id) {
        try {
            $("#panelEdit").show();
            $("#panelView").hide();
            $("#hdnBankBookId").val(id);
            $(".voucherno").show();
            BankBookview.variables.oper = 'Edit';
            rowData = jQuery("#table_CashOnHand").getRowData(id);
            var Delete = '<i class="icon-trash" style="color:red;cursor:pointer;font-size:medium;" onclick="BankBookview.RemoveRow(this)"></i>'
            if (parseInt(rowData['ISSETTELED']) > 0) {
                Delete = '';
                $("#btnSaveCashOnHand").hide();
                $("#btnPrint").show();
                $("#btnSavePrint").hide();
            } else {
                if (isSDL() && ConvertDateToTimeStamp($.datepicker.formatDate('dd/mm/yy', new Date())) != ConvertDateToTimeStamp(rowData['VOUCHERDATE'])) {
                    $("#btnSaveCashOnHand").hide();
                    $("#btnPrint").show();
                    $("#btnSavePrint").hide();
                } else {
                    $("#btnSaveCashOnHand").show();
                    $("#btnPrint").hide();
                    $("#btnSavePrint").show();
                }
            }

            $("#txtvoucherno").val(rowData['VOUCHERNO']);
            var today = (rowData['VOUCHERDATE'].split('/'));
            $("#ddlBank").val(rowData["BANKID"]);
            //$("#BankAccountName").val(rowData["BANKPARTYID"]);
            $("#txtVoucherDate").val(today[2] + '-' + today[1] + '-' + today[0]);
            $("#ddlBillType").val(rowData["TRANTYPE"] == 'Payment' ? 'Receipt' : 'Payment');

            if (rowData['ACCBALANCE'] >= 0) {
                $("#txtAccBal").val((rowData['ACCBALANCE']) + ' CR');
            }
            else {
                $("#txtAccBal").val((rowData['ACCBALANCE']) + ' DR');
            }

            $("#PaymentList_tbody").html("");
            $("#PaymentList_tbody").append('<tr BankTranMasId="' + id + '">' +
                '<td style="text-align:center;"></td>' +
                '<td><input class="col-sm-10 AccName required txtAutocomplete acto-accountsuggest" value="' + rowData["ACCNM"] + '" AccId="' + rowData["ACCID"] + '" AccType="' + rowData["ACCTYPE"] + '" onblur="BankBookview.validation(this)" onkeyup="BankBookview.AutosuggestAccountName(this)" id="AccName' + BankBookview.variables.ListId + '" name="AccName' + BankBookview.variables.ListId + '"/></td>' +
                '<td>' +
                '<select class="form-control ddlType" id="ddlType' + BankBookview.variables.ListId + '" name="ddlType' + BankBookview.variables.ListId + '" onblur="BankBookview.TypeOnAdvance(this)" onchange="BankBookview.TypeOnAdvance(this)">' +
                '<option value="OutStanding">OutStanding</option>' +
                '<option value="Advance">Advance</option>' +
                '<option value="Other">Other</option>' +
                '</select>' +
                '</td>' +
                '<td class="txtOrder Order" orderid="' + rowData["ORDERID"] + '" style="display:none;">' + rowData["ORDERLIST"] + '</td>' +
                '<td><input class="form-control txtR numbers Amount fixed required" decimals="2" value="' + parseFloat(rowData["AMOUNT"]).toFixed(2) + '" onkeyup="BankBookview.ViewNumber(this)" onkeydown="BankBookview.ViewNumber(this)" onblur="BankBookview.validation(this)" id="Amount' + BankBookview.variables.ListId + '" name="Amount' + BankBookview.variables.ListId + '" /></td>' +
                //'<td><input class="form-control txtR numbers OtherAmount fixed" decimals="2" value="' + parseFloat(rowData["OTHERAMT"]).toFixed(2) + '" onkeyup="BankBookview.ViewNumber(this)" onkeydown="BankBookview.ViewNumber(this)"  id="OtherAmount' + BankBookview.variables.ListId + '" onblur="TDSChange(this,' + BankBookview.variables.ListId + ')" /></td>' +
                '<td><select class="form-control ddlPaymentType required" onblur="BankBookview.PaymentType(' + BankBookview.variables.ListId + ')" id="ddlPaymentType' + BankBookview.variables.ListId + '" name="ddlPaymentType' + BankBookview.variables.ListId + '"></select></td>' +
                '<td class="PartyBank"><input class="form-control BankName required" rptfile="" value="' + rowData["COMMONBANKNM"] + '" onblur="BankBookview.validation(this)" id="BankName' + BankBookview.variables.ListId + '" name="BankName' + BankBookview.variables.ListId + '" /></td>' + //onkeyup="BankBookview.AutosuggestCommonBankName(this)"
                '<td style="display:inherit;">' +
                '<input class="form-control number txtR ChequeNo required" chequeid="' + rowData["CHEQUENO"] + '" chequebookdetailid="' + rowData["CHEQUEBOOKDETAILID"] + '" value="' + rowData["CHEQUENO"] + '" chequename="' + rowData["CHEQUENAME"] + '" onblur="BankBookview.validation(this)" id="ChequeNo' + BankBookview.variables.ListId + '" name="ChequeNo' + BankBookview.variables.ListId + '" />' +
                '<span class="input-group-btn printCheque" style="display: none;" onmousedown="PrintCheque(this)">' +
                '<button class="btn btn-default" type="button" id="PrintCheque' + BankBookview.variables.ListId + '" style="padding: 3px;margin-top:1px;"><i class="icon-printer2"></i></button>' +
                '</span>' +
                '</td>' +
                '<td>' +
                '<select type="text" class="form-control tdstype" name="TDSApplicableType' + BankBookview.variables.ListId + '" id="ddl_TDSApplicableType' + BankBookview.variables.ListId + '" onchange="TDSChange(this,' + BankBookview.variables.ListId + ')" onfocusout="TDSChange(this,' + BankBookview.variables.ListId + ')">' +
                '<option value="0">Not Applicable</option>' +
                '<option value="1">Yes</option>' +
                '</select>' +
                '</td>' +
                '<td>' +
                '<select type="text" TDSPer="' + rowData["TDSPER"] + '" class="form-control ddl_TDS" name="TDS' + BankBookview.variables.ListId + '" id="ddl_TDS' + BankBookview.variables.ListId + '" onchange="BankBookview.CalculateTDSAmt(this)"></select>' +
                '</td>' +

                '<td>' +
                '<input value="' + rowData["TDSONAMT"] + '" onblur="ValueChange(' + BankBookview.variables.ListId + ')" disabled type="text" class="form-control txtR numbers fixed txtTDSAmt" decimals="2" name="TDSAmt' + BankBookview.variables.ListId + '" id="txtTDSAmt' + BankBookview.variables.ListId + '" onchange="TDSChange(this,' + BankBookview.variables.ListId + ')" />' +
                '</td>' +
                '<td><input class="form-control txtR numbers Discount fixed" value="' + rowData["DISCOUNT"] + '" decimals="2" onkeyup="BankBookview.ViewNumber(this)" onkeydown="BankBookview.ViewNumber(this)" onblur="BankBookview.validation(this)" id="txtDiscount' + BankBookview.variables.ListId + '" name="Discount' + BankBookview.variables.ListId + '" /></td>' +
                '<td>' +
                '<input value="' + rowData["TOTALAMT"] + '" onblur="ValueChange(' + BankBookview.variables.ListId + ')" type="text" class="form-control txtR numbers fixed txtTotalAmt" decimals="2" name="TotalAmt' + BankBookview.variables.ListId + '" id="txtTotalAmt' + BankBookview.variables.ListId + '" disabled/>' +
                '</td>' +
                '<td><input class="form-control required Remark txtAutocomplete" value="' + rowData["REMARK"] + '" onkeyup="AutosuggestRemark(this)" id="Remark' + BankBookview.variables.ListId + '" name="Remark' + BankBookview.variables.ListId + '" /></td>' +
                '<td class="btnRemove" id="btnRemove' + BankBookview.variables.ListId + '">' +
                '<div>' +// Delete+
                '</div>' +
                '</td>' +
                '</tr>');
            Autosuggest();
            if (rowData["TRANTYPE"] == 'Payment') {
                $("#lblBank").html('Cheque Name');
                $("#txtBankVal").val(rowData["CHEQUENAME"] == '[object Object]' ? '' : rowData["CHEQUENAME"]);
            } else {
                $("#lblBank").html('Bank Name');
                $("#txtBankVal").val(rowData["COMMONBANKNM"] == '[object Object]' ? '' : rowData["COMMONBANKNM"]);
            }
            $("#ddlType" + BankBookview.variables.ListId).val(rowData["TYPE"]);
            FixValue();
            OnBlur();
            $("#ddl_TDSApplicableType" + BankBookview.variables.ListId).val(rowData["TDSAPPLI"]);
            if (rowData["TDSAPPLI"] == 0) {
                $("#ddl_TDS" + BankBookview.variables.ListId).attr('disabled', 'disabled');
            }

            BankBookview.Sum();
            if (rowData["ORDERID"]) {
                $(".txtOrder").show();
            }
            else {
                $(".txtOrder").hide();
            }
            BankBookview.BindTDSDropDown(BankBookview.variables.ListId);
            $("#ddl_TDS" + BankBookview.variables.ListId).val(rowData["TDSID"]);
            BankBookview.BindPaymentTypeDropDown(BankBookview.variables.ListId);
            $("#ddlPaymentType" + BankBookview.variables.ListId).val(rowData["PAYMENTFROMID"]);

            $("#txtTDSDeductOnAmt" + BankBookview.variables.ListId).attr('disabled', 'disabled');
            $("#ddl_TDS" + BankBookview.variables.ListId).attr('disabled', 'disabled');
            $("#txtTDSAmt" + BankBookview.variables.ListId).attr('disabled', 'disabled');
            $("#AccName" + BankBookview.variables.ListId).focus();
            if (rowData["TRANTYPE"] == 'Receipt') {
                $(".ChequeNo").attr("required", "required");
                $(".PartyBank").hide();
                $("#PrintCheque" + BankBookview.variables.ListId).parent().hide();
            }
            else {
                $(".ChequeNo").removeAttr("required");
                $(".PartyBank").hide();
                if ($("#ddlPaymentType" + BankBookview.variables.ListId + " option:selected").text() == "BANK") {
                    $("#PrintCheque" + BankBookview.variables.ListId).parent().show();
                } else {
                    $("#PrintCheque" + BankBookview.variables.ListId).parent().hide();
                }
            }
            BankBookview.variables.ListId = BankBookview.variables.ListId + 1;
            BankBookview.Sum();
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "ACTION", op: "eq", data: "COH" });
            myfilter.rules.push({ field: "ACCOUNTID", op: "eq", data: rowData["ACCID"] });
            myfilter.rules.push({ field: "ACCOUNTTYPE", op: "eq", data: rowData["ACCTYPE"] });
            myfilter.rules.push({ field: "ORDERID", op: "eq", data: rowData["ORDERID"] });
            var url = getDomain() + "/Common/BindMastersDetails?ServiceName=SALESORDER_GET&myfilters=" + JSON.stringify(myfilter);
            $.ajax({
                url: url,
                type: "POST",
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        $("#tbody_OrderList").html("");
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            var DecimalHelper = { format: decimal };
                            $("#tbody_OrderList").html($("#OrderRender").render(JsonObject.serviceresponse.detailslist.details, DecimalHelper));
                            //$("#ModalOrder").modal('show');
                            $(".chkAPItem").prop("checked", true);
                            BankBookview.OrderChkEvent();
                        }
                        //else {
                        //    notificationTost('warning', $(data).find('RESPONSEMESSAGE').text());
                        //}
                    }
                    else {
                        $("#tbody_OrderList").html("");
                        notificationTost('error', $(data).find('RESPONSEMESSAGE').text());
                    }
                }
            });
            $("#PaymentList_tbody tr input").focus(function () {
                try {
                    rowid = $($(this).parent().parent()).find('.AccName').attr('id').replace('AccName', '');
                    if ($("#ddlBillType").val() == 'Payment') {
                        $("#txtBankVal").val($("#BankName" + rowid).val());
                    } else {
                        $("#txtBankVal").val($("#ChequeNo" + rowid).attr('ChequeName'));
                    }
                } catch (e) {
                    ErrorDetails(e, BankBookview.variables.File);
                }
            });
            FirstSelect();
            rowFocus();
        } catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    RemoveRow: function (row) {

        $(row).closest('tr').remove();
        $("#PaymentList_tbody tr:last td:last").html('<div>' +
            '<i class="icon-trash" style="color:red;cursor:pointer;font-size:medium;" onclick="BankBookview.RemoveRow(this)"></i>' +
            '</div>');
        if ($("#PaymentList_tbody tr").length >= 1) {
            $("#PaymentList_tbody tr:first td:last div").remove();
        }
        BankBookview.Sum();
    },
    validation: function (id) {
        try {
            BankBookview.Sum(id);
            if (!$("#" + id.id).hasClass("Discount") && !$("#" + id.id).hasClass("ChequeNo")) {
                if ($("#" + id.id).val()) {
                    $("#" + id.id).removeClass('table-input-error');
                } else {
                    $("#" + id.id).addClass('table-input-error');
                }
            }
            if ($("#" + id.id).hasClass("ChequeNo") && !$("#" + id.id).val()) {
                $("#" + id.id).addClass('table-input-error');
            }
            else if ($("#" + id.id).hasClass("ChequeNo") && $("#" + id.id).val()) {
                $("#" + id.id).removeClass('table-input-error');
            }
        } catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },

    SaveData: function (IsPrint) {
        try {
            BankBookview.VoucherDateCheck();

            isvalid = $("#FrmPaymentList").valid();
            if (!isvalid) {
                return false;
            }
            var ItemName = $(".AccName");
            var i = 1;
            if ($("#PaymentList_tbody tr").length > 1) {
                for (i; ItemName.length > i; i++) {
                    if ($("#" + ItemName[i].id).val() == '') {
                        $(ItemName[i]).parent().parent().remove();
                    }
                }
            }

            var ItemName = $(".Remark");
            var i = 0;
            if ($("#PaymentList_tbody tr").length > 0) {
                for (i; ItemName.length > i; i++) {
                    if ($("#" + ItemName[i].id).val() == '') {
                        $("#" + ItemName[i].id).addClass('table-input-error');
                    } else {
                        $("#" + ItemName[i].id).removeClass('table-input-error');
                    }
                }
            }

            if ($("#PaymentList_tbody tr").length == 0) {
                notificationTost('warning', 'Atleast one account entry required');
                return false;
            }
            $("#PaymentList_tbody tr").each(function (key, obj) {
                if (!$(obj).find(".Amount").val()) {
                    $(obj).find(".Amount").addClass('table-input-error');
                    isvalid = false;
                }

                if (!$(obj).find(".AccName").val()) {
                    $(obj).find(".AccName").addClass('table-input-error');
                    isvalid = false;
                }
            });
            if (!isvalid) {
                notificationTost('warning', 'Account Name and amount is required.');
                return false;
            }

            if ($("#PaymentList_tbody tr").find(".table-input-error").length > 0) {
                notificationTost('warning', 'Fields with red lines are required.');
                return false;
            }
            var xmlsaveFiles = "<BANKTRANSACTIONDETAIL>";
            var resultXml = makeFileXml('#PaymentList_tbody');
            if (resultXml.xmlsaveFiles == '') {
                return;
            }
            xmlsaveFiles += resultXml.xmlsaveFiles;
            xmlsaveFiles += "</BANKTRANSACTIONDETAIL>";

            var data = {
                "DATE": $("#txtVoucherDate").val(),
                "oper": BankBookview.variables.oper,
                "XMLPARAM": escape(xmlsaveFiles),
                "VOUCHERNO": $("#txtvoucherno").val(),
                "BANKID": $("#ddlBank").val(),
                //"BANKPARTYID": $("#BankAccountName").val(),
                "TRANTYPE": $("#ddlBillType").val() == 'Payment' ? 'Receipt' : 'Payment'
            };

            $.ajax({
                url: getDomain() + BankBookview.variables.PerformMasterOperationUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        if (!IsPrint) {
                            notificationMessage(BankBookview.variables.oper + ' Operation', $(data).find('RESPONSEMESSAGE').text(), 'success');
                            if ($(location).attr('search').split('='))
                                if ($(location).attr('search').split('=')[1]) {
                                    window.top.close();
                                    return;
                                }
                        }

                        BankBookview.variables.ListId = 1;
                        BankBookview.variables.AddNew = true;
                        BankBookview.variables.oper = 'Add';
                        $("#NumberShow").html('');
                        $("#PaymentList_tbody").html('');
                        jQuery("#table_CashOnHand").trigger('reloadGrid');
                        //$("#hdnBankBookId").val('');
                        $("#FrmPaymentList").trigger("reset");
                        $("#FrmPaymentList").validate().resetForm();
                        $("#FrmAccBal").trigger("reset");
                        $("#TDSdeductonamt").html('0.00');
                        $("#TDSamt").html('0.00');
                        $("#TotalAmt").html('0.00');
                        $("#TotalOtherAmt").html('0.00');
                        $("#Discount").html('0.00');
                        $("#txtAccBal").val("");
                        $("#hdnBankId").val("");
                        $("#txtBank").val("");
                        var TodayDate = new Date().toISOString().split('T')[0];
                        $("#txtVoucherDate").val(TodayDate);
                        $(".voucherno").hide();
                        BankBookview.variables.AddNew = true;
                        ItemAddNewRow();
                        $("#ddlBillType").val('Payment');
                        selectpt();
                        setTimeout(function () {
                            FirstSelect();
                        }, 100);
                    } else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            });
        }
        catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            var rowData = jQuery("#table_CashOnHand").getRowData(id);
            if (parseInt(rowData["ISSETTELED"]) == 1) {
                notificationMessage('Warning', 'This amount settlement is done. You can not delete this.', 'warning')
            }
            else {
                $("#CashOnHandDelete").modal('show');
                $("#hdnBankBookId").val(id);
                $("#delType").html(rowData['TRANTYPE']);
                $("#delAccname").html(rowData['ACCNM']);
                $("#delVoucherNo").html(rowData['VOUCHERNO']);
                $("#delVoucherDate").html(rowData['VOUCHERDATE']);
                $("#delAmt").html(rowData['TOTALAMT']);
            }
        } catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    DeleteSubmit: function () {
        try {
            var data = {
                "BANKTRANSACTIONMASID": $("#hdnBankBookId").val(),
                "oper": 'Delete',
            };
            $.ajax({
                url: getDomain() + BankBookview.variables.PerformMasterOperationUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        notificationMessage('Success', $(data).find('RESPONSEMESSAGE').text(), 'success');
                        $("#CashOnHandDelete").modal('hide');
                        jQuery("#table_CashOnHand").trigger('reloadGrid');
                    } else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            });
        } catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    BindTDSDropDown: function (id) {
        try {
            $("#ddl_TDS" + id).html("");
            BindDropdown('ddl_TDS' + id, 'TDSDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=TDSMASTER_GET&IsRecordAll=true&ISACTIVE=1&COLUMNREQUESTED=TDSID,CODE,PERCENTAGE", '--Select TDS--', true);
        } catch (e) {
            ErrorDetails(e, JournalVoucherView.variables.File);
        }
    },
    BindPaymentTypeDropDown: function (id) {
        try {
            $("#ddlPaymentType" + id).html("");
            BindDropdown('ddlPaymentType' + id, 'CommonMasterDetailDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COMMONMASTERDETAIL_GET&ISACTIVE=1&IsRecordAll=true&_search=true&ColumnRequested=COMMONMASTERDETAILID,COMMONMASTERDETAILNAME&IsRecordAll=true&sidx=COMMONMASTERDETAILNAME&sord=asc&searchField=COMMONMASTERNAME&searchOper=eq&searchString=Payment Type", '--Select Type--', true);
            setTimeout(function () {
                $("#ddlPaymentType" + id + " option").filter(function () {
                    return this.text == 'BANK';
                }).prop('selected', 'selected');
            }, 50);
            $("#ddlPaymentType" + id).on('change', function () {
                var paymentType = $("#ddlPaymentType" + id + " option:selected").text();
                if (paymentType == 'BANK') {
                    $("#BankName" + id).addClass('required');
                    $("#BankName" + id).removeAttr('disabled');
                    $("#ChequeNo" + id).removeAttr('disabled');
                    $("#ChequeNo" + id).val($("#ChequeNo" + id).attr('chequeid'));
                    if ($("#ddlBillType").val() == 'Payment') {
                        $("#PrintCheque" + id).parent().hide();
                    } else {
                        $("#PrintCheque" + id).parent().show();
                    }
                } else {
                    $("#BankName" + id).removeClass('required');
                    $("#BankName" + id).removeClass('table-input-error');
                    $("#BankName" + id).attr('disabled', 'disabled');
                    $("#ChequeNo" + id).attr('disabled', 'disabled');
                    $("#ChequeNo" + id).val('');
                    $("#PrintCheque" + id).parent().hide();
                }
                //if (paymentType == 'RTGS' || paymentType == 'IMPS' || paymentType == 'NEFT') {
                //    if ($("#ddlBank option:selected").attr('banklink'))
                //        window.open($("#ddlBank option:selected").attr('banklink'), '_blank');
                //}
            });

        } catch (e) {
            ErrorDetails(e, JournalVoucherView.variables.File);
        }
    },
    AutosuggestAccountName: function (id) {
        try {
            $("#" + id.id).autocomplete({
                source: function (request, response) {
                    var myfilter = { rules: [] };

                    var Value = $("#" + id.id).val();
                    var PartyName = Value.replace(/[^a-z0-9\s]/gi, '');

                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: PartyName }); //$("#" + id.id).val()
                    myfilter.rules.push({ field: "BANKID", op: "eq", data: $("#ddlBank").val() });
                    myfilter.rules.push({ field: "EMPLOYEE", op: "eq", data: 1 });
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
                                    var List;
                                    if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    else
                                        List = JsonObject.serviceresponse.detailslist;
                                    response(
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {

                                                return {
                                                    label: item.accountname + '-' + (item.contact || ""),
                                                    value: item.accountname,
                                                    name: item.accountname,
                                                    accounttype: item.accounttype || "",
                                                    Id: item.accid,
                                                    balance: item.balanceamt,
                                                    chequeno: item.chequeno || "",
                                                    chequebookdetailid: item.chequebookdetailid,
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    cityname: item.cityname || "",
                                                    mobile: item.contact || "",
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.accountname + '-' + (item.contact || ""),
                                                    value: item.accountname,
                                                    name: item.accountname,
                                                    accounttype: item.accounttype || "",
                                                    Id: item.accid,
                                                    balance: item.balanceamt,
                                                    chequeno: item.chequeno || "",
                                                    chequebookdetailid: item.chequebookdetailid,
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    cityname: item.cityname || "",
                                                    mobile: item.contact || "",
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id.id).val().length <= 1) {
                                        $("#" + id.id).attr('AccId', '');
                                        $("#" + id.id).attr('AccType', '');
                                        $("#txtAccBal").val("");
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
                                if ($("#" + id.id).val().length <= 1) {
                                    $("#" + id.id).attr('AccId', '');
                                    $("#" + id.id).attr('AccType', '');
                                    $("#txtAccBal").val("");
                                }
                                notificationMessage('Account Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                            }
                        }
                    })
                },
                messages: {
                    noResults: "No Results Found"
                },
                select: function (event, ui) {
                    if (ui.item.label != 'No Results Found') {

                        if (ui.item.chequeno) {
                            $("#" + id.id).attr('AccId', ui.item.Id);
                            $("#" + id.id).attr('AccType', ui.item.accounttype);
                            if (ui.item.balance >= 0) {
                                $("#txtAccBal").val(parseFloat(ui.item.balance).toFixed(2) + ' CR');
                            } else {
                                $("#txtAccBal").val(parseFloat(ui.item.balance).toFixed(2) + ' DR');
                            }

                            if ($("#ddlBillType").val() == 'Receipt') {
                                if (parseInt((id.id).replace('AccName', '')) > 1 && $(".ChequeNo:enabled:nth-last-child(2)").val() != '') {
                                    $("#ChequeNo" + (id.id).replace('AccName', '')).attr('chequeid', ("0000" + (+$(".ChequeNo:enabled:not(" + "#ChequeNo" + (id.id).replace('AccName', '') + "):last").val() + 1)).substring(1, 7));
                                    $("#ChequeNo" + (id.id).replace('AccName', '')).val(("0000" + (+$(".ChequeNo:enabled:not(" + "#ChequeNo" + (id.id).replace('AccName', '') + "):last").val() + 1)).substring(1, 7));
                                } else {
                                    $("#ChequeNo" + (id.id).replace('AccName', '')).val((ui.item.chequeno).replace(/"/g, ''));
                                    $("#ChequeNo" + (id.id).replace('AccName', '')).attr('chequeid', (ui.item.chequeno).replace(/"/g, ''));
                                }

                                $("#ChequeNo" + (id.id).replace('AccName', '')).attr('chequebookdetailid', ui.item.chequebookdetailid);

                                if ($("#ddlPaymentType" + (id.id).replace('AccName', '') + " option:selected").text() == "BANK") {
                                    $("#PrintCheque" + (id.id).replace('AccName', '')).parent().show();
                                } else {
                                    $("#PrintCheque" + (id.id).replace('AccName', '')).parent().hide();
                                }
                                $("#txtBankVal").val(ui.item.value == '[object Object]' ? '' : ui.item.value);
                                $("#ChequeNo" + rowid).attr('ChequeName', ui.item.value);
                            } else {
                                $("#txtBankVal").val('');
                                $("#ChequeNo" + rowid).attr('ChequeName', '');
                            }
                            BankBookview.variables.activeElement = this;
                        } else {
                            $("#ddlBank").focus();
                            notificationTost('warning', 'Select another bank.');
                        }
                    } else {
                        setTimeout(function () {
                            $("#" + id.id).val('');
                        }, 1)
                    }
                },
                minLength: 3,
                autoFocus: true
            });
        }
        catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    Sum: function (id) {
        try {
            if (id) {
                var total, prefix;
                if ($("#" + id.id).hasClass("Amount")) {
                    prefix = id.id.replace("Amount", "");
                }
                if ($("#" + id.id).hasClass("OtherAmount")) {
                    prefix = id.id.replace("OtherAmount", "");
                }
                if ($("#" + id.id).hasClass("Discount")) {
                    prefix = id.id.replace("txtDiscount", "");
                }
                if (prefix != '') {
                    $("#txtTotalAmt" + prefix).val(parseFloat((+($("#Amount" + prefix).val() || 0) + +($("#OtherAmount" + prefix).val() || 0)) - (+($("#txtTDSAmt" + prefix).val() || 0) + +($("#txtDiscount" + prefix).val() || 0))).toFixed(2));
                }

            }
            $("#NumberShow").html('');
            var sum = 0;
            $('.Amount').each(function () {
                sum += +this.value;
            });
            $("#TotalAmt").html(parseFloat(sum || 0).toFixed(2));

            var sum = 0;
            $('.OtherAmount').each(function () {
                sum += +this.value;
            });
            $("#TotalOtherAmt").html(parseFloat(sum || 0).toFixed(2));
            var sum = 0;
            $(".Discount").each(function () {
                sum += +this.value;
            });
            $("#Discount").html(parseFloat(sum || 0).toFixed(2));
            var sum = 0;
            $(".txtTotalAmt").each(function () {
                sum += +this.value;
            });
            $("#Totalamt").html(parseFloat(sum || 0).toFixed(2));
        } catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    ClearData: function () {
        try {
            BankBookview.variables.ListId = 1;
            BankBookview.variables.AddNew = true;
            BankBookview.variables.oper = 'Add';
            $("#NumberShow").html('');
            $("#PaymentList_tbody").html('');
            jQuery("#table_CashOnHand").trigger('reloadGrid');
            $("#hdnBankBookId").val('');
            $("#btnSaveCashOnHand").show();
            $("#btnPrint").hide();
            $("#btnSavePrint").show();
            $("#FrmPaymentList").trigger("reset");
            $("#FrmPaymentList").validate().resetForm();
            $("#FrmAccBal").trigger("reset");
            $("#TDSdeductonamt").html('0.00');
            $("#TDSamt").html('0.00');
            $("#TotalAmt").html('0.00');
            $("#TotalOtherAmt").html('0.00');
            $("#Discount").html('0.00');
            $("#txtAccBal").val("");
            $("#hdnBankId").val("");
            $("#txtBank").val("");
            $("#ddlBank").val($("#empdefaultbankid").val());
            var TodayDate = new Date().toISOString().split('T')[0];
            $("#txtVoucherDate").val(TodayDate);
            BankBookview.VoucherDateCheck();
            $("#panelView").show();
            $("#panelEdit").hide();
            $("#btnSaveCashOnHand").show();
            $(".voucherno").hide();
            $("#btnPrint").hide();
        }
        catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    ViewNumber: function (id) {
        try {
            if ($("#" + id.id).val()) {
                $("#NumberShow").html(convertNumberToWords($("#" + id.id).val()));
            } else {
                $("#NumberShow").html('');
            }
        } catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    TypeOnAdvance: function (e) {
        //if (BankBookview.variables.oper == 'Add') {
        if ($("#ddlBillType").val() == "Payment") {
            if ($(e).val() == "Advance") {
                var AccId = $(e).parent().parent().find(".AccName").attr("AccId");
                var AccType = $(e).parent().parent().find(".AccName").attr("AccType");
                ordertd = $(e).parent().parent().find(".Order");
                if (AccId) {
                    BankBookview.GetPartyCustomerOrder(AccId, AccType);
                }
                else {
                    notificationTost('warning', 'Please select valid account for advance order selection.');
                    $(e).val("OutStanding");
                }
                $(".txtOrder").show();
            } else {
                $(".txtOrder").hide();
                $("#ModalOrder").modal('hide');
            }
        }
        //}
        //else {
        //    if ($(e).val() == "Advance") {
        //        $("#ModalOrder").modal('show');
        //    }
        //}
    },
    GetPartyCustomerOrder: function (Id, Type) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "ACTION", op: "eq", data: "COH" });
        myfilter.rules.push({ field: "ACCOUNTID", op: "eq", data: Id });
        myfilter.rules.push({ field: "ACCOUNTTYPE", op: "eq", data: Type });
        var url = getDomain() + "/Common/BindMastersDetails?ServiceName=SALESORDER_GET&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: url,
            type: "POST",
            async: false,
            cache: false,
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $("#tbody_OrderList").html("");
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var DecimalHelper = { format: decimal };
                        $("#tbody_OrderList").html($("#OrderRender").render(JsonObject.serviceresponse.detailslist.details, DecimalHelper));
                        $("#ModalOrder").modal('show');
                        BankBookview.OrderChkEvent();
                    }
                    else {
                        notificationTost('warning', 'Data Not Found');
                    }
                }
                else {
                    $("#tbody_OrderList").html("");
                    notificationTost('error', $(data).find('RESPONSEMESSAGE').text());
                }
            }
        });

    },
    OrderChkEvent: function () {
        $("#chk_SelectAllOrder").on("change", function () {
            if ($("#chk_SelectAllOrder").prop("checked")) {
                $("#tbody_OrderList").find('.chkAPItem').prop('checked', true);
            }
            else {
                $("#tbody_OrderList").find('.chkAPItem').prop('checked', false);
            }

            if ($("#tbody_OrderList .chkAPItem:checked").length > 0) {
                $("#btnImport").attr('disabled', false);
            }
            else {
                $("#btnImport").attr('disabled', true);
            }
        });

        $("#tbody_OrderList .chkAPItem").on("change", function () {
            if ($("#tbody_OrderList .chkAPItem:checked").length > 0) {
                $("#btnImport").attr('disabled', false);
            }
            else {
                $("#btnImport").attr('disabled', true);
            }

            if ($("#tbody_OrderList .chkAPItem:unchecked").length > 0) {
                $("#chk_SelectAllOrder").prop("checked", false);
            }
            else {
                $("#chk_SelectAllOrder").prop("checked", true);
            }
        });
    },
    BtnImportOrder: function () {
        if ($("#tbody_OrderList .chkAPItem:checked").length > 0) {
            var VoucherNo = '', VoucherId = '';

            $("#tbody_OrderList .chkAPItem:checked").each(function (key, obj) {
                VoucherNo += $(obj).parent().parent().find(".voucherno").html() + ",";
                VoucherId += $(obj).parent().parent().attr("orderid") + ',';
            });

            $(ordertd).html(VoucherNo.substr(0, VoucherNo.length - 1));
            $(ordertd).attr("orderid", VoucherId.substr(0, VoucherId.length - 1))
            $(".txtOrder").show();
            $(ordertd).parent().parent().find(".Amount").focus();
            $("#ModalOrder").modal("hide");
            ordertd = '';
        }
        else {
            notificationTost("warning", "Please select atleast one sales order.");
        }
    },
    CalculateTDSAmt: function (e) {
        var TDSPer = +$(e).find(":selected").attr("percentage");
        var Amt = +$(e).parent().parent().find(".Amount").val();
        var OtherAmt = +$(e).parent().parent().find(".OtherAmount").val();
        $(e).parent().parent().find(".ddl_TDS").attr("TDSPer", TDSPer);
        $(e).parent().parent().find(".txtTDSAmt").val(((+(Amt || 0) + +(OtherAmt || 0)) * (TDSPer || 0) / 100) || 0);
        $(e).parent().parent().find(".txtTotalAmt").val((+(Amt || 0) + +(OtherAmt || 0)) - +$(e).parent().parent().find(".txtTDSAmt").val());
    },
    BindCounterBankList: function () {
        //$("#ddlCounter").html("");
        //BindDropdown('ddlCounter', 'CounterDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COUNTERMASTER_GET&IsRecordAll=true&ISACTIVE=1", '', true);
        //$("#ddlCounter option:contains(CASH COUNTER)").attr("selected", "selected");

        $("#ddlBank").html("");
        BindDropdown('ddlBank', 'BankDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=BANKMASTER_GET&IsRecordAll=true&ISACTIVE=1&COLUMNREQUESTED=BANKMASTERID,BANKNAME,BYDEFAULT", '', true);
        $("#ddlBank option:contains(CASH COUNTER)").attr("selected", "selected");
        $("#ddlBank").val($("#empdefaultbankid").val());
    },
    AutosuggestCommonBankName: function (id) {
        try {
            if ($("#ddlBillType").val() == "Payment") {
                $("#" + id.id).autocomplete({
                    source: function (request, response) {
                        var myfilter,
                            myfilter = { rules: [] };
                        myfilter.rules.push({ field: "COMMONMASTERDETAILNAME", op: "eq", data: $("#" + id.id).val() });
                        var url = getDomain() + "/Common/BindMastersDetails?ServiceName=COMMONMASTERDETAIL_GET&ISACTIVE=1&IsRecordAll=true&_search=true&ColumnRequested=COMMONMASTERDETAILID,COMMONMASTERDETAILNAME&IsRecordAll=true&sidx=COMMONMASTERDETAILNAME&sord=asc&searchField=COMMONMASTERNAME&searchOper=eq&searchString=Bank Name&myfilters=" + JSON.stringify(myfilter);
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
                                                        label: item.commonmasterdetailname,
                                                        value: item.commonmasterdetailname,
                                                        Id: item.commonmasterdetailid,
                                                    }
                                                }
                                                else {
                                                    return {
                                                        label: item.commonmasterdetailname,
                                                        value: item.commonmasterdetailname,
                                                        Id: item.commonmasterdetailid,
                                                    }
                                                }
                                            }))
                                    }
                                    else {
                                        if ($("#" + id.id).val().length <= 1) {
                                            $("#" + id.id).attr('bankid', '');
                                            $("#" + id.id).val('');
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
                                    if ($("#" + id.id).val().length <= 1) {
                                        $("#" + id.id).attr('bankid', '');
                                        $("#" + id.id).val('');
                                    }
                                    notificationMessage('Bank Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                                }
                            }
                        })
                    },
                    messages: {
                        noResults: "No Results Found"
                    },
                    select: function (event, ui) {
                        if (ui.item.label != 'No Results Found') {
                            $("#" + id.id).attr('bankid', ui.item.Id);
                        } else {
                            setTimeout(function () {
                                $("#" + id.id).val('');
                            }, 1)
                        }
                    },
                    change: function (event, ui) {
                        if (!ui.item) {
                        }
                    },
                    focus: function (event, ui) {
                    },
                    minLength: 1,
                    autoFocus: true
                });
            }
            else {
                $("#" + id.id).autocomplete({
                    source: function (request, response) {
                        var url = getDomain() + "/Common/BindMastersDetails?ServiceName=BANKMASTER_GET&ISACTIVE=1&COLUMNREQUESTED=BANKMASTERID,BANKNAME,BYDEFAULT";
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
                                                        label: item.bankname,
                                                        value: item.bankname,
                                                        Id: item.bankmasterid,
                                                        rptfile: item.rptfilename
                                                    }
                                                }
                                                else {
                                                    return {
                                                        label: item.bankname,
                                                        value: item.bankname,
                                                        Id: item.bankmasterid,
                                                        rptfile: item.rptfilename
                                                    }
                                                }
                                            }))
                                    }
                                    else {
                                        if ($("#" + id.id).val().length <= 1) {
                                            $("#" + id.id).attr('bankid', '');
                                            $("#" + id.id).attr('rptfile', '');
                                            $("#" + id.id).val('');
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
                                    if ($("#" + id.id).val().length <= 1) {
                                        $("#" + id.id).attr('bankid', '');
                                        $("#" + id.id).attr('rptfile', '');
                                        $("#" + id.id).val('');
                                    }
                                    notificationMessage('Bank Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                                }
                            }
                        })
                    },
                    messages: {
                        noResults: "No Results Found"
                    },
                    select: function (event, ui) {
                        if (ui.item.label != 'No Results Found') {
                            $("#" + id.id).attr('bankid', ui.item.Id);
                            $("#" + id.id).attr('rptfile', ui.item.rptfile);
                            var myfilter;
                            myfilter = { rules: [] };
                            myfilter.rules.push({ field: "PURCHASESEARCH", op: "eq", data: 'SelectBank' });
                            myfilter.rules.push({ field: "BANKID", op: "eq", data: ui.item.Id });
                            var url = getDomain() + "/Common/BindMastersDetails?ServiceName=CHEQUEBOOKMASTER_GET" + "&myfilters=" + JSON.stringify(myfilter);
                            $.ajax({
                                url: url,
                                type: "POST",
                                async: false,
                                cache: false,
                                success: function (data) {
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        $(id).parent().parent().find(".ChequeNo").val($(data).find('CHEQUENO').text());
                                        //$("#hdnChequebookid").val($(data).find('CHEQUEBOOKDETAILID').text());
                                    } else {
                                        $(id).parent().parent().find(".ChequeNo").val("");
                                        //$("#hdnChequebookid").val('');
                                    }
                                }
                            });
                        } else {
                            setTimeout(function () {
                                $("#" + id.id).val('');
                            }, 1)
                        }

                    },
                    change: function (event, ui) {
                        if (!ui.item) {
                        }
                    },
                    focus: function (event, ui) {
                    },
                    minLength: 1,
                    autoFocus: true
                });
            }
        } catch (e) {
            ErrorDetails(e, SalesOrderView.variables.File);
        }
    },
    GetVenderDetails: function (id, type) {
        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "ID", op: "eq", data: id });
        myfilter.rules.push({ field: "ACCOUNTTYPE", op: "eq", data: type });
        myfilter.rules.push({ field: "EMPLOYEE", op: "eq", data: 1 });
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
                        var lastelement = BankBookview.variables.lastelement;
                        $(lastelement).val(List.accountname);
                        $("#txtAccBal").val(parseFloat(List.balanceamt).toFixed(2));
                        $(lastelement).attr('accid', List.accountid);
                        $(lastelement).attr('acctype', List.accounttype);
                        $("#hdnCommonNewPartyId").val('');
                        $("#hdnCommonNewCustomerId").val('');
                        $(lastelement).focus();

                        if ($("#ddlBillType").val() == 'Receipt') {
                            if (parseInt(($(lastelement).attr('id')).replace('AccName', '')) > 1 && $(".ChequeNo:enabled:nth-last-child(2)").val() != '') {
                                $("#ChequeNo" + ($(lastelement).attr('id')).replace('AccName', '')).attr('chequeid', ("0000" + (+$(".ChequeNo:enabled:not(" + "#ChequeNo" + (id.id).replace('AccName', '') + "):last").val() + 1)).substring(1, 7));
                                $("#ChequeNo" + ($(lastelement).attr('id')).replace('AccName', '')).val(("0000" + (+$(".ChequeNo:enabled:not(" + "#ChequeNo" + (id.id).replace('AccName', '') + "):last").val() + 1)).substring(1, 7));
                            } else {
                                $("#ChequeNo" + ($(lastelement).attr('id')).replace('AccName', '')).val((List.chequeno).replace(/"/g, ''));
                                $("#ChequeNo" + ($(lastelement).attr('id')).replace('AccName', '')).attr('chequeid', (List.chequeno).replace(/"/g, ''));
                            }
                            $("#ChequeNo" + ($(lastelement).attr('id')).replace('AccName', '')).attr('chequebookdetailid', List.chequebookdetailid);
                            if ($("#ddlPaymentType" + ($(lastelement).attr('id')).replace('AccName', '') + " option:selected").text() == "BANK") {
                                $("#PrintCheque" + ($(lastelement).attr('id')).replace('AccName', '')).parent().show();
                            } else {
                                $("#PrintCheque" + ($(lastelement).attr('id')).replace('AccName', '')).parent().hide();
                            }
                        }
                    }
                }
            }
        });
    },

    PrintProcess: function (id) {
        try {
            $("#ModalPrint").modal('show');

            $("#PrintYes").click(function () {
                if (id) {
                    BankBookview.print(id);
                    id = "";
                }
                $("#ModalPrint").modal('hide');
            });
            $("#PrintNo").click(function () {
                id = "";
                $("#ModalPrint").modal('hide');
            });
        }
        catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    print: function (id) {
        try {
            $.ajax({
                url: getDomain() + '/Transaction/BankBookPrint?ServiceName=BANKTRANSACTIONMASTER_GET&BANKBOOKID=' + (id || 0),
                type: 'POST',
                async: false,
                cache: false,
                beforeSend: function () {
                    $(".cd-overlay").addClass("is-visible");
                    $(".loding-div").show();
                },
                success: function (data) {
                    if (data == "No data Found.") {
                        notificationMessage("Warning", data, 'warning');
                    }
                    else {
                        var random = Math.random();
                        var Epath = getDomain() + data + "?" + random;
                        window.open(Epath, '_blank');
                    }
                },
                error: OnError,
                complete: function () {
                    $(".loding-div").hide();
                    $(".cd-overlay").removeClass("is-visible");
                }
            });
        }
        catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    GetVoucherDetails: function (VoucherId) {
        try {
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "BANKTRANID", op: "eq", data: VoucherId });
            $.ajax({
                url: getDomain() + BankBookview.variables.BindGroupListUrl + "&ISRECORDALL=ALL&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist) {
                            var rowData = JsonObject.serviceresponse.detailslist.details;
                            var id = rowData.banktransactionmasid;
                            $("#panelEdit").show();
                            $("#panelView").hide();
                            $("#hdnBankBookId").val(id);
                            $(".voucherno").show();
                            BankBookview.variables.oper = 'Edit';
                            var Delete = '<i class="icon-trash" style="color:red;cursor:pointer;font-size:medium;" onclick="BankBookview.RemoveRow(this)"></i>'
                            if (parseInt(rowData.issetteled) > 0) {
                                Delete = '';
                                $("#btnSaveCashOnHand").hide();
                                $("#btnPrint").show();
                                $("#btnSavePrint").hide();
                            } else {
                                if (isSDL() && ConvertDateToTimeStamp($.datepicker.formatDate('dd/mm/yy', new Date())) != ConvertDateToTimeStamp(rowData.voucherdate)) {
                                    $("#btnSaveCashOnHand").hide();
                                    $("#btnPrint").show();
                                    $("#btnSavePrint").hide();
                                } else {
                                    $("#btnSaveCashOnHand").show();
                                    $("#btnPrint").hide();
                                    $("#btnSavePrint").show();
                                }
                            }

                            $("#txtvoucherno").val(rowData.voucherno);
                            var today = (rowData.voucherdate.split('/'));
                            $("#ddlBank").val(rowData.bankid);
                            //$("#BankAccountName").val(rowData.bankpartyid);
                            $("#txtVoucherDate").val(today[2] + '-' + today[1] + '-' + today[0]);
                            $("#ddlBillType").val(rowData.trantype == 'Payment' ? 'Receipt' : 'Payment');

                            if (rowData.trantype == 'Payment') {
                                $("#lblBank").html('Cheque Name');
                                $("#txtBankVal").val(rowData.chequename == '[object Object]' || rowData.chequename == "undefined" ? '' : rowData.chequename);
                            } else {
                                $("#lblBank").html('Bank Name');
                                $("#txtBankVal").val(rowData.commonbanknm == '[object Object]' || rowData.chequename == "undefined" ? '' : rowData.commonbanknm);
                            }

                            if (rowData.accbalance >= 0) {
                                $("#txtAccBal").val((rowData.accbalance) + ' CR');
                            } else {
                                $("#txtAccBal").val((rowData.accbalance) + ' DR');
                            }

                            $("#PaymentList_tbody").html("");
                            $("#PaymentList_tbody").append('<tr BankTranMasId="' + id + '">' +
                                '<td style="text-align:center;"></td>' +
                                '<td><input class="col-sm-10 AccName required txtAutocomplete acto-accountsuggest" value="' + (rowData.accnm || '') + '" AccId="' + rowData.accid + '" AccType="' + rowData.acctype + '" onblur="BankBookview.validation(this)" onkeyup="BankBookview.AutosuggestAccountName(this)" id="AccName' + BankBookview.variables.ListId + '" name="AccName' + BankBookview.variables.ListId + '" disabled/></td>' +
                                '<td>' +
                                '<select class="form-control ddlType" id="ddlType' + BankBookview.variables.ListId + '" name="ddlType' + BankBookview.variables.ListId + '" onblur="BankBookview.TypeOnAdvance(this)" onchange="BankBookview.TypeOnAdvance(this)">' +
                                '<option value="OutStanding">OutStanding</option>' +
                                '<option value="Advance">Advance</option>' +
                                '<option value="Other">Other</option>' +
                                '</select>' +
                                '</td>' +
                                '<td class="txtOrder Order" orderid="' + rowData.orderid + '" style="display:none;">' + rowData.orderlist + '</td>' +
                                '<td><input class="form-control txtR numbers Amount fixed required" decimals="2" value="' + parseFloat(rowData.amount).toFixed(2) + '" onkeyup="BankBookview.ViewNumber(this)" onkeydown="BankBookview.ViewNumber(this)" onblur="BankBookview.validation(this)" id="Amount' + BankBookview.variables.ListId + '" name="Amount' + BankBookview.variables.ListId + '" /></td>' +
                                '<td><select class="form-control ddlPaymentType required" onblur="BankBookview.PaymentType(' + BankBookview.variables.ListId + ')" id="ddlPaymentType' + BankBookview.variables.ListId + '" name="ddlPaymentType' + BankBookview.variables.ListId + '"></select></td>' +
                                '<td class="PartyBank"><input class="form-control BankName required" rptfile="" value="' + (rowData.commonbanknm == '[object Object]' ? '' : rowData.commonbanknm) + '" onblur="BankBookview.validation(this)" id="BankName' + BankBookview.variables.ListId + '" name="BankName' + BankBookview.variables.ListId + '" /></td>' + //onkeyup="BankBookview.AutosuggestCommonBankName(this)"
                                '<td style="display:inherit;">' +
                                '<input class="form-control number txtR ChequeNo required" value="' + (rowData.chequeno == '[object Object]' ? '' : rowData.chequeno) + '" chequename="' + rowData.chequename + '" onblur="BankBookview.validation(this)" id="ChequeNo' + BankBookview.variables.ListId + '" name="ChequeNo' + BankBookview.variables.ListId + '" />' +
                                '<span class="input-group-btn printCheque" style="display: none;" onmousedown="PrintCheque(this)">' +
                                '<button class="btn btn-default" type="button" id="PrintCheque' + BankBookview.variables.ListId + '" style="padding: 3px;margin-top:1px;"><i class="icon-printer2"></i></button>' +
                                '</span>' +
                                '</td>' +
                                '<td>' +
                                '<select type="text" class="form-control tdstype" name="TDSApplicableType' + BankBookview.variables.ListId + '" id="ddl_TDSApplicableType' + BankBookview.variables.ListId + '" onchange="TDSChange(this,' + BankBookview.variables.ListId + ')" onfocusout="TDSChange(this,' + BankBookview.variables.ListId + ')">' +
                                '<option value="0">Not Applicable</option>' +
                                '<option value="1">Yes</option>' +
                                '</select>' +
                                '</td>' +
                                '<td>' +
                                '<select type="text" TDSPer="' + rowData.tdsper + '" class="form-control ddl_TDS" name="TDS' + BankBookview.variables.ListId + '" id="ddl_TDS' + BankBookview.variables.ListId + '" onchange="BankBookview.CalculateTDSAmt(this)"></select>' +
                                '</td>' +

                                '<td>' +
                                '<input value="' + parseFloat(rowData.tdsonamt || 0).toFixed(2) + '" onblur="ValueChange(' + BankBookview.variables.ListId + ')" disabled type="text" class="form-control txtR numbers fixed txtTDSAmt" decimals="2" name="TDSAmt' + BankBookview.variables.ListId + '" id="txtTDSAmt' + BankBookview.variables.ListId + '" onchange="TDSChange(this,' + BankBookview.variables.ListId + ')" />' +
                                '</td>' +
                                '<td><input class="form-control txtR numbers Discount fixed" value="' + parseFloat(rowData.discount || 0).toFixed(2) + '" decimals="2" onkeyup="BankBookview.ViewNumber(this)" onkeydown="BankBookview.ViewNumber(this)" onblur="BankBookview.validation(this)" id="txtDiscount' + BankBookview.variables.ListId + '" name="Discount' + BankBookview.variables.ListId + '" /></td>' +
                                '<td>' +
                                '<input value="' + parseFloat(rowData.totalamt || 0).toFixed(2) + '" onblur="ValueChange(' + BankBookview.variables.ListId + ')" type="text" class="form-control txtR numbers fixed txtTotalAmt" decimals="2" name="TotalAmt' + BankBookview.variables.ListId + '" id="txtTotalAmt' + BankBookview.variables.ListId + '" />' +
                                '</td>' +
                                '<td><input class="form-control required Remark txtAutocomplete" value="' + (rowData.remark == '[object Object]' ? '' : rowData.remark) + '" onkeyup="AutosuggestRemark(this)" id="Remark' + BankBookview.variables.ListId + '" name="Remark' + BankBookview.variables.ListId + '" /></td>' +
                                '<td class="btnRemove" id="btnRemove' + BankBookview.variables.ListId + '">' +
                                '<div>' +// Delete+
                                '</div>' +
                                '</td>' +
                                '</tr>');
                            Autosuggest();
                            $("#ddlType" + BankBookview.variables.ListId).val(rowData.type);
                            FixValue();
                            OnBlur();
                            $("#ddl_TDSApplicableType" + BankBookview.variables.ListId).val(rowData.tdsappli);
                            if (rowData.TDSAPPLI == 0) {
                                $("#ddl_TDS" + BankBookview.variables.ListId).attr('disabled', 'disabled');
                            }

                            BankBookview.Sum();
                            if (rowData.ORDERID) {
                                $(".txtOrder").show();
                            }
                            else {
                                $(".txtOrder").hide();
                            }
                            BankBookview.BindTDSDropDown(BankBookview.variables.ListId);
                            $("#ddl_TDS" + BankBookview.variables.ListId).val(rowData.tdsid);
                            BankBookview.BindPaymentTypeDropDown(BankBookview.variables.ListId);
                            $("#ddlPaymentType" + BankBookview.variables.ListId).val(rowData.paymentfromid);

                            $("#txtTDSDeductOnAmt" + BankBookview.variables.ListId).attr('disabled', 'disabled');
                            $("#ddl_TDS" + BankBookview.variables.ListId).attr('disabled', 'disabled');
                            $("#txtTDSAmt" + BankBookview.variables.ListId).attr('disabled', 'disabled');
                            $("#AccName" + BankBookview.variables.ListId).focus();
                            //$("#ddl_TDSApplicableType" + BankBookview.variables.ListId).focus();

                            if (rowData.trantype == 'Receipt') {
                                $(".ChequeNo").attr("required", "required");
                                $(".PartyBank").hide();
                                $("#PrintCheque" + BankBookview.variables.ListId).parent().hide();

                            }
                            else {
                                $(".ChequeNo").removeAttr("required");
                                $(".PartyBank").hide();
                                if ($("#ddlPaymentType" + BankBookview.variables.ListId + " option:selected").text() == "BANK") {
                                    $("#PrintCheque" + BankBookview.variables.ListId).parent().show();
                                } else {
                                    $("#PrintCheque" + BankBookview.variables.ListId).parent().hide();
                                }
                            }
                            BankBookview.variables.ListId = BankBookview.variables.ListId + 1;
                            BankBookview.Sum();
                            var myfilter = { rules: [] };
                            myfilter.rules.push({ field: "ACTION", op: "eq", data: "COH" });
                            myfilter.rules.push({ field: "ACCOUNTID", op: "eq", data: rowData.accid });
                            myfilter.rules.push({ field: "ACCOUNTTYPE", op: "eq", data: rowData.acctype });
                            myfilter.rules.push({ field: "ORDERID", op: "eq", data: rowData.orderid });
                            var url = getDomain() + "/Common/BindMastersDetails?ServiceName=SALESORDER_GET&myfilters=" + JSON.stringify(myfilter);
                            $.ajax({
                                url: url,
                                type: "POST",
                                async: false,
                                cache: false,
                                success: function (data) {
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        var JsonObject = xml2json.parser(data);
                                        $("#tbody_OrderList").html("");
                                        if (JsonObject.serviceresponse.detailslist != undefined) {
                                            var DecimalHelper = { format: decimal };
                                            $("#tbody_OrderList").html($("#OrderRender").render(JsonObject.serviceresponse.detailslist.details, DecimalHelper));
                                            $(".chkAPItem").prop("checked", true);
                                            BankBookview.OrderChkEvent();
                                        }
                                    }
                                    else {
                                        $("#tbody_OrderList").html("");
                                        notificationTost('error', $(data).find('RESPONSEMESSAGE').text());
                                    }
                                }
                            });
                            selectpt();
                        }


                        $("#btnSaveCashOnHand").hide();
                    }
                    $("#PaymentList_tbody tr input").focus(function () {
                        try {
                            rowid = $($(this).parent().parent()).find('.AccName').attr('id').replace('AccName', '');
                            if ($("#ddlBillType").val() == 'Payment') {
                                $("#txtBankVal").val($($(this).parent().parent()).find('.BankName').val());
                            } else {
                                $("#txtBankVal").val($("#ChequeNo" + rowid).attr('ChequeName'));
                            }
                        } catch (e) {
                            ErrorDetails(e, BankBookview.variables.File);
                        }
                    });
                }
            });
        } catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },
    PaymentType: function (id) {
        rowid = id;
        $("#txtBankVal").focus();
    },

    VoucherDateCheck: function () {
        try {
            var BillDMY = '', StartDMY = '', EndDMY = '', Bill_Year, Bill_Month, Start_Year, Start_Month, End_Year
            BillDMY = $("#txtVoucherDate").val().split('-');
            Bill_Year = BillDMY[0];
            Bill_Month = BillDMY[1];
            StartDMY = $("#lbl_startdate").val().split('-');
            Start_Year = StartDMY[0];
            Start_Month = StartDMY[1];
            EndDMY = $("#lbl_enddate").val().split('-');
            End_Year = EndDMY[0];
            if (Bill_Month >= Start_Month) {
                if (Bill_Year != Start_Year) {
                    //notificationTost('warning', 'Enter Date in AccountYear.');
                    $("#txtVoucherDate").val($("#lbl_enddate").val());
                    $("#txtVoucherDate").focus();
                    //return;
                }
            }
            else if (Bill_Month <= Start_Month) {
                if (Bill_Year != End_Year) {
                    //notificationTost('warning', 'Enter Date in AccountYear.');
                    $("#txtVoucherDate").val($("#lbl_enddate").val());
                    $("#txtVoucherDate").focus();
                    //return;
                }
            }
        }
        catch (e) {
            ErrorDetails(e, BankBookview.variables.File);
        }
    },

    //BindAccountList: function () {
    //    var myfilter = { rules: [] };
    //    myfilter.rules.push({ field: "BANKID", op: "eq", data: $("#ddlBank").val() });
    //    BindDropdown('BankAccountName', 'BankAccountDropdownList', getDomain() + BankBookview.variables.BindBankAccountNameUrl + "&myfilters=" + JSON.stringify(myfilter), '---Select Bank Account Name---');
    //},
}

$(document).ready(function () {
    try {
        BankBookview.variables.AddNew = true;
        ItemAddNewRow();

        var params = new window.URLSearchParams(window.location.search);
        if (params.get('AccountId')) {
            $("#panelEdit").show();
            $("#panelView").hide();
            $("#AccName1").val(params.get('AccountName'));
            $("#AccName1").attr('accid', params.get('AccountId'));
            $("#AccName1").attr('AccType', params.get('AccountType'));
        }

        $(".voucherno").hide();
        BankBookview.BindCounterBankList();
        //BankBookview.BindAccountList();

        var today = new Date().toISOString().split('T')[0];
        //$('#txtFromDate').val(today);
        //$('#txtToDate').val(today);
        $('#txtFromDate').val($("#lbl_startdate").val());
        //$('#txtToDate').val($("#lbl_enddate").val());
        var lastYear = $("#lbl_enddate").val().split('-')[0];
        var todayYear = new Date().toISOString().split('T')[0].split('-')[0];
        if (todayYear >= lastYear) {
            $('#txtToDate').val($("#lbl_enddate").val());
        } else if (todayYear < lastYear) {
            $('#txtToDate').val(today);
        }

        $("#txtVoucherDate").val(today);
        BankBookview.VoucherDateCheck();

        $("#ddlPaymentType").change(function () {
            DateFilter();
        });
        $("#ddlBillType").val('Payment');
        selectpt();

        $("#ddlBillType").on('change', function () {
            selectpt(this.value);
        });

        $("#btnAddnewCashOnHand").click(function () {
            BankBookview.ClearData();
            $("#panelView").hide();
            $("#panelEdit").show();
            BankBookview.variables.AddNew = true;
            ItemAddNewRow();
            FirstSelect();
            $("#ddlBillType").val('Payment');
            selectpt();
        });
        $("#btnSaveCashOnHand").click(function () {
            if ($("#btnSaveCashOnHand").is(":visible"))
                BankBookview.SaveData();
        });
        $("#btncancelCashOnHand").click(function () {
            if ($(location).attr('search').split('='))
                if ($(location).attr('search').split('=')[1]) {
                    window.top.close();
                    return;
                }
            BankBookview.ClearData();
        });
        $("#btnDeleteCashOnHand").click(function () {
            BankBookview.DeleteSubmit();
        });
        $("#btnCancelDelete").click(function () {
            $("#CashOnHandDelete").modal('hide');
        });
        $("#refreshgrid").click(function () {
            jQuery('#table_CashOnHand').trigger('reloadGrid');
        });

        //------------------------------------------ Grid Search ------------------------------------------//
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 1) {
                DateFilter();
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                DateFilter();
            }
            if ($("#txtsearchbox").val().length == 1) {
                DateFilter();
            }
        });
        $("#btnViewList").click(function () {
            BankBookview.ClearData();
            $("#panelView").show();
            $("#panelEdit").hide();
        });
        $("#btnImport").click(function () {
            BankBookview.BtnImportOrder();
        });
        $("#ddlCounter").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#txtBank").focus();
                //document.getElementById("PaymentList_tbody").children[0].children[1].firstElementChild.focus();
            }
        });

        $("#ddlBank").keydown(function (event) {
            if (event.keyCode == 13) {
                setTimeout(function () {
                    document.getElementById("PaymentList_tbody").children[0].children[1].firstElementChild.focus();
                }, 50)
            }
        });

        //$("#BankAccountName").keydown(function (event) {
        //    if (event.keyCode == 13) {
        //        setTimeout(function () {
        //            document.getElementById("PaymentList_tbody").children[0].children[1].firstElementChild.focus();
        //        }, 50)
        //    }
        //});
        $("#AddEditPartyCusomerModal").on('hide.bs.modal', function () {
            if ($("#hdnCommonNewPartyId").val() != '') {
                BankBookview.GetVenderDetails($("#hdnCommonNewPartyId").val(), 'PARTY');
            } else if ($("#hdnCommonNewCustomerId").val() != '') {
                BankBookview.GetVenderDetails($("#hdnCommonNewCustomerId").val(), 'CUSTOMER');
            }
        });
        setTimeout(function () {
            FirstSelect();
        }, 60);
        $("#btnPrint").click(function () {
            BankBookview.print($("#hdnBankBookId").val());
        });

        var params = new window.URLSearchParams(window.location.search);
        if (params.get('VoucherId')) {
            BankBookview.GetVoucherDetails(params.get('VoucherId'));
        } else {
            DateFilter();
        }

        $("#btnPrevious").click(function () {
            GetId('BANKBOOK', ($("#hdnBankBookId").val() || ''), 'PREVIOUS');
        });
        $("#btnNext").click(function () {
            GetId('BANKBOOK', ($("#hdnBankBookId").val() || ''), 'NEXT');
        });
        $("#btnBackModal").click(function () {
            $("#ModalOrder").modal('hide');
            $(".Amount").focus();
        })
        $("#btnViewLedger").click(function () {
            if (BankBookview.variables.activeElement.parentElement) {
                if ($(BankBookview.variables.activeElement.parentElement.parentElement).is('tr')) {
                    var accid = $(BankBookview.variables.activeElement.parentElement.parentElement).find('.AccName').attr('accid');
                    if (accid) {
                        window.open(getDomain() + "/Report/LedgerReport?AccountName=" + $(BankBookview.variables.activeElement.parentElement.parentElement).find('.AccName').val() + "&AccountId=" + accid, '_blank');
                    }
                }
            }
            else {
                var Name = $($($(".acto_frmItemlist")[0]).children().find('#PaymentList_tbody').find('tr:first').find('td:nth-child(2)')).children().attr('value');
                var AccId = $($($(".acto_frmItemlist")[0]).children().find('#PaymentList_tbody').find('tr:first').find('td:nth-child(2)')).children().attr('AccId');
                window.open(getDomain() + "/Report/LedgerReport?AccountName=" + Name + "&AccountId=" + AccId, '_blank');
            }
        });

        $("#btnPdfPrint").click(function () {
            $("#table_CashOnHand").jqGrid("exportToPdf", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "BankBook.pdf"
            })
        });
        $("#btnExcelPrint").click(function () {
            $("#table_CashOnHand").jqGrid("exportToExcel", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "BankBook.xlsx"
            })
        });

        $("#btnSavePrint").click(function () {
            BankBookview.SaveData(true);
            if ($("#hdnBankBookId").val()) {
                BankBookview.print($("#hdnBankBookId").val());
                if ($(location).attr('search').split('='))
                    if ($(location).attr('search').split('=')[1]) {
                        window.top.close();
                        return;
                    }
            }
        });
        $(".FromToDate").change(function () {
            setTimeout(function () {
                DateFilter();
            }, 700);
        });

        //$("#ddlBank").change(function () {
        //    BankBookview.BindAccountList();
        //});
    }
    catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
    }

});

function GetVoucherData(VoucherId) {
    BankBookview.GetVoucherDetails(VoucherId);
}
function ItemAddNewRow() {
    try {
        $("#PaymentList_tbody").append('<tr BankTranMasId="00000000-0000-0000-0000-000000000000">' +
            '<td style="text-align:center;"></td>' +
            '<td><input class="col-sm-10 AccName required txtAutocomplete acto-accountsuggest" AccId="" AccType="" onblur="BankBookview.validation(this)" onkeyup="BankBookview.AutosuggestAccountName(this)" id="AccName' + BankBookview.variables.ListId + '" name="AccName' + BankBookview.variables.ListId + '" /><span class="input-group-addon CommonAddEdit" name="CommonAddEdit" style="background-color: #4caf50;color: white;"><i class="fa fa-plus"></i></span></td>' +
            '<td>' +
            '<select class="form-control ddlType" id="ddlType' + BankBookview.variables.ListId + '" name="ddlType' + BankBookview.variables.ListId + '" onblur="BankBookview.TypeOnAdvance(this)" onchange="BankBookview.TypeOnAdvance(this)">' +
            '<option value="OutStanding">OutStanding</option>' +
            '<option value="Advance">Advance</option>' +
            '<option value="Other" selected>Other</option>' +
            '</select>' +
            '</td>' +
            '<td class="txtOrder Order" orderid="" style="display:none;"></td>' +
            '<td><input class="form-control txtR numbers Amount fixed required" decimals="2" onkeyup="BankBookview.ViewNumber(this)" onkeydown="BankBookview.ViewNumber(this)" onblur="BankBookview.validation(this)" id="Amount' + BankBookview.variables.ListId + '" name="Amount' + BankBookview.variables.ListId + '" /></td>' +
            '<td><select class="form-control ddlPaymentType required" onblur="BankBookview.PaymentType(' + BankBookview.variables.ListId + ')" id="ddlPaymentType' + BankBookview.variables.ListId + '" name="ddlPaymentType' + BankBookview.variables.ListId + '"></select></td>' +
            '<td class="PartyBank"><input class="form-control BankName required" rptfile="" BankId="" onblur="BankBookview.validation(this)" id="BankName' + BankBookview.variables.ListId + '" name="BankName' + BankBookview.variables.ListId + '" /></td>' +    //onkeyup="BankBookview.AutosuggestCommonBankName(this)"
            '<td style="display:inherit;">' +
            '<input class="form-control number txtR ChequeNo required" onblur="BankBookview.validation(this)" id="ChequeNo' + BankBookview.variables.ListId + '" name="ChequeNo' + BankBookview.variables.ListId + '" />' +
            '<span class="input-group-btn printCheque" style="display: none;" onmousedown="PrintCheque(this)">' +
            '<button class="btn btn-default" type="button" id="PrintCheque' + BankBookview.variables.ListId + '" style="padding: 3px;margin-top:1px;"><i class="icon-printer2"></i></button>' +
            '</span>' +
            '</td>' +
            '<td>' +
            '<select type="text" class="form-control tdstype" name="TDSApplicableType' + BankBookview.variables.ListId + '" id="ddl_TDSApplicableType' + BankBookview.variables.ListId + '" onchange="TDSChange(this,' + BankBookview.variables.ListId + ')" onfocusout="TDSChange(this,' + BankBookview.variables.ListId + ')">' +
            '<option value="0">No</option>' +
            '<option value="1">Yes</option>' +
            '</select>' +
            '</td>' +
            '<td>' +
            '<select type="text" class="form-control ddl_TDS" name="TDS' + BankBookview.variables.ListId + '" id="ddl_TDS' + BankBookview.variables.ListId + '" onchange="BankBookview.CalculateTDSAmt(this)"></select>' +
            '</td>' +

            '<td>' +
            '<input onblur="ValueChange(' + BankBookview.variables.ListId + ')" disabled type="text" class="form-control txtR numbers fixed txtTDSAmt" decimals="2" name="TDSAmt' + BankBookview.variables.ListId + '" id="txtTDSAmt' + BankBookview.variables.ListId + '" onchange="TDSChange(this,' + BankBookview.variables.ListId + ')" />' +
            '</td>' +
            '<td><input class="form-control txtR numbers Discount fixed" decimals="2" onkeyup="BankBookview.ViewNumber(this)" onkeydown="BankBookview.ViewNumber(this)" onblur="BankBookview.validation(this)" id="txtDiscount' + BankBookview.variables.ListId + '" name="Discount' + BankBookview.variables.ListId + '" /></td>' +
            '<td>' +
            '<input onblur="ValueChange(' + BankBookview.variables.ListId + ')" type="text" class="form-control txtR numbers fixed txtTotalAmt" decimals="2" name="TotalAmt' + BankBookview.variables.ListId + '" id="txtTotalAmt' + BankBookview.variables.ListId + '" />' +
            '</td>' +
            '<td><input class="form-control required txtAutocomplete Remark" onkeyup="AutosuggestRemark(this)" id="Remark' + BankBookview.variables.ListId + '" name="Remark' + BankBookview.variables.ListId + '"/></td>' +
            '<td class="btnRemove" id="btnRemove' + BankBookview.variables.ListId + '">' +
            '<div>' +
            '<i class="icon-trash" style="color:red;cursor:pointer;font-size:medium;" onclick="BankBookview.RemoveRow(this)"></i>' +
            '</div>' +
            '</td>' +
            '</tr>');
        Autosuggest();
        FixValue();
        OnBlur();

        BankBookview.BindTDSDropDown(BankBookview.variables.ListId);
        BankBookview.BindPaymentTypeDropDown(BankBookview.variables.ListId);
        $("#txtTDSDeductOnAmt" + BankBookview.variables.ListId).attr('disabled', 'disabled');
        $("#ddl_TDS" + BankBookview.variables.ListId).attr('disabled', 'disabled');
        $("#txtTDSAmt" + BankBookview.variables.ListId).attr('disabled', 'disabled');
        $("#AccName" + BankBookview.variables.ListId).focus();
        $(".txtOrder").hide();
        BankBookview.Sum();
        if ($("#ddlBillType").val() != "Payment") {
            $("#PrintCheque" + BankBookview.variables.ListId).parent().hide();
            $(".ChequeNo").attr("required", "required");
            $(".PartyBank").hide();
        }
        else {
            if ($("#ddlPaymentType" + BankBookview.variables.ListId + " option:selected").text() == "BANK") {
                $("#PrintCheque" + BankBookview.variables.ListId).parent().show();
            } else {
                $("#PrintCheque" + BankBookview.variables.ListId).parent().hide();
            }
            $(".ChequeNo").removeAttr("required");
            $(".PartyBank").hide();
        }
        BankBookview.variables.oper = 'Add';
        if (BankBookview.variables.AddNew == false) {
            $("#PaymentList_tbody tr:last td:nth-child(2) input").focus();
        } else {
            setTimeout(function () {
                FirstSelect();
            }, 20);
            BankBookview.variables.AddNew = false;
        }
        BankBookview.variables.ListId = BankBookview.variables.ListId + 1;
        $(".CommonAddEdit").click(function (event) {
            BankBookview.variables.lastelement = event.currentTarget.parentElement.firstElementChild;
            $("#txtAccount").val(event.currentTarget.parentElement.firstElementChild.value);
            $("#txtAccount").attr('AccountType', event.currentTarget.parentElement.firstElementChild.getAttribute('acctype'));
            $("#txtAccount").attr('AccountId', event.currentTarget.parentElement.firstElementChild.getAttribute('accid'));
            $(".CommonAddEditPartyCustomer").click();
        });
        $("#txtBankVal").val('');
        $("#PaymentList_tbody tr input").focus(function () {
            try {
                rowid = $($(this).parent().parent()).find('.AccName').attr('id').replace('AccName', '');
                if ($("#ddlBillType").val() == 'Payment') {
                    $("#txtBankVal").val($($(this).parent().parent()).find('.BankName').val());
                } else {
                    $("#txtBankVal").val($("#ChequeNo" + rowid).attr('ChequeName'));
                }
            } catch (e) {
                ErrorDetails(e, BankBookview.variables.File);
            }
        });
        rowFocus();
    } catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
    }
}
function makeFileXml(saveDiv) {
    try {
        var xmlsaveFiles = '';
        $(saveDiv).find('tr').each(function (key, obj) {
            xmlsaveFiles += '<DETAILS>';
            xmlsaveFiles += '<BANKTRANMASID>' + $(obj).attr("BankTranMasId") + '</BANKTRANMASID>'
            xmlsaveFiles += '<ACCTYPE>' + $(obj).find('.AccName').attr('acctype') + '</ACCTYPE>'
            xmlsaveFiles += '<ACCID>' + $(obj).find('.AccName').attr('accid') + '</ACCID>';
            xmlsaveFiles += '<COMMONBANKNM>' + $(obj).find('.BankName').val() + '</COMMONBANKNM>';
            if ($(obj).find('.ddlPaymentType').val() != null)
                xmlsaveFiles += '<PAYMENTTYPE>' + $(obj).find('.ddlPaymentType').val() + '</PAYMENTTYPE>';
            else
                xmlsaveFiles += '<PAYMENTTYPE></PAYMENTTYPE>';
            xmlsaveFiles += '<CHEQUENO>' + $(obj).find('.ChequeNo').val() + '</CHEQUENO>';
            if ($(obj).find('.ChequeNo').attr('chequebookdetailid')) {
                xmlsaveFiles += '<CHEQUEBOOKDETAILID>' + $(obj).find('.ChequeNo').attr('chequebookdetailid') + '</CHEQUEBOOKDETAILID>';
            }
            xmlsaveFiles += '<CHEQUENAME>' + $(obj).find('.ChequeNo').attr('CHEQUENAME') + '</CHEQUENAME>';
            if ($(obj).find('.ddlType').val() != '') {
                xmlsaveFiles += '<TYPE>' + $(obj).find('.ddlType').val() + '</TYPE>';
            }
            xmlsaveFiles += '<AMOUNT>' + ($(obj).find('.Amount').val() || 0) + '</AMOUNT>';
            //xmlsaveFiles += '<OTHERAMOUNT>' + ($(obj).find('.OtherAmount').val() || 0) + '</OTHERAMOUNT>';
            xmlsaveFiles += '<CHEQUENO>' + ($(obj).find('.ChequeNo').val() || 0) + '</CHEQUENO>';
            xmlsaveFiles += "<TDSAPPLICABLE>" + $(obj).find('.tdstype').val() + "</TDSAPPLICABLE>";
            if ($(obj).find('.tdstype').val() == '1') {
                xmlsaveFiles += "<TDSDEDUCTONAMT>" + ($(obj).find('.txtTDSAmt').val() || 0) + "</TDSDEDUCTONAMT>";
                xmlsaveFiles += "<TDSID>" + $(obj).find('.ddl_TDS').val() + "</TDSID>";
                xmlsaveFiles += "<TDSPERCENTAGE>" + $(obj).find('.ddl_TDS').attr("TDSPer") + "</TDSPERCENTAGE>";
            }
            xmlsaveFiles += '<DISCOUNT>' + ($(obj).find('.Discount').val() || 0) + '</DISCOUNT>';
            xmlsaveFiles += '<TOTALAMT>' + ($(obj).find('.txtTotalAmt').val() || 0) + '</TOTALAMT>';
            if ($("#txtAccBal").val())
                xmlsaveFiles += '<ACCBALANCE>' + ($("#txtAccBal").val().split(' ')[0] || 0) + '</ACCBALANCE>';

            if ($(obj).find('.ddlType').val() == 'Advance') {
                if ($(obj).find('.txtOrder :visible')) {
                    if ($(obj).find(".txtOrder").attr('orderid')) {
                        xmlsaveFiles += '<ORDERID>' + $(obj).find(".txtOrder").attr('orderid') + '</ORDERID>';
                    } else {
                        notificationTost('warning', 'Select order.');
                        xmlsaveFiles = '';
                        return {
                            xmlsaveFiles: ''
                        };
                    }
                }
            }
            xmlsaveFiles += '<REMARK>' + capitalize($(obj).find('.Remark').val() || '') + '</REMARK>';
            xmlsaveFiles += '</DETAILS>';
        });
        return {
            xmlsaveFiles: xmlsaveFiles
        };
    } catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
    }
}
function TDSChange(obj, id) {
    var amt = 0, otheramt = 0, tdsamt = 0, totalamt = 0;
    amt = $("#Amount" + id).val() || 0;
    //otheramt = $("#OtherAmount" + id).val() || 0;
    tdsamt = $("#txtTDSAmt" + id).val() || 0;
    totalamt = +amt + +otheramt + +tdsamt;
    $("#txtTotalAmt" + id).val(parseFloat(totalamt || 0).toFixed(2));
    if ($(obj).hasClass('tdstype'))
        if ($(obj).val() == '0') {
            $("#txtTDSDeductOnAmt" + id).attr('disabled', 'disabled');
            $("#ddl_TDS" + id).attr('disabled', 'disabled');
            $("#txtTDSAmt" + id).attr('disabled', 'disabled');
            $("#txtTotalAmt" + id).attr('disabled', 'disabled');
        } else {
            $("#txtTDSDeductOnAmt" + id).removeAttr('disabled', '');
            $("#ddl_TDS" + id).removeAttr('disabled', '');
            //  $("#txtTDSAmt" + id).removeAttr('disabled', '');
            $("#txtTotalAmt" + id).attr('disabled', 'disabled');
        }
    BankBookview.Sum();
}
function ValueChange(id) {

}
function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
function OnBlur() {
    try {
        $("#PaymentList_tbody").blur(function (id) {
            var AccName = $(".AccName");
            var i = 1;
            if ($("#PaymentList_tbody tr").length > 1) {
                for (i; AccName.length > i; i++) {
                    if ($("#" + AccName[i].id).val() == '') {
                        $(AccName[i]).parent().parent().remove();
                    }
                }
            }
        });
    } catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
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
        ErrorDetails(e, BankBookview.variables.File);
    }
}
function DateFilter() {
    try {
        GreaterDate();
        var myfilter, FromDate = '', Todate = '';
        FromDate = $("#txtFromDate").val();
        if (FromDate) {
            var p = FromDate.split('-');
            if (p[0] > 1800 && p[0] < 9999) {
                FromDate = $("#txtFromDate").val();
            } else {
                FromDate = '';
            }
        }
        Todate = $("#txtToDate").val();
        if (Todate) {
            var p = Todate.split('-');
            if (p[0] > 1800 && p[0] < 9999) {
                Todate = $("#txtToDate").val();
            } else {
                Todate = '';
            }
        }
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: Todate }, { field: "PAYMENTTYPE", op: "eq", data: $("#ddlPaymentType").val() });
        setTimeout(function () {
            if ($("#txtsearchbox").val().length > 1) {
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
            }
            url = BankBookview.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
            BankBookview.initializeJqgrid(url);
        }, 200);
    } catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
    }
}
function AllData() {
    try {
        if (!$("#txtToDate").val() && !$("#txtFromDate").val()) {
            myfilter = {
                rules: []
            };
            myfilter.rules.push({ field: "FROMDATE", op: "eq", data: $("#txtFromDate").val() }, { field: "TODATE", op: "eq", data: $("#txtToDate").val() });
            if ($("#txtsearchbox").val().length > 1) {
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
            }
            url = BankBookview.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
            BankBookview.initializeJqgrid(url);
        }
    } catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
    }
}
function DateLess(input) {
    FromDateLess(input);
    DateFilter();
}
function DateAdd(input) {
    FromDateAdd(input);
    DateFilter();
}
function selectpt() {
    if ($("#ddlBillType").val() == 'Payment') {
        $(".Order").val('');
        $(".Order").attr('orderid', '');
        $(".ChequeNo").attr("required", "required");
        $(".printCheque").hide();
        $("#lblBank").html('Bank Name');
        $(".PartyBank").hide();
    } else {
        $(".ChequeNo").removeAttr("required");
        $(".printCheque").show();
        $("#lblBank").html('Cheque Name');
        $(".PartyBank").hide();
    }
}
function PrintCheque(id) {
    try {
        //$(id).parent().find(".ChequeNo").val()
        if ($("#ddlBank option:selected").attr('rptfile')) {
            var date = '';
            var d = new Date();
            var strDate = ('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
            if ($('#chkDatetime').is(":checked") == true) {
                date = strDate;
            }
            var amt = parseInt($(id).parent().parent().find(".txtTotalAmt").val());
            $.ajax({
                url: getDomain() + "/Transaction/CrystalFile",
                data: {
                    filename: $("#ddlBank option:selected").attr('rptfile') + '.rpt',
                    Personename: $(id).parent().find('.ChequeNo').attr('ChequeName'),
                    Amountinword: convertNumberToWords(amt),
                    Amount: '**' + amt + '**',
                    D1: ('0' + d.getDate()).slice(-2).split('')[0],
                    D2: ('0' + d.getDate()).slice(-2).split('')[1],
                    M1: ('0' + (d.getMonth() + 1)).slice(-2).split('')[0],
                    M2: ('0' + (d.getMonth() + 1)).slice(-2).split('')[1],
                    Y1: d.getFullYear().toString().split('')[0],
                    Y2: d.getFullYear().toString().split('')[1],
                    Y3: d.getFullYear().toString().split('')[2],
                    Y4: d.getFullYear().toString().split('')[3],
                    SetDatetime: date
                },
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    $("#chequepdf").attr("src", getDomain() + data);
                    $('html').addClass('removeroverflow');
                    $("#ModalChequePrint").modal('show');
                },
            });
        }
    } catch (e) {
        ErrorDetails(e, Purchasedetailview.variables.File);
    }
}

$(window).keydown(function (event) {
    try {
        if (event.altKey && event.keyCode == 67) {
            BankBookview.variables.Cancel = true;
        } else if (event.keyCode == 113) {
            //if ($(document.activeElement).parent().parent().is('tr'))
            //BankBookview.TypeOnAdvance($(document.activeElement).parent().parent().find('.ddlType'));
        }
        else if (event.altKey && event.keyCode == 82 && $("#panelView").is(":visible")) {
            jQuery('#table_CashOnHand').trigger('reloadGrid');
        }
    }
    catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
    }
});

$("#txtBankVal").keydown(function (event) {
    try {
        if (event.keyCode == 13) {
            setTimeout(function () {
                if ($("#txtBankVal").val() == "") {
                    $("#txtBankVal").focus();
                    return;
                }
                if ($("#ddlBillType").val() == 'Payment') {
                    $("#BankName" + rowid).val($("#txtBankVal").val());
                } else {
                    $("#ChequeNo" + rowid).attr('ChequeName', $("#txtBankVal").val());
                }
                if ($("#ChequeNo" + rowid).is(':disabled') == true) {
                    $("#ddl_TDSApplicableType" + rowid).focus();
                } else {
                    $("#ChequeNo" + rowid).focus();
                }
            }, 10)
        }
    }
    catch (e) {
        ErrorDetails(e, BankBookview.variables.File);
    }
});

function FirstSelect() {
    $("#ddlBillType").focus();
}
function rowFocus() {
    $("#PaymentList_tbody tr :input").focus(function () {
        BankBookview.variables.activeElement = document.activeElement
    });
}

function Autosuggest() {
    //for account - party and customer data -kishan
    $(".acto-accountsuggest").autocomplete({
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                if (item.name) {
                    return $('<li>')
                        .append('<div class="acto-ui">' +
                            '<p class="acto-suggest"><span class="icon-suggest"><i class="fa fa-user"></i></span> <span class="suggest_label">' + item.name + ' (' + item.shortcode + ') - ' + item.accounttype + ' </span> </p>' +
                            '<p class="acto-suggest"><span class="icon-suggest"><i class="fa fa-phone"></i></span> <span class="suggest_label">' + (item.mobile == '[object Object]' ? '' : item.mobile) + '</span> &nbsp;&nbsp;&nbsp;<span class="icon-suggest"><i class="fa fa-map-marker"></i></span><span>&nbsp;' + item.cityname + '</span></p>' +
                            '</div>')
                        .appendTo(ul);
                }
                else {
                    return $('<li>')
                        .append('<div class="acto-ui">' +
                            '<p>"No Results Found"</p>' +
                            '</div>')
                        .appendTo(ul);
                }
            };
        }
    });
}
