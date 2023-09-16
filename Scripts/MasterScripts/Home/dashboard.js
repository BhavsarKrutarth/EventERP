/* ------------------------------------------------------------------------------
 *
 *  # Dashboard configuration
 *
 *  Demo dashboard configuration. Contains charts and plugin inits
 *
 * ---------------------------------------------------------------------------- */

var File = 'dashboard.js';
var ItemFromDate = '', ItemToDate = '', DateWiseFromDate = '', DateWiseToDate = '', MonthWiseFromDate = '', MonthWiseToDate = '';

function GetAllDataDaily() {
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=DAILY_BOOK_SUMMARY_REPORT_GET",
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            var JsonObject = xml2json.parser(data);
            if ($(data).find('RESPONSECODE').text() == "0") {
                var Opening = JsonObject.serviceresponse.detailslist.details.openingbal || 0;
                var Credit = JsonObject.serviceresponse.detailslist.details.amt_credit || 0;
                var Debit = JsonObject.serviceresponse.detailslist.details.amt_debit || 0;
                $("#OpeningBalance").html('₹ ' + CurrencyConvert(parseFloat(Opening).toFixed(2)));
                $("#CreditAmount").html('₹ ' + CurrencyConvert(parseFloat(Credit).toFixed(2)));
                $("#DebitAmount").html('₹ ' + CurrencyConvert(parseFloat(Debit).toFixed(2)));
                $("#FinalBalance").html('₹ ' + CurrencyConvert(parseFloat((+Opening + +Credit) - +Debit).toFixed(2)));

            }


        },
        error: OnError
    });
}
function StockDataGet() {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: '1999-01-01' }, { field: "TODATE", op: "eq", data: new Date().toISOString().split('T')[0] });
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=STOCK_REPORT_GET&myfilters=" + JSON.stringify(myfilter),
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            var JsonObject = xml2json.parser(data);
            if ($(data).find('RESPONSECODE').text() == "0") {
                var list = JsonObject.serviceresponse.detailslist
                if (list.details.length) {
                    list = list.details;
                }

                $.each(list, function (key, innerjsonDetails) {
                    $("#MetalOpening").append('<h3 class="font-weight-semibold mb-0 lblMainAmount">' + innerjsonDetails.itemgroupname + '<span class="MetallblDaily">' + parseFloat(innerjsonDetails.openingnetwt || 0).toFixed(3) + ' gms</span></h3>');
                    $("#MetalCredit").append('<h3 class="font-weight-semibold mb-0 lblMainAmount">' + innerjsonDetails.itemgroupname + '<span class="MetallblDaily">' + parseFloat(innerjsonDetails.innetwgt || 0).toFixed(3) + ' gms</span></h3>');
                    $("#MetalDebit").append('<h3 class="font-weight-semibold mb-0 lblMainAmount">' + innerjsonDetails.itemgroupname + '<span class="MetallblDaily">' + parseFloat(innerjsonDetails.outnetwgt || 0).toFixed(3) + ' gms</span></h3>');
                    $("#MetalBalance").append('<h3 class="font-weight-semibold mb-0 lblMainAmount">' + innerjsonDetails.itemgroupname + '<span class="MetallblDaily">' + parseFloat(innerjsonDetails.netwt || 0).toFixed(3) + ' gms</span></h3>');
                });

            }


        },
        error: OnError
    });
}

function GetCurrentAccYear() {
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
                        getDebitorList(temp.getFullYear() + "-" + ("0" + (+temp.getMonth() + 1)).slice(-2) + "-" + ("0" + temp.getDate()).slice(-2))
                    }
                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}
function getDebitorList(FromDate) {
    var today = new Date().toISOString().split('T')[0];

    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: today }, { field: "BALANCETYPE", op: "eq", data: -1 });
    myfilter.rules.push({ field: "ONLYPARTYCUSTOMER", op: "eq", data: true });
    myfilter.rules.push({ field: "VENDERTYPE", op: "eq", data: "All" });

    var url = "/Common/BindMastersDetails?ServiceName=DEBITOR_CREDITOR_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);
    try {
        colNames = ['ROWNUM', 'Account Name', 'Balance', 'Acc Id', 'Redirect Link'], //'Mobile', 'Acc Type', 'City', 'Op. Amt', 'Cr. Amt', 'Dr. Amt',
            colModel = [
                { name: "ROWNUM", index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", sortable: false, search: false, hidden: true },
                { name: "ACCOUNTNAME", width: 20, index: "ACCOUNTNAME", xmlmap: xmlvars.common_colmap + "ACCOUNTNAME", sortable: false },
                //{
                //    name: "MOBILE", width: 5, index: "MOBILE", xmlmap: xmlvars.common_colmap + "MOBILE", align: "center", sortable: false, searchoptions: jqGridVariables.stringSearchOption
                //},
                //{
                //    name: "ACCOUNTTYPE", width: 5, index: "ACCOUNTTYPE", xmlmap: xmlvars.common_colmap + "ACCOUNTTYPE", sortable: false, search: false, hidden: true
                //},
                //{
                //    name: "CITY", width: 10, index: "CITY", xmlmap: xmlvars.common_colmap + "CITY", align: "center", sortable: false, searchoptions: jqGridVariables.stringSearchOption
                //},
                //{ name: "OPENING_AMT", width: 10, index: "OPENING_AMT", xmlmap: xmlvars.common_colmap + "OPENING_AMT", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                //{
                //    name: "CREDIT_AMT", width: 10, index: "CREDIT_AMT", xmlmap: xmlvars.common_colmap + "CREDIT_AMT", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption
                //},
                //{
                //    name: "DEBIT_AMT", width: 10, index: "DEBIT_AMT", xmlmap: xmlvars.common_colmap + "DEBIT_AMT", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption
                //},
                {
                    name: "BALANCE_AMT", width: 10, index: "BALANCE_AMT", xmlmap: xmlvars.common_colmap + "BALANCE_AMT", align: "right", sortable: false
                },

                { name: "ACCOUNTID", index: "ACCOUNTID", xmlmap: xmlvars.common_colmap + "ACCOUNTID", sortable: false, search: false, hidden: true },
                { name: "REDIRECTLINK", index: "REDIRECTLINK", xmlmap: xmlvars.common_colmap + "REDIRECTLINK", sortable: false, search: false, hidden: true },

            ];

        //$("#table_CrediterDebtorDetailsList").GridUnload();
        $.jgrid.gridUnload("#table_CrediterDebtorDetailsList");
        $("#table_CrediterDebtorDetailsList").jqGrid({
            url: getDomain() + url,
            datatype: "xml",
            height: '292px',
            scroll: 1,
            width: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 30,
            rowList: [20, 50, 100],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_CrediterDebtorDetailsList",
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

                //setTimeout(function () {
                //    var width = $('#jqgrid_CrediterDebtorAccountList').width();
                //    if (width <= 430) {
                //        width = 1000;
                //    }
                //    $('#table_CrediterDebtorDetailsList').setGridWidth(width);
                //}, 200)

                var $self = $(this);
                $self.jqGrid("footerData", "set", {
                    OPENING_AMT: parseFloat($self.jqGrid("getCol", "OPENING_AMT", false, "sum")).toFixed(2),
                    CREDIT_AMT: parseFloat($self.jqGrid("getCol", "CREDIT_AMT", false, "sum")).toFixed(2),
                    DEBIT_AMT: parseFloat($self.jqGrid("getCol", "DEBIT_AMT", false, "sum")).toFixed(2),
                    BALANCE_AMT: parseFloat($self.jqGrid("getCol", "BALANCE_AMT", false, "sum")).toFixed(2)
                });
                //jQuery("#table_CrediterDebtorDetailsList").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ROWNUM',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                RedirectToVoucher(rowid)
            }
        });
        jQuery("#table_CrediterDebtorDetailsList").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                RedirectToVoucher(rowid)
            }
        });

        // Setup buttons
        $("#table_CrediterDebtorDetailsList").jqGrid('navGrid', '#pager_CrediterDebtorDetailsList',
            { edit: false, add: false, del: false, search: false, refresh: true },
            { height: 320 }
        );
        $("#pager_CrediterDebtorDetailsList_left").css("width", "");
        RightAlignJqGridHeader('table_CrediterDebtorDetailsList', ['OPENING_AMT', 'CREDIT_AMT', 'DEBIT_AMT', 'BALANCE_AMT']);
        AlignJqGridHeader('table_CrediterDebtorDetailsList', ['CITY', 'MOBILE']);
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}

function GetCombineData(FromDate, ToDate) {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: ToDate });
    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);

    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var BranchSalesData = [];
                    if (JsonObject.serviceresponse.datedetailslist) {

                        var list = JsonObject.serviceresponse.datedetailslist;
                        if (list.datedetails.length) {
                            list = list.datedetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            BranchSalesData.push(obj);
                        });

                    }
                    BranchWiseSales(BranchSalesData)

                    var SalesData = [];
                    if (JsonObject.serviceresponse.datewisedetailslist) {
                        var list = JsonObject.serviceresponse.datewisedetailslist;
                        if (list.datewisedetails.length) {
                            list = list.datewisedetails;
                        }
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });
                        DateWiseSales(SalesData)
                    }

                    var BranchSalesData = [];
                    if (JsonObject.serviceresponse.datedetailslist) {

                        var list = JsonObject.serviceresponse.datedetailslist;
                        if (list.datedetails.length) {
                            list = list.datedetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            BranchSalesData.push(obj);
                        });

                    }
                    BranchWiseSales(BranchSalesData)

                    var SalesData = [];
                    if (JsonObject.serviceresponse.groupdetailslist) {

                        var list = JsonObject.serviceresponse.groupdetailslist;
                        if (list.groupdetails.length) {
                            list = list.groupdetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    }
                    GroupWiseSales(SalesData)

                    var SalesData = [];
                    if (JsonObject.serviceresponse.itemdetailslist) {
                        var list = JsonObject.serviceresponse.itemdetailslist;
                        if (list.itemdetails.length) {
                            list = list.itemdetails;
                        }
                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    }
                    ItemWiseSales(SalesData)

                    var SalesData = [];
                    if (JsonObject.serviceresponse.salesmandetailslist) {

                        var list = JsonObject.serviceresponse.salesmandetailslist;
                        if (list.salesmandetails.length) {
                            list = list.salesmandetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    }
                    SalesmanWiseSales(SalesData)

                    var SalesData = [];
                    if (JsonObject.serviceresponse.partydetailslist) {

                        var list = JsonObject.serviceresponse.partydetailslist;
                        if (list.partydetails.length) {
                            list = list.partydetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    }
                    PartyWiseSales(SalesData)


                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}

function GetMonthWiseSales() {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: MonthWiseFromDate }, { field: "TODATE", op: "eq", data: MonthWiseToDate }, { field: "TYPE", op: "eq", data: 'monthly' });

    if ($("#txtMonthWiseDashboardBranch").val() != '') {
        myfilter.rules.push({ field: "NEWBRANCHID", op: "eq", data: $("#txtMonthWiseDashboardBranch").attr("branchid") })
    }

    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);
    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var SalesData = [];
                    if (JsonObject.serviceresponse.datewisedetailslist) {
                        var list = JsonObject.serviceresponse.datewisedetailslist;
                        if (list.datewisedetails.length) {
                            list = list.datewisedetails;
                        }
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });
                    } else {
                        notificationTost('warning', 'Data not found.');
                    }

                    MonthWiseSales(SalesData);
                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}
function MonthWiseSales(data) {
    AmCharts.makeChart("MonthlySales",
        {
            "type": "serial",
            "categoryField": "month",
            "angle": 30,
            "depth3D": 30,
            "color": "#988383",
            "colors": [
                "#FF6600",
                "rgb(77, 182, 172)",
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
                "#990000"
            ],
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] On [[month]]:[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-1",
                    "title": "Sale",
                    "type": "column",
                    "valueField": "value"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "stackType": "3d",
                    "title": "Amount(INR)"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "enabled": true,
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Monthly Sales"
                }
            ],
            "dataProvider": data,
            "export": {
                "enabled": true
            }
        }
    );
}

function GetDateWiseSales() {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: DateWiseFromDate }, { field: "TODATE", op: "eq", data: DateWiseToDate }, { field: "TYPE", op: "eq", data: 'datewise' });

    if ($("#txtDateWiseDashboardBranch").val() != '') {
        myfilter.rules.push({ field: "NEWBRANCHID", op: "eq", data: $("#txtDateWiseDashboardBranch").attr("branchid") })
    }
    $('#monthly-sales-stats').html('');
    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);
    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var SalesData = [];
                    if (JsonObject.serviceresponse.datewisedetailslist) {
                        var list = JsonObject.serviceresponse.datewisedetailslist;
                        if (list.datewisedetails.length) {
                            list = list.datewisedetails;
                        }
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });
                    } else {
                        notificationTost('warning', 'Data not found.');
                    }

                    DateWiseSales(SalesData);

                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}
function DateWiseSales(data) {

    var element = '#monthly-sales-stats', height = 100, color = '#4DB6AC';

    // Define main variables
    var d3Container = d3.select(element),
        margin = { top: 20, right: 35, bottom: 40, left: 35 },
        width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    // Date and time format
    var parseDate = d3.time.format('%Y-%m-%d').parse,
        bisectDate = d3.bisector(function (d) { return d.date; }).left,
        formatDate = d3.time.format("%b %d");



    // Create SVG
    // ------------------------------

    // Container
    var container = d3Container.append('svg');

    // SVG element
    var svg = container
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")



    // Construct chart layout
    // ------------------------------

    // Area
    var area = d3.svg.area()
        .x(function (d) { return x(d.date); })
        .y0(height)
        .y1(function (d) { return y(d.value); })
        .interpolate('monotone')


    // Construct scales
    // ------------------------------

    // Horizontal
    var x = d3.time.scale().range([0, width]);

    // Vertical
    var y = d3.scale.linear().range([height, 0]);


    // Create axes
    // ------------------------------

    // Horizontal
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(d3.time.days, 6)
        .innerTickSize(4)
        .tickPadding(8)
        .tickFormat(d3.time.format("%b %d"));

    // Pull out values
    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });

    // Get the maximum value in the given array
    var maxY = d3.max(data, function (d) { return d.value; });

    // Reset start data for animation
    var startData = data.map(function (datum) {
        return {
            date: datum.date,
            value: 0
        };
    });


    // Set input domains
    // ------------------------------

    // Horizontal
    x.domain(d3.extent(data, function (d, i) { return d.date; }));

    // Vertical
    y.domain([0, d3.max(data, function (d) { return d.value; })]);



    //
    // Append chart elements
    //

    // Append axes
    // -------------------------

    // Horizontal
    var horizontalAxis = svg.append("g")
        .attr("class", "d3-axis d3-axis-horizontal d3-axis-solid")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add extra subticks for hidden hours
    horizontalAxis.selectAll(".d3-axis-subticks")
        .data(x.ticks(d3.time.days), function (d) { return d; })
        .enter()
        .append("line")
        .attr("class", "d3-axis-subticks")
        .attr("y1", 0)
        .attr("y2", 4)
        .attr("x1", x)
        .attr("x2", x);



    // Append area
    // -------------------------

    // Add area path
    svg.append("path")
        .datum(data)
        .attr("class", "d3-area")
        .attr("d", area)
        .style('fill', color)
        .transition() // begin animation
        .duration(1000)
        .attrTween('d', function () {
            var interpolator = d3.interpolateArray(startData, data);
            return function (t) {
                return area(interpolator(t));
            }
        });



    // Append crosshair and tooltip
    // -------------------------

    //
    // Line
    //

    // Line group
    var focusLine = svg.append("g")
        .attr("class", "d3-crosshair-line")
        .style("display", "none");

    // Line element
    focusLine.append("line")
        .attr("class", "vertical-crosshair")
        .attr("y1", 0)
        .attr("y2", -maxY)
        .style("stroke", "#e5e5e5")
        .style('shape-rendering', 'crispEdges')


    //
    // Pointer
    //

    // Pointer group
    var focusPointer = svg.append("g")
        .attr("class", "d3-crosshair-pointer")
        .style("display", "none");

    // Pointer element
    focusPointer.append("circle")
        .attr("r", 3)
        .style("fill", "#fff")
        .style('stroke', color)
        .style('stroke-width', 1)


    //
    // Text
    //

    // Text group
    var focusText = svg.append("g")
        .attr("class", "d3-crosshair-text")
        .style("display", "none");

    // Text element
    focusText.append("text")
        .attr("dy", -10)
        .style('font-size', 12);


    //
    // Overlay with events
    //

    svg.append("rect")
        .attr("class", "d3-crosshair-overlay")
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function () {
            focusPointer.style("display", null);
            focusLine.style("display", null)
            focusText.style("display", null);
        })
        .on("mouseout", function () {
            focusPointer.style("display", "none");
            focusLine.style("display", "none");
            focusText.style("display", "none");
        })
        .on("mousemove", mousemove);


    // Display tooltip on mousemove
    function mousemove() {

        // Define main variables
        var mouse = d3.mouse(this),
            mousex = mouse[0],
            mousey = mouse[1],
            x0 = x.invert(mousex),
            i = bisectDate(data, x0),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        // Move line
        focusLine.attr("transform", "translate(" + x(d.date) + "," + height + ")");

        // Move pointer
        focusPointer.attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");

        // Reverse tooltip at the end point
        if (mousex >= (d3Container.node().getBoundingClientRect().width - focusText.select('text').node().getBoundingClientRect().width - margin.right - margin.left)) {
            focusText.select("text").attr('text-anchor', 'end').attr("x", function () { return (x(d.date) - 15) + "px" }).text(formatDate(d.date) + " - " + d.value + " sales");
        }
        else {
            focusText.select("text").attr('text-anchor', 'start').attr("x", function () { return (x(d.date) + 15) + "px" }).text(formatDate(d.date) + " - " + d.value + " sales");
        }
    }



    // Resize chart
    // ------------------------------

    // Call function on window resize
    $(window).on('resize', monthlySalesAreaResize);

    // Call function on sidebar width change
    $(document).on('click', '.sidebar-control', monthlySalesAreaResize);

    // Resize function
    // 
    // Since D3 doesn't support SVG resize by default,
    // we need to manually specify parts of the graph that need to 
    // be updated on window resize
    function monthlySalesAreaResize() {

        // Layout variables
        width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


        // Layout
        // -------------------------

        // Main svg width
        container.attr("width", width + margin.left + margin.right);

        // Width of appended group
        svg.attr("width", width + margin.left + margin.right);


        // Axes
        // -------------------------

        // Horizontal range
        x.range([0, width]);

        // Horizontal axis
        svg.selectAll('.d3-axis-horizontal').call(xAxis);

        // Horizontal axis subticks
        svg.selectAll('.d3-axis-subticks').attr("x1", x).attr("x2", x);


        // Chart elements
        // -------------------------

        // Area path
        svg.selectAll('.d3-area').datum(data).attr("d", area);

        // Crosshair
        svg.selectAll('.d3-crosshair-overlay').attr("width", width);
    }
}

function GetBranchWiseSales(FromDate, ToDate) {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: ToDate }, { field: "TYPE", op: "eq", data: 'branch' });
    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);

    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var BranchSalesData = [];
                    if (JsonObject.serviceresponse.datedetailslist) {

                        var list = JsonObject.serviceresponse.datedetailslist;
                        if (list.datedetails.length) {
                            list = list.datedetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            BranchSalesData.push(obj);
                        });

                    } else {
                        notificationTost('warning', 'Data not found.');
                    }
                    BranchWiseSales(BranchSalesData)
                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
    function GetBranchWiseSales(FromDate, ToDate) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: ToDate }, { field: "TYPE", op: "eq", data: 'branch' });
        var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);

        try {
            $.ajax({
                url: getDomain() + url,
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        var BranchSalesData = [];
                        if (JsonObject.serviceresponse.datedetailslist) {

                            var list = JsonObject.serviceresponse.datedetailslist;
                            if (list.datedetails.length) {
                                list = list.datedetails;
                            }

                            //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                            $.each(list, function (key, obj) {
                                BranchSalesData.push(obj);
                            });

                        }
                        BranchWiseSales(BranchSalesData)
                    }
                },
                error: OnError
            });
        }
        catch (e) {
            ErrorDetails(e, File);
        }
    }
}
function BranchWiseSales(data) {

    AmCharts.makeChart("StorSales", {
        "type": "pie",
        "theme": "none",
        "innerRadius": "40%",
        "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
        "color": "#988383",
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
        "dataProvider": data,
        "balloonText": "[[value]]",
        "valueField": "amount",
        "titleField": "branchname",
        "titles": [
            {
                "id": "Title-1",
                "size": 15,
                "text": "Branch wise sales"
            }
        ],
        "balloon": {
            "drop": true,
            "adjustBorderColor": false,
            "color": "#FFFFFF",
            "fontSize": 16
        },
        "export": {
            "enabled": true
        }
    });

    //AmCharts.makeChart("StorSales",
    //                {
    //                    "type": "serial",
    //                    "categoryField": "branchname",
    //                    "startDuration": 1,
    //                    "color": "#988383",
    //                    "colors": [
    //                        "#4db6ac",
    //                        "#4db6ac",
    //                        "#B0DE09",
    //                        "#0D8ECF",
    //                        "#2A0CD0",
    //                        "#CD0D74",
    //                        "#CC0000",
    //                        "#00CC00",
    //                        "#0000CC",
    //                        "#DDDDDD",
    //                        "#999999",
    //                        "#333333",
    //                        "#4db6ac"
    //                    ],
    //                    "categoryAxis": {
    //                        "gridPosition": "start"
    //                    },
    //                    "trendLines": [],
    //                    "graphs": [
    //                        {
    //                            "colorField": "#4db6ac",
    //                            "fillAlphas": 1,
    //                            "id": "AmGraph-1",
    //                            "lineColorField": "color",
    //                            "title": "graph 1",
    //                            "type": "column",
    //                            "valueField": "amount"
    //                        }
    //                    ],
    //                    "guides": [],
    //                    "valueAxes": [
    //                        {
    //                            "id": "ValueAxis-1",
    //                            "title": "Sales (INR)"
    //                        }
    //                    ],
    //                    "allLabels": [],
    //                    "balloon": {},
    //                    "titles": [
    //                        {
    //                            "id": "Title-1",
    //                            "size": 15,
    //                            "text": "Branch wise sales"
    //                        }
    //                    ],
    //                    "dataProvider": data
    //                }
    //            );
}

function GetGroupSales(FromDate, ToDate) {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: ToDate }, { field: "TYPE", op: "eq", data: 'group' });
    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);

    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var SalesData = [];
                    if (JsonObject.serviceresponse.groupdetailslist) {

                        var list = JsonObject.serviceresponse.groupdetailslist;
                        if (list.groupdetails.length) {
                            list = list.groupdetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    } else {
                        notificationTost('warning', 'Data not found.');
                    }
                    GroupWiseSales(SalesData)
                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}
function GroupWiseSales(data) {

    AmCharts.makeChart("GroupSales", {
        "type": "pie",
        "theme": "none",
        "color": "#988383",
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
        "dataProvider": data,
        "balloonText": "[[value]]",
        "valueField": "sales",
        "titleField": "groupname",
        "titles": [
            {
                "id": "Title-1",
                "size": 15,
                "text": "Item Group wise sales"
            }
        ],
        "balloon": {
            "drop": true,
            "adjustBorderColor": false,
            "color": "#FFFFFF",
            "fontSize": 16
        },
        "export": {
            "enabled": true
        }
    });

    //AmCharts.makeChart("GroupSales",
    //                    {
    //                        "type": "serial",
    //                        "categoryField": "groupname",
    //                        "startDuration": 1,
    //                        "color": "#988383",
    //                        "colors": [
    //                            "#4db6ac",
    //                            "#4db6ac",
    //                            "#B0DE09",
    //                            "#0D8ECF",
    //                            "#2A0CD0",
    //                            "#CD0D74",
    //                            "#CC0000",
    //                            "#00CC00",
    //                            "#0000CC",
    //                            "#DDDDDD",
    //                            "#999999",
    //                            "#333333",
    //                            "#4db6ac"
    //                        ],
    //                        "categoryAxis": {
    //                            "gridPosition": "start"
    //                        },
    //                        "trendLines": [],
    //                        "graphs": [
    //                            {
    //                                "colorField": "#4db6ac",
    //                                "fillAlphas": 1,
    //                                "id": "AmGraph-1",
    //                                "lineColorField": "color",
    //                                "title": "graph 1",
    //                                "type": "column",
    //                                "valueField": "sales"
    //                            }
    //                        ],
    //                        "guides": [],
    //                        "valueAxes": [
    //                            {
    //                                "id": "ValueAxis-1",
    //                                "title": "Sales (INR)"
    //                            }
    //                        ],
    //                        "allLabels": [],
    //                        "balloon": {},
    //                        "titles": [
    //                            {
    //                                "id": "Title-1",
    //                                "size": 15,
    //                                "text": "Group wise sales"
    //                            }
    //                        ],
    //                        "dataProvider": data
    //                    }
    //                );
}

function GetItemSales() {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: ItemFromDate }, { field: "TODATE", op: "eq", data: ItemToDate }, { field: "TYPE", op: "eq", data: 'item' });

    if ($("#txtDashboardBranch").val() != '') {
        myfilter.rules.push({ field: "NEWBRANCHID", op: "eq", data: $("#txtDashboardBranch").attr("branchid") })
    }

    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);
    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var SalesData = [];
                    if (JsonObject.serviceresponse.itemdetailslist) {
                        var list = JsonObject.serviceresponse.itemdetailslist;
                        if (list.itemdetails.length) {
                            list = list.itemdetails;
                        }
                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    }
                    ItemWiseSales(SalesData)
                } else {
                    notificationTost('warning', 'Data not found.');
                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}
function ItemWiseSales(data) {
    AmCharts.makeChart("Collection",
        {
            "type": "serial",
            "categoryField": "category",
            "color": "#988383",
            "angle": 30,
            "depth3D": 30,
            "colors": [
                "rgb(77, 182,172)",
                "#FCD202",
                "#B0DE09",
                "#0D8ECF",
                "#2A0CD0",
                "#CD0D74",
                "#00CC00",
                "#0000CC",
                "#DDDDDD",
                "#999999",
                "#333333",
                "#990000"
            ],
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-1",
                    "labelText": "[[value]]",
                    "title": "Sale",
                    "type": "column",
                    "valueField": "sales"
                },
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "stackType": "3d",
                    "title": "Sales (INR)"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "enabled": true,
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Item wise sales"
                }
            ],
            "dataProvider": data,
            "export": {
                "enabled": true
            }
        }
    );
}

function GetSalesmanSales(FromDate, ToDate) {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: ToDate }, { field: "TYPE", op: "eq", data: 'salesman' });
    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);

    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var SalesData = [];
                    if (JsonObject.serviceresponse.salesmandetailslist) {

                        var list = JsonObject.serviceresponse.salesmandetailslist;
                        if (list.salesmandetails.length) {
                            list = list.salesmandetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    } else {
                        notificationTost('warning', 'Data not found.');
                    }
                    SalesmanWiseSales(SalesData)
                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}
function SalesmanWiseSales(data) {
    AmCharts.makeChart("SalesManSales",
        {
            "type": "serial",
            "categoryField": "shortname",
            "startDuration": 1,
            "angle": 30,
            "depth3D": 30,
            "color": "#988383",
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
                    "valueField": "sales"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "stackType": "3d",
                    "title": "Sales (INR)"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Salesman wise sales"
                }
            ],
            "dataProvider": data,
            "export": {
                "enabled": true
            }
        }
    );
}

function GetPartySales(FromDate, ToDate) {
    var myfilter = { rules: [] };
    myfilter.rules.push({ field: "FROMDATE", op: "eq", data: FromDate }, { field: "TODATE", op: "eq", data: ToDate }, { field: "TYPE", op: "eq", data: 'party' });
    var url = "/Common/BindMastersDetails?ServiceName=DASHBOARD_SALES_GET&ISRECORDALL=true&myfilters=" + JSON.stringify(myfilter);

    try {
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    var SalesData = [];
                    if (JsonObject.serviceresponse.partydetailslist) {

                        var list = JsonObject.serviceresponse.partydetailslist;
                        if (list.partydetails.length) {
                            list = list.partydetails;
                        }

                        //appSalesLines('#app_sales', 255, JsonObject.serviceresponse.detailslist);
                        $.each(list, function (key, obj) {
                            SalesData.push(obj);
                        });

                    }
                    PartyWiseSales(SalesData)
                } else {
                    notificationTost('warning', 'Data not found.');
                }
            },
            error: OnError
        });
    }
    catch (e) {
        ErrorDetails(e, File);
    }
}
function PartyWiseSales(data) {
    AmCharts.makeChart("PartySales",
        {
            "type": "serial",
            "categoryField": "partyname",
            "startDuration": 1,
            "angle": 30,
            "depth3D": 30,
            "color": "#988383",
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
                    "valueField": "sales"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "stackType": "3d",
                    "title": "Sales (INR)"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Party wise sales"
                }
            ],
            "dataProvider": data,
            "export": {
                "enabled": true
            }
        }
    );
}

function DashboardBranchAutoComplete(obj) {
    $(obj).autocomplete({
        source: function (request, response) {
            var myfilter, SP_Name;
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "SEARCH", op: "eq", data: $(obj).val() });
            var url = getDomain() + "/Common/BindMastersDetails?ServiceName=BRANCHMASTER_GET&ISACTIVE=1&myfilters=" + JSON.stringify(myfilter);
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
                                            label: item.branchname,
                                            value: item.branchname,
                                            BranchId: item.branchid
                                        }
                                    }
                                    else {
                                        return {
                                            label: item.branchname,
                                            value: item.branchname,
                                            BranchId: item.branchid
                                        }
                                    }
                                })
                            )
                        }
                        else {
                            response([{ label: 'No Results Found', value: '' }]);
                        }
                    }
                    else {
                        notificationMessage('Branch Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            })
        },
        messages: {
            noResults: "No Results Found"
        },
        select: function (event, ui) {
            if (ui.item.label != 'No Results Found') {
                $(obj).attr("branchid", ui.item.BranchId);

                if ($(obj).attr('id') == 'txtDateWiseDashboardBranch') {
                    GetDateWiseSales();
                } else if ($(obj).attr('id') == 'txtMonthWiseDashboardBranch') {
                    GetMonthWiseSales();
                } else {
                    GetItemSales();
                }

            }
            else {
                setTimeout(function () {
                    $(obj).val('');
                    $(obj).attr("tobranchid", '');
                    $(obj).focus();
                }, 1)
            }
        },
        minLength: 1,
        autoFocus: true
    });
}

function appSalesLines(element, height, data) {

    // Basic setup
    // ------------------------------

    // Define main variables
    var d3Container = d3.select(element),
        margin = { top: 5, right: 30, bottom: 30, left: 50 },
        width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    // Tooltip
    var tooltip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function (d) {
            return "<ul class='list-unstyled mb-5'>" +
                "<li>" + "<div class='text-size-base mt-5 mb-5'><i class='icon-circle-left2 position-left'></i>" + d.name + "</div>" + "</li>" +
                "<li>" + "Sales: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
                "<li>" + "Revenue: &nbsp; " + "<span class='text-semibold pull-right'>" + "₹" + d.value + "</span>" + "</li>" +
                "</ul>";
        });

    // Format date
    var parseDate = d3.time.format("%Y/%m/%d").parse,
        formatDate = d3.time.format("%b %d, '%y");

    // Line colors
    var scale = ["#4CAF50", "#FF5722", "#5C6BC0"],
        color = d3.scale.ordinal().range(scale);



    // Create chart
    // ------------------------------

    // Container
    var container = d3Container.append('svg');

    // SVG element
    var svg = container
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(tooltip);



    // Add date range switcher
    // ------------------------------

    // Menu
    var menu = $("#select_date").multiselect({
        buttonClass: 'btn btn-link text-semibold',
        enableHTML: true,
        dropRight: $('html').attr('dir') == 'rtl' ? false : true,
        onChange: function () {
            change();
        },
        buttonText: function (options, element) {
            var selected = '';
            options.each(function () {
                selected += $(this).html() + ', ';
            });
            return '<span class="status-mark border-warning position-left"></span>' + selected.substr(0, selected.length - 2);
        }
    });



    // Load data
    // ------------------------------

    d3.csv(getDomain() + "/Content/assets/demo_data/dashboard/app_sales.csv", function (error, data) {
        formatted = data;
        redraw();
    });



    // Construct layout
    // ------------------------------

    // Add events
    var altKey;
    d3.select(window)
        .on("keydown", function () { altKey = d3.event.altKey; })
        .on("keyup", function () { altKey = false; });

    // Set terms of transition on date change   
    function change() {
        d3.transition()
            .duration(altKey ? 7500 : 500)
            .each(redraw);
    }



    // Main chart drawing function
    // ------------------------------

    function redraw() {

        // Construct chart layout
        // ------------------------------

        // Create data nests
        var nested = d3.nest()
            .key(function (d) { return d.type; })
            .map(formatted)

        // Get value from menu selection
        // the option values correspond
        //to the [type] value we used to nest the data  
        var series = menu.val();

        // Only retrieve data from the selected series using nest
        var data = nested[series];

        // For object constancy we will need to set "keys", one for each type of data (column name) exclude all others.
        color.domain(d3.keys(data[0]).filter(function (key) { return (key !== "date" && key !== "type"); }));

        // Setting up color map
        var linedata = color.domain().map(function (name) {
            return {
                name: name,
                values: data.map(function (d) {
                    return { name: name, date: parseDate(d.date), value: parseFloat(d[name], 10) };
                })
            };
        });

        // Draw the line
        var line = d3.svg.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.value); })
            .interpolate('cardinal');



        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.time.scale()
            .domain([
                d3.min(linedata, function (c) { return d3.min(c.values, function (v) { return v.date; }); }),
                d3.max(linedata, function (c) { return d3.max(c.values, function (v) { return v.date; }); })
            ])
            .range([0, width]);

        // Vertical
        var y = d3.scale.linear()
            .domain([
                d3.min(linedata, function (c) { return d3.min(c.values, function (v) { return v.value; }); }),
                d3.max(linedata, function (c) { return d3.max(c.values, function (v) { return v.value; }); })
            ])
            .range([height, 0]);



        // Create axes
        // ------------------------------

        // Horizontal
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickPadding(8)
            .ticks(d3.time.days)
            .innerTickSize(4)
            .tickFormat(d3.time.format("%a")); // Display hours and minutes in 24h format

        // Vertical
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(6)
            .tickSize(0 - width)
            .tickPadding(8);



        //
        // Append chart elements
        //

        // Append axes
        // ------------------------------

        // Horizontal
        svg.append("g")
            .attr("class", "d3-axis d3-axis-horizontal d3-axis-solid")
            .attr("transform", "translate(0," + height + ")");

        // Vertical
        svg.append("g")
            .attr("class", "d3-axis d3-axis-vertical d3-axis-transparent");



        // Append lines
        // ------------------------------

        // Bind the data
        var lines = svg.selectAll(".lines")
            .data(linedata)

        // Append a group tag for each line
        var lineGroup = lines
            .enter()
            .append("g")
            .attr("class", "lines")
            .attr('id', function (d) { return d.name + "-line"; });

        // Append the line to the graph
        lineGroup.append("path")
            .attr("class", "d3-line d3-line-medium")
            .style("stroke", function (d) { return color(d.name); })
            .style('opacity', 0)
            .attr("d", function (d) { return line(d.values[0]); })
            .transition()
            .duration(500)
            .delay(function (d, i) { return i * 200; })
            .style('opacity', 1);



        // Append circles
        // ------------------------------

        var circles = lines.selectAll("circle")
            .data(function (d) { return d.values; })
            .enter()
            .append("circle")
            .attr("class", "d3-line-circle d3-line-circle-medium")
            .attr("cx", function (d, i) { return x(d.date) })
            .attr("cy", function (d, i) { return y(d.value) })
            .attr("r", 3)
            .style('fill', '#fff')
            .style("stroke", function (d) { return color(d.name); });

        // Add transition
        circles
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay(500)
            .style('opacity', 1);



        // Append tooltip
        // ------------------------------

        // Add tooltip on circle hover
        circles
            .on("mouseover", function (d) {
                tooltip.offset([-15, 0]).show(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 4);
            })
            .on("mouseout", function (d) {
                tooltip.hide(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 3);
            });

        // Change tooltip direction of first point
        // to always keep it inside chart, useful on mobiles
        lines.each(function (d) {
            d3.select(d3.select(this).selectAll('circle')[0][0])
                .on("mouseover", function (d) {
                    tooltip.offset([0, 15]).direction('e').show(d);

                    // Animate circle radius
                    d3.select(this).transition().duration(250).attr('r', 4);
                })
                .on("mouseout", function (d) {
                    tooltip.direction('n').hide(d);

                    // Animate circle radius
                    d3.select(this).transition().duration(250).attr('r', 3);
                });
        })

        // Change tooltip direction of last point
        // to always keep it inside chart, useful on mobiles
        lines.each(function (d) {
            d3.select(d3.select(this).selectAll('circle')[0][d3.select(this).selectAll('circle').size() - 1])
                .on("mouseover", function (d) {
                    tooltip.offset([0, -15]).direction('w').show(d);

                    // Animate circle radius
                    d3.select(this).transition().duration(250).attr('r', 4);
                })
                .on("mouseout", function (d) {
                    tooltip.direction('n').hide(d);

                    // Animate circle radius
                    d3.select(this).transition().duration(250).attr('r', 3);
                })
        })



        // Update chart on date change
        // ------------------------------

        // Set variable for updating visualization
        var lineUpdate = d3.transition(lines);

        // Update lines
        lineUpdate.select("path")
            .attr("d", function (d, i) { return line(d.values); });

        // Update circles
        lineUpdate.selectAll("circle")
            .attr("cy", function (d, i) { return y(d.value) })
            .attr("cx", function (d, i) { return x(d.date) });

        // Update vertical axes
        d3.transition(svg)
            .select(".d3-axis-vertical")
            .call(yAxis);

        // Update horizontal axes
        d3.transition(svg)
            .select(".d3-axis-horizontal")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);



        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', appSalesResize);

        // Call function on sidebar width change
        $(document).on('click', '.sidebar-control', appSalesResize);

        // Resize function
        // 
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to 
        // be updated on window resize
        function appSalesResize() {

            // Layout
            // -------------------------

            // Define width
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;

            // Main svg width
            container.attr("width", width + margin.left + margin.right);

            // Width of appended group
            svg.attr("width", width + margin.left + margin.right);

            // Horizontal range
            x.range([0, width]);

            // Vertical range
            y.range([height, 0]);


            // Chart elements
            // -------------------------

            // Horizontal axis
            svg.select('.d3-axis-horizontal').call(xAxis);

            // Vertical axis
            svg.select('.d3-axis-vertical').call(yAxis.tickSize(0 - width));

            // Lines
            svg.selectAll('.d3-line').attr("d", function (d, i) { return line(d.values); });

            // Circles
            svg.selectAll('.d3-line-circle').attr("cx", function (d, i) { return x(d.date) })
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    GetAllDataDaily();
    StockDataGet();
    GetCurrentAccYear();

    $("#refreshItem").click(function () {
        $("#txtDashboardBranch").val('');
        $("#txtDashboardBranch").attr("branchid", '');
        GetItemSales();
    })

    $("#refreshMonthWise").click(function () {
        $("#txtMonthWiseDashboardBranch").val('');
        $("#txtMonthWiseDashboardBranch").attr("branchid", '');
        GetMonthWiseSales();
    })

    $("#refreshDateWise").click(function () {
        $("#txtDateWiseDashboardBranch").val('');
        $("#txtDateWiseDashboardBranch").attr("branchid", '');
        GetDateWiseSales();
    })
    // Switchery toggles
    // ------------------------------

    var switches = Array.prototype.slice.call(document.querySelectorAll('.switch'));
    switches.forEach(function (html) {
        var switchery = new Switchery(html, { color: '#4CAF50' });
    });

    // Daterange picker
    // ------------------------------

    $('.daterange-ranges-monthwise').daterangepicker(
        {
            startDate: moment().subtract(6, 'months'),
            endDate: moment(),
            minDate: moment().subtract(12, 'months').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            //dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: $('html').attr('dir') == 'rtl' ? 'right' : 'left',
            applyClass: 'btn-small bg-slate-600 btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                format: 'MM/DD/YYYY',
                direction: $('html').attr('dir') == 'rtl' ? 'rtl' : 'ltr'
            }
        },
        function (start, end) {
            MonthWiseFromDate = start.format('YYYY-MM-DD');
            MonthWiseToDate = end.format('YYYY-MM-DD');
            $('.daterange-ranges-monthwise span').html(start.format('MMM YYYY') + ' - ' + end.format.format('MMM YYYY'));
            GetMonthWiseSales();
        }
    );

    $('.daterange-ranges-monthwise span').html(moment().subtract(6, 'months').format('MMM YYYY') + ' - ' + moment().format('MMM YYYY'));
    MonthWiseFromDate = moment().subtract(6, 'months').format('MMM YYYY');
    MonthWiseToDate = moment().format('MMM YYYY');
    GetMonthWiseSales();

    $('.daterange-ranges-datewise').daterangepicker(
        {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: moment().subtract(12, 'months').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            //dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: $('html').attr('dir') == 'rtl' ? 'right' : 'left',
            applyClass: 'btn-small bg-slate-600 btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                format: 'MM/DD/YYYY',
                direction: $('html').attr('dir') == 'rtl' ? 'rtl' : 'ltr'
            }
        },
        function (start, end) {
            DateWiseFromDate = start.format('YYYY-MM-DD');
            DateWiseToDate = end.format('YYYY-MM-DD');
            $('.daterange-ranges-datewise span').html(start.format('MMMM D') + ' - ' + end.format('MMMM D'));
            GetDateWiseSales();
        }
    );

    $('.daterange-ranges-datewise span').html(moment().subtract(29, 'days').format('MMMM D') + ' - ' + moment().format('MMMM D'));
    DateWiseFromDate = moment().subtract(29, 'days').format('YYYY-MM-DD');
    DateWiseToDate = moment().format('YYYY-MM-DD');

    $('.daterange-ranges').daterangepicker(
        {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: moment().subtract(12, 'months').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            //dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: $('html').attr('dir') == 'rtl' ? 'right' : 'left',
            applyClass: 'btn-small bg-slate-600 btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                format: 'MM/DD/YYYY',
                direction: $('html').attr('dir') == 'rtl' ? 'rtl' : 'ltr'
            }
        },
        function (start, end) {
            $('.daterange-ranges span').html(start.format('MMMM D') + ' - ' + end.format('MMMM D'));
            GetBranchWiseSales(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        }
    );

    $('.daterange-ranges span').html(moment().subtract(29, 'days').format('MMMM D') + ' - ' + moment().format('MMMM D'));

    $('.daterange-ranges-item').daterangepicker(
        {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: moment().subtract(12, 'months').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            //dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: $('html').attr('dir') == 'rtl' ? 'right' : 'left',
            applyClass: 'btn-small bg-slate-600 btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                format: 'MM/DD/YYYY',
                direction: $('html').attr('dir') == 'rtl' ? 'rtl' : 'ltr'
            }
        },
        function (start, end) {
            $('.daterange-ranges-item span').html(start.format('MMMM D') + ' - ' + end.format('MMMM D'));
            ItemFromDate = start.format('YYYY-MM-DD');
            ItemToDate = end.format('YYYY-MM-DD');
            GetItemSales();
        }
    );

    $('.daterange-ranges-item span').html(moment().subtract(29, 'days').format('MMMM D') + ' - ' + moment().format('MMMM D'));
    ItemFromDate = moment().subtract(29, 'days').format('YYYY-MM-DD');
    ItemToDate = moment().format('YYYY-MM-DD');

    $('.daterange-ranges-salesman').daterangepicker(
        {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: moment().subtract(12, 'months').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            //dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: $('html').attr('dir') == 'rtl' ? 'right' : 'left',
            applyClass: 'btn-small bg-slate-600 btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                format: 'MM/DD/YYYY',
                direction: $('html').attr('dir') == 'rtl' ? 'rtl' : 'ltr'
            }
        },
        function (start, end) {
            $('.daterange-ranges-salesman span').html(start.format('MMMM D') + ' - ' + end.format('MMMM D'));
            GetSalesmanSales(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        }
    );
    $('.daterange-ranges-salesman span').html(moment().subtract(29, 'days').format('MMMM D') + ' - ' + moment().format('MMMM D'));

    $('.daterange-ranges-group').daterangepicker(
        {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: moment().subtract(12, 'months').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            //dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: $('html').attr('dir') == 'rtl' ? 'right' : 'left',
            applyClass: 'btn-small bg-slate-600 btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                format: 'MM/DD/YYYY',
                direction: $('html').attr('dir') == 'rtl' ? 'rtl' : 'ltr'
            }
        },
        function (start, end) {
            $('.daterange-ranges-salesman group').html(start.format('MMMM D') + ' - ' + end.format('MMMM D'));
            GetGroupSales(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        }
    );
    $('.daterange-ranges-group span').html(moment().subtract(29, 'days').format('MMMM D') + ' - ' + moment().format('MMMM D'));

    $('.daterange-ranges-party').daterangepicker(
        {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: moment().subtract(12, 'months').format('MM/DD/YYYY'),
            maxDate: moment().format('MM/DD/YYYY'),
            //dateLimit: { days: 60 },
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            opens: $('html').attr('dir') == 'rtl' ? 'right' : 'left',
            applyClass: 'btn-small bg-slate-600 btn-block',
            cancelClass: 'btn-small btn-default btn-block',
            locale: {
                format: 'MM/DD/YYYY',
                direction: $('html').attr('dir') == 'rtl' ? 'rtl' : 'ltr'
            }
        },
        function (start, end) {
            $('.daterange-ranges-party group').html(start.format('MMMM D') + ' - ' + end.format('MMMM D'));
            GetPartySales(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));
        }
    );
    $('.daterange-ranges-party span').html(moment().subtract(29, 'days').format('MMMM D') + ' - ' + moment().format('MMMM D'));

    GetCombineData(moment().subtract(29, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

    // App sales lines chart
    // ------------------------------

    // initialize chart

    // Chart setup


    // App sales heatmap chart
    // ------------------------------

    //salesHeatmap(); // initialize chart

    // Chart setup
    function salesHeatmap() {


        // Load data
        // ------------------------------

        d3.csv(getDomain() + "/Content/assets/demo_data/dashboard/app_sales_heatmap.csv", function (error, data) {


            // Bind data
            // ------------------------------

            // Nest data
            var nested_data = d3.nest().key(function (d) { return d.app; }),
                nest = nested_data.entries(data);

            // Format date
            var format = d3.time.format("%Y/%m/%d %H:%M"),
                formatTime = d3.time.format("%H:%M");

            // Pull out values
            data.forEach(function (d, i) {
                d.date = format.parse(d.date),
                    d.value = +d.value
            });



            // Layout setup
            // ------------------------------

            //// Define main variables
            //var d3Container = d3.select('#sales-heatmap');
            //margin = { top: 20, right: 0, bottom: 30, left: 0 },
            //width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            //gridSize = width / new Date(data[data.length - 1].date).getHours(), // dynamically set grid size
            //rowGap = 40, // vertical gap between rows
            //height = (rowGap + gridSize) * (d3.max(nest, function (d, i) { return i + 1 })) - margin.top,
            //buckets = 5, // number of colors in range
            //colors = ["#DCEDC8", "#C5E1A5", "#9CCC65", "#7CB342", "#558B2F"];



            // Construct scales
            // ------------------------------

            // Horizontal
            var x = d3.time.scale().range([0, width]);

            // Vertical
            var y = d3.scale.linear().range([height, 0]);

            // Colors
            var colorScale = d3.scale.quantile()
                .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                .range(colors);



            // Set input domains
            // ------------------------------

            // Horizontal
            x.domain([new Date(data[0].date), d3.time.hour.offset(new Date(data[data.length - 1].date), 1)]);

            // Vertical
            y.domain([0, d3.max(data, function (d) { return d.app; })]);



            // Create chart
            // ------------------------------

            // Container
            var container = d3Container.append('svg');

            // SVG element
            var svg = container
                .attr('width', width + margin.left + margin.right)
                .attr("height", height + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



            //
            // Append chart elements
            //

            // App groups
            // ------------------------------

            // Add groups for each app
            var hourGroup = svg.selectAll('.hour-group')
                .data(nest)
                .enter()
                .append('g')
                .attr('class', 'hour-group')
                .attr("transform", function (d, i) { return "translate(0, " + ((gridSize + rowGap) * i) + ")"; });

            // Add app name
            hourGroup
                .append("text")
                .attr('class', 'app-label')
                .attr('x', 0)
                .attr('y', -(margin.top / 2))
                .text(function (d, i) { return d.key; });

            // Sales count text
            hourGroup
                .append("text")
                .attr('class', 'sales-count')
                .attr('x', width)
                .attr('y', -(margin.top / 2))
                .style('text-anchor', 'end')
                .text(function (d, i) { return d3.sum(d.values, function (d) { return d.value; }) + " sales today" });



            // Add map elements
            // ------------------------------

            // Add map squares
            var heatMap = hourGroup.selectAll(".heatmap-hour")
                .data(function (d) { return d.values })
                .enter()
                .append("rect")
                .attr("x", function (d, i) { return x(d.date); })
                .attr("y", 0)
                .attr("class", "heatmap-hour")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("fill", '#fff')
                .style('stroke', '#fff')
                .style('cursor', 'pointer')
                .style('shape-rendering', 'crispEdges');

            // Add loading transition    
            heatMap.transition()
                .duration(250)
                .delay(function (d, i) { return i * 20; })
                .style("fill", function (d) { return colorScale(d.value); })

            // Add user interaction
            hourGroup.each(function (d) {
                heatMap
                    .on("mouseover", function (d, i) {
                        d3.select(this).style('opacity', 0.75);
                        d3.select(this.parentNode).select('.sales-count').text(function (d) { return d.values[i].value + " sales at " + formatTime(d.values[i].date); })
                    })
                    .on("mouseout", function (d, i) {
                        d3.select(this).style('opacity', 1);
                        d3.select(this.parentNode).select('.sales-count').text(function (d, i) { return d3.sum(d.values, function (d) { return d.value; }) + " sales today" })
                    })
            })



            // Add legend
            // ------------------------------

            // Get min and max values
            var minValue, maxValue;
            data.forEach(function (d, i) {
                maxValue = d3.max(data, function (d) { return d.value; });
                minValue = d3.min(data, function (d) { return d.value; });
            });

            // Place legend inside separate group
            var legendGroup = svg.append('g')
                .attr('class', 'legend-group')
                .attr('width', width)
                .attr("transform", "translate(" + ((width / 2) - ((buckets * gridSize)) / 2) + "," + (height + (margin.bottom - margin.top)) + ")");

            // Then group legend elements
            var legend = legendGroup.selectAll(".heatmap-legend")
                .data([0].concat(colorScale.quantiles()), function (d) { return d; })
                .enter()
                .append("g")
                .attr("class", "heatmap-legend");

            // Add legend items
            legend.append("rect")
                .attr('class', 'heatmap-legend-item')
                .attr("x", function (d, i) { return gridSize * i; })
                .attr("y", -8)
                .attr("width", gridSize)
                .attr("height", 5)
                .style('stroke', '#fff')
                .style('shape-rendering', 'crispEdges')
                .style("fill", function (d, i) { return colors[i]; });

            // Add min value text label
            legendGroup.append("text")
                .attr("class", "min-legend-value")
                .attr("x", -10)
                .attr("y", -2)
                .style('text-anchor', 'end')
                .style('font-size', 11)
                .style('fill', '#999')
                .text(minValue);

            // Add max value text label
            legendGroup.append("text")
                .attr("class", "max-legend-value")
                .attr("x", (buckets * gridSize) + 10)
                .attr("y", -2)
                .style('font-size', 11)
                .style('fill', '#999')
                .text(maxValue);



            // Resize chart
            // ------------------------------

            // Call function on window resize
            $(window).on('resize', resizeHeatmap);

            // Call function on sidebar width change
            $(document).on('click', '.sidebar-control', resizeHeatmap);

            // Resize function
            // 
            // Since D3 doesn't support SVG resize by default,
            // we need to manually specify parts of the graph that need to 
            // be updated on window resize
            function resizeHeatmap() {

                // Layout
                // -------------------------

                // Width
                width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,

                    // Grid size
                    gridSize = width / new Date(data[data.length - 1].date).getHours(),

                    // Height
                    height = (rowGap + gridSize) * (d3.max(nest, function (d, i) { return i + 1 })) - margin.top,

                    // Main svg width
                    container.attr("width", width + margin.left + margin.right).attr("height", height + margin.bottom);

                // Width of appended group
                svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.bottom);

                // Horizontal range
                x.range([0, width]);


                // Chart elements
                // -------------------------

                // Groups for each app
                svg.selectAll('.hour-group')
                    .attr("transform", function (d, i) { return "translate(0, " + ((gridSize + rowGap) * i) + ")"; });

                // Map squares
                svg.selectAll(".heatmap-hour")
                    .attr("width", gridSize)
                    .attr("height", gridSize)
                    .attr("x", function (d, i) { return x(d.date); });

                // Legend group
                svg.selectAll('.legend-group')
                    .attr("transform", "translate(" + ((width / 2) - ((buckets * gridSize)) / 2) + "," + (height + margin.bottom - margin.top) + ")");

                // Sales count text
                svg.selectAll('.sales-count')
                    .attr("x", width);

                // Legend item
                svg.selectAll('.heatmap-legend-item')
                    .attr("width", gridSize)
                    .attr("x", function (d, i) { return gridSize * i; });

                // Max value text label
                svg.selectAll('.max-legend-value')
                    .attr("x", (buckets * gridSize) + 10);
            }
        });
    }


    // Monthly app sales area chart
    // ------------------------------


    // Messages area chart
    // ------------------------------

    //messagesArea("#messages-stats", 40, '#5C6BC0'); // initialize chart

    // Chart setup
    function messagesArea(element, height, color) {


        // Basic setup
        // ------------------------------

        // Define main variables
        var d3Container = d3.select(element),
            margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height = height - margin.top - margin.bottom;

        // Date and time format
        var parseDate = d3.time.format('%Y-%m-%d').parse;


        // Create SVG
        // ------------------------------

        // Container
        var container = d3Container.append('svg');

        // SVG element
        var svg = container
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        // Construct chart layout
        // ------------------------------

        // Area
        var area = d3.svg.area()
            .x(function (d) { return x(d.date); })
            .y0(height)
            .y1(function (d) { return y(d.value); })
            .interpolate('monotone')


        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.time.scale().range([0, width]);

        // Vertical
        var y = d3.scale.linear().range([height, 0]);


        // Load data
        // ------------------------------

        d3.json(getDomain() + "assets/demo_data/dashboard/monthly_sales.json", function (error, data) {

            // Show what's wrong if error
            if (error) return console.error(error);

            // Pull out values
            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.value = +d.value;
            });

            // Get the maximum value in the given array
            var maxY = d3.max(data, function (d) { return d.value; });

            // Reset start data for animation
            var startData = data.map(function (datum) {
                return {
                    date: datum.date,
                    value: 0
                };
            });


            // Set input domains
            // ------------------------------

            // Horizontal
            x.domain(d3.extent(data, function (d, i) { return d.date; }));

            // Vertical
            y.domain([0, d3.max(data, function (d) { return d.value; })]);



            //
            // Append chart elements
            //

            // Add area path
            svg.append("path")
                .datum(data)
                .attr("class", "d3-area")
                .style('fill', color)
                .attr("d", area)
                .transition() // begin animation
                .duration(1000)
                .attrTween('d', function () {
                    var interpolator = d3.interpolateArray(startData, data);
                    return function (t) {
                        return area(interpolator(t));
                    }
                });


            // Resize chart
            // ------------------------------

            // Call function on window resize
            $(window).on('resize', messagesAreaResize);

            // Call function on sidebar width change
            $(document).on('click', '.sidebar-control', messagesAreaResize);

            // Resize function
            // 
            // Since D3 doesn't support SVG resize by default,
            // we need to manually specify parts of the graph that need to 
            // be updated on window resize
            function messagesAreaResize() {

                // Layout variables
                width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


                // Layout
                // -------------------------

                // Main svg width
                container.attr("width", width + margin.left + margin.right);

                // Width of appended group
                svg.attr("width", width + margin.left + margin.right);

                // Horizontal range
                x.range([0, width]);


                // Chart elements
                // -------------------------

                // Area path
                svg.selectAll('.d3-area').datum(data).attr("d", area);
            }
        });
    }


    // Sparklines
    // ------------------------------

    // Initialize chart
    //sparkline("#new-visitors", "line", 30, 35, "basis", 750, 2000, "#26A69A");
    //sparkline("#new-sessions", "line", 30, 35, "basis", 750, 2000, "#FF7043");
    //sparkline("#total-online", "line", 30, 35, "basis", 750, 2000, "#5C6BC0");
    //sparkline("#server-load", "area", 30, 50, "basis", 750, 2000, "rgba(255,255,255,0.5)");

    // Chart setup
    function sparkline(element, chartType, qty, height, interpolation, duration, interval, color) {


        // Basic setup
        // ------------------------------

        // Define main variables
        var d3Container = d3.select(element),
            margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height = height - margin.top - margin.bottom;


        // Generate random data (for demo only)
        var data = [];
        for (var i = 0; i < qty; i++) {
            data.push(Math.floor(Math.random() * qty) + 5)
        }



        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.scale.linear().range([0, width]);

        // Vertical
        var y = d3.scale.linear().range([height - 5, 5]);



        // Set input domains
        // ------------------------------

        // Horizontal
        x.domain([1, qty - 3])

        // Vertical
        y.domain([0, qty])



        // Construct chart layout
        // ------------------------------

        // Line
        var line = d3.svg.line()
            .interpolate(interpolation)
            .x(function (d, i) { return x(i); })
            .y(function (d, i) { return y(d); });

        // Area
        var area = d3.svg.area()
            .interpolate(interpolation)
            .x(function (d, i) {
                return x(i);
            })
            .y0(height)
            .y1(function (d) {
                return y(d);
            });



        // Create SVG
        // ------------------------------

        // Container
        var container = d3Container.append('svg');

        // SVG element
        var svg = container
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        // Add mask for animation
        // ------------------------------

        // Add clip path
        var clip = svg.append("defs")
            .append("clipPath")
            .attr('id', function (d, i) { return "load-clip-" + element.substring(1) })

        // Add clip shape
        var clips = clip.append("rect")
            .attr('class', 'load-clip')
            .attr("width", 0)
            .attr("height", height);

        // Animate mask
        clips
            .transition()
            .duration(1000)
            .ease('linear')
            .attr("width", width);



        //
        // Append chart elements
        //

        // Main path
        var path = svg.append("g")
            .attr("clip-path", function (d, i) { return "url(#load-clip-" + element.substring(1) + ")" })
            .append("path")
            .datum(data)
            .attr("transform", "translate(" + x(0) + ",0)");

        // Add path based on chart type
        if (chartType == "area") {
            path.attr("d", area).attr('class', 'd3-area').style("fill", color); // area
        }
        else {
            path.attr("d", line).attr("class", "d3-line d3-line-medium").style('stroke', color); // line
        }

        // Animate path
        path
            .style('opacity', 0)
            .transition()
            .duration(750)
            .style('opacity', 1);



        // Set update interval. For demo only
        // ------------------------------

        setInterval(function () {

            // push a new data point onto the back
            data.push(Math.floor(Math.random() * qty) + 5);

            // pop the old data point off the front
            data.shift();

            update();

        }, interval);



        // Update random data. For demo only
        // ------------------------------

        function update() {

            // Redraw the path and slide it to the left
            path
                .attr("transform", null)
                .transition()
                .duration(duration)
                .ease("linear")
                .attr("transform", "translate(" + x(0) + ",0)");

            // Update path type
            if (chartType == "area") {
                path.attr("d", area).attr('class', 'd3-area').style("fill", color)
            }
            else {
                path.attr("d", line).attr("class", "d3-line d3-line-medium").style('stroke', color);
            }
        }



        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', resizeSparklines);

        // Call function on sidebar width change
        $(document).on('click', '.sidebar-control', resizeSparklines);

        // Resize function
        // 
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to 
        // be updated on window resize
        function resizeSparklines() {

            // Layout variables
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


            // Layout
            // -------------------------

            // Main svg width
            container.attr("width", width + margin.left + margin.right);

            // Width of appended group
            svg.attr("width", width + margin.left + margin.right);

            // Horizontal range
            x.range([0, width]);


            // Chart elements
            // -------------------------

            // Clip mask
            clips.attr("width", width);

            // Line
            svg.select(".d3-line").attr("d", line);

            // Area
            svg.select(".d3-area").attr("d", area);
        }
    }


    // Daily revenue line chart
    // ------------------------------

    //dailyRevenue('#today-revenue', 50); // initialize chart

    // Chart setup
    function dailyRevenue(element, height) {


        // Basic setup
        // ------------------------------

        // Add data set
        var dataset = [
            {
                "date": "04/13/14",
                "alpha": "60"
            }, {
                "date": "04/14/14",
                "alpha": "35"
            }, {
                "date": "04/15/14",
                "alpha": "65"
            }, {
                "date": "04/16/14",
                "alpha": "50"
            }, {
                "date": "04/17/14",
                "alpha": "65"
            }, {
                "date": "04/18/14",
                "alpha": "20"
            }, {
                "date": "04/19/14",
                "alpha": "60"
            }
        ];

        // Main variables
        var d3Container = d3.select(element),
            margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height = height - margin.top - margin.bottom,
            padding = 20;

        // Format date
        var parseDate = d3.time.format("%m/%d/%y").parse,
            formatDate = d3.time.format("%a, %B %e");



        // Add tooltip
        // ------------------------------

        var tooltip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function (d) {
                return "<ul class='list-unstyled mb-5'>" +
                    "<li>" + "<div class='text-size-base mt-5 mb-5'><i class='icon-check2 position-left'></i>" + formatDate(d.date) + "</div>" + "</li>" +
                    "<li>" + "Sales: &nbsp;" + "<span class='text-semibold pull-right'>" + d.alpha + "</span>" + "</li>" +
                    "<li>" + "Revenue: &nbsp; " + "<span class='text-semibold pull-right'>" + "$" + (d.alpha * 25).toFixed(2) + "</span>" + "</li>" +
                    "</ul>";
            });



        // Create chart
        // ------------------------------

        // Add svg element
        var container = d3Container.append('svg');

        // Add SVG group
        var svg = container
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(tooltip);



        // Load data
        // ------------------------------

        dataset.forEach(function (d) {
            d.date = parseDate(d.date);
            d.alpha = +d.alpha;
        });



        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.time.scale()
            .range([padding, width - padding]);

        // Vertical
        var y = d3.scale.linear()
            .range([height, 5]);



        // Set input domains
        // ------------------------------

        // Horizontal
        x.domain(d3.extent(dataset, function (d) {
            return d.date;
        }));

        // Vertical
        y.domain([0, d3.max(dataset, function (d) {
            return Math.max(d.alpha);
        })]);



        // Construct chart layout
        // ------------------------------

        // Line
        var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.alpha)
            });



        //
        // Append chart elements
        //

        // Add mask for animation
        // ------------------------------

        // Add clip path
        var clip = svg.append("defs")
            .append("clipPath")
            .attr("id", "clip-line-small");

        // Add clip shape
        var clipRect = clip.append("rect")
            .attr('class', 'clip')
            .attr("width", 0)
            .attr("height", height);

        // Animate mask
        clipRect
            .transition()
            .duration(1000)
            .ease('linear')
            .attr("width", width);



        // Line
        // ------------------------------

        // Path
        var path = svg.append('path')
            .attr({
                'd': line(dataset),
                "clip-path": "url(#clip-line-small)",
                'class': 'd3-line d3-line-medium'
            })
            .style('stroke', '#fff');

        // Animate path
        svg.select('.line-tickets')
            .transition()
            .duration(1000)
            .ease('linear');



        // Add vertical guide lines
        // ------------------------------

        // Bind data
        var guide = svg.append('g')
            .selectAll('.d3-line-guides-group')
            .data(dataset);

        // Append lines
        guide
            .enter()
            .append('line')
            .attr('class', 'd3-line-guides')
            .attr('x1', function (d, i) {
                return x(d.date);
            })
            .attr('y1', function (d, i) {
                return height;
            })
            .attr('x2', function (d, i) {
                return x(d.date);
            })
            .attr('y2', function (d, i) {
                return height;
            })
            .style('stroke', 'rgba(255,255,255,0.3)')
            .style('stroke-dasharray', '4,2')
            .style('shape-rendering', 'crispEdges');

        // Animate guide lines
        guide
            .transition()
            .duration(1000)
            .delay(function (d, i) { return i * 150; })
            .attr('y2', function (d, i) {
                return y(d.alpha);
            });



        // Alpha app points
        // ------------------------------

        // Add points
        var points = svg.insert('g')
            .selectAll('.d3-line-circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('class', 'd3-line-circle d3-line-circle-medium')
            .attr("cx", line.x())
            .attr("cy", line.y())
            .attr("r", 3)
            .style('stroke', '#fff')
            .style('fill', '#29B6F6');



        // Animate points on page load
        points
            .style('opacity', 0)
            .transition()
            .duration(250)
            .ease('linear')
            .delay(1000)
            .style('opacity', 1);


        // Add user interaction
        points
            .on("mouseover", function (d) {
                tooltip.offset([-10, 0]).show(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 4);
            })

            // Hide tooltip
            .on("mouseout", function (d) {
                tooltip.hide(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 3);
            });

        // Change tooltip direction of first point
        d3.select(points[0][0])
            .on("mouseover", function (d) {
                tooltip.offset([0, 10]).direction('e').show(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 4);
            })
            .on("mouseout", function (d) {
                tooltip.direction('n').hide(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 3);
            });

        // Change tooltip direction of last point
        d3.select(points[0][points.size() - 1])
            .on("mouseover", function (d) {
                tooltip.offset([0, -10]).direction('w').show(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 4);
            })
            .on("mouseout", function (d) {
                tooltip.direction('n').hide(d);

                // Animate circle radius
                d3.select(this).transition().duration(250).attr('r', 3);
            })



        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', revenueResize);

        // Call function on sidebar width change
        $(document).on('click', '.sidebar-control', revenueResize);

        // Resize function
        // 
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to 
        // be updated on window resize
        function revenueResize() {

            // Layout variables
            width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


            // Layout
            // -------------------------

            // Main svg width
            container.attr("width", width + margin.left + margin.right);

            // Width of appended group
            svg.attr("width", width + margin.left + margin.right);

            // Horizontal range
            x.range([padding, width - padding]);


            // Chart elements
            // -------------------------

            // Mask
            clipRect.attr("width", width);

            // Line path
            svg.selectAll('.d3-line').attr("d", line(dataset));

            // Circles
            svg.selectAll('.d3-line-circle').attr("cx", line.x());

            // Guide lines
            svg.selectAll('.d3-line-guides')
                .attr('x1', function (d, i) {
                    return x(d.date);
                })
                .attr('x2', function (d, i) {
                    return x(d.date);
                });
        }
    }


    // Marketing campaigns progress pie chart
    // ------------------------------

    // Initialize chart
    progressMeter("#today-progress", 20, 20, '#7986CB');
    progressMeter("#yesterday-progress", 20, 20, '#7986CB');

    // Chart setup
    function progressMeter(element, width, height, color) {


        // Basic setup
        // ------------------------------

        // Main variables
        var d3Container = d3.select(element),
            border = 2,
            radius = Math.min(width / 2, height / 2) - border,
            twoPi = 2 * Math.PI,
            progress = $(element).data('progress'),
            total = 100;



        // Construct chart layout
        // ------------------------------

        // Arc
        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(0)
            .outerRadius(radius)
            .endAngle(function (d) {
                return (d.value / d.size) * 2 * Math.PI;
            })



        // Create chart
        // ------------------------------

        // Add svg element
        var container = d3Container.append("svg");

        // Add SVG group
        var svg = container
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



        //
        // Append chart elements
        //

        // Progress group
        var meter = svg.append("g")
            .attr("class", "progress-meter");

        // Background
        meter.append("path")
            .attr("d", arc.endAngle(twoPi))
            .style('fill', '#fff')
            .style('stroke', color)
            .style('stroke-width', 1.5);

        // Foreground
        var foreground = meter.append("path")
            .style('fill', color);

        // Animate foreground path
        foreground
            .transition()
            .ease("cubic-out")
            .duration(2500)
            .attrTween("d", arcTween);


        // Tween arcs
        function arcTween() {
            var i = d3.interpolate(0, progress);
            return function (t) {
                var currentProgress = progress / (100 / t);
                var endAngle = arc.endAngle(twoPi * (currentProgress));
                return arc(i(endAngle));
            };
        }
    }


    // Marketing campaigns donut chart
    // ------------------------------

    // Initialize chart
    //campaignDonut("#campaigns-donut", 42);

    // Chart setup
    function campaignDonut(element, size) {


        // Basic setup
        // ------------------------------

        // Add data set
        var data = [
            {
                "browser": "Google Adwords",
                "icon": "<i class='icon-google position-left'></i>",
                "value": 1047,
                "color": "#66BB6A"
            }, {
                "browser": "Social media",
                "icon": "<i class='icon-share4 position-left'></i>",
                "value": 2948,
                "color": "#9575CD"
            }, {
                "browser": "Youtube video",
                "icon": "<i class='icon-youtube position-left'></i>",
                "value": 3909,
                "color": "#FF7043"
            }
        ];

        // Main variables
        var d3Container = d3.select(element),
            distance = 2, // reserve 2px space for mouseover arc moving
            radius = (size / 2) - distance,
            sum = d3.sum(data, function (d) { return d.value; })



        // Tooltip
        // ------------------------------

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .direction('e')
            .html(function (d) {
                return "<ul class='list-unstyled mb-5'>" +
                    "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.browser + "</div>" + "</li>" +
                    "<li>" + "Visits: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
                    "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
                    "</ul>";
            })



        // Create chart
        // ------------------------------

        // Add svg element
        var container = d3Container.append("svg").call(tip);

        // Add SVG group
        var svg = container
            .attr("width", size)
            .attr("height", size)
            .append("g")
            .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");



        // Construct chart layout
        // ------------------------------

        // Pie
        var pie = d3.layout.pie()
            .sort(null)
            .startAngle(Math.PI)
            .endAngle(3 * Math.PI)
            .value(function (d) {
                return d.value;
            });

        // Arc
        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius / 2);



        //
        // Append chart elements
        //

        // Group chart elements
        var arcGroup = svg.selectAll(".d3-arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "d3-arc")
            .style('stroke', '#fff')
            .style('cursor', 'pointer');

        // Append path
        var arcPath = arcGroup
            .append("path")
            .style("fill", function (d) { return d.data.color; });

        // Add tooltip
        arcPath
            .on('mouseover', function (d, i) {

                // Transition on mouseover
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('elastic')
                    .attr('transform', function (d) {
                        d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
                        var x = Math.sin(d.midAngle) * distance;
                        var y = -Math.cos(d.midAngle) * distance;
                        return 'translate(' + x + ',' + y + ')';
                    });
            })

            .on("mousemove", function (d) {

                // Show tooltip on mousemove
                tip.show(d)
                    .style("top", (d3.event.pageY - 40) + "px")
                    .style("left", (d3.event.pageX + 30) + "px");
            })

            .on('mouseout', function (d, i) {

                // Mouseout transition
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr('transform', 'translate(0,0)');

                // Hide tooltip
                tip.hide(d);
            });

        // Animate chart on load
        arcPath
            .transition()
            .delay(function (d, i) { return i * 500; })
            .duration(500)
            .attrTween("d", function (d) {
                var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return arc(d);
                };
            });
    }


    // Campaign status donut chart
    // ------------------------------

    // Initialize chart
    //campaignStatusPie("#campaign-status-pie", 42);

    // Chart setup
    function campaignStatusPie(element, size) {


        // Basic setup
        // ------------------------------

        // Add data set
        var data = [
            {
                "status": "Active campaigns",
                "icon": "<span class='status-mark border-blue-300 position-left'></span>",
                "value": 439,
                "color": "#29B6F6"
            }, {
                "status": "Closed campaigns",
                "icon": "<span class='status-mark border-danger-300 position-left'></span>",
                "value": 290,
                "color": "#EF5350"
            }, {
                "status": "Pending campaigns",
                "icon": "<span class='status-mark border-success-300 position-left'></span>",
                "value": 190,
                "color": "#81C784"
            }, {
                "status": "Campaigns on hold",
                "icon": "<span class='status-mark border-grey-300 position-left'></span>",
                "value": 148,
                "color": "#999"
            }
        ];

        // Main variables
        var d3Container = d3.select(element),
            distance = 2, // reserve 2px space for mouseover arc moving
            radius = (size / 2) - distance,
            sum = d3.sum(data, function (d) { return d.value; })



        // Tooltip
        // ------------------------------

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .direction('e')
            .html(function (d) {
                return "<ul class='list-unstyled mb-5'>" +
                    "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
                    "<li>" + "Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
                    "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
                    "</ul>";
            })



        // Create chart
        // ------------------------------

        // Add svg element
        var container = d3Container.append("svg").call(tip);

        // Add SVG group
        var svg = container
            .attr("width", size)
            .attr("height", size)
            .append("g")
            .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");



        // Construct chart layout
        // ------------------------------

        // Pie
        var pie = d3.layout.pie()
            .sort(null)
            .startAngle(Math.PI)
            .endAngle(3 * Math.PI)
            .value(function (d) {
                return d.value;
            });

        // Arc
        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius / 2);



        //
        // Append chart elements
        //

        // Group chart elements
        var arcGroup = svg.selectAll(".d3-arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "d3-arc")
            .style('stroke', '#fff')
            .style('cursor', 'pointer');

        // Append path
        var arcPath = arcGroup
            .append("path")
            .style("fill", function (d) { return d.data.color; });

        // Add tooltip
        arcPath
            .on('mouseover', function (d, i) {

                // Transition on mouseover
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('elastic')
                    .attr('transform', function (d) {
                        d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
                        var x = Math.sin(d.midAngle) * distance;
                        var y = -Math.cos(d.midAngle) * distance;
                        return 'translate(' + x + ',' + y + ')';
                    });
            })

            .on("mousemove", function (d) {

                // Show tooltip on mousemove
                tip.show(d)
                    .style("top", (d3.event.pageY - 40) + "px")
                    .style("left", (d3.event.pageX + 30) + "px");
            })

            .on('mouseout', function (d, i) {

                // Mouseout transition
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr('transform', 'translate(0,0)');

                // Hide tooltip
                tip.hide(d);
            });

        // Animate chart on load
        arcPath
            .transition()
            .delay(function (d, i) { return i * 500; })
            .duration(500)
            .attrTween("d", function (d) {
                var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return arc(d);
                };
            });
    }


    // Tickets status donut chart
    // ------------------------------

    // Initialize chart
    //ticketStatusDonut("#tickets-status", 42);

    // Chart setup
    function ticketStatusDonut(element, size) {


        // Basic setup
        // ------------------------------

        // Add data set
        var data = [
            {
                "status": "Pending tickets",
                "icon": "<i class='status-mark border-blue-300 position-left'></i>",
                "value": 295,
                "color": "#29B6F6"
            }, {
                "status": "Resolved tickets",
                "icon": "<i class='status-mark border-success-300 position-left'></i>",
                "value": 189,
                "color": "#66BB6A"
            }, {
                "status": "Closed tickets",
                "icon": "<i class='status-mark border-danger-300 position-left'></i>",
                "value": 277,
                "color": "#EF5350"
            }
        ];

        // Main variables
        var d3Container = d3.select(element),
            distance = 2, // reserve 2px space for mouseover arc moving
            radius = (size / 2) - distance,
            sum = d3.sum(data, function (d) { return d.value; })



        // Tooltip
        // ------------------------------

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .direction('e')
            .html(function (d) {
                return "<ul class='list-unstyled mb-5'>" +
                    "<li>" + "<div class='text-size-base mb-5 mt-5'>" + d.data.icon + d.data.status + "</div>" + "</li>" +
                    "<li>" + "Total: &nbsp;" + "<span class='text-semibold pull-right'>" + d.value + "</span>" + "</li>" +
                    "<li>" + "Share: &nbsp;" + "<span class='text-semibold pull-right'>" + (100 / (sum / d.value)).toFixed(2) + "%" + "</span>" + "</li>" +
                    "</ul>";
            })



        // Create chart
        // ------------------------------

        // Add svg element
        var container = d3Container.append("svg").call(tip);

        // Add SVG group
        var svg = container
            .attr("width", size)
            .attr("height", size)
            .append("g")
            .attr("transform", "translate(" + (size / 2) + "," + (size / 2) + ")");



        // Construct chart layout
        // ------------------------------

        // Pie
        var pie = d3.layout.pie()
            .sort(null)
            .startAngle(Math.PI)
            .endAngle(3 * Math.PI)
            .value(function (d) {
                return d.value;
            });

        // Arc
        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius / 2);



        //
        // Append chart elements
        //

        // Group chart elements
        var arcGroup = svg.selectAll(".d3-arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "d3-arc")
            .style('stroke', '#fff')
            .style('cursor', 'pointer');

        // Append path
        var arcPath = arcGroup
            .append("path")
            .style("fill", function (d) { return d.data.color; });

        // Add tooltip
        arcPath
            .on('mouseover', function (d, i) {

                // Transition on mouseover
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('elastic')
                    .attr('transform', function (d) {
                        d.midAngle = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
                        var x = Math.sin(d.midAngle) * distance;
                        var y = -Math.cos(d.midAngle) * distance;
                        return 'translate(' + x + ',' + y + ')';
                    });
            })

            .on("mousemove", function (d) {

                // Show tooltip on mousemove
                tip.show(d)
                    .style("top", (d3.event.pageY - 40) + "px")
                    .style("left", (d3.event.pageX + 30) + "px");
            })

            .on('mouseout', function (d, i) {

                // Mouseout transition
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr('transform', 'translate(0,0)');

                // Hide tooltip
                tip.hide(d);
            });

        // Animate chart on load
        arcPath
            .transition()
            .delay(function (d, i) { return i * 500; })
            .duration(500)
            .attrTween("d", function (d) {
                var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return arc(d);
                };
            });
    }


    // Bar charts with random data
    // ------------------------------

    // Initialize charts
    //generateBarChart("#hours-available-bars", 24, 40, true, "elastic", 1200, 50, "#EC407A", "hours");
    //generateBarChart("#goal-bars", 24, 40, true, "elastic", 1200, 50, "#5C6BC0", "goal");
    //generateBarChart("#members-online", 24, 50, true, "elastic", 1200, 50, "rgba(255,255,255,0.5)", "members");

    // Chart setup
    function generateBarChart(element, barQty, height, animate, easing, duration, delay, color, tooltip) {
        // Basic setup
        // ------------------------------

        // Add data set
        var bardata = [];
        for (var i = 0; i < barQty; i++) {
            bardata.push(Math.round(Math.random() * 10) + 10)
        }

        // Main variables
        var d3Container = d3.select(element),
            width = d3Container.node().getBoundingClientRect().width;

        // Construct scales
        // ------------------------------

        // Horizontal
        var x = d3.scale.ordinal()
            .rangeBands([0, width], 0.3)

        // Vertical
        var y = d3.scale.linear()
            .range([0, height]);

        // Set input domains
        // ------------------------------

        // Horizontal
        x.domain(d3.range(0, bardata.length))

        // Vertical
        y.domain([0, d3.max(bardata)])



        // Create chart
        // ------------------------------

        // Add svg element
        var container = d3Container.append('svg');

        // Add SVG group
        var svg = container
            .attr('width', width)
            .attr('height', height)
            .append('g');
        //
        // Append chart elements
        //

        // Bars
        var bars = svg.selectAll('rect')
            .data(bardata)
            .enter()
            .append('rect')
            .attr('class', 'd3-random-bars')
            .attr('width', x.rangeBand())
            .attr('x', function (d, i) {
                return x(i);
            })
            .style('fill', color);

        // Tooltip
        // ------------------------------

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0]);

        // Show and hide
        if (tooltip == "hours" || tooltip == "goal" || tooltip == "members") {
            bars.call(tip)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);
        }

        // Daily meetings tooltip content
        if (tooltip == "hours") {
            tip.html(function (d, i) {
                return "<div class='text-center'>" +
                    "<h6 class='no-margin'>" + d + "</h6>" +
                    "<span class='text-size-small'>meetings</span>" +
                    "<div class='text-size-small'>" + i + ":00" + "</div>" +
                    "</div>"
            });
        }

        // Statements tooltip content
        if (tooltip == "goal") {
            tip.html(function (d, i) {
                return "<div class='text-center'>" +
                    "<h6 class='no-margin'>" + d + "</h6>" +
                    "<span class='text-size-small'>statements</span>" +
                    "<div class='text-size-small'>" + i + ":00" + "</div>" +
                    "</div>"
            });
        }

        // Online members tooltip content
        if (tooltip == "members") {
            tip.html(function (d, i) {
                return "<div class='text-center'>" +
                    "<h6 class='no-margin'>" + d + "0" + "</h6>" +
                    "<span class='text-size-small'>members</span>" +
                    "<div class='text-size-small'>" + i + ":00" + "</div>" +
                    "</div>"
            });
        }

        // Bar loading animation
        // ------------------------------

        // Choose between animated or static
        if (animate) {
            withAnimation();
        } else {
            withoutAnimation();
        }

        // Animate on load
        function withAnimation() {
            bars
                .attr('height', 0)
                .attr('y', height)
                .transition()
                .attr('height', function (d) {
                    return y(d);
                })
                .attr('y', function (d) {
                    return height - y(d);
                })
                .delay(function (d, i) {
                    return i * delay;
                })
                .duration(duration)
                .ease(easing);
        }

        // Load without animateion
        function withoutAnimation() {
            bars
                .attr('height', function (d) {
                    return y(d);
                })
                .attr('y', function (d) {
                    return height - y(d);
                })
        }

        // Resize chart
        // ------------------------------

        // Call function on window resize
        $(window).on('resize', barsResize);

        // Call function on sidebar width change
        $(document).on('click', '.sidebar-control', barsResize);

        // Resize function
        // 
        // Since D3 doesn't support SVG resize by default,
        // we need to manually specify parts of the graph that need to 
        // be updated on window resize
        function barsResize() {

            // Layout variables
            width = d3Container.node().getBoundingClientRect().width;


            // Layout
            // -------------------------

            // Main svg width
            container.attr("width", width);

            // Width of appended group
            svg.attr("width", width);

            // Horizontal range
            x.rangeBands([0, width], 0.3);


            // Chart elements
            // -------------------------

            // Bars
            svg.selectAll('.d3-random-bars')
                .attr('width', x.rangeBand())
                .attr('x', function (d, i) {
                    return x(i);
                });
        }
    }

    // Animated progress chart
    // ------------------------------

    // Initialize charts
    progressCounter('#hours-available-progress', 38, 2, "#F06292", 0.68, "icon-watch text-pink-400", 'Hours available', '64% average')
    progressCounter('#goal-progress', 38, 2, "#5C6BC0", 0.82, "icon-trophy3 text-indigo-400", 'Productivity goal', '87% average')

    // Chart setup
    function progressCounter(element, radius, border, color, end, iconClass, textTitle, textAverage) {


        // Basic setup
        // ------------------------------

        // Main variables
        var d3Container = d3.select(element),
            startPercent = 0,
            iconSize = 32,
            endPercent = end,
            twoPi = Math.PI * 2,
            formatPercent = d3.format('.0%'),
            boxSize = radius * 2;

        // Values count
        var count = Math.abs((endPercent - startPercent) / 0.01);

        // Values step
        var step = endPercent < startPercent ? -0.01 : 0.01;



        // Create chart
        // ------------------------------

        // Add SVG element
        var container = d3Container.append('svg');

        // Add SVG group
        var svg = container
            .attr('width', boxSize)
            .attr('height', boxSize)
            .append('g')
            .attr('transform', 'translate(' + (boxSize / 2) + ',' + (boxSize / 2) + ')');



        // Construct chart layout
        // ------------------------------

        // Arc
        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - border);



        //
        // Append chart elements
        //

        // Paths
        // ------------------------------

        // Background path
        svg.append('path')
            .attr('class', 'd3-progress-background')
            .attr('d', arc.endAngle(twoPi))
            .style('fill', '#eee');

        // Foreground path
        var foreground = svg.append('path')
            .attr('class', 'd3-progress-foreground')
            .attr('filter', 'url(#blur)')
            .style('fill', color)
            .style('stroke', color);

        // Front path
        var front = svg.append('path')
            .attr('class', 'd3-progress-front')
            .style('fill', color)
            .style('fill-opacity', 1);



        // Text
        // ------------------------------

        // Percentage text value
        var numberText = d3.select(element)
            .append('h2')
            .attr('class', 'mt-15 mb-5')

        // Icon
        d3.select(element)
            .append("i")
            .attr("class", iconClass + " counter-icon")
            .attr('style', 'top: ' + ((boxSize - iconSize) / 2) + 'px');

        // Title
        d3.select(element)
            .append('div')
            .text(textTitle);

        // Subtitle
        d3.select(element)
            .append('div')
            .attr('class', 'text-size-small text-muted')
            .text(textAverage);



        // Animation
        // ------------------------------

        // Animate path
        function updateProgress(progress) {
            foreground.attr('d', arc.endAngle(twoPi * progress));
            front.attr('d', arc.endAngle(twoPi * progress));
            numberText.text(formatPercent(progress));
        }

        // Animate text
        var progress = startPercent;
        (function loops() {
            updateProgress(progress);
            if (count > 0) {
                count--;
                progress += step;
                setTimeout(loops, 10);
            }
        })();
    }


    // Bullet charts
    // ------------------------------

    // Initialize chart
    //bulletChart("#bullets", 80);

    // Chart setup
    function bulletChart(element, height) {


        // Bullet chart core
        // ------------------------------

        bulletCore();
        function bulletCore() {

            // Construct
            d3.bullet = function () {

                // Default layout variables
                var orient = "left",
                    reverse = false,
                    duration = 750,
                    ranges = bulletRanges,
                    markers = bulletMarkers,
                    measures = bulletMeasures,
                    height = 30,
                    tickFormat = null;

                // For each small multiple…
                function bullet(g) {
                    g.each(function (d, i) {

                        // Define variables
                        var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
                            markerz = markers.call(this, d, i).slice().sort(d3.descending),
                            measurez = measures.call(this, d, i).slice().sort(d3.descending),
                            g = d3.select(this);

                        // Compute the new x-scale.
                        var x1 = d3.scale.linear()
                            .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
                            .range(reverse ? [width, 0] : [0, width]);

                        // Retrieve the old x-scale, if this is an update.
                        var x0 = this.__chart__ || d3.scale.linear()
                            .domain([0, Infinity])
                            .range(x1.range());

                        // Stash the new scale.
                        this.__chart__ = x1;

                        // Derive width-scales from the x-scales.
                        var w0 = bulletWidth(x0),
                            w1 = bulletWidth(x1);



                        // Setup range
                        // ------------------------------

                        // Update the range rects
                        var range = g.selectAll(".bullet-range")
                            .data(rangez);

                        // Append range rect
                        range.enter()
                            .append("rect")
                            .attr("class", function (d, i) { return "bullet-range bullet-range-" + (i + 1); })
                            .attr("width", w0)
                            .attr("height", height)
                            .attr('rx', 2)
                            .attr("x", reverse ? x0 : 0)

                            // Add loading animation
                            .transition()
                            .duration(duration)
                            .attr("width", w1)
                            .attr("x", reverse ? x1 : 0);

                        // Add update animation
                        range.transition()
                            .duration(duration)
                            .attr("x", reverse ? x1 : 0)
                            .attr("width", w1)
                            .attr("height", height);



                        // Setup measures
                        // ------------------------------

                        // Update the measure rects
                        var measure = g.selectAll(".bullet-measure")
                            .data(measurez);

                        // Append measure rect
                        measure.enter()
                            .append("rect")
                            .attr("class", function (d, i) { return "bullet-measure bullet-measure-" + (i + 1); })
                            .attr("width", w0)
                            .attr("height", height / 5)
                            .attr("x", reverse ? x0 : 0)
                            .attr("y", height / 2.5)
                            .style("shape-rendering", "crispEdges");

                        // Add loading animation
                        measure.transition()
                            .duration(duration)
                            .attr("width", w1)
                            .attr("x", reverse ? x1 : 0);

                        // Add update animation
                        measure.transition()
                            .duration(duration)
                            .attr("width", w1)
                            .attr("height", height / 5)
                            .attr("x", reverse ? x1 : 0)
                            .attr("y", height / 2.5);



                        // Setup markers
                        // ------------------------------

                        // Update the marker lines
                        var marker = g.selectAll(".bullet-marker")
                            .data(markerz);

                        // Append marker line
                        marker.enter()
                            .append("line")
                            .attr("class", function (d, i) { return "bullet-marker bullet-marker-" + (i + 1); })
                            .attr("x1", x0)
                            .attr("x2", x0)
                            .attr("y1", height / 6)
                            .attr("y2", height * 5 / 6);

                        // Add loading animation
                        marker.transition()
                            .duration(duration)
                            .attr("x1", x1)
                            .attr("x2", x1);

                        // Add update animation
                        marker.transition()
                            .duration(duration)
                            .attr("x1", x1)
                            .attr("x2", x1)
                            .attr("y1", height / 6)
                            .attr("y2", height * 5 / 6);



                        // Setup axes
                        // ------------------------------

                        // Compute the tick format.
                        var format = tickFormat || x1.tickFormat(8);

                        // Update the tick groups.
                        var tick = g.selectAll(".bullet-tick")
                            .data(x1.ticks(8), function (d) {
                                return this.textContent || format(d);
                            });

                        // Initialize the ticks with the old scale, x0.
                        var tickEnter = tick.enter()
                            .append("g")
                            .attr("class", "bullet-tick")
                            .attr("transform", bulletTranslate(x0))
                            .style("opacity", 1e-6);

                        // Append line
                        tickEnter.append("line")
                            .attr("y1", height)
                            .attr("y2", (height * 7 / 6) + 3);

                        // Append text
                        tickEnter.append("text")
                            .attr("text-anchor", "middle")
                            .attr("dy", "1em")
                            .attr("y", (height * 7 / 6) + 4)
                            .text(format);

                        // Transition the entering ticks to the new scale, x1.
                        tickEnter.transition()
                            .duration(duration)
                            .attr("transform", bulletTranslate(x1))
                            .style("opacity", 1);

                        // Transition the updating ticks to the new scale, x1.
                        var tickUpdate = tick.transition()
                            .duration(duration)
                            .attr("transform", bulletTranslate(x1))
                            .style("opacity", 1);

                        // Update tick line
                        tickUpdate.select("line")
                            .attr("y1", height + 3)
                            .attr("y2", (height * 7 / 6) + 3);

                        // Update tick text
                        tickUpdate.select("text")
                            .attr("y", (height * 7 / 6) + 4);

                        // Transition the exiting ticks to the new scale, x1.
                        tick.exit()
                            .transition()
                            .duration(duration)
                            .attr("transform", bulletTranslate(x1))
                            .style("opacity", 1e-6)
                            .remove();



                        // Resize chart
                        // ------------------------------

                        // Call function on window resize
                        $(window).on('resize', resizeBulletsCore);

                        // Call function on sidebar width change
                        $(document).on('click', '.sidebar-control', resizeBulletsCore);

                        // Resize function
                        // 
                        // Since D3 doesn't support SVG resize by default,
                        // we need to manually specify parts of the graph that need to 
                        // be updated on window resize
                        function resizeBulletsCore() {

                            // Layout variables
                            width = d3.select("#bullets").node().getBoundingClientRect().width - margin.left - margin.right;
                            w1 = bulletWidth(x1);


                            // Layout
                            // -------------------------

                            // Horizontal range
                            x1.range(reverse ? [width, 0] : [0, width]);


                            // Chart elements
                            // -------------------------

                            // Measures
                            g.selectAll(".bullet-measure").attr("width", w1).attr("x", reverse ? x1 : 0);

                            // Ranges
                            g.selectAll(".bullet-range").attr("width", w1).attr("x", reverse ? x1 : 0);

                            // Markers
                            g.selectAll(".bullet-marker").attr("x1", x1).attr("x2", x1)

                            // Ticks
                            g.selectAll(".bullet-tick").attr("transform", bulletTranslate(x1))
                        }
                    });

                    d3.timer.flush();
                }


                // Constructor functions
                // ------------------------------

                // Left, right, top, bottom
                bullet.orient = function (x) {
                    if (!arguments.length) return orient;
                    orient = x;
                    reverse = orient == "right" || orient == "bottom";
                    return bullet;
                };

                // Ranges (bad, satisfactory, good)
                bullet.ranges = function (x) {
                    if (!arguments.length) return ranges;
                    ranges = x;
                    return bullet;
                };

                // Markers (previous, goal)
                bullet.markers = function (x) {
                    if (!arguments.length) return markers;
                    markers = x;
                    return bullet;
                };

                // Measures (actual, forecast)
                bullet.measures = function (x) {
                    if (!arguments.length) return measures;
                    measures = x;
                    return bullet;
                };

                // Width
                bullet.width = function (x) {
                    if (!arguments.length) return width;
                    width = x;
                    return bullet;
                };

                // Height
                bullet.height = function (x) {
                    if (!arguments.length) return height;
                    height = x;
                    return bullet;
                };

                // Axex tick format
                bullet.tickFormat = function (x) {
                    if (!arguments.length) return tickFormat;
                    tickFormat = x;
                    return bullet;
                };

                // Transition duration
                bullet.duration = function (x) {
                    if (!arguments.length) return duration;
                    duration = x;
                    return bullet;
                };

                return bullet;
            };

            // Ranges
            function bulletRanges(d) {
                return d.ranges;
            }

            // Markers
            function bulletMarkers(d) {
                return d.markers;
            }

            // Measures
            function bulletMeasures(d) {
                return d.measures;
            }

            // Positioning
            function bulletTranslate(x) {
                return function (d) {
                    return "translate(" + x(d) + ",0)";
                };
            }

            // Width
            function bulletWidth(x) {
                var x0 = x(0);
                return function (d) {
                    return Math.abs(x(d) - x0);
                };
            }
        }



        // Basic setup
        // ------------------------------

        // Main variables
        var d3Container = d3.select(element),
            margin = { top: 20, right: 10, bottom: 35, left: 10 },
            width = width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right,
            height = height - margin.top - margin.bottom;



        // Construct chart layout
        // ------------------------------

        var chart = d3.bullet()
            .width(width)
            .height(height);



        // Load data
        // ------------------------------

        d3.json("../../../../global_assets/demo_data/dashboard/bullets.json", function (error, data) {

            // Show what's wrong if error
            if (error) return console.error(error);


            // Create SVG
            // ------------------------------

            // SVG container
            var container = d3Container.selectAll("svg")
                .data(data)
                .enter()
                .append('svg');

            // SVG group
            var svg = container
                .attr("class", function (d, i) { return "bullet-" + (i + 1); })
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(chart);



            // Add title
            // ------------------------------

            // Title group
            var title = svg.append("g")
                .style("text-anchor", "start");

            // Bullet title text
            title.append("text")
                .attr("class", "bullet-title")
                .attr('y', -10)
                .text(function (d) { return d.title; });

            // Bullet subtitle text
            title.append("text")
                .attr("class", "bullet-subtitle")
                .attr('x', width)
                .attr('y', -10)
                .style("text-anchor", "end")
                .text(function (d) { return d.subtitle; })
                .style('opacity', 0)
                .transition()
                .duration(500)
                .delay(500)
                .style('opacity', 1);



            // Add random transition for demo
            // ------------------------------

            // Bind data
            var interval = function () {
                svg.datum(randomize).call(chart.duration(750));
            }

            // Set interval
            var intervalIds = [];
            intervalIds.push(
                setInterval(function () {
                    interval()
                }, 5000)
            );

            // Add Switchery toggle control
            var realtime = document.querySelector('.switcher');
            var realtimeInit = new Switchery(realtime);
            realtime.onchange = function () {
                if (realtime.checked) {
                    intervalIds.push(setInterval(function () { interval() }, 5000));
                }
                else {
                    for (var i = 0; i < intervalIds.length; i++) {
                        clearInterval(intervalIds[i]);
                    }
                }
            };



            // Resize chart
            // ------------------------------

            // Call function on window resize
            $(window).on('resize', bulletResize);

            // Call function on sidebar width change
            $(document).on('click', '.sidebar-control', bulletResize);

            // Resize function
            // 
            // Since D3 doesn't support SVG resize by default,
            // we need to manually specify parts of the graph that need to 
            // be updated on window resize
            function bulletResize() {

                // Layout variables
                width = d3Container.node().getBoundingClientRect().width - margin.left - margin.right;


                // Layout
                // -------------------------

                // Main svg width
                container.attr("width", width + margin.left + margin.right);

                // Width of appended group
                svg.attr("width", width + margin.left + margin.right);


                // Chart elements
                // -------------------------

                // Subtitle
                svg.selectAll('.bullet-subtitle').attr("x", width);
            }
        });



        // Randomizers
        // ------------------------------

        function randomize(d) {
            if (!d.randomizer) d.randomizer = randomizer(d);
            d.ranges = d.ranges.map(d.randomizer);
            d.markers = d.markers.map(d.randomizer);
            d.measures = d.measures.map(d.randomizer);
            return d;
        }
        function randomizer(d) {
            var k = d3.max(d.ranges) * .2;
            return function (d) {
                return Math.max(0, d + k * (Math.random() - .5));
            };
        }
    }


    // Other codes
    // ------------------------------

    // Grab first letter and insert to the icon
    $(".table tr").each(function (i) {

        // Title
        var $title = $(this).find('.letter-icon-title'),
            letter = $title.eq(0).text().charAt(0).toUpperCase();

        // Icon
        var $icon = $(this).find('.letter-icon');
        $icon.eq(0).text(letter);
    });

});

