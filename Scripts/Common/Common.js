var CommonName = '', Dropdownid = 0, rowsToColor = [], FromDateAL, ToDateAL;
var ExportPdfDefaultTitle = "JewelleryERP";
var CommonjsView = {
    variables: {
        BindAccountListUrl: "/Common/BindMastersDetails?ServiceName=ACCOUNTMASTER_GET",
        BindLedgerDetailsUrl: "/Common/BindMastersDetails?ServiceName=LEDGER_REPORT_GET",
        File: 'Common.js',
        AjaxCall: ''
    },

    AutosuggestAccountName: function (obj) {
        try {
            if ($("#CommonSearch").val() == '') {
                $("#CommonData").hide();
                return;
            }
            $("#CommonSearch").autocomplete({
                source: function (request, response) {
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#CommonSearch").val() });

                    var url = getDomain() + CommonjsView.variables.BindAccountListUrl + "&myfilters=" + JSON.stringify(myfilter);
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
                                    if (JsonObject.serviceresponse.detailslist.details.length > 1) {
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    }
                                    else {
                                        List = JsonObject.serviceresponse.detailslist;
                                    }

                                    response(
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {
                                                return {
                                                    label: item.accountname + '-' + item.mobile,
                                                    value: item.accountname,
                                                    Id: item.accountid,
                                                    mobile: item.mobile || "",
                                                    name: item.accountname,
                                                    cityname: item.cityname || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    bsgroupname: item.bsgroupname,
                                                    venderimage: item.venderimage
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.accountname + '-' + item.mobile,
                                                    value: item.accountname,
                                                    Id: item.accountid,
                                                    mobile: item.mobile || "",
                                                    name: item.accountname,
                                                    cityname: item.cityname || "",
                                                    accounttype: item.accounttype || "",
                                                    shortcode: item.shortcode || "",
                                                    bsgroupname: item.bsgroupname,
                                                    venderimage: item.venderimage
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#CommonSearch").val().length <= 1) {
                                        //CommonjsView.variables.AccountId = "";
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
                                if ($("#CommonSearch").val().length <= 1) {
                                    //CommonjsView.variables.AccountId = "";
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
                        //$(".ActiveMain").removeClass('ActiveMain');
                        //$(this).addClass('ActiveMain');
                        $("#BalanceGroupMain").html(ui.item.bsgroupname);
                        $("#CityMain").html(ui.item.cityname);
                        $("#ContactMain").html(ui.item.mobile);
                        $("#lblMainAccountName").html(ui.item.value);
                        $("#CommonSearch").attr('accounttype', ui.item.accounttype);
                        $("#CommonSearch").attr('accountid', ui.item.Id);

                        if (ui.item.venderimage != 'undefined' && ui.item.venderimage != '[object Object]') {
                            if (ui.item.accounttype.toLowerCase() == 'customer') {
                                $('#MainImgVender').attr('src', getDomain() + "/UploadFiles/CustomerMaster/" + ui.item.venderimage);
                            }
                            else {
                                $('#MainImgVender').attr('src', getDomain() + "/UploadFiles/PartyMaster/" + ui.item.venderimage);
                            }
                        }
                        else {
                            $('#MainImgVender').attr('src', getDomain() + "/Content/assets/images/default-user.png");
                        }
                        $("#MainDetailsViewDiv").show();
                        var myfilter = { rules: [] };
                        myfilter.rules.push({ field: "ACCID", op: "eq", data: ui.item.Id });
                        myfilter.rules.push({ field: "ZEROFILTER", op: "eq", data: 'WithZero' });
                        var url = CommonjsView.variables.BindLedgerDetailsUrl + "&myfilters=" + JSON.stringify(myfilter);
                        CommonjsView.initializeJqgrid(url);
                        $("#CommonData").show();
                    }
                    else {
                        setTimeout(function () {
                            $("#CommonSearch").val('');
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

            //if ($(obj).val() == '') {
            //    $("#CommonData").hide();
            //    return;
            //}
            //var myfilter;
            //myfilter = { rules: [] };
            //myfilter.rules.push({ field: "SEARCH", op: "eq", data: $(obj).val() });
            //var url = getDomain() + CommonjsView.variables.BindAccountListUrl + "&myfilters=" + JSON.stringify(myfilter);

            //CommonjsView.variables.AjaxCall = $.ajax({
            //    url: url,
            //    type: "POST",
            //    async: true,
            //    cache: false,
            //    success: function (data) {
            //        if ($(obj).val() == '') {
            //            $("#CommonData").hide();
            //            return;
            //        }
            //        if ($(data).find('RESPONSECODE').text() == "0") {
            //            var JsonObject = xml2json.parser(data);
            //            if (JsonObject.serviceresponse.detailslist != undefined) {
            //                var List;
            //                if (JsonObject.serviceresponse.detailslist.details.length > 1) {
            //                    List = JsonObject.serviceresponse.detailslist.details;
            //                }
            //                else {
            //                    List = JsonObject.serviceresponse.detailslist;
            //                }

            //                $("#AccountList").html('');

            //                $.each(List, function (key, innerjsonDetails) {
            //                    $("#AccountList").append('<li venderimage="' + innerjsonDetails.venderimage + '" accounttype="' + innerjsonDetails.accounttype + '" accountid="' + innerjsonDetails.accountid + '" bsgroupname="' + innerjsonDetails.bsgroupname + '" mobile="' + (innerjsonDetails.mobile == '[object Object]' ? '' : innerjsonDetails.mobile) + '" cityname="' + (innerjsonDetails.cityname || '') + '"><span>' + innerjsonDetails.accountname + '</span></li>')
            //                });

            //                $("#AccountList li").click(function () {
            //                    $(".ActiveMain").removeClass('ActiveMain');
            //                    $(this).addClass('ActiveMain');
            //                    $("#BalanceGroupMain").html($(this).attr('bsgroupname'));
            //                    $("#CityMain").html($(this).attr('cityname'));
            //                    $("#ContactMain").html($(this).attr('mobile'));
            //                    $("#lblMainAccountName").html($(this).text());

            //                    if ($(this).attr('venderimage') != 'undefined') {
            //                        if ($(this).attr('accounttype').toLowerCase() == 'customer') {
            //                            $('#MainImgVender').attr('src', getDomain() + "/UploadFiles/CustomerMaster/" + $(this).attr('venderimage'));
            //                        }
            //                        else {
            //                            $('#MainImgVender').attr('src', getDomain() + "/UploadFiles/PartyMaster/" + $(this).attr('venderimage'));
            //                        }
            //                    }
            //                    else {
            //                        $('#MainImgVender').attr('src', getDomain() + "/Content/assets/images/default-user.png");
            //                    }
            //                    $("#MainDetailsViewDiv").show();
            //                    var myfilter = { rules: [] };
            //                    myfilter.rules.push({ field: "ACCID", op: "eq", data: $(this).attr('accountid') });
            //                    myfilter.rules.push({ field: "ZEROFILTER", op: "eq", data: 'WithZero' });
            //                    var url = CommonjsView.variables.BindLedgerDetailsUrl + "&myfilters=" + JSON.stringify(myfilter);
            //                    CommonjsView.initializeJqgrid(url);
            //                });
            //                $("#CommonData").show();
            //            }
            //            else {
            //                $("#CommonData").hide();
            //            }
            //        }
            //    },
            //    beforeSend: function () {
            //        if (CommonjsView.variables.AjaxCall)
            //            if (CommonjsView.variables.AjaxCall != '')
            //                CommonjsView.variables.AjaxCall.abort();
            //    }
            //})
        }
        catch (e) {
            ErrorDetails(e, CommonjsView.variables.File);
        }
    },

    initializeJqgrid: function (url) {
        try {
            colNames = ['ROWNUM', 'Bill Type', 'Voucher No', 'Voucher Date', 'Credit Amt', 'Debit Amt', 'Balance Amt', 'Remark', 'RedirectLink'],
                colModel = [
                    { name: "ROWNUM", index: "ROWNUM", xmlmap: xmlvars.common_colmap + "ROWNUM", sortable: false, search: false, hidden: true },
                    { name: "BILLTYPE", width: 10, index: "BILLTYPE", xmlmap: xmlvars.common_colmap + "BILLTYPE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "VOUCHERNO", width: 10, index: "VOUCHERNO", xmlmap: xmlvars.common_colmap + "VOUCHERNO", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "VOUCHERDATE", width: 5, index: "VOUCHERDATE", xmlmap: xmlvars.common_colmap + "VOUCHERDATE", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "AMT_CREDIT", width: 5, index: "AMT_CREDIT", xmlmap: xmlvars.common_colmap + "AMT_CREDIT", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "AMT_DEBIT", width: 5, index: "AMT_DEBIT", xmlmap: xmlvars.common_colmap + "AMT_DEBIT", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption },
                    { name: "BALANCE", width: 5, index: "BALANCE", xmlmap: xmlvars.common_colmap + "BALANCE", align: "right", sortable: false, searchoptions: jqGridVariables.stringSearchOption, formatter: function (cv, op, ro) { return jqGridVariables.CrDrFmatter(cv, op, ro, 2) } },
                    { name: "REMARK", index: "REMARK", xmlmap: xmlvars.common_colmap + "REMARK", hidden: true, sortable: false },
                    { name: "REDIRECTLINK", index: "REDIRECTLINK", xmlmap: xmlvars.common_colmap + "REDIRECTLINK", hidden: true },
                ];
            //$("#table_list_MainLedger").GridUnload();
            $.jgrid.gridUnload("#table_list_MainLedger");
            $("#table_list_MainLedger").jqGrid({
                url: getDomain() + url,
                datatype: "xml",
                height: '100%',
                width: '100%',
                autowidth: true,
                shrinkToFit: true,
                rowNum: 20,
                rowList: [20, 50, 100],
                colNames: colNames,
                colModel: colModel,
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
                        var width = $('#jqgrid_MainLedger').width();
                        if (width <= 430) {
                            width = 1000;
                        }
                        $('#table_list_MainLedger').setGridWidth(width);
                    }, 200)
                    $('#table_list_MainLedger').jqGrid('setSelection', $('#table_list_MainLedger').jqGrid('getDataIDs')[0]);

                    var $self = $(this);
                    var AMT_CREDIT = $self.jqGrid("getCol", "AMT_CREDIT", false, "sum");
                    var AMT_DEBIT = $self.jqGrid("getCol", "AMT_DEBIT", false, "sum");
                    $(".footrow [aria-describedby=table_list_MainLedger_BALANCE]").html(CrDrFmatter((AMT_CREDIT - AMT_DEBIT), 2));
                    $self.jqGrid("footerData", "set", {
                        AMT_CREDIT: parseFloat(AMT_CREDIT).toFixed(2),
                        AMT_DEBIT: parseFloat(AMT_DEBIT).toFixed(2)
                    });

                    jQuery("#table_list_MainLedger").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });
                    $("#lblBalanceMain2").html($('.ui-jqgrid-ftable [aria-describedby=table_list_MainLedger_BALANCE]').html());
                },
                loadError: OnJqloadError,
                beforeProcessing: OnJqbeforeProcessingErrorcheck,
                viewrecords: true,
                hidegrid: false,
                sortname: 'ROWNUM',
                sortorder: 'asc',
                ondblClickRow: function (rowid) {
                    CommonjsView.RedirectToVoucher(rowid);
                }
            });
            jQuery("#table_list_MainLedger").jqGrid('bindKeys', {
                "onEnter": function (rowid) {
                    CommonjsView.RedirectToVoucher(rowid);
                }
            });

            // Setup buttons
            $("#table_list_MainLedger").jqGrid('navGrid', '#pager_LedgerDetails',
                { edit: false, add: false, del: false, search: false, refresh: true },
                { height: 320 }
            );
            RightAlignJqGridHeader('table_list_MainLedger', ['AMT_CREDIT', 'AMT_DEBIT', 'BALANCE']);
        }
        catch (e) {
            ErrorDetails(e, CommonjsView.variables.File);
        }
    },

    RedirectToVoucher: function (rowid) {
        var rowData = jQuery("#table_list_MainLedger").getRowData(rowid);
        if (rowData.VOUCHERNO != '')
            window.open(getDomain() + rowData["REDIRECTLINK"], "_blank");
    },

    KeyboardShortcut: function () {
        var myfilter = { rules: [] };

        var Value = $("#MenuName").val();
        var MenuName = Value.replace('&', '-');
        myfilter.rules.push({ field: "MENUNAME", op: "eq", data: MenuName });
        //var data = {
        //    "MENUNAME": $("#MenuName").val(),
        //}
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=KEYBOARD_SHORTCUTS_GET&myfilters=" + JSON.stringify(myfilter),
            //data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (dataget) {
                var List = xml2json.parser(dataget);
                var list = List.serviceresponse.detailslist;
                if (list) {
                    if (list.details) {
                        if (list.details.length) {
                            list = list.details;
                        }
                        $("#KeyboardShortcut").html("");
                        $.each(list, function (key, node) {
                            $("#KeyboardShortcut").append(
                                '<div class="row">' +
                                '<div class="col-sm-5">' +
                                '<div class="shortcutkey">' + node.shortcutkey + '</div>' +
                                '</div>' +
                                '<div class="col-sm-7 bottomline">' +
                                '<p stype="padding-top: 6px;">' + node.description + '</p>' +
                                '</div>' +
                                '</div>'
                            );
                        });
                    }
                }
            },
            error: OnError
        });
    },

}

function getGridHeight() {
    return $(window).height() * 420 / 754;
}

function capitalize(str) {
    if (str.length > 0) {
        var pieces = str.toString().split(" ");
        for (var i = 0; i < pieces.length; i++) {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    } else {
        return "";
    }

    //return `${this[0].toUpperCase()}${this.slice(1)}`;
}

$(document).on('click', "i.tab-close", function () {
    if ($($(this).parent()).attr('id') == 'idCustomerMaster') {
        $("#hdnCommonCustomerId").val('');
        $("#hdnCommonNewCustomer").val('');
    } else if ($($(this).parent()).attr('id') == 'idPartyMaster') {
        $("#hdnCommonPartyId").val('');
        $("#hdnCommonNewParty").val('');
    } else if ($($(this).parent()).attr('id') == 'idCustomerMetalReceipt') {
        $("#hdnCustomerId").val('');
    }
});

$(document).ready(function () {
    //$('.as_sml_btn.as_disable,.as_btn.as_disable').on('click', function (e) { e.preventDefault(); });

    $('[data-toggle="tooltip"]').tooltip();

    CommonjsView.KeyboardShortcut();
    BindDropdown('ddlaccountyear', 'AccountyearDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_ACCOUNTYEARMASTER_GET", '', true);

    $("#UserName").focus();
    $(".CommonAddEditPartyCustomerModal").click(function () {
        var type = $("#txtAccount").attr('AccountType');
        var id = '';
        if ($("#txtAccount").val() != '') {
            id = $("#txtAccount").attr('AccountId')
        }

        $("#hdnCommonPreviousActiveId").val($(".actosoft-tabs .active a").attr('id'));
        if (type == 'CUSTOMER') {
            $("#hdnCommonCustomerId").val(id);
            $("#hdnCommonNewCustomer").val('1');
            $('#CustomerMaster_menu').click();
        } else {
            $("#hdnCommonPartyId").val(id);
            $("#hdnCommonNewParty").val('1');
            $('#PartyMaster_menu').click();
        }
    });

    $("#linkCalculator").click(function () {
        window.open('Calculator:///');
    });

    $('ul .mega-menu-wide .dropdown-menu').on('click', function (event) {
        event.stopPropagation();
    });

    $(".favorite_menu").click(function (event) {
        var oper = 'add';
        if ($(this).children().hasClass('fa-star')) {
            oper = 'delete';
            $(this).children().removeClass('fa-star').addClass('fa-star-o');
        } else {
            $(this).children().removeClass('fa-star-o').addClass('fa-star');
        }

        var data = {
            "MENUID": $(this).attr('id'),
            "oper": oper,
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=EMPLOYEE_FAVORITE_MENU_CRUD",
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                var data = {
                    Menu: escape($("#navbar-second-toggle").html().replace('open', ''))
                }

                $.ajax({
                    url: getDomain() + "/Login/ChangeMenu",
                    data: data,
                    async: false,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                    },
                    error: OnError
                });
            },
            error: OnError
        });

    });

    $("#linkiconfavorite").click(function () {
        openNav();
    });
    $("#FavoriteBack").click(function () {
        closeNav();
    })

    $(".CommonAddCity").click(function () {
        $("#ddlCommonAddState").html("");
        BindDropdown('ddlCommonAddState', 'StateDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_STATEMASTER_GET", '', true);
        $("#CommonCityModal").modal('show');
        setTimeout(function () {
            $("#ddlCommonAddState").focus();
        }, 200);
    });
    $(".btnCommonCityAddCancel").click(function () {
        $("#hdnNewCityId").val('');
        $("#CommonCityModal").modal('hide');
    });

    $("#btnCommonCityAddSave").click(function () {
        var isValid = $(".CommonCityAddForm").valid();
        if (!isValid)
            return;

        var data = {
            "CITYNAME": $("#txtCityAddCommon").val(),
            "STATEID": $("#ddlCommonAddState").val(),
            "oper": 'Add',
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=COMMON_CITYMASTER_CRUD",
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                var JsonObject = xml2json.parser(data);
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#hdnNewCityId").val(JsonObject.serviceresponse.cityid);
                    $("#CommonCityModal").modal('hide');
                } else {
                    OperationMessage('Warning', $(data).find('RESPONSEMESSAGE ').text(), 'warning');
                }

            },
            error: OnError
        });

    });
    checkForHeightChanges();
    $(".datepicker").datepicker({
        format: 'dd/mm/yyyy'
    });
    $(".datepicker").on('changeDate', function (e) {
        $(this).datepicker('hide');
    });
    $(".datepicker1").datepicker({
        format: 'dd/M/yyyy', startDate: new Date()
    });
    /* for checkbox and radio buttons design */
    $(".icheck").iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        labelHover: true,
        cursor: true,
        increaseArea: '15%',// optional
        tap: true
    });
    $(".icheckminimal").iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        labelHover: true,
        cursor: true,
        increaseArea: '15%',// optional
        tap: true
    });

    $("#ddlPartyBranch").html("");
    BindDropdown('ddlPartyBranch', 'BranchDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=EMPLOYEEBRANCH_GET", '', true);
    $("#ddlPartyBranch").val($("#hdnBranchId").val());

    // --------------------------------------- CommonMaster cancel/submit btn  ---------------------------------------
    $("#btnCommonCancel").click(function () {
        $("#txtCommonName").val("");
        $("#txtDisplayOrderCommon").val("");
        $("#CommonMasModal").modal('hide');
    });
    $("#btncommonSubmit").click(function () {
        var isValid = $(".CommonNameAddForm").valid();
        if (!isValid)
            return;
        var data = {
            "COMMONMASTERDETAILNAME": $("#txtCommonName").val(),
            "DISPLAYORDER": $("#txtDisplayOrderCommon").val(),
            "COMMONMASTERNAME": $(".Commonmastitle").html(),
            "ISACTIVE": (($('input[name="IsActiveCommon"]').prop("checked") == true) ? 1 : 0),
            "oper": 'Add',
        }
        $.ajax({
            url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=COMMONMASTERDETAIL_CRUD",
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                var JsonObject = xml2json.parser(data);
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#" + $("#hdndropdownid").val()).html('');
                    BindCommonDetailsByType(CommonName, $("#hdndropdownid").val(), 'CommonMasterDetailDropdownList', '---select ' + CommonName + '---');
                    $("#" + $("#hdndropdownid").val()).val(JsonObject.serviceresponse.commonmasterdetailid);
                    $("#CommonMasModal").modal('hide');
                }
            },
            error: OnError
        });
    });
    // --------------------------------------- /CommonMaster cancel/submit btn  ---------------------------------------


    //$('.datemask').mask("99/99/9999");
    //$('.timemask').mask("99:99");
    $('.pannomask').mask("SSSSS0000S");
    $('.gstnomask').mask("00SSSSS0000SAZA");
    $('.adhaarnomask').mask("0000 0000 0000");
    $('.pincodemask').mask("000000");
    $('.mobilenomask').mask("00000-00000");
    //$('.NumberMask').mask('000,000,000,000,000.00', { reverse: true });
    //$(".HUIDMask").mask("000000");
    $(".uppercase").focus(function () {

        $(".uppercase").css("text-transform", "uppercase");
    });

    $(".gstcheck").click(function () {
        if (this.parentElement.firstElementChild.value == '') {
            $(this.parentElement.firstElementChild).focus();
            return;
        }
        var aux = document.createElement("div");
        aux.setAttribute("contentEditable", true);
        aux.innerHTML = (this.parentElement.firstElementChild.value).toUpperCase();
        aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
        document.body.appendChild(aux);
        aux.focus();
        document.execCommand("copy");
        document.body.removeChild(aux);

        window.open('https://services.gst.gov.in/services/searchtp', '_blank');

    });
    $(".ExitWindow").click(function () {
        window.top.close();
    });
    $("#btnViewMainLedger").click(function () {
        window.open(getDomain() + '/Report/LedgerReport?AccountId=' + $("#CommonSearch").attr('accountid') + '&AccountName=' + $("#CommonSearch").val(), "_blank");
    });
    $("#EditMain").click(function () {
        if ($("#CommonSearch").attr('accounttype').toLowerCase() == 'customer') {
            window.open(getDomain() + '/Master/CustomerMaster?AccountId=' + $("#CommonSearch").attr('accountid'), "_blank");
        } else {
            window.open(getDomain() + '/Master/PartyMaster?AccountId=' + $("#CommonSearch").attr('accountid'), "_blank");
        }
    });
    $("#btnViewMainMetalLedger").click(function () {
        window.open(getDomain() + '/Report/MetalLedgerReport?AccountId=' + $("#CommonSearch").attr('accountid') + '&AccountName=' + $("#CommonSearch").val(), "_blank");
    });

    $("#txtsearchbox").keydown(function (event) {
        if (event.ctrlKey && event.keyCode == 65) {
            event.preventDefault();
        }
    });

    FixValue();
    setInterval(function () {
        $.ajax({
            url: getDomain() + "/Common/SessionCheck",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                if (+data == 1) {
                    window.close();
                    window.location.replace(getDomain() + '/login/logOut');
                }
            }
        });
    }, 1000);

    //for account - party and customer data -kishan
    $(".acto-accountsuggest").autocomplete({
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {

                if (item.name) {
                    return $('<li>').append(
                        '<div class="acto-ui">' +
                        '<p class="acto-suggest"><span class="icon-suggest"><i class="fa fa-user"></i></span> <span class="suggest_label">' + item.name + ' (' + item.shortcode + ') - ' + item.accounttype + ' </span> </p>' +
                        '<p class="acto-suggest"><span class="icon-suggest"><i class="fa fa-phone"></i></span><span class="suggest_label">' + (item.mobile == '[object Object]' ? "" : item.mobile) + '</span> &nbsp;&nbsp;&nbsp;<span class="icon-suggest"><i class="fa fa-map-marker"></i></span><span>&nbsp;' + item.cityname + '</span></p>' +
                        '</div>'
                    )
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

    //$(".btn.disabled").on('click', function (e) {
    //    e.preventDefault();
    //    e.stopPropagation();
    //});

});

//multiple file upload control
var liImgArr = [];
var uploader;
function RegisterMultipleFileUpload(uploaderDiv, extension, SaveButton) {
    var uploadUrl = getDomain() + "/Helpers/Handler/FileUploadHandler.ashx";
    $(uploaderDiv).pluploadQueue({
        // General settings
        url: uploadUrl,
        // Maximum file size1
        //upload_max_filesize: '500mb',
        //chunk_size: '1mb',
        // Specify what files to browse for
        filters: [
            { title: "files type", extensions: extension },
        ],

        // Rename files by clicking on their titles
        rename: false,
        // Sort files
        sortable: true,
        // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
        dragdrop: true,

        init: {
            FileUploaded: function (up, file, info) {
                if (info.response.indexOf('error') >= 0) {
                    //notificationMessage('File Attachment Error', info.response, 'error');
                    return;
                }
                liImgArr[file.id] = info.response;
            },
            UploadComplete: function (up, files) {
                var i = 0, displayFile;
                for (; i < files.length; i++) {
                    displayFile = $('#' + files[i].id).find('.plupload_file_name span').html();
                    strHtml = '<a href="' + liImgArr[files[i].id] + '" style="background:none;cursor: pointer;" target="_blank">' + displayFile + '</a>';
                    $('#' + files[i].id).find('.plupload_file_name').html(strHtml);
                }
                liImgArr = [];
                if (SaveButton)
                    $(SaveButton).click();
            },
            Error: function (up, err) {
                //notificationMessage('File Attachment Error', err.message + (err.file ? ", File: " + err.file.name : ""), 'error');
            }
        },
        // Flash settings
        flash_swf_url: getDomain() + '/Content/plugins/plupload/Moxie.swf',

        // Silverlight settings
        silverlight_xap_url: getDomain() + '/Content/plugins/plupload/Moxie.xap'
    });
}
//multiple file upload control
function VoucehrDateValidation(obj) {
    setTimeout(function () {
        try {
            var FromDate = '', Todate = '', start_moye, end_moye, start_month, end_month, start_year, end_year, start_date, end_date, date_year, date_month, date_date;

            start_moye = $("#lbl_startdate").val().split('-');
            end_moye = $("#lbl_enddate").val().split('-');

            start_month = start_moye[1];
            end_month = end_moye[1];

            start_year = start_moye[0];
            end_year = end_moye[0];

            FromDate = obj.value;
            if (FromDate != '' && FromDate) {
                FromDate = FromDate.split('-');
                date_year = FromDate[0];
                date_month = FromDate[1];
                date_date = FromDate[2];
                if (date_month >= start_month) {
                    if ($(obj).attr('id') == "txtVoucherDate" || $(obj).attr('id') == "txtBillDate" || $(obj).attr('id') == "txtDate" || $(obj).attr('id') == "txtLAbourBillVoucherDate" || $(obj).attr('id') == "txtVoucherReceiptDate") {
                        if (date_year == start_year) {

                        } else {
                            //notificationTost('warning', 'Enter Date in AccountYear.');
                            $(obj).val(start_year + '-' + date_month + '-' + date_date);
                        }
                    } else {
                        $(obj).val(start_year + '-' + date_month + '-' + date_date);
                        $(obj).focus();
                        $(obj).setSelection(4, 7);
                    }
                } else {
                    if ($(obj).attr('id') == "txtVoucherDate" || $(obj).attr('id') == "txtBillDate" || $(obj).attr('id') == "txtDate" || $(obj).attr('id') == "txtLAbourBillVoucherDate" || $(obj).attr('id') == "txtVoucherReceiptDate") {
                        //notificationTost('warning', 'Enter Date in AccountYear.');
                        $(obj).val(end_year + '-' + date_month + '-' + date_date);
                    } else {
                        $(obj).focus();
                        $(obj).val(end_year + '-' + date_month + '-' + date_date);
                    }
                    $(obj).setSelection(4, 7);
                }
            }
        }
        catch (e) {
            ErrorDetails(e, 'Common.js');
        }
    }, 550);
}

function openNav() {
    if ($("#navbar-second-toggle .fa-star").length == 0) {
        notificationTost('warning', 'Favorite not found.');
        return;
    }
    $("#FavoriteBack").show();
    var list = '<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a><ul>'
    $("#navbar-second-toggle .fa-star").each(function (key, obj) {
        list += $(obj.closest('li')).prop('outerHTML');
    });
    list += '</ul>';
    $("#FavoritePanal").html(list);
    setTimeout(function () {
        document.getElementById("FavoritePanal").style.width = "400px";
    }, 10);

}

function closeNav() {
    $("#FavoriteBack").hide();
    document.getElementById("FavoritePanal").style.width = "0";
}
window.addEventListener('focus', RefreshGrid);

//----------13/04/2021
function ConvertDateToTimeStamp(date) {
    if (date) {
        var d = date.split('/');
        return Date.parse(d[2] + '-' + d[1] + '-' + d[0]);
    } else {
        return "";
    }
}

function OnChangeGST(panid, gstid) {
    if ($("#" + gstid).val() != '')
        $("#" + panid).val($("#" + gstid).val().substring(2, 12));
}
function JSONToCSVConvertor(colNames, JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    //CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in colNames) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "Report_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    console.log(document.body);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function CurrencyConvert(x) {
    var afterPoint = '';
    if (x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 2);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
}
function RefreshGrid() {
    $(".jqGrid_wrapper:visible table").each(function (data) {
        if ($(this).attr('aria-labelledby')) {
            var id = $(this).attr('aria-labelledby').replace('gbox_', '');
            jQuery('#' + id).trigger('reloadGrid');
            setTimeout(function () {
                var ids = $("#" + id).getDataIDs();
                $("#" + id).setSelection(ids[0], false).focus();
                searchingrid = true;
                filter = '';
                gridid = id;
            }, 200);
        }

    });
}
function GetId(form, id, type) {
    var data = {
        "FORM": form,
        "ID": id,
        "TYPE": type
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=GET_LAST_PREVIOUSID",
        data: data,
        async: false,
        cache: false,
        type: 'POST',
        success: function (result) {
            if ($(result).find('RESPONSECODE').text() == "0") {
                GetVoucherData($(result).find('ID').text());
            }
        }
    });
}
const formatTwoDigitDecimal = (num, decimals) => num.toLocaleString('en-US', {
    minimumFractionDigits: (decimals || 2),
    maximumFractionDigits: (decimals || 2),
});
function decimal(value, points) {
    return parseFloat(value || 0).toFixed(points);
}

function isAlpha(s) {
    return s != null && s.matches("^[a-zA-Z]*$");
}

function FromDateLess(input) {
    var date = ($("#" + input).val()).split('-');
    if ($("#" + input).val()) {
        date = ($("#" + input).val()).split('-');
    } else {
        if (input == 'txtFromDate') {
            date = (FromDateAL).split('-');
        } else {
            date = (ToDateAL).split('-');
        }
    }
    var d1 = date[2];
    var d2 = date[1];
    var d3 = date[0];
    if (d1 == 1) {
        d1 = 31;
        if (d2 == 1) {
            d2 = 12;
            d3 = '00' + (d3 - 1);
            d3 = d3.substring(d3.length, d3.length - 2);
        } else {
            d2 = '00' + (d2 - 1);
            d2 = d2.substring(d2.length, d2.length - 2);
            if (d2 == 2) {
                d1 = 28;
            }
        }
    } else {
        d1 = '00' + (d1 - 1);
        d1 = d1.substring(d1.length, d1.length - 2);
    }
    $("#" + input).val(d3 + '-' + d2 + '-' + d1);
    for (var i = 1; i < 5; i++) {
        if ($("#" + input).val() == '') {
            d1 = '00' + (d1 - 1);
            d1 = d1.substring(d1.length, d1.length - 2);
            $("#" + input).val(d3 + '-' + d2 + '-' + d1);
        } else {
            break;
        }
    }
}
function FromDateAdd(input) {
    var date;
    if ($("#" + input).val()) {
        date = ($("#" + input).val()).split('-');
    } else {
        if (input == 'txtFromDate') {
            date = (FromDateAL).split('-');
        } else {
            date = (ToDateAL).split('-');
        }
    }

    var d1 = date[2];
    var d2 = date[1];
    var d3 = date[0];
    if (d1 == 31) {
        d1 = '01';
        if (d2 == 12) {
            d2 = 1;
            d3 = '00' + (+d3 + 1);
            d3 = d3.substring(d3.length, d3.length - 2);
        } else {
            d2 = '00' + (+d2 + 1);
            d2 = d2.substring(d2.length, d2.length - 2);
            if (d2 == 2) {
                d1 = '01';
            }
        }
    } else {
        d1 = '00' + (+d1 + 1);
        d1 = d1.substring(d1.length, d1.length - 2);
    }
    $("#" + input).val(d3 + '-' + d2 + '-' + d1);
    for (var i = 1; i < 5; i++) {
        if ($("#" + input).val() == '') {
            d1 = '01';
            d2 = '00' + (+d2 + 1);
            d2 = d2.substring(d2.length, d2.length - 2);
            $("#" + input).val(d3 + '-' + d2 + '-' + d1);
        } else {
            break;
        }
    }
}
function GreaterDate() {
    //if (new Date($("#txtFromDate").val()) > new Date()) {
    //    var date = ($("#txtFromDate").val()).split('-');
    //    var year = +date[0] - 1;
    //    $("#txtFromDate").val(year + '-' + date[1] + '-' + date[2]);
    //}
    //if (new Date($("#txtToDate").val()) > new Date()) {
    //    var date = ($("#txtToDate").val()).split('-');
    //    var year = +date[0] - 1;
    //    $("#txtToDate").val(year + '-' + date[1] + '-' + date[2]);
    //}
}
// --------------------------------------- CommonMaster Add  ---------------------------------------
function commondetailadd(val, dropdownid) {
    CommonName = val;
    Dropdownid = dropdownid;
    $("#hdndropdownid").val(dropdownid);
    $("#txtCommonName").val("");
    $("#txtDisplayOrderCommon").val("");
    $(".Commonmastitle").html(val);
    $("#CommonMasModal").modal('show');
    setTimeout(function () {
        $("#txtCommonName").focus();
    }, 200)
}
// --------------------------------------- /CommonMaster Add  ---------------------------------------

function GetTodayDate() {
    var d = new Date();
    var strDate = ('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    var time = d.getHours() + ":" + d.getMinutes();
    return strDate;
}

function openaccyear() {
    $("#accyearmasmodal").modal("show");
    $("#ddlaccountyear").html("");
    BindDropdown('ddlaccountyear', 'AccountyearDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_ACCOUNTYEARMASTER_GET", '', true);
    $("#ddlaccountyear").val($("#hdnMainAccountyearId").val());
};

function SubmitEmpAccountYearBranch() {
    //$("#ddlaccountyear").val($("#CurrentAccountYear").attr('accyearid'));

    var accid = 0, branchid = 0, BranchName = "";
    if ($("#ddlPartyBranch").val() == null && $("#ddlPartyBranch").val() == undefined) {
        branchid = $("#hdnBranchId").val();
        BranchName = $("#hdnBranchName").val();
    } else {
        branchid = $("#ddlPartyBranch").val();
        BranchName = $("#ddlPartyBranch :selected").text();
    }

    if ($("#ddlaccountyear").val() == null && $("#ddlaccountyear").val() == undefined) {
        accid = $("#hdnMainAccountyearId").val();
    } else {
        accid = $("#ddlaccountyear").val();
    }

    var data = {
        "AccountYearId": accid,
        "BranchId": branchid,
        "BranchName": BranchName,
        "AccountYear": $("#ddlaccountyear option:selected").html()
    }
    $.ajax({
        url: getDomain() + "/Common/SetAccountYearBranchSession",
        data: data,
        async: false,
        cache: false,
        type: 'POST',
        success: function (result) {
            if ($(result).find('RESPONSECODE').text() == "0") {
                location.reload();
                $("#ddlaccountyear").val($("#hdnMainAccountyearId").val());
                //window.close();
                //window.location.replace(getDomain() + '/login/login');
            }
            else {
                notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
            }
        },
        error: OnError,
    });
}
function OperationMessage(title, message, type) {
    var timeout = "";
    var showCancelButton = "", confirmButtonColor = "", confirmButtonText = "";
    if (type == 'success') {
        timeout = 1400;
        showCancelButton = false,
            confirmButtonColor = "#66BB6A",
            confirmButtonText = "Ok"
    }
    else if (type == 'error') {
        //timeout = 500;
        showCancelButton = false,
            confirmButtonColor = "#EF5350",
            confirmButtonText = "Ok"
    }
    else if (type == 'warning') {
        //timeout = 500;
        showCancelButton = false,
            confirmButtonColor = "#FF7043",
            confirmButtonText = "Ok"
    }
    else if (type == 'info') {
        //timeout = 100;
        showCancelButton = false,
            confirmButtonColor = "#2196F3",
            confirmButtonText = "Ok"
    }
    //var positionClass = "toast-top-right";
    //if (message.length > 50)
    //    positionClass = "toast-top-full-width";
    //toastr.options = {
    //    "closeButton": true,
    //    "debug": false,
    //    "newestOnTop": true,
    //    "progressBar": false,
    //    "positionClass": positionClass,
    //    "onclick": null,
    //    "showDuration": "100",
    //    "hideDuration": "100",
    //    "timeOut": timeout,
    //    "extendedTimeOut": "100",
    //    "showEasing": "swing",
    //    "hideEasing": "linear",
    //    "showMethod": "fadeIn",
    //    "hideMethod": "fadeOut"
    //}
    //toastr[type](message, title);

    swal({
        title: title,
        text: message,
        type: type,
        timer: timeout,
        showCancelButton: showCancelButton,
        confirmButtonColor: confirmButtonColor,
        confirmButtonText: confirmButtonText
    });
}
function notificationTost(type, message) {
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
}
function checkIsValidFile(accept, type) {
    var isValid = false;
    if (accept.indexOf('image/') > -1) {
        if (type.indexOf('image/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('text/') > -1) {
        if (type.indexOf('text/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.ms-xpsdocument') > -1) {
        if (type.indexOf('application/vnd.ms-xpsdocument') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/pdf') > -1) {
        if (type.indexOf('application/pdf') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') > -1) {
        if (type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/vnd.ms-excel') > -1) {
        if (type.indexOf('application/vnd.ms-excel') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('application/vnd.ms-excel.sheet.binary.macroEnabled.12') > -1) {
        if (type.indexOf('application/vnd.ms-excel.sheet.binary.macroEnabled.12') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('csv/') > -1) {
        if (type.indexOf('csv/') > -1) {
            isValid = true;
        }
    }
    if (accept.indexOf('application/zip/') > -1) {
        if (type.indexOf('application/zip/') > -1) {
            isValid = true;
        }
    }

    if (accept.indexOf('application/x-zip-compressed') > -1) {
        if (type.indexOf('application/x-zip-compressed') > -1) {
            isValid = true;
        }
    }
    return isValid;
}
function AlignJqGridHeader(tableId, columns) {
    var i = 0;
    for (; i < columns.length; i++) {
        $('#' + tableId + '_' + columns[i]).each(function () {
            this.style.setProperty('text-align', 'center', 'important');
        });
    }
}

function RightAlignJqGridHeader(tableId, columns) {
    var i = 0;
    for (; i < columns.length; i++) {
        $('#' + tableId + '_' + columns[i]).each(function () {
            this.style.setProperty('text-align', 'right', 'important');
        });
    }
}

function SetColorToJqGridHeader(tableId, columns, color) {
    var i = 0;
    for (; i < columns.length; i++) {
        $('#' + tableId + '_' + columns[i]).each(function () {
            this.style.setProperty('background-color', color, 'important');
        });
    }
}

function SetColorToJqGridColumnSearch(tableId, columns, color) {
    var i = 0;
    for (; i < columns.length; i++) {
        $('#tableId #gs_' + columns[i]).closest('th').each(function () {
            this.style.setProperty('background-color', color, 'important');
        });
    }
}

function PrintProcess(View, id) {
    $("#ModalPrint").modal('show');

    $("#PrintYes").click(function () {
        if (id) {
            View.print(id);
            id = "";
        }
        $("#ModalPrint").modal('hide');
    });
    $("#PrintNo").click(function () {
        id = "";
        $("#ModalPrint").modal('hide');
    });
}

var xmlvars = {};
Object.defineProperty(xmlvars, 'common_colmap', {
    get: function () {
        return 'DETAILSLIST>DETAILS>';
    },
});
Object.defineProperty(xmlvars, 'common_root', {
    get: function () {
        return 'DETAILSLIST';
    },
});
Object.defineProperty(xmlvars, 'common_row', {
    get: function () {
        return 'DETAILS';
    },
});
Object.defineProperty(xmlvars, 'common_response', {
    get: function () {
        return 'SERVICERESPONSE>';
    },
});
//Object.defineProperty(xmlvars, 'common_totalwt', {
//    get: function () {
//        return 'SERVICERESPONSE>TOTALWT>';
//    },
//});
// Variables for permission messages
var permissionvars = {
};
Object.defineProperty(permissionvars, 'unauthorized', {
    get: function () {
        return '-401: UNAUTHORIZED ACCESS. PLEASE RE-LOGIN.';
    },
});
Object.defineProperty(permissionvars, 'add', {
    get: function () {
        return '-401: UNAUTHORIZED ACCESS. PLEASE RE-LOGIN.';
    },
});
Object.defineProperty(permissionvars, 'edit', {
    get: function () {
        return '-401: UNAUTHORIZED ACCESS. PLEASE RE-LOGIN.';
    },
});
Object.defineProperty(permissionvars, 'delete', {
    get: function () {
        return '-401: UNAUTHORIZED ACCESS. PLEASE RE-LOGIN.';
    },
});
var jqGridVariables = {
    stringSearchOption: {
        sopt: ['cn', 'eq', 'ne'], clearSearch: false
    },
    ApprovalBtnFmatter: function (cellvalue, options, rowObject, view) {
        if (cellvalue == 1) {
            return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch active_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"' + view + '.ApproveId(' + options.rowId + ');\" checked/></label></div>';
        }
        else {

            return '<div class="checkbox" style="margin-top:0px!important"><label class="form-control-label"><input type="checkbox" class="toggleswitch deactive_sw" data-on="Yes" data-off="No" data-toggle="toggle" value="' + options.rowId + '"  id="IsActiveSwitch' + options.rowId + '" onchange=\"' + view + '.ApproveId(' + options.rowId + ');\" /></label></div>';
        }

    },
    chkFmatter: function (cellvalue, options, rowObject) {
        if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
            return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
        else
            return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
    },
    dateFmatter: function (cv, op, ro) {
        if (cv == '01/01/1900' || cv == '')
            return "";
        else
            return cv;
    },
    ImagesFmatter: function (cellvalue, options, rowobject, path) {
        return "<img width=\"40\" height=\"40\" src=\"" + getDomain() + path + cellvalue + "\">";
    },
    printBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
        return "<button onclick=\"PrintProcess(" + view + "," + options.rowId + ");\" type='button' data-toggle='tooltip' data-placement='bottom' title='Record Print' class='btn acto-actionbtn actionprint'><i class='fa fa-print'></i></button>";
    },
    FunctionBtnFmatter: function (cellvalue, options, rowObject, view, oper, functionname, icon, color) {
        return "<div onclick=\"" + view + "." + functionname + "('" + options.rowId + "','edit');\"><i  style=\"cursor:pointer;  color:" + color + ";\" title=\"Edit\" class=\"" + icon + " fa-lg\"></i></div>";
    },
    editBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
        return "<div onclick=\"" + view + ".triggerId('" + options.rowId + "','edit');\"><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div>";
    },
    editBtnFmatter_CheckBox: function (cellvalue, options, rowObject, view, oper) {
        return "<input CHK_id=" + options.rowId + " class='check' checkBoxValue=" + options.rowId + " style='height:16px;width:16px' type='checkbox' onclick=\"" + view + ".triggerid_checkbox('" + options.rowId + "','edit')\"/>";
    },
    ViewBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
        return "<div  onclick=\"" + view + ".triggerId('" + options.rowId + "','view');\"><i style=\"cursor:pointer\" title=\"View\" class=\"hr-font-green fa fa-eye\"></i></div>";
    },
    deleteBtnFmatter: function (cellvalue, options, rowObject, view) {
        return "<div onclick=\"" + view + ".deleteRow('" + options.rowId + "');\"><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
    },
    ActionBtnFmatter: function (cellvalue, options, rowObject, view) {
        if (isU() && isD()) {
            return "<button onclick=\"" + view + ".triggerId('" + options.rowId + "','edit');\" type='button' class='btn acto-actionbtn actionedit'><i class='fa fa-pencil'></i></button>" +
                "<button onclick=\"" + view + ".deleteRow('" + options.rowId + "');\" type='button' class='btn acto-actionbtn actiondelete'><i class='fa fa-trash'></i></button>"
        }
        else if (isU()) {
            return "<button onclick=\"" + view + ".triggerId('" + options.rowId + "','edit');\" type='button' class='btn acto-actionbtn actionedit'><i class='fa fa-pencil'></i></button>";
        }
        else if (isD()) {
            return "<button onclick=\"" + view + ".deleteRow('" + options.rowId + "');\" type='button' class='btn acto-actionbtn actiondelete'><i class='fa fa-trash'></i></button>";
        }
        else {
            return "";
        }
        //"<div ><i  style=\"cursor:pointer;  color:#1cbac8;\" title=\"Edit\" class=\"fa fa-pencil fa-lg\"></i></div> <div  ><i style=\"cursor:pointer; color:red;\" title=\"Delete\" class=\"fa fa-trash-o fa-lg\"></i></div>";
    },
    PublishBTnFmatter: function (cellvalue, options, rowObject, view) {
        return "<div  onclick=\"" + view + ".Publishsmsoremail('" + options.rowId + "');\"><i style=\"cursor:pointer; color:royalblue;\" title=\"Delete\" class=\"fa fa-paper-plane fa-lg\"></i></div>";
    },
    LetterBtnFmatter: function (cellvalue, options, rowObject, view) {
        return "<div onclick=\"" + view + ".Letterhead('" + options.rowId + "');\"><i style=\"cursor:pointer; color:royalblue;\" title=\"letter head\" class=\"fa fa-file-text-o fa-lg\"></i></div>";
    },
    //CheckBoxBtnFmatter: function (cellvalue, options, rowObject, view) {
    //    return "<input type=\"checkbox\" name=\"txtIsActive\" id=" + options.rowId + " onclick=\"" + view + ".CheckboxRow('" + options.rowId + "')\" class=\"icheckminimal\" />";
    //},
    //------------------------  Switch Button Formatter In Jqgrid ---------------------------------
    SwitchBtnFmatter: function (cellvalue, options, rowObject, view, oper) {
        if (isU() || isA()) {
            if (cellvalue == 1) {
                return '<input type="checkbox" class="switch" data-on-text="Yes" data-off-text="No" data-on-color="warning" data-off-color="default" value="' + options.rowId + '"  id="toggleSwitch' + options.rowId + '" onchange=\"' + view + '.toggleSwitch(' + options.rowId + ');\" checked="checked">';
            }
            else {

                return '<input type="checkbox" class="switch" data-on-text="Yes" data-off-text="No" data-on-color="warning" data-off-color="default" value="' + options.rowId + '"  id="toggleSwitch' + options.rowId + '" onchange=\"' + view + '.toggleSwitch(' + options.rowId + ');\" >';
            }
        }
        else {
            if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
            else
                return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
        }
    },
    //------------------------ End Switch Button Formatter In Jqgrid ---------------------------------
    //------------------------  Switch Button Formatter In Jqgrid ---------------------------------
    CancelSwitchFmatter: function (cellvalue, options, rowObject, view) {
        if (isD()) {
            if (cellvalue == 1) {
                rowsToColor[rowsToColor.length] = options.rowId;
                return '<input type="checkbox" class="switch" data-on-text="Yes" data-off-text="No" data-on-color="warning" data-off-color="default" value="' + options.rowId + '"  id="cancelSwitch' + options.rowId + '" onchange=\"' + view + '.cancelSwitch(' + options.rowId + ');\" checked="checked" disabled>';
            }
            else {
                return '<input type="checkbox" class="switch" data-on-text="Yes" data-off-text="No" data-on-color="warning" data-off-color="default" value="' + options.rowId + '"  id="cancelSwitch' + options.rowId + '" onchange=\"' + view + '.cancelSwitch(' + options.rowId + ');\" >';
            }
        }
        else {
            if (cellvalue == 'FALSE' || cellvalue == '0' || cellvalue == undefined)
                return '<span class="label label-danger" style="font-size: 100%; !important">No</span>';
            else {
                rowsToColor[rowsToColor.length] = options.rowId;
                return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>';
            }
        }
    },
    //------------------------ End Switch Button Formatter In Jqgrid ---------------------------------
    rowColorFmatter: function (cellvalue, options, rowObject, view) {
        if (cellvalue == '1') {
            rowsToColor[rowsToColor.length] = options.rowId;
            return cellvalue;
        }
    },
    CrDrFmatter: function (cellvalue, options, rowObject, Fpoint) {
        //if (!cellvalue) {
        //    return parseFloat(0).toFixed(Fpoint);
        //}
        //if (cellvalue >= 0) {
        //    return (cellvalue.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ' CR'; //parseFloat(cellvalue).toFixed(Fpoint) + ' CR';
        //} else {
        //    return (cellvalue.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ' DR';//parseFloat(-cellvalue).toFixed(Fpoint) + ' DR';
        //}
        if (!cellvalue) {
            return '';
        }
        if (cellvalue >= 0) {
            return parseFloat(cellvalue).toFixed(Fpoint) + ' CR';//cellvalue.replace(cellvalue, parseFloat(cellvalue).toFixed(Fpoint) + ' CR');
        } else {
            return parseFloat(-cellvalue).toFixed(Fpoint) + ' DR';//cellvalue.replace(cellvalue, cellvalue + ' DR');
        }
    },
    BifurcationFormatter: function (cellvalue, options, rowObject) {
        if (cellvalue) {
            return (cellvalue.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        }
    },
    //-------For Distributor Order-----------------------------------
    Search_City_Option: {
        sopt: ['eq'],
        value: '1:Yes;0:No'
    },
}
function CrDrFmatter(cellvalue, Fpoint) {
    if (!cellvalue) {
        return parseFloat(0).toFixed(Fpoint);
    }
    if (cellvalue >= 0) {
        return parseFloat(cellvalue).toFixed(Fpoint) + ' CR';
    } else {
        return parseFloat(-cellvalue).toFixed(Fpoint) + ' DR';
    }
}
function InvalidResponseCode(data) {
    var code = $(data).find('RESPONSECODE').text();
    var msg = '';

    if (code == "-405" || code == "-401") {
        window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else if (code == "-406") {
        window.location.href = getDomain() + "/Login/LogOut";
    }
    else if (code != "0") {
        //msg = "<div><b>Response Code:</b> " + code + "</div>";
        msg = $(data).find('RESPONSEMESSAGE').text();

        OperationMessage('VALIDATION RESPONSECODE', msg, 'error');
    }
}
function OnError(xhr, errorType, exception) {
    var responseText;
    var ErrorDetail = "";

    try {
        responseText = jQuery.parseJSON(xhr.responseText);

        ErrorDetail = "<div><b>" + errorType + " " + exception + "</b></div>";
        ErrorDetail += "<div><b>Exception</b>: " + responseText.ExceptionType + "</div>";
        ErrorDetail += "<div><b>StackTrace</b>: " + responseText.StackTrace + "</div>";
        ErrorDetail += "<div><b>Message</b>: " + responseText.Message + "</div>";
    } catch (e) {
        ErrorDetail = "<div><b>Error Message</b>: " + xhr.responseText + "</div>";
        ErrorDetails(e, '', false)
    }

    if (ErrorDetail.indexOf('-405') > 0) {
        //window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else {
        //OperationMessage 
        OperationMessage('AJAX ERROR RESPONSE', ErrorDetail, 'error');
    }
}
function OnJqloadError(jqXHR, textStatus, errorThrown) {
    var responseText;
    var ErrorDetail = "";

    try {

        if (jqXHR.responseText.indexOf("404") > 0) {
            ErrorDetail = "<div><b>StatusCode</b>: 404</div>";
            ErrorDetail += "<div><b>Message</b>: Method not found.</div>";
        }
        else {
            responseText = jQuery.parseJSON(jqXHR.responseText);

            ErrorDetail = "<div><b>" + textStatus + " " + errorThrown + "</b></div>";
            ErrorDetail += "<div><b>Exception</b>:" + responseText.ExceptionType + "</div>";
            ErrorDetail += "<div><b>StackTrace</b>:" + responseText.StackTrace + "</div>";
            ErrorDetail += "<div><b>Message</b>:" + responseText.Message + "</div>";
        }

    } catch (e) {
        ErrorDetail = "<div><b>Error: " + errorThrown + "</b></div>";

        ErrorDetail += "<div><b>StatusCode</b>:" + jqXHR.status + "</div>";
        ErrorDetail += "<div><b>Status</b>:" + textStatus + "</div>";
        ErrorDetail += "<div><b>Message</b>:" + jqXHR.responseText + "</div>";
        ErrorDetails(e, '', false)
    }

    if (ErrorDetail.indexOf('-405') > 0) {
        window.location.href = getDomain() + "/Login/Login?code=-405";
    }
    else {
        OperationMessage('JQ ERROR RESPONSE', ErrorDetail, 'error');
    }

}
function OnJqbeforeProcessingErrorcheck(data, status, xhr) {
    var code = $(data).find('RESPONSECODE').text();
    if (code == "-405" || code == "-401") {
        //window.location.href = "/Login/LogOut?code=-405";
        window.location.href = getDomain() + "/Login/LogOut?code=-405";
    }
    else if (code != "0") {
        var msg = '';

        msg = "<div><b>Response Code:</b> " + code + "</div>";
        msg += "<div><b>Response Message:</b> " + $(data).find('RESPONSEMESSAGE').text() + "</div>";

        OperationMessage('JQ CHECK RESPONSECODE', msg, 'error');
    }
}
function RegisterFileUpload(btn, img, lblError) {
    $('#' + btn).fileupload({
        url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
        add: function (e, data) {

            if (checkIsValidFile(e.target.accept, data.files[0].type))
                data.submit();
            else
                OperationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
        },
        success: function (response, status) {

            $('#' + img).attr('src', response);
            if ($(lblError).length > 0) {
                $(lblError).hide();
                $(lblError).html("");
            }
        },
        error: OnError
    });
}

function ErrorDetails(Error, FileName, istost) {
    var stack, ErrorLine, ErrorMsg;
    stack = Error.stack || '';
    stack = stack.split('\n').map(function (line) {
        return line.trim();
    });
    ErrorLine = stack.splice(stack[0] == 'Error' ? 2 : 1);
    ErrorLine = ErrorLine[0];
    ErrorMsg = Error.stack;
    if (istost == undefined) {
        istost = true
    }
    ErrorCrud(ErrorMsg, FileName, istost);
}
function ErrorCrud(ErrorMsg, filename, IsTost) {
    $.ajax({
        url: getDomain() + "/Common/ErrorJS?line=" + 0 + "&msg=" + ErrorMsg + "&filename=" + filename,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if (IsTost) {
                OperationMessage('There is some technical error, please try after sometime.', '', 'warning');
            }
        }
    });
}

function BindDropdown(ddl, optionList, url, selectText) {
    $.ajax({
        url: url,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                else
                    $("#" + ddl).html("");
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    $("#" + ddl).append($("#" + optionList).render(JsonObject.serviceresponse.detailslist.details));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function BindCommonDetailsByType(type, ddl, optionList, selectText) {
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMMONMASTERDETAIL_GET&ISACTIVE=1&IsRecordAll=true&_search=true&ColumnRequested=COMMONMASTERDETAILID,COMMONMASTERDETAILNAME&IsRecordAll=true&sidx=COMMONMASTERDETAILNAME&sord=asc&searchField=COMMONMASTERNAME&searchOper=eq&searchString=" + type,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                $("#" + ddl).html("");
                if (selectText != '')
                    $("#" + ddl).html("<option value=''>" + selectText + "</option>");
                if ($(data).find(xmlvars.common_root).text() != '') {
                    var JsonObject = xml2json.parser(data);
                    $("#" + ddl).append($("#CommonMasterDetailDropdownList").render(JsonObject.serviceresponse.detailslist.details));
                }
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError
    });
}
function notificationMessage(title, message, type) {
    OperationMessage(title, message, type);
}

//--------------------------- keyboard shortcuts------------------------------------
$(window).keydown(function (event) {
    //if (event.keyCode == 8) {
    //    if ($(event.target).is('tr') || $(event.target).is('table')) {
    //        if ($("#" + gridid)) {
    //            $("#" + gridid).trigger('reloadGrid');
    //            setTimeout(function () {
    //                var ids = $("#" + gridid).getDataIDs();
    //                $("#" + gridid).setSelection(ids[0], false).focus();
    //            }, 200);
    //        }
    //        filter = ''
    //    }
    //}
    if (event.altKey && event.keyCode == 88) {
        $(".ExitWindow").click();
        event.preventDefault();
    }

    var ActivePortalId = "";
    if (event.keyCode == 34) {
        event.preventDefault();
        $("form:visible").last().find("input:first").select();
    }
    else {
        if ($("#ModalItemGoldKR").is(':visible') && event.keyCode == 13) {
            if ($(document.activeElement).attr('id') == "txtItemCategory") {
                $("#ddlLabourCode").focus();
            }
            else if ($(document.activeElement).attr('id') == "ddlLabourCode") {
                $("#ddlItemColor").focus();
            }
            return;
        }
        if ($(".showSweetAlert").is(':visible') && event.keyCode == 13) {
            $(".showSweetAlert .confirm").click();
        }
        else if ($('.modal:visible:last').attr('id')) {
            ActivePortalId = $('.modal:visible:last').attr('id');
            if (event.altKey && event.keyCode == 83) {
                $("#" + ActivePortalId + " .btnSave:visible").click();
                event.preventDefault();
            }
            else if (event.altKey && event.keyCode == 67) {
                $("#" + ActivePortalId + " .btnCancel").click();
                $("#" + ActivePortalId + " .btnBack").click();
                event.preventDefault();
            }
            else if (event.keyCode == 46) {
                $("#" + ActivePortalId + " .btnDelete").click();
                event.preventDefault();
            }
            else if (event.keyCode == 13) {
                event.preventDefault();
                if ($(document.activeElement).is('input'));
                var obj = document.activeElement;
                if ($(obj).hasClass('txtAutocomplete') && !$(obj).hasClass('Remark')) {
                    if ($(obj).val().trim() == '') {
                        $(obj).val("  ");
                        $(obj).autocomplete({
                            source: false
                        });
                        setTimeout(function () {
                            try {
                                $(obj).autocomplete('search', $(obj).val());
                            } catch (e) {
                                var e = jQuery.Event("keydown");
                                e.keyCode = 50;
                                $(obj).trigger(e);
                            }
                        }, 100);
                        return;
                    }
                }
            }
        }
        else if ($('.panel:visible').attr('id')) {
            ActivePortalId = $('.panel:visible').attr('id');
            if (event.altKey && event.keyCode == 78) {
                $("#" + ActivePortalId + " .btnAddNew").click();
                event.preventDefault();
            }
            else if (event.altKey && event.keyCode == 83) {
                if ($(".sweet-alert").is(':visible')) {
                    $(".sweet-alert .confirm").click();
                } else {
                    $("#" + ActivePortalId + " .btnSave:visible").click();
                }
                event.preventDefault();
            }
            else if (event.altKey && event.keyCode == 67) {
                $("#" + ActivePortalId + " .btnCancel").click();
                $("#" + ActivePortalId + " .btnBack").click();
                event.preventDefault();
            }
            else if (event.keyCode == 46) {
                $("#" + ActivePortalId + " .btnDelete").click();
                event.preventDefault();
            }
            else if (event.keyCode == 13) {
                var obj = document.activeElement;
                if ($(obj).hasClass('txtAutocomplete') && !$(obj).hasClass('Remark')) {
                    if ($(obj).val().trim() == '') {
                        $(obj).val("  ");
                        $(obj).autocomplete({
                            source: false
                        });
                        setTimeout(function () {
                            try {
                                $(obj).autocomplete('search', $(obj).val());
                            } catch (e) {
                                var e = jQuery.Event("keydown");
                                e.keyCode = 50;
                                $(obj).trigger(e);
                            }
                        }, 100);
                        event.preventDefault();
                        return;
                    }
                }

            }
        }
        else if ($('.panel:visible.mulPanel').attr('id')) {
            ActivePortalId = $('.panel:visible.mulPanel').attr('id');
            if (event.altKey && event.keyCode == 78) {
                $("#" + ActivePortalId + " .btnAddNew").click();
                event.preventDefault();
            }
            else if (event.altKey && event.keyCode == 83) {
                $("#" + ActivePortalId + " .btnSave:visible").click();
                event.preventDefault();
            }
            else if (event.altKey && event.keyCode == 67) {
                $("#" + ActivePortalId + " .btnCancel").click();
                $("#" + ActivePortalId + " .btnBack").click();
                event.preventDefault();
            }
            else if (event.keyCode == 46) {
                $("#" + ActivePortalId + " .btnDelete").click();
                event.preventDefault();
            }
            else if (event.keyCode == 13) {
                var obj = document.activeElement;
                if ($(obj).hasClass('txtAutocomplete') && !$(obj).hasClass('Remark')) {
                    if ($(obj).val().trim() == '') {
                        $(obj).val("  ");
                        $(obj).autocomplete({
                            source: false
                        });
                        setTimeout(function () {
                            try {
                                $(obj).autocomplete('search', $(obj).val());
                            } catch (e) {
                                var e = jQuery.Event("keydown");
                                e.keyCode = 50;
                                $(obj).trigger(e);
                            }
                        }, 100);
                        event.preventDefault();
                        return;
                    }
                }

            }
        }

        if (event.keyCode == 13 && (document.activeElement.parentElement.tagName != "TD" || $(document.activeElement).parents().find(".tbl_shortcuts").length > 0)) {
            event.preventDefault();
            if (event.shiftKey) {
                var index = document.activeElement.tabIndex;
                index--;
                //if ($('[tabindex=' + index + ']').is('input')) {
                //    $('[tabindex=' + index + ']').select();
                //}
                //else {
                //    $('[tabindex=' + index + ']').focus();
                //}
                while (index != 0) {
                    if ($('[tabindex=' + index + ']').length > 0) {
                        var temp = false;
                        $('[tabindex=' + index + ']').each(function (key, obj) {
                            if ($(obj).is(":visible")) {
                                if ($(obj).is('input') == true) {
                                    $('[tabindex=' + index + ']').select();
                                }
                                else {
                                    $('[tabindex=' + index + ']').focus();
                                }
                                temp = true;
                                return;
                            }
                        });
                        if (temp) {
                            break;
                        }
                        index--;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                if (document.activeElement.className.search("required") != -1) {
                    if (!document.activeElement.value.trim()) {
                        $(document.activeElement).addClass("table-input-error");
                        return;
                    }
                    else {
                        $(document.activeElement).removeClass("table-input-error");
                    }
                }

                //--------------------------------------KarigarIssue----------------------------------------------------//
                if (document.activeElement.id == "txtAccount") {
                    if ($(document.activeElement.closest(".panel_container").getElementsByTagName('tbody')).attr('id') == "KarigarIssueitem_tbody") {
                        /*if ($("#txtItemName1").val() == "") {*/
                        $("#txtItemName1").focus();
                    }
                    else {
                        var index = document.activeElement.tabIndex;
                        index++;
                        while (index != 0) {
                            if ($('[tabindex=' + index + ']').length > 0) {
                                var temp = false;
                                $('[tabindex=' + index + ']').each(function (key, obj) {
                                    if ($(obj).is(":visible") && !$(obj).is(":disabled")) {
                                        if ($(obj).is('input') == true) {
                                            $(obj).select();
                                        }
                                        else {
                                            $(obj).focus();
                                        }
                                        temp = true;
                                        return false;
                                    }
                                });
                                if (temp) {
                                    break;
                                }
                                index++;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
                //--------------------------------------/KarigarIssue---------------------------------------------------//
                //--------------------------------------Repairing Counter-----------------------------------------------//
                else if (document.activeElement.id == "txtCustomerName") {
                    if (document.activeElement.form.id == "frmQuaBill") {
                        var Id = $($(document.activeElement.form.parentElement.parentElement).find('#FrmItemList').find('#CustomerIssueItem_tbody').find('tr').find('td')[1]).find('input').attr('id');
                        $('#' + Id).focus();
                    }
                }
                //--------------------------------------/Repairing Counter----------------------------------------------//
                //--------------------------------------Tag Generate----------------------------------------------------//
                else if (document.activeElement.id == "chkMRP") {
                    $($($(document.activeElement.closest('form').parentElement.parentElement.parentElement.nextElementSibling.children).children().find('tbody').children()[0]).children()[2].firstElementChild).focus();
                }
                //--------------------------------------/Tag Generate---------------------------------------------------//
                else {
                    var index = document.activeElement.tabIndex;
                    index++;
                    while (index != 0) {
                        if ($('[tabindex=' + index + ']').length > 0) {
                            var temp = false;
                            $('[tabindex=' + index + ']').each(function (key, obj) {
                                if ($(obj).is(":visible") && !$(obj).is(":disabled")) {
                                    if ($(obj).is('input') == true) {
                                        $(obj).select();
                                    }
                                    else {
                                        $(obj).focus();
                                    }
                                    temp = true;
                                    return false;
                                }
                            });
                            if (temp) {
                                break;
                            }
                            index++;
                        }
                        else {
                            break;
                        }
                    }
                }
            }
        }
        else if (event.keyCode == 13) {
            //CustomAutoComplete for open autocomplete on enter
            if (!$(document.activeElement).hasClass('ui-autocomplete-input')) {
                event.preventDefault();
                if ($(".sweet-alert:visible").length > 0) {
                    $(".confirm").click();
                } else {
                    keyboardInTable();
                }
            } else {
                event.preventDefault();
                if ($(document.activeElement).val() == '') {
                    if ($(document.activeElement).is('input')) {
                        if (!$(document.activeElement).hasClass('Remark') && !$(document.activeElement).hasClass('txtRemarks')) {
                            if ($(document.activeElement).attr('onkeyup')) {
                                if ($(".sweet-alert:visible").length > 0) {
                                    $(".confirm").click();
                                } else {
                                    keyboardInTable();
                                }
                                //$(document.activeElement).val("  ");
                                //$(document.activeElement).keyup();
                            } else {
                                $(document.activeElement).autocomplete();
                                $(document.activeElement).val("  ");
                                setTimeout(function () { $(document.activeElement).autocomplete("search") }, 50);
                            }
                            return;
                        } else {
                            keyboardInTable();
                        }
                    }
                }
                else {
                    if ($(".sweet-alert:visible").length > 0) {
                        $(".confirm").click();
                    } else {
                        keyboardInTable();
                    }
                }

            }
            //else {
            //$($($('iframe:visible').attr('id')).contents().context.activeelement).autocomplete();
            //$($($('iframe:visible').attr('id')).contents().context.activeelement).autocomplete("search");  
            //}

        }
        else if (event.altKey && event.shiftKey && event.keyCode == 70) {
            $('.searchbox').select();
        }
        else if (event.altKey && event.keyCode == 84) {
            var totalLi = $('li[role="presentation"]');
            var totalLi0 = $('li[role="presentation"] a');
            var nextli = $('li[role="presentation"].active').next('li');
            var nextli0 = $('li[role="presentation"].active').next('li a');
            if (nextli.length > 0) {
                $(totalLi).removeClass('active');
                $(nextli).addClass('active');
                $(nextli0).click();
            } else {
                $(totalLi).removeClass('active');
                $(totalLi[0]).addClass('active');
                $(totalLi0[0]).click();
            }
            event.preventDefault();
        }
        else if (event.keyCode == 27 && document.activeElement.closest(".panel_container")) {
            event.preventDefault();
            //-----------------------taxInvoice Page Esc Key Event-----------------------------------//
            if (document.activeElement.closest('.taxInvoicediv')) {
                if (document.activeElement.id == "txtSearchTag") {
                    var tagId = document.activeElement.id;
                    var tbody = $("#" + tagId).parent().parent().parent().find('tbody');
                    var tbodyId = tbody.attr('id');
                    var tdId = $("#" + tbodyId + " tr:nth-child(1) td:nth-child(4) input").attr('id');
                    if ($("#" + tdId).is(":disabled") == false) {
                        $("#" + tdId).focus();
                    } else {
                        $("#txtAccount").focus();
                    }
                }
                else /*if ($(document.activeElement).closest('tbody').attr('id') == "TaxInvoiceitem_tbody")*/ {
                    var formList = document.activeElement.closest(".panel_container").getElementsByTagName("form");
                    if (formList.length > 1) {
                        var i = 0;
                        for (i in formList) {
                            if (formList[i] == document.activeElement.closest("form")) {
                                if (formList[+i + 1]) {
                                    var inputList = formList[+i + 1].querySelectorAll("input,textarea");
                                    var j = 1;
                                    if (inputList.length > 0) {
                                        for (j in inputList) {
                                            if ($(inputList[j]).is(':visible'))
                                                if ($(inputList[j]).attr('type') != 'checkbox' && !$(inputList[j]).prop('disabled')) {
                                                    formList[+i + 1].querySelectorAll("input,textarea")[j].select();
                                                    break;
                                                }
                                        }
                                    }
                                    event.preventDefault();
                                    break;
                                }
                            }
                        }
                    }
                }
            }//-----------------------/taxInvoice Page Esc Key Event-----------------------------------//
            else {
                var formList = document.activeElement.closest(".panel_container").getElementsByTagName("form");
                if (formList.length > 1) {
                    var i = 0;
                    for (i in formList) {
                        if (formList[i] == document.activeElement.closest("form")) {
                            if (formList[+i + 1]) {
                                if ($(formList[+i + 1]).is(':visible')) {
                                    var inputList = formList[+i + 1].querySelectorAll("input,textarea");
                                    var j = 1;
                                    if (inputList.length > 0) {
                                        for (j in inputList) {
                                            if ($(inputList[j]).is(':visible'))
                                                if (/*$(inputList[j]).attr('type') != 'checkbox' && */!$(inputList[j]).prop('disabled')) {
                                                    formList[+i + 1].querySelectorAll("input,textarea")[j].select();
                                                    break;
                                                }
                                        }
                                    }
                                    event.preventDefault();
                                    break;
                                }
                                else {
                                    if ($(formList[+i + 2]).is(':visible')) {
                                        var inputList = formList[+i + 2].querySelectorAll("input,textarea");
                                        var j = 1;
                                        if (inputList.length > 0) {
                                            for (j in inputList) {
                                                if ($(inputList[j]).is(':visible'))
                                                    if (/*$(inputList[j]).attr('type') != 'checkbox' && */!$(inputList[j]).prop('disabled')) {
                                                        formList[+i + 2].querySelectorAll("input,textarea")[j].select();
                                                        break;
                                                    }
                                            }
                                        }
                                        event.preventDefault();
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (event.altKey && event.keyCode == 82) {
            var id = $(".ui-jqgrid-btable").attr("id");
            $("#" + id).trigger("reloadGrid", [{
                current: true
            }]);
            setTimeout(function () {
                var ids = $("#" + id).getDataIDs();
                $("#" + id).setSelection(ids[0], false).focus();
                searchingrid = true;
                filter = '';
                gridid = id;
            }, 200);
        }
        //else if (event.keyCode == 40) {
        //    var id = $("#" + $(".ui-jqgrid-btable").attr("id") + " #" + $("#" + $(".ui-jqgrid-btable").attr("id")).jqGrid('getGridParam', "selrow")).next().attr('id');
        //    if (id) {
        //        $("#" + $(".ui-jqgrid-btable").attr("id")).setSelection(id);
        //    }
        //} else if (event.keyCode == 38) {
        //    var id = $("#" + $(".ui-jqgrid-btable").attr("id") + " #" + $("#" + $(".ui-jqgrid-btable").attr("id")).jqGrid('getGridParam', "selrow")).prev().attr('id');
        //    if (id) {
        //        $("#" + $(".ui-jqgrid-btable").attr("id")).setSelection(id);
        //    }
        //}

    }

    if ($(event.target).hasClass('numbers')) {
        return numbersOnly(event, true, false);
    }
    if ($(event.target).hasClass('number')) {
        return numbersOnly(event, false, false);
    }
    if ($(event.target).hasClass('negative')) {
        return numbersOnly(event, true, true);
    }
    if ($(document.activeElement).is('tr')) {
        gridid = $(event.target.parentElement.parentElement).attr('id');
        searchingrid = true;
    }

    if (searchingrid) {
        if (!event.altKey && event.key)
            if (!event.altKey && event.key.length < 2) {
                filter += event.key;
                //GridSearch();
            }
    }
});
var gridid = '';
var filter = '';
var searchingrid = false;
function GridSearch() {
    var table, tr, td, i, txtValue;
    table = $(".ui-jqgrid-btable:visible")[0];
    if (table && searchingrid) {
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = $(tr[i]).find('td:visible');
            if (td) {
                var displaycnt = 0;
                for (j = 0; j < td.length; j++) {
                    if (td[j]) {
                        txtValue = td[j].textContent || td[j].innerText;
                        if (txtValue != '')
                            if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
                                displaycnt = 1;
                            }
                    }
                }
                if (displaycnt == 1) {
                    $("#" + gridid).setSelection($(tr[i]).attr('id'), false).focus();
                    return;
                }
            }
        }
    }
}

function keyboardInTable() {
    if (event.shiftKey && document.activeElement.parentElement.previousElementSibling) {
        var activeParent = document.activeElement.parentElement;
        while ($(activeParent.previousElementSibling).is(":visible") == false) {
            activeParent = activeParent.previousElementSibling;
        }
        if (activeParent.previousElementSibling.firstElementChild) {
            var newFocusable = activeParent.previousElementSibling.firstElementChild;
            if ($(newFocusable).is('input:disabled')) {
                if (activeParent.parentElement.previousElementSibling) {
                    var prevRow = activeParent.parentElement.previousElementSibling;
                    var temp = "";
                    for (var i = 2; i <= prevRow.children.length; i++) {
                        temp = prevRow.children[prevRow.children.length - i].firstElementChild;
                        if (temp && $(temp).is(':visible')) {
                            if ($(prevRow.children[prevRow.children.length - i].firstElementChild).is('input')) {
                                prevRow.children[prevRow.children.length - i].firstElementChild.select();
                            }
                            else {
                                prevRow.children[prevRow.children.length - i].firstElementChild.focus();
                            }
                            break;
                        }
                    }
                }
            }
            else {
                if ($(newFocusable).is('input')) {
                    (newFocusable).select();
                }
                else {
                    (newFocusable).focus();
                }
            }
        }
        else {
            if (activeParent.parentElement.previousElementSibling) {
                var prevRow = activeParent.parentElement.previousElementSibling;
                var temp = "";
                for (var i = 2; i <= prevRow.children.length; i++) {
                    temp = prevRow.children[prevRow.children.length - i].firstElementChild;
                    if (temp && $(temp).is(':visible')) {
                        if ($(prevRow.children[prevRow.children.length - i].firstElementChild).is('input')) {
                            prevRow.children[prevRow.children.length - i].firstElementChild.select();
                        }
                        else {
                            prevRow.children[prevRow.children.length - i].firstElementChild.focus();
                        }
                        break;
                    }
                }
            }
        }
    }
    else if (document.activeElement.parentElement.nextElementSibling) {

        if (document.activeElement.className.search("required") != -1) {
            if (!document.activeElement.value.trim()) {
                $(document.activeElement).addClass("table-input-error");
                return;
            }
            else {
                $(document.activeElement).removeClass("table-input-error");
            }
        }

        var visibleElement = document.activeElement.parentElement.nextElementSibling;
        while ($(visibleElement).is(':visible') == false) {
            visibleElement = visibleElement.nextElementSibling;
        }
        if (visibleElement.firstElementChild) {
            if (visibleElement.firstElementChild.tagName == "DIV") {
                if (document.activeElement.parentElement.parentElement.nextElementSibling) {
                    if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[1]).is(':visible')) {
                        if (document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild) {
                            if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild).is('input')) {
                                if ($(document.activeElement.parentElement.parentElement.parentElement).attr('id') == 'TaxInvoiceitem_tbody' || $(document.activeElement.parentElement.parentElement.parentElement).attr('id') == 'KarigarIssueitem_tbody') {
                                    if ($(document.activeElement.parentElement.parentElement.children[1]).val() == "") {
                                        $(document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild).focus();
                                        if (document.activeElement.parentElement.parentElement.nextElementSibling)
                                            $(document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild).attr('disable', 'disable')
                                    } else {
                                        document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild.select();
                                    }
                                } else {
                                    //if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild).is(':disabled')) {
                                    //    document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild.select();
                                    //} else {
                                    if (!$(document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild).is(':disabled')) {
                                        document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild.select();
                                    } else if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild).is(':visible') == true) {
                                        document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild.focus();
                                    } else {
                                        document.activeElement.parentElement.parentElement.nextElementSibling.children[4].firstElementChild.focus();
                                    }
                                    /*}*/
                                }
                                //document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild.select();
                            }
                            else {
                                document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild.focus();
                            }
                        }
                    }
                    else {
                        var i = 1;
                        while (i > 0) {
                            if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[i]).is(':visible')) {
                                if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[i].firstElementChild).is('input')) {
                                    document.activeElement.parentElement.parentElement.nextElementSibling.children[i].firstElementChild.focus();
                                    break;
                                }
                            }
                            i++;
                        }
                        //if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild).is('input')) {
                        //    document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild.select();
                        //}
                        //else {
                        //    document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild.focus();
                        //}
                    }
                }
                else {
                    if ($('.modal:visible:last').attr('id') || document.activeElement.closest('tbody').id == "TagOtherItem_tbody") {
                        ItemAddNewRowModal();
                    }
                    else {
                        if ($(document.activeElement.parentElement.parentElement.parentElement).attr('id') == 'TaxInvoiceitem_tbody') {
                            if ($(document.activeElement.parentElement.parentElement.children[1]).val() == "") {
                                ItemAddNewRow();
                                var id = document.activeElement.offsetParent.nextElementSibling.firstElementChild.id;
                                var tagId = document.activeElement.id;
                                $("#" + id).focus();
                                $("#" + tagId).attr('disable', 'disable');
                                //$(document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild).focus();
                                //$(document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild).attr('disable', 'disable')
                            } else {
                                document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild.select();
                            }
                        }
                        else {
                            ItemAddNewRow();
                        }
                    }
                }
            }
            else {
                var i = 1, elename, id;
                id = visibleElement.firstElementChild.id
                elename = visibleElement.firstElementChild;
                while (i > 0) {
                    if ($("#" + id).length > 0) {
                        if ($("#" + id).is('input:not(:disabled)') == true) {
                            elename.select();
                            i = 0;
                        }
                        else if ($("#" + id).is('select:not(:disabled)') == true) {
                            elename.focus();
                            i = 0;
                        }
                        else if ($("#" + id).is('button:not(:disabled)') == true) {
                            elename.focus();
                            i = 0;
                        }
                        else {
                            id = elename.parentElement.nextElementSibling.firstElementChild.id
                            elename = elename.parentElement.nextElementSibling.firstElementChild;
                            i++;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
        else {
            if (document.activeElement.parentElement.parentElement.nextElementSibling) {
                if (document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild) {
                    if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild).is('input')) {
                        document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild.select();
                    }
                    else {
                        document.activeElement.parentElement.parentElement.nextElementSibling.children[1].firstElementChild.focus();
                    }
                }
                else {
                    if ($(document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild).is('input')) {
                        document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild.select();
                    }
                    else {
                        if (document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild != null)
                            document.activeElement.parentElement.parentElement.nextElementSibling.children[2].firstElementChild.focus();
                    }
                }
            }
            else {
                if ($('.modal:visible:last').attr('id') || document.activeElement.closest('tbody').id == "TagOtherItem_tbody") {
                    ItemAddNewRowModal();
                }
                else {
                    ItemAddNewRow();
                }
            }
        }
    }

}

function ShortcutAutoComplete(obj) {
    if ($(obj).hasClass('txtAutocomplete')) {
        if ($(obj).val().trim() == '') {
            $(obj).val("  ");
            $(obj).autocomplete({
                source: false
            });
            setTimeout(function () {
                try {
                    $(obj).autocomplete('search', $(obj).val());
                } catch (e) {
                    var e = jQuery.Event("keydown");
                    e.keyCode = 50;
                    $(obj).trigger(e);
                }
            }, 100);
            event.preventDefault();
            return;
        }
    }
}

/*---------------------------for create class which allow only numbers-------------------------*/
function numbersOnly(evt, isFloat, isNegative) {
    var Sender = evt.target;
    if (!Sender) {
        return;
    }
    if (Sender.readOnly) return false;

    var key = evt.which || !window.event ? evt.which : event.keyCode;
    var value = Sender.value;

    if ((key == 110 || key == 190) && isFloat) {
        var selected = document.selection ? document.selection.createRange().text : "";

        if (value.indexOf(".") > 0) {
            Sender.value = "";
            Sender.value = "0.";
        } else if (selected.length == 0 && value.indexOf(".") == -1 && value.length > 0)
            Sender.value += ".";
        else if (Sender.value.length == 0)
            Sender.value = "0.";
        return false;
    } else if (key == 189 || key == 109) { // minus sign '-'
        if (!isNegative) return false;
        if (value.indexOf('-') == -1) Sender.value = '-' + value; else Sender.value = value.substring(1);
        if (Sender.onchange != null) {
            if (Sender.fireEvent) {
                Sender.fireEvent('onchange');
            } else {
                var e = document.createEvent('HTMLEvents');
                e.initEvent('change', false, false);
                Sender.dispatchEvent(e);
            }
        }
        var begin = Sender.value.indexOf('-') > -1 ? 1 : 0;
        if (Sender.setSelectionRange) {
            Sender.setSelectionRange(begin, Sender.value.length);
        } else {
            var range = Sender.createTextRange();
            range.moveStart('character', begin);
            range.select();
        }

        return false;
    } else {
        if (key != 110 && key != 18 && key != 190 && key != 189 && key != 109) {
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        } else {
            return false;
        }
    }
    //if (key > 31 && (key < 48 || key > 57)) return false;
}


/*---------------------------for File Upload-------------------------*/
function RegisterImageUpload(btn, img, lblError) {
    $('#' + btn).fileupload({
        url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
        add: function (e, data) {
            if (checkIsValidFile(e.target.accept, data.files[0].type))
                data.submit();
            else
                notificationMessage('Invalid File', 'Please select only ' + e.target.accept + ' files', 'warning');
        },
        success: function (response, status) {
            $('#' + img).attr('src', response);
            if ($(lblError).length > 0) {
                $(lblError).hide();
                $(lblError).html("");
            }
        },
        error: OnError
    });
}


function convertDateTimeToddmmyy(dateStr, separator) {
    if (dateStr != "") {
        var separator = (typeof (separator) == undefined) ? '-' : separator;
        var re = new RegExp('([0-9]{2})/([0-9]{2})/([0-9]{4})', 'm');
        var matches = re.exec(dateStr);
        return matches[2] + separator + matches[1] + separator + matches[3];
    }
    else {
        return "";
    }
}


/*----------------------------Dynamic height to iframe in every page------------------------------*/
var $element = "", lastHeight = "", newHeight = "", type;
function checkForHeightChanges() {
    type = "";
    $("*").prop("autocomplete", 'new');
    if ($('iframe:visible').attr('id')) {
        if ($("#" + $('iframe:visible').attr('id')).contents().find('.modal:visible:last').attr("id")) {
            $element = $("#" + $('iframe:visible').attr('id')).contents().find('.modal:visible:last').children().first();
        }
        //else if ($("#" + $('iframe:visible').attr('id')).contents().find('.sweet-alert:visible').length != 0) {
        //    $element = $("#" + $('iframe:visible').attr('id')).contents().find('.sweet-alert:visible')[0];
        //    type = "alert";
        //}
        else {
            $element = $("#" + $('iframe:visible').attr('id')).contents().find('.page-container');
        }
        if ($element) {
            //if (type == "alert") {
            //    newHeight = $element.offsetHeight;
            //}
            //else {
            newHeight = $element.outerHeight(true);
            if (newHeight < 500) {
                newHeight = 500;
            }
            //}
            $("#" + $('iframe:visible').attr('id')).height(newHeight);
            //if (newHeight != lastHeight) {
            //    $("#" + $('iframe:visible').attr('id')).height(newHeight);
            //    lastHeight = newHeight;
            //}
        }
    }

    setTimeout(checkForHeightChanges, 100);
}


/*----------------------------AutoSuggestRemark For All Pages------------------------------*/
function AutosuggestRemark(obj) {
    var myfilter;
    myfilter = {
        rules: []
    };
    myfilter.rules.push({
        field: "COMMONMASTERDETAILNAME", op: "eq", data: $(obj).val()
    });
    $(obj).autocomplete({
        source: function (request, response) {
            var url = getDomain() + "/Common/BindMastersDetails?ServiceName=COMMONMASTERDETAIL_GET&ISACTIVE=1&IsRecordAll=true&_search=true&ColumnRequested=COMMONMASTERDETAILID,COMMONMASTERDETAILNAME&sidx=COMMONMASTERDETAILNAME&sord=asc&searchField=COMMONMASTERNAME&searchOper=eq&searchString=Remarks&myfilters=" + JSON.stringify(myfilter);
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
                                            value: item.commonmasterdetailname
                                        }
                                    }
                                    else {
                                        return {
                                            label: item.commonmasterdetailname,
                                            value: item.commonmasterdetailname
                                        }
                                    }
                                }))
                        } else {
                            var result = [
                                {
                                    label: 'No Results Found',
                                    value: $(obj).val()
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
        minLength: 1,
        autoFocus: true
    });
}

function FixValue() {
    var myInputs = document.querySelectorAll('.fixed');
    myInputs.forEach(function (elem) {
        elem.addEventListener("input", function () {
            if (elem.value > 0) {
                var dec = elem.getAttribute('decimals');
                if (dec) {
                    var regex = new RegExp("(\\.\\d{" + dec + "})\\d+", "g");
                    elem.value = elem.value.replace(regex, '$1');
                }

            }
        });
    });
    CapitlizeRemark();
    $(".fixed").on("blur", function () {
        if ($(this).val() > 0) {
            var dec = $(this).attr('decimals');
            if (dec) {
                if (parseInt(dec) > 1) {
                    if ($(this).hasClass('round')) {
                        $(this).val(parseFloat(parseFloat(formatTwoDigitDecimal(+$(this).val())).toFixed(dec - 1)).toFixed(dec));
                    } else {
                        $(this).val(parseFloat(parseFloat($(this).val()).toFixed(dec - 1)).toFixed(dec));
                    }
                } else {
                    if ($(this).hasClass('round')) {
                        $(this).val(parseFloat(parseFloat(formatTwoDigitDecimal(+$(this).val())).toFixed(dec - 1)).toFixed(dec));
                    } else {
                        $(this).val(parseFloat(parseFloat($(this).val()).toFixed(dec - 1)).toFixed(dec));
                    }
                }
            }
        }
    });
    $("input").click(function () {
        this.select();
    });
}

function CapitlizeRemark() {
    $('.remark').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
    $('.remarks').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
    $('.Remark').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
    $('.txtRemarks').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
    $('#txtRemarks').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });

    $('.Remarks').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
    $('[name=txtRemark]').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
    $('[name=txtRemarks]').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
    $('#txtRemark').keyup(function () {
        $(this).val($(this).val().toLowerCase());
    });
}
//----------------------------- amt = amt-taxamt,maxamt= max amount part of amt, tax = in per(%)
function RandomValue(amt, maxamt, tax) {
    var loop = parseInt(amt / maxamt);
    min = maxamt - 2000, max = maxamt;
    var arry = [];
    var arry3 = [];
    var total = 0;
    for (i = 0; i < loop; i++) {
        arry[i] = Math.floor(Math.random() * (max - min)) + min;
        arry3[i] = parseFloat(arry[i] + (arry[i] * tax / 100)).toFixed(3);
        total = total + arry[i];
    }
    if (total < amt) {
        if (amt - total > maxamt) {
            var arry2 = [];
            arry2 = RandomValue(amt - total, maxamt);
        } else {
            arry[loop] = amt - total;
        }

    }
    if (arry2) {
        arry = arry.concat(arry2);
    }
    return {
        array1: arry, array2: arry3
    };
}

//----------------------------- amount  = array1 from  RandomValue(amt, maxamt,tax), current gold rate
function WeightOnPrice(amount, rate) {
    var i = 0; WeightArray = []; TotalWeight = 0;
    for (i; i < amount.length; i++) {
        WeightArray[i] = parseFloat(amount[i] / rate).toFixed(3);
        TotalWeight = TotalWeight + WeightArray[i];
    }
    return WeightArray;
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

//-----------------------------Get HSN Code------------------------------//
function GetHsnCode(id, name) {
    var myfilter = { rules: [] };
    myfilter.rules.push(/*{ field: "MENUID", op: "eq", data: id },*/ { field: "DAYBOOKNAME", op: "eq", data: name });
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=HSNCODEPAGE_GET&myfilters=" + JSON.stringify(myfilter),
        async: false,
        cache: false,
        type: 'POST',
        success: function (response) {
            var List = xml2json.parser(response);
            if (List.serviceresponse.detailslist) {
                var list = List.serviceresponse.detailslist.details;
                List = list.hsnid;
                if (id) {
                    $("#txtHsnCode" + id).val(List);
                }
                $("#hdnHsnCodeId").val(List);
            }
            else {
                if (id) {
                    $("#txtHsnCode" + id).val('');
                }
                $("#hdnHsnCodeId").val('');
            }
        },
        error: OnError
    });
}