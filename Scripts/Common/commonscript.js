// Layout function add
var CommonView = {
    variables: {
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=CUSTOMERMASTER_CRUD",
        Oper: "Add",
        Masterid: 0,
        addedit: "added",
        File: 'commonscript.js',
        mouseOutSide: false,
    },
    AddEditPatyCustomer: function (id, type) {
        CommonView.bindBalanceSheetGroup();
        CommonView.AutosuggestCityName('ddlCityCommon');
        CommonView.AutosuggestCityName('ddlPlaceOfSupplyCommon');
        if (id)
            CommonView.GetCustomerDetails(id, type);
        else {
            CommonView.variables.Oper = "Add";
            CommonView.variables.Masterid = '';
            $('#ddlmastertypeCommon').attr('disabled', false);
        }
        if (!type) {
            $("#lblMobileCommmon").addClass('addstar');
            $("#txtmobilenoCommon").addClass('required');
        } else {
            if (type.toLowerCase() == 'party') {
                $("#lblMobileCommmon").addClass('addstar');
                $("#txtmobilenoCommon").addClass('required');
            } else {
                $("#lblMobileCommmon").removeClass('addstar');
                $("#txtmobilenoCommon").removeClass('required')
            }
        }

        $("#AddEditPartyCusomerModal").modal('show');
        setTimeout(function () {
            if (id)
                $("#txtAccountNameCommon").focus();
            else
                $("#ddlmastertypeCommon").focus();
        }, 100)
    },
    bindBalanceSheetGroup: function () {
        $("#ddlBalnceSheetGroupCommon").html("");
        BindDropdown('ddlBalnceSheetGroupCommon', 'BalnceSheetGroupListCommon', getDomain() + "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1", '-- Balance Sheet Group --');
        if ($("#txtAccount").attr('AccountType') == 'CUSTOMER')
            $('#ddlBalnceSheetGroupCommon option').filter(function () {
                return (($(this).text()).includes('DEBTORS'));
            }).prop('selected', true);
        else
            $('#ddlBalnceSheetGroupCommon option').filter(function () {
                return (($(this).text()).includes('CREDITORS'));
            }).prop('selected', true);
        $("#ddlmastertypeCommon").on('change', function () {
            $("label.error").hide();
            if ($(this).val() == 'PartyMaster') {
                $("#lblMobileCommmon").addClass('addstar');
                $("#txtmobilenoCommon").addClass('required');
                $("#dvCommonPlaceOfSupply").show();
                $('#ddlBalnceSheetGroupCommon option').filter(function () {
                    return (($(this).text()).includes('CREDITORS'));
                }).prop('selected', true);
            }
            else if ($(this).val() == 'CustomerMaster') {
                $("#lblMobileCommmon").removeClass('addstar');
                $("#txtmobilenoCommon").removeClass('required');
                $("#dvCommonPlaceOfSupply").hide();
                $('#ddlBalnceSheetGroupCommon option').filter(function () {
                    return (($(this).text()).includes('DEBTORS'));
                }).prop('selected', true);
            } else {
                $("#lblMobileCommmon").removeClass('addstar');
                $("#txtmobilenoCommon").removeClass('required');
                $("#dvCommonPlaceOfSupply").hide();
            }

        });
    },
    AutosuggestCityName: function (id) {
        try {
            $("#" + id).autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&ISRECORDALL=1&_search=true&searchField=CITYNAME&searchOper=cn&searchString=" + $("#" + id).val();
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
                                                    CityId: item.cityid,
                                                    StateId: item.stateid
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.cityname,
                                                    value: item.cityname,
                                                    CityId: item.cityid,
                                                    StateId: item.stateid
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#" + id).val().length <= 1) {
                                        $("#" + id).attr('cityid', '');
                                    }
                                }
                            }
                            else {
                                if ($("#ddlCityCommon").val().length <= 1) {
                                    $("#ddlCityCommon").attr('cityid', '');
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
                    $("#" + id).attr('cityid', ui.item.CityId);
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
            ErrorDetails(e, Purchasedetailview.variables.File);
        }
    },
    GetCustomerDetails: function (id, type) {
        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({
            field: "ACCID", op: "eq", data: id
        });
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

                        CommonView.variables.Oper = "Edit";
                        CommonView.variables.Masterid = List.accountid;
                        $("#txtAccountNameCommon").val(List.accountname);
                        $("#ddlBalnceSheetGroupCommon").val(List.balancesheetgroupid);
                        $("#ddlmastertypeCommon").val(List.mastertype);
                        $('#ddlmastertypeCommon').attr('disabled', true);
                        $("#ddlCityCommon").attr('cityid', List.cityid);
                        $("#ddlCityCommon").val(List.cityname);
                        $("#ddlPlaceOfSupplyCommon").attr('cityid', List.supplycityid);
                        $("#ddlPlaceOfSupplyCommon").val(List.supplycityname);
                        $("#txtmobilenoCommon").val(List.contact.toString() == '[object Object]' ? '' : List.contact);
                        //$("#txtPhonenoCommon").val(List.phone);
                        if (List.address)
                            if (List.address.length)
                                $("#txtAddressCommon1").val(List.address);

                        if (List.address2)
                            if (List.address2.length)
                                $("#txtAddressCommon2").val(List.address2);

                        if (List.address3)
                            if (List.address3.length)
                                $("#txtAddressCommon3").val(List.address3);

                        if (List.pincode)
                            if (List.pincode.toString().length)
                                $("#txtPincodeCommon").val(List.pincode);

                        if (List.adharcardno)
                            if (List.adharcardno.length)
                                $("#txtAdharCommon").val(List.adharcardno);

                        if (List.gstno)
                            if (List.gstno.length)
                                $("#txtGSTCommon").val(List.gstno);

                        if (List.panno)
                            if (List.panno.length)
                                $("#txtPannoCommon").val(List.panno);
                    }
                }
            }
        });
    },
    AccountNameAutoComplete: function () {
        $('#txtAccount').autocomplete({
            source: function (request, response) {
                var myfilter;
                myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $('#txtAccount').val() });
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
                                                label: item.searchdata,
                                                value: item.accountname,
                                                partyid: item.accountid,
                                                partyname: item.accountname,
                                                mobile: item.contact,
                                                accounttype: item.accounttype,
                                                address: item.address

                                            }
                                        }
                                        else {
                                            return {
                                                label: item.searchdata,
                                                value: item.accountname,
                                                partyid: item.accountid,
                                                partyname: item.accountname,
                                                mobile: item.contact,
                                                accounttype: item.accounttype,
                                                address: item.address

                                            }
                                        }
                                    }))
                            }
                            else {
                                if ($("#txtAccount").val().length <= 1) {
                                    $("#txtAccount").attr('AccountId', '');
                                    $("#txtAccount").attr('AccountType', '');
                                    $("#partyid").val('');
                                    $("#AccountDetails").html('');
                                    $("#partytype").val('');
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
                            if ($("#txtAccount").val().length <= 1) {
                                $("#partyid").val('');
                                $("#AccountDetails").html('');
                                $("#partytype").val('');
                                $("#txtAccount").attr('AccountId', '');
                                $("#txtAccount").attr('AccountType', '');
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
                    $("#txtAccount").attr('AccountId', ui.item.partyid);
                    $("#txtAccount").attr('AccountType', ui.item.accounttype);
                    $("#partyid").val(ui.item.partyid);
                    $("#partytype").val(ui.item.accounttype);
                    $("#contact").html(ui.item.mobile.toString() == '[object Object]' ? '' : ui.item.mobile);
                    $("#address").html(ui.item.address);
                    if ($("#partytype").val() == 'CUSTOMER') {
                        $(".partyTax").hide();
                        $("#PartyLbl").html('Amt');
                    } else {
                        $(".partyTax").show();
                        $("#PartyLbl").html('Taxable Amt');
                    }
                    Velidation(0, 0, 0);
                } else {
                    setTimeout(function () {
                        $("#txtAccount").val('');
                    }, 1)
                }
            },
            change: function (event, ui) {
                if (!ui.item) {
                    //$("#partyid").val('');
                }
            },
            focus: function (event, ui) {
                //$("#partyid").val('');
            },
            minLength: 1,
            autoFocus: true
        });
    },
    AddDataTableHeader: function (View) {
        try {
            $('.as_tbl_hd').prepend(`<div id="reportrange">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24" height="24" viewBox="0 0 16 16"><path d="M14.25 2.5h-.75v-1h-1.25v1h-8.5v-1H2.5v1h-.75A1.25 1.25 0 0 0 .5 3.75v9.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25v-9.5a1.25 1.25 0 0 0-1.25-1.25zM1.75 3.75h12.5V5H1.75V3.75zm0 9.5v-7h12.5v7z"/><path d="M3 8h1.1v1.2H3zm0 2.4h1.1v1.2H3zM11.8 8h1.1v1.2h-1.1zm0 2.4h1.1v1.2h-1.1zM9.6 8h1.1v1.2H9.6zm0 2.4h1.1v1.2H9.6zM7.4 8h1.1v1.2H7.4zm0 2.4h1.1v1.2H7.4zM5.2 8h1.1v1.2H5.2zm0 2.4h1.1v1.2H5.2z"/></svg>&nbsp;
            <span></span>
            </div>
            `);

            $(".as_add").append(`<p onclick=${View}.editTrigger() class="add_data"><svg xmlns="http://www.w3.org/2000/svg" class="icn_add" width="24" height="24" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 6C13 5.44771 12.5523 5 12 5C11.4477 5 11 5.44771 11 6V11H6C5.44771 11 5 11.4477 5 12C5 12.5523 5.44771 13 6 13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H13V6Z"/>
                </svg><span>Add</span></p>`);
            $(".as_exit").append(`<p class="ext_page ExitWindow" onclick="window.top.close();"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="icn_close" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
                        </svg><span>Exit</span></p>
            `);
        }
        catch (e) {
            ErrorDetails(e, CommonView.variables.File);
        }
    },

    AddDatepicker: function () {
        try {
            var start = moment().subtract(29, 'days');
            var end = moment();
            function cb(start, end) {
                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }
            $('#reportrange').daterangepicker({
                startDate: start,
                endDate: end,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);
            cb(start, end);
        }
        catch (e) {
            ErrorDetails(e, CommonView.variables.File);
        }
    },

    //------------- Navbar in menu Search ---------------
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

                    var url = getDomain() + CommonView.variables.BindAccountListUrl + "&myfilters=" + JSON.stringify(myfilter);
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
                                        //CommonView.variables.AccountId = "";
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
                                    //CommonView.variables.AccountId = "";
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
                        var url = CommonView.variables.BindLedgerDetailsUrl + "&myfilters=" + JSON.stringify(myfilter);
                        CommonView.initializeJqgrid(url);
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
        }
        catch (e) {
            ErrorDetails(e, CommonView.variables.File);
        }
    },
}

$(document).ready(function () {
    // navigation  
    $('.as_nav_bdy > ul > li').on({
        click: function () {
            if (!$(this).hasClass('active')) {
                $('.sub_nav_icn').hide('fast');
                $(this).children('.sub_nav_icn').show('fast');
                $('.as_nav_bdy > ul > li').removeClass('active');
                $(this).addClass('active');
                $('.sub_nav_icn > ul > li').removeClass('active');
            }
        }
    });

    CommonView.variables.mouseOutSide = false;
    $('.sub_nav_icn > ul > li').on({
        click: function (e) {
            e.stopPropagation();
            $('.sub_nav_icn > ul > li').removeClass('active');
            $(this).addClass('active');
            $('.as_sub_popover').show();
            const topPosition = $(this).position().top;
            const leftPosition = $(this).position().left;
            $('.as_sub_popover').css('top', topPosition, 'left', leftPosition);
        },
        mouseover: function () {
            $('.as_sub_popover').show();
            const topPosition = $(this).position().top;
            const leftPosition = $(this).position().left;
            $('.as_sub_popover').css('top', topPosition, 'left', leftPosition);
        }
    });
    $('.as_sub_popover li').on({
        click: function () {
            $('.as_sub_popover li').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('body').on('mouseup', function () {
        if (CommonView.variables.mouseOutSide) {
            $('.as_sub_popover').hide();
            if ($(".sub_nav_icn ul li").hasClass('active')) {
                $(".sub_nav_icn ul li.active").removeClass('active');
            }
        }
    });
    $('.tbl_pop_cls, .as_info > a').click(function (e) {
        e.preventDefault();
        $('.shor_pop').toggle();
    });
    //--- /navigation  


    $("#linkhelpicon").click(function () {
        $("#panelShortcut").modal("show");
    });
    $("#CancelShortcut").click(function () {
        $("#panelShortcut").modal("hide");
    });

    // Account Year Bind 
    BindDropdown('ddlaccountyear', 'AccountyearDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_ACCOUNTYEARMASTER_GET", '', true);

    // Branch Bind
    $("#ddlbranchList").html("");
    BindDropdown('ddlbranchList', 'BranchDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=EMPLOYEEBRANCH_GET", '', true);
    $("#ddlbranchList").val($("#hdnBranchId").val());

    // SessionCheck
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
    }, 3000);

    // add New Popup close
    $('.as_edt_cls svg').click(function () {
        $('.as_add_data_wrap').hide();
    });

    // ItemOther modal toggle
    $('.as_pop_otr_tgr').click(function () {
        $('.other_item_pop').show();
    });
    $('.as_pop_otr_cls').click(function () {
        $('.other_item_pop').hide();
    });


    // Setup - add a text input to each footer cell
    $('#saleQuotation thead .tbl_input').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" class="as_dt_search ' + title + '" placeholder="Search ' + title + '" />');
    });

    // Search click event
    $('.tbl_srch_trg,.srch_index').on('click', function () {
        $(".tbl_info").css('display', 'flex');
        $(".tbl_col_search").css('display', 'none');
        const tarName = $(this).data('search-tar');
        $(`.${tarName}`).css('display', 'flex');
        const ownName = $(this).data('search-own');
        $(`.${ownName}`).css('display', 'none');
        $(`.${ownName} input`).val('');
        $(`.${tarName} input`).focus();
    });

    // Mask Plugin Intialize
    $('.pannomask').mask("SSSSS0000S");
    $('.gstnomask').mask("00SSSSS0000SAZA");
    $('.adhaarnomask').mask("0000 0000 0000");
    $('.pincodemask').mask("000000");
    $('.mobilenomask').mask("00000-00000");

    //------ Exit button Click ------
    $(".ExitWindow").click(function () {
        window.top.close();
    });


    // Window screen width 1024 to min width //

});
//--------- /Layout function add ---------

$(window).keydown(function (event) {
    if (event.altKey && event.keyCode == 88) {
        $(".ExitWindow").click();
        event.preventDefault();
    }
});


function SubMenuBind(submenu) {
    //alert(submenu);
    $(".as_sub_popover").html("")
    var bidndata = "";
    bidndata += "<span class='as_pop_arw'></span>";
    bidndata += $("#hdn" + submenu).html()
    $(".as_sub_popover").html(bidndata)
    CommonView.variables.mouseOutSide = true;
}

// Ajax Call Error
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

// Try Catch Error 
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

// Swal Plugin notification display
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

// Bind DropDown
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

//----------- Datatable in the Print button click -----------//
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

//------------------------------------- DataTable Action Variable ------------------------------------------//
var DatatableVaribales = {
    ViewBtnFormatter: function (row, view) {
        //if (isU()) {
        return `<div class=\"btn Font-16 viewdata\" style=\"cursor:pointer;\" onclick=\"${view}.view(${row});\"><i class=\"bx bx-user Btn-View text-white\"></i></div>`;
        //}
        //return "";
    },
    editBtnFormatter: function (row, view) {
        //if (isU()) {
        return `<div class=\"btn Font-16 editdata\" style=\"cursor:pointer;\" onclick=\"${view}.triggerId(${row});\"><svg class="icn_edt" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M18.4324 4C18.2266 4 18.0227 4.04055 17.8325 4.11933C17.6423 4.19811 17.4695 4.31358 17.3239 4.45914L5.25659 16.5265L4.42524 19.5748L7.47353 18.7434L19.5409 6.67608C19.6864 6.53051 19.8019 6.3577 19.8807 6.16751C19.9595 5.97732 20 5.77348 20 5.56761C20 5.36175 19.9595 5.1579 19.8807 4.96771C19.8019 4.77752 19.6864 4.60471 19.5409 4.45914C19.3953 4.31358 19.2225 4.19811 19.0323 4.11933C18.8421 4.04055 18.6383 4 18.4324 4ZM17.0671 2.27157C17.5 2.09228 17.9639 2 18.4324 2C18.9009 2 19.3648 2.09228 19.7977 2.27157C20.2305 2.45086 20.6238 2.71365 20.9551 3.04493C21.2864 3.37621 21.5492 3.7695 21.7285 4.20235C21.9077 4.63519 22 5.09911 22 5.56761C22 6.03611 21.9077 6.50003 21.7285 6.93288C21.5492 7.36572 21.2864 7.75901 20.9551 8.09029L8.69996 20.3454C8.57691 20.4685 8.42387 20.5573 8.25597 20.6031L3.26314 21.9648C2.91693 22.0592 2.54667 21.9609 2.29292 21.7071C2.03917 21.4534 1.94084 21.0831 2.03526 20.7369L3.39694 15.7441C3.44273 15.5762 3.53154 15.4231 3.6546 15.3001L15.9097 3.04493C16.241 2.71365 16.6343 2.45086 17.0671 2.27157Z" />
                                    </svg></div>`;
        //}
        //return "";
    },
    deleteBtnFormatter: function (row, view) {
        //if (isD()) {
        return `<div class=\"btn Font-16 deletedata\" style=\"cursor:pointer;\" onclick=\"${view}.deleteRow(${row});\"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M7 4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H19.9394L19.1153 20.1871C19.0164 21.7682 17.7053 23 16.1211 23H7.8789C6.29471 23 4.98356 21.7682 4.88474 20.1871L4.06055 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H7V4ZM9 5H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V5ZM6.06445 7L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1191 20.0624L17.9355 7H6.06445Z"
                                            fill="#ad2c2c" />
                                    </svg></div>`;
        //"<div class=\"btn Font-16 deletedata\" style=\"cursor:pointer;\" onclick=\"" + view + ".deleteRow(" + row + ");\"><i class=\"bx bx-trash-alt Btn-Delete text-white\"></i></div>"
        //}
        //return "";
    },
    assignBtnFormatter: function (row, view) {
        return `<div class=\"btn Font-16 assigndata\" style=\"cursor:pointer;\" onclick=\"${view}.assignLoan(${row});\"><i class=\"icomoon icon-address-book Btn-Assign\"></i></div>`;
    },
    activeLblFormatter: function (data) {
        if ((data == 'TRUE' || data == '1' || data == 1 || data == 'true' || data == 'True') && data)
            return '<span class="label label-success" style="font-size: 100%; !important">Yes</span>'
        else
            return '<span class="label label-danger" style="font-size: 100%; !important">No</span>'
    },
    ImagesFormatter: function () {
        return "<img width=\"15\" height=\"15\" src=\"" + getDomain() + path + cellvalue + "\">";
    },
    printBtnFormatter: function (row, view, Id) {
        return `<a href="javascript:void(0);" onclick="PrintProcess(${view},${Id})" title="Print"><svg class="icn_pnt" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 3C5 2.44772 5.44772 2 6 2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289L18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6V8H20C21.6569 8 23 9.34315 23 11V16C23 17.1046 22.1046 18 21 18H19V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V18H3C1.89543 18 1 17.1046 1 16V11C1 9.34315 2.34315 8 4 8H5V3ZM4 10C3.44772 10 3 10.4477 3 11V16H5V14C5 13.4477 5.44772 13 6 13H18C18.5523 13 19 13.4477 19 14V16H21V11C21 10.4477 20.5523 10 20 10H4ZM17 8H7V4H14.5858L17 6.41421V8ZM7 15V20H17V15H7Z" />
                                    </svg></a>`;
    }
}

//------------------------------------- JQgrid plugin var --------------------------------------------------//
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

function getGridHeight() {
    return $(window).height() * 420 / 754;
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
    }
    catch (e) {
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


// formate function
const formatTwoDigitDecimal = (num, decimals) => num.toLocaleString('en-US', {
    minimumFractionDigits: (decimals || 2),
    maximumFractionDigits: (decimals || 2),
});

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