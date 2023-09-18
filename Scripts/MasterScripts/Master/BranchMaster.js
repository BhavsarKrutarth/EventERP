var searchtxt = "";
var BranchMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=BRANCHMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=BRANCHMASTER_CRUD",
        BindCountryUrl: "/Common/BindMastersDetails?ServiceName=COMMON_COUNTRYMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        BindStateUrl: "/Common/BindMastersDetails?ServiceName=COMMON_STATEMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        BindCityUrl: "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        //BindCompanyUrl: "/Common/BindMastersDetails?ServiceName=COMPANYMASTER_GET&ISACTIVE=1&&IsRecordAll=true",
        Oper: 'Add',
        File: 'BranchMaster.js',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmBranchMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['BranchId', 'Branch Name', 'Voucher Prefix', 'Pincode', 'EmailId', 'Mobile No', 'Address1', 'Address2', 'Address3', 'City Name', 'City Id', 'IsActive'];
        var colModel = [
            { name: "BRANCHID", index: "BRANCHID", xmlmap: xmlvars.common_colmap + "BRANCHID", stype: 'int', sortable: true, hidden: true, search: false },
            { name: "BRANCHNAME", width: 10, index: "BRANCHNAME", xmlmap: xmlvars.common_colmap + "BRANCHNAME", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "VOUCHERPREFIX", width: 10, index: "VOUCHERPREFIX", xmlmap: xmlvars.common_colmap + "VOUCHERPREFIX", stype: 'int', sortable: false, search: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "PINCODE", index: "PINCODE", xmlmap: xmlvars.common_colmap + "PINCODE", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
            { name: "EMAILID", width: 10, index: "EMAILID", xmlmap: xmlvars.common_colmap + "EMAILID", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            { name: "PHONENO", width: 10, index: "PHONENO", xmlmap: xmlvars.common_colmap + "PHONENO", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            //{ name: "COMPANYID", index: "COMPANYID", xmlmap: xmlvars.common_colmap + "COMPANYID", stype: 'int', sortable: false, search: false, hidden: true },
            { name: "ADDRESS1", index: "ADDRESS1", xmlmap: xmlvars.common_colmap + "ADDRESS1", stype: 'text', sortable: false, hidden: true },
            { name: "ADDRESS2", index: "ADDRESS2", xmlmap: xmlvars.common_colmap + "ADDRESS2", stype: 'int', sortable: false, search: false, hidden: true },
            { name: "ADDRESS3", index: "ADDRESS3", xmlmap: xmlvars.common_colmap + "ADDRESS3", stype: 'int', sortable: false, search: false, hidden: true },
            { name: "CITYNAME", width: 10, index: "CITYNAME", xmlmap: xmlvars.common_colmap + "CITYNAME", align: 'center', stype: 'text', sortable: false, search: false },
            { name: "CITYID", index: "CITYID", xmlmap: xmlvars.common_colmap + "CITYID", stype: 'int', sortable: false, search: false, hidden: true },
            { name: "ISACTIVE", width: 5, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'text', align: 'center', sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
        ];

        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'BranchMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'BranchMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'BranchMasterView') } });
        }
        //$("#table_BranchMaster").GridUnload();
        $.jgrid.gridUnload("#table_BranchMaster");
        $("#table_BranchMaster").jqGrid({
            //data: mydata,
            url: getDomain() + url,
            datatype: "xml",
            height: getGridHeight(),
            scroll: 1,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 30,
            rowList: [20, 30, 40],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_BranchMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "BRANCHID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_BranchMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_BranchMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_BranchMaster').setGridWidth(width);
                    $("#gbox_table_BranchMaster").width(width);
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
                    BranchMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_BranchMaster").jqGrid('navGrid', '#pager_BranchMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_BranchMaster_left").css("width", "");
        AlignJqGridHeader('table_BranchMaster', ['edit', 'delete', 'ISACTIVE', 'CITYNAME']);
        // JqGrid navigations shortcuts
        jQuery("#table_BranchMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    BranchMasterView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = BranchMasterView.variables.BindMasterUrl;
        BranchMasterView.initializeJqgrid(url);
        BranchMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            $("#hdnBranchId").val(id);
            var rowData = jQuery("#table_BranchMaster").getRowData(id);
            BranchMasterView.bindCity();
            $('#ddlCity').select2();
            var selectedValuesTest = rowData["CITYID"].split(',');
            $('#ddlCity').val(selectedValuesTest).trigger("change");
            $("#txtBranchName").val(rowData['BRANCHNAME']);
            $("#txtPincode").val(rowData['PINCODE']);
            $("#txtEmailId").val(rowData['EMAILID']);
            $("#txtPhoneNo").val(rowData['PHONENO']);
            $("#txtVoucherPrefix").val(rowData['VOUCHERPREFIX']);
            //BranchMasterView.bindCompany();
            //$("#ddlCompany").val(rowData['COMPANYID']);
            $("#txtAddress1").val(rowData['ADDRESS1']);
            $("#txtAddress2").val(rowData['ADDRESS2']);
            $("#txtAddress3").val(rowData['ADDRESS3']);
            if ($(rowData['ISACTIVE']).html() == "Yes") {
                $("input[name='txtIsActive']").iCheck('check');
            }
            else {
                $("input[name='txtIsActive']").iCheck('uncheck');
            };
            $("#panelBranchMasterEdit").modal("show");
            $("#panelBranchMasterDelete").modal("hide");
            $("#spanBranchMasteroper").text("Edit Show Room");

            BranchMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, BranchMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            BranchMasterView.variables.addedit = "deleted";
            BranchMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_BranchMaster").getRowData(id);
            $("#delblBranchName").html(rowData['BRANCHNAME']);
            $("#hdnBranchId").val(id);

            $("#panelBranchMasterEdit").modal('hide');
            $("#panelBranchMasterDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, BranchMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        BranchMasterView.clearControls();

        $("#panelBranchMasterEdit").modal('show');
        $("#panelBranchMasterDelete").modal('hide');
        $("#spanBranchIdoper").text("Add New Show Room");
        BranchMasterView.showTitlePermissionWise('add');
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteBranchMaster').attr('disabled', true);
            var data = {
                "oper": BranchMasterView.variables.Oper,
                "BRANCHID": $("#hdnBranchId").val()
            }
            BranchMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, BranchMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmBranchMaster").valid();
            if (!isValid)
                return;

            BranchMasterView.variables.Oper = 'Add';
            BranchMasterView.variables.addedit = "added";
            BranchMasterView.variables.Masterid = $("#hdnBranchId").val();

            if (BranchMasterView.variables.Masterid != "0" && parseInt(BranchMasterView.variables.Masterid) > 0) {
                BranchMasterView.variables.Oper = 'Edit';
                BranchMasterView.variables.addedit = 'updated';
            }
            if (BranchMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (BranchMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveBranchMaster').attr('disabled', true);
            var data = {
                "BRANCHNAME": $("#txtBranchName").val(),
                "PINCODE": $("#txtPincode").val(),
                "EMAILID": $("#txtEmailId").val(),
                "PHONENO": $("#txtPhoneNo").val().replace('-', ''),
                //"COMPANYID": $("#ddlCompany").val(),
                "ADDRESS1": $("#txtAddress1").val(),
                "ADDRESS2": $("#txtAddress2").val(),
                "ADDRESS3": $("#txtAddress3").val(),
                "VOUCHERPREFIX": $("#txtVoucherPrefix").val(),
                "CITYID": $("#ddlCity").val(),
                "ISACTIVE": (($('input[name="txtIsActive"]').prop("checked") == true) ? 1 : 0),
                "oper": BranchMasterView.variables.Oper,
                "BRANCHID": BranchMasterView.variables.Masterid
            }

            BranchMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, BranchMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (BranchMasterView.variables.Oper == 'Delete')
                $('#btnDeleteBranchMaster').attr('disabled', false);
            else
                $('#btnSaveBranchMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(BranchMasterView.variables.Oper + ' Operation', 'Record is ' + BranchMasterView.variables.addedit + ' successfully', 'success');
                BranchMasterView.clearControls();
                $("#table_BranchMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, BranchMasterView.variables.File);
        }
    },

    clearControls: function () {
        $("#panelBranchMasterEdit").modal('hide');
        $("#panelBranchMasterDelete").modal('hide');
        $("#txtBranchName").val("");
        $("#txtPincode").val("");
        $("#txtEmailId").val("");
        $("#txtPhoneNo").val("");
        $("#txtAddress1").val("");
        $("#txtAddress2").val("");
        $("#txtAddress3").val("");
        $("#txtVoucherPrefix").val("");
        BranchMasterView.bindCity();
        $('#ddlCity').select2();
        $("#hdnBranchId").val('');
        $("input[name='txtIsActive']").iCheck('check');
        //BranchMasterView.bindCompany();
        $("#frmBranchMaster").validate().resetForm();
        BranchMasterView.variables.Oper = 'Add';
        BranchMasterView.variables.addedit = "added";
        jQuery("#table_list_BranchMaster").jqGrid('resetSelection');
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + BranchMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: BranchMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveBranchMaster").show();
            $("#dBranchMasterTitle").show();
            $("#dViewBranchMasterTitle").hide();
        }
        else {
            if ($("#btnSaveBranchMaster").length > 0) {
                $("#btnSaveBranchMaster").hide();
            }
            $("#dViewBranchMasterTitle").show();
            $("#dBranchMasterTitle").hide();
        }
    },

    //bindCompany: function () {
    //    try {
    //        $("#ddlCompany").html("");
    //        BindDropdown('ddlCompany', 'CompanyDropdownList', getDomain() + BranchMasterView.variables.BindCompanyUrl, '--Select Company--', true);
    //    } catch (e) {
    //        ErrorDetails(e, BranchMasterView.variables.File);
    //    }
    //},

    bindCity: function () {
        $("#ddlCity").html("");
        BindDropdown('ddlCity', 'CityDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&IsRecordAll=true&ISACTIVE=1", '--Select City--', true);
    }

};

$(document).ready(function () {
    try {
        var url = BranchMasterView.variables.BindMasterUrl;
        BranchMasterView.initializeJqgrid(url);
        //BranchMasterView.bindCompany();
        $('#txtPhoneNo').mask("00000-00000");
        $('#txtPincode').mask("000000");
        $(".icheckminimal").iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            labelHover: true,
            cursor: true,
            increaseArea: '15%',
            tap: true
        });

        BranchMasterView.bindCity();
        $('#ddlCity').select2();
        $("#btnAddBranchMaster").click(function () {
            BranchMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveBranchMaster").click(function () {
            BranchMasterView.btnMasterSubmit(BranchMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteBranchMaster").click(function () {
            BranchMasterView.btnMasterDelete();
        });

        $('button[name="CancelBranchMaster"]').click(function () {
            BranchMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelBranchMasterEdit').on('shown.bs.modal', function () {
            $('#txtBranchName').focus();
        });
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = BranchMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                BranchMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = BranchMasterView.variables.BindMasterUrl;
                BranchMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = BranchMasterView.variables.BindMasterUrl;
                BranchMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, BranchMasterView.variables.File);
    }
});