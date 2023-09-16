var DashboardView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=EMPLOYEE_FAVORITE_MENU_GET",
        File: 'DashboardDetails.js',
        Oper: 'Add',
        addedit: "added",
        Count: "",
    },

    FavoriteMenuGet: function () {
        try {
            $.ajax({
                url: getDomain() + DashboardView.variables.BindMasterUrl,
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist) {
                            var List;
                            if (JsonObject.serviceresponse.detailslist.details.length > 1) {
                                List = JsonObject.serviceresponse.detailslist.details;
                            } else {
                                List = JsonObject.serviceresponse.detailslist;
                            }
                            DashboardView.variables.Count = 1;
                            $("#FavoriteMenu").html("");
                            $.each(List, function (key, details) {
                                id = DashboardView.variables.Count;

                                $("#FavoriteMenu").append(
                                    '<div class="col-lg-2 col-xl-2 p-10" onclick="addnew(\'/' + details.controller + '/' + details.action + '\',\'' + details.menuname + '\')">' +   //as_col_2
                                    '<div class="card BoxStyle BoxColor' + id + '" style="border: 2px solid ' + details.colortab + ';border-radius: 5px;">' +
                                    '<div class="card-body p-10">' +
                                    '<div class="d-flex">' +
                                    '<div style="text-align: center;">' +
                                    '<span class="' + details.icon + ' IconSpacing IconSpacing' + id + '" style="padding-top: 26px"></span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="lblMainAmount LetterSpacing pt-10">' + details.menuname + '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');

                                $(".BoxColor" + id).hover(
                                    function () {
                                        $(this).css('background-color', details.colortab);
                                        $(this).css('color', 'white');
                                        $(this).find('.IconSpacing').css('color', 'white');
                                        $(this).css('transition-duration', '800ms');
                                    },
                                    function () {
                                        $(this).css('background-color', 'unset');
                                        $(this).css('color', 'black');
                                        $(this).find('.IconSpacing').css('color', 'black');
                                        $(this).css('transition-duration', '800ms');
                                    }
                                );
                                DashboardView.variables.Count = id + 1;
                            });

                            $("#FavoriteMenu").append(
                                '<div class="col-lg-2 p-10"><a class="" href="' + getDomain() + '/Login/LogOut">' +  //as_col_2
                                '<div class="card BoxStyle BoxColorExit" style="border: 2px solid red;background-color:unset;border-radius: 5px;">' +
                                '<div class="card-body p-10">' +
                                '<div class="d-flex">' +
                                '<div style="text-align: center;">' +
                                '<span class="icon-exit2 IconSpacing IconSpacingExit" style="padding-top: 26px"></span>' +
                                '</div>' +
                                '</div>' +
                                '<div class="lblMainAmount LetterSpacing pt-10">Exit</div>' +
                                '</div>' +
                                '</div>' +
                                '</a></div>');
                        }
                    }
                },
                error: OnError
            });
        }
        catch (e) {
            //ErrorDetails(e, DashboardView.variables.File);
        }
    }
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
        //ErrorDetails(e, DashboardView.variables.File);
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
        colNames = ['ROWNUM', 'Account Name', 'Total Day', 'Balance', 'Acc Id', 'Redirect Link'], //'Mobile', 'Acc Type', 'City', 'Op. Amt', 'Cr. Amt', 'Dr. Amt',
            colModel = [
                { name: "ROWNUM", index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", sortable: false, search: false, hidden: true },
                { name: "ACCOUNTNAME", width: 20, index: "ACCOUNTNAME", xmlmap: xmlvars.common_colmap + "ACCOUNTNAME", sortable: false },
                { name: "TOTALDAYS", width: 7, index: "TOTALDAYS", xmlmap: xmlvars.common_colmap + "TOTALDAYS", sortable: false },
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
        //ErrorDetails(e, DashboardView.variables.File);
    }
}

function printDiv() {
    try {
        $("#DashboardDiv").hide();
        $("#PrintForm").show();
        //$("#btnPrint").hide();
        window.print();
        //var divToPrint = document.getElementById('PrintForm');
        //var newWin = window.open('', 'Print-Window');
        //newWin.document.open();
        //newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
        //newWin.document.close();
        setTimeout(function () { $("#PrintForm").hide(); $("#DashboardDiv").show(); }, 10);
    }
    catch (e) {
        //ErrorDetails(e, DashboardView.variables.File);
    }
}

function RegisterFileUploads() {
    try {
        $('#btnExcelUpload').fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                if (checkIsValidFile(e.target.accept, data.files[0].type)) {
                    $("#filename").html(data.files[0].name);
                    data.submit();
                }
                else
                    OperationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
            },
            success: function (response, status) {
                $('#DocumentUpload').attr('href', response);
                $("#DocumentUpload").attr('target', '_blank');
            },
            error: OnError
        })
    }
    catch (e) {
        //ErrorDetails(e, DashboardView.variables.File);
    }
}

$(document).ready(function () {
    //$("span .EmployeeName").html('');
    //$(".EmployeeName").html($("#hdnAccountName").val());
    GetCurrentAccYear();
    DashboardView.FavoriteMenuGet();
    RegisterFileUploads();
    //TxtFileGet();

    $("#btnPrint").click(function () {
        //LoanInfoView.LoanDetailsPrint();
        printDiv();
    });

    $("body").on("click", "#upload", function () {
        //Reference the FileUpload element.
        var fileUpload = $("#fileUpload")[0];

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    });

    $(".BoxColorExit").hover(
        function () {
            $(this).css('background-color', 'red');
            $(this).css('color', 'white');
            $(".IconSpacingExit").css('color', 'white');
        },
        function () {
            $(this).css('background-color', 'unset');
            $(this).css('color', 'black');
            $(".IconSpacingExit").css('color', 'black');
        }
    );

});

function ProcessExcel(data) {
    try {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        //Add the data rows from Excel file.
        for (var i = 0; i < excelRows.length; i++) {
            $("#PrintForm").append(
                '<div class="card card-body" style="width: 339.84px;height:64.32px;margin-bottom:8px">' +
                '<p style="margin:0px; font-weight:700"><span id="itemname" style="padding-right:15px; text-transform:capitalize">' + excelRows[i].ItemName + '</span> <span id="weight">' + excelRows[i].Weight + '</span></p>' +
                '<p style="margin:0px; padding-top:10px"><span id="type">' + excelRows[i].Type + '</span></p>' +
                '</div>'
            );
        }
    }
    catch (e) {
        //ErrorDetails(e, DashboardView.variables.File);
    }
};

//function printDiv(myId) {
//    var myId = "PrintForm";
//    var HiddenElements = document.querySelectorAll('body *'); // get all the elements in the body
//    var VisibleElements = document.querySelectorAll('#' + myId + ' *'); // gets the elements inside the div to be printed


//    //var index = 0, length = HiddenElements.length;
//    //for (; index < length; index++) {
//    //    HiddenElements[index].style.visibility = "hidden"; // hide all the elements in the body             
//    //}

//    //index = 0;
//    //length = VisibleElements.length;

//    //for (; index < length; index++) {
//    //    VisibleElements[index].style.visibility = "visible"; // show all the elements inside the div to be printed      
//    //}

//    // display the element to be printed

//    myElement = document.getElementById(myId);
//    myElement.style.visibility = "visible"

//    var oldPos = myElement.style.position;
//    myElement.style.position = "absolute";

//    myElement.style.left = 0;
//    myElement.style.top = 0;

//    setTimeout(window.print, 1000); // Wait a bit for the DOM then Print ( Safari :/ )

//    // wait for the data to be sent to the printer then display the previous content
//    setTimeout(function () {

//        index = 0;
//        length = HiddenElements.length;

//        for (; index < length; index++) {
//            HiddenElements[index].style.visibility = "visible";
//        }

//        myElement.style.position = oldPos;
//    }, 5000);

//}

//function TxtFileGet() {
//    try {
//        $.ajax({
//            url: getDomain() + "/Common/TxtFileGet",
//            async: false,
//            cache: false,
//            type: 'POST',
//            success: function (data) {
//                var xyz = data;
//            },
//            error: OnError
//        });
//    }
//    catch (e) {
//        ErrorDetails(e, DashboardView.variables.File);
//    }
//}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}