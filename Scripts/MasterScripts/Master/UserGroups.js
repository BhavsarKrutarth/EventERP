var searchtxt = "";
var UserGroupDetailView = {
    variables: {
        userGroupid: "",
        Oper: "",
        File: "UserGroup.js",
        BindGroupListUrl: "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=SECURITY_USERACCESSGROUPS_CRUD",
        UserGroupPermissionCrudUrl: "/Common/OpeartionsOnMaster?ServiceName=SECURITY_USERACCESSGROUPS_PERMISSION_CRUD",
        UserGroupPermissionGetUrl: "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_PERMISSION_GET"
    },

    initializeJqgrid: function (url) {

        colNames = ['UserGroupId', 'User Group Name', 'IpRangeFrom', 'IpRangeTo', 'IndividualIp', 'Display Order', 'Active', 'Is Voucher Edit'],
            colModel = [
                { name: "USERGROUPID", index: "USERGROUPID", xmlmap: xmlvars.common_colmap + "USERGROUPID", sortable: false, search: false, hidden: true },
                { name: "USERGROUPNAME", index: "USERGROUPNAME", width: 45, xmlmap: xmlvars.common_colmap + "USERGROUPNAME", search: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "IPRANGEFROM", index: "IPRANGEFROM", xmlmap: xmlvars.common_colmap + "IPRANGEFROM", sortable: false, search: false, hidden: true },
                { name: "IPRANGETO", index: "IPRANGETO", xmlmap: xmlvars.common_colmap + "IPRANGETO", sortable: false, search: false, hidden: true },
                { name: "INDIVIDUALIP", index: "INDIVIDUALIP", xmlmap: xmlvars.common_colmap + "INDIVIDUALIP", sortable: false, search: false, hidden: true },
                { name: "DISPLAYORDER", index: "DISPLAYORDER", xmlmap: xmlvars.common_colmap + "DISPLAYORDER", align: "center", sortable: true, width: 15, search: false, hidden: false },
                { name: "ISACTIVE", index: "ISACTIVE", width: 10, xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'text', align: 'center', formatter: jqGridVariables.chkFmatter, align: "center", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                { name: "ISVOUCEHREDIT", index: "ISVOUCEHREDIT", width: 10, xmlmap: xmlvars.common_colmap + "ISVOUCEHREDIT", stype: 'text', align: 'center', formatter: jqGridVariables.chkFmatter, align: "center", stype: 'text' }

            ];
        if (isU()) {
            colNames.push('Manage Permission');
            colModel.push({
                name: 'PERMISSION', index: 'PERMISSION', width: 20, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) {
                    return "<a style=\"cursor:pointer;color: #39a4d4;\" title=\"Manage Rights\" onclick=\"UserGroupDetailView.ManageMenuRights('" + op.rowId + "');\">Menu</a>";
                }
            });
        }

        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'UserGroupDetailView', 'edit') } });
        } else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'UserGroupDetailView', 'view') } });
        }

        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'act', index: 'act', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'UserGroupDetailView') } });
        }

        //$("#table_list_UserGroupdetail").GridUnload();
        $.jgrid.gridUnload("#table_list_UserGroupdetail");
        $("#table_list_UserGroupdetail").jqGrid({
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
            pager: "#pager_list_UserGroupdetail",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "USERGROUPID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');


                // Hide column headers and top pager if no records were returned
                if ($('#table_list_UserGroupdetail').getGridParam('records') == 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqgrid_UserGroupdetail').width();
                    if (width <= 700) {
                        width = 1000;
                    }
                    $('#table_list_UserGroupdetail').setGridWidth(width);
                }, 200);

            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'DISPLAYORDER',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    UserGroupDetailView.triggerId(rowid, 'edit')
                }
            }
        });

        // JqGrid navigations shortcuts
        jQuery("#table_list_UserGroupdetail").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    UserGroupDetailView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_list_UserGroupdetail").jqGrid('navGrid', '#pager_list_UserGroupdetail',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 320 }
        );
        $("#pager_list_UserGroupdetail_left").css("width", "");
        AlignJqGridHeader('table_list_UserGroupdetail', ['PERMISSION', 'DISPLAYORDER', 'ISACTIVE', 'edit', 'act']);


    },

    ManageMenuRights: function (id) {
        try {
            var rowData = jQuery("#table_list_UserGroupdetail").getRowData(id);
            UserGroupDetailView.variables.Oper = 'edit';
            UserGroupDetailView.variables.userGroupid = rowData['USERGROUPID'];
            $("#mpUserGroup").html(rowData['USERGROUPNAME']);
            $("#panelUserGroup").hide();
            $("#panelMenuRights").show();

            //UserGroupView.bindPermission(UserGroupView.variables.BindPermissionUrl + "&_search=true&searchField=USERGROUPID&searchOper=eq&searchString=" + id);
            UserGroupDetailView.bindPermission(id);
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    bindPermission: function (id) {
        try {
            var myfilter = { rules: [] };
            myfilter.rules.push({ field: "USERGROUPID", data: id });
            $.ajax({
                url: getDomain() + UserGroupDetailView.variables.UserGroupPermissionGetUrl + "&myfilters=" + JSON.stringify(myfilter),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        $("#tabheader_menupermissions").html($("#JSRMenuPermissionTabsHeader").render(JsonObject.serviceresponse.modulelist.module));
                        $("#tabcontent_menupermissions").html($("#JSRMenuPermissionTabsContent").render(JsonObject.serviceresponse.modulelist.module));
                        $('#tabhead-1').click();

                        $(".icheckminimal").iCheck({
                            checkboxClass: 'icheckbox_minimal-blue',
                            radioClass: 'iradio_minimal-blue',
                            labelHover: true,
                            cursor: true,
                            increaseArea: '15%',
                            tap: true
                        });
                        //Header checkbox's click event
                        $('[name=chkHead]').on('ifClicked', function (event) {
                            var oper = this.getAttribute('data-oper');
                            var module = this.getAttribute('data-module');
                            if ($(event.target).prop("checked"))
                                $('#' + module + ' [data-oper=' + oper + ']').iCheck('uncheck');
                            else
                                $('#' + module + ' [data-oper=' + oper + ']').iCheck('check');
                        });
                    }
                    else {
                        notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                    }
                },
                error: OnError
            });
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    SaveMenuRights: function () {
        try {
            var xmlDocument = UserGroupDetailView.GenerateRightsPermissionNode();

            if (xmlDocument != "" && xmlDocument != undefined) {
                xmlDocument = "<MENULIST>" + xmlDocument + "</MENULIST>";
            }

            data = {
                "oper": UserGroupDetailView.variables.Oper,
                "XMLPARAM": escape(xmlDocument),
                "USERGROUPID": UserGroupDetailView.variables.userGroupid
            }
            $.ajax({
                url: getDomain() + UserGroupDetailView.variables.UserGroupPermissionCrudUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: function (result) {
                    if ($(result).find('RESPONSECODE').text() == "0") {
                        if (UserGroupDetailView.variables.Oper == 'add') {
                            notificationMessage('Save Operation', 'Record is saved successfully', 'success');
                        }
                        else {
                            notificationMessage('Edit Operation', 'Record is updated successfully', 'success');
                        }
                        $("#panelMenuRights").hide();
                        $("#panelUserGroup").show();

                        $("#table_list_UserGroupdetail").trigger("reloadGrid", [{ current: true }]);
                    }
                    else {
                        notificationMessage('Error', $(result).find('RESPONSEMESSAGE').text(), 'error');
                    }
                },
                error: OnError
            });
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    GenerateRightsPermissionNode: function () {
        try {
            var xmlDocument = "";

            $('#tabcontent_menupermissions tbody tr').each(function (key, obj) {
                mid = $(obj).data('id');
                if (mid != undefined) {
                    xmlDocument += "<MENU>";
                    xmlDocument += "<MENUID>" + mid + "</MENUID>";
                    xmlDocument += "<ISVIEW>" + $('#chkView' + mid).prop("checked") + "</ISVIEW>";
                    xmlDocument += "<ISADD>" + $('#chkAdd' + mid).prop("checked") + "</ISADD>";
                    xmlDocument += "<ISUPDATE>" + $('#chkUpdate' + mid).prop("checked") + "</ISUPDATE>";
                    xmlDocument += "<ISDELETE>" + $('#chkDelete' + mid).prop("checked") + "</ISDELETE>";
                    xmlDocument += "<ISDOWNLOAD>" + $('#chkDownload' + mid).prop("checked") + "</ISDOWNLOAD>";
                    xmlDocument += "<ISDISABLEIPLOCK>" + $('#chkLock' + mid).prop("checked") + "</ISDISABLEIPLOCK>";
                    xmlDocument += "<ISSAMEDAYLOCK>" + $('#chkSameDayLock' + mid).prop("checked") + "</ISSAMEDAYLOCK>";
                    xmlDocument += "</MENU>";
                }
            });

            return xmlDocument;
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    triggerId: function (id, oper) {
        try {
            var rowData = jQuery("#table_list_UserGroupdetail").getRowData(id);

            if ($(rowData['ISACTIVE']).html() == 'Yes') {
                $('#chkUGIsActive').iCheck('check');
            }
            else {
                $('#chkUGIsActive').iCheck('uncheck');
            }
            if ($(rowData['ISVOUCEHREDIT']).html() == 'Yes') {
                $('#IsVoucehrEdit').iCheck('check');
            }
            else {
                $('#IsVoucehrEdit').iCheck('uncheck');
            }

            $("#hdn_usergroupid").val(rowData['USERGROUPID'])
            $("#txt_usergroup_name").val(rowData['USERGROUPNAME']);
            $("#txt_usergroup_order").val(rowData['DISPLAYORDER']);
            $("#txt_usergroup_iprangefrom").val(rowData['IPRANGEFROM']);
            $("#txt_usergroup_iprangeto").val(rowData['IPRANGETO']);
            $("#txt_usergroup_individualip").val(rowData['INDIVIDUALIP']);
            $('#Modal_UserGroupEdit').modal("show");
            $("#btndelete").show();
            $("#btnDeleteUserGroup").show();
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#formUserGroup").valid();

            if (!isValid)
                return;

            //if (($("#txt_usergroup_iprangefrom").val() != "" && $("#txt_usergroup_iprangeto").val() != "") || $("#txt_usergroup_individualip").val() != "") {

            //}
            //else {
            //    OperationMessage("", 'Please enter IP Address', 'warning');
            //    return;
            //}

            UserGroupDetailView.variables.Oper = 'Add';
            UserGroupDetailView.variables.addedit = "added";
            UserGroupDetailView.variables.userGroupid = $("#hdn_usergroupid").val();

            $('#btnSaveUserGroup').attr('disabled', true);

            if (UserGroupDetailView.variables.userGroupid != "0" && parseInt(UserGroupDetailView.variables.userGroupid) > 0) {
                UserGroupDetailView.variables.Oper = 'Edit';
                UserGroupDetailView.variables.addedit = 'updated';
            }
            //var checkIsActive;
            //if ($('#chkUGIsActive').is(":checked")) {
            //    checkIsActive = '1'
            //}
            //else {
            //    checkIsActive = '0'
            //}

            var data = {
                "USERGROUPID": UserGroupDetailView.variables.userGroupid,
                "oper": UserGroupDetailView.variables.Oper,
                "USERGROUPNAME": $("#txt_usergroup_name").val(),
                "ISACTIVE": (($('#chkUGIsActive').prop("checked") == true) ? 1 : 0),
                "ISVOUCEHREDIT": (($('#IsVoucehrEdit').prop("checked") == true) ? 1 : 0),
                "DISPLAYORDER": $("#txt_usergroup_order").val(),
                "IPRANGEFROM": $("#txt_usergroup_iprangefrom").val(),
                "IPRANGETO": $("#txt_usergroup_iprangeto").val(),
                "INDIVIDUALIP": $("#txt_usergroup_individualip").val()
            }
            UserGroupDetailView.savedata(data, UserGroupDetailView.variables.Oper);
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    savedata: function (data, oper) {
        try {
            $.ajax({
                url: getDomain() + UserGroupDetailView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: UserGroupDetailView.btnMasterSubmitOnSuccess,
                error: OnError,
            });
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if ($(data).find('RESPONSECODE').text() == "0") {
                if (UserGroupDetailView.variables.Oper == 'Delete') {
                    $('#btnDeleteCancelUserGroup').attr('disabled', false);
                    OperationMessage("", 'Cutomer detail deleted successfully', 'success');
                    $('#Modal_UserGroupDelete').modal("hide");
                } else {
                    $('#btnSaveUserGroup').attr('disabled', false);
                    OperationMessage("", 'Cutomer detail saved successfully', 'success');
                    $('#Modal_UserGroupEdit').modal("hide");
                }
                UserGroupDetailView.ClearValues();
                $("#table_list_UserGroupdetail").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
                $('#btnDeleteCancelUserGroup').attr('disabled', false);
            }
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    deleteRow: function (id) {
        try {
            UserGroupDetailView.variables.addedit = "deleted";
            UserGroupDetailView.variables.Oper = "Delete";
            var rowData = jQuery("#table_list_UserGroupdetail").getRowData(id);
            $("#dellblusergroupname").html(rowData['USERGROUPNAME']);
            $("#hdn_usergroupid").val(id);

            $('#Modal_UserGroupEdit').modal("hide");
            $('#Modal_UserGroupDelete').modal("show");
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    btnMasterDelete: function () {
        try {
            $('#btnDeleteCancelUserGroup').attr('disabled', true);
            var data = {
                "oper": UserGroupDetailView.variables.Oper,
                "USERGROUPID": $("#hdn_usergroupid").val()
            }
            UserGroupDetailView.savedata(data);
        }
        catch (e) {
            ErrorDetails(e, UserGroupDetailView.variable.File);
        }
    },

    ClearValues: function () {
        $("#formUserGroup").validate().resetForm();
        $("#hdn_usergroupid").val("");
        $("#txt_usergroup_name").val("");
        $("#txt_usergroup_order").val("");
        $("#txt_usergroup_iprangefrom").val("");
        $("#txt_usergroup_iprangeto").val("");
        $("#txt_usergroup_individualip").val("");
        $("label.error").hide();
        $('#chkUGIsActive').iCheck('check');
        $('#IsVoucehrEdit').iCheck('uncheck');

    },
    setRights: function (val) {
        if ($("#ddlRight" + val).val() == 0) {
            $("#tb" + val + " input[name='View']").iCheck('uncheck');
            $("#tb" + val + " input[name='DisableIPLock']").iCheck('uncheck');
            $("#tb" + val + " input[name='Download']").iCheck('uncheck');
            $("#tb" + val + " input[name='Add']").iCheck('uncheck');
            $("#tb" + val + " input[name='Delete']").iCheck('uncheck');
            $("#tb" + val + " input[name='Update']").iCheck('uncheck');
        }
        else if ($("#ddlRight" + val).val() == 1) {
            $("#tb" + val + " input[name='View']").iCheck('check');
            $("#tb" + val + " input[name='DisableIPLock']").iCheck('check');
            $("#tb" + val + " input[name='Download']").iCheck('check');
            $("#tb" + val + " input[name='Add']").iCheck('check');
            $("#tb" + val + " input[name='Delete']").iCheck('check');
            $("#tb" + val + " input[name='Update']").iCheck('check');
        }
        else if ($("#ddlRight" + val).val() == 2) {
            $("#tb" + val + " input[name='View']").iCheck('check');
            $("#tb" + val + " input[name='DisableIPLock']").iCheck('check');
            $("#tb" + val + " input[name='Download']").iCheck('check');
            $("#tb" + val + " input[name='Add']").iCheck('uncheck');
            $("#tb" + val + " input[name='Delete']").iCheck('uncheck');
            $("#tb" + val + " input[name='Update']").iCheck('uncheck');
        }
        else if ($("#ddlRight" + val).val() == 3) {
            $("#tb" + val + " input[name='View']").iCheck('check');
            $("#tb" + val + " input[name='Add']").iCheck('check');
            $("#tb" + val + " input[name='DisableIPLock']").iCheck('check');
            $("#tb" + val + " input[name='Download']").iCheck('check');
            $("#tb" + val + " input[name='Delete']").iCheck('uncheck');
            $("#tb" + val + " input[name='Update']").iCheck('uncheck');
        }
        else if ($("#ddlRight" + val).val() == 4) {
            $("#tb" + val + " input[name='View']").iCheck('check');
            $("#tb" + val + " input[name='Add']").iCheck('check');
            $("#tb" + val + " input[name='DisableIPLock']").iCheck('check');
            $("#tb" + val + " input[name='Download']").iCheck('check');
            $("#tb" + val + " input[name='Delete']").iCheck('uncheck');
            $("#tb" + val + " input[name='Update']").iCheck('check');
        }
        else if ($("#ddlRight" + val).val() == 5) {
            $("#tb" + val + " input[name='View']").iCheck('check');
            $("#tb" + val + " input[name='Add']").iCheck('check');
            $("#tb" + val + " input[name='DisableIPLock']").iCheck('check');
            $("#tb" + val + " input[name='Download']").iCheck('check');
            $("#tb" + val + " input[name='Delete']").iCheck('check');
            $("#tb" + val + " input[name='Update']").iCheck('uncheck');
        }

    }
}


$(document).ready(function () {
    $('.number').keypress(function (event) {
        return numbersOnly(this, event, false, false);
    });

    var url = UserGroupDetailView.variables.BindGroupListUrl;
    UserGroupDetailView.initializeJqgrid(url);

    $("#btnSaveUserGroup").click(function () {
        UserGroupDetailView.btnMasterSubmit();
    });

    $("#btnCancelUserGroup").click(function () {
        UserGroupDetailView.ClearValues();
        $('#Modal_UserGroupEdit').modal("hide");
        $("#table_list_UserGroupdetail").trigger("reloadGrid", [{ current: true }]);
    });

    $("#btnAddNewUserGroup").click(function () {
        UserGroupDetailView.ClearValues();
        $('#Modal_UserGroupEdit').modal("show");
    });

    $("#btnDeleteUserGroupMaster").click(function () {
        UserGroupDetailView.btnMasterDelete();
    });

    $("#btnDeleteUserGroup").click(function () {
        UserGroupDetailView.deleteRow($("#hdn_usergroupid").val());
    });

    $("#btnBackMenuPermission,#btnCancelMenuPermissions,#btnDeleteCancelUserGroup").click(function () {
        $("#panelMenuRights").hide();
        $('#Modal_UserGroupDelete').modal("hide");
        $("#panelUserGroup").show();
        $("#table_list_UserGroupdetail").trigger("reloadGrid", [{ current: true }]);
    });

    // For focusing on first textbox in modal
    $('#Modal_UserGroupEdit').on('shown.bs.modal', function () {
        $('#txt_usergroup_name').focus();
    })

    $("#btnSaveMenuPermissions").click(function () {
        UserGroupDetailView.SaveMenuRights();
    });
    $("#txtsearchbox").keyup(function (event) {
        if ($("#txtsearchbox").val().length > 2) {
            var myfilter,
                myfilter = { rules: [] };
            myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
            var url = UserGroupDetailView.variables.BindGroupListUrl + "&myfilters=" + JSON.stringify(myfilter);
            UserGroupDetailView.initializeJqgrid(url);
        }

    });
    $("#txtsearchbox").keydown(function (event) {
        if (event.ctrlKey && event.keyCode == 65) {
            searchtxt = true;
        }
        else if (event.keyCode == 8 && searchtxt == true) {
            searchtxt = false;
            var url = UserGroupDetailView.variables.BindGroupListUrl;
            UserGroupDetailView.initializeJqgrid(url);
        }
        if ($("#txtsearchbox").val().length == 2) {
            var url = UserGroupDetailView.variables.BindGroupListUrl;
            UserGroupDetailView.initializeJqgrid(url);
        }
    });
});
