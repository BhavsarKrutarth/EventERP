var File = 'dashboard_emp.js';
var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function GetEmployeeSalesData() {
    myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: $("#txtFromDate").val() }, { field: "TODATE", op: "eq", data: $("#txtToDate").val() });
    myfilter.rules.push({ field: "NEWEMPID", op: "eq", data: $("#NewEmpId").val() });
    myfilter.rules.push({ field: "TYPE", op: "eq", data: 'insentive' });

    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=EMPLOYEE_SALES_GET&myfilters=" + JSON.stringify(myfilter),
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            var JsonObject = xml2json.parser(data);
            if (JsonObject.serviceresponse.responsecode == 0) {
                if (JsonObject.serviceresponse.detailslist) {
                    var data = [], list = JsonObject.serviceresponse.detailslist;
                    if (list.details.length)
                        list = list.details;

                    $.each(list, function (key, obj) {
                        data.push(obj);
                    });
                    $("#EmployeeSales").show();
                    $("#EmployeeSales").css("height", getGridHeight() + 180 + 'px');
                    AmCharts.makeChart("EmployeeSales",
                        {
                            "type": "serial",
                            "categoryField": "date",
                            "startDuration": 1,
                            "color": "#988383",
                            "mouseWheelScrollEnabled": true,
                            "chartCursor": {
                                "categoryBalloonEnabled": true,
                                "cursorAlpha": 10,
                                "zoomable": true
                            },
                            "chartScrollbar": {
                                //"graph": "Not set",
                                "backgroundColor": "#2f373e",
                                "graphType": "smoothedLine",
                                "resizeEnabled": true,
                                "scrollbarHeight": 5,
                                "scrollDuration": 0,
                                "updateOnReleaseOnly": true
                            },
                            "listeners": [{
                                "event": "init",
                                "method": function (e) {
                                    e.chart.zoomToIndexes(0, 4);
                                }
                            }],
                            "colors": [
                                "#4db6ac",
                                "#4db6ac",
                                "#B0DE09",
                                "#0D8ECF",
                                "#2A0CD0",
                                "#CD0D74",
                                "#CC0000",
                                "#00CC00",
                                "#0000CC",
                                "#DDDDDD",
                                "#999999",
                                "#333333",
                                "#4db6ac"
                            ],
                            "categoryAxis": {
                                "gridPosition": "start"
                            },
                            "trendLines": [],
                            "graphs": [
                                {
                                    "colorField": "#4db6ac",
                                    "fillAlphas": 1,
                                    "id": "AmGraph-1",
                                    "lineColorField": "color",
                                    "title": "graph 1",
                                    "type": "column",
                                    "valueField": "totalsale"
                                }
                            ],
                            "guides": [],
                            "valueAxes": [
                                {
                                    "id": "ValueAxis-1",
                                    "title": "Sales (INR)"
                                }
                            ],
                            "allLabels": [],
                            "balloon": {},
                            "titles": [
                                {
                                    "id": "Title-1",
                                    "size": 15,
                                    "text": "Date wise sales"
                                }
                            ],
                            "dataProvider": data
                        }
                    )
                } else {
                    $("#EmployeeSales").hide();
                }
                if (JsonObject.serviceresponse.targetlist) {
                    var targetweight = JsonObject.serviceresponse.targetlist.targetweight;
                    var achivedweight = JsonObject.serviceresponse.targetlist.achivedweight;
                    var insentiverate = JsonObject.serviceresponse.targetlist.insentiverate;
                    $("#lblDashTarget").html(parseFloat(targetweight || 0).toFixed(3) + ' g');
                    $("#lblDashSales").html(parseFloat(achivedweight || 0).toFixed(3) + ' g');
                    $("#lblDashAchived").html(parseFloat(targetweight || 0 * 2).toFixed(3) + ' g');

                    if (targetweight <= achivedweight) {
                        $("#lblDashInsentive").html('₹ ' + parseFloat(achivedweight * (insentiverate)).toFixed(2));
                    } else {
                        $("#lblDashInsentive").html('₹ 0.00');
                    }


                }
            }
        },
        error: OnError
    });
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
        setTimeout(function () {
            GetEmployeeSalesData();
        }, 200);
    } catch (e) {
        ErrorDetails(e, File);
    }
}
function AllData() {
    try {
        if (!$("#txtToDate").val() && !$("#txtFromDate").val()) {
            GetEmployeeSalesData();
        }
    } catch (e) {
        ErrorDetails(e, "");
    }
}

function GetData(month, year) {
    var url = "/Common/BindMastersDetails?ServiceName=EMPLOYEE_MYTIMESHEET_GET";
    var myfilter,
    myfilter = { rules: [] };
    myfilter.rules.push({ field: "NEWEMPID", op: "eq", data: $('#NewEmpId').val() });
    myfilter.rules.push({ field: "DATEMONTH", op: "eq", data: month + ' ' + year });
    initializeJqgrid(url + "&myfilters=" + JSON.stringify(myfilter));
}

function initializeJqgrid(url) {
    var colNames = ['MyTimeSheetId', 'Date', 'Shift In', 'Shift Out', 'Time In', 'Time Out', 'Status']; //, 'Worked Hrs', 'Late', 'Early', 'Extra hrs', 'Deficit'
    var colModel = [
        { name: "MYTIMESHEETID", index: "MYTIMESHEETID", xmlmap: xmlvars.common_colmap + "MYTIMESHEETID", stype: 'int', sortable: true, hidden: true, search: false },
        { name: "DATE", width: 10, index: "DATE", xmlmap: xmlvars.common_colmap + "DATE", stype: 'text', align: 'center', sortable: false },
        { name: "SHIFTIN", width: 10, index: "SHIFTIN", xmlmap: xmlvars.common_colmap + "SHIFTIN", stype: 'text', align: 'center', sortable: false },
        { name: "SHIFTOUT", width: 10, index: "SHIFTOUT", xmlmap: xmlvars.common_colmap + "SHIFTOUT", stype: 'text', align: 'center', sortable: false },
        { name: "TIMEIN", width: 10, index: "TIMEIN", xmlmap: xmlvars.common_colmap + "TIMEIN", stype: 'text', align: 'center', sortable: false },
        { name: "TIMEOUT", width: 10, index: "TIMEOUT", xmlmap: xmlvars.common_colmap + "TIMEOUT", stype: 'text', align: 'center', sortable: false },
        //{ name: "WORKEDHRS", width: 8, index: "WORKEDHRS", xmlmap: xmlvars.common_colmap + "WORKEDHRS", stype: 'text', align: 'center', sortable: false },
        { name: "STATUS", width: 8, index: "STATUS", xmlmap: xmlvars.common_colmap + "STATUS", stype: 'text', align: 'center', sortable: false },
        //{ name: "LATE", width: 8, index: "LATE", xmlmap: xmlvars.common_colmap + "LATE", stype: 'text', align: 'center', sortable: false},
        //{ name: "EARLY", width: 8, index: "EARLY", xmlmap: xmlvars.common_colmap + "EARLY", stype: 'text', align: 'center', sortable: false},
        //{ name: "EXTRAHRS", width: 9, index: "EXTRAHRS", xmlmap: xmlvars.common_colmap + "EXTRAHRS", align: 'center', stype: 'text', sortable: false },
        //{ name: "DEFICIT", width: 9, index: "DEFICIT", xmlmap: xmlvars.common_colmap + "DEFICIT", align: 'center', stype: 'text', sortable: false },
    ];

    //colNames.push('View');
    //colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'MyTimeSheetView', 'view') } });
    $.jgrid.gridUnload("#table_MyTimeSheet");
    $("#table_MyTimeSheet").jqGrid({
        //data: mydata,
        url: getDomain() + url,
        datatype: "xml",
        height: getGridHeight() + 100,
        //scroll: 1,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 31,
        colNames: colNames,
        colModel: colModel,
        footerrow: true,
        pager: "#pager_MyTimeSheet",
        xmlReader: {
            root: xmlvars.common_root,
            row: xmlvars.common_row,
            page: xmlvars.common_response + "CURRENTPAGE",
            total: xmlvars.common_response + "TOTALPAGES",
            records: xmlvars.common_response + "TOTALRECORDS",
            repeatitems: false,
            id: "MYTIMESHEETID"
        },
        loadComplete: function () {
            $("tr.jqgrow:even").addClass('myAltRowClass');

            var $self = $(this);
            $self.jqGrid("footerData", "set", {
                WORKEDHRS: $self.jqGrid("getCol", "WORKEDHRS", false, "timeSummary"),
                LATE: $self.jqGrid("getCol", "LATE", false, "sum"),
                EXTRAHRS: $self.jqGrid("getCol", "EXTRAHRS", false, "sum"),
                EARLY: $self.jqGrid("getCol", "EARLY", false, "sum"),
                DEFICIT: $self.jqGrid("getCol", "DEFICIT", false, "sum")
            });

            setTimeout(function () {
                var width = $('#jqgrid_MyTimeSheet').width();
                if (width <= 630) {
                    width = 700;
                }
                $('#table_MyTimeSheetdetail').setGridWidth(width);
                $("#gbox_table_MyTimeSheet").width(width);
            }, 200);


        },
        loadError: OnJqloadError,
        beforeProcessing: OnJqbeforeProcessingErrorcheck,
        viewrecords: true,
        hidegrid: false,
        sortname: 'MYTIMESHEETID',
        sortorder: 'desc',
        ondblClickRow: function (rowid) {
            //if (isU()) {
            //    if (rowid != 'norecs')
            //        MyTimeSheetView.triggerId(rowid, 'edit')
            //}
        }
    });

    // Setup buttons
    $("#table_MyTimeSheet").jqGrid('navGrid', '#pager_MyTimeSheet',
        { edit: false, add: false, del: false, search: false, refresh: false },
        { height: 200 }
    );

    $("#pager_MyTimeSheet_left").css("width", "");
    AlignJqGridHeader('table_MyTimeSheet', ['edit', 'delete', 'DATE', 'SHIFTIN', 'SHIFTOUT', 'TIMEIN', 'TIMEOUT', 'WORKEDHRS', 'STATUS', 'LATE', 'EARLY', 'EXTRAHRS', 'DEFICIT']);

    // JqGrid navigations shortcuts
    jQuery("#table_MyTimeSheet").jqGrid('bindKeys', {
        "onEnter": function (rowid) {
            //if (isU()) {
            //    if (rowid != 'norecs')
            //        MyTimeSheetView.triggerId(rowid, 'edit')
            //}
        }
    });
}

function DateLess(input) {
    FromDateLess(input);
    GetEmployeeSalesData();
}

function DateAdd(input) {
    FromDateAdd(input);
    GetEmployeeSalesData();
}

$(document).ready(function () {
    var today = new Date();
    $('#txtToDate').val(today.toISOString().split('T')[0]);
    today.setDate(today.getDate() - 7);
    $('#txtFromDate').val(today.toISOString().split('T')[0]);
    GetEmployeeSalesData();

    var d = new Date();
    var n = d.getMonth();
    GetData(Months[n], d.getFullYear());
});