var GSTMasterView = {
    variables: {
        /*BindMasterUrl: "/Common/BindMastersDetails?ServiceName=GST_PARTYMASTER_GET",*/
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=GSTMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=GSTMASTER_CRUD",
        BindBalanceSheetGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        Oper: 'Add',
        File: 'GSTMaster.js',
        addedit: "added",
        MasterId: "",
        // for form validation
        frmvalidator: $("#frmGSTCodeMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    InitializeJqgrid: function (url) {
        var colNames = ['GSTId', 'AccountName', 'BalanceSheetGroupId'];
        var colModel = [
            { name: "GSTID", index: "GSTID", xmlmap: xmlvars.common_colmap + "GSTID", stype: 'int', sortable: false, hidden: true, search: false },
            /*{ name: "PARTYID", index: "PARTYID", xmlmap: xmlvars.common_colmap + "PARTYID", stype: 'int', sortable: false, hidden: true, search: false },*/
            { name: "ACCOUNTNAME", width: 10, index: "ACCOUNTNAME", xmlmap: xmlvars.common_colmap + "ACCOUNTNAME", stype: 'text', sortable: false, search: false },
            //{ name: "MENUID", width: 10, index: "MENUID", xmlmap: xmlvars.common_colmap + "MENUID", stype: 'text', sortable: true, hidden: true, search: false },
            //{ name: "MENUNAME", width: 20, index: "MENUNAME", xmlmap: xmlvars.common_colmap + "MENUNAME", stype: 'text', sortable: false, search: false },
            { name: "BALANCESHEETGROUPID", width: 8, index: "BALANCESHEETGROUPID", align: "center", xmlmap: xmlvars.common_colmap + "BALANCESHEETGROUPID", sortable: false, search: false, hidden: true },
        ];

        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'GSTMasterView ', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'GSTMasterView ', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'GSTMasterView ') } });
        }
        //$("#table_GSTMaster").GridUnload();
        $.jgrid.gridUnload("#table_GSTMaster");
        $("#table_GSTMaster").jqGrid({
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
            pager: "#pager_GSTMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "GSTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_GSTMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_GSTMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_GSTMaster').setGridWidth(width);
                    $("#gbox_table_GSTMaster").width(width);
                }, 200)
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'GSTID',
            sortorder: 'desc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    GSTMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_GSTMaster").jqGrid('navGrid', '#pager_GSTMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_GSTMaster_left").css("width", "");
        AlignJqGridHeader('table_GSTMaster', ['edit', 'delete', 'ISACTIVE']);
        // JqGrid navigations shortcuts
        jQuery("#table_GSTMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    GSTMasterView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerId: function (id) {
        try {
            //$("#hdnGSTId").val(id);
            GSTMasterView.variables.MasterId = id;
            var rowData = jQuery("#table_GSTMaster").getRowData(id);
            $("#txtAccountName").val(rowData['ACCOUNTNAME']);
            $("#ddlBalnceSheetGroup").val(rowData['BALANCESHEETGROUPID']);
            //$("#txtMenuName").attr('menuid', rowData['MENUID']);
            //$("#txtMenuName").val(rowData['MENUNAME']);

            //$('#txtMenuName').multiselect();
            //$($("#txtMenuName")[0].nextSibling).attr("tabindex", "5");
            //var ItemCategory = rowData["MENUID"].split(',');
            //$('#txtMenuName').val(ItemCategory);
            //$("#txtMenuName").multiselect("refresh");

            //if ($(rowData['ISACTIVE']).html() == "Yes") {
            //    $("input[name='txtIsActive']").iCheck('check');
            //}
            //else {
            //    $("input[name='txtIsActive']").iCheck('uncheck');
            //}

            //if ($(rowData['ISGSTTRADING']).html() == "Yes") {
            //    $("input[name='txtIsGSTTrading']").iCheck('check');
            //}
            //else {
            //    $("input[name='txtIsGSTTrading']").iCheck('uncheck');
            //}
            $("#panelGSTMasterEdit").modal("show");
            $("#panelGSTMasterDelete").modal("hide");
            $("#spanGSTMasteroper").text("Edit GST Master");
            GSTMasterView.showTitlePermissionWise('edit');
        }
        catch (e) {
            ErrorDetails(e, GSTMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            GSTMasterView.variables.addedit = "deleted";
            GSTMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_GSTMaster").getRowData(id);
            $("#delblGSTCode").html(rowData['ACCOUNTNAME']);
            //$("#hdnGSTId").val(id);
            GSTMasterView.variables.MasterId = id;
            $("#panelGSTMasterEdit").modal("hide");
            $("#panelGSTMasterDelete").modal("show");
        }
        catch (e) {
            ErrorDetails(e, GSTMasterView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteGSTMaster').attr('disabled', true);
            var data = {
                "oper": GSTMasterView.variables.Oper,
                "GSTID": GSTMasterView.variables.MasterId
            }
            GSTMasterView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, GSTMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmGSTCodeMaster").valid();
            if (!isValid)
                return;

            GSTMasterView.variables.Oper = 'Add';
            GSTMasterView.variables.addedit = "added";
            //GSTMasterView.variables.MasterId = $("#hdnGSTId").val();

            if (GSTMasterView.variables.MasterId != "0" && parseInt(GSTMasterView.variables.MasterId) > 0) {
                GSTMasterView.variables.Oper = 'Edit';
                GSTMasterView.variables.addedit = 'updated';
            }
            if (GSTMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (GSTMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            if ($("#txtPayableAccount").val() == '') {
                if ($("#txtReceivableAccount").val() == '') {
                    notificationMessage('Validation', 'Please, Select Payable Account Or Receivable Account.', 'error');
                    return;
                }
            }

            //var MenuIds = '';
            //if ($("#txtMenuName").val() != null) {
            //    MenuIds = $("#txtMenuName").val().toString();
            //}

            $('#btnSaveGSTMaster').attr('disabled', true);
            var data = {
                "oper": GSTMasterView.variables.Oper,
                "GSTID": GSTMasterView.variables.MasterId,
                "ACCOUNTNAME": $("#txtAccountName").val(),
                "BALANCESHEETGROUPID": $("#ddlBalnceSheetGroup").val(),
                //"MENUID": MenuIds,
                //"MENUNAME": $("#txtMenuName").val(),
            }
            GSTMasterView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, GSTMasterView.variables.File);
        }
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + GSTMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: GSTMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (GSTMasterView.variables.Oper == 'Delete')
                $('#btnDeleteGSTMaster').attr('disabled', false);
            else
                $('#btnSaveGSTMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(GSTMasterView.variables.Oper + ' Operation', 'Record is ' + GSTMasterView.variables.addedit + ' successfully', 'success');
                GSTMasterView.clearControls();
                $("#table_GSTMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        }
        catch (e) {
            ErrorDetails(e, GSTMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#panelGSTMasterEdit").modal("hide");
            $("#panelGSTMasterDelete").modal("hide");
            $("#txtGSTType").val("");
            $("#txtAccountName").val("");
            //$("#txtMenuName").val("");
            $("#txtAccountName").attr('PartyId', '');
            $("#txtDescription").val("");
            $("#frmGSTCodeMaster").validate().resetForm();
            //$("#txtMenuName").multiselect();
            //$("#txtMenuName").val('');
            //$("#txtMenuName").multiselect().multiselectfilter();
            GSTMasterView.variables.Oper = 'Add';
            GSTMasterView.variables.addedit = "added";
            GSTMasterView.variables.MasterId = '';
            jQuery("#table_list_GStMaster").jqGrid('resetSelection');
        }
        catch (e) {
            ErrorDetails(e, GSTMasterView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveGSTMaster").show();
            $("#dGSTMasterTitle").show();
            $("#dViewGSTMasterTitle").hide();
        }
        else {
            if ($("#btnSaveGSTMaster").length > 0) {
                $("#btnSaveGSTMaster").hide();
            }
            $("#dViewGSTMasterTitle").show();
            $("#dGSTMasterTitle").hide();
        }
    },

    BindBalanceSheetGroup: function () {
        $("#ddlBalnceSheetGroup").html("");
        BindDropdown('ddlBalnceSheetGroup', 'BalnceSheetGroupList', getDomain() + GSTMasterView.variables.BindBalanceSheetGroupUrl, '-- Balance Sheet Group --');
    },

}

$(document).ready(function () {
    try {

        GSTMasterView.BindBalanceSheetGroup();

        var Url = GSTMasterView.variables.BindMasterUrl;
        GSTMasterView.InitializeJqgrid(Url);

        /*BindDropdown('txtMenuName', 'MenuDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=GST_MENUMASTER_GET&IsRecordAll=true", '', true);*/

        //$('#txtMenuName').multiselect();
        //$($("#txtMenuName")[0].nextSibling).attr("tabindex", "5");

        $("#btnAddGSTMaster").click(function () {
            GSTMasterView.clearControls();
            $("#panelGSTMasterEdit").modal("show");
            $("#panelGSTMasterDelete").modal("hide");
            //$("#spanHSNIdoper").text("Add New HSN Code");
            GSTMasterView.showTitlePermissionWise('add');
        });

        $("#btnSaveGSTMaster").click(function () {
            GSTMasterView.btnMasterSubmit(GSTMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteGSTMaster").click(function () {
            GSTMasterView.btnMasterDelete();
        });

        $('button[name="CancelGSTMaster"]').click(function () {
            GSTMasterView.clearControls();
        });

        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var Url = GSTMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                GSTMasterView.InitializeJqgrid(Url);
            }
        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var Url = GSTMasterView.variables.BindMasterUrl;
                GSTMasterView.InitializeJqgrid(Url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var Url = GSTMasterView.variables.BindMasterUrl;
                GSTMasterView.InitializeJqgrid(Url);
            }
        });
    }
    catch (e) {
        ErrorDetails(e, GSTMasterView.variables.File);
    }
});