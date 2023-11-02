var View = "LedgerReportView";
var LedgerReportView = {
    variables: {
        //BindLedgerAccList_Summary_Url: "/Common/BindMastersDetails?ServiceName=LEDGERREPORT_SUMMARY_GET",
        BindLedgerAccListUrl: "/Common/BindMastersDetails?ServiceName=LEDGER_ACCOUNT_LIST_GET",
        /*BindLedgerAccList_WithoutZero_Url: "/Common/BindMastersDetails?ServiceName=LEDGER_ACCOUNT_LIST_GET",*/
        BindDefaultListUrl: "/Common/BindMastersDetails?ServiceName=LEDGERREPORT_DEFAULT_GET",
        BindLedgerDetailsUrl: "/Common/BindMastersDetails?ServiceName=LEDGER_REPORT_GET",
        BindBSGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        File: "LedgerReport.js",
        AccountId: "",
        TotalAmount: 0,
        AccountId: '',
        AccountName: '',
        AccountType: '',
    },

    initializeJqgrid: function (url) {
        try {
            colNames = ['ROWNUM', 'ACCOUNTID', 'Account Name','Account Type', 'accounttype', 'Bal. Sheet Group', 'Mobile No', 'Opening Amt', 'Credit Amt', 'Debit Amt', 'Balance'],
                colModel = [
                    { name: "ROWNUM", index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", sortable: false, search: false, hidden: true },
                    { name: "ACCOUNTID", index: "ACCOUNTID", xmlmap: xmlvars.common_colmap + "ACCOUNTID", sortable: false, search: false, hidden: true },
                { name: "ACCOUNTNAME", width: 20, index: "ACCOUNTNAME", xmlmap: xmlvars.common_colmap + "ACCOUNTNAME", sortable: false, search: false },   //, searchoptions: jqGridVariables.stringSearchOption
                { name: "ACCOUNTTYPE", width: 20, index: "ACCOUNTTYPE", xmlmap: xmlvars.common_colmap + "ACCOUNTTYPE", sortable: false, search: false },   //, searchoptions: jqGridVariables.stringSearchOption
                    { name: "ACCOUNTTYPE", index: "ACCOUNTTYPE", xmlmap: xmlvars.common_colmap + "ACCOUNTTYPE", sortable: false, hidden: true },
                    { name: "BSGROUPNAME", index: "BSGROUPNAME", xmlmap: xmlvars.common_colmap + "BSGROUPNAME", sortable: false, hidden: true },
                    { name: "MOBILE", exports: false, width: 10, index: "MOBILE", xmlmap: xmlvars.common_colmap + "MOBILE", sortable: false, search: false },  //, searchoptions: jqGridVariables.stringSearchOption
                    {
                        name: "OPENING_AMT", stype: 'text', width: 10, index: "OPENING_AMT", xmlmap: xmlvars.common_colmap + "OPENING_AMT", align: "right", sortable: false, search: false
                        //, formatter: function (cv, op, ro) {return jqGridVariables.CrDrFmatter(cv, op, ro, 2)},
                        //summaryTpl: "{0}",
                        //summaryType: "sum",
                        //formatoptions: { decimalPlaces: 2 },
                        //formatter: 'number'
                    },
                    {
                        name: "CREDIT_AMT", stype: 'text', width: 10, index: "CREDIT_AMT", xmlmap: xmlvars.common_colmap + "CREDIT_AMT", align: "right", sortable: false, search: false,
                        // formatter: function (cv, op, ro) { return jqGridVariables.CrDrFmatter(cv, op, ro, 2) },
                        //summaryTpl: "{0}",
                        //summaryType: "sum",
                        //formatoptions: { decimalPlaces: 2 },
                        //formatter: 'number'
                    },
                    {
                        name: "DEBIT_AMT", stype: 'text', width: 10, index: "DEBIT_AMT", xmlmap: xmlvars.common_colmap + "DEBIT_AMT", align: "right", sortable: false, search: false,
                        //summaryTpl: "{0}",
                        //summaryType: "sum",
                        //formatoptions: { decimalPlaces: 2 },
                        //formatter: 'number'
                    },
                    //    {
                    //        name: "BALANCE_AMT", width: 10, index: "BALANCE_AMT", xmlmap: xmlvars.common_colmap + "BALANCE_AMT", align: "right", sortable: false, search: false,
                    //        formatter: function (cv, op, ro) { return jqGridVariables.CrDrFmatter(cv, op, ro, 2) },
                    //        //summaryTpl: "{0}",
                    //        //summaryType: "sum",
                    //        //formatoptions: { decimalPlaces: 2 },
                    //        //formatter: 'number'
                    //},
                    {
                        name: "BALANCE_AMT1", width: 10, index: "BALANCE_AMT1", xmlmap: xmlvars.common_colmap + "BALANCE_AMT1", align: "right", sortable: false, search: false,
                        //formatter: function (cv, op, ro) { return jqGridVariables.CrDrFmatter(cv, op, ro, 2) },
                        //summaryTpl: "{0}",
                        //summaryType: "sum",
                        //formatoptions: { decimalPlaces: 2 },
                        //formatter: 'number'
                    },
                ];

            //$("#table_LedgerAccountList").GridUnload();
            $.jgrid.gridUnload("#table_LedgerAccountList");
            $("#table_LedgerAccountList").jqGrid({
                url: getDomain() + url,
                datatype: "xml",
                height: getGridHeight(),
                scroll: 1,
                width: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 30,
                rowList: [20, 50, 100],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_LedgerAccountList",
                footerrow: true,
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "ACCOUNTID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');

                    setTimeout(function () {
                        var width = $('#jqgrid_LedgerAccountList').width();
                        if (width <= 430) {
                            width = 1000;
                        }
                        $('#table_LedgerAccountList').setGridWidth(width);
                    }, 200)
                    //$('#table_LedgerAccountList').jqGrid('setSelection', $('#table_LedgerAccountList').jqGrid('getDataIDs')[0]);

                    //var $self = $(this),
                    //    sum = $self.jqGrid("getCol", "CREDIT_AMT", false, "sum");

                    //$self.jqGrid("footerData", "set", { CREDIT_AMT: sum });

                    //sum1 = $self.jqGrid("getCol", "DEBIT_AMT", false, "sum");

                    //$self.jqGrid("footerData", "set", { DEBIT_AMT: sum1 });

                    var $self = $(this);
                    var CREDIT_AMT = parseFloat($self.jqGrid("getCol", "CREDIT_AMT", false, "sum")).toFixed(2);
                    var DEBIT_AMT = parseFloat($self.jqGrid("getCol", "DEBIT_AMT", false, "sum")).toFixed(2);
                    var OPENING_AMT = parseFloat($self.jqGrid("getCol", "OPENING_AMT", false, "sum")).toFixed(2);
                    $(".footrow [aria-describedby=table_LedgerAccountList_BALANCE_AMT]").html(CrDrFmatter(((+OPENING_AMT + +CREDIT_AMT) - +DEBIT_AMT), 2));
                    $self.jqGrid("footerData", "set", {
                        OPENING_AMT: OPENING_AMT,
                        CREDIT_AMT: CREDIT_AMT,
                        DEBIT_AMT: DEBIT_AMT
                    });
                    jQuery("#table_LedgerAccountList").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'ROWNUM',
                sortorder: 'asc',
                ondblClickRow: function (accountid) {
                    LedgerReportView.triggerId(accountid)
                }
            });
            jQuery("#table_LedgerAccountList").jqGrid('bindKeys', {
                "onEnter": function (accountid) {
                    LedgerReportView.triggerId(accountid)
                }
            });

            // Setup buttons
            $("#table_LedgerAccountList").jqGrid('navGrid', '#pager_LedgerAccountList',
                { edit: false, add: false, del: false, search: false, refresh: true },
                { height: 320 }
            );
            $("#pager_LedgerAccountList_left").css("width", "");
            //AlignJqGridHeader('table_LedgerAccountList', ['edit', 'act', 'print']);
            RightAlignJqGridHeader('table_LedgerAccountList', ['OPENING_AMT', 'CREDIT_AMT', 'DEBIT_AMT', 'BALANCE_AMT', 'BALANCE_AMT1']);
        }
        catch (e) {
            ErrorDetails(e, LedgerReportView.variables.File);
        }
    },

    triggerId: function (id) {
        try {
            var rowData = jQuery("#table_LedgerAccountList").getRowData(id);

            LedgerReportView.variables.AccountId = rowData["ACCOUNTID"];
            $("#txt_account").val(rowData["ACCOUNTNAME"]);
            $("#jqgrid_LedgerAccountList").hide();
            $("#jqgrid_LedgerDetails").show();
            $("#btnBack").show();

            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "FROMDATE", op: "eq", data: $("#date_fromDate").val() }, { field: "TODATE", op: "eq", data: $("#date_toDate").val() });
            myfilter.rules.push({ field: "ACCID", op: "eq", data: LedgerReportView.variables.AccountId });
            if ($("#ddlBalSheetGroup").val() != '') {
                myfilter.rules.push({ field: "BALSHEET", op: "eq", data: $("#ddlBalSheetGroup").val() });
            }
            if ($("#ddlBranch").val()) {
                myfilter.rules.push({ field: "BRANCHID", op: "eq", data: $("#ddlBranch").val() });
            }

            var url = LedgerReportView.variables.BindLedgerDetailsUrl + "&myfilters=" + JSON.stringify(myfilter);
            LedgerReportView.initializeJqgridDetail(url);
        }
        catch (e) {
            ErrorDetails(e, LedgerReportView.variables.File);
        }
    },

    GetCurrentAccYear: function () {
        try {
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_ACCOUNTYEARMASTER_GET&_search=true&searchField=ACCOUNTYEARID&searchOper=eq&searchString=" + getAccountYearId(),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist) {
                            var temp = new Date(JsonObject.serviceresponse.detailslist.details.accountyearfromdate);
                            //var splitDate = temp.split("/");
                            //$('#txtFromDate').val(splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]);

                            $('#date_fromDate').val(temp.getFullYear() + "-" + ("0" + (+temp.getMonth() + 1)).slice(-2) + "-" + ("0" + temp.getDate()).slice(-2));
                        }
                    }
                },
                error: OnError
            });
        }
        catch (e) {
            ErrorDetails(e, LedgerReportView.variables.File);
        }
    },

    AutosuggestAccountName: function () {
        try {
            $("#txt_account").autocomplete({
                source: function (request, response) {
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txt_account").val() });

                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET&myfilters=" + JSON.stringify(myfilter);
                    $.ajax({
                        url: url,
                        type: "POST",
                        async: false,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                var JsonObject = xml2json.parser(data);

                                if (JsonObject.serviceresponse.detailslist) {
                                    var List;
                                    if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    else
                                        List = JsonObject.serviceresponse.detailslist;

                                    response(
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {
                                                return {
                                                    label: item.accountname + '-' + (item.mobile || ""),
                                                    value: item.accountname,
                                                    Id: item.accountid,
                                                    mobile: item.mobile || "",
                                                    name: item.accountname,
                                                    cityname: item.cityname || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || ""
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.accountname + '-' + (item.mobile || ""),
                                                    value: item.accountname,
                                                    Id: item.accountid,
                                                    mobile: item.mobile || "",
                                                    name: item.accountname,
                                                    cityname: item.cityname || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || ""
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#txt_account").val().length <= 1) {
                                        LedgerReportView.variables.AccountId = "";
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
                                if ($("#txt_account").val().length <= 1) {
                                    LedgerReportView.variables.AccountId = "";
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
                        LedgerReportView.variables.AccountId = ui.item.Id;
                        LedgerReportView.DataGetCall()
                    }
                    else {
                        setTimeout(function () {
                            $("#txt_account").val('');
                            LedgerReportView.variables.AccountId = "";
                        }, 1)
                    }
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        LedgerReportView.variables.AccountId = "";
                    }
                },
                focus: function (event, ui) {
                },
                minLength: 3,
                autoFocus: true
            })
        } catch (e) {
            ErrorDetails(e, LedgerReportView.variables.File);
        }
    },

    initializeJqgridDetail: function (url) {
        try {
            colNames = ['ROWNUM', 'Voucher No', 'Voucher Date', 'Bill Type', 'Account Name', 'Credit Amt', 'Debit Amt', 'Balance Amt', 'Remark', 'RedirectLink'],
                colModel = [
                    { name: "ROWNUM", index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", sortable: false, search: false, hidden: true },
                    { name: "VOUCHERNO", width: 10, index: "VOUCHERNO", xmlmap: xmlvars.common_colmap + "VOUCHERNO", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "VOUCHERDATE", width: 10, index: "VOUCHERDATE", xmlmap: xmlvars.common_colmap + "VOUCHERDATE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "BILLTYPE", width: 10, index: "BILLTYPE", xmlmap: xmlvars.common_colmap + "BILLTYPE", sortable: false, hidden: true, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "ACCOUNTNAME", width: 10, index: "ACCOUNTNAME", xmlmap: xmlvars.common_colmap + "ACCOUNTNAME", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "AMT_CREDIT", width: 10, index: "AMT_CREDIT", xmlmap: xmlvars.common_colmap + "AMT_CREDIT", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "AMT_DEBIT", width: 10, index: "AMT_DEBIT", xmlmap: xmlvars.common_colmap + "AMT_DEBIT", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    //    {
                    //        name: "BALANCE", width: 10, index: "BALANCE", xmlmap: xmlvars.common_colmap + "BALANCE", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption,
                    //        formatter: function (cv, op, ro) { return jqGridVariables.CrDrFmatter(cv, op, ro, 2) },
                    //},
                    {
                        name: "BALANCE1", width: 10, index: "BALANCE1", xmlmap: xmlvars.common_colmap + "BALANCE1", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption,
                    },
                    { name: "REMARK", width: 20, index: "REMARK", xmlmap: xmlvars.common_colmap + "REMARK", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "REDIRECTLINK", index: "REDIRECTLINK", xmlmap: xmlvars.common_colmap + "REDIRECTLINK", hidden: true },
                ];
            //$("#table_LedgerDetails").GridUnload();
            $.jgrid.gridUnload("#table_LedgerDetails");
            $("#table_LedgerDetails").jqGrid({
                url: getDomain() + url,
                datatype: "xml",
                height: '400',
                width: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 5000,
                rowList: [20, 50, 100],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_LedgerDetails",
                footerrow: true,
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "ROWNUM"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');

                    setTimeout(function () {
                        var width = $('#jqgrid_LedgerDetails').width();
                        if (width <= 430) {
                            width = 1000;
                        }
                        $('#table_LedgerDetails').setGridWidth(width);
                    }, 200)
                    $('#table_LedgerDetails').jqGrid('setSelection', $('#table_LedgerDetails').jqGrid('getDataIDs')[0]);

                    var $self = $(this);
                    var AMT_CREDIT = $self.jqGrid("getCol", "AMT_CREDIT", false, "sum");
                    var AMT_DEBIT = $self.jqGrid("getCol", "AMT_DEBIT", false, "sum");
                    $(".footrow [aria-describedby=table_LedgerDetails_BALANCE]").html(CrDrFmatter((AMT_CREDIT - AMT_DEBIT), 2));
                    $self.jqGrid("footerData", "set", {
                        AMT_CREDIT: parseFloat(AMT_CREDIT).toFixed(2),
                        AMT_DEBIT: parseFloat(AMT_DEBIT).toFixed(2)
                    });

                    jQuery("#table_LedgerDetails").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'ROWNUM',
                sortorder: 'asc',
                ondblClickRow: function (rowid) {
                    LedgerReportView.RedirectToVoucher(rowid);
                }
            });
            jQuery("#table_LedgerDetails").jqGrid('bindKeys', {
                "onEnter": function (rowid) {
                    LedgerReportView.RedirectToVoucher(rowid);
                }
            });

            // Setup buttons
            $("#table_LedgerDetails").jqGrid('navGrid', '#pager_LedgerDetails',
                { edit: false, add: false, del: false, search: false, refresh: true },
                { height: 320 }
            );
            $("#pager_LedgerDetails_left").css("width", "");
            RightAlignJqGridHeader('table_LedgerDetails', ['AMT_CREDIT', 'AMT_DEBIT', 'BALANCE']);
        }
        catch (e) {
            ErrorDetails(e, LedgerReportView.variables.File);
        }
    },

    RedirectToVoucher: function (rowid) {
        var rowData = jQuery("#table_LedgerDetails").getRowData(rowid);
        var RedirectType = (rowData.REDIRECTLINK).split('-');
        if (rowData.VOUCHERNO != '') {
            window.open(getDomain() + rowData["REDIRECTLINK"], "_blank");
        }

        //if ($("#table_LedgerDetails").is(':visible')) {
        //    var RedirectType = (rowData.REDIRECTLINK).split('-');
        //    if (rowData.VOUCHERNO != '') {
        //        window.open(getDomain() + rowData["REDIRECTLINK"], "_blank");
        //    }
        //    else if (RedirectType[0] == 'TDS') {
        //        $("#jqgrid_LedgerAccountList").hide();
        //        $("#jqgrid_LedgerDetails").hide();
        //        $("#jqgrid_LedgerTDS").show();

        //        if (rowData.TDSID) {
        //            var TdsId = rowData.TDSID;
        //        }

        //        var myfilter = { rules: [] };
        //        myfilter.rules.push({ field: "FROMDATE", op: "eq", data: $("#date_fromDate").val() }, { field: "TODATE", op: "eq", data: $("#date_toDate").val() });
        //        myfilter.rules.push({ field: "ACCID", op: "eq", data: LedgerReportView.variables.AccountId });
        //        if ($("#ddlBalSheetGroup").val() != '') {
        //            myfilter.rules.push({ field: "BALSHEET", op: "eq", data: $("#ddlBalSheetGroup").val() });
        //        }
        //        myfilter.rules.push({ field: "TDSID", op: "eq", data: TdsId });
        //        myfilter.rules.push({ field: "VOUCHERTYPE", op: "eq", data: RedirectType[1] });

        //        var Url = LedgerReportView.variables.BindLedgerTDSUrl + "&myfilters=" + JSON.stringify(myfilter);
        //        LedgerReportView.initializeJqgridTDS(Url);
        //    }
        //}
        //else if ($("#table_LedgerTDS").is(':visible')) {
        //    var rowData1 = jQuery("#table_LedgerTDS").getRowData(rowid);
        //    if (rowData1.VOUCHERNO) {
        //        window.open(getDomain() + rowData1["REDIRECTLINK"], "_blank");
        //    }
        //}
    },

    GetTotalAmount: function (cr, dr) {
        LedgerReportView.variables.TotalAmount = parseFloat(parseFloat(LedgerReportView.variables.TotalAmount) + (parseFloat(cr) - parseFloat(dr))).toFixed(2);
        return parseFloat(LedgerReportView.variables.TotalAmount).toFixed(2);
    },

    bindBSGroup: function () {
        $("#ddlBalSheetGroup").html("");
        BindDropdown('ddlBalSheetGroup', 'BSGroupNameList', getDomain() + LedgerReportView.variables.BindBSGroupUrl, '-- Balance Sheet Group --', true);
    },

    DataGetCall: function () {
        try {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "FROMDATE", op: "eq", data: $("#date_fromDate").val() }, { field: "TODATE", op: "eq", data: $("#date_toDate").val() });
           /* myfilter.rules.push({ field: "ZEROFILTER", op: "eq", data: $("#ddlZeroFilter").val() });*/

            if ($("#ddlBalSheetGroup").val() != '') {
                myfilter.rules.push({ field: "BALSHEET", op: "eq", data: $("#ddlBalSheetGroup").val() });
            }

            if ($("#ddlBranch").val()) {
                myfilter.rules.push({ field: "BRANCHID", op: "eq", data: $("#ddlBranch").val() });
            }

            if (LedgerReportView.variables.AccountId) {
                myfilter.rules.push({ field: "ACCID", op: "eq", data: LedgerReportView.variables.AccountId });
            }
           

            if ($("#ddlType").val() == "Summary") {
                $("#jqgrid_LedgerAccountList").show();
                $("#jqgrid_LedgerDetails").hide();
                //if ($("#ddlZeroFilter").val() == 'WithoutZero') {
                //    var url = LedgerReportView.variables.BindLedgerAccList_WithoutZero_Url + "&myfilters=" + JSON.stringify(myfilter);
                //}
                //else {
                    var url = LedgerReportView.variables.BindLedgerAccListUrl + "&myfilters=" + JSON.stringify(myfilter);
                /*}*/

                LedgerReportView.initializeJqgrid(url);
            }
            else {
                $("#jqgrid_LedgerAccountList").hide();
                $("#jqgrid_LedgerDetails").show();
                var url = LedgerReportView.variables.BindLedgerDetailsUrl + "&myfilters=" + JSON.stringify(myfilter);
                LedgerReportView.initializeJqgridDetail(url);
            }
        }
        catch (e) {
            ErrorDetails(e, LedgerReportView.variables.File);
        }
    },
}

$(document).ready(function () {
    try {
        /*LedgerReportView.Default_get();*/
        $("#ddlBalSheetGroup").hide();
        var today = new Date().toISOString().split('T')[0];
        $('#date_toDate').val(today);

        LedgerReportView.GetCurrentAccYear();
        LedgerReportView.bindBSGroup();

        BindDropdown('ddlBranch', 'BranchDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=EMPLOYEEBRANCH_GET", 'All', true);
        //$("#ddlBranch option:first").before('<option value="">All</option>');
        $("#ddlBranch").val($("#hdnBranchId").val());

        LedgerReportView.DataGetCall();

        //$("#btnBack").click(function () {
        //    $("#txt_account").val("");
        //    LedgerReportView.variables.AccountId = "";
        //    $("#jqgrid_LedgerAccountList").show();
        //    $("#jqgrid_LedgerDetails").hide();
        //    //$("#jqgrid_LedgerTDS").hide();
        //    $("#btnBack").hide();
        //});

        $("#btnPrintLedger").click(function () {
            $("#table_LedgerAccountList").jqGrid("exportToPdf", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "LedgerReport.pdf"
            })
        });
        $("#btnExcelPrint").click(function () {
            $("#table_LedgerAccountList").jqGrid("exportToExcel", {
                includeLabels: true,
                includeGroupHeader: true,
                includeFooter: true,
                fileName: "LedgerReport.xlsx"
            })
        })
        $("#refreshgrid").click(function () {
            //if ($("#table_LedgerDetails").is(":visible")) {
            //    LedgerReportView.variables.TotalAmount = 0;
            //    jQuery('#table_LedgerDetails').trigger('reloadGrid');


            //} else {
            //    jQuery('#table_LedgerAccountList').trigger('reloadGrid');
            //}
            location.reload();

        });
        ///*$("#btnViewLedger").click();*/
        //$("#btnCashEntry").click(function () {
        //    $("#TransactionModal").modal('hide');
        //    window.open(getDomain() + '/Transaction/CashOnHand?AccountId=' + LedgerReportView.variables.AccountId + '&AccountName=' + LedgerReportView.variables.AccountName + '&AccountType=' + LedgerReportView.variables.AccountType, "_blank");
        //});
        //$("#btnBankEntry").click(function () {
        //    $("#TransactionModal").modal('hide');
        //    window.open(getDomain() + '/Transaction/BankBook?AccountId=' + LedgerReportView.variables.AccountId + '&AccountName=' + LedgerReportView.variables.AccountName + '&AccountType=' + LedgerReportView.variables.AccountType, "_blank");
        //});
        //$("#btnJVEntry").click(function () {
        //    $("#TransactionModal").modal('hide');
        //    window.open(getDomain() + '/Transaction/JournalVoucher', "_blank");
        //});
        //var params = new window.URLSearchParams(window.location.search);
        //if (params.get('AccountId')) {
        //    $("#ddlType").val('Details');
        //    $("#txt_account").val(params.get('AccountName'));
        //    LedgerReportView.variables.AccountId = params.get('AccountId');
        //    //$("#btnViewLedger").click();
        //    LedgerReportView.DataGetCall();
        //}
        

        $("#ddlType, #ddlBalSheetGroup, #ddlZeroFilter, #ddlBranch, #date_fromDate ,#date_toDate, #txt_account").change(function () {
            LedgerReportView.DataGetCall();
        });
    }
    catch (e) {
        ErrorDetails(e, LedgerReportView.variables.File);
    }
});

$(window).keydown(function (event) {
    try {
        if (event.altKey && event.keyCode == 82) {
            if ($("#table_LedgerDetails").is(":visible")) {
                LedgerReportView.variables.TotalAmount = 0;
                jQuery('#table_LedgerDetails').trigger('reloadGrid');
            } else {
                jQuery('#table_LedgerAccountList').trigger('reloadGrid');
            }
        } else if (event.keyCode == 27) {
            if ($("#btnBack").is(':visible')) {
                event.preventDefault();
                $("#btnBack").click();
            }
        } else if (event.keyCode == 114) {
            event.preventDefault();
            if ($("#table_LedgerAccountList").is(':visible')) {
                var myGrid = $('#table_LedgerAccountList');
                selRowId = myGrid.jqGrid('getGridParam', 'selrow');

                if (selRowId) {
                    var rowdata = jQuery("#table_LedgerAccountList").getRowData(selRowId);
                    LedgerReportView.variables.AccountId = rowdata['ACCOUNTID'];
                    LedgerReportView.variables.AccountName = rowdata['ACCOUNTNAME'];
                    LedgerReportView.variables.AccountType = rowdata['ACCOUNTTYPE'];

                    $("#TransactionModal").modal('show');
                } else {
                    notificationMessage('Warning', 'Please Select Row.', 'warning')
                }
            }
        }
    } catch (e) {
        ErrorDetails(e, LedgerReportView.variables.File);
    }
});
