var AccountYearMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=COMMON_ACCOUNTYEARMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_ACCOUNTYEARMASTER_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmAccountYearMaster").validate({
            rules: {
            },
            messages: {
            }
        }),
        File: "AccountYearMaster.js",
    },

    initializeJqgrid: function () {
        var colNames = ['AccountYearId', 'Account Year', 'From Date', 'To Date'];
        var colModel = [
            { name: "ACCOUNTYEARID", index: "ACCOUNTYEARID", xmlmap: xmlvars.common_colmap + "ACCOUNTYEARID", stype: 'int', sortable: true, hidden: true, search: false },
            { name: "ACCOUNTYEAR", width: 15, index: "ACCOUNTYEAR", xmlmap: xmlvars.common_colmap + "ACCOUNTYEAR", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "ACCOUNTYEARFROMDATE", width: 15, index: "ACCOUNTYEARFROMDATE", xmlmap: xmlvars.common_colmap + "ACCOUNTYEARFROMDATE", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            { name: "ACCOUNTYEARTODATE", width: 15, index: "ACCOUNTYEARTODATE", xmlmap: xmlvars.common_colmap + "ACCOUNTYEARTODATE", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, hidden: true, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'AccountYearMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'AccountYearMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'AccountYearMasterView') } });
        }
        $.jgrid.gridUnload("#table_AccountYearMaster");
        $("#table_AccountYearMaster").jqGrid({
            //data: mydata,
            url: getDomain() + AccountYearMasterView.variables.BindMasterUrl,
            datatype: "xml",
            height: getGridHeight(),
            scroll: 1,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 30,
            rowList: [20, 30, 40],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_AccountYearMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ACCOUNTYEARID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_AccountYearMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqgrid_AccountYearMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_AccountYearMaster').setGridWidth(width);
                    $("#gbox_table_AccountYear").width(width);
                }, 200);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: '',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    AccountYearMasterView.triggerId(rowid, 'edit')
                }
            }
        });
        // JqGrid navigations shortcuts
        jQuery("#table_AccountYearMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                AccountYearMasterView.triggerId(rowid);
            }
        });
        // Setup buttons
        $("#table_AccountYearMaster").jqGrid('navGrid', '#pager_AccountYear',
            { edit: false, add: false, del: false, search: true, refresh: false },
            { height: 200 }
        );

        $("#pager_AccountYear_left").css("width", "");
        AlignJqGridHeader('table_AccountYearMaster', ['edit', 'delete']);
    },

    triggerInitialClick: function () {
        AccountYearMasterView.initializeJqgrid();
        AccountYearMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            $(".shell span").hide();
            $("#hdnAccountYearId").val(id);
            var rowData = jQuery("#table_AccountYearMaster").getRowData(id);
            $("#txtAccountYearName").val(rowData['ACCOUNTYEAR']);
            var TempF = rowData['ACCOUNTYEARFROMDATE'].split(" ");
            var TempF1 = TempF[0].split("/");
            var mmF = '';
            switch (TempF1[1]) {
                case "Jan":
                    mmF = '01';
                    break;
                case "Feb":
                    mmF = '02';
                    break;
                case "Mar":
                    mmF = '03';
                    break;
                case "Apr":
                    mmF = '04';
                    break;
                case "May":
                    mmF = '05';
                    break;
                case "Jun":
                    mmF = '06';
                    break;
                case "Jul":
                    mmF = '07';
                    break;
                case "Aug":
                    mmF = '08';
                    break;
                case "Sep":
                    mmF = '09';
                    break;
                case "Oct":
                    mmF = '10';
                    break;
                case "Nov":
                    mmF = '11';
                    break;
                case "Dec":
                    mmF = '12';
                    break;
            }
            var TempT = rowData['ACCOUNTYEARTODATE'].split(" ");
            var TempT1 = TempT[0].split("/");
            var mmT = '';
            switch (TempT1[1]) {
                case "Jan":
                    mmT = '01';
                    break;
                case "Feb":
                    mmT = '02';
                    break;
                case "Mar":
                    mmT = '03';
                    break;
                case "Apr":
                    mmT = '04';
                    break;
                case "May":
                    mmT = '05';
                    break;
                case "Jun":
                    mmT = '06';
                    break;
                case "Jul":
                    mmT = '07';
                    break;
                case "Aug":
                    mmT = '08';
                    break;
                case "Sep":
                    mmT = '09';
                    break;
                case "Oct":
                    mmT = '10';
                    break;
                case "Nov":
                    mmT = '11';
                    break;
                case "Dec":
                    mmT = '12';
                    break;
            }

            $("#ddlStartMonth").val(mmF);
            $("#ddlStartYear").val(TempF1[2]);
            $("#ddlEndMonth").val(mmT);
            $("#ddlEndYear").val(TempT1[2]);
            $("#panelAccountYearMasterEdit").modal('show');
            $("#panelAccountYearMasterDelete").modal('hide');
            $("#spanAccountYearMasteroper").text("Edit AccountYear");
            AccountYearMasterView.showTitlePermissionWise('edit');
        }
        catch (e) {
            ErrorDetails(e, AccountYearMasterView.variable.File);
        }
    },

    deleteRow: function (id) {
        AccountYearMasterView.variables.addedit = "deleted";
        AccountYearMasterView.variables.Oper = "Delete";
        var rowData = jQuery("#table_AccountYearMaster").getRowData(id);
        $("#delblAccountYearName").html(rowData['ACCOUNTYEAR']);
        $("#hdnAccountYearId").val(id);

        $("#panelAccountYearMasterEdit").modal('hide');
        $("#panelAccountYearMasterDelete").modal('show');
    },

    btnMasterShowAddPanel: function () {
        AccountYearMasterView.clearControls();

        $("#panelAccountYearMasterEdit").modal('show');
        $("#panelAccountYearMasterDelete").modal('hide');
        $("#spanAccountYearIdoper").text("Add New Account Year");
        AccountYearMasterView.showTitlePermissionWise('add');
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteAccountYearMaster').attr('disabled', true);
            var data = {
                "oper": AccountYearMasterView.variables.Oper,
                "NEW_ACCOUNTYEARID": $("#hdnAccountYearId").val()
            }
            AccountYearMasterView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, AccountYearMasterView.variable.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmAccountYearMaster").valid();
            if (!isValid)
                return;

            AccountYearMasterView.variables.Oper = 'Add';
            AccountYearMasterView.variables.addedit = "added";
            AccountYearMasterView.variables.Masterid = $("#hdnAccountYearId").val();

            if (AccountYearMasterView.variables.Masterid != "0" && parseInt(AccountYearMasterView.variables.Masterid) > 0) {
                AccountYearMasterView.variables.Oper = 'Edit';
                AccountYearMasterView.variables.addedit = 'updated';
            }
            if (AccountYearMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (AccountYearMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveCompanyMaster').attr('disabled', true);
            function daysInMonth(month, year) {
                return new Date(year, month, 0).getDate();
            }
            var monthF = $("#ddlStartMonth").val();
            var mntF = '';
            switch (monthF) {
                case "01":
                    mntF = 'Jan';
                    break;
                case "02":
                    mntF = 'Fab';
                    break;
                case "03":
                    mntF = 'Mar';
                    break;
                case "04":
                    mntF = 'Apr';
                    break;
                case "05":
                    mntF = 'May';
                    break;
                case "06":
                    mntF = 'Jun';
                    break;
                case "07":
                    mntF = 'July';
                    break;
                case "08":
                    mntF = 'Aug';
                    break;
                case "09":
                    mntF = 'Sep';
                    break;
                case "10":
                    mntF = 'Oct';
                    break;
                case "11":
                    mntF = 'Nov';
                    break;
                case "12":
                    mntF = 'Dec';
                    break;
            }
            var monthT = $("#ddlEndMonth").val();
            var mntT = '';
            switch (monthT) {
                case "01":
                    mntT = 'Jan';
                    break;
                case "02":
                    mntT = 'Fab';
                    break;
                case "03":
                    mntT = 'Mar';
                    break;
                case "04":
                    mntT = 'Apr';
                    break;
                case "05":
                    mntT = 'May';
                    break;
                case "06":
                    mntT = 'Jun';
                    break;
                case "07":
                    mntT = 'July';
                    break;
                case "08":
                    mntT = 'Aug';
                    break;
                case "09":
                    mntT = 'Sep';
                    break;
                case "10":
                    mntT = 'Oct';
                    break;
                case "11":
                    mntT = 'Nov';
                    break;
                case "12":
                    mntT = 'Dec';
                    break;
            }
            var startmonth = $("#ddlStartMonth").val();
            var startyear = $("#ddlStartYear").val();
            //var fromdate = daysInMonth(startmonth, startyear);
            var EndMonth = $("#ddlEndMonth").val();
            var EndYear = $("#ddlEndYear").val();
            var todate = daysInMonth(EndMonth, EndYear);
            var AccountFromDate = startmonth + '/01/' + startyear
            var AccountToDate = EndMonth + '/' + todate + '/' + EndYear
            var accountYear = mntF + ' ' + startyear + ' - ' + mntT + ' ' + EndYear

            var data = {
                "ACCOUNTYEAR": accountYear,
                "ACCOUNTYEARFROMDATE": AccountFromDate,
                "ACCOUNTYEARTODATE": AccountToDate,
                "oper": AccountYearMasterView.variables.Oper,
                "NEW_ACCOUNTYEARID": AccountYearMasterView.variables.Masterid
            }
            AccountYearMasterView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, AccountYearMasterView.variable.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (AccountYearMasterView.variables.Oper == 'Delete')
                $('#btnDeleteAccountYearMaster').attr('disabled', false);
            else
                $('#btnSaveAccountYearMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(AccountYearMasterView.variables.Oper + ' Operation', 'Record is ' + AccountYearMasterView.variables.addedit + ' successfully', 'success');
                AccountYearMasterView.clearControls();
                $("#table_AccountYearMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        }
        catch (e) {
            ErrorDetails(e, AccountYearMasterView.variable.File);
        }
    },

    clearControls: function () {
        $("#panelAccountYearMasterEdit").modal('hide');
        $("#panelAccountYearMasterDelete").modal('hide');
        $("#txtAccountYearName").val("");
        $("#ddlStartYear").val("");
        $("#ddlStartMonth").val("04");
        $("#ddlEndYear").val("");
        $("#ddlEndMonth").val("03");
        $("#hdnAccountYearId").val("");
        $("label.error").hide();
        AccountYearMasterView.variables.Oper = 'Add';
        AccountYearMasterView.variables.addedit = "added";
        jQuery("#table_list_AccountYearMaster").jqGrid('resetSelection');
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + AccountYearMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: AccountYearMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        }
        catch (e) {
            ErrorDetails(e, AccountYearMasterView.variable.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveAccountYearMaster").show();
                //$("#dCompanyMasterTitle").show();
                //$("#dViewCompanyMasterTitle").hide();
            }
            else {
                if ($("#btnSaveAccountYearMaster").length > 0) {
                    $("#btnSaveAccountYearMaster").hide();
                }
                //$("#dViewCompanyMasterTitle").show();
                //$("#dCompanyMasterTitle").hide();
            }
        }
        catch (e) {
            ErrorDetails(e, AccountYearMasterView.variable.File);
        }
    }

};

$(document).ready(function () {
    AccountYearMasterView.initializeJqgrid();
    $(".icheckminimal").iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        labelHover: true,
        cursor: true,
        increaseArea: '15%',
        tap: true
    });

    $("#btnAddAccountYearMaster").click(function () {
        $(".shell span").show();
        AccountYearMasterView.btnMasterShowAddPanel();
    });

    $("#btnSaveAccountYearMaster").click(function () {
        AccountYearMasterView.btnMasterSubmit(AccountYearMasterView.btnMasterSubmitOnSuccess);
    });

    $("#btnDeleteAccountYearMaster").click(function () {
        AccountYearMasterView.btnMasterDelete();
    });

    $('button[name="CancelAccountYearMaster"]').click(function () {
        AccountYearMasterView.clearControls();
    });
});