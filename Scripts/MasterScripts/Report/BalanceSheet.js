var BalanceSheetView = {
    variables: {
        File: 'BalanceSheet.js',
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=BALANCE_SHEET_GROUP_REPORT_GET",
        ExportReportUrl: "/Report/BalanceSheetReportPrint",
    },

    BalanceSheetDataGet: function () {
        try {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "FROMDATE", op: "eq", data: $("#txtFromDate").val() }, { field: "TODATE", op: "eq", data: $("#txtToDate").val() });
            if ($("#ddlBranch").val()) {
                myfilter.rules.push({ field: "BRANCHID", op: "eq", data: $("#ddlBranch").val() });
            }
            var Url = BalanceSheetView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
            $.ajax({
                url: getDomain() + Url,
                type: "POST",
                async: false,
                cache: false,
                success: function (data) {
                    $("#LiabilitiesData,#AssetsData").html("");
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        data = data.replaceAll("&amp;", "&");
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.creditlist) {
                            $("#LiabilitiesData").html($("#render_BalanceSheetData").render(JsonObject.serviceresponse.creditlist.credits));
                        }
                        if (JsonObject.serviceresponse.debitlist) {
                            $("#AssetsData").html($("#render_BalanceSheetData").render(JsonObject.serviceresponse.debitlist.debits));
                        }

                        if (JsonObject.serviceresponse.finaltotal)
                            $("#total_libalities,#total_Assets").html(parseFloat(JsonObject.serviceresponse.finaltotal).toFixed(2));
                        else
                            $("#total_libalities,#total_Assets").html(0.00);

                        $("#footer_Profit_Loss").remove();
                        if (JsonObject.serviceresponse.profit_loss) {
                            if (+JsonObject.serviceresponse.profit_loss >= 0) {
                                $('<tfoot id="footer_Profit_Loss"><tr><td><b>Net Profit</b></td><td style="text-align:right;"><b>' + parseFloat(JsonObject.serviceresponse.profit_loss).toFixed(2) + '</b></td></tr></tfoot>').insertAfter("#LiabilitiesData");
                            }
                            else {
                                $('<tfoot id="footer_Profit_Loss"><tr><td><b>Net Loss</b></td><td style="text-align:right;"><b>' + parseFloat(JsonObject.serviceresponse.profit_loss * -1).toFixed(2) + '</b></td></tr></tfoot>').insertAfter("#AssetsData");
                            }
                        }
                    }
                    else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            })
        }
        catch (e) {
            ErrorDetails(e, BalanceSheetView.variables.File);
        }
    },

    ExportReport: function (ExportType) {
        var data = {
            ReportType: "BalanceSheetGroupReport",
            PrintType: ExportType,
            ServiceName: "BALANCE_SHEET_GROUP_REPORT_GET",
            FromDate: $("#txtFromDate").val(),
            ToDate: $("#txtToDate").val()
        }
        $.ajax({
            url: getDomain() + BalanceSheetView.variables.ExportReportUrl,
            type: "POST",
            data: data,
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
}

$(document).ready(function () {
    try {
        var today = new Date().toISOString().split('T')[0];
        $('#txtFromDate').val($("#lbl_startdate").val());
        var lastYear = $("#lbl_enddate").val().split('-')[0];
        var todayYear = new Date().toISOString().split('T')[0].split('-')[0];
        if (todayYear >= lastYear) {
            $('#txtToDate').val($("#lbl_enddate").val());
        } else if (todayYear < lastYear) {
            $('#txtToDate').val(today);
        }

        BindDropdown('ddlBranch', 'BranchDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=EMPLOYEEBRANCH_GET", 'All', true);
        $("#ddlBranch").val($("#hdnBranchId").val());

        BalanceSheetView.BalanceSheetDataGet();

        $("#btn_ReportSearch").click(function () {
            BalanceSheetView.BalanceSheetDataGet();
        });

        $("#btn_ExportExcel").click(function () {
            BalanceSheetView.ExportReport("Excel");
        });
        $("#btn_ExportPDF").click(function () {
            BalanceSheetView.ExportReport("PDF");
        });

        $("#LiabilitiesData tr").dblclick(function () {
            var AccName = $($(this).children()[0]).html();
            var AccId = $($(this).children()[0]).attr('accid');
            var RedirectLink = '/Report/LedgerReport?AccountName=' + AccName + '&AccountId=' + AccId;
            window.open(getDomain() + RedirectLink, "_blank");
        });
        $("#AssetsData tr").dblclick(function () {
            var AccName = $($(this).children()[0]).html();
            var AccId = $($(this).children()[0]).attr('accid');
            var RedirectLink = '/Report/LedgerReport?AccountName=' + AccName + '&AccountId=' + AccId;
            window.open(getDomain() + RedirectLink, "_blank");
        });

        $("#ddlBranch").change(function () {
            BalanceSheetView.BalanceSheetDataGet();
        });

    }
    catch (e) {
        ErrorDetails(e, BalanceSheetView.variables.File);
    }
});

function DateLess(input) {
    FromDateLess(input);
}
function DateAdd(input) {
    FromDateAdd(input);
}