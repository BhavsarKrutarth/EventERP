var UserAccountView = {
    variables: {
        BindUserAccountUrl: "/Common/BindMastersDetails?ServiceName=COMMON_USERACCOUNTLIST_GET",
        PerformuserAccountOperationurl: "/Common/OpeartionsOnMaster?ServiceName=COMMON_USERACCOUNTLIST_CRUD",
        BindChildofUrl: "/Common/BindMastersDetails?ServiceName=SECURITY_USERACCESSGROUPS_GET&sidx=USERGROUPNAME&sord=asc&columnRequested=USERGROUPNAME&IsRecordAll=true",
        Oper: 'Add',
        addedit: "added",
        UserChkFmatter: function (cellvalue, options, rowObject) {
            return "<input type='checkbox' id='chkuser" + options.rowId + "' class='userchk' name='chkuser" + options.rowId + "'>";
        },
    },

    initializeJqgrid: function () {
        $.jgrid.gridUnload("#table_UserAccount");
        $("#table_UserAccount").jqGrid({
            url: getDomain() + UserAccountView.variables.BindUserAccountUrl,
            datatype: "xml",
            height: getGridHeight(),
            scroll: 1,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 30,
            rowList: [20, 30, 40],
            colNames: ['LOGINID', 'Select', 'User Name', 'User Group', 'Employee', 'Account Status', 'Login Status', 'Remark'],
            colModel: [
                { name: "LOGINID", index: "LOGINID", xmlmap: xmlvars.common_colmap + "LOGINID", stype: 'int', sortable: false, hidden: true },
                {
                    name: 'LOGINID1', index: 'LOGINID', width: 5, sortable: false, align: "left", search: false,
                    formatter: function (cv, op, ro) {
                        return UserAccountView.variables.UserChkFmatter(cv, op, ro);
                    }
                },
                { name: "USERNAME", index: "USERNAME", width: 10, xmlmap: xmlvars.common_colmap + "USERNAME", stype: 'text', sortable: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: "USERGROUP", index: "USERGROUP", width: 20, xmlmap: xmlvars.common_colmap + "USERGROUP", stype: 'text', sortable: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                { name: 'EMPLOYEENAME', index: 'EMPLOYEENAME', width: 25, xmlmap: xmlvars.common_colmap + "EMPLOYEENAME", sortable: true, hidden: false, searchoptions: jqGridVariables.stringSearchOption },
                {
                    name: 'ACCOUNTSTATUS', index: 'ACCOUNTSTATUS', width: 10, xmlmap: xmlvars.common_colmap + "ACCOUNTSTATUS", align: "center", search: true, formatter: function (cellvalue, options, rowObject) {
                        if (cellvalue == 'Lock')
                            return '<span style="color:red; font-size: 20px;"><i class="fa fa-lock"></i></span>';
                        else
                            return '<span style="color:green; font-size: 20px;"><i class="fa fa-unlock"></i></span>';
                    },
                    searchoptions: {
                        sopt: ['eq', 'ne'],
                        value: 'Lock:Lock;UnLock:UnLock'

                    }, stype: 'select'

                },
                {
                    name: 'LOGINSTATUS', index: 'LOGINSTATUS', width: 10, xmlmap: xmlvars.common_colmap + "LOGINSTATUS", stype: 'text', align: "center", search: true,
                    searchoptions: {
                        sopt: ['eq', 'ne'],
                        value: 'Logged In:Logged In;Logged Out:Logged Out'

                    }, stype: 'select'
                },
                { name: 'REMARK', index: 'REMARK', width: 22, xmlmap: xmlvars.common_colmap + "REMARK", sortable: false, search: false, stype: "text" },
            ],
            // multiselect: true,
            pager: "#pager_UserAccount",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "LOGINID"
            },
            loadComplete: function () {
                $("#table_UserAccount_LOGINID1").html('<input id="chkEmpAll" style="margin-left:5px;" type="checkbox" name="chkEmpAll">');

                $("#chkEmpAll").change(function (obj) {
                    $("#jqGrid_UserAccount").find('.userchk').prop('checked', $(obj.currentTarget).prop('checked'));
                    if ($("#chkEmpAll").prop('checked') == true) {
                        $("#btnSaveUserAccount").attr('disabled', false);
                    }
                    else {
                        $("#btnSaveUserAccount").attr('disabled', true);
                    }
                });

                $("#jqGrid_UserAccount .userchk").change(function (obj) {
                    if ($('.userchk:checkbox:checked').length > 0) {
                        $("#btnSaveUserAccount").attr('disabled', false);
                    }
                    else {
                        $("#btnSaveUserAccount").attr('disabled', true);
                    }
                });

                $("tr.jqgrow:even").addClass('myAltRowClass');
                // Hide column headers and top pager if no records were returned
                if ($('#table_UserAccount').getGridParam('records') === 0)
                    $('.ui-jqgrid-htable').hide();
                else
                    $('.ui-jqgrid-htable').show();

                //jqGridVariables.JQGridDynamicWidth("#jqGrid_UserAccount", "#table_UserAccount", 1125);
                setTimeout(function () {
                    var width = $('#jqGrid_UserAccount').width();
                    if (width <= 700) {
                        width = 1000;
                    }
                    $('#table_UserAccount').setGridWidth(width);
                }, 200);
                //var selRowIds = jQuery('#table_UserAccount').jqGrid('getGridParam', 'selarrrow');
                //alert('The number of selected rows: ' + selRowIds.length);

                //  var width = $('#jqGrid_UserAccount').width();
                // $('#table_UserAccount').setGridWidth(width + 1);
                //$('#table_UserAccount').setGridWidth(1140);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            sortname: 'USERNAME',
            sortorder: 'asc',
        });

        // JqGrid navigations shortcuts
        jQuery("#table_UserAccount").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                $("#chkuser" + rowid).click();
            }
        });

        //$("#table_UserAccount").jqGrid('navGrid', '#pager_UserAccount',
        //  { edit: false, add: false, del: false, search: true, refresh: false },
        //  { height: 320 }).navButtonAdd('#pager_UserAccount', {
        //      caption: "",
        //      title: "Search",
        //      buttonicon: "",//ui-icon btn btn-sm btn-default fa fa-search
        //      onClickButton: function () {
        //          jQuery("#table_UserAccount").jqGrid('searchGrid',
        //              { sopt: ['eq', 'ne', 'cn'], multipleSearch: true }
        //          );
        //      },
        //      position: "first"
        //  });
        //;
        AlignJqGridHeader('table_UserAccount', ['ACCOUNTSTATUS', 'LOGINSTATUS']);

    },

    triggerInitialClick: function () {
        UserAccountView.initializeJqgrid();
        UserAccountView.bindChildOf();
        UserAccountView.clearControls();
    },

    bindChildOf: function () {
        $.ajax({
            url: getDomain() + UserAccountView.variables.BindChildofUrl,
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    $.each(JsonObject, function (key, innerjson) {
                        $.each(innerjson.detailslist, function (key, innerjsonDetails) {
                            $("#UserAssignChildOf").html($("#childoption").render(innerjsonDetails));
                        });
                    });
                }
                else {
                    InvalidResponseCode(data);
                }

            },
            error: OnError
        });
    },

    btnUserSubmit: function () {
        var isValid = $("#frmUserAccount").valid();

        if (!isValid)
            return;

        if (isA() == 0) {
            notificationMessage('Response', permissionvars.add, 'error');
            return;
        }
        if (isU() == 0) {
            notificationMessage('Response', permissionvars.edit, 'error');
            return;
        }

        if ($('#ChkAssignUser').prop("checked") == false && $('#ChkChangeAccount').prop("checked") == false && $("#ResetPassword").prop("checked") == false) {
            return;
        }

        var logid;
        //logid = jQuery("#table_UserAccount").jqGrid('getGridParam', 'selarrrow');
        // var loginids = "" + logid + "";

        logid = $('.userchk:checkbox:checked');
        var ids = '';
        for (i = 0; i < logid.length; i++) {
            var id = logid[i];
            id = id.id.substring(7);
            ids += id + ',';
        }

        if (ids.length > 0) {
            ids = ids.substring(0, ids.length - 1)
        }

        var usergrp = '';
        if ($('#ChkAssignUser').prop("checked") == true) {
            usergrp = $("#UserAssignChildOf").select2("val");
            usergrp = (usergrp == null) ? '' : usergrp.join();

            if (usergrp == "" || usergrp == null || usergrp == undefined) {
                notificationMessage('Operation', 'Please select atleast one UserGroup.', 'warning');
                return;
            }
        }

        var AccountStatus = '';
        if ($('#ChkChangeAccount').prop("checked") == true) {
            if ($("#AccountStatusSwitch").bootstrapSwitch('state') == true)
                AccountStatus = 'Lock';
            else {
                AccountStatus = 'UnLock';
            }
        }

        var data = {
            "oper": UserAccountView.variables.Oper,
            "LOGINIDS": ids,
            "USERGROUP": usergrp,
            "ACCOUNTSTATUS": AccountStatus,
            "REMARK": $("#txtRemark").val()
        }

        if ($("#ResetPassword").prop("checked") == true) {
            if ($.trim($('#txtCustomPass').val()) == "") {
                notificationMessage('Operation', 'Please enter password.', 'warning');
                return;
            }
            data.RESETPASSWORD = "CUSTOM PASSWORD";
            data.DECRYPTPASSWORD = $("#txtCustomPass").val();
        }
        UserAccountView.savedata(UserAccountView.variables.Oper, data);

    },

    SubmitOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(UserAccountView.variables.Oper + ' Operation', 'Record is ' + UserAccountView.variables.addedit + ' successfully', 'success');
            UserAccountView.clearControls();
            $("#table_UserAccount").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },

    clearControls: function () {

        $("#UserAssignChildOf").select2("val", "");

        $("#AccountStatusSwitch").bootstrapSwitch('state', false);

        $('#ChkAssignUser').iCheck('uncheck');
        $('#ChkChangeAccount').iCheck('uncheck');
        $('#ResetPassword').iCheck('uncheck');
        $("#txtCustomPass").val("");
        $("#txtRemark").val("");
        UserAccountView.variables.Oper = 'Add';
        UserAccountView.variables.addedit = "added";
        $("#btnSaveUserAccount").attr('disabled', true);
    },

    btnMasterCancel: function () {
        UserAccountView.clearControls();
        jQuery("#table_UserAccount").jqGrid('resetSelection');
    },

    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + UserAccountView.variables.PerformuserAccountOperationurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: UserAccountView.SubmitOnSuccess, //function (data) { HelpGeneralSettingView.fnOnSuccessInsert(data) },
            error: OnError
        });
    }

};
function UserAccountSelect(id) {
    if ($(".userchk").is(':checked') == true) {
        if ($('input[name="chkuser"]').is(':checked') == true) {
            $("#btnSaveUserAccount").attr('disabled', false);
        }
        else {
            $("#btnSaveUserAccount").attr('disabled', true);
        }
    }
    else {
        $("#btnSaveUserAccount").attr('disabled', true);
    }
}

$(document).ready(function () {
    $('input[name="chkuser"]').on('ifToggled', function () {
        if ($('input[name="chkuser"]').is(':checked') == true) {
            if ($(".userchk").is(':checked') == true) {
                $("#btnSaveUserAccount").attr('disabled', false);
            }
            else {
                $("#btnSaveUserAccount").attr('disabled', true);
            }
        }
        else {
            $("#btnSaveUserAccount").attr('disabled', true);
        }
    });

    $('#AccountStatusSwitch').bootstrapSwitch('onText', 'Lock');
    $('#AccountStatusSwitch').bootstrapSwitch('offText', 'UnLock');

    $('#UserAssignChildOf').select2(
        { tags: true })
        .on("change", function (e) {
            $('#ChkAssignUser').iCheck('check');
            return true;
        });

    $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function (event, state) {
        $('#ChkChangeAccount').iCheck('check');
        return true;
    });

    $("#txtCustomPass").keyup(function () {
        if ($("#txtCustomPass").val() != "")
            $('#ResetPassword').iCheck('check');
        else
            $('#ResetPassword').iCheck('uncheck');
    });

    $("#btnSaveUserAccount").click(function () {
        UserAccountView.btnUserSubmit();
    });

    $("#btnCancelUserAccount").click(function () {
        UserAccountView.btnMasterCancel();
        $("#frmUserAccount").validate().resetForm();
    });

    UserAccountView.triggerInitialClick();

});