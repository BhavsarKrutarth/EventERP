var searchtxt = "";
var EmployeeDetailMasPRView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=EMPLOYEEMAS_PAYROLL_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=EMPLOYEEMAS_PAYROLL_CRUD",
        BindCityUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        SaveImageUrl: "/Common/SaveSingleImage",
        //BindUserGroupUrl: "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET",
        //BindInsentiveGroupUrl: "/Common/BindMastersDetails?ServiceName=MASTER_INSENTIVE_GET",
        //BindBranchUrl: "/Common/BindMastersDetails?ServiceName=BRANCHMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        //BindBalanceSheetGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        Oper: 'Add',
        addedit: "added",
        File: "EmployeeMaster.js",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmEmployeeDetailMas").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['EMPLOYEEMAS_PAYROLLID','EMPLOYEETYPE', 'Code', 'Full Name','SHORTNAME', 'Gender', 'DOB', 'DOJ', 'Adreess', 'Adreess', 'Adreess', 'City', 'CITYID', 'Mobile No', 'MOBILENO2', 'EMAILID', 'PINCODE', 'PHOTOPATH', 'BANKNAME', 'ACNO', 'IFSC','BRANCHNAME'];
        var colModel = [
            { name: "EMPLOYEEMAS_PAYROLLID", index: "EMPLOYEEMAS_PAYROLLID", xmlmap: xmlvars.common_colmap + "EMPLOYEEMAS_PAYROLLID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "EMPLOYEETYPE", index: "EMPLOYEETYPE", xmlmap: xmlvars.common_colmap + "EMPLOYEETYPE", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "EMPLOYEEMAS_PAYROLLCODE", width: 5, index: "EMPLOYEEMAS_PAYROLLCODE", xmlmap: xmlvars.common_colmap + "EMPLOYEEMAS_PAYROLLCODE", stype: 'text', sortable: false, search: false, hidden: false },
            { name: "FULLNAME", width: 21, index: "FULLNAME", xmlmap: xmlvars.common_colmap + "FULLNAME", stype: 'text', sortable: false, search: false },
            { name: "SHORTNAME", index: "SHORTNAME", xmlmap: xmlvars.common_colmap + "SHORTNAME", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "GENDER", width: 5, index: "GENDER", xmlmap: xmlvars.common_colmap + "GENDER", stype: 'text', align: 'center', sortable: false, search: false },
            { name: "DOB", index: "DOB", xmlmap: xmlvars.common_colmap + "DOB", stype: 'text', align: 'center', sortable: false, search: false, hidden: true },
            { name: "DOJ", index: "DOJ", xmlmap: xmlvars.common_colmap + "DOJ", stype: 'text', sortable: false, search: false, width: 21 },
            { name: "ADDRESS1", index: "ADDRESS1", xmlmap: xmlvars.common_colmap + "ADDRESS1", stype: 'text', sortable: true, hidden: true },
            { name: "ADDRESS2", index: "ADDRESS2", xmlmap: xmlvars.common_colmap + "ADDRESS2", stype: 'text', sortable: true, hidden: true },
            { name: "ADDRESS3", index: "ADDRESS3", xmlmap: xmlvars.common_colmap + "ADDRESS3", stype: 'text', sortable: true, hidden: true },
            { name: "CITY", hidden: true, index: "CITY", xmlmap: xmlvars.common_colmap + "CITY", stype: 'text', align: 'center', sortable: false, search: false },
            { name: "CITYID", index: "CITYID", xmlmap: xmlvars.common_colmap + "CITYID", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "MOBILENO1", width: 8, index: "MOBILENO1", xmlmap: xmlvars.common_colmap + "MOBILENO1", stype: 'text', sortable: false, search: false },
            { name: "MOBILENO2", index: "MOBILENO2", xmlmap: xmlvars.common_colmap + "MOBILENO2", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "EMAILID", hidden: true, index: "EMAILID", xmlmap: xmlvars.common_colmap + "EMAILID", stype: 'text', sortable: false, search: false },
            { name: "PINCODE", hidden: true, index: "PINCODE", xmlmap: xmlvars.common_colmap + "PINCODE", stype: 'text', align: 'center', sortable: false, search: false },
            { name: "PHOTOPATH", index: "PHOTOPATH", width: 10, xmlmap: xmlvars.common_colmap + "PHOTOPATH", sortable: true, align: "center", hidden: true },
            { name: "BANKNAME", index: "BANKNAME", stype: 'text', xmlmap: xmlvars.common_colmap + "BANKNAME", sortable: false, search: false, hidden: true },
            { name: "ACNO", index: "ACNO", stype: 'text', xmlmap: xmlvars.common_colmap + "ACNO", sortable: false, search: false, hidden: true },
            { name: "IFSC", index: "IFSC", stype: 'text', xmlmap: xmlvars.common_colmap + "IFSC", sortable: false, search: false, hidden: true },
            { name: "BRANCHNAME", index: "BRANCHNAME", stype: 'text', xmlmap: xmlvars.common_colmap + "BRANCHNAME", sortable: false, search: false, hidden: true },
           
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmployeeDetailMasPRView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmployeeDetailMasPRView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'EmployeeDetailMasPRView') } });
        }
        //$("#table_EmployeeDetailMas").GridUnload();
        $.jgrid.gridUnload("#table_EmployeeDetailMas");
        $("#table_EmployeeDetailMas").jqGrid({
            //data: mydata,
            url: getDomain() + url,
            datatype: "xml",
            height: getGridHeight(),
            scroll: 1,
            autowidth: true,
            shrinkToFit: true,
            footerrow: true,
            rowNum: 30,
            rowList: [20, 30, 40],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_EmployeeDetailMas",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "EMPLOYEEMAS_PAYROLLID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                if ($('#table_EmployeeDetailMas').getGridParam('records') === 0) {
                    $('.gview_table_EmployeeDetailMas .ui-jqgrid-htable').hide();
                }
                else
                    $('.gview_table_EmployeeDetailMas .ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_EmployeeDetailMas').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_EmployeeDetailMas').setGridWidth(width);
                    $("#gbox_table_EmployeeDetailMas").width(width);
                }, 200);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'EMPLOYEEMAS_PAYROLLID',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    EmployeeDetailMasPRView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_EmployeeDetailMas").jqGrid('navGrid', '#pager_EmployeeDetailMas',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_EmployeeDetailMas_left").css("width", "");
        AlignJqGridHeader('table_EmployeeDetailMas', ['edit', 'delete', 'DOB', 'GENDER', 'CITY', 'PINCODE']);

        // JqGrid navigations shortcuts
        jQuery("#table_EmployeeDetailMas").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    EmployeeDetailMasPRView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = EmployeeDetailMasPRView.variables.BindMasterUrl;
        EmployeeDetailMasPRView.initializeJqgrid(url);
        EmployeeDetailMasPRView.clearControls();
    },

    triggerId: function (id) {
        try {
            var rowData = jQuery("#table_EmployeeDetailMas").getRowData(id);
            $("#hdnEmpId").val(id);
            $("#txtEmployeeName").val(rowData['FULLNAME']);
            $("#ddlEmployeeType").val(rowData['EMPLOYEETYPE']);
            $("#txtShortName").val(rowData['SHORTNAME']);
            if (rowData['GENDER'] == 'Male') {
                $("#male").iCheck("check");
            }
            else if (rowData['GENDER'] == "Female") {
                $("#female").iCheck("check");
            }
            $("#txtMobileNo1").val(rowData['MOBILENO1']);
            $("#txtMobileNo2").val(rowData['MOBILENO2']);
            $("#txtEmailId").val(rowData['EMAILID']);
            $("#txtAddress1").val(rowData['ADDRESS1']);
            $("#txtAddress2").val(rowData['ADDRESS2']);
            $("#txtAddress3").val(rowData['ADDRESS3']);
            $("#txtDOB").val(rowData['DOB']);
            $("#txtDOJ").val(rowData['DOJ']);
            $('#txtcity').val(rowData["CITY"]);
            $("#txtcity").attr("cityid", rowData["CITYID"]);
            $("#txtPincode").val(rowData['PINCODE']);
            $("#txtBankName").val(rowData['BANKNAME']);
            $("#txtACNo").val(rowData['ACNO']);
            $("#txtIFSCCode").val(rowData['IFSC']);
            $("#txtBranchName").val(rowData['BRANCHNAME']);
            if (rowData['PHOTOPATH']) {
                $('#profileimg').attr('src', getDomain() + "/UploadFiles/EmployeePayRoll/" + rowData['PHOTOPATH']);
            } else {

                $('#profileimg').attr('src', getDomain() + "/Content/assets/images/default-user.png");
            }
            $('#hdnimg').val("/UploadFiles/EmployeePayRoll/" + rowData['PHOTOPATH']);
            $("#txtEmpCode").val(rowData['EMPLOYEEMAS_PAYROLLCODE']);
            $("#panelEmployeeDetailMasList").hide();
            $("#panelEmployeeDetailMasEdit").show();
            $("#panelEmployeeDetailMasDelete").modal('hide');
            $("#spanEmployeeDetailMasoper").text("Edit Employee Detail");
            EmployeeDetailMasPRView.showTitlePermissionWise('edit');
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            EmployeeDetailMasPRView.variables.addedit = "deleted";
            EmployeeDetailMasPRView.variables.Oper = "Delete";
            var rowData = jQuery("#table_EmployeeDetailMas").getRowData(id);
            $("#delblFullName").html(rowData['FULLNAME']);
            $("#hdnimg").val(rowData['PHOTOPATH']);
            $("#hdnEmpId").val(id);
            $("#panelEmployeeDetailMasDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            EmployeeDetailMasPRView.clearControls();
            $("#panelEmployeeDetailMasList").hide();
            $("#panelEmployeeDetailMasEdit").show();
            $("#panelEmployeeDetailMasDelete").modal('hide');
            EmployeeDetailMasPRView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteEmployeeDetailMas').attr('disabled', true);
            var data = {
                "oper": EmployeeDetailMasPRView.variables.Oper,
                "EMPLOYEEMAS_PAYROLLID": $("#hdnEmpId").val()
            }
            EmployeeDetailMasPRView.savedata(data);
        } catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var usergroup, ddlAdminOfBranch, ddlInsentive, ddlCounter;
            var isValid = $("#frmEmployeeDetailMas").valid();

            if ($("#chkIsAdmin").prop("checked") == true) {
                if ($("#ddlAdminOfBranch").val() == null) {
                    $("#ddlAdminOfBranchError").show();
                    isValid = false;
                } else {
                    $("#ddlAdminOfBranchError").hide();
                    ddlAdminOfBranch = $("#ddlAdminOfBranch").val().toString();
                }
            }
            else {
                $("#ddlAdminOfBranchError").hide();
                ddlAdminOfBranch = "";
            }

            if (!isValid)
                return;

            EmployeeDetailMasPRView.variables.Oper = 'Add';
            EmployeeDetailMasPRView.variables.addedit = "added";
            EmployeeDetailMasPRView.variables.Masterid = $("#hdnEmpId").val();

            if (EmployeeDetailMasPRView.variables.Masterid != "0" && parseInt(EmployeeDetailMasPRView.variables.Masterid) > 0) {
                EmployeeDetailMasPRView.variables.Oper = 'Edit';
                EmployeeDetailMasPRView.variables.addedit = 'updated';
            }
            if (EmployeeDetailMasPRView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (EmployeeDetailMasPRView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveEmployeeDetailMas').attr('disabled', true);

            var gender = 'Male';
            if ($("#male").prop("checked") == true) {
                gender = 'Male';
            }
            else if ($("#female").prop("checked") == true) {
                gender = 'Female';
            }

            var data = {
                "FULLNAME": $("#txtEmployeeName").val(),
                "SHORTNAME": $("#txtShortName").val(),
                "GENDER": gender,
                "DOB": $("#txtDOB").val(),
                "DOJ": $("#txtDOJ").val(),
                "MOBILENO1": $("#txtMobileNo1").val().replace('-', ''),
                "MOBILENO2": $("#txtMobileNo2").val().replace('-', ''),
                "EMAILID": $("#txtEmailId").val(),
                "CITYID": $("#txtcity").attr("cityid"),
                "ADDRESS1": $("#txtAddress1").val(),
                "ADDRESS2": $("#txtAddress2").val(),
                "ADDRESS3": $("#txtAddress3").val(),
                "PINCODE": $("#txtPincode").val(),
                "BANKNAME": $("#txtBankName").val(),
                "ACNO": $("#txtACNo").val(),
                "IFSC": $("#txtIFSCCode").val(),
                "BRANCHNAME": $("#txtBranchName").val(),
                "EMPLOYEETYPE": $("#ddlEmployeeType").val(),
                "oper": EmployeeDetailMasPRView.variables.Oper,
                "EMPLOYEEMAS_PAYROLLID": EmployeeDetailMasPRView.variables.Masterid
            }
            
            EmployeeDetailMasPRView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (EmployeeDetailMasPRView.variables.Oper == 'Delete')
                $('#btnDeleteEmployeeDetailMas').attr('disabled', false);
            else
                $('#btnSaveEmployeeDetailMas').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(EmployeeDetailMasPRView.variables.Oper + ' Operation', 'Record is ' + EmployeeDetailMasPRView.variables.addedit + ' successfully', 'success');
                EmployeeDetailMasPRView.clearControls();
                $("#panelEmployeeDetailMasList").hide();
                $("#panelEmployeeDetailMasEdit").show();
                $("#table_EmployeeDetailMas").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#ddlEmployeeType").val("temporary")
            $("#txtEmpCode").val("");
            $("#txtEmployeeName").val("");
            $("#txtShortName").val("");
            $("#male").iCheck("check");
            $("#txtDOB").val("");
            $("#txtDOJ").val("");
            $("#txtMobileNo1").val("");
            $("#txtMobileNo2").val("");
            $("#txtEmailId").val("");
            $("#txtcity").attr("cityid", "");
            $("#txtAddress1").val("");
            $("#txtAddress2").val("");
            $("#txtAddress3").val("");
            $("#txtPincode").val("");
            $("#txtBankName").val("");
            $("#txtACNo").val("");
            $("#txtIFSCCode").val("");
            $("#txtBranchName").val("");
            $("#profileimg").attr("src", getDomain() + '/Content/assets/images/default-user.png');
            $("#hdnimg").val("");
            EmployeeDetailMasPRView.variables.Oper = 'Add',
            EmployeeDetailMasPRView.variables.Masterid = ""
            jQuery("#table_list_EmployeeDetailMas").jqGrid('resetSelection');
            $("#panelEmployeeDetailMasList").show();
            $("#panelEmployeeDetailMasEdit").hide();
            $("#panelEmployeeDetailMasDelete").modal('hide');
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            if ($("#profileimg").attr('src') != getDomain() + "/Content/assets/images/default-user.png") {
                var originalfile = '';
                var newfile = '';
                if (EmployeeDetailMasPRView.variables.Oper == 'Delete') {
                    originalfile = $('#hdnimg').val();
                    newfile = $("#profileimg").val();
                }
                else {
                    originalfile = $('#hdnimg').val();
                    newfile = $('#profileimg').attr('src');
                }

                $.ajax({
                    url: getDomain() + EmployeeDetailMasPRView.variables.SaveImageUrl,
                    async: false,
                    cache: false,
                    data: {
                        originalfile: originalfile,
                        newfile: newfile,
                        module: 'EmployeePayRoll',
                        isResize: false,
                        oper: EmployeeDetailMasPRView.variables.Oper
                    },
                    success: function (result) {
                        data.PHOTOPATH = result;
                        $.ajax({
                            url: getDomain() + EmployeeDetailMasPRView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: false,
                            cache: false,
                            type: 'POST',
                            success: EmployeeDetailMasPRView.btnMasterSubmitOnSuccess,
                            error: OnError
                        });
                    }
                });
            }
            else {
                $.ajax({
                    url: getDomain() + EmployeeDetailMasPRView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: false,
                    cache: false,
                    type: 'POST',
                    success: EmployeeDetailMasPRView.btnMasterSubmitOnSuccess,
                    error: OnError
                });
            }
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveEmployeeDetailMas").show();
                $("#dEmployeeDetailMasTitle").show();
                $("#dViewEmployeeDetailMasTitle").hide();
            }
            else {
                if ($("#btnSaveEmployeeDetailMas").length > 0) {
                    $("#btnSaveEmployeeDetailMas").hide();
                }
                $("#dViewEmployeeDetailMasTitle").show();
                $("#dEmployeeDetailMasTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
        }
    },
    BindTag: function () {

        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "INSERTIVETYPE", op: "eq", data: "Tag" }); //$('#txtAccount').val()
        $("#ddlTag").html("");
        BindDropdown('ddlTag', 'InsentiveGoldDropdownList', getDomain() + EmployeeDetailMasPRView.variables.BindInsentiveGroupUrl + "&IsRecordAll=true&searchString=1&myfilters=" + JSON.stringify(myfilter), '', true);

        var Store_InsentiveGold = [];
        $('#ddlTag').multiselect();
        $("#ddlTag option").each(function (key, obj) {

            Store_InsentiveGold.push($(obj).val());
        });
        $(".InsentiveAmount .btn-group").attr('tabindex', 11);
        $('#ddlTag').val(Store_InsentiveGold);
        $("#ddlTag").multiselect("refresh");
        //$("#ddlTag").on("change", function () {
        //    if ($("#ddlTag").val() == null) {
        //        $("#ddlTagError").show();
        //        isValid = false;
        //    } else {
        //        $("#ddlTag").hide();

        //    }
        //});
    },

    //bindIntesive: function () {
    //    $("#ddlInsentiveGroup").html("");
    //    BindDropdown('ddlInsentiveGroup', 'InsentiveUserDropdownList', getDomain() + EmployeeDetailMasPRView.variables.BindInsentiveGroupUrl, '', true);
    //},

    bindAdminOfBranch: function () {
        $("#ddlAdminOfBranch").html("");
        BindDropdown('ddlAdminOfBranch', 'BranchDropdownList', getDomain() + EmployeeDetailMasPRView.variables.BindBranchUrl + "&_search=true&searchField=ISACTIVE&searchOper=eq&searchString=1", '', true);
    },

    bindCity: function () {
        $("#ddlCity").html("");
        //BindDropdown('ddlCity', 'CityDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&IsRecordAll=true&ISACTIVE=1", '--Select City--', true);
    },
    BindCity_AutoComplete: function () {
        $('#txtcity').autocomplete({
            source: function (request, response) {
                var myfilter;
                myfilter = {
                    rules: []
                };
                var Value = $('#txtcity').val();
                var PartyName = Value.replace(/[^a-z0-9\s]/gi, '');

                myfilter.rules.push({ field: "SEARCH", op: "eq", data: PartyName }); //$('#txtAccount').val()
                var url = getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&myfilters=" + JSON.stringify(myfilter);
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
                                                name: item.cityname,
                                                cityid: item.cityid,
                                            }
                                        }
                                        else {
                                            return {
                                                label: item.cityname,
                                                name: item.cityname,
                                                cityid: item.cityid,
                                            }
                                        }
                                    }))
                            }
                            else {
                                $("#txtcity").html('');
                                notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                            }
                        }
                        else {
                            $("#txtcity").html('');
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
                    $("#txtcity").attr('cityid', ui.item.cityid);
                }
                else {
                    setTimeout(function () {
                        $("#txtcity").val('');
                    }, 1)
                }
            },
            change: function (event, ui) {
                if (!ui.item) {
                    //$("#txtcity").val('');
                }
            },
            focus: function (event, ui) {
                //$("#txtcity").val('');
            },
            minLength: 1,
            autoFocus: true
        });
    },

    AutosuggestAccountName: function (AccountName) {
        var id = $(AccountName).attr('id');
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "MASTERTYPE", op: "eq", data: "OtherAccountMaster" }, { field: "PARTYSEARCH", op: "eq", data: $("#" + id).val() });
        var url = getDomain() + "/Common/BindMastersDetails?ServiceName=PARTYMASTER_GET" + "&myfilters=" + JSON.stringify(myfilter);
        $("#" + id).autocomplete({
            source: function (request, response) {
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
                                    $.map(List, function (account) {
                                        if (jQuery.type(account) == "object") {

                                            return {
                                                label: account.partycode + " - " + account.partyname,
                                                value: account.partyname
                                            }
                                        }
                                        else {
                                            return {
                                                label: account.partycode + " - " + account.partyname,
                                                value: account.partyname
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
            minLength: 1,
            autoFocus: true
        });

    },

    //BindCounterList: function () {
    //    $("#ddl_Counter").html("");
    //    BindDropdown('ddl_Counter', 'CounterDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COUNTERMASTER_GET&IsRecordAll=true&ISACTIVE=1", '--Select Counter--', true);
    //},

    bindBalanceSheetGroup: function () {
        $("#ddlBalnceSheetGroup").html("");
        BindDropdown('ddlBalnceSheetGroup', 'BalnceSheetGroupList', getDomain() + EmployeeDetailMasPRView.variables.BindBalanceSheetGroupUrl, '-- Balance Sheet Group --');
    },
};

$(document).ready(function () {
    try {
        $("#btnDeleteEmployeeDetailMas").click(function () {
            EmployeeDetailMasPRView.btnMasterDelete();
        })

        var url = EmployeeDetailMasPRView.variables.BindMasterUrl;
        EmployeeDetailMasPRView.initializeJqgrid(url);

        $("#btnAddEmployeeDetailMas").click(function () {
            debugger
            $("*").prop("autocomplete", 'new');
            EmployeeDetailMasPRView.btnMasterShowAddPanel();
            $("#txtEmployeeName").focus();
        });

        $("#btnSaveEmployeeDetailMas").click(function () {
            EmployeeDetailMasPRView.btnMasterSubmit(EmployeeDetailMasPRView.btnMasterSubmitOnSuccess);
        });

       

        $('button[name="CancelEmployeeDetailMas"]').click(function () {
            EmployeeDetailMasPRView.clearControls();
            var url = EmployeeDetailMasPRView.variables.BindMasterUrl;
            EmployeeDetailMasPRView.initializeJqgrid(url);
            $("#panelEmployeeDetailMasList").show();
            $("#panelEmployeeDetailMasEdit").hide();
            $("#panelEmployeeDetailMasDelete").modal('hide');
        });
       

        $('#BtnImageUpload').fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                data.submit();
            },
            success: function (response, status) {
                //$("#CustomerimgCrop").cropper('clear');
                $('#ModelProfileImage').modal();
                $("#dpCropCanvas").html('');
                $("#CustomerimgCrop").cropper("replace", response);
            },
            error: OnError
        });

        $('.docs-buttons1').on('click', '[data-method]', function () {

            var $this = $(this);
            var data = $this.data();
            var $target;
            var result;

            result = $("#CustomerimgCrop").cropper(data.method, data.option, data.secondOption);
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
                            var img = $("#CustomerimgCrop")[0];
                            ctx.drawImage(c, 0, 0);
                            img.setAttribute('crossOrigin', 'anonymous');
                            var mydataURL = c.toDataURL('image/jpeg', 0.5);
                            if (mydataURL != '')
                                setTimeout(function () {
                                    $.ajax({
                                        url: getDomain() + "/Common/convertstring",
                                        data: { imagestring: mydataURL },
                                        async: false,
                                        cache: false,
                                        type: 'POST',
                                        success: function (res) {
                                            $('#profileimg').attr('src', res);
                                            $('#profileimg').data('newurl', res);
                                        },
                                        error: OnError
                                    });
                                }, 10);
                        }

                    }
                    break;
            }
        });

    }
    catch (e) {
        ErrorDetails(e, EmployeeDetailMasPRView.variables.File);
    }
});
