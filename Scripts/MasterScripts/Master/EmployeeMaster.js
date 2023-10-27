var searchtxt = "";
var EmployeeDetailMasView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=EMPLOYEEDETAILMAS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=EMPLOYEEDETAILMAS_CRUD",
        BindCityUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        SaveImageUrl: "/Common/SaveSingleImage",
        BindUserGroupUrl: "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET",
        BindInsentiveGroupUrl: "/Common/BindMastersDetails?ServiceName=MASTER_INSENTIVE_GET",
        BindBranchUrl: "/Common/BindMastersDetails?ServiceName=BRANCHMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        BindBalanceSheetGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
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
        var colNames = ['EmpId', 'EmpCode', 'IsAdmin', 'Admin Of Branch', 'Full Name', 'Short Name', 'EmailId', "User Group", "UserGroupId", 'BRANCHIDS',
            'Mobile No', 'MobileNo2', 'Gender', 'DOB', 'DOJ', 'City', 'CityId', 'Address1', 'Address2', 'Address3', 'Pincode', 'PhotoPath', 'BALANCESHEETGROUPID',
            'DEFAULTEMPBANKACCOUNT', 'EMPSHIFTID', 'COUNTERID', 'INSENTIVEGROUPNAME',  'EMPSALARY', 'Bank Name', 'A/C No', 'IFSC Code', 'Branch Name',
            'INSENTIVEGOLDID', 'TARGETINSENTIVEGOLD', 'DIAMONDCARATID', 'TARGETDIAMONDCARAT', 'INSENTIVEAMOUNTID', 'TARGETINSENTIVEAMOUNT', 'INSENTIVETAGID', 'TARGETINSENTIVETAG'];
        var colModel = [
            { name: "EMPID", index: "EMPID", xmlmap: xmlvars.common_colmap + "EMPID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "EMPCODE", width: 5, index: "EMPCODE", xmlmap: xmlvars.common_colmap + "EMPCODE", stype: 'text', sortable: false, search: false, hidden: false },

            { name: "ISADMIN", index: "ISADMIN", xmlmap: xmlvars.common_colmap + "ISADMIN", sortable: false, search: false, formatter: jqGridVariables.chkFmatter, hidden: true },
            { name: "ADMINOFBRANCH", index: "ADMINOFBRANCH", xmlmap: xmlvars.common_colmap + "ADMINOFBRANCH", sortable: false, search: false, hidden: true },

            { name: "FULLNAME", width: 21, index: "FULLNAME", xmlmap: xmlvars.common_colmap + "FULLNAME", stype: 'text', sortable: false, search: false },
            { name: "SHORTNAME", index: "SHORTNAME", xmlmap: xmlvars.common_colmap + "SHORTNAME", stype: 'text', sortable: false, search: false, hidden: true },

            { name: "EMAILID", hidden: true, index: "EMAILID", xmlmap: xmlvars.common_colmap + "EMAILID", stype: 'text', sortable: false, search: false },
            { name: "USERGROUP", width: 10, index: "USERGROUP", xmlmap: xmlvars.common_colmap + "USERGROUP", stype: 'text', sortable: false, search: false },
            { name: "USERGROUPID", index: "USERGROUPID", xmlmap: xmlvars.common_colmap + "USERGROUPID", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "BRANCHIDS", index: "BRANCHIDS", xmlmap: xmlvars.common_colmap + "BRANCHIDS", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "MOBILENO1", width: 8, index: "MOBILENO1", xmlmap: xmlvars.common_colmap + "MOBILENO1", stype: 'text', sortable: false, search: false },
            { name: "MOBILENO2", index: "MOBILENO2", xmlmap: xmlvars.common_colmap + "MOBILENO2", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "GENDER", width: 5, index: "GENDER", xmlmap: xmlvars.common_colmap + "GENDER", stype: 'text', align: 'center', sortable: false, search: false },
            { name: "DOB", index: "DOB", xmlmap: xmlvars.common_colmap + "DOB", stype: 'text', align: 'center', sortable: false, search: false, hidden: true },
            { name: "DOJ", index: "DOJ", xmlmap: xmlvars.common_colmap + "DOJ", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "CITY", hidden: true, index: "CITY", xmlmap: xmlvars.common_colmap + "CITY", stype: 'text', align: 'center', sortable: false, search: false },
            { name: "CITYID", index: "CITYID", xmlmap: xmlvars.common_colmap + "CITYID", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "ADDRESS1", index: "ADDRESS1", xmlmap: xmlvars.common_colmap + "ADDRESS1", stype: 'text', sortable: true, hidden: true },
            { name: "ADDRESS2", index: "ADDRESS2", xmlmap: xmlvars.common_colmap + "ADDRESS2", stype: 'text', sortable: true, hidden: true },
            { name: "ADDRESS3", index: "ADDRESS3", xmlmap: xmlvars.common_colmap + "ADDRESS3", stype: 'text', sortable: true, hidden: true },
            { name: "PINCODE", hidden: true, index: "PINCODE", xmlmap: xmlvars.common_colmap + "PINCODE", stype: 'text', align: 'center', sortable: false, search: false },
            { name: "PHOTOPATH", index: "PHOTOPATH", width: 10, xmlmap: xmlvars.common_colmap + "PHOTOPATH", sortable: true, align: "center", hidden: true },
            { name: "BALANCESHEETGROUPID", index: "BALANCESHEETGROUPID", xmlmap: xmlvars.common_colmap + "BALANCESHEETGROUPID", sortable: false, search: false, hidden: true },
            { name: "DEFAULTEMPBANKACCOUNT", index: "DEFAULTEMPBANKACCOUNT", xmlmap: xmlvars.common_colmap + "DEFAULTEMPBANKACCOUNT", sortable: false, search: false, hidden: true },
            { name: "EMPSHIFTID", index: "EMPSHIFTID", xmlmap: xmlvars.common_colmap + "EMPSHIFTID", sortable: false, search: false, hidden: true },
            { name: "COUNTERID", index: "COUNTERID", xmlmap: xmlvars.common_colmap + "COUNTERID", sortable: false, search: false, hidden: true },
            { name: "INSENTIVEGROUPNAME", index: "INSENTIVEGROUPNAME", stype: 'text', xmlmap: xmlvars.common_colmap + "INSENTIVEGROUPNAME", sortable: false, search: false, hidden: true },
            /*{ name: "INSENTIVEMASTERID", index: "INSENTIVEMASTERID", stype: 'text', xmlmap: xmlvars.common_colmap + "INSENTIVEMASTERID", sortable: false, search: false, hidden: true },*/
            { name: "EMPSALARY", index: "EMPSALARY", stype: 'text', xmlmap: xmlvars.common_colmap + "EMPSALARY", sortable: false, search: false, hidden: true },
            { name: "BANKNAME", index: "BANKNAME", stype: 'text', xmlmap: xmlvars.common_colmap + "BANKNAME", sortable: false, search: false, hidden: true },
            { name: "ACCOUNTNO", index: "ACCOUNTNO", stype: 'text', xmlmap: xmlvars.common_colmap + "ACCOUNTNO", sortable: false, search: false, hidden: true },
            { name: "IFSCCODE", index: "IFSCCODE", stype: 'text', xmlmap: xmlvars.common_colmap + "IFSCCODE", sortable: false, search: false, hidden: true },
            { name: "BANKBRANCHNAME", index: "BANKBRANCHNAME", stype: 'text', xmlmap: xmlvars.common_colmap + "BANKBRANCHNAME", sortable: false, search: false, hidden: true },
            { name: "INSENTIVEGOLDID", index: "INSENTIVEGOLDID", stype: 'text', xmlmap: xmlvars.common_colmap + "INSENTIVEGOLDID", sortable: false, search: false, hidden: true },
            { name: "TARGETINSENTIVEGOLD", index: "TARGETINSENTIVEGOLD", stype: 'text', xmlmap: xmlvars.common_colmap + "TARGETINSENTIVEGOLD", sortable: false, search: false, hidden: true },
            { name: "DIAMONDCARATID", index: "DIAMONDCARATID", stype: 'text', xmlmap: xmlvars.common_colmap + "DIAMONDCARATID", sortable: false, search: false, hidden: true },
            { name: "TARGETDIAMONDCARAT", index: "TARGETDIAMONDCARAT", stype: 'text', xmlmap: xmlvars.common_colmap + "TARGETDIAMONDCARAT", sortable: false, search: false, hidden: true },
            { name: "INSENTIVEAMOUNTID", index: "INSENTIVEAMOUNTID", stype: 'text', xmlmap: xmlvars.common_colmap + "INSENTIVEAMOUNTID", sortable: false, search: false, hidden: true },
            { name: "TARGETINSENTIVEAMOUNT", index: "TARGETINSENTIVEAMOUNT", stype: 'text', xmlmap: xmlvars.common_colmap + "TARGETINSENTIVEAMOUNT", sortable: false, search: false, hidden: true },
            { name: "INSENTIVETAGID", index: "INSENTIVETAGID", stype: 'text', xmlmap: xmlvars.common_colmap + "INSENTIVETAGID", sortable: false, search: false, hidden: true },
            { name: "TARGETINSENTIVETAG", index: "TARGETINSENTIVETAG", stype: 'text', xmlmap: xmlvars.common_colmap + "TARGETINSENTIVETAG", sortable: false, search: false, hidden: true },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmployeeDetailMasView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 3, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EmployeeDetailMasView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'EmployeeDetailMasView') } });
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
                id: "EMPID"
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
            sortname: 'EMPID',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    EmployeeDetailMasView.triggerId(rowid, 'edit')
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
                    EmployeeDetailMasView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = EmployeeDetailMasView.variables.BindMasterUrl;
        EmployeeDetailMasView.initializeJqgrid(url);
        EmployeeDetailMasView.clearControls();
    },

    triggerId: function (id) {
        try {
            var rowData = jQuery("#table_EmployeeDetailMas").getRowData(id);
            $("#hdnEmpId").val(id);
            $("#txtEmpCode").val(rowData['EMPCODE']);
            if ($(rowData['ISADMIN']).html() == 'Yes') {
                $('#chkIsAdmin').iCheck('check');

                $('#ddlAdminOfBranch').multiselect();
                var selectedUserGrup = rowData["ADMINOFBRANCH"].split(',');
                $('#ddlAdminOfBranch').val(selectedUserGrup);
                $("#ddlAdminOfBranch").multiselect("refresh");
            }
            else {
                $('#chkIsAdmin').iCheck('uncheck');
            }

            $("#txtEmployeeName").val(rowData['FULLNAME']);
            $("#txtShortName").val(rowData['SHORTNAME']);
            //$("#ddlBalnceSheetGroup").val(rowData['BALANCESHEETGROUPID']);

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
            /*$("#ddlDefaultEmpBankAcc").val(rowData['DEFAULTEMPBANKACCOUNT']);*/
            /*$("#ddlEmpShift").val(rowData['EMPSHIFTID']);*/
            $('#txtSalary').val(rowData["EMPSALARY"]);
            $('#txtBankName').val(rowData["BANKNAME"]);
            $('#txtACNo').val(rowData["ACCOUNTNO"]);
            $('#txtIFSCCode').val(rowData["IFSCCODE"]);
            $('#txtBranchName').val(rowData["BANKBRANCHNAME"]);


            $('#txtcity').val(rowData["CITY"]);
            $("#txtcity").attr("cityid", rowData["CITYID"]);

            ////--------- CounterType In Multi Select add ---------//
            //$("#ddl_Counter").multiselect();
            ////$("#ddl_Counter").val(rowData["COUNTERID"]);
            //$("#ddl_Counter").val(rowData["COUNTERID"].split(','));
            //$("#ddl_Counter").multiselect("refresh");


            $('#ddlUserGroup').multiselect();
            //$(".UserGroup .btn-group").attr('tabindex', 3);
            var selectedUserGrup = rowData["USERGROUPID"].split(',');
            $('#ddlUserGroup').val(selectedUserGrup);
            $("#ddlUserGroup").multiselect("refresh");

            $('#ddlBranch').multiselect();
            //$(".Branch .btn-group").attr('tabindex', 7);
            var selectedBranch = rowData["BRANCHIDS"].split(',');
            $('#ddlBranch').val(selectedBranch);
            $("#ddlBranch").multiselect("refresh");

            //$('#ddlInsentiveGroup').multiselect();
            ////$(".InsentiveGroup .btn-group").attr('tabindex', 11);
            //var selectedInsentive = rowData["INSENTIVEMASTERID"].split(',');
            //$('#ddlInsentiveGroup').val(selectedInsentive);
            //$("#ddlInsentiveGroup").multiselect("refresh");


            $("#txtPincode").val(rowData['PINCODE']);
            if (rowData['PHOTOPATH']) {
                $('#profileimg').attr('src', getDomain() + "/UploadFiles/Employee/" + rowData['PHOTOPATH']);
            } else {

                $('#profileimg').attr('src', getDomain() + "/Content/assets/images/default-user.png");
            }
            $('#hdnimg').val("/UploadFiles/Employee/" + rowData['PHOTOPATH']);
            //$("#panelEmployeeDetailMasEdit").modal('show');
            //$("#panelEmployeeDetailMasDelete").modal('hide');

            //$('#ddlInsentiveGold').multiselect();
            //$('#ddlInsentiveGold').val(rowData['INSENTIVEGOLDID'].split(','));
            //$("#ddlInsentiveGold").multiselect("refresh");
            //$("#txtTargetInsentiveGold").val(rowData['TARGETINSENTIVEGOLD']);

            //$('#ddlDiamondCarat').multiselect();
            //$('#ddlDiamondCarat').val(rowData['DIAMONDCARATID'].split(','));
            //$("#ddlDiamondCarat").multiselect("refresh");
            //$("#txtTargetDiamondCarat").val(rowData['TARGETDIAMONDCARAT']);

            //$('#ddlInsentiveAmount').multiselect();
            //$('#ddlInsentiveAmount').val(rowData['INSENTIVEAMOUNTID'].split(','));
            //$("#ddlInsentiveAmount").multiselect("refresh");
            //$("#txtTargetInsentiveAmount").val(rowData['TARGETINSENTIVEAMOUNT']);

            $('#ddlTag').multiselect();
            $('#ddlTag').val(rowData['INSENTIVETAGID'].split(','));
            $("#ddlTag").multiselect("refresh");
            $("#txtTargetTag").val(rowData['TARGETINSENTIVETAG']);

            $("#panelEmployeeDetailMasList").hide();
            $("#panelEmployeeDetailMasEdit").show();
            $("#panelEmployeeDetailMasDelete").modal('hide');

            $("#spanEmployeeDetailMasoper").text("Edit Employee Detail");
            EmployeeDetailMasView.showTitlePermissionWise('edit');
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            EmployeeDetailMasView.variables.addedit = "deleted";
            EmployeeDetailMasView.variables.Oper = "Delete";
            var rowData = jQuery("#table_EmployeeDetailMas").getRowData(id);
            $("#delblFullName").html(rowData['FULLNAME']);
            $("#hdnimg").val(rowData['PHOTOPATH']);
            $("#hdnEmpId").val(id);
            $("#panelEmployeeDetailMasDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            EmployeeDetailMasView.clearControls();
            $("#panelEmployeeDetailMasList").hide();
            $("#panelEmployeeDetailMasEdit").show();
            $("#panelEmployeeDetailMasDelete").modal('hide');
            EmployeeDetailMasView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
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
                "oper": EmployeeDetailMasView.variables.Oper,
                "NEWEMPID": $("#hdnEmpId").val()
            }
            EmployeeDetailMasView.savedata(data);
        } catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var usergroup, ddlBranch, ddlAdminOfBranch, ddlInsentive, ddlCounter;
            var isValid = $("#frmEmployeeDetailMas").valid();

            if ($("#ddlUserGroup").val() == null) {
                $("#ddlUserGroupError").show();
                isValid = false;
            } else {
                $("#ddlUserGroupError").hide();
                usergroup = $("#ddlUserGroup").val().toString();
            }

            if ($("#ddlBranch").val() == null) {
                $("#ddlBranchError").show();
                isValid = false;
            } else {
                $("#ddlBranchError").hide();
                ddlBranch = $("#ddlBranch").val().toString();
            }

            //if ($("#ddl_Counter").val() == null) {
            //    $("#ddl_CounterError").show();
            //    isValid = false;
            //} else {
            //    $("#ddl_CounterError").hide();
            //    ddlCounter = $("#ddl_Counter").val().toString();
            //}

            //if ($("#ddlInsentiveGroup").val() == null) {
            //    $("#ddlInsentiveGroupError").show();
            //    isValid = false;
            //} else {
            //    $("#ddlInsentiveGroupError").hide();
            //    ddlInsentive = $("#ddlInsentiveGroup").val().toString();
            //}

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

            //if ($("#txtcity").attr("cityid") == "" || $("#txtcity").attr("cityid") == "undefined" || $("#txtcity").attr("cityid") == "[object Object]") {
            //    notificationMessage('warning', 'City name is not proper selected.', 'warning');
            //    return;
            //}

            if (!isValid)
                return;

            EmployeeDetailMasView.variables.Oper = 'Add';
            EmployeeDetailMasView.variables.addedit = "added";
            EmployeeDetailMasView.variables.Masterid = $("#hdnEmpId").val();

            if (EmployeeDetailMasView.variables.Masterid != "0" && parseInt(EmployeeDetailMasView.variables.Masterid) > 0) {
                EmployeeDetailMasView.variables.Oper = 'Edit';
                EmployeeDetailMasView.variables.addedit = 'updated';
            }
            if (EmployeeDetailMasView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (EmployeeDetailMasView.variables.Oper == 'Edit' && isU() == 0) {
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
                "ISADMIN": (($('#chkIsAdmin').prop("checked") == true) ? 1 : 0),
                "ADMINOFBRANCH": ddlAdminOfBranch,
                "SHORTNAME": $("#txtShortName").val(),
                "FULLNAME": $("#txtEmployeeName").val(),
                /*"DEFAULTEMPBANKACCOUNT": $("#ddlDefaultEmpBankAcc").val(),*/
                /*"EMPSHIFTID": $("#ddlEmpShift").val(),*/
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
                //"COUNTERID": ddlCounter,    //$("#ddl_Counter").val(),
                "USERGROUP": usergroup,
                "BRANCHIDS": ddlBranch,
                /*"INSENTIVEMASTERID": ddlInsentive,*/
                "BANKNAME": $("#txtBankName").val(),
                "ACCOUNTNO": $("#txtACNo").val(),
                "IFSCCODE": $("#txtIFSCCode").val(),
                "BRANCHNAME": $("#txtBranchName").val(),
                "TARGETINSENTIVEGOLD": $("#txtTargetInsentiveGold").val() || 0,
                "TARGETDIAMONDCARAT": $("#txtTargetDiamondCarat").val() || 0,
                "TARGETINSENTIVEAMOUNT": $("#txtTargetInsentiveAmount").val() || 0,
                "TARGETINSENTIVETAG": $("#txtTargetTag").val() || 0,
                "oper": EmployeeDetailMasView.variables.Oper,
                "NEWEMPID": EmployeeDetailMasView.variables.Masterid
            }
            //if ($("#ddlInsentiveGold").val()) {
            //    data.INSENTIVEGOLDID = $("#ddlInsentiveGold").val().toString();
            //}
            //if ($("#ddlDiamondCarat").val()) {
            //    data.DIAMONDCARATID = $("#ddlDiamondCarat").val().toString();
            //}
            //if ($("#ddlInsentiveAmount").val()) {
            //    data.INSENTIVEAMOUNTID = $("#ddlInsentiveAmount").val().toString();
            //}
            if ($("#ddlTag").val()) {
                data.INSENTIVETAGID = $("#ddlTag").val().toString();
            }

            //if ($("#txtSalary").val() != "" && $("#txtSalary").val() != undefined) {
            //    data.EMPSALARY = $("#txtSalary").val()
            //}

            EmployeeDetailMasView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (EmployeeDetailMasView.variables.Oper == 'Delete')
                $('#btnDeleteEmployeeDetailMas').attr('disabled', false);
            else
                $('#btnSaveEmployeeDetailMas').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(EmployeeDetailMasView.variables.Oper + ' Operation', 'Record is ' + EmployeeDetailMasView.variables.addedit + ' successfully', 'success');
                EmployeeDetailMasView.clearControls();
                $("#panelEmployeeDetailMasList").hide();
                $("#panelEmployeeDetailMasEdit").show();
                $("#table_EmployeeDetailMas").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#txtcity").attr("cityid", "")
            EmployeeDetailMasView.bindUserGroup();
            EmployeeDetailMasView.bindBranch();
            $("#hdnEmpId").val("");
            $("#txtEmpCode").val("");
            $("#txtEmployeeName").val("");
            $("#txtShortName").val("");
            //$("#ddlBalnceSheetGroup").val("");
            $("#male").iCheck("check");
            $("#txtDOB").val("");
            $("#txtDOJ").val("");

            $('#ddlUserGroup').multiselect();
            //$(".UserGroup .btn-group").attr('tabindex', 3);
            $('#ddlUserGroup').val('');
            $("#ddlUserGroup").multiselect("refresh");

            $('#ddlBranch').multiselect();
            //$(".Branch .btn-group").attr('tabindex', 7);
            $('#ddlBranch').val('');
            $("#ddlBranch").multiselect("refresh");

            //$('#ddl_Counter').multiselect();
            //$('#ddl_Counter').val('');
            //$("#ddl_Counter").multiselect("refresh");

            $("#txtBankName").val("");
            $("#txtACNo").val("");
            $("#txtIFSCCode").val("");
            $("#txtBranchName").val("");

            //$('#ddlInsentiveGroup').multiselect();
            ////$(".InsentiveGroup .btn-group").attr('tabindex', 11);
            //$('#ddlInsentiveGroup').val('');
            //$("#ddlInsentiveGroup").multiselect("refresh");

            //var Store_InsentiveGold = [];
            //$('#ddlInsentiveGold').multiselect();
            //$("#ddlInsentiveGold option").each(function (key, obj) {

            //    Store_InsentiveGold.push($(obj).val());
            //});
            //$('#ddlInsentiveGold').val(Store_InsentiveGold);
            //$("#ddlInsentiveGold").multiselect("refresh");
            //$("#txtTargetInsentiveGold").val("");

            //var Store_InsentiveGold = [];
            //$('#ddlDiamondCarat').multiselect();
            //$("#ddlDiamondCarat option").each(function (key, obj) {

            //    Store_InsentiveGold.push($(obj).val());
            //});
            //$('#ddlDiamondCarat').val(Store_InsentiveGold);
            //$("#ddlDiamondCarat").multiselect("refresh");
            //$("#txtTargetDiamondCarat").val("");

            //var Store_InsentiveGold = [];
            //$('#ddlInsentiveAmount').multiselect();
            //$("#ddlInsentiveAmount option").each(function (key, obj) {

            //    Store_InsentiveGold.push($(obj).val());
            //});
            //$('#ddlInsentiveAmount').val(Store_InsentiveGold);
            //$("#ddlInsentiveAmount").multiselect("refresh");
            //$("#txtTargetInsentiveAmount").val("");

            var Store_InsentiveGold = [];
            $('#ddlTag').multiselect();
            $("#ddlTag option").each(function (key, obj) {

                Store_InsentiveGold.push($(obj).val());
            });
            $('#ddlTag').val(Store_InsentiveGold);
            $("#ddlTag").multiselect("refresh");
            $("#txtTargetTag").val("");

            /*$("#ddl_Counter").val('');*/
            $('#ddlAdminOfBranch').multiselect();
            $('#ddlAdminOfBranch').val('');
            $("#ddlAdminOfBranch").multiselect("refresh");

            $("#txtMobileNo1").val("");
            $("#txtMobileNo2").val("");
            $("#txtEmailId").val("");
            $("#txtAddress1").val("");
            $("#txtAddress2").val("");
            $("#txtAddress3").val("");
            $("#txtcity").val("");

            $("#txtPincode").val("");
            $("hdnEmpId").val("");
            $('#hdnimg').val("");
            $("#frmEmployeeDetailMas").validate().resetForm();
            $("#male").iCheck('check');
            $("#profileimg").attr("src", getDomain() + '/Content/assets/images/default-user.png');
            EmployeeDetailMasView.variables.Oper = 'Add';
            EmployeeDetailMasView.variables.addedit = "added";
            /*$('#ddlDefaultEmpBankAcc [default="1"]').prop("selected", true);*/
            /*$('#ddlEmpShift').val("");*/
            $('#txtSalary').val("");
            jQuery("#table_list_EmployeeDetailMas").jqGrid('resetSelection');
            $("#panelEmployeeDetailMasList").show();
            $("#panelEmployeeDetailMasEdit").hide();
            $("#panelEmployeeDetailMasDelete").modal('hide');
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            if ($("#profileimg").attr('src') != getDomain() + "/Content/assets/images/default-user.png") {
                var originalfile = '';
                var newfile = '';
                if (EmployeeDetailMasView.variables.Oper == 'Delete') {
                    originalfile = $('#hdnimg').val();
                    newfile = $("#profileimg").val();
                }
                else {
                    originalfile = $('#hdnimg').val();
                    newfile = $('#profileimg').attr('src');
                }

                $.ajax({
                    url: getDomain() + EmployeeDetailMasView.variables.SaveImageUrl,
                    async: false,
                    cache: false,
                    data: {
                        originalfile: originalfile,
                        newfile: newfile,
                        module: 'Employee',
                        isResize: false,
                        oper: EmployeeDetailMasView.variables.Oper
                    },
                    success: function (result) {
                        data.PHOTOPATH = result;
                        $.ajax({
                            url: getDomain() + EmployeeDetailMasView.variables.PerformMasterOperationUrl,
                            data: data,
                            async: false,
                            cache: false,
                            type: 'POST',
                            success: EmployeeDetailMasView.btnMasterSubmitOnSuccess,
                            error: OnError
                        });
                    }
                });
            }
            else {
                $.ajax({
                    url: getDomain() + EmployeeDetailMasView.variables.PerformMasterOperationUrl,
                    data: data,
                    async: false,
                    cache: false,
                    type: 'POST',
                    success: EmployeeDetailMasView.btnMasterSubmitOnSuccess,
                    error: OnError
                });
            }
        }
        catch (e) {
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
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
            ErrorDetails(e, EmployeeDetailMasView.variables.File);
        }
    },

    bindUserGroup: function () {
        $("#ddlUserGroup").html("");
        BindDropdown('ddlUserGroup', 'UserGroupDropdownList', getDomain() + EmployeeDetailMasView.variables.BindUserGroupUrl + "&_search=true&searchField=ISACTIVE&searchOper=eq&searchString=1", '', true);
    },

    bindBranch: function () {
        $("#ddlBranch").html("");
        BindDropdown('ddlBranch', 'BranchDropdownList', getDomain() + EmployeeDetailMasView.variables.BindBranchUrl + "&_search=true&searchField=ISACTIVE&searchOper=eq&searchString=1", '', true);
    },
    //BindInsentiveGold: function () {
    //    var myfilter;
    //    myfilter = {
    //        rules: []
    //    };
    //    myfilter.rules.push({ field: "INSERTIVETYPE", op: "eq", data: "GOLD - ( GRM )" }); //$('#txtAccount').val()
    //    $("#ddlInsentiveGold").html("");
    //    BindDropdown('ddlInsentiveGold', 'InsentiveGoldDropdownList', getDomain() + EmployeeDetailMasView.variables.BindInsentiveGroupUrl + "&IsRecordAll=true&searchString=1&myfilters=" + JSON.stringify(myfilter), '', true);

    //    var Store_InsentiveGold = [];
    //    $('#ddlInsentiveGold').multiselect();
    //    $("#ddlInsentiveGold option").each(function (key, obj) {

    //        Store_InsentiveGold.push($(obj).val());
    //    });
    //    $(".InsentiveGold .btn-group").attr('tabindex', 11);
    //    $('#ddlInsentiveGold').val(Store_InsentiveGold);
    //    $("#ddlInsentiveGold").multiselect("refresh");
    //    //$("#ddlInsentiveGold").on("change", function () {
    //    //    if ($("#ddlInsentiveGold").val() == null) {
    //    //        $("#ddlInsentiveGoldError").show();
    //    //        isValid = false;
    //    //    } else {
    //    //        $("#ddlInsentiveGold").hide();

    //    //    }
    //    //});
    //},
    //BindDiamondCarat: function () {
    //    var myfilter;
    //    myfilter = {
    //        rules: []
    //    };
    //    myfilter.rules.push({ field: "INSERTIVETYPE", op: "eq", data: "Diamond carat" }); //$('#txtAccount').val()
    //    $("#ddlDiamondCarat").html("");
    //    BindDropdown('ddlDiamondCarat', 'InsentiveGoldDropdownList', getDomain() + EmployeeDetailMasView.variables.BindInsentiveGroupUrl + "&IsRecordAll=true&searchString=1&myfilters=" + JSON.stringify(myfilter), '', true);

    //    var Store_InsentiveGold = [];
    //    $('#ddlDiamondCarat').multiselect();
    //    $("#ddlDiamondCarat option").each(function (key, obj) {

    //        Store_InsentiveGold.push($(obj).val());
    //    });
    //    $(".DiamondCarat .btn-group").attr('tabindex', 11);
    //    $('#ddlDiamondCarat').val(Store_InsentiveGold);
    //    $("#ddlDiamondCarat").multiselect("refresh");
    //    //$("#ddlDiamondCarat").on("change", function () {
    //    //    if ($("#ddlDiamondCarat").val() == null) {
    //    //        $("#ddlDiamondCaratError").show();
    //    //        isValid = false;
    //    //    } else {
    //    //        $("#ddlDiamondCarat").hide();

    //    //    }
    //    //});
    //},

    //BindAmount: function () {

    //    var myfilter;
    //    myfilter = {
    //        rules: []
    //    };
    //    myfilter.rules.push({ field: "INSERTIVETYPE", op: "eq", data: "Amount" }); //$('#txtAccount').val()
    //    $("#ddlInsentiveAmount").html("");
    //    BindDropdown('ddlInsentiveAmount', 'InsentiveGoldDropdownList', getDomain() + EmployeeDetailMasView.variables.BindInsentiveGroupUrl + "&IsRecordAll=true&searchString=1&myfilters=" + JSON.stringify(myfilter), '', true);

    //    var Store_InsentiveGold = [];
    //    $('#ddlInsentiveAmount').multiselect();
    //    $("#ddlInsentiveAmount option").each(function (key, obj) {

    //        Store_InsentiveGold.push($(obj).val());
    //    });
    //    $(".InsentiveAmount .btn-group").attr('tabindex', 11);
    //    $('#ddlInsentiveAmount').val(Store_InsentiveGold);
    //    $("#ddlInsentiveAmount").multiselect("refresh");
    //    //$("#ddlInsentiveAmount").on("change", function () {
    //    //    if ($("#ddlInsentiveAmount").val() == null) {
    //    //        $("#ddlInsentiveAmountError").show();
    //    //        isValid = false;
    //    //    } else {
    //    //        $("#ddlInsentiveAmount").hide();

    //    //    }
    //    //});
    //},
    BindTag: function () {

        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "INSERTIVETYPE", op: "eq", data: "Tag" }); //$('#txtAccount').val()
        $("#ddlTag").html("");
        BindDropdown('ddlTag', 'InsentiveGoldDropdownList', getDomain() + EmployeeDetailMasView.variables.BindInsentiveGroupUrl + "&IsRecordAll=true&searchString=1&myfilters=" + JSON.stringify(myfilter), '', true);

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
    //    BindDropdown('ddlInsentiveGroup', 'InsentiveUserDropdownList', getDomain() + EmployeeDetailMasView.variables.BindInsentiveGroupUrl, '', true);
    //},

    bindAdminOfBranch: function () {
        $("#ddlAdminOfBranch").html("");
        BindDropdown('ddlAdminOfBranch', 'BranchDropdownList', getDomain() + EmployeeDetailMasView.variables.BindBranchUrl + "&_search=true&searchField=ISACTIVE&searchOper=eq&searchString=1", '', true);
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
        BindDropdown('ddlBalnceSheetGroup', 'BalnceSheetGroupList', getDomain() + EmployeeDetailMasView.variables.BindBalanceSheetGroupUrl, '-- Balance Sheet Group --');
    },
};

$(document).ready(function () {
    try {
        /*EmployeeDetailMasView.BindInsentiveGold();*/
        /*EmployeeDetailMasView.BindDiamondCarat();*/
        /*EmployeeDetailMasView.BindAmount();*/
        /*EmployeeDetailMasView.BindTag();*/

        $("*").prop("autocomplete", 'new');
        $('.number').keypress(function (event) {
            return numbersOnly(this, event, false, false);
        });

        var url = EmployeeDetailMasView.variables.BindMasterUrl;
        EmployeeDetailMasView.initializeJqgrid(url);
       /* BindDropdown('ddlDefaultEmpBankAcc', 'BankDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=BANKMASTER_GET", '', true);*/
        //BindDropdown('ddlEmpShift', 'EmpShiftList', getDomain() + "/Common/BindMastersDetails?ServiceName=MASTER_SHIFT_GET", '--Select Shift--', true);
        //$('#ddlDefaultEmpBankAcc [default="1"]').attr("selected", true);
        //EmployeeDetailMasView.BindCounterList();
        //EmployeeDetailMasView.bindBalanceSheetGroup();

        EmployeeDetailMasView.bindUserGroup();
        $('#ddlUserGroup').multiselect();
        //$(".UserGroup .btn-group").attr('tabindex', 3);
        $("#ddlUserGroup").on("change", function () {
            if ($("#ddlUserGroup").val() == null) {
                $("#ddlUserGroupError").show();
                isValid = false;
            } else {
                $("#ddlUserGroupError").hide();
            }
        });

        EmployeeDetailMasView.bindBranch();
        $('#ddlBranch').multiselect();
        //$(".Branch .btn-group").attr('tabindex', 7);
        $("#ddlBranch").on("change", function () {
            if ($("#ddlBranch").val() == null) {
                $("#ddlBranchError").show();
                isValid = false;
            }
            else {
                $("#ddlBranchError").hide();
            }
        });

        //EmployeeDetailMasView.bindIntesive();
        //$('#ddlInsentiveGroup').multiselect();
        ////$(".InsentiveGroup .btn-group").attr('tabindex', 11);
        //$("#ddlInsentiveGroup").on("change", function () {
        //    if ($("#ddlInsentiveGroup").val() == null) {
        //        $("#ddlInsentiveGroupError").show();
        //        isValid = false;
        //    } else {
        //        $("#ddlInsentiveGroupError").hide();
        //    }
        //});

        EmployeeDetailMasView.bindAdminOfBranch();
        $('#ddlAdminOfBranch').multiselect();
        $("#ddlAdminOfBranch").on("change", function () {
            if ($("#ddlAdminOfBranch").val() == null) {
                $("#ddlAdminOfBranchError").show();
                isValid = false;
            } else {
                $("#ddlAdminOfBranchError").hide();

            }
        });

        $("#chkIsAdmin").on("ifChanged", function () {
            if ($("#chkIsAdmin").prop("checked") == true) {
                $('#AdminOfBranchdiv').show();
            }
            else {
                $('#AdminOfBranchdiv').hide();
            }
        });

        $(".icheck").iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            labelHover: true,
            cursor: true,
            tap: true,
        });
        RegisterFileUpload('BtnImageUpload', 'profileimg', '#BtnImageUpload-error');

        $("#btnAddEmployeeDetailMas").click(function () {
            debugger
            $("*").prop("autocomplete", 'new');
            EmployeeDetailMasView.btnMasterShowAddPanel();
            $("#txtEmployeeName").focus();

        });

        $("#btnSaveEmployeeDetailMas").click(function () {
            EmployeeDetailMasView.btnMasterSubmit(EmployeeDetailMasView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteEmployeeDetailMas").click(function () {
            EmployeeDetailMasView.btnMasterDelete();
        });

        $('button[name="CancelEmployeeDetailMas"]').click(function () {
            EmployeeDetailMasView.clearControls();
            var url = EmployeeDetailMasView.variables.BindMasterUrl;
            EmployeeDetailMasView.initializeJqgrid(url);
            $("#panelEmployeeDetailMasList").show();
            $("#panelEmployeeDetailMasEdit").hide();
            $("#panelEmployeeDetailMasDelete").modal('hide');
        });
        // For focusing on first textbox in modal
        $('#panelEmployeeDetailMasEdit').on('shown.bs.modal', function () {
            $('#txtFName').focus();
        });
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = EmployeeDetailMasView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                EmployeeDetailMasView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = EmployeeDetailMasView.variables.BindMasterUrl;
                EmployeeDetailMasView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = EmployeeDetailMasView.variables.BindMasterUrl;
                EmployeeDetailMasView.initializeJqgrid(url);
            }
        });

        $("#CustomerimgCrop").cropper({
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

                            //Setting image quality
                            //var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
                            //var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
                            //var lowQuality = canvas.toDataURL('image/jpeg', 0.1);
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

        $("#btnOtherDetails").click(function () {
            $("#Modal_EmployeeOtherDetails").modal("show");
        });

        $("#btnOkOtherDetail").click(function () {
            $("#Modal_EmployeeOtherDetails").modal("hide");
        });

        $("#btnCancelOtherDetail").click(function () {
            $("#Modal_EmployeeOtherDetails").modal("hide");
        });
        FixValue();
    }
    catch (e) {
        ErrorDetails(e, EmployeeDetailMasView.variables.File);
    }
});
