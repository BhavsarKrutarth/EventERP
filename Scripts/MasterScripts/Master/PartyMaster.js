var searchtxt = '';
var Partydetailview = {
    variables: {
        Partyid: "",
        Oper: "",
        ListId: 1,
        AddNew: true,
        File: "PartyMaster.js",
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=PARTYMASTER_GET",
        ISAddressCRUD: "/Common/OpeartionsOnMaster?ServiceName=PARTYMASTER_ISADDRESS_CRUD",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=PARTYMASTER_CRUD",
        BindCityUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        BindBalanceSheetGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        LaboureCodeUrl: "/Common/BindMastersDetails?ServiceName=LABOURMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        BindTDSCodeUrl: "/Common/BindMastersDetails?ServiceName=TDSMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        BindBankNameUrl: "/Common/BindMastersDetails?ServiceName=BANKMASTER_GET&IsRecordAll=true&ISACTIVE=1",
    },

    initializeJqgrid: function (url) {

        colNames = ['PartymasId', 'Party Name', 'Bs Group Name', 'Short Code', 'ReferenceById', 'Reference By Name', 'Reference Type', 'BALANCESHEETGROUPID', 'Party Image', 'PAN Image', 'Contact Person Name', 'Address', 'Address2',
            'Address3', 'Landmark Area', 'City Id', 'City', 'Suply City Id', 'Supply City', 'Pincode', 'Mobile', 'Mobile2', 'Master Type', 'Master Type', 'Phone No', 'Birth Date', 'Aniversory Date', 'Email Id', 'Website',
            'Adharcard No', 'Passport No', 'Pan No', 'TDS Deduct', 'Trading TDS', 'TDSCODEID', 'ISFORM60', 'GST No', 'Bank Name', 'Account No', 'Swift Code', 'Branch Name', 'BankAddress', 'Credit Days', 'Interest Value', 'Interest AccNo',
            'Account Limit', 'Labour Discount', 'Remark Other', 'LABOURRATE', 'ISRCM', 'CSTNO', 'PINNO', 'Is Address', 'Address'], /*'OtherAccType', 'TDSAccType', 'AccBankId'*/
            colModel = [
                { name: "PARTYMASTERID", index: "PARTYMASTERID", xmlmap: xmlvars.common_colmap + "PARTYMASTERID", sortable: false, search: false, hidden: true },
                { name: "PARTYNAME", index: "PARTYNAME", width: 20, xmlmap: xmlvars.common_colmap + "PARTYNAME", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                { name: "BSGROUPNAME", index: "BSGROUPNAME", width: 20, xmlmap: xmlvars.common_colmap + "BSGROUPNAME", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                { name: "SHORTCODE", index: "SHORTCODE", width: 10, xmlmap: xmlvars.common_colmap + "SHORTCODE", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                { name: "REFERENCEBYID", index: "REFERENCEBYID", xmlmap: xmlvars.common_colmap + "REFERENCEBYID", search: true, hidden: true },
                { name: "REFERENCEBYNAME", index: "REFERENCEBYNAME", width: 20, xmlmap: xmlvars.common_colmap + "REFERENCEBYNAME", search: false, hidden: true },
                { name: "REFERENCETYPE", index: "REFERENCETYPE", width: 10, xmlmap: xmlvars.common_colmap + "REFERENCETYPE", search: true, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                { name: "BALANCESHEETGROUPID", index: "BALANCESHEETGROUPID", xmlmap: xmlvars.common_colmap + "BALANCESHEETGROUPID", sortable: false, search: false, hidden: true },
                { name: "PARTYIMG", index: "PARTYIMG", xmlmap: xmlvars.common_colmap + "PARTYIMG", sortable: false, search: false, hidden: true },
                { name: "PANIMG", index: "PANIMG", xmlmap: xmlvars.common_colmap + "PANIMG", sortable: false, search: false, hidden: true },
                { name: "CONTACTPERSON", index: "CONTACTPERSON", xmlmap: xmlvars.common_colmap + "CONTACTPERSON", sortable: false, search: false, hidden: true },
                { name: "ADDRESS1", index: "ADDRESS1", xmlmap: xmlvars.common_colmap + "ADDRESS1", sortable: false, search: true, width: 20, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "ADDRESS2", index: "ADDRESS2", xmlmap: xmlvars.common_colmap + "ADDRESS2", sortable: false, search: true, hidden: true },
                { name: "ADDRESS3", index: "ADDRESS3", xmlmap: xmlvars.common_colmap + "ADDRESS3", sortable: false, search: true, hidden: true },
                { name: "LANDMARKAREA", index: "LANDMARKAREA", xmlmap: xmlvars.common_colmap + "LANDMARKAREA", sortable: false, search: true, hidden: true },
                { name: "CITYID", index: "CITYID", xmlmap: xmlvars.common_colmap + "CITYID", sortable: false, search: true, hidden: true },
                { name: "CITYNAME", index: "CITYNAME", xmlmap: xmlvars.common_colmap + "CITYNAME", sortable: false, width: 10, search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "SUPPLYCITYID", index: "SUPPLYCITYID", xmlmap: xmlvars.common_colmap + "SUPPLYCITYID", sortable: false, search: true, hidden: true },
                { name: "SUPPLYCITYNAME", index: "SUPPLYCITYNAME", xmlmap: xmlvars.common_colmap + "SUPPLYCITYNAME", sortable: false, search: true, hidden: true },
                { name: "PINCODE", index: "PINCODE", xmlmap: xmlvars.common_colmap + "PINCODE", sortable: false, search: false, hidden: true },
                { name: "MOBILE1", index: "MOBILE1", xmlmap: xmlvars.common_colmap + "MOBILE1", sortable: false, width: 10, search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption, classes: 'mobilenomask' },
                { name: "MOBILE2", index: "MOBILE2", xmlmap: xmlvars.common_colmap + "MOBILE2", sortable: false, hidden: true, search: false },
                { name: "MASTERTYPE", index: "MASTERTYPE", xmlmap: xmlvars.common_colmap + "MASTERTYPE", sortable: false, search: false, hidden: true },
                { name: "NEWMASTERTYPE", index: "NEWMASTERTYPE", width: 10, xmlmap: xmlvars.common_colmap + "NEWMASTERTYPE", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "PHONENO", index: "PHONENO", xmlmap: xmlvars.common_colmap + "PHONENO", sortable: false, search: true, hidden: true },
                { name: "BIRTHDATE", index: "BIRTHDATE", xmlmap: xmlvars.common_colmap + "BIRTHDATE", sortable: false, search: false, hidden: true },
                { name: "ANIVERSORYDATE", index: "ANIVERSORYDATE", xmlmap: xmlvars.common_colmap + "ANIVERSORYDATE", sortable: false, search: false, hidden: true },
                { name: "EMAILID", index: "EMAILID", xmlmap: xmlvars.common_colmap + "EMAILID", sortable: false, search: false, hidden: true },
                { name: "WEBSITE", index: "WEBSITE", xmlmap: xmlvars.common_colmap + "WEBSITE", sortable: false, search: false, hidden: true },
                { name: "ADHARCARDNO", index: "ADHARCARDNO", xmlmap: xmlvars.common_colmap + "ADHARCARDNO", sortable: false, search: false, hidden: true },
                { name: "PASSPORTNO", index: "PASSPORTNO", xmlmap: xmlvars.common_colmap + "PASSPORTNO", sortable: false, search: false, hidden: true },
                { name: "PANNO", index: "PANNO", xmlmap: xmlvars.common_colmap + "PANNO", sortable: false, search: true, hidden: true },
                { name: "ISTDSDEDUCT", index: "ISTDSDEDUCT", xmlmap: xmlvars.common_colmap + "ISTDSDEDUCT", sortable: false, search: false, hidden: true },
                { name: "TRADINGTDSCODEID", index: "TRADINGTDSCODEID", xmlmap: xmlvars.common_colmap + "TRADINGTDSCODEID", sortable: false, search: false, hidden: true },
                { name: "TDSCODEID", index: "TDSCODEID", xmlmap: xmlvars.common_colmap + "TDSCODEID", sortable: false, search: false, hidden: true },
                { name: "ISFORM60", index: "ISFORM60", xmlmap: xmlvars.common_colmap + "ISFORM60", sortable: false, search: false, hidden: true },
                { name: "GSTNO", index: "GSTNO", xmlmap: xmlvars.common_colmap + "GSTNO", sortable: false, search: false, hidden: true },
                { name: "BANKNAME", index: "BANKNAME", xmlmap: xmlvars.common_colmap + "BANKNAME", sortable: false, search: false, hidden: true },
                { name: "ACCOUNTNO", index: "ACCOUNTNO", xmlmap: xmlvars.common_colmap + "ACCOUNTNO", sortable: false, search: false, hidden: true },
                { name: "SWIFTCODE", index: "SWIFTCODE", xmlmap: xmlvars.common_colmap + "SWIFTCODE", sortable: false, search: false, hidden: true },
                { name: "BRANCHNAME", index: "BRANCHNAME", xmlmap: xmlvars.common_colmap + "BRANCHNAME", sortable: false, search: false, hidden: true },
                { name: "BANKADDRESS", index: "BANKADDRESS", xmlmap: xmlvars.common_colmap + "BANKADDRESS", sortable: false, search: false, hidden: true },
                { name: "CREDITDAYS", index: "CREDITDAYS", xmlmap: xmlvars.common_colmap + "CREDITDAYS", sortable: false, search: false, hidden: true },
                { name: "INTERESTVALUE", index: "INTERESTVALUE", xmlmap: xmlvars.common_colmap + "INTERESTVALUE", sortable: false, search: false, hidden: true },
                { name: "INTERESTACCNO", index: "INTERESTACCNO", xmlmap: xmlvars.common_colmap + "INTERESTACCNO", sortable: false, search: false, hidden: true },
                { name: "ACCOUNTLIMIT", index: "ACCOUNTLIMIT", xmlmap: xmlvars.common_colmap + "ACCOUNTLIMIT", sortable: false, search: false, hidden: true },
                { name: "LABOURDISCOUNT", index: "LABOURDISCOUNT", xmlmap: xmlvars.common_colmap + "LABOURDISCOUNT", sortable: false, search: false, hidden: true },
                { name: "REMARKOTHER", index: "REMARKOTHER", xmlmap: xmlvars.common_colmap + "REMARKOTHER", sortable: false, search: false, hidden: true },
                { name: "LABOURRATES", index: "LABOURRATES", xmlmap: xmlvars.common_colmap + "LABOURRATES", stype: 'xml', sortable: false, search: false, hidden: true },
                { name: "ISRCM", index: "ISRCM", xmlmap: xmlvars.common_colmap + "ISRCM", stype: 'xml', sortable: false, search: false, hidden: true },
                { name: "CSTNO", index: "CSTNO", xmlmap: xmlvars.common_colmap + "CSTNO", stype: 'xml', sortable: false, search: false, hidden: true },
                { name: "TINNO", index: "TINNO", xmlmap: xmlvars.common_colmap + "TINNO", stype: 'xml', sortable: false, search: false, hidden: true },
                { name: "ISADDRESS", width: 10, index: "ISADDRESS", xmlmap: xmlvars.common_colmap + "ISADDRESS", align: "center", stype: 'text', sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
                { name: "ISADDRESS1", hidden: true, index: "ISADDRESS1", xmlmap: xmlvars.common_colmap + "ISADDRESS", align: "center", stype: 'text' },
                //{ name: "OTHERACCTYPE", index: "OTHERACCTYPE", xmlmap: xmlvars.common_colmap + "OTHERACCTYPE", stype: 'xml', sortable: false, search: false, hidden: true },
                //{ name: "TDSACCTYPE", index: "TDSACCTYPE", xmlmap: xmlvars.common_colmap + "TDSACCTYPE", stype: 'xml', sortable: false, search: false, hidden: true },
                //{ name: "ACCBANKID", index: "ACCBANKID", xmlmap: xmlvars.common_colmap + "ACCBANKID", stype: 'xml', sortable: false, search: false, hidden: true },
            ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'Partydetailview', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'Partydetailview', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'Partydetailview') } });
        }
        //$("#table_list_Partydetail").GridUnload();
        $.jgrid.gridUnload("#table_list_Partydetail");
        $("#table_list_Partydetail").jqGrid({
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
            pager: "#pager_list_Partydetail",
            multiselect: false,
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "PARTYMASTERID"
            },
            loadComplete: function () {
                /*$('.mobilenomask').mask("0000000000");*/
                $("tr.jqgrow:even").addClass('myAltRowClass');

                setTimeout(function () {
                    var width = $('#jqgrid_Partydetail').width();
                    if (width <= 430) {
                        width = 1000;
                    }
                    $('#table_list_Partydetail').setGridWidth(width);
                }, 50);

                //$('#table_list_Partydetail').jqGrid('setSelection', $('#table_list_Partydetail').jqGrid('getDataIDs')[0]);
                jQuery("#table_list_Partydetail").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

                $.each($("#table_list_Partydetail").jqGrid('getRowData'), function (i, item) {
                    if (item.ADDRESS1 == "") {
                        $("#jqg_table_list_Partydetail_" + item.PARTYMASTERID).hide();
                    }
                });
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'PARTYMASTERID',
            sortorder: 'desc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    Partydetailview.triggerId(rowid, 'edit')
                }
            }
        });

        // JqGrid navigations shortcuts
        jQuery("#table_list_Partydetail").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                Partydetailview.triggerId(rowid, 'edit')
            }
        });

        // Setup buttons
        $("#table_list_Partydetail").jqGrid('navGrid', '#pager_list_Partydetail',
            { edit: false, add: false, del: false, search: false, refresh: true },
            { height: 320 }
        );
        $("#pager_list_Partydetail_left").css("width", "");
        AlignJqGridHeader('table_list_Partydetail', ['edit', 'act']);

    },

    triggerId: function (id, oper) {
        try {
            $("#LabourPer").hide();
            var rowData = jQuery("#table_list_Partydetail").getRowData(id);

            if (rowData['ADDRESS1'] != "") {
                $(".isaddress").show();
                if (rowData['ISADDRESS1'] == 1)
                    $("#chkaddress").iCheck('check');
                else
                    $("#chkaddress").iCheck('uncheck');
            }
            else {
                $(".isaddress").hide();
                $("#chkaddress").iCheck('uncheck');
            }

            if (rowData['ISTDSDEDUCT'] == "1") {
                $('#chkTDSDeduct').iCheck('check');
                $("#tdscode").show();
                $("#ddltdsaccountcode").val(rowData['TDSCODEID']);
            }
            else {
                $('#chkTDSDeduct').iCheck('uncheck');
                $("#tdscode").hide();
            }

            $("#ddlTradingTDSCode").val(rowData['TRADINGTDSCODEID']);

            if (rowData['ISFORM60'] == "1") {
                $('#chkIsForm60').iCheck('check');
            }
            else {
                $('#chkIsForm60').iCheck('uncheck');
            }

            if (rowData['ISRCM'] == "1") {
                $('#chkIsRcm').iCheck('check');
                $("#txtGSTno").removeClass('required');
            }
            else {
                $('#chkIsRcm').iCheck('uncheck');
                $("#txtGSTno").addClass('required');
            }

            //if (rowData['LABOURRATES']) {
            //    var JsonObject = xml2json.parser(rowData['LABOURRATES'].replace(/&gt;/g, '>').replace(/&lt;/g, '<'));
            //    if (JsonObject) {
            //        $("#LabourBody").html('');
            //        var list;
            //        if (JsonObject.itemdetails.length) {
            //            list = JsonObject.itemdetails;
            //        } else {
            //            list = JsonObject;
            //        }

            //        $.each(list, function (key, innerjsonDetails) {
            //            var id = Partydetailview.variables.ListId;
            //            if (innerjsonDetails.ratedetails.details.length) {
            //                list = innerjsonDetails.ratedetails.details;
            //                var data = '';
            //                $("#LabourBody").append('<tr id="RowItem' + id + '">' +
            //                    '<td style="text-align: center;"></td>' +
            //                    '<td>' +
            //                    '<input type="text" itemid="' + innerjsonDetails.itemid + '" value="' + innerjsonDetails.itemname + '" onkeyup="AutosuggestItemName(this)" class="form-control txtItemName required txtAutocomplete" name="txtItemName' + id + '" id="txtItemName' + id + '">' +
            //                    '</td>' +
            //                    '<td colspan=3>' +
            //                    '<table style="width:100%">' +
            //                    '<tbody class="CategoryBody" id="CategoryBody' + id + '" itemgrouptype = "' + innerjsonDetails.itemgrouptype + '">' +
            //                    '</tbody>' +
            //                    '</table>' +
            //                    '</td>' +
            //                    '<td class="btnRemove">' +
            //                    '<div>' +
            //                    '<i class="icon-cancel-circle2" onclick="Partydetailview.RemoveRow(this)"></i>' +
            //                    '</div>' +
            //                    '</td>' +
            //                    '</tr>');
            //                Partydetailview.variables.ListId = id + 1;
            //                var tempid = id;
            //                $.each(list, function (key, innerjsonDetails1) {
            //                    id = Partydetailview.variables.ListId;
            //                    $('#CategoryBody' + tempid).append('<tr id="RowItem' + innerjsonDetails1.categoryid + '">' +
            //                        '<td style="text-align: center;"></td>' +
            //                        '<td>' +
            //                        '<input type="text"  value="' + innerjsonDetails1.categoryname + '" class="form-control txtItemName required txtAutocomplete" disabled>' +
            //                        '</td>' +
            //                        '<td>' +
            //                        '<input type="number" value="' + innerjsonDetails1.purchaserate + '" class="form-control PurchaseRate" name="PurchaseRate' + id + '" id="PurchaseRate' + id + '">' +
            //                        '</td>' +
            //                        '<td>' +
            //                        '<select class="form-control SalesRate" onchange="Partydetailview.AddNewLine()" name="SalesRate' + id + '" id="SalesRate' + id + '">' +
            //                        $("#hdnMasterLabourCodes").html() +
            //                        '</select>' +
            //                        '</td>' +
            //                        //'<td>' +
            //                        //'<input type="number" value="' + innerjsonDetails1.wastage + '" class="form-control Wastage" name="Wastage' + id + '" id="Wastage' + id + '"/>' +
            //                        //'</td>' +
            //                        '</tr>');
            //                    $('#SalesRate' + id).val(innerjsonDetails1.salesrate);
            //                    $('#PurchaseRate' + id).val(innerjsonDetails1.purchaserate);
            //                    Partydetailview.variables.ListId = id + 1;
            //                });
            //            }
            //            else {
            //                if (innerjsonDetails.ratedetails.details.categoryid) {
            //                    $("#LabourBody").append('<tr id="RowItem' + innerjsonDetails.itemid + '">' +
            //                        '<td style="text-align: center;"></td>' +
            //                        '<td>' +
            //                        '<input type="text" itemid="' + innerjsonDetails.itemid + '" value="' + innerjsonDetails.itemname + '" onkeyup="AutosuggestItemName(this)" class="form-control txtItemName required txtAutocomplete" name="txtItemName' + innerjsonDetails.itemid + '" id="txtItemName' + innerjsonDetails.itemid + '">' +
            //                        '</td>' +
            //                        '<td colspan=3>' +
            //                        '<table style="width:100%">' +
            //                        '<tbody class="CategoryBody" id="CategoryBody' + innerjsonDetails.itemid + '" itemgrouptype = "' + innerjsonDetails.itemgrouptype + '">' +
            //                        '<tr id="RowItem' + innerjsonDetails.ratedetails.details.categoryid + '">' +
            //                        '<td style="text-align: center;"></td>' +
            //                        '<td>' +
            //                        '<input type="text"  value="' + innerjsonDetails.ratedetails.details.itemcategoryname + '" class="form-control txtItemName required txtAutocomplete" disabled>' +
            //                        '</td>' +
            //                        '<td>' +
            //                        '<input type="number" value="' + innerjsonDetails.ratedetails.details.purchaserate + '" class="form-control PurchaseRate" name="PurchaseRate' + id + '" id="PurchaseRate' + id + '"/>' +
            //                        '</td>' +
            //                        '<td>' +
            //                        '<select class="form-control SalesRate" onchange="Partydetailview.AddNewLine()" name="SalesRate' + id + '" id="SalesRate' + id + '">' +
            //                        $("#hdnMasterLabourCodes").html() +
            //                        '</select>' +
            //                        '</td>' +
            //                        //'<td>' +
            //                        //'<input type="number" value="' + innerjsonDetails.ratedetails.details.wastage + '" class="form-control Wastage" name="Wastage' + id + '' + innerjsonDetails1.categoryid + '" id="Wastage' + id + '"/>' +
            //                        //'</td>' +
            //                        '</tr>' +
            //                        '</tbody>' +
            //                        '</table>' +
            //                        '</td>' +
            //                        '<td class="btnRemove">' +
            //                        '<div>' +
            //                        '<i class="icon-cancel-circle2" onclick="Partydetailview.RemoveRow(this)"></i>' +
            //                        '</div>' +
            //                        '</td>' +
            //                        '</tr>');
            //                    $('#SalesRate' + id).val(innerjsonDetails.ratedetails.details.salesrate);
            //                    $('#PurchaseRate' + id).val(innerjsonDetails.ratedetails.details.purchaserate);
            //                }
            //                else {
            //                    $("#LabourBody").append('<tr id="RowItem' + innerjsonDetails.itemid + '">' +
            //                        '<td style="text-align: center;"></td>' +
            //                        '<td>' +
            //                        '<input type="text" itemid="' + innerjsonDetails.itemid + '" value="' + innerjsonDetails.itemname + '" onkeyup="AutosuggestItemName(this)" class="form-control txtItemName required txtAutocomplete" name="txtItemName' + id + '" id="txtItemName' + id + '">' +
            //                        '</td>' +
            //                        '<td colspan=3>' +
            //                        '<table style="width:100%">' +
            //                        '<tbody class="CategoryBody" id="CategoryBody' + id + '" itemgrouptype = "' + innerjsonDetails.itemgrouptype + '">' +
            //                        '<tr itemid="' + innerjsonDetails.itemid + '" id="RowItem' + id + '">' +
            //                        '<td style="text-align: center;"></td>' +
            //                        '<td><input type="text" class="form-control" autocomplete="new" disabled></td>' +
            //                        '<td>' +
            //                        '<input type="number" value="' + innerjsonDetails.ratedetails.details.purchaserate + '" class="form-control PurchaseRate" name="PurchaseRate' + id + '" id="PurchaseRate' + id + '"/>' +
            //                        '</td>' +
            //                        '<td>' +
            //                        '<select class="form-control SalesRate" onchange="Partydetailview.AddNewLine()" name="SalesRate' + id + '" id="SalesRate' + id + '">' +
            //                        $("#hdnMasterLabourCodes").html() +
            //                        '</select>' +
            //                        '</td>' +
            //                        //'<td>' +
            //                        //'<input type="number"  value="' + innerjsonDetails.ratedetails.details.wastage + '" class="form-control Wastage" name="Wastage' + id + '" id="Wastage' + id + '"/>' +
            //                        //'</td>' +
            //                        '</tr>' +
            //                        '</tbody>' +
            //                        '</table>' +
            //                        '</td>' +
            //                        '<td class="btnRemove">' +
            //                        '<div>' +
            //                        '<i class="icon-cancel-circle2" onclick="Partydetailview.RemoveRow(this)"></i>' +
            //                        '</div>' +
            //                        '</td>' +
            //                        '</tr>');
            //                    $('#SalesRate' + id).val(innerjsonDetails.ratedetails.details.salesrate);
            //                    $('#PurchaseRate' + id).val(innerjsonDetails.ratedetails.details.purchaserate);
            //                }
            //                Partydetailview.variables.ListId = id + 1;
            //            }
            //            FixValue();
            //            if (Partydetailview.variables.AddNew != true) {
            //                $("#LabourBody tr:last td:nth-child(2) input").focus();
            //            } else {
            //                Partydetailview.variables.AddNew = false;
            //            }
            //            //Partydetailview.variables.ListId = id + 1;
            //        });
            //    }
            //    else {
            //        $("#LabourBody").html('');
            //        ItemAddNewRowModal();
            //    }
            //}
            //else {
            //    $("#LabourBody").html('');
            //    ItemAddNewRowModal();
            //}

            $("#hdnpartymasterid").val(rowData['PARTYMASTERID'])
            $("#txt_partyname").val(rowData['PARTYNAME']);
            $("#txtshortcode").val(rowData['SHORTCODE']);
            $("#txt_RefBy").val(rowData['REFERENCEBYNAME']);
            $("#ddlBalnceSheetGroup").val(rowData['BALANCESHEETGROUPID']);
            $("#ddlmastertype").val(rowData['MASTERTYPE']);

            if (rowData['MASTERTYPE'] == "OtherAccountMaster") {
                $(".removerequired").hide();
                $(".re_equired").removeClass("required");
            }
            else {
                $(".removerequired").show();
                $(".re_equired").addClass("required");
            }

            if (rowData['PARTYIMG']) {
                $('#imgAccount').attr('src', getDomain() + "/UploadFiles/PartyMaster/" + rowData['PARTYIMG']);
            } else {
                $('#imgAccount').attr('src', getDomain() + "/Content/assets/images/default-user.png");
            }
            if (rowData['PANIMG']) {
                $('#imgPan').attr('src', getDomain() + "/UploadFiles/PartyMaster/" + rowData['PANIMG']);
            } else {
                $('#imgPan').attr('src', getDomain() + "/Content/assets/PANCARD.png");
            }
            $('#hdnpartyimg').val("/UploadFiles/PartyMaster/" + rowData['PARTYIMG']);
            $('#hdnPanimg').val("/UploadFiles/PartyMaster/" + rowData['PANIMG']);
            $("#txtcontactname").val(rowData['CONTACTPERSON']);
            $("#txtaddress1").val(rowData['ADDRESS1']);
            $("#txtaddress2").val(rowData['ADDRESS2']);
            $("#txtaddress3").val(rowData['ADDRESS3']);
            $("#txtLandmarkArea").val(rowData['LANDMARKAREA']);

            $("#ddlCity").attr('cityid', rowData["CITYID"]);
            $('#ddlCity').val(rowData["CITYNAME"]);
            //$("#OtherAccType").val(rowData["OTHERACCTYPE"]);
            //$("#txtTDSType").val(rowData["TDSACCTYPE"]);
            //$("#ddlBankName").val(rowData["ACCBANKID"]);

            //if ($("#OtherAccType").val() == "Bank") {
            //    $(".showBank").show();
            //    $(".showTDS").hide();
            //} else if ($("#OtherAccType").val() == "TDS") {
            //    $(".showBank").hide();
            //    $(".showTDS").show();
            //} else {
            //    $(".showBank").hide();
            //    $(".showTDS").hide();
            //}

            $("#ddlSupplyCity").attr('cityid', rowData["SUPPLYCITYID"]);
            $('#ddlSupplyCity').val(rowData["SUPPLYCITYNAME"]);
            $("#txtpincode").val(rowData['PINCODE']);
            $("#txtmobileno1").val(rowData['MOBILE1']);
            $("#txtmobileno2").val(rowData['MOBILE2']);
            $("#txtphonenum").val(rowData['PHONENO']);
            var BIRTHDATE = (rowData['BIRTHDATE']).split('/');
            $("#txtbirthdate").val(BIRTHDATE[2] + '-' + BIRTHDATE[1] + '-' + BIRTHDATE[0]);
            var ANIVERSORYDATE = (rowData['ANIVERSORYDATE']).split('/');
            $("#txtanniversarydate").val(ANIVERSORYDATE[2] + '-' + ANIVERSORYDATE[1] + '-' + ANIVERSORYDATE[0]);
            $("#txtemail").val(rowData['EMAILID']);
            $("#txtwebsite").val(rowData['WEBSITE']);
            $("#txtadharcardno").val(rowData['ADHARCARDNO']);
            $("#txtpassportno").val(rowData['PASSPORTNO']);
            $("#txtpanno").val(rowData['PANNO']);
            $("#txtGSTno").val(rowData['GSTNO']);
            $("#txtCSTNo").val(rowData['CSTNO']);
            $("#txtTINNo").val(rowData['TINNO']);
            $("#txtbankname").val(rowData['BANKNAME']);
            if (rowData['ACCOUNTNO'].toString() != '[object Object]')
                $("#txtbankacno").val(rowData['ACCOUNTNO']);
            if (rowData['SWIFTCODE'].toString() != '[object Object]')
                $("#txtswiftcode").val(rowData['SWIFTCODE']);
            if (rowData['BRANCHNAME'].toString() != '[object Object]')
                $("#txtbranchnamebank").val(rowData['BRANCHNAME']);
            if (rowData['BANKADDRESS'].toString() != '[object Object]')
                $("#txtbankinfoaddress").val(rowData['BANKADDRESS']);
            $("#txtcreditdays").val(rowData['CREDITDAYS']);
            $("#txtinterestvalue").val(rowData['INTERESTVALUE']);
            if (rowData['INTERESTACCNO'].toString() != '[object Object]')
                $("#txtinterestacc").val(rowData['INTERESTACCNO']);
            $("#txtaccountlimit").val(rowData['ACCOUNTLIMIT']);
            $("#txtlabourdiscount").val(rowData['LABOURDISCOUNT']);
            if (rowData['REMARKOTHER'].toString() != '[object Object]')
                $("#txtRemarks").val(rowData['REMARKOTHER']);

            $('.pannomask').mask("SSSSS0000S");
            $('.gstnomask').mask("00SSSSS0000SAzA");
            $('.adhaarnomask').mask("0000 0000 0000");
            $('.pincodemask').mask("000000");
            /*$('.mobilenomask').mask("0000000000");*/
            $("#divaccid").show();
            $('#panelEdit').modal('show');
            $("#btndelete").show();
            setTimeout(function () { NewFocus(); }, 200)
        }
        catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#formacc").valid();
            var ItemName = $(".txtItemName");
            var i = 1;
            if ($("#LabourBody tr").length > 1) {
                for (i; ItemName.length > i; i++) {
                    if ($("#" + ItemName[i].id).val() == '') {
                        $(ItemName[i]).parent().parent().remove();
                    }
                }
            }

            if (!isValid)
                return;
            Partydetailview.variables.Oper = 'Add';
            Partydetailview.variables.addedit = "added";
            Partydetailview.variables.Partyid = $("#hdnpartymasterid").val();

            if (Partydetailview.variables.Partyid != "0" && parseInt(Partydetailview.variables.Partyid) > 0) {
                Partydetailview.variables.Oper = 'Edit';
                Partydetailview.variables.addedit = 'updated';
            }
            var tdsdeduct = '0', IsForm60 = '0', IsRCM = '0';
            if ($('#chkTDSDeduct').is(":checked")) {
                tdsdeduct = '1'
            }
            if ($('#chkIsForm60').is(":checked")) {
                IsForm60 = '1'
            }
            if ($('#chkIsRcm').is(":checked")) {
                IsRCM = '1'
            }
            var data = {
                "oper": Partydetailview.variables.Oper,
                "PARTYNAME": $("#txt_partyname").val(),
                "BALANCESHEETGROUPID": $("#ddlBalnceSheetGroup").val(),
                //"MASTERTYPE": $("#ddlmastertype").val(),
                "CITYID": $("#ddlCity").attr('cityid'),
                "SUPPLYCITYID": $("#ddlSupplyCity").attr('cityid'),
                "MOBILE1": $("#txtmobileno1").val().replace('-', ''),
                "ISTDSDEDUCT": tdsdeduct,
                "ISFORM60": IsForm60,
                "ISRCM": IsRCM,
                "BANKNAME": $("#txtBankName").val(),
                "ACCOUNTNO": $("#txtbankacno").val(),
                "SWIFTCODE": $("#txtswiftcode").val(),
                "BRANCHNAME": $("#txtbranchnamebank").val(),
                "BANKADDRESS": $("#txtbankinfoaddress").val(),
                "CREDITDAYS": $("#txtcreditdays").val(),
                "INTERESTVALUE": $("#txtinterestvalue").val() || 0,
                "INTERESTACCNO": $("#txtinterestacc").val(),
                "ACCOUNTLIMIT": $("#txtaccountlimit").val() || 0,
                "LABOURDISCOUNT": $("#txtlabourdiscount").val() || 0,
                "REMARKOTHER": $("#txtRemarks").val(),
                //"OTHERACCTYPE": $("#OtherAccType").val(),
                //"TDSACCTYPE": $("#txtTDSType").val(),
                //"ACCBANKID": $("#ddlBankName").val()
            };

            if ($("#txtaddress1").val() == "") {
                data.ISADDRESS = 0;
            }
            else {
                data.ISADDRESS = (($('#chkaddress').prop("checked") == true) ? 1 : 0);
            }

            var xmlsaveFiles = "<LABOURRATE>";
            var resultXml = makeFileXml('#LabourBody');
            if (resultXml.xmlsaveFiles != '') {
                xmlsaveFiles += resultXml.xmlsaveFiles;
                xmlsaveFiles += "</LABOURRATE>";
                data.XMLPARAM = escape(xmlsaveFiles)
            }

            if (Partydetailview.variables.Partyid) {
                data.PARTYMASTERID = Partydetailview.variables.Partyid;
            }

            if (Partydetailview.variables.Oper == 'Add') {
                data.MASTERTYPE = $("#ddlmastertype").val()
            }
            else if (Partydetailview.variables.Oper == 'Edit') {
                if ($("#UserGroupName").val() == "Administrator") {
                    data.MASTERTYPE = $("#ddlmastertype").val()
                }
            }

            $("#txtpincode").val() ? data.PINCODE = $("#txtpincode").val() : "";
            $("#ddltdsaccountcode").val() ? data.TDSCODEID = $("#ddltdsaccountcode").val() : "";
            $("#ddlTradingTDSCode").val() ? data.TRADINGTDSCODEID = $("#ddlTradingTDSCode").val() : "";
            $("#txtshortcode").val() ? data.SHORTCODE = $("#txtshortcode").val() : "";
            $("#txtcontactname").val() ? data.CONTACTPERSON = $("#txtcontactname").val() : "";
            $("#txtmobileno2").val() ? data.MOBILE2 = $("#txtmobileno2").val().replace('-', '') : "";
            $("#txtphonenum").val() ? data.PHONENO = $("#txtphonenum").val() : "";
            $("#txtbirthdate").val() ? data.BIRTHDATE = $("#txtbirthdate").val() : "";
            $("#txtanniversarydate").val() ? data.ANIVERSORYDATE = $("#txtanniversarydate").val() : "";
            $("#txtemail").val() ? data.EMAILID = $("#txtemail").val() : "";
            $("#txtwebsite").val() ? data.WEBSITE = $("#txtwebsite").val() : "";
            $("#txtGSTno").val() ? data.GSTNO = $("#txtGSTno").val() : "";
            $("#txtCSTNo").val() ? data.CSTNO = $("#txtCSTNo").val() : "";
            $("#txtTINNo").val() ? data.TINNO = $("#txtTINNo").val() : "";
            $("#txtpanno").val() ? data.PANNO = $("#txtpanno").val() : "";
            $("#txtadharcardno").val() ? data.ADHARCARDNO = $("#txtadharcardno").val() : "";
            $("#txtpassportno").val() ? data.PASSPORTNO = $("#txtpassportno").val() : "";
            $("#txtaddress1").val() ? data.ADDRESS1 = capitalize($("#txtaddress1").val()) : "";
            $("#txtaddress2").val() ? data.ADDRESS2 = capitalize($("#txtaddress2").val()) : "";
            $("#txtaddress3").val() ? data.ADDRESS3 = capitalize($("#txtaddress3").val()) : "";
            $("#txtPhone").val() ? data.PHONENO = $("#txtPhone").val() : "";

            data.REFERENCEBYID = $("#txt_RefBy").val();
            //$("#ddlType").val() ? data.REFERENCETYPE = $("#ddlType").val() : "";
            Partydetailview.savedata(data, Partydetailview.variables.Oper);
        }
        catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    savedata: function (data, oper) {
        try {
            var originalAccountimg = '';
            var newAccountimg = '';
            var originalPanimg = '';
            var newPanimg = '';
            var foldername = 'PartyMaster';

            if ($("#imgAccount").attr('src') != getDomain() + "/Content/assets/images/default-user.png") {
                if (oper == 'Delete') {
                    originalAccountimg = $('#hdnpartyimg').val();
                    newAccountimg = $("#imgAccount").val();
                }
                else {
                    originalAccountimg = $('#hdnpartyimg').val();
                    newAccountimg = $('#imgAccount').attr('src');
                }
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveSingleImage",
                    data: { originalfile: originalAccountimg, newfile: newAccountimg, oper: Partydetailview.variables.Oper, isResize: false, module: foldername },
                    success: function (result) {
                        data.PARTYIMG = result;
                    },
                });
            }

            if ($("#imgPan").attr('src') != getDomain() + "/Content/assets/PANCARD.png") {
                if (oper == 'Delete') {
                    originalPanimg = $("#hdnPanimg").val();
                    newPanimg = $("#imgPan").val();
                }
                else {
                    originalPanimg = $("#hdnPanimg").val();
                    newPanimg = $("#imgPan").attr('src');
                }
                $.ajax({
                    type: 'POST',
                    async: false,
                    cache: false,
                    url: getDomain() + "/Common/SaveSingleImage",
                    data: { originalfile: originalPanimg, newfile: newPanimg, oper: Partydetailview.variables.Oper, isResize: false, module: foldername },
                    success: function (result) {
                        data.PANIMG = result;
                    },
                    error: OnError
                });
            }

            $.ajax({
                url: getDomain() + Partydetailview.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: Partydetailview.btnMasterSubmitOnSuccess,
                error: OnError,
            });
        }
        catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if ($(data).find('RESPONSECODE').text() == "0") {
                if (Partydetailview.variables.Oper == 'Delete') {
                    OperationMessage("", 'Party detail deleted successfully', 'success');
                    $('#btnDeletePartyMaster').attr('disabled', false);
                } else {
                    OperationMessage("", 'Party detail saved successfully', 'success');
                }
                $('#Modal_PartyMasterDelete').modal("hide");
                Partydetailview.ClearValues();
                $('#panelEdit').modal('hide');
                $("#table_list_Partydetail").trigger("reloadGrid", [{
                    current: true
                }]);
                //if ($("#hdnCommonPartyId").val()) {
                //    $("#hdnCommonNewPartyId").val($("#hdnCommonPartyId").val());
                //    $("#hdnCommonPartyId").val('');
                //    $("#idPartyMaster i").click()
                //} else if ($("#hdnCommonNewParty").val() == '1') {
                //    if ($("#hdnCommonPreviousActiveId").val() != '') {
                //        $("#hdnCommonNewPartyId").val($(data).find('PARTYID').text());
                //        $("#idPartyMaster i").click()
                //    }
                //}
            }
            else {
                InvalidResponseCode(data);
            }
        }
        catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            Partydetailview.variables.addedit = "deleted";
            Partydetailview.variables.Oper = "Delete";
            var rowData = jQuery("#table_list_Partydetail").getRowData(id);
            $("#dellblpartyname").html(rowData['PARTYNAME']);
            $("#dellblpartycode").html(rowData['SHORTCODE']);
            $("#hdnpartymasterid").val(id);

            $('#Modal_PartyMasterDelete').modal("show");
        }
        catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            $('#btnDeletePartyMaster').attr('disabled', true);
            var data = {
                "oper": Partydetailview.variables.Oper,
                "PARTYMASTERID": $("#hdnpartymasterid").val()
            }
            Partydetailview.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    ClearValues: function () {
        $("#chkisAddress").prop("checked", false);
        $("#chkaddress").iCheck('uncheck');
        $(".isaddress").hide();
        $(".removerequired").show();
        $(".re_equired").addClass("required");

        Partydetailview.variables.ListId = 1;
        $("#divaccid").hide();
        $("#formacc").validate().resetForm();
        $("#hdnpartymasterid").val("");
        $("#txt_partyname").val("");
        //$("#txt_partycode").val("");
        $("#txt_RefBy").val("");
        $("#ddlBalnceSheetGroup").val("");
        //$("#ddlType").val("");
        $("#ddlmastertype").val("PartyMaster");
        //$("#txtaccname").val("");
        $("#txtshortcode").val("");
        //$("#txtcustcardno").val("");
        //$("#ddlcustomertype").val("");
        //$("#ddlcategory").val("");
        $("#txtcontactname").val("");
        $("#txtaddress1").val("");
        $("#txtaddress2").val("");
        $("#txtaddress3").val("");
        $("#txtLandmarkArea").val("");
        $("#txtpincode").val("");
        $("#txtmobileno1").val("");
        $("#txtmobileno2").val("");
        $("#txtphonenum").val("");
        $("#txtreferncebox").val("");
        $("#txtbirthdate").val("");
        $("#txtanniversarydate").val("");
        $("#txtemail").val("");
        $("#txtwebsite").val("");
        $("#txtadharcardno").val("");
        $("#txtpassportno").val("");
        $("#txtpanno").val("");
        //$("#txtexciseregno").val(""),
        //$("#txttinno").val(""),
        $("#txtGSTno").val("");
        //$("#txtCSTno").val(""),
        $('#chkIsRcm').iCheck('uncheck');
        $("#txtbankname").val("");
        $("#txtbankacno").val("");
        $("#txtswiftcode").val("");
        $("#txtbranchnamebank").val("");
        $("#txtbankinfoaddress").val("");
        $("#txtcreditdays").val("");
        $("#txtinterestvalue").val("");
        $("#txtinterestacc").val("");
        $("#txtaccountlimit").val("");
        $("#txtlabourdiscount").val("");
        $("#txtRemarks").val("");
        $("#txtTDSType").val("");
        $("#ddlBankName").val("");
        $('#chkDNDActive').prop('checked', true);
        $('#chkTDSDeduct').iCheck('uncheck');
        $('#chkBillNotAccept').prop('checked', true);
        $('#chkActive').prop('checked', true);
        $("#imgAccount").attr("src", getDomain() + '/Content/assets/images/default-user.png');
        $("#imgPan").attr("src", getDomain() + '/Content/assets/PANCARD.png');
        $("#hdnpartyimg").val("");
        $("#hdnPanimg").val("");
        $("#ddlCity").attr('cityid', '');
        $("#ddlCity").val("");
        $("#ddlSupplyCity").attr('cityid', '');
        $("#ddlSupplyCity").val("");
        $('#SameData').iCheck('uncheck');
        Partydetailview.variables.AddNew = true;
    },

    bindBalanceSheetGroup: function () {
        $("#ddlBalnceSheetGroup").html("");
        BindDropdown('ddlBalnceSheetGroup', 'BalnceSheetGroupList', getDomain() + Partydetailview.variables.BindBalanceSheetGroupUrl, '-- Balance Sheet Group --');
    },

    bindLabourCode: function (id) {
        $("#" + id).html("");
        BindDropdown(id, 'LabourCodeList', getDomain() + Partydetailview.variables.LaboureCodeUrl, '-- Select Labour Code --');
    },

    bindTDSCode: function () {
        $("#ddltdsaccountcode").html("");
        BindDropdown('ddltdsaccountcode', 'TDSCodeList', getDomain() + Partydetailview.variables.BindTDSCodeUrl, '-- TDS Code --');
        var list = $("#ddltdsaccountcode option");
        $.each(list, function (key, details) {
            if (details.attributes.tradingtds) {
                if (details.attributes.tradingtds.value == 1) {
                    $('#ddltdsaccountcode option[value=' + details.value + ']').remove();
                }
            }
            //else {
            //    if (details.value)
            //        $('#ddlTradingTDSCode option[value=' + details.value + ']').remove();
            //}
        });
    },

    bindTradingTDSCode: function () {
        $("#ddlTradingTDSCode").html("");
        BindDropdown('ddlTradingTDSCode', 'TradingTDSCodeList', getDomain() + Partydetailview.variables.BindTDSCodeUrl, '-- Trading TDS Code --');
        var list = $("#ddlTradingTDSCode option")
        $.each(list, function (key, details) {
            if (details.attributes.tradingtds) {
                if (details.attributes.tradingtds.value == '') {
                    $('#ddlTradingTDSCode option[value=' + details.value + ']').remove();
                }
            } else {
                if (details.value)
                    $('#ddlTradingTDSCode option[value=' + details.value + ']').remove();
            }
        });
    },

    OnChangeGST: function () {
        $("#txtpanno").val($("#txtGSTno").val().substring(2, 12));
    },

    AutosuggestBankName: function () {
        try {
            $("#txtBankName").autocomplete({
                source: function (request, response) {
                    var myfilter,
                        myfilter = {
                            rules: []
                        };
                    myfilter.rules.push({ field: "COMMONMASTERDETAILNAME", op: "eq", data: $("#txtBankName").val() });
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
                            }
                        }
                    })
                },
                messages: {
                    noResults: "No Results Found"
                },
                select: function (event, ui) {

                },
                change: function (event, ui) {

                },
                focus: function (event, ui) {

                },
                minLength: 1,
                autoFocus: true
            });
        } catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    GetPartyDetails: function (id) {
        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({
            field: "ACCOUNTID", op: "eq", data: id
        });
        var url = getDomain() + Partydetailview.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
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

                        if (List.istdsdeduct == "1") {
                            $('#chkTDSDeduct').iCheck('check');
                            $("#tdscode").show();
                            $("#ddltdsaccountcode").val(List.tdscodeid);
                        }
                        else {
                            $('#chkTDSDeduct').iCheck('uncheck');
                            $("#tdscode").hide();
                        }

                        $("#ddlTradingTDSCode").val(List.tradingtdscodeid);

                        if (List.isform60 == "1") {
                            $('#chkIsForm60').iCheck('check');
                        }
                        else {
                            $('#chkIsForm60').iCheck('uncheck');
                        }

                        if (List.isrcm == "1") {
                            $('#chkIsRcm').iCheck('check');
                        }
                        else {
                            $('#chkIsRcm').iCheck('uncheck');
                        }

                        $("#hdnpartymasterid").val(List.partymasterid)
                        $("#txt_partyname").val(List.partyname);
                        $("#txtshortcode").val(List.shortcode);
                        $("#txt_RefBy").val(List.referencebyname);
                        //$("#txt_RefBy").attr('ReferenceById', List.referencebyid);
                        $("#ddlBalnceSheetGroup").val(List.balancesheetgroupid);
                        $("#ddlType").val(List.referencetype);
                        $("#ddlmastertype").val(List.mastertype);
                        if (List.partyimg) {
                            $('#imgAccount').attr('src', getDomain() + "/UploadFiles/PartyMaster/" + List.partyimg);
                        } else {
                            $('#imgAccount').attr('src', getDomain() + "/Content/assets/images/default-user.png");
                        }
                        if (List.panimg) {
                            $('#imgPan').attr('src', getDomain() + "/UploadFiles/PartyMaster/" + List.panimg);
                        } else {
                            $('#imgPan').attr('src', getDomain() + "/Content/assets/PANCARD.png");
                        }
                        $('#hdnpartyimg').val("/UploadFiles/PartyMaster/" + List.partyimg);
                        $('#hdnPanimg').val("/UploadFiles/PartyMaster/" + List.panimg);
                        $("#txtcontactname").val(List.contactperson);
                        $("#txtaddress1").val(List.address1);
                        $("#txtaddress2").val(List.address2);
                        $("#txtaddress3").val(List.address3);
                        $("#txtLandmarkArea").val(List.landmarkarea);
                        $("#ddlCity").attr('cityid', List.cityid);
                        $('#ddlCity').val(List.cityname);
                        $("#ddlSupplyCity").attr('cityid', List.supplycityid);
                        $('#ddlSupplyCity').val(List.supplycityname);
                        $("#txtpincode").val(List.pincode);
                        $("#txtmobileno1").val(List.mobile1);
                        $("#txtmobileno2").val(List.mobile2);
                        $("#txtphonenum").val(List.phoneno);
                        if (List.birthdate) {
                            var BIRTHDATE = (List.birthdate).split('/');
                            $("#txtbirthdate").val(BIRTHDATE[2] + '-' + BIRTHDATE[1] + '-' + BIRTHDATE[0]);
                        }

                        if (List.aniversorydate) {
                            var ANIVERSORYDATE = (List.aniversorydate).split('/');
                            $("#txtanniversarydate").val(ANIVERSORYDATE[2] + '-' + ANIVERSORYDATE[1] + '-' + ANIVERSORYDATE[0]);
                        }

                        $("#txtemail").val(List.emailid);
                        $("#txtwebsite").val(List.website);
                        $("#txtadharcardno").val(List.adharcardno);
                        $("#txtpassportno").val(List.passportno);
                        $("#txtpanno").val(List.panno);
                        $("#txtGSTno").val(List.gstno);
                        $("#txtCSTNo").val(List.cstno);
                        $("#txtTINNo").val(List.tinno);
                        $("#txtbankname").val(List.bankname);
                        if (List.accountno)
                            if (List.accountno.toString() != '[object Object]')
                                $("#txtbankacno").val(List.accountno);
                        if (List.swiftcode)
                            if (List.swiftcode.toString() != '[object Object]')
                                $("#txtswiftcode").val(List.swiftcode);
                        if (List.branchname)
                            if (List.branchname.toString() != '[object Object]')
                                $("#txtbranchnamebank").val(List.branchname);
                        if (List.bankaddress)
                            if (List.bankaddress.toString() != '[object Object]')
                                $("#txtbankinfoaddress").val(List.bankaddress);
                        $("#txtcreditdays").val(List.creditdays);
                        $("#txtinterestvalue").val(List.interestvalue);
                        if (List.interestaccno)
                            if (List.interestaccno.toString() != '[object Object]')
                                $("#txtinterestacc").val(List.interestaccno);
                        $("#txtaccountlimit").val(List.accountlimit);
                        $("#txtlabourdiscount").val(List.labourdiscount);
                        if (List.remarkother)
                            if (List.remarkother.toString() != '[object Object]')
                                $("#txtRemarks").val(List.remarkother);
                        $("#divaccid").show();
                        $('#panelEdit').modal('show');
                        $("#btndelete").show();
                        setTimeout(function () {
                            NewFocus();
                        }, 200)
                    }
                }
            }
        });
    },

    RemoveRow: function (row) {
        $(row).closest('tr').remove();
    },

    CityAutoComplete: function (id) {
        try {
            $("#" + id).autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&_search=true&ISRECORDALL=1&ISACTIVE=1&searchField=CITYNAME&searchOper=cn&searchString=" + $("#" + id).val();
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
                                                    label: item.cityname,
                                                    value: item.cityname,
                                                    Id: item.cityid,
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.cityname,
                                                    value: item.cityname,
                                                    Id: item.cityid,
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id).val().length <= 1) {
                                        $("#" + id).val('');
                                        $("#hdnCityId").val('');
                                    }
                                    response([{
                                        label: 'No Results Found', val: ''
                                    }]);
                                    $("#" + id).val('');
                                }
                            }
                            else {
                                if ($("#" + id).val().length <= 1) {
                                    $("#" + id).val('');
                                    $("#" + id).attr('cityid', '');
                                }
                                response([{
                                    label: 'No Results Found', val: ''
                                }]);
                                $("#" + id).val('');
                                $("#" + id).attr('cityid', '');
                                notificationMessage('City Name', $(data).find('RESPONSEMESSAGE').text(), 'error');

                            }
                        }
                    })
                },
                messages: {
                    noResults: "No Results Found"
                },
                select: function (event, ui) {
                    if (ui.item.label != 'No Results Found') {
                        $("#" + id).attr('cityid', ui.item.Id);
                    }
                    else {
                        setTimeout(function () {
                            $("#" + id).attr('cityid', '');
                            $("#" + id).val('');
                            $("#" + id).focus();
                        }, 1);
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
        } catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    PartyAutoComplete: function () {
        try {
            $("#txt_partyname").autocomplete({
                source: function (request, response) {
                    var myfilter = {
                        rules: []
                    };
                    var Value = $("#txt_partyname").val();
                    var PartyName = Value.replace(/[^a-z0-9\s]/gi, '');

                    myfilter.rules.push({ field: "PARTYSEARCH", op: "eq", data: PartyName }) //$("#txt_partyname").val()
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=PARTYMASTER_GET&ISRECORDALL=1&myfilters=" + JSON.stringify(myfilter);
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
                                                    label: item.partyname + "(" + item.mobile1 + ")",
                                                    value: item.partyname,
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.partyname + "(" + item.mobile1 + ")",
                                                    value: item.partyname,
                                                }
                                            }
                                        }))
                                }
                                else {
                                    var result = [
                                        {
                                            label: 'No Results Found',
                                            value: $("#txt_partyname").val()
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
                select: function (event, ui) {
                    if (ui.item.label != 'No Results Found') {
                        var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                        if (Regex.test($("#txt_partyname").val())) {
                            if ($("#txt_partyname").val().length == 10) {
                                setTimeout(function () {
                                    $("#txtmobileno1").val($("#txt_partyname").val());
                                    $("#txt_partyname").val("");
                                    $("#txtcontactname").val("");
                                    $("#txt_partyname").focus();
                                }, 50);
                            }
                        } else {
                            setTimeout(function () {
                                $("#txt_partyname").val('');
                                $("#txt_partyname").focus();
                            }, 1);
                        }
                    }
                },
                minLength: 1,
                autoFocus: true
            });
        }
        catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },

    ValueChangeMasterType: function () {
        if ($("#ddlmastertype").val() == 'OtherAccountMaster') {
            $(".removerequired").hide();
            $(".re_equired").removeClass("required");
            $("#txtshortcode").hide();
        }
        else if ($("#ddlmastertype").val() == 'PartyMaster') {
            $("#txtshortcode").show();
            $(".removerequired").show();
            $(".re_equired").addClass("required");
        }
        else if ($("#ddlmastertype").val() == 'Supplier') {
            $("#txtshortcode").show();
            $(".removerequired").show();
            $(".re_equired").addClass("required");
        }
        else {
            $("#txtshortcode").show();
            $(".removerequired").show();
            $(".re_equired").addClass("required");
        }

    },

    askpopup: function () {
        if ($("#txtaddress1").val() != "") {
            $(".isaddress").show();
            $("#divaddress").modal("show");
            $("#divaddress").attr("flag", "1");
        }
        else {
            $(".isaddress").hide();
            $("#divaddress").modal("hide");
            $("#divaddress").attr("flag", "0");
        }
    },

    Bind_IsAddress: function () {
        var myfilter,
            myfilter = { rules: [] };
        if ($("#chkisAddress").prop('checked'))
            myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });
        var url = Partydetailview.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
        Partydetailview.initializeJqgrid(url);
    },

    AddNewLine: function () {
        ItemAddNewRowModal();
    }
}

function Autocompleteperson() {
    $("#txtcontactname").val($("#txt_partyname").val());
    var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (Regex.test($("#txt_partyname").val())) {
        if ($("#txt_partyname").val().length == 10) {
            setTimeout(function () {
                $("#txtmobileno1").val($("#txt_partyname").val());
                $("#txt_partyname").val("");
                $("#txtcontactname").val("");
                $("#txt_partyname").focus();
            }, 50);
        }
    }
}

function ItemAddNewRowModal() {
    try {
        var id = Partydetailview.variables.ListId;
        $("#LabourBody").append('<tr id="RowItem' + id + '">' +
            '<td style="text-align: center;"></td>' +
            '<td>' +
            '<input type="text" onkeyup="AutosuggestItemName(this)" class="form-control txtItemName required txtAutocomplete" name="txtItemName' + id + '" id="txtItemName' + id + '">' +
            '</td>' +
            '<td colspan=3>' +
            '<table style="width:100%">' +
            '<tbody class="CategoryBody" id="CategoryBody' + id + '">' +
            '</tbody>' +
            '</table>' +
            '</td>' +
            '<td class="btnRemove">' +
            '<div>' +
            '<i class="icon-cancel-circle2" onclick="Partydetailview.RemoveRow(this)"></i>' +
            '</div>' +
            '</td>' +
            '</tr>');
        FixValue();
        if (Partydetailview.variables.AddNew != true) {
            $("#LabourBody tr:last td:nth-child(2) input").focus();
        } else {
            Partydetailview.variables.AddNew = false;
        }
        Partydetailview.variables.ListId = id + 1;
    }
    catch (e) {
        ErrorDetails(e, Partydetailview.variables.File);
    }

}

function AutosuggestItemName(ItemName) {
    try {
        var id = $(ItemName).attr('id');
        var append = id.replace('txtItemName', '');
        $("#" + id).autocomplete({
            source: function (request, response) {
                var url = getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMMASTER_ITEMGROUP_GET&_search=true&ISRECORDALL=1&searchField=ITEMNAME&searchOper=cn&searchString=" + $("#" + id).val();  //ITEMMASTER_GET
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
                                                itemcategorylist: item.itemcategorylist,
                                                ItemGroupType: item.itemgrouptype
                                            }
                                        }
                                        else {
                                            return {
                                                label: item.itemname,
                                                value: item.itemname,
                                                Id: item.itemid,
                                                itemcategorylist: item.itemcategorylist,
                                                ItemGroupType: item.itemgrouptype
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
                if (ui.item.label != 'No Results Found') {
                    $("#txtItemName" + append).attr('ItemId', ui.item.Id);
                    $("#CategoryBody" + append).html('');
                    if (ui.item.itemcategorylist) {
                        $.each(ui.item.itemcategorylist.itemcategorydetails, function (key, innerjsonDetails) {
                            $("#CategoryBody" + append).append('<tr id="RowItem' + innerjsonDetails.itemcategoryid + '">' +
                                '<td style="text-align: center;"></td>' +
                                '<td>' +
                                '<input type="text" value="' + innerjsonDetails.itemcategoryname + '" class="form-control txtItemName required txtAutocomplete" disabled>' +
                                '</td>' +
                                '<td>' +
                                '<input type="number" class="form-control PurchaseRate" name="PurchaseRate' + innerjsonDetails.itemcategoryid + '" id="PurchaseRate' + innerjsonDetails.itemcategoryid + '">' +
                                '</td>' +
                                '<td>' +
                                '<select class="form-control  SalesRate" onchange="Partydetailview.AddNewLine()" name="SalesRate' + innerjsonDetails.itemcategoryid + '" id="SalesRate' + innerjsonDetails.itemcategoryid + '">' +
                                $("#hdnMasterLabourCodes").html() +
                                '</select>' +
                                '</td>' +
                                //'<td>' +
                                //'<input type="number" class="form-control Wastage" name="Wastage' + innerjsonDetails.itemcategoryid + '" id="Wastage' + innerjsonDetails.itemcategoryid + '">' +
                                //'</td>' +
                                '</tr>');
                            $("#CategoryBody" + append).attr('itemgrouptype', ui.item.ItemGroupType)
                        });
                    } else {
                        $("#CategoryBody" + append).append('<tr itemid="' + ui.item.Id + '" id="RowItem' + ui.item.Id + '">' +
                            '<td style="text-align: center;"></td>' +
                            '<td><input type="text" class="form-control" autocomplete="new" disabled></td>' +
                            '<td>' +
                            '<input type="number" class="form-control PurchaseRate" name="PurchaseRate' + ui.item.Id + '" id="PurchaseRate' + ui.item.Id + '">' +
                            '</td>' +
                            '<td>' +
                            '<select type="number" class="form-control SalesRate" onchange="Partydetailview.AddNewLine()" name="SalesRate' + ui.item.Id + '" id="SalesRate' + ui.item.Id + '">' +
                            $("#hdnMasterLabourCodes").html() +
                            '</select>' +
                            '</td>' +
                            //'<td>' +
                            //'<input type="number" class="form-control Wastage" name="Wastage' + ui.item.Id + '" id="Wastage' + ui.item.Id + '">' +
                            //'</td>' +
                            '</tr>');
                        $("#CategoryBody" + append).attr('itemgrouptype', ui.item.ItemGroupType)
                    }
                }
                else {
                    setTimeout(function () {
                        $("#" + id).val('');
                    }, 1)
                }
            },
            minLength: 1,
            autoFocus: true
        });
    }
    catch (e) {
        ErrorDetails(e, Partydetailview.variables.File);
    }
}

function makeFileXml(saveDiv) {
    try {
        var xmlsaveFiles = '';
        $(saveDiv).find('tr').each(function (key, obj) {
            var itemid = $(obj).find('.txtItemName').attr('itemid');
            $($(obj).find('.CategoryBody')).find('tr').each(function (key, obj) {
                xmlsaveFiles += '<RATEDETAILS>';
                if (!$(obj).attr('itemid')) {
                    xmlsaveFiles += '<CATEGORYID>' + ($(obj).attr('id').replace('RowItem', '') || '') + '</CATEGORYID>';
                }
                xmlsaveFiles += '<ITEMID>' + itemid + '</ITEMID>';
                xmlsaveFiles += '<ITEMGROUPTYPE>' + ($(obj).parent().attr('itemgrouptype') || '') + '</ITEMGROUPTYPE>';
                xmlsaveFiles += '<PURCHASERATE>' + parseFloat($(obj).find('.PurchaseRate').val() || 0).toFixed(2) + '</PURCHASERATE>';
                xmlsaveFiles += '<SALESRATE>' + ($(obj).find('.SalesRate').val() || 0) + '</SALESRATE>';
                xmlsaveFiles += '<WASTAGE>' + parseFloat($(obj).find('.Wastage').val() || 0).toFixed(2) + '</WASTAGE>';
                xmlsaveFiles += '</RATEDETAILS>';
            });
        });
        return {
            xmlsaveFiles: xmlsaveFiles
        };
    }
    catch (e) {
        ErrorDetails(e, Partydetailview.variables.File);
    }
}

function NewFocus() {
    $("#ddlmastertype").focus();
}

$(window).keydown(function (event) {
    try {
        //---------------------------------72 h ---------------------------------
        //if (event.altKey && event.keyCode == 72) {
        //    $("#LabourPer").toggle();
        //    if ($("#LabourPer").is(':visible')) {
        //        $("#LabourBody tr:first td:nth-child(2) input")[0].focus();
        //        setTimeout(function () {
        //            window.parent.scroll(0, 999999);
        //        }, 10)
        //    } else {
        //        NewFocus();
        //        window.parent.scroll(0, 0);
        //    }
        //}
        if (event.keyCode == 13) {
            if ($("#divaddress").attr("flag") == "1") {
                $('#chkaddress').iCheck('check');
                $("#divaddress").modal('hide');
                $("#txtaddress2").focus();
            }
        }
        else if (event.keyCode == 27) {
            $("#divaddress").modal('hide');
            $("#txt_address2").focus();
            $("#divaddress").attr("flag", "0");
            $('#chkaddress').iCheck('uncheck');
            $("#txtaddress2").focus();
        }

    }
    catch (e) {
        ErrorDetails(e, Partydetailview.variables.File);
    }
});

$(document).ready(function () {
    try {

        $("#btnAlladdress").click(function () {
            /*var Tagid = jQuery("#table_list_Partydetail").jqGrid('getGridParam', 'selarrrow');*/
            var Tagid = []
            $.each($("#table_list_Partydetail").jqGrid('getRowData'), function (i, item) {
                if ($("#jqg_table_list_Partydetail_" + item.PARTYMASTERID).is(':visible')) {
                    if ($("#jqg_table_list_Partydetail_" + item.PARTYMASTERID).prop('checked')) {
                        Tagid.push(item.PARTYMASTERID);
                    }
                }
            });

            if (Tagid.length == 0) {
                notificationMessage('warning', 'Please select at list one checkbox.', 'warning');
                return
            }

            var data = {
                TAGID: Tagid.toString(),
                ISADDRESS: "1",
                oper: "edit"
            }
            $.ajax({
                url: getDomain() + Partydetailview.variables.ISAddressCRUD,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: Partydetailview.btnMasterSubmitOnSuccess,
                error: OnError
            });
        });

        $("#btnSaveaddress").click(function () {
            $("#chkaddress").iCheck('check');
            $("#divaddress").modal("hide");
            $("#divaddress").attr("flag", "0");
        });

        $("#btncloseaddress").click(function () {
            $("#chkaddress").iCheck('uncheck');
            $("#divaddress").modal("hide");
            $("#divaddress").attr("flag", "0");
        });

        $('.number').keypress(function (event) {
            return numbersOnly(this, event, false, false);
        });
        RegisterImageUpload('BtnImageUpload', 'imgAccount', '#BtnImageUpload-error');
        RegisterImageUpload('BtnImagePanUpload', 'imgPan', '#BtnImageUpload-error');
        Partydetailview.PartyAutoComplete();

        BindDropdown('txtTDSType', 'TDSTypeSelect', getDomain() + Partydetailview.variables.BindTDSCodeUrl, '-- TDS Code --');
        BindDropdown('ddlBankName', 'BankNameSelect', getDomain() + Partydetailview.variables.BindBankNameUrl, '-- Bank Name --');

        var url = Partydetailview.variables.BindGroupListUrl;
        Partydetailview.initializeJqgrid(url);
        if (!isA()) {
            $('#panelEdit').modal('hide');
        }
        $("#txtaccname").focusout(function () {
            $("#txtcontactname").val($("#txtaccname").val());
        });
        //Partydetailview.bindCity();
        Partydetailview.CityAutoComplete('ddlCity');
        Partydetailview.CityAutoComplete('ddlSupplyCity');
        Partydetailview.bindBalanceSheetGroup();
        /*Partydetailview.bindLabourCode('hdnMasterLabourCodes');*/

        Partydetailview.bindTDSCode();
        Partydetailview.bindTradingTDSCode();
        Partydetailview.AutosuggestBankName();

        $('#chkTDSDeduct').on('ifChecked', function () {
            $("#tdscode").show();
        });
        $('#chkTDSDeduct').on('ifUnchecked', function () {
            $("#tdscode").hide();
        });
        $(".upparcase").focus(function () {

            $(".upparcase").css("text-transform", "uppercase");
        });
        $("#txtsearchbox").keyup(function () {
            if ($("#txtsearchbox").val().length > 1) {
                var myfilter,
                    myfilter = {
                        rules: []
                    };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = Partydetailview.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
                Partydetailview.initializeJqgrid(url);
            }
        });
        $('#ddlmastertype').on('change', function () {
            if (this.value == "Supplier" || this.value == "PartyMaster") {
                //$("#ddlBalnceSheetGroup option:selected").text('SUNDRY CREDITORS')
                $('#ddlBalnceSheetGroup option').filter(function () {
                    return (($(this).text()).includes('SUNDRY CREDITORS'));
                }).prop('selected', true);
            }
            else if (this.value == "OtherAccountMaster") {
                $('#ddlBalnceSheetGroup option').filter(function () {
                    return (($(this).text()).includes('-- Balance Sheet Group --'));
                }).prop('selected', true);
            }
        });

        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = Partydetailview.variables.BindGroupListUrl;
                Partydetailview.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 1) {
                var url = Partydetailview.variables.BindGroupListUrl;
                Partydetailview.initializeJqgrid(url);
            }
        });
        $("#btnsaveparty").click(function () {
            Partydetailview.btnMasterSubmit();
        });
        $("#btncancelparty").click(function () {
            //if ($("#hdnCommonPartyId").val()) {
            //    $("#hdnCommonPartyId").val('');
            //    $("#idPartyMaster i").click();
            //} else if ($("#hdnCommonNewParty").val() == '1') {
            //    $("#hdnCommonNewParty").val('')
            //    $("#hdnCommonPartyId").val('');
            //    $("#idPartyMaster i").click();
            //}
            //else {
            Partydetailview.ClearValues();
            $('#panelEdit').modal('hide');
            $("#table_list_Partydetail").trigger("reloadGrid", [{
                current: true
            }]);
            $('#table_list_Partydetail').jqGrid('setSelection', $('#table_list_Partydetail').jqGrid('getDataIDs')[0]);
            //}

        });
        $("#btnAddnewparty").click(function () {
            Partydetailview.ClearValues();
            Partydetailview.variables.AddNew = false;
            $("#LabourPer").hide();
            $("#LabourBody").html('');
            ItemAddNewRowModal();
            $("#btndelete").hide();
            $('#panelEdit').modal('show');
            setTimeout(function () {
                NewFocus();
            }, 200)
            if ($("#ddlmastertype").val() == "PartyMaster") {
                var id = $("#ddlBalnceSheetGroup option:contains(SUNDRY CREDITORS)").val()
                $("#ddlBalnceSheetGroup").val(id)
            }
        });
        $("#btndelete").click(function () {
            var id = $("#hdnpartymasterid").val();
            Partydetailview.deleteRow(id);
        });
        $("#btndelete").click(function () {
            var id = $("#hdnpartymasterid").val();
            Partydetailview.deleteRow(id);
        });
        $("#btnDeletePartyMaster").click(function () {
            Partydetailview.btnMasterDelete();
        });
        $("#btnDeleteCancelPartyMaster").click(function () {
            $('#Modal_PartyMasterDelete').modal("hide");
            $('#btnDeletePartyMaster').attr('disabled', false);
        });

        $("#partyimgcrop").cropper({
            aspectRatio: 1,
            preview: ".preview",
            background: false,
            minContainerWidth: 250,
            minContainerHeight: 250,
            data: {
                x: 208,
                y: 22
            }
        });

        var FileUploadName;
        $('#BtnImageUpload').fileupload({
            //beforeSend: function () {
            //    $(".cd-overlay").addClass("is-visible");
            //    $(".loding-img-div").show();
            //},
            //complete: function () {
            //    $(".cd-overlay").removeClass("is-visible");
            //    $(".loding-img-div").hide();
            //},
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                data.submit();
            },
            success: function (response, status) {
                //$("#partyimgcrop").cropper('clear');
                $('#ModelProfileImage').modal();
                $("#dpCropCanvas").html('');
                $("#partyimgcrop").cropper("replace", response);
                FileUploadName = "AccountImage";
            },
            error: OnError
        });
        $('#BtnImagePanUpload').fileupload({
            //beforeSend: function () {
            //    $(".cd-overlay").addClass("is-visible");
            //    $(".loding-img-div").show();
            //},
            //complete: function () {
            //    $(".cd-overlay").removeClass("is-visible");
            //    $(".loding-img-div").hide();
            //},
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                data.submit();
            },
            success: function (response, status) {
                //$("#partyimgcrop").cropper('clear');
                $('#ModelProfileImage').modal();
                $("#dpCropCanvas").html('');
                $("#partyimgcrop").cropper("replace", response);
                FileUploadName = "PanImage";
            },
            error: OnError
        });

        $('.docs-buttons1').on('click', '[data-method]', function () {
            var $this = $(this);
            var data = $this.data();
            var $target;
            var result;

            result = $("#partyimgcrop").cropper(data.method, data.option, data.secondOption);
            switch (data.method) {
                case 'scaleX':
                case 'scaleY':
                    $(this).data('option', -data.option);
                    break;
                case 'getCroppedCanvas':
                    if (result) {
                        $('#ModelProfileImage').modal().find('#dpCropCanvas').html(result);
                        $("canvas").hide();
                        $('#ModelProfileImage').modal('hide');
                        var c = $("#dpCropCanvas").find('canvas')[0];
                        if (c != undefined) {
                            var ctx = c.getContext("2d");
                            var img = $("#partyimgcrop")[0];
                            ctx.drawImage(c, 0, 0);
                            img.setAttribute('crossOrigin', 'anonymous');

                            //Setting image quality
                            //var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
                            //var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
                            //var lowQuality = canvas.toDataURL('image/jpeg', 0.1);
                            var mydataURL = c.toDataURL('image/jpeg', 0.5);
                            if (mydataURL != '')
                                setTimeout(function () {
                                    $.ajax({
                                        url: getDomain() + "/Common/convertstring",
                                        data: {
                                            imagestring: mydataURL
                                        },
                                        async: false,
                                        cache: false,
                                        type: 'POST',
                                        success: function (res) {
                                            if (FileUploadName == "AccountImage") {
                                                $('#imgAccount').attr('src', res);
                                                $('#imgAccount').data('newurl', res);
                                            }
                                            else if (FileUploadName == "PanImage") {
                                                $('#imgPan').attr('src', res);
                                                $('#imgPan').data('newurl', res);
                                            }
                                        },
                                        error: OnError
                                    });
                                }, 10);
                        }
                    }
                    break;
            }

            $("#panelEdit").css('overflow-y', 'auto');
        });

        //if ($("#hdnCommonPartyId").val()) {
        //    Partydetailview.GetPartyDetails($("#hdnCommonPartyId").val());
        //    $('#panelEdit').modal('show');
        //} else if ($("#hdnCommonNewParty").val() == '1') {
        //    $("#btnAddnewparty").click();
        //}
        //else {

        //}

        if ($(location).attr('search').split('=')) {
            if ($(location).attr('search').split('=')[1]) {
                var id = $(location).attr('search').split('=')[1];
                Partydetailview.GetPartyDetails(id);
            } else {
                Partydetailview.ClearValues();
            }
        }
        else {
            Partydetailview.ClearValues();
        }

        $("#ddlCity").change(function () {
            $("#ddlSupplyCity").val($("#ddlCity").val());
        });

        //$("#OtherAccType").change(function () {
        //    if ($("#OtherAccType").val() == "Bank") {
        //        $(".showBank").show();
        //        $(".showTDS").hide();
        //    } else if ($("#OtherAccType").val() == "TDS") {
        //        $(".showBank").hide();
        //        $(".showTDS").show();
        //    } else {
        //        $(".showBank").hide();
        //        $(".showTDS").hide();
        //    }
        //});

        $("#chkIsRcm").on('ifChanged', function () {
            var label = $("label:contains('GST No')");
            if ($("#chkIsRcm").prop('checked') == true) {
                $("#txtGSTno").removeClass('required');
                $(label).find('span').remove()
            }
            else if ($("#chkIsRcm").prop('checked') == false) {
                $("#txtGSTno").addClass('required');
                $(label).find('span').remove()
                $(label).append('<span style="color:red"> *</span>');
            }
        });

        $("#SameData").on('ifChanged', function () {
            if ($("#SameData").prop('checked') == true) {
                $(".CategoryBody tr .PurchaseRate").val($(".CategoryBody tr:first .PurchaseRate").val());
                $(".CategoryBody tr .SalesRate").val($(".CategoryBody tr:first .SalesRate").val());
                $(".CategoryBody tr .Wastage").val($(".CategoryBody tr:first .Wastage").val());
            }
            else if ($("#SameData").prop('checked') == false) {
                $(".CategoryBody tr .PurchaseRate").val('');
                $(".CategoryBody tr .SalesRate").val('');
                $(".CategoryBody tr .Wastage").val('');
            }
        });
        //if ($("#ddlmastertype").val() == "PartyMaster") {
        //    var id = $("#ddlBalnceSheetGroup option:contains(SUNDRY CREDITORS)").val()
        //    $("#ddlBalnceSheetGroup").val("1071").change();
        //}

    }
    catch (e) {
        ErrorDetails(e, Partydetailview.variables.File);
    }
});

