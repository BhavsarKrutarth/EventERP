var View = "PurchaseView", afterTableId = "txtTotalAmt", searchtxt = ''; // -------- variables for keyboard use in tables
var PurchaseView = {
    variables: {
        oper: 'Add',
        AddNew: true,
        File: "PurchaseView.js",
        ListId: 1,
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PURCHASE_GET",
        QuotationDetailUrl: "/Common/BindMastersDetails?ServiceName=PURCHASE_DETAILS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PURCHASE_CRUD",
        //table: "",
        HSNCodeList: [],
    },

    initializeJqgrid: function (url) {
        try {
            colNames = ['PURCHASEID', 'STATEID', 'MOBILE1', 'PHONENO', 'CITYID', 'CITYNAME', 'ADDRESS1', 'ADDRESS2', 'ADDRESS3', 'GSTNO', 'PANNO', 'ADHARCARDNO', 'PINCODE', 'Code' ,'EVENTMASTERID','Event Name','Party Name', 'PARTYMASTERID', 'PURCHASEDATE', 'ROF', 'TOTALNETAMT', 'CGST', 'SGST', 'IGST', 'AMTWITHTAX', 'ROFAMT', 'TOTALAMT', 'TDSCHK', 'TCSROF', 'TDSROF', 'TDSID', 'TDSPER', 'TDSONAMT', 'TDSROFAMT', 'TCSLIMT', 'TCSPER', 'TCSONAMT', 'CASHPAYMENT', 'CHEQUEPAYMENT', 'BANKID', 'CHEQUENO', 'CHEQUEBOOKDETAILID', 'CHEQUENAME','BANKNAME']
                colModel = [
                { name: "PURCHASEID", index: "PURCHASEID", xmlmap: xmlvars.common_colmap + "PURCHASEID", sortable: true, search: false, hidden: true },
                { name: "STATEID", index: "STATEID", xmlmap: xmlvars.common_colmap + "STATEID", sortable: true, search: false, hidden: true },
                { name: "MOBILE1", index: "MOBILE1", xmlmap: xmlvars.common_colmap + "MOBILE1", sortable: true, search: false, hidden: true },
                { name: "PHONENO", index: "PHONENO", xmlmap: xmlvars.common_colmap + "PHONENO", sortable: true, search: false, hidden: true },
                { name: "CITYID", index: "CITYID", xmlmap: xmlvars.common_colmap + "CITYID", sortable: true, search: false, hidden: true },
                { name: "CITYNAME", index: "CITYNAME", xmlmap: xmlvars.common_colmap + "CITYNAME", sortable: true, search: false, hidden: true },
                { name: "PINCODE", index: "PINCODE", xmlmap: xmlvars.common_colmap + "PINCODE", sortable: true, search: false, hidden: true },
                { name: "ADDRESS1", index: "ADDRESS1", xmlmap: xmlvars.common_colmap + "ADDRESS1", sortable: true, search: false, hidden: true },
                { name: "ADDRESS2", index: "ADDRESS2", xmlmap: xmlvars.common_colmap + "ADDRESS2", sortable: true, search: false, hidden: true },
                { name: "ADDRESS3", index: "ADDRESS3", xmlmap: xmlvars.common_colmap + "ADDRESS3", sortable: true, search: false, hidden: true },
                { name: "GSTNO", index: "GSTNO", xmlmap: xmlvars.common_colmap + "GSTNO", sortable: true, search: false, hidden: true },
                { name: "PANNO", index: "PANNO", xmlmap: xmlvars.common_colmap + "PANNO", sortable: true, search: false, hidden: true },
                { name: "ADHARCARDNO", index: "ADHARCARDNO", xmlmap: xmlvars.common_colmap + "ADHARCARDNO", sortable: true, search: false, hidden: true },
                { name: "PURCHASECODE", width: 10, index: "PURCHASECODE", xmlmap: xmlvars.common_colmap + "PURCHASECODE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "EVENTMASTERID", index: "EVENTMASTERID", xmlmap: xmlvars.common_colmap + "EVENTMASTERID", sortable: true, search: false, hidden: true },
                { name: "EVENTMASTERNAME", width: 10, index: "EVENTMASTERNAME", xmlmap: xmlvars.common_colmap + "EVENTMASTERNAME", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "PARTYNAME", width: 10, index: "PARTYNAME", xmlmap: xmlvars.common_colmap + "PARTYNAME", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "PARTYMASTERID", index: "PARTYMASTERID", xmlmap: xmlvars.common_colmap + "PARTYMASTERID", sortable: true, search: false, hidden: true },
                { name: "PURCHASEDATE", width: 10, index: "PURCHASEDATE", xmlmap: xmlvars.common_colmap + "PURCHASEDATE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "ROF", index: "ROF", xmlmap: xmlvars.common_colmap + "ROF", sortable: true, search: false, hidden: true },
                { name: "TOTALNETAMT", width: 10, index: "TOTALNETAMT", xmlmap: xmlvars.common_colmap + "TOTALNETAMT", sortable: false, search: false },
                { name: "CGST", width: 10, index: "CGST", xmlmap: xmlvars.common_colmap + "CGST", sortable: false, search: false },
                { name: "SGST", width: 10, index: "SGST", xmlmap: xmlvars.common_colmap + "SGST", sortable: false, search: false },
                    { name: "IGST", width: 10, index: "IGST", xmlmap: xmlvars.common_colmap + "IGST", sortable: false, search: false },
                    { name: "AMTWITHTAX", width: 10, index: "AMTWITHTAX", xmlmap: xmlvars.common_colmap + "AMTWITHTAX", sortable: false, search: false },
                    { name: "ROFAMT", hidden: true, index: "ROFAMT", xmlmap: xmlvars.common_colmap + "ROFAMT", sortable: false, search: false },
                    { name: "TOTALAMT", width: 10, index: "TOTALAMT", xmlmap: xmlvars.common_colmap + "TOTALAMT", sortable: false, search: false },
                { name: "TDSCHK", index: "TDSCHK", xmlmap: xmlvars.common_colmap + "TDSCHK", sortable: true, search: false, hidden: true },
                { name: "TCSROF", index: "TCSROF", xmlmap: xmlvars.common_colmap + "TCSROF", sortable: true, search: false, hidden: true },
                { name: "TDSROF", index: "TDSROF", xmlmap: xmlvars.common_colmap + "TDSROF", sortable: true, search: false, hidden: true },
                { name: "TDSID", index: "TDSID", xmlmap: xmlvars.common_colmap + "TDSID", sortable: true, search: false, hidden: true },
                { name: "TDSPER", index: "TDSPER", xmlmap: xmlvars.common_colmap + "TDSPER", sortable: true, search: false, hidden: true },
                { name: "TDSONAMT", index: "TDSONAMT", xmlmap: xmlvars.common_colmap + "TDSONAMT", sortable: true, search: false, hidden: true },
                { name: "TDSROFAMT", index: "TDSROFAMT", xmlmap: xmlvars.common_colmap + "TDSROFAMT", sortable: true, search: false, hidden: true },
                { name: "TCSLIMT", index: "TCSLIMT", xmlmap: xmlvars.common_colmap + "TCSLIMT", sortable: true, search: false, hidden: true },
                { name: "TCSPER", index: "TCSPER", xmlmap: xmlvars.common_colmap + "TCSPER", sortable: true, search: false, hidden: true },
                { name: "TCSONAMT", index: "TCSONAMT", xmlmap: xmlvars.common_colmap + "TCSONAMT", sortable: true, search: false, hidden: true },
                { name: "CASHPAYMENT", index: "CASHPAYMENT", xmlmap: xmlvars.common_colmap + "CASHPAYMENT", sortable: true, search: false, hidden: true },
                { name: "CHEQUEPAYMENT", index: "CHEQUEPAYMENT", xmlmap: xmlvars.common_colmap + "CHEQUEPAYMENT", sortable: true, search: false, hidden: true },
                { name: "BANKID", index: "BANKID", xmlmap: xmlvars.common_colmap + "BANKID", sortable: true, search: false, hidden: true },
                { name: "CHEQUENO", index: "CHEQUENO", xmlmap: xmlvars.common_colmap + "CHEQUENO", sortable: true, search: false, hidden: true },
                { name: "CHEQUEBOOKDETAILID", index: "CHEQUEBOOKDETAILID", xmlmap: xmlvars.common_colmap + "CHEQUEBOOKDETAILID", sortable: true, search: false, hidden: true },
                    { name: "CHEQUENAME", index: "CHEQUENAME", xmlmap: xmlvars.common_colmap + "CHEQUENAME", sortable: true, search: false, hidden: true },
                    { name: "BANKNAME", index: "BANKNAME", xmlmap: xmlvars.common_colmap + "BANKNAME", sortable: true, search: false, hidden: true },
                
                ];
            colNames.push('Action');
            colModel.push({ name: 'act', index: 'act', exportcol: false, width: 10, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ActionBtnFmatter(cv, op, ro, 'PurchaseView') } });
            //$("#table_list_Quotation").GridUnload();
            $.jgrid.gridUnload('#table_list_Quotation');

            $("#table_list_Quotation").jqGrid({
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
                pager: "#pager_list_Quotation",
                footerrow: true,
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "PURCHASEID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');

                    setTimeout(function () {
                        var width = $('#jqgrid_Quotation').width();
                        if (width <= 430) {
                            width = 1000;
                        }
                        $('#table_list_Quotation').setGridWidth(width);
                    }, 50)
                    //$('#table_list_Quotation').jqGrid('setSelection', $('#table_list_Quotation').jqGrid('getDataIDs')[0]);
                    jQuery("#table_list_Quotation").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

                    //for (var i = 0; i < rowsToColor.length; i++) {
                    //    var status = $("#" + rowsToColor[i]).find("[aria-describedby='table_list_Quotation_ISSETTLED']").text();
                    //    if (status == "1") {
                    //        $("#" + rowsToColor[i]).find("td").css("background-color", "rgba(241, 238, 139, 0.25098039215686274)");
                    //    }
                    //}

                    var $self = $(this);
                    $self.jqGrid("footerData", "set", {
                        TOTALGROSSWEIGHT: parseFloat($self.jqGrid("getCol", "TOTALGROSSWEIGHT", false, "sum")).toFixed(3),
                        TOTALNETWEIGHT: parseFloat($self.jqGrid("getCol", "TOTALNETWEIGHT", false, "sum")).toFixed(3),
                        TOTALFINEWEIGHT: parseFloat($self.jqGrid("getCol", "TOTALFINEWEIGHT", false, "sum")).toFixed(3),
                        TOTALAMOUNT: parseFloat($self.jqGrid("getCol", "TOTALAMOUNT", false, "sum")).toFixed(2)
                    });
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'PURCHASEID',
                sortorder: 'desc',
                ondblClickRow: function (rowid) {
                    if (isU()) {
                        PurchaseView.triggerId(rowid, 'edit')
                    }
                }
            });

            // JqGrid navigations shortcuts
            jQuery("#table_list_Quotation").jqGrid('bindKeys', {
                "onEnter": function (rowid) {
                    PurchaseView.triggerId(rowid, 'edit')
                }
            });

            // Setup buttons
            $("#table_list_Quotation").jqGrid('navGrid', '#pager_list_Quotation',
                { edit: false, add: false, del: false, search: false, refresh: true },
                { height: 320 }
            );
            $("#pager_list_Quotation_left").css("width", "");
            AlignJqGridHeader('table_list_Quotation', ['edit', 'act']);
            RightAlignJqGridHeader('table_list_Quotation', ['TOTALAMOUNT']);
        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    triggerId: function (Id) {
        try {
            
            PurchaseView.variables.AddNew = false;
            $("#panelEdit").show();
            $("#panelView").hide();
            $("#hdnQuotationId").val(Id);
            PurchaseView.variables.oper = 'Edit';

            //var table = $("#saleQuotation").DataTable();
            //var rowData = table.row(Id).data();

            rowData = jQuery("#table_list_Quotation").getRowData(Id);
            var DATE = (rowData['PURCHASEDATE']).split('/');
            $("#txtBillDate").val(DATE[2] + '-' + DATE[1] + '-' + DATE[0]);
            $("#txtAccount").val(rowData['PARTYNAME']);
            $("#txtAccount").attr("partymasterid", rowData['PARTYMASTERID']);
            $("#lblPurchaseCode").html(rowData['PURCHASECODE']);
            $("#lblPurchaseCode").show()
            if (rowData['ROF'] == 1) {
                $("#chkROF").iCheck('check');
            } else {
                $("#chkROF").iCheck('uncheck');
            }
            $("#txtTotalNetAmt").val(rowData['TOTALNETAMT']);
            $("#txtSGSTTaxAmt").val(rowData['SGST'] || 0);
            $("#txtCGSTTaxAmt").val(rowData['CGST'] || 0);
            $("#txtIGSTTaxAmt").val(rowData['IGST'] || 0);
            $("#txtTotalWithTaxAmt").val(rowData['AMTWITHTAX']);
            $("#txtROFAmt").val(rowData['ROFAMT'] || 0);
            $("#txtTotalAmt").val(rowData['TOTALAMT'] || 0);

            $("#hdnVenderStateId").val(rowData['STATEID']);
            $("#txtMobile").val(rowData['MOBILE1']);
            $("#txtPhone").val(rowData['PHONENO']);
            $("#ddlCity").attr("cityid", rowData['CITYID']);
            $("#ddlCity").val(rowData['CITYNAME']);
            $("#txtPin").val(rowData['PINCODE']);
            $("#txtAddress1").val(rowData['ADDRESS1']);
            $("#txtAddress2").val(rowData['ADDRESS2']);
            $("#txtAddress3").val(rowData['ADDRESS3']);
            $("#txtGstNo").val(rowData['GSTNO']);
            $("#txtPanNo").val(rowData['PANNO']);
            $("#txtAdhhar").val(rowData['ADHARCARDNO']);  


            if (rowData['TDSCHK'] == 1) {
                $("#toggleSwitch").bootstrapSwitch('state', true);
                $(".TDSCalculate").show();
                $(".TCSCalculate").hide();
            } else {
                $("#toggleSwitch").bootstrapSwitch('state', false);
                $(".TDSCalculate").hide();
                $(".TCSCalculate").show();
            }

            if (rowData['TCSROF'] == 1) {
                $("#chkROFTCS").iCheck('check');
            } else {
                $("#chkROFTCS").iCheck('uncheck');
            }
            if (rowData['TDSROF'] == 1) {
                $("#chkROFTDS").iCheck('check');
            } else {
                $("#chkROFTDS").iCheck('check')
                $("#chkROFTDS").iCheck('uncheck');
            }
            
            $("#txtTCSApplicableLimit").val(rowData['TCSLIMT'] || 0);
            $("#txtTCSPer").val(rowData['TCSPER']);
            $("#txtTCSAmt").val(rowData['TCSONAMT']);
            $("#txtTCSModal").val(rowData['TCSAMT']);
            $("#txtTCSTaxAmt").val(rowData['TCSAMT']);

            $("#ddlTDS").val(rowData['TDSID']);
            $("#txtTDSOnAmt").val(rowData['TDSONAMT']);
            $("#txtTDSAmtModal").val(rowData['TDSAMT']);
            $("#txtTDSAmt").val(rowData['TDSAMT']);
            $("#txtTDSRofAmt").val(rowData['TDSROFAMT']);

            $("#txtCashPayment").val(parseFloat(rowData['CASHPAYMENT'] || 0.00).toFixed(2));
            $("#txtChequePayment").val(parseFloat(rowData['CHEQUEPAYMENT'] || 0.00).toFixed(2));

            //if (parseInt(rowData['CHEQUEPAYMENT']) > 0) {
            //    BankDetail(id);
            //}
            //$("#txtOsPayment").val(parseFloat(rowData['OSAMT'] || 0.00).toFixed(2));
            //$("#txtRemarks").val(rowData['REMARK']);
            $("#hdnbankId").val(rowData['BANKID']);
            $("#txtBankAC").val(rowData['BANKNAME']);

            var myfilter,
                myfilter = { rules: [] };
            myfilter.rules.push({ field: "PURCHASEID", op: "eq", data: Id });
            $.ajax({
                url: getDomain() + PurchaseView.variables.QuotationDetailUrl + "&myfilters=" + JSON.stringify(myfilter) + '&ISRECORDALL=true',
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse != undefined) {
                        if (JsonObject.serviceresponse.detailslist) {
                            if (JsonObject.serviceresponse.responsecode == 0) {
                                $("#Quotationitem_tbody").html('');
                                var list;
                                if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                    list = JsonObject.serviceresponse.detailslist.details;
                                else
                                    list = JsonObject.serviceresponse.detailslist;
                                PurchaseView.variables.ListId = 1;
                                $.each(list, function (key, innerjsonDetails) {
                                    $("#Quotationitem_tbody").append('<tr>' +
                                        '<td style="text-align: center;"></td>' +
                                        '<td>' +
                                        '<input   type="text" value="' + innerjsonDetails.itemgroupname +'" onkeyup="AutosuggestItemName(this)" class="form-control txtItemName txtAutocomplete" onfocusout="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtItemName' + PurchaseView.variables.ListId + '" id="txtItemName' + PurchaseView.variables.ListId + '" itemgroupmasterid="' + innerjsonDetails.itemgroupmasterid +'">' +
                                        '</td>' +
                                        '<td>' +
                                        '<input   value="' + innerjsonDetails.itemname +'" type="text" onkeyup="AutosuggestSubitemName(this)" class="form-control txtAutocomplete txtSubitemName" name="txtSubitemName' + PurchaseView.variables.ListId + '" id="txtSubitemName' + PurchaseView.variables.ListId + '" itemid="' + innerjsonDetails.itemid +'">' +
                                        '</td>' +
                                        '<td>' +
                                        '<input  value="' + innerjsonDetails.pcs +'" type="text" class="txtPcs form-control txtR number pcs required" onkeyup="PurchaseView.Calculation(this,' + PurchaseView.variables.ListId + ')" name="txtPcs' + PurchaseView.variables.ListId + '" id="txtPcs' + PurchaseView.variables.ListId + '">' +
                                        '</td>' +
                                        '<td>' +
                                        '<input value="' + innerjsonDetails.itemtype +'" disabled type="text" class="txtitemtype form-control txtR number pcs required"  name="txtitemtype' + PurchaseView.variables.ListId + '" id="txtitemtype' + PurchaseView.variables.ListId + '">' +
                                        '</td>' +
                                        '<td>' +
                                        '<select type="text" style="padding: 0;" class="form-control txtHsnCode" onchange="ValueChange(' + PurchaseView.variables.ListId + ')" name="HsnCode' + PurchaseView.variables.ListId + '" id="txtHsnCode' + PurchaseView.variables.ListId + '"></select>' +
                                        '</td>' +
                                        '<td>' +
                                        '<input disabled value="' + innerjsonDetails.rate +'" type="text" class="form-control txtR numbers grosswt fixed required txtRate" decimals="3" name="txtRate' + PurchaseView.variables.ListId + '" id="txtRate' + PurchaseView.variables.ListId + '">' +
                                        '</td>' +

                                        '<td>' +
                                        '<input disabled value="' + innerjsonDetails.amount +'" type="text" class="form-control txtR numbers grosswt fixed required txtAmount" decimals="3" name="txtAmount' + PurchaseView.variables.ListId + '" id="txtAmount' + PurchaseView.variables.ListId + '">' +
                                        '</td>' +

                                        '<td>' +
                                        '<input disabled value="' + innerjsonDetails.taxamt +'" type="text" class="form-control txtR numbers grosswt fixed required txtteaxAmount" decimals="3" name="txtteaxAmount' + PurchaseView.variables.ListId + '" id="txtteaxAmount' + PurchaseView.variables.ListId + '">' +
                                        '</td>' +

                                        '<td>' +
                                        '<input disabled value="' + innerjsonDetails.amttax +'" type="text" class="form-control txtR numbers grosswt fixed required txtAmtTaxTotal" decimals="3" name="txtAmtTax' + PurchaseView.variables.ListId + '" id="txtAmtTax' + PurchaseView.variables.ListId + '">' +
                                        '</td>' +

                                        '<td class="btnRemove" id="btnRemove' + PurchaseView.variables.ListId + '">' +
                                        //'<div class="as_row_rmv" onclick="PurchaseView.RemoveRow(this)">' +
                                        //'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox = "0 0 24 24" fill = "none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19.9394L19.1153 20.1871C19.0164 21.7682 17.7053 23 16.1211 23H7.8789C6.29471 23 4.98356 21.7682 4.88474 20.1871L4.06055 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7V4ZM9 5H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V5ZM6.06445 7L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1191 20.0624L17.9355 7H6.06445Z" fill="#ad2c2c"></path></svg>' +
                                        //'</div>' +
                                        '<div>' +
                                        '<i class="icon-cancel-circle2" onclick="PurchaseView.RemoveRow(this)"></i>' +
                                        '</div>' +
                                        '</td>' +
                                        '</tr>');
                                    
                                    HSNCode(PurchaseView.variables.ListId)

                                    $("#txtHsnCode" + PurchaseView.variables.ListId).val(innerjsonDetails.hsnid)
                                    PurchaseView.variables.ListId = PurchaseView.variables.ListId + 1;

                                });
                                PurchaseView.Calculation();

                            }
                            else {
                                notificationTost('error', JsonObject.serviceresponse.responsemessage)
                            }
                        }
                        else {
                            $("#Quotationitem_tbody").html('');
                        }
                    }
                },
                error: OnError
            });

            //PurchaseView.editTrigger();
        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    RemoveRow: function (row) {
        try {
            $(row).closest('tr').remove();
            //$("#Quotationitem_tbody tr:last td:last").html('<div>' +
            //                                                   '<i class="icon-cancel-circle2" onclick="PurchaseView.RemoveRow(this)"></i>' +
            //                                             '</div>');
            //if ($("#Quotationitem_tbody tr").length >= 1) {
            //    $("#Quotationitem_tbody tr:first td:last div").remove();
            //}
        } catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    RemoveEmptyRow: function () {
        try {
            var ItemName = $(".txtItemName");
            var i = 1;
            if ($("#Quotationitem_tbody tr").length > 1) {
                for (i; ItemName.length > i; i++) {
                    if ($("#" + ItemName[i].id).val() == '') {
                        $(ItemName[i]).parent().parent().remove();
                    }
                }
            }
        } catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    Calculation: function (id, i) {
        try {
            
            var txtPcs = 0, totalamt = 0, totaltaxamt = 0, totalamtteax = 0
            $("#Quotationitem_tbody tr").each(function (key, obj) {
                
                var PCS = $(obj).find(".txtPcs").val() || 0;
                var Rate = $(obj).find(".txtRate").val() || 0;
                var Amount = PCS * Rate
                /*$(".txtAmount").val(Amount || 0);*/
                $(obj).find(".txtAmount").val((Amount).toFixed(2) || 0)
                var gstper = $(obj).find(".txtHsnCode").find('option:selected').attr('gst');
                var taxamount = (Amount * gstper) / 100;


                $(obj).find(".txtteaxAmount").val((taxamount).toFixed(2) || 0)
                var TotalAmtTax = taxamount + Amount;
                $(obj).find(".txtAmtTaxTotal").val((+TotalAmtTax).toFixed(2) || 0)

                /*------ Total --------*/

                txtPcs += +PCS || 0
                totalamt += +Amount || 0
                totaltaxamt += +taxamount || 0
                totalamtteax += (+taxamount + +Amount) || 0
                /*------ Total --------*/

            });
            
            
            
            $("#totalpcs").html(txtPcs.toFixed(2));
            $("#totalamt").html(totalamt.toFixed(2));
            $("#totaltaxamt").html(totaltaxamt.toFixed(2));
            $("#totalamtteax32423").html(totalamtteax.toFixed(2));

            $("#txtTotalNetAmt").val(totalamt.toFixed(2));

            if ($("#hdnVenderStateId").val() == $("#ddlPartyBranch").val()) {
                /*$("#txtSGSTTaxAmt").val(((+taxamount) / 2).toFixed(2))*/

                $("#txtSGSTTaxAmt").val((totaltaxamt / 2).toFixed(2));
                $("#txtCGSTTaxAmt").val((totaltaxamt / 2).toFixed(2));
                $("#txtIGSTTaxAmt").val(0);
            }
            else {
                $("#txtSGSTTaxAmt").val(0);
                $("#txtCGSTTaxAmt").val(0);
                $("#txtIGSTTaxAmt").val(totaltaxamt.toFixed(2));
            }

            $("#txtTotalWithTaxAmt").val(totalamtteax.toFixed(2))
            //$("#txtTotalAmt").val(totalamtteax.toFixed(2))
            
            var ROF = 0
            if ($('#chkROF').is(":checked") == true) {
                ROF = parseFloat(totalamtteax).toFixed() - totalamtteax;
                $("#txtROFAmt").val(ROF.toFixed(2));
                $("#txtTotalAmt").val(parseFloat(totalamtteax).toFixed())
            }
            else {
                $("#txtROFAmt").val(0);
                $("#txtTotalAmt").val(totalamtteax.toFixed(2))
            }
            var txtCashPayment = +$("#txtCashPayment").val() || 0
            var txtChequePayment = +$("#txtChequePayment").val() || 0
            if ($("#toggleSwitch").bootstrapSwitch('state') == true) {

                if ($("#ddlTDS").val()) {
                    var temp_ddlTDS = $('#ddlTDS  option:selected').attr('percentage');
                    var txtTDSAmt = +((totalamt.toFixed(2) * temp_ddlTDS) / 100).toFixed(2);
                    $("#txtTDSAmt").val(txtTDSAmt);

                    var ROFTDS = 0
                    ROFTDS = +((totalamt.toFixed(2) * temp_ddlTDS) / 100).toFixed(2)
                    if ($('#chkROFTDS').is(":checked") == true) {
                        var ROFTDS1 = parseFloat(ROFTDS).toFixed()
                        $("#txtTDSRofAmt").val(+ROFTDS1)
                        $("#txtOsPayment").val((((+$("#txtTotalAmt").val() - (+ROFTDS1))) - txtCashPayment - txtChequePayment).toFixed(2))
                    }
                    else {
                        $("#txtTDSRofAmt").val('')
                        $("#txtOsPayment").val(((+((totalamtteax.toFixed(2)) - (ROFTDS.toFixed(2))).toFixed(2)) - txtCashPayment - txtChequePayment).toFixed(2)) 
                    }
                }
                else {
                    $("#txtTDSAmt").val('');
                    $("#txtTDSRofAmt").val('')
                    $("#txtOsPayment").val((+(+$("#txtTotalAmt").val() - (+$("#txtTDSAmt").val())) - txtCashPayment - txtChequePayment).toFixed(2))
                }
            }
            else {
                
                var txtTCSApplicableLimit = +$("#txtTCSApplicableLimit").val();
                var txtTotalNetAmt = +$("#txtTotalNetAmt").val();
                var txtTCSPer = +$("#txtTCSPer").val();
                var txtTCSTaxAmt = +((txtTotalNetAmt * txtTCSPer) / 100).toFixed(2)
                $("#txtTCSTaxAmt").val(+txtTCSTaxAmt)
                $("#txtOsPayment").val((+((totalamtteax.toFixed(2)) - (txtTCSTaxAmt).toFixed(2)) - txtCashPayment - txtChequePayment).toFixed(2))
            }

        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    SaveData: function (IsPrint) {
        try {
            if ($("#Quotationitem_tbody tr:first td:nth-child(2) input").val() == "") {
                $("#Quotationitem_tbody tr:first td:nth-child(2) input").addClass('table-input-error');
            } else {
                $("#Quotationitem_tbody tr:first td:nth-child(2) input").removeClass('table-input-error');
            }

            if ($("#Quotationitem_tbody tr:first td:nth-child(3) input").val() == "") {
                $("#Quotationitem_tbody tr:first td:nth-child(3) input").addClass('table-input-error');
            } else {
                $("#Quotationitem_tbody tr:first td:nth-child(3) input").removeClass('table-input-error');
            }

            if ($("#Quotationitem_tbody tr:first td:nth-child(4) input").val() == "") {
                $("#Quotationitem_tbody tr:first td:nth-child(4) input").addClass('table-input-error');
            } else {
                $("#Quotationitem_tbody tr:first td:nth-child(4) input").removeClass('table-input-error');
            }

            
            error = $(".table-input-error")
            if (error.length > 0) {
                notificationTost('warning', 'Fields with red lines are required.');
                return false;
            }
            var xmlsaveFiles = "<PURCHASE_DETAILS>";
            var resultXml = makeFileXml('#Quotationitem_tbody');

            if (resultXml.xmlsaveFiles == '') {
                notificationTost('warning', 'Insert Items.');
                return;
            }

            xmlsaveFiles += resultXml.xmlsaveFiles;
            xmlsaveFiles += "</PURCHASE_DETAILS>";
            var data = {
                "PURCHASEID": $("#hdnQuotationId").val(),
                "PARTYMASTERID": $("#txtAccount").attr("partymasterid"),
                "PURCHASEDATE": $("#txtBillDate").val(),
                "ROF": $("#chkROF").prop("checked") ? 1: 0,
                "TOTALNETAMT": $("#txtTotalNetAmt").val(),
                "CGST": $("#txtCGSTTaxAmt").val(),
                "SGST": $("#txtSGSTTaxAmt").val(),
                "IGST": $("#txtIGSTTaxAmt").val(),
                "AMTWITHTAX": $("#txtTotalWithTaxAmt").val(),
                "ROFAMT": $("#txtROFAmt").val(),
                "TOTALAMT": $("#txtTotalAmt").val(),
                "oper": PurchaseView.variables.oper,
                "XMLPARAM": escape(xmlsaveFiles),
                "CITYID": $("#ddlPartyBranch").val(),
                "TDSCHK": ($("#toggleSwitch").bootstrapSwitch('state') == true ? 1 : 0),
                "TCSLIMT": $("#txtTCSApplicableLimit").val(),
                "TCSPER": $("#txtTCSPer").val(),
                "TCSONAMT": $("#txtTCSTaxAmt").val() ? $("#txtTCSTaxAmt").val() : 0,
                /*"TCSAMT": $("#txtTCSModal").val() ? $("#txtTCSModal").val() : 0,*/
                "TDSPER": $("#ddlTDS option:selected").attr("percentage") ? $("#ddlTDS option:selected").attr("percentage") : 0,
                "TDSONAMT": $("#txtTDSOnAmt").val() ? $("#txtTDSOnAmt").val() : 0,
                "TDSAMT": $("#txtTDSAmt").val() ? $("#txtTDSAmt").val() : 0,
                "CASHPAYMENT": $("#txtCashPayment").val() || 0,
                "CHEQUEPAYMENT": $("#txtChequePayment").val() || 0,
                "EVENTMASTERID": $("#ddlevent").val(),
                "ACCYEARID": $("#CurrentAccountYear").attr("accyearid")

            };
            if ($("#ddlTDS").val()) {
                data.TDSID = $("#ddlTDS").val()
                data.TDSROFAMT = $("#txtTDSRofAmt").val()
            }
            data.TCSROF = (($('#chkROFTCS').prop("checked") == true) ? 1 : 0);
            data.TDSROF = (($('#chkROFTDS').prop("checked") == true) ? 1 : 0);
            /*data.GSTCHK = (($('#chkROF').prop("checked") == true) ? 1 : 0);*/

            if ($("#txtChequePayment").val() > 0) {
                data.BANKID = $("#hdnbankId").val();
                data.CHEQUENO = $("#txtChequeNo").val();
                data.CHEQUEBOOKDETAILID = $("#hdnChequebookid").val();
                /*data.CHEQUENAME = $("#txtAccount").val();*/
            }

            $.ajax({
                url: getDomain() + PurchaseView.variables.PerformMasterOperationUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        notificationMessage(PurchaseView.variables.oper + ' Operation', $(data).find('RESPONSEMESSAGE').text(), 'success');
                        if (!IsPrint) {
                            if ($(location).attr('search').split('='))
                                if ($(location).attr('search').split('=')[1]) {
                                    window.top.close();
                                    return;
                                }
                        }
                        PurchaseView.ClearData();
                        $("#panelView").hide();
                        $("#panelEdit").show();
                        ItemAddNewRow();
                        $("#txtMobileNo").focus();
                        //$("#hdnQuotationId").val($(data).find("QUOTATIONID").text());
                    }
                    else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            });
        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            rowData = jQuery("#table_list_Quotation").getRowData(id);
            $("#hdnQuotationId").val(id);
            $("#delCode").html(rowData['PURCHASECODE']);
            $("#ModalQuotationDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    DeleteSubmit: function () {
        try {
            var data = {
                "PURCHASEID": $("#hdnQuotationId").val(),
                "oper": 'Delete',
            };
            $.ajax({
                url: getDomain() + PurchaseView.variables.PerformMasterOperationUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        $("#hdnQuotationId").val("");
                        notificationMessage('Success', $(data).find('RESPONSEMESSAGE').text(), 'success');
                        $("#ModalQuotationDelete").modal('hide');
                        jQuery("#table_list_Quotation").trigger('reloadGrid');
                    } else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            });
        } catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    //TaxDropDown: function () {
    //    $("#ddlTax" + PurchaseView.variables.ListId).html();
    //    BindDropdown('ddlTax' + PurchaseView.variables.ListId, 'TaxDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=TAXMASTER_GET&IsRecordAll=true&ISACTIVE=1", '', true);
    //},

    Sum: function (id) {
        try {
            var type = $("#txtItemName" + id).attr('purchaseratetype');
            if (type == 'FinewtRate') {
                $("#txtAmt" + id).val(parseFloat((+$("#txtMetalRate" + id).val() || 0) * (+$("#txtFineWt" + id).val() || 0)).toFixed(2));
            } else if (type == 'GrosswtRate') {
                $("#txtAmt" + id).val(parseFloat((+$("#txtMetalRate" + id).val() || 0) * (+$("#txtGrossWt" + id).val() || 0)).toFixed(2));
            } else if (type == 'NetwtRate') {
                $("#txtAmt" + id).val(parseFloat((+$("#txtMetalRate" + id).val() || 0) * (+$("#txtNetWt" + id).val() || 0)).toFixed(2));
            } else if (type == 'PcsRate') {
                $("#txtAmt" + id).val(parseFloat((+$("#txtMetalRate" + id).val() || 0) * (+$("#txtPcs" + id).val() || 0)).toFixed(2));
            } else {
                $("#txtAmt" + id).val(parseFloat((+$("#txtMetalRate" + id).val() || 0) * (+$("#txtNetWt" + id).val() || 0)).toFixed(2));
            }

            $("#txtNetAmt" + id).val(parseFloat(parseInt((+$("#txtAmt" + id).val() || 0) + (+$("#txtOtherAmt" + id).val() || 0))).toFixed(2));

            var sum = 0;
            $('.pcs').each(function () {
                sum += +this.value;
            });
            $("#totalpcs").html(parseInt(sum || 0));

            var sum = 0;
            $('.grosswt').each(function () {
                sum += +this.value;
            });
            $("#totalgrosswt").html(parseFloat(sum || 0).toFixed(3));

            var sum = 0;
            $('.lesswt').each(function () {
                sum += +this.value;
            });
            $("#totallesswt").html(parseFloat(sum || 0).toFixed(3));

            var sum = 0;
            $('.netwt').each(function () {
                sum += +this.value;
            });
            $("#totalnetwt").html(parseFloat(sum || 0).toFixed(3));

            var sum = 0;
            $('.finewt').each(function () {
                sum += +this.value;
            });
            $("#totalfinewt").html(parseFloat(sum || 0).toFixed(3));

            //var sum = 0;
            //$('.MetalRate').each(function () {
            //    sum += +this.value;
            //});
            //$("#totalmealrate").html(parseFloat(sum || 0).toFixed(4));

            var sum = 0;
            $('.amt').each(function () {
                sum += +this.value;
            });
            $("#totalamt").html(parseFloat(sum || 0).toFixed(2));

            var sum = 0;
            $('.otheramt').each(function () {
                sum += +this.value;
            });
            $("#totalotheramt").html(parseFloat(sum || 0).toFixed(2));

            var sum = 0;
            $('.NetAmt').each(function () {
                sum += +this.value;
            });
            $("#totalnetamt").html(parseFloat(sum || 0).toFixed(2));
            $("#lblTotl").html(parseFloat(sum || 0).toFixed(2));
            $("#lblTotalText").html(convertNumberToWords(parseFloat(sum || 0).toFixed(2)));
            $("#txtTotalAmt").val($("#totalnetamt").html());
        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    ClearData: function () {
        try {
            $("#lblPurchaseCode").hide();
            $("#txtAccount").attr("partymasterid","")
            $("#hdnVenderStateId").val("");
            PurchaseView.variables.ListId = 1;
            PurchaseView.variables.oper = 'Add';
            $("#Quotationitem_tbody").html('');
            jQuery("#table_list_Quotation").trigger('reloadGrid');
            $("#hdnQuotationId").val('');
            var today = new Date().toISOString().split('T')[0];
            $("#txtBillDate").val(today);
            $("#chkROF").iCheck('uncheck');
            $("#txtTotalNetAmt").val("");
            $("#txtCGSTTaxAmt").val("");
            $("#txtSGSTTaxAmt").val("");
            $("#txtIGSTTaxAmt").val("");
            $("#txtTotalWithTaxAmt").val("");
            $("#txtROFAmt").val("");
            $("#txtTotalAmt").val("");
            $("#txtAccount").val("");

            $("#panelView").show();
            $("#panelEdit").hide();
            $("#txtMobileNo").focus();

            $("#txtAccount").attr("partymasterid", "");
            $("#hdnVenderStateId").val("");
            $("#txtMobile").val("");
            $("#txtPhone").val("");
            $("#ddlCity").attr("cityid", "");
            $("#ddlCity").val("");
            $("#txtPin").val("");
            $("#txtAddress1").val("");
            $("#txtAddress2").val("");
            $("#txtAddress3").val("");
            $("#txtGstNo").val("");
            $("#txtPanNo").val("");
            $("#txtAdhhar").val("");  
            $("#toggleSwitch").bootstrapSwitch('state', true);
            $("#txtTCSTaxAmt").val("");
            $("#ddlTDS").val("");
            $("#txtTDSOnAmt").val("")
            $("#txtTDSAmt").val("")
            $("#txtCashPayment").val("")
            $("#txtChequePayment").val("")
            $("#ddlTDS").val("")
            $("#txtTDSRofAmt").val("")
            $("#chkROFTCS").iCheck('uncheck');
            $("#hdnbankId").val("");
            $("#txtChequeNo").val("");
            $("#hdnChequebookid").val("");
            $("#txtOsPayment").val(0.00)

            //------ New Code Add ------//
            //$('.as_add_data_wrap').hide();
        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    print: function (id) {
        $.ajax({
            url: getDomain() + '/Transaction/PurchaseQuotationPrint?ServiceName=PURCHASEQUOTATION_GET&QUOTATIONID=' + (id || 0),
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
    },
    validation: function () { },

    GetVoucherDetails: function (VoucherId) {
        try {
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "QUOTATIONID", op: "eq", data: VoucherId });
            $.ajax({
                url: getDomain() + PurchaseView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        var rowData = JsonObject.serviceresponse.detailslist.details;
                        var id = rowData.quotationid;
                        PurchaseView.variables.AddNew = false;
                        $("#panelEdit").show();
                        $("#panelView").hide();
                        $("#hdnQuotationId").val(id);
                        $("#lbl_VoucherNo").show();
                        PurchaseView.variables.oper = 'Edit';
                        var DATE = (rowData.date.toString()).split('/');
                        $("#txtBillDate").val(DATE[2] + '-' + DATE[1] + '-' + DATE[0]);
                        $("#lbl_VoucherNo").html(rowData.voucherno);
                        if (rowData.mobileno)
                            if (rowData.mobileno.toString() != '[object Object]')
                                $("#txtMobileNo").val(rowData.mobileno);
                        $("#txtTotalAmt").val(rowData.totalamount);
                        if (rowData.remark)
                            if (rowData.remark.toString() != '[object Object]')
                                $("#txtRemark").val(rowData.remark);

                        if (rowData.issettled.toString() == '1') {
                            $("#btnSavePrint").hide();
                            $("#btnSaveQuotation").hide();
                            $("#btnPrint").show();
                        } else {
                            $("#btnSavePrint").show();
                            $("#btnSaveQuotation").show();
                            $("#btnPrint").hide();
                        }
                        var myfilter,
                            myfilter = { rules: [] };
                        myfilter.rules.push({ field: "QUOTATIONID", op: "eq", data: id });
                        $.ajax({
                            url: getDomain() + PurchaseView.variables.QuotationDetailUrl + "&myfilters=" + JSON.stringify(myfilter),
                            async: false,
                            cache: false,
                            type: 'POST',
                            success: function (data) {
                                var JsonObject = xml2json.parser(data);
                                if (JsonObject.serviceresponse != undefined) {
                                    if (JsonObject.serviceresponse.detailslist) {
                                        if (JsonObject.serviceresponse.responsecode == 0) {
                                            $("#Quotationitem_tbody").html('');
                                            var list;
                                            if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                                list = JsonObject.serviceresponse.detailslist.details;
                                            else
                                                list = JsonObject.serviceresponse.detailslist;
                                            PurchaseView.variables.ListId = 1;
                                            $.each(list, function (key, innerjsonDetails) {
                                                $("#Quotationitem_tbody").append('<tr>' +
                                                    '<td style="text-align: center;"></td>' +
                                                    '<td>' +
                                                    '<input type="text" purchaseratetype="' + innerjsonDetails.purchaseratetype + '" value="' + innerjsonDetails.itemname + '" itemgroupid="' + innerjsonDetails.itemgroupid + '" ItemId="' + innerjsonDetails.itemid + '" onkeyup="AutosuggestItemName(this)" class="form-control txtItemName txtAutocomplete" onfocusout="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtItemName' + PurchaseView.variables.ListId + '" id="txtItemName' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + (innerjsonDetails.subitemname == '[object Object]' ? '' : innerjsonDetails.subitemname || "") + '"  onkeyup="AutosuggestSubitemName(this)" class="form-control txtAutocomplete txtSubitemName" name="txtSubitemName' + PurchaseView.variables.ListId + '" id="txtSubitemName' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + innerjsonDetails.pcs + '" class="form-control txtR number pcs" onkeyup="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtPcs' + PurchaseView.variables.ListId + '" id="txtPcs' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + parseFloat(innerjsonDetails.grosswt).toFixed(3) + '" class="form-control txtR numbers grosswt fixed" decimals="3" onkeyup="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtGrossWt' + PurchaseView.variables.ListId + '" id="txtGrossWt' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + parseFloat(innerjsonDetails.lesswt).toFixed(3) + '" class="form-control txtR numbers lesswt fixed" decimals="3" onkeyup="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtLessWt' + PurchaseView.variables.ListId + '" id="txtLessWt' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + parseFloat(innerjsonDetails.netwt).toFixed(3) + '" class="form-control txtR numbers netwt fixed" decimals="3" onkeyup="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtNetWt' + PurchaseView.variables.ListId + '" id="txtNetWt' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + innerjsonDetails.touch + '" class="form-control txtR numbers txtTouch" onkeyup="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtTouch' + PurchaseView.variables.ListId + '" id="txtTouch' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text"  value="' + parseFloat(formatTwoDigitDecimal(innerjsonDetails.finetwt)).toFixed(3) + '" class="form-control txtR numbers finewt fixed round" decimals="3" onkeyup="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtFineWt' + PurchaseView.variables.ListId + '" id="txtFineWt' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + parseFloat(innerjsonDetails.metalrate).toFixed(4) + '" class="form-control txtR numbers MetalRate fixed" decimals="4" onkeyup="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtMetalRate' + PurchaseView.variables.ListId + '" id="txtMetalRate' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + parseFloat(innerjsonDetails.amount).toFixed(2) + '" class="form-control txtR numbers amt fixed" decimals="2" onfocusout="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtAmt' + PurchaseView.variables.ListId + '" id="txtAmt' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + parseFloat(innerjsonDetails.otheramt).toFixed(2) + '" class="form-control txtR numbers otheramt fixed" decimals="2" onkeyup="PurchaseView.Sum(' + PurchaseView.variables.ListId + ')" name="txtOtherAmt' + PurchaseView.variables.ListId + '" id="txtOtherAmt' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td>' +
                                                    '<input type="text" value="' + parseFloat(innerjsonDetails.netamt).toFixed(2) + '" class="form-control txtR numbers NetAmt fixed" decimals="2" onblur="PurchaseView.Sum(' + PurchaseView.variables.ListId + ')" name="txtNetAmt' + PurchaseView.variables.ListId + '" id="txtNetAmt' + PurchaseView.variables.ListId + '">' +
                                                    '</td>' +
                                                    '<td class="btnRemove" id="btnRemove' + PurchaseView.variables.ListId + '">' +
                                                    //'<div class="as_row_rmv" onclick="PurchaseView.RemoveRow(this)">' +
                                                    //'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox = "0 0 24 24" fill = "none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19.9394L19.1153 20.1871C19.0164 21.7682 17.7053 23 16.1211 23H7.8789C6.29471 23 4.98356 21.7682 4.88474 20.1871L4.06055 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7V4ZM9 5H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V5ZM6.06445 7L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1191 20.0624L17.9355 7H6.06445Z" fill="#ad2c2c"></path></svg>' +
                                                    //'</div>' +
                                                    '<div>' +
                                                    '<i class="icon-cancel-circle2" onclick="PurchaseView.RemoveRow(this)"></i>' +
                                                    '</div>' +
                                                    '</td>' +
                                                    '</tr>');
                                                FixValue();

                                                if (PurchaseView.variables.AddNew != true) {
                                                    $("#Quotationitem_tbody tr:last td:nth-child(2) input").focus();
                                                } else {
                                                    PurchaseView.variables.AddNew = false;
                                                }

                                                PurchaseView.Sum(PurchaseView.variables.ListId);
                                                PurchaseView.variables.ListId = PurchaseView.variables.ListId + 1;

                                            });
                                        } else {
                                            notificationTost('error', JsonObject.serviceresponse.responsemessage)
                                        }
                                    } else {
                                        $("#Quotationitem_tbody").html('');
                                    }
                                }
                            },
                            error: OnError
                        });
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                }

            });
        } catch (e) { }
    },

    VoucherDateCheck: function () {
        try {
            var BillDMY = '', StartDMY = '', EndDMY = '', Bill_Year, Bill_Month, Start_Year, Start_Month, End_Year
            BillDMY = $("#txtBillDate").val().split('-');
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
                    $("#txtBillDate").val($("#lbl_enddate").val());
                    //$("#txtVoucherDate").focus();
                    //return;
                }
            }
            else if (Bill_Month <= Start_Month) {
                if (Bill_Year != End_Year) {
                    //notificationTost('warning', 'Enter Date in AccountYear.');
                    $("#txtBillDate").val($("#lbl_enddate").val());
                    //$("#txtVoucherDate").focus();
                    //return;
                }
            }
        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },

    AccountNameAutoComplete: function (obj) {
        var id = $(obj).attr('id');
        $('#' + id).autocomplete({
            source: function (request, response) {
                var myfilter, SP_Name;
                myfilter = { rules: [] };

                var Value = "";
                var PartyName = "";
                //var PartyName = Value.replace(/[^a-z0-9\s]/gi, '');

                Value = $('#' + id).val().replace(/_/g, '').replace('-', '');
                PartyName = Value.replace(/[^a-z0-9\s]/gi, '');     //.replace(/[_\s]/g, '-')

                myfilter.rules.push({ field: "PARTYSEARCH", op: "eq", data: PartyName }); //$('#' + id).val().replace(/_/g, '').replace('-', '')
                myfilter.rules.push({ field: "MASTERTYPE", op: "eq", data: 'PartyMaster' });

                var url = getDomain() + "/Common/BindMastersDetails?ServiceName=PARTYMASTER_GET&ISACTIVE=1&myfilters=" + JSON.stringify(myfilter);
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

                                if ($("#ddlSeries").val() != 'URDPurchase') {
                                    response(
                                        
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {
                                                return {
                                                    label: item.searchdata,
                                                    value: item.partyname,
                                                    name: item.partyname,
                                                    venderid: item.partymasterid,
                                                    accid: item.accountid,
                                                    referencebyid: item.referencebyid || "",
                                                    referenceby: item.referencebyname || "",
                                                    referencetype: item.referencetype || "",
                                                    panno: (item.panno == "[object Object]" ? "" : item.panno) || "",
                                                    gstno: (item.gstno == "[object Object]" ? "" : item.gstno) || "",
                                                    aadharno: item.adharcardno || "",
                                                    form60: item.isform60 || "",
                                                    photo: item.panimg || "",
                                                    address1: (item.address1 == "[object Object]" ? "" : item.address1) || "",
                                                    address2: (item.address2 == "[object Object]" ? "" : item.address2) || "",
                                                    address3: (item.address3 == "[object Object]" ? "" : item.address3) || "",
                                                    cityid: item.cityid,
                                                    cityname: item.cityname,
                                                    StateId: item.stateid,
                                                    pincode: (item.pincode == "[object Object]" ? "" : item.pincode) || "",
                                                    mobile: item.mobile1,
                                                    phone: item.phoneno || "",
                                                    tcslimit: item.tcslimit || "",
                                                    tcsper: item.tcsper || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    TDSCodeId: item.tdscodeid
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.searchdata,
                                                    value: item.partyname,
                                                    name: item.partyname,
                                                    venderid: item.partymasterid,
                                                    accid: item.accountid,
                                                    referencebyid: item.referencebyid || "",
                                                    referenceby: item.referencebyname || "",
                                                    referencetype: item.referencetype || "",
                                                    panno: (item.panno == "[object Object]" ? "" : item.panno) || "",
                                                    gstno: (item.gstno == "[object Object]" ? "" : item.gstno) || "",
                                                    aadharno: item.adharcardno || "",
                                                    form60: item.isform60 || "",
                                                    photo: item.panimg || "",
                                                    address1: (item.address1 == "[object Object]" ? "" : item.address1) || "",
                                                    address2: (item.address2 == "[object Object]" ? "" : item.address2) || "",
                                                    address3: (item.address3 == "[object Object]" ? "" : item.address3) || "",
                                                    cityid: item.cityid,
                                                    cityname: item.cityname,
                                                    StateId: item.stateid,
                                                    pincode: (item.pincode == "[object Object]" ? "" : item.pincode) || "",
                                                    mobile: item.mobile1,
                                                    phone: item.phoneno || "",
                                                    tcslimit: item.tcslimit || "",
                                                    tcsper: item.tcsper || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    TDSCodeId: item.tdscodeid
                                                }
                                            }
                                        })
                                    )
                                }
                                else {
                                    response(
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {
                                                return {
                                                    label: item.accountname + '-' + (item.mobile == '[object Object]' ? '' : item.mobile),
                                                    name: item.accountname,
                                                    venderid: item.customeraccid,
                                                    accid: item.accid,
                                                    panno: item.pan || "",
                                                    gstno: item.gst || "",
                                                    aadharno: item.adhaar || "",
                                                    isosbillnotaccept: item.isosbillnotaccept,
                                                    photo: item.panimg || "",
                                                    address1: item.address1 || "",
                                                    address2: item.address2 || "",
                                                    address3: item.address3 || "",
                                                    cityid: item.cityid,
                                                    cityname: item.cityname,
                                                    StateId: item.stateid,
                                                    pincode: item.pincode || "",
                                                    mobile: item.mobile || "",
                                                    phone: item.phone || "",
                                                    membershipid: item.customertypeid || "",
                                                    customercategory: item.customercategoryid || "",
                                                    tcslimit: item.tcslimit || "",
                                                    tcsper: item.tcsper || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    TDSCodeId: item.tdscodeid
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.accountname + '-' + (item.mobile == '[object Object]' ? '' : item.mobile),
                                                    name: item.accountname,
                                                    venderid: item.customeraccid,
                                                    accid: item.accid,
                                                    panno: item.pan || "",
                                                    gstno: item.gst || "",
                                                    aadharno: item.adhaar || "",
                                                    isosbillnotaccept: item.isosbillnotaccept,
                                                    photo: item.panimg || "",
                                                    address1: item.address1 || "",
                                                    address2: item.address2 || "",
                                                    address3: item.address3 || "",
                                                    cityid: item.cityid,
                                                    cityname: item.cityname,
                                                    StateId: item.stateid,
                                                    pincode: item.pincode || "",
                                                    mobile: item.mobile,
                                                    phone: item.phone || "",
                                                    membershipid: item.customertypeid || "",
                                                    customercategory: item.customercategoryid || "",
                                                    tcslimit: item.tcslimit || "",
                                                    tcsper: item.tcsper || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    TDSCodeId: item.tdscodeid
                                                }
                                            }
                                        })
                                    )
                                }
                            }
                            else {
                                $("#txtAccount").val("")
                                var result = [
                                    {
                                        label: '',
                                        value: ($('#' + id).val()).toUpperCase()
                                    }
                                ];
                                response(result);
                            }
                        }
                        else {
                            $("#txtAccount").val("")
                            notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                        }
                    }
                })
            },
            messages: {
                noResults: "No Results Found"
            },
            select: function (event, ui) {
                console.log(ui)
                $("#txtAccount").attr("partymasterid", ui.item.venderid);
                $("#hdnVenderStateId").val(ui.item.StateId);
                $("#txtMobile").val(ui.item.mobile != '' ? ui.item.mobile : '');
                $("#txtPhone").val(ui.item.phoneno != '' ? ui.item.phoneno : '');
                if (ui.item.cityid) {
                    $("#ddlCity").attr("cityid", ui.item.cityid);
                    $("#ddlCity").val(ui.item.cityname)
                }
                $("#txtPin").val(ui.item.pincode);
                $("#txtAddress1").val(ui.item.address1);
                $("#txtAddress2").val(ui.item.address2);
                $("#txtAddress3").val(ui.item.address3);
                $("#txtGstNo").val(ui.item.gstno);
                $("#txtPanNo").val(ui.item.panno);                    
                $("#txtAdhhar").val(ui.item.panno);                    

            },
            minLength: 3,
            autoFocus: true
        });
    },

    GetHSNCodeList: function () {
        try {
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET&COLUMNREQUESTED=HSNID&COLUMNREQUESTED=HSNCODE&IsRecordAll=true&ISACTIVE=1",
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        if ($(data).find(xmlvars.common_root).text() != '') {
                            PurchaseView.variables.HSNCodeList = xml2json.parser(data);
                        }
                        else {
                            PurchaseView.variables.HSNCodeList = [];
                        }
                    }
                    else {
                        InvalidResponseCode(data);
                        PurchaseView.variables.HSNCodeList = [];
                    }
                },
                error: OnError
            });
        }
        catch (e) {
            ErrorDetails(e, PurchaseView.variables.File);
        }
    },
    GetVenderDetails: function (id, type) {
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
                        $("#hdnVenderStateId").val(List.stateid);
                        $("#VenderId").val(List.accountid);
                        $("#VenderAccId").val(List.accid);
                        $("#txtMobile").val(List.contact);
                        $("#txtPhone").val(List.contact1);
                        $("#txtAddress1").val(List.address);
                        $("#txtAddress2").val(List.address1);
                        $("#txtAddress3").val(List.address2);
                        $("#ddlCity").val(List.cityname);
                        $("#txtPin").val(List.pincode);
                        $("#txtPanNo").val(List.panno);
                        $("#txtGstNo").val(List.gstno);
                        $("#txtAdhhar").val(List.adharcardno);
                        $("#txtAccount").removeClass('table-input-error');
                        if (List.accounttype == 'CUSTOMER') {
                            if (List.isformoros)
                                $("#chkIsOSBillNotAccept").iCheck('check');
                            else
                                $("#chkIsOSBillNotAccept").iCheck('uncheck');

                            $("#chkform60").iCheck('uncheck');
                        } else if (List.accounttype == 'PARTY') {
                            if (List.isformoros)
                                $("#chkform60").iCheck('check');
                            else
                                $("#chkform60").iCheck('uncheck');

                            $("#chkIsOSBillNotAccept").iCheck('uncheck');
                        }
                        setTimeout(function () {
                            $("#purchaseitem_tbody .txtItemName:first").focus();
                        }, 300);
                        $("#hdnCommonNewPartyId").val('');
                        $("#hdnCommonNewCustomerId").val('');
                    }
                }
            }
        });
    },

    bindTDS: function () {
        $("#ddlTDS").html("");
        BindDropdown('ddlTDS', 'TDSDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=TDSMASTER_GET&IsRecordAll=true&ISACTIVE=1&COLUMNREQUESTED=TDSID,CODE,PERCENTAGE", '-- TDS --', true);
    },

    bindEvent: function () {
        $("#ddlevent").html("");
        BindDropdown('ddlevent', 'EventList', getDomain() + "/Common/BindMastersDetails?ServiceName=EVENTMASTER_GET&IsRecordAll=true&ISACTIVE=1",'', true);
    },

    TDSORTCSChange: function () {
        PurchaseView.Calculation();
    }


}

$(document).ready(function () {
    try {
        PurchaseView.bindEvent();
        $("#ddlTDS").change(function () {
            PurchaseView.Calculation();
        })
        PurchaseView.bindTDS();

        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "CITY", op: "eq", data: $("#ddlPartyBranch").val() });
        /*myfilter.rules.push({ field: "GROUP", op: "eq", data: 'Group' });*/
        var url =  PurchaseView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);

        PurchaseView.initializeJqgrid(url);

        $("#btnReCalculate").click(function () {
            PurchaseView.Calculation();
        })
        $('#chkROF').on('ifChanged', function (event) {
            PurchaseView.Calculation();
        });
        $('#chkROFTDS').on('ifChanged', function (event) {
            PurchaseView.Calculation();
        });

        
        PurchaseView.GetHSNCodeList();

        

        $("#txtMobileNo").focus();
        PurchaseView.ClearData();
        //ItemAddNewRow();
        //$("#panelView").hide();
        //$("#panelEdit").show();
        $("#btnAddnewQuotation").click(function () {
            PurchaseView.ClearData();
            PurchaseView.variables.AddNew = true;
            ItemAddNewRow();
            setTimeout(function () {
                PurchaseView.variables.AddNew = false;
                $("#txtMobileNo").focus();
            }, 60);
            $("#panelView").hide();
            $("#panelEdit").show();
            PurchaseView.VoucherDateCheck();
        });
        $("#btnSaveQuotation").click(function () {
            if ($("#btnSaveQuotation").is(":visible"))
                PurchaseView.SaveData(false);
        });
        $("#btncancelQuotation").click(function () {
            PurchaseView.ClearData();
        });
        $("#btnViewList").click(function () {
            PurchaseView.ClearData();
        });
        $("#btnDeleteQuotation").click(function () {
            PurchaseView.DeleteSubmit();
        });
        $("#btnCancelDelete").click(function () {
            $("#ModalQuotationDelete").modal('hide');
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

        $("#txtBillDate").keydown(function (event) {
            setTimeout(function () {
                if (event.keyCode == 13) {
                    document.getElementById("Quotationitem_tbody").children[0].children[1].firstElementChild.focus();
                }
            }, 100);
        });
        $("#btnSavePrint").click(function () {
            PurchaseView.RemoveEmptyRow();
            if ($("#btnSaveQuotation").is(":visible"))
                PurchaseView.SaveData(false);
            if ($("#hdnQuotationId").val()) {
                PurchaseView.print($("#hdnQuotationId").val());
                if ($(location).attr('search').split('='))
                    if ($(location).attr('search').split('=')[1]) {
                        window.top.close();
                        return;
                    }
            }
        });

        $("#btnPrint").click(function () {
            PurchaseView.print($("#hdnQuotationId").val());
        });
        $("#refreshgrid").click(function () {
            jQuery('#table_list_Quotation').trigger('reloadGrid');
        });

        $("#btnPrevious").click(function () {
            GetId('PURCHASEQUOTATION', ($("#hdnQuotationId").val() || ''), 'PREVIOUS');
        });

        $("#btnNext").click(function () {
            GetId('PURCHASEQUOTATION', ($("#hdnQuotationId").val() || ''), 'NEXT');
        });
        $("#btnPdfPrint").click(function () {
            $("#table_list_Quotation").jqGrid("exportToPdf", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "PurchaseQuotation.pdf"
            })
        });
        $("#btnExcelPrint").click(function () {
            $("#table_list_Quotation").jqGrid("exportToExcel", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "PurchaseQuotation.xlsx"
            })
        })

        // tooltip function

        $('[data-toggle="tooltip"]').tooltip()

        //end tooltip function
        var params = new window.URLSearchParams(window.location.search);
        if (params.get('VoucherId')) {
            PurchaseView.GetVoucherDetails(params.get('VoucherId'));
        } else {
            DateFilter();
        }

        $("#CommonCityModal").on('hide.bs.modal', function () {
            $("#ddlCity").val($("#txtCityAddCommon").val());
            $("#ddlCity").attr('cityid', $("#hdnNewCityId").val());
            $("#hdnVenderStateId").val($("#ddlCommonAddState").val());
            $("#hdnNewCityId").val('');
            $(".CommonCityAddForm").trigger("reset");
        });

        $("#AddEditPartyCusomerModal").on('hide.bs.modal', function () {
            
            if ($("#hdnCommonNewPartyId").val() != '') {    //--------------- New Party Id for new record
                PurchaseView.GetVenderDetails($("#hdnCommonNewPartyId").val(), 'PARTY');
            } else if ($("#hdnCommonNewCustomerId").val() != '') {  //--------------- New Customer Id for new record
                PurchaseView.GetVenderDetails($("#hdnCommonNewCustomerId").val(), 'CUSTOMER');
            } else {
                setTimeout(function () {
                    $("#txtAccount").focus();
                }, 500);
            }
        });


        $("#toggleSwitch").bootstrapSwitch('state', true);
        $("#toggleSwitch").on('switchChange.bootstrapSwitch', function (e) {
            if ($("#toggleSwitch").bootstrapSwitch('state') == true) {
                $(".TDSCalculate").show();
                $(".TCSCalculate").hide();
                /*CalculateBill_PaymentInfo()*/
                //PurchaseView.bindtdspercentage()
            } else {
                $(".TDSCalculate").hide();
                $(".TCSCalculate").show();
                $("#txtTCSAmt").val($("#txtTotalNetAmt").val());

                //------------------------------------Tcs Count-------------------------------------//
                if ($("#chkROFTCS").prop('checked')) {
                    var tcsamt = $("#txtTCSTaxAmt").val()
                    $("#txtTCSTaxAmt").val(parseFloat(parseFloat(tcsamt).toFixed()).toFixed(2));
                } else {
                    var tcsper = $("#txtTCSPer").val();
                    var totalAmtTax = parseFloat($("#txtTotalWithTaxAmt").val()).toFixed(2);
                    var totalNetAmt = parseFloat($("#txtTotalNetAmt").val()).toFixed(2);
                    var tcs = parseFloat(parseFloat(((totalNetAmt * tcsper) / 100)).toFixed(1)).toFixed(2);
                    $("#txtTCSAmt").val(totalNetAmt);
                    $("#txtTCSModal").val(tcs);
                    $("#txtTCSTaxAmt").val(tcs);
                }
                //-----------------------------------/Tcs Count-------------------------------------//
                /*CalculateBill_PaymentInfo()*/
            }
        });
        if ($("#toggleSwitch").bootstrapSwitch('state') == true) {
            $(".TDSCalculate").show();
            $(".TCSCalculate").hide();
        } else {
            $(".TDSCalculate").hide();
            $(".TCSCalculate").show();
        }

      
    }
    catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
});

function GetVoucherData(VoucherId) {
    PurchaseView.GetVoucherDetails(VoucherId);
}

$(window).keydown(function (event) {
    try {
        if (event.altKey && event.keyCode == 82 && $("#panelView").is(":visible")) {
            jQuery('#table_list_Quotation').trigger('reloadGrid');
        }
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
});

function AutosuggestItemName(id) {
    try {

        if ($("#txtAccount").attr("partymasterid")) {
            var id = $(id).attr('id');
            var append = id.replace('txtItemName', '');
            $("#" + id).autocomplete({
                source: function (request, response) {
                    var myfilter;
                    myfilter = {
                        rules: []
                    };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#" + id).val() });
                    /*myfilter.rules.push({ field: "GROUP", op: "eq", data: 'Group' });*/
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMGROUPMASTER_GET&myfilters=" + JSON.stringify(myfilter);
                    $.ajax({
                        url: url,
                        type: "POST",
                        async: false,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                var JsonObject = xml2json.parser(data);
                                console.log(JsonObject)
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
                                                    label: item.itemgroupname,
                                                    value: item.itemgroupname,
                                                    Id: item.itemgroupmasterid,
                                                    SHORTNAME: item.shortname,
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.itemgroupname,
                                                    value: item.itemgroupname,
                                                    Id: item.itemgroupmasterid,
                                                    SHORTNAME: item.shortname
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id).val().length <= 1) {
                                        $("#txtItemName" + append).attr('itemgroupmasterid', '');
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
                                    $("#txtItemName" + append).attr('itemgroupmasterid', '');
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
                        $("#txtItemName" + append).attr('itemgroupmasterid', ui.item.Id);
                        $("#txtPcs" + append).val(0);
                        PurchaseView.Calculation();
                    } else {
                        setTimeout(function () {
                            $("#" + id).val('');
                        }, 1)
                    }
                },
                minLength: 1,
                autoFocus: true
            });
        }
        else {
            notificationTost('warning', 'First Select A/C Name')
        }

        
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
};
function AutosuggestSubitemName(id) {
    try {
        var id = $(id).attr('id');
        var append = id.replace('txtSubitemName', '');
        var itemgroupmasterid = $("#txtItemName" + append).attr("itemgroupmasterid")
        
        if (itemgroupmasterid) {

            $("#" + id).autocomplete({
                source: function (request, response) {
                    var myfilter;
                    myfilter = {
                        rules: []
                    };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#" + id).val() });
                    myfilter.rules.push({ field: "ITEMGROUPID", op: "eq", data: itemgroupmasterid });
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMMASTER_GET&myfilters=" + JSON.stringify(myfilter);
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
                                                    SHORTNAME: item.shortname,
                                                    GST: item.gst,
                                                    HSNID: item.hsnid,
                                                    HSNCODE: item.hsncode,
                                                    PRICE: item.price,
                                                    ITEMTYPE_COMMON: item.itemtype_common,
                                                    LABOURRATE: item.labourrate,
                                                    TOTALRATE: item.totalrate,
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.itemname,
                                                    value: item.itemname,
                                                    Id: item.itemgroupmasterid,
                                                    SHORTNAME: item.shortname,
                                                    GST: item.gst,
                                                    HSNID: item.hsnid,
                                                    HSNCODE: item.hsncode,
                                                    PRICE: item.price,
                                                    ITEMTYPE_COMMON: item.itemtype_common,
                                                    LABOURRATE: item.labourrate,
                                                    TOTALRATE: item.totalrate,
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id).val().length <= 1) {
                                        $("#txtSubitemName" + append).attr('itemid', '');
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
                                    $("#txtSubitemName" + append).attr('itemid', '');
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
                        $("#txtSubitemName" + append).attr('itemid', ui.item.Id);
                        $("#txtHsnCode" + append).val(ui.item.HSNID)
                        $("#txtRate" + append).val(ui.item.TOTALRATE)
                        $("#txtitemtype" + append).val(ui.item.ITEMTYPE_COMMON)
                        PurchaseView.Calculation()
                    } else {
                        setTimeout(function () {
                            $("#" + id).val('');
                        }, 1)
                    }
                },
                minLength: 1,
                autoFocus: true
            });

        }
        else {
            notificationTost('warning', 'First Select Iteam Group')

        }

        
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
};


function HSNCode(postfix) {
    try {
        
        $("#txtHsnCode" + postfix).html("");
        if (PurchaseView.variables.HSNCodeList) {
            $("#txtHsnCode" + postfix).append($("#HSNDropdownList").render(PurchaseView.variables.HSNCodeList.serviceresponse.detailslist.details));
        }
    }
    catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
};
function ItemAddNewRow() {
    try {
        $("#Quotationitem_tbody").append('<tr>' +
            '<td style="text-align: center;"></td>' +
            '<td>' +
            '<input type="text" onkeyup="AutosuggestItemName(this)" class="form-control txtItemName txtAutocomplete" onfocusout="PurchaseView.validation(this,' + PurchaseView.variables.ListId + ')" name="txtItemName' + PurchaseView.variables.ListId + '" id="txtItemName' + PurchaseView.variables.ListId + '">' +
            '</td>' +
            '<td>' +
            '<input  type="text" onkeyup="AutosuggestSubitemName(this)" class="form-control txtAutocomplete txtSubitemName" name="txtSubitemName' + PurchaseView.variables.ListId + '" id="txtSubitemName' + PurchaseView.variables.ListId + '">' +
            '</td>' +
            '<td>' +
            '<input  type="text" class="txtPcs form-control txtR number pcs required" onkeyup="PurchaseView.Calculation(this,' + PurchaseView.variables.ListId + ')" name="txtPcs' + PurchaseView.variables.ListId + '" id="txtPcs' + PurchaseView.variables.ListId + '">' +
            '</td>' +
            '<td>' +
            '<input disabled type="text" class="txtitemtype form-control txtR number pcs required"  name="txtitemtype' + PurchaseView.variables.ListId + '" id="txtitemtype' + PurchaseView.variables.ListId + '">' +
            '</td>' +

            '<td>' +
            '<select type="text" style="padding: 0;" class="form-control txtHsnCode" onchange="ValueChange(' + PurchaseView.variables.ListId + ')" name="HsnCode' + PurchaseView.variables.ListId + '" id="txtHsnCode' + PurchaseView.variables.ListId + '"></select>' +
            '</td>' +
            '<td>' +
            '<input disabled type="text" class="form-control txtR numbers grosswt fixed required txtRate" decimals="3" name="txtRate' + PurchaseView.variables.ListId + '" id="txtRate' + PurchaseView.variables.ListId + '">' +
            '</td>' +

            '<td>' +
            '<input disabled type="text" class="form-control txtR numbers grosswt fixed required txtAmount" decimals="3" name="txtAmount' + PurchaseView.variables.ListId + '" id="txtAmount' + PurchaseView.variables.ListId + '">' +
            '</td>' +

            '<td>' +
            '<input disabled type="text" class="form-control txtR numbers grosswt fixed required txtteaxAmount" decimals="3" name="txtteaxAmount' + PurchaseView.variables.ListId + '" id="txtteaxAmount' + PurchaseView.variables.ListId + '">' +
            '</td>' +

            '<td>' +
            '<input disabled type="text" class="form-control txtR numbers grosswt fixed required txtAmtTaxTotal" decimals="3" name="txtAmtTax' + PurchaseView.variables.ListId + '" id="txtAmtTax' + PurchaseView.variables.ListId + '">' +
            '</td>' +
            
            '<td class="btnRemove" id="btnRemove' + PurchaseView.variables.ListId + '">' +
            //'<div class="as_row_rmv" onclick="PurchaseView.RemoveRow(this)">' +
            //'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox = "0 0 24 24" fill = "none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19.9394L19.1153 20.1871C19.0164 21.7682 17.7053 23 16.1211 23H7.8789C6.29471 23 4.98356 21.7682 4.88474 20.1871L4.06055 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7V4ZM9 5H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V5ZM6.06445 7L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1191 20.0624L17.9355 7H6.06445Z" fill="#ad2c2c"></path></svg>' +
            //'</div>' +
            '<div>' +
            '<i class="icon-cancel-circle2" onclick="PurchaseView.RemoveRow(this)"></i>' +
            '</div>' +
            '</td>' +
            '</tr>');
        FixValue();
        HSNCode(PurchaseView.variables.ListId)
        if (PurchaseView.variables.AddNew != true) {
            $("#Quotationitem_tbody tr:last td:nth-child(2) input").focus();
        } else {
            PurchaseView.variables.AddNew = false;
        }

        //PurchaseView.TaxDropDown();
        PurchaseView.variables.ListId = PurchaseView.variables.ListId + 1;
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }

}
function makeFileXml(saveDiv) {
    try {
        var i = 1;
        var xmlsaveFiles = '';
        $(saveDiv).find('tr').each(function (key, obj) {
            xmlsaveFiles += '<DETAILS>';
            xmlsaveFiles += '<ITEMGROUPMASTERID>' + $(obj).find('.txtItemName').attr('itemgroupmasterid') + '</ITEMGROUPMASTERID>';
            xmlsaveFiles += '<ITEMID>' + $(obj).find('.txtSubitemName').attr('itemid') + '</ITEMID>';
            xmlsaveFiles += '<PCS>' + $(obj).find('.txtPcs').val() + '</PCS>';
            xmlsaveFiles += '<ITEMTYPE>' + $(obj).find('.txtitemtype').val() + '</ITEMTYPE>';
            xmlsaveFiles += '<HSNID>' + ($(obj).find('.txtHsnCode').val() || 0) + '</HSNID>';
            xmlsaveFiles += '<GST>' + ($(obj).find(".txtHsnCode").find('option:selected').attr('gst') || 0) + '</GST>';
            xmlsaveFiles += '<RATE>' + ($(obj).find('.txtRate').val() || 0) + '</RATE>';
            xmlsaveFiles += '<AMOUNT>' + ($(obj).find('.txtAmount').val() || 0) + '</AMOUNT>';
            xmlsaveFiles += '<TAXAMT>' + ($(obj).find('.txtteaxAmount').val() || 0) + '</TAXAMT>';
            xmlsaveFiles += '<AMTTAX>' + ($(obj).find('.txtAmtTaxTotal').val() || 0) + '</AMTTAX>';
            xmlsaveFiles += '</DETAILS>';
            i++;
        });
        return { xmlsaveFiles: xmlsaveFiles };
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
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
        ErrorDetails(e, PurchaseView.variables.File);
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
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: Todate });
        myfilter.rules.push({ field: "CITY", op: "eq", data: $("#ddlPartyBranch").val() });
        setTimeout(function () {
            if ($("#txtsearchbox").val().length > 1) {
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                
            }
            url = PurchaseView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
            PurchaseView.initializeJqgrid(url);
        }, 200);
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
}
function AllData() {
    try {
        if (!$("#txtToDate").val() && !$("#txtFromDate").val()) {
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "CITY", op: "eq", data: $("#ddlPartyBranch").val() });
            myfilter.rules.push({ field: "FROMDATE", op: "eq", data: $("#txtFromDate").val() }, { field: "TODATE", op: "eq", data: $("#txtToDate").val() });
            if ($("#txtsearchbox").val().length > 1) {
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                
            }
            url = PurchaseView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
            PurchaseView.initializeJqgrid(url);
        }
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
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

function CalculateBill_PaymentInfo() {

}

function Velidation() {


}

//-------------------------------------- Bank Detail Hide/Show --------------------------------------//
function BankDetail(id) {
    try {
        if (parseFloat($("#txtChequePayment").val()).toFixed(2) > 0) {
            if (!$("#txtBankAC").val()) {
                $("#BankDetailDiv").show();
                var i = +$("#txtOsPayment").attr('tabindex') + 1;
                var j = i + 1;
                $("#BankDetailDiv").html(' <legend class="text-semibold">Bank Detail</legend>' +
                    '<form class="form-horizontal col-md-12" id="FrmPaymentDetails" style="padding-right: 0;">' +
                    '<div class="form-group">' +
                    '<label class="control-label col-md-3">Bank A/C</label>' +
                    '<div class="col-md-9">' +
                    '<input type="text" tabindex="' + i + '" class="form-control" name="BankAC" id="txtBankAC">' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label class="control-label col-md-3">Cheque No</label>' +
                    '<div class="col-md-9">' +
                    '<div class="input-group">' +
                    '<input type="text" class="form-control txtAutocomplete" id="txtChequeNo" tabindex="' + j + '"  onkeyup="AutosuggestChequeNo(this)" />' +
                    '<span class="input-group-btn" style="left: 1px;" onmousedown="PrintCheque()">' +
                    '<button class="btn btn-default" type="button" id="PrintCheque" style="padding-bottom: 3px;"><i class="icon-printer2"></i></button>' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</form>');
                if (PurchaseView.variables.oper != 'edit' || $("#txtChequeNo").val() == '') {
                    var myfilter,
                        myfilter = { rules: [] };
                    myfilter.rules.push({ field: "PURCHASESEARCH", op: "eq", data: 'DefaultBank' });
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=CHEQUEBOOKMASTER_GET" + "&myfilters=" + JSON.stringify(myfilter);
                    $.ajax({
                        url: url,
                        type: "POST",
                        async: false,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                
                                var JsonObject = xml2json.parser(data);
                                if (JsonObject.serviceresponse.detailslist != undefined) {
                                   
                                    $("#txtBankAC").val(JsonObject.serviceresponse.detailslist.details.bankname);
                                    $("#hdnChequeId").val(JsonObject.serviceresponse.detailslist.details.chequemasterid);
                                    $("#hdnbankId").val(JsonObject.serviceresponse.detailslist.details.bankid);
                                    $("#hdnRPTFileName").val(JsonObject.serviceresponse.detailslist.details.rptfilename);
                                    $("#hdnChequebookid").val(JsonObject.serviceresponse.detailslist.details.chequebookdetailid);
                                    $("#txtChequeNo").val($(data).find('cheque').text());
                                }
                            }
                        }
                    });
                }
                if (PurchaseView.variables.oper == 'edit' && rowData['BANKID'] > 0) {
                    rowData = jQuery("#table_list_Purchase").getRowData(id);
                    $("#txtBankAC").val(rowData['BANKNAME']);
                    $("#hdnbankId").val(rowData['BANKID']);
                    $("#hdnRPTFileName").val(rowData['RPTFILENAME']);
                    $("#txtChequeNo").val(rowData['CHEQUENO']);
                }
                $("#txtBankAC").autocomplete({
                    source: function (request, response) {
                        var myfilter,
                            myfilter = { rules: [] };
                        myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtBankAC").val() });
                        var url = getDomain() + "/Common/BindMastersDetails?ServiceName=CHEQUEBOOKMASTER_GET" + "&myfilters=" + JSON.stringify(myfilter);
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
                                                        BankId: item.bankid,
                                                        ChequeMasterId: item.chequemasterid,
                                                        RPTName: item.rptfilename

                                                    }
                                                }
                                                else {
                                                    return {
                                                        label: item.bankname,
                                                        value: item.bankname,
                                                        BankId: item.bankid,
                                                        ChequeMasterId: item.chequemasterid,
                                                        RPTName: item.rptfilename
                                                    }
                                                }
                                            }))
                                    }
                                    else {
                                        if ($("#" + id).val().length <= 1) {
                                            $("#hdnChequeId").val('');
                                            $("#hdnbankId").val('');
                                            $("#hdnRPTFileName").val('');
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
                                        $("#hdnChequeId").val('');
                                        $("#hdnbankId").val('');
                                        $("#hdnRPTFileName").val('');
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
                            $("#hdnChequeId").val(ui.item.ChequeMasterId);
                            $("#hdnbankId").val(ui.item.BankId);
                            $("#hdnRPTFileName").val(ui.item.RPTName);

                            var myfilter,
                                myfilter = { rules: [] };
                            myfilter.rules.push({ field: "PURCHASESEARCH", op: "eq", data: 'SelectBank' });
                            myfilter.rules.push({ field: "BANKID", op: "eq", data: ui.item.BankId });
                            var url = getDomain() + "/Common/BindMastersDetails?ServiceName=CHEQUEBOOKMASTER_GET" + "&myfilters=" + JSON.stringify(myfilter);
                            $.ajax({
                                url: url,
                                type: "POST",
                                async: false,
                                cache: false,
                                success: function (data) {
                                    if ($(data).find('RESPONSECODE').text() == "0") {
                                        $("#txtChequeNo").val($(data).find('CHEQUENO').text());
                                        $("#hdnChequebookid").val($(data).find('CHEQUEBOOKDETAILID').text());
                                    } else {
                                        $("#txtChequeNo").val('');
                                        $("#hdnChequebookid").val('');
                                    }
                                }
                            });
                        } else {
                            setTimeout(function () {
                                $("#txtBankAC").val('');
                            }, 1)
                        }
                    },
                    change: function (event, ui) {
                        if (!ui.item) {
                            //$("#hdnChequeId").val('');
                            //$("#hdnbankId").val('');
                            //$("#hdnRPTFileName").val('');
                        }
                    },
                    focus: function (event, ui) {
                        //$("#hdnChequeId").val('');
                        //$("#hdnbankId").val('');
                        //$("#hdnRPTFileName").val('');
                    },
                    minLength: 1,
                    autoFocus: true
                });
            } else {
                $("#BankDetailDiv").show();
            }
        } else {
            $("#BankDetailDiv").hide();
        }

    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
}
function AutosuggestChequeNo(obj) {
    try {
        if ($('#hdnbankId').val() == '') {
            $("#txtBankAC").focus();
            return;
        }
        var id = $(obj).attr('id');
        $("#" + id).autocomplete({
            source: function (request, response) {
                var myfilter;
                myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#" + id).val() });
                myfilter.rules.push({ field: "BANKID", op: "eq", data: $('#hdnbankId').val() });
                var url = getDomain() + "/Common/BindMastersDetails?ServiceName=CHEQUE_LIST_GET&myfilters=" + JSON.stringify(myfilter);
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
                                                label: item.num.replace('-', ''),
                                                value: item.num.replace('-', '')
                                            }
                                        }
                                        else {
                                            return {
                                                label: item.num.replace('-', ''),
                                                value: item.num.replace('-', '')
                                            }
                                        }
                                    }))
                            }
                            else {
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
                            notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                        }
                    }
                })
            },
            messages: {
                noResults: "No Results Found"
            },
            select: function (event, ui) {
                if (ui.item.label == 'No Results Found') {
                    setTimeout(function () {
                        $("#" + id).val('');
                    }, 1)
                }
            },
            minLength: 1,
            autoFocus: true
        });
    } catch (e) {
        ErrorDetails(e, PurchaseView.variables.File);
    }
}
//-------------------------------------- /Bank Detail Hide/Show --------------------------------------//
