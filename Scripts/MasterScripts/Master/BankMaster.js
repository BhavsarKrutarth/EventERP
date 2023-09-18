var searchtxt = "";
var BankMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=BANKMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=BANKMASTER_CRUD",
        BindBSGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        File: 'BankMaster.js',
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        Count: 1,
        ChequeMasterID: "",
        CheckBoxId: "",
        ChequeDetailsId: "",
    },

    initializeJqgrid: function (url) {
        var colNames = ['BankMasterId', 'Bank Name', 'Short Name', 'BalanceSheetGroupId', 'Account No', 'IFSC/Swift Code', 'Branch Name', 'BankAddress', 'BankNameId', 'Phone No', 'GSTNo', 'BANKLINK', 'ByDefault', 'RPT', 'IsActive', 'Cheque Master Id', 'Cheque List'];
        var colModel = [
            { name: "BANKMASTERID", index: "BANKMASTERID", xmlmap: xmlvars.common_colmap + "BANKMASTERID", stype: 'int', sortable: true, hidden: true },
            { name: "BANKNAME", index: "BANKNAME", xmlmap: xmlvars.common_colmap + "BANKNAME", stype: 'text', width: 15, sortable: true },
            { name: "SHORTNAME", index: "SHORTNAME", xmlmap: xmlvars.common_colmap + "SHORTNAME", stype: 'text', sortable: true, width: 6 },
            { name: "BALANCESHEETGROUPID", index: "BALANCESHEETGROUPID", xmlmap: xmlvars.common_colmap + "BALANCESHEETGROUPID", stype: 'int', hidden: true, sortable: false, search: false },
            { name: "ACCOUNTNO", index: "ACCOUNTNO", xmlmap: xmlvars.common_colmap + "ACCOUNTNO", stype: 'text', width: 10 },
            { name: "SWIFTCODE", index: "SWIFTCODE", xmlmap: xmlvars.common_colmap + "SWIFTCODE", stype: 'text', sortable: true, search: true, width: 10 },
            { name: "BRANCHNAME", index: "BRANCHNAME", xmlmap: xmlvars.common_colmap + "BRANCHNAME", stype: 'text', sortable: true, width: 10, search: false },
            { name: "BANKADDRESS", index: "BANKADDRESS", xmlmap: xmlvars.common_colmap + "BANKADDRESS", stype: 'text', hidden: true, sortable: false, search: false },
            { name: "BANKNAMEID", index: "BANKNAMEID", xmlmap: xmlvars.common_colmap + "BANKNAMEID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "PHONE", index: "PHONE", xmlmap: xmlvars.common_colmap + "PHONE", stype: 'text', width: 10, sortable: false, search: false },
            { name: "GSTNO", index: "GSTNO", xmlmap: xmlvars.common_colmap + "GSTNO", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "BANKLINK", index: "BANKLINK", xmlmap: xmlvars.common_colmap + "BANKLINK", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "BYDEFAULT", index: "BYDEFAULT", xmlmap: xmlvars.common_colmap + "BYDEFAULT", stype: 'text', width: 7, formatter: function (cv, op, ro) { return jqGridVariables.SwitchBtnFmatter(cv, op, ro, 'BankMasterView', 'edit') }, sortable: false, search: false },
            { name: "RPTFILEID", index: "RPTFILEID", xmlmap: xmlvars.common_colmap + "RPTFILEID", stype: 'text', hidden: true, sortable: false, search: false },
            { name: "ISACTIVE", index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'text', width: 5, formatter: jqGridVariables.chkFmatter, sortable: false, search: false },
            { name: "CHEQUEID", index: "CHEQUEID", xmlmap: xmlvars.common_colmap + "CHEQUEID", stype: 'text', hidden: true, sortable: false, search: false },
            {
                name: 'CHEQUEMASTERID', index: 'CHEQUEMASTERID', width: 5, sortable: false, search: false, formatter: function (cv, op, ro) {
                    if (cv) {
                        return "<a style=\"cursor:pointer;color: #39a4d4;\" title=\"View\" onclick=\"BankMasterView.ViewCHequeList('" + cv + "');\">View</a>";
                    } else {
                        return "";
                    }
                }
            }
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'BankMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'BankMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'BankMasterView') } });
        }
        //$("#table_BankMaster").GridUnload();
        $.jgrid.gridUnload("#table_BankMaster");
        $("#table_BankMaster").jqGrid({
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
            pager: "#pager_BankMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "BANKMASTERID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                $(".switch").bootstrapSwitch();
                // Hide column headers and top pager if no records were returned
                if ($('#table_BankMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqgrid_BankMaster').width();
                    if (width <= 700) {
                        width = 1000;
                    }
                    $('#table_BankMaster').setGridWidth(width);
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
                    BankMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        jQuery("#table_BankMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    BankMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_BankMaster").jqGrid('navGrid', '#pager_BankMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_BankMaster_left").css("width", "");
        AlignJqGridHeader('table_BankMaster', ['edit', 'delete']);
    },

    triggerInitialClick: function () {
        var url = BankMasterView.variables.BindMasterUrl;
        BankMasterView.initializeJqgrid(url);
        BankMasterView.clearControls();
    },

    triggerId: function (id, oper) {
        try {
            var rowData = jQuery("#table_BankMaster").getRowData(id);
            $("#hdnBankMasterId").val(id);
            $("#txtBankMasterId").val(rowData['BANKMASTERID']);
            $("#txtBankName").val(rowData['BANKNAME']);
            $("#txtShortName").val(rowData['SHORTNAME']);
            $("#ddlBalanceSheetGroupId").val(rowData['BALANCESHEETGROUPID']);
            $("#txtAccountNo").val(rowData['ACCOUNTNO']);
            $("#txtSwiftCode").val(rowData['SWIFTCODE']);
            $("#txtBranchName").val(rowData['BRANCHNAME']);
            $("#txtBankAddress").val(rowData['BANKADDRESS']);
            $("#ddlBankNameId").val(rowData['BANKNAMEID']);
            $("#ddlRPTfile").val(rowData['RPTFILEID'])
            $("#txtBankLink").val(rowData['BANKLINK']);
            $("#txtPhone").val(rowData['PHONE']);
            $("#txtGSTNo").val(rowData['GSTNO']);
            BankMasterView.variables.ChequeMasterID = rowData['CHEQUEID'];
            //if ($(rowData['BYDEFAULT']).val() ==1) {
            //    $("input[name='txtByDefault']").iCheck('check');
            //}
            //else {
            //    $("input[name='txtByDefault']").iCheck('uncheck');
            //}
            if ($(rowData['ISACTIVE']).html() == "Yes") {
                $("input[name='txtIsActive']").iCheck('check');
            }
            else {
                $("input[name='txtIsActive']").iCheck('uncheck');
            }

            if (BankMasterView.variables.ChequeMasterID) {
                var myfilter = { rules: [] };
                myfilter.rules.push({ field: "CHEQUEMASTERID", op: "eq", data: BankMasterView.variables.ChequeMasterID });
                $.ajax({
                    url: getDomain() + "/Common/BindMastersDetails?ServiceName=CHEQUEBOOKDETAIL_GET&myfilters=" + JSON.stringify(myfilter),
                    async: false,
                    cache: false,
                    type: 'POST',
                    success: function (data) {
                        $("#chequemasterbody").html("");
                        if ($(data).find('RESPONSECODE').text() == "0") {
                            var JsonObject = xml2json.parser(data);
                            if (JsonObject.serviceresponse.detailslist != undefined) {
                                var list;
                                if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                    list = JsonObject.serviceresponse.detailslist.details;
                                else
                                    list = JsonObject.serviceresponse.detailslist;
                                $.each(list, function (key, innerjsonDetails) {
                                    var cnt = $('#chequemasterbody').find('tr').length + 1;
                                    var ischecked;
                                    if (innerjsonDetails.isactive == 1) {
                                        ischecked = "checked";
                                    }
                                    else {
                                        ischecked = "";
                                    }
                                    var start = (innerjsonDetails.startchequeno).replace(/-/g, "")
                                    var end = (innerjsonDetails.endchequeno).replace(/-/g, "")
                                    $("#chequemasterbody").append(" <tr id=" + innerjsonDetails.chequebookdetailid + ">" +
                                        '<td style="text-align: center;"></td>' +
                                        '<td>' +
                                        ' <input value="' + start + '" type="text" onfocusout="Calculatechequestart(' + BankMasterView.variables.Count + ')"  class="form-control numbers txtstartchequeno" name="txtstartchequeno' + BankMasterView.variables.Count + '" id="txtstartchequeno' + BankMasterView.variables.Count + '">' +
                                        ' </td>' +
                                        '<td>' +
                                        ' <input value="' + end + '" type="text" onfocusout="Calculatechequeend(' + BankMasterView.variables.Count + ')" class="form-control numbers txtendchequeno" name="txtendchequeno' + BankMasterView.variables.Count + '" id="txtendchequeno' + BankMasterView.variables.Count + '">' +
                                        ' </td>' +
                                        '<td>' +
                                        ' <span class="form-control numbers txttotalcheque" name="txtchequenum" id="txttotalcheque' + BankMasterView.variables.Count + '">' + innerjsonDetails.noofcheque + '</span>' +
                                        ' </td>' +
                                        '<td>' +
                                        ' <span class="form-control numbers txtissuedate" name="txtissuedate" id="txtissuedate' + BankMasterView.variables.Count + '">' + innerjsonDetails.issuedate + '</span>' +
                                        ' </td>' +
                                        '<td style="text-align: center;">' +
                                        '<input id="isactivecheck' + BankMasterView.variables.Count + '" name="chkLess' + BankMasterView.variables.Count + '" type="checkbox" class="OtherCheck chkOtherCheck' + BankMasterView.variables.Count + '" ' + ischecked + '>' +
                                        '</td>' +
                                        '<td class="btnAddcommomRemove">' +
                                        ' <div>' +
                                        '     <i class="icon-cancel-circle2" onclick="ItemRemoveEditRow(' + innerjsonDetails.chequebookdetailid + ')"></i>' +
                                        ' </div>' +
                                        '</td>' +
                                        '<td style="text-align: center;display:none" class="chequemasterid">' + innerjsonDetails.chequebookdetailid + '</td>' +
                                        "</tr>");

                                    BankMasterView.variables.Count++;

                                });
                                $("#chequemasterbody tr:first td:nth-last-child(2) div").remove();
                            }
                            else {
                                ItemAddNewRowModal();
                            }
                        }
                        else {
                            InvalidResponseCode(data);
                        }
                    },
                    error: OnError
                });
            }
            else {
                ItemAddNewRowModal();
            }

            $("#Modal_BankMasterEdit").modal('show');
            $("#Modal_BankMasterDelete").modal('hide');
            $("#spanBankMasteroper").text("Edit Bank Master");
            BankMasterView.showTitlePermissionWise(oper);
        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    toggleSwitch: function (id) {
        var data = {
            "BYDEFAULT": $("#toggleSwitch" + id).prop("checked") ? "1" : "0",
            "BANKMASTERID": id,
            "oper": "edit"
        }
        $.ajax({
            url: getDomain() + BankMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: BankMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    deleteRow: function (id) {
        try {
            BankMasterView.variables.addedit = "deleted";
            BankMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_BankMaster").getRowData(id);
            $("#delBankName").html(rowData['BANKNAME']);
            $("#delAccountNo").html(rowData['ACCOUNTNO']);
            $("#delBrnachName").html(rowData['BRANCHNAME']);
            $("#hdnBankMasterId").val(id);
            $("#Modal_BankMasterEdit").modal('hide');
            $("#Modal_BankMasterDelete").modal('show');
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            $("#Modal_BankMasterEdit").modal('show');
            ItemAddNewRowModal();
            $("#Modal_BankMasterDelete").modal('hide');
            BankMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteBankMaster').attr('disabled', true);
            var data = {
                "oper": BankMasterView.variables.Oper,
                "BANKMASTERID": $("#hdnBankMasterId").val(),
            }
            BankMasterView.savedata(data);

        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmBankMaster").valid();

            //var isValid = $("#frmChequeBookMaster").valid();
            //if ($("#txtseriesfrom").val() == "" || $("#txtseriesto").val() == "") {
            //    isValid = false;
            //    $("#errorseries").show();
            //    $("#errorseries").html("This field is required.");
            //    return;
            //}
            //if ($(".txtendchequeno").hasClass("table-input-error") || $(".txtstartchequeno").hasClass("table-input-error")) {
            //    isValid = false;
            //}

            if (!isValid)
                return;
            BankMasterView.variables.Oper = 'Add';
            BankMasterView.variables.addedit = "added";
            BankMasterView.variables.Masterid = $("#hdnBankMasterId").val();

            if (BankMasterView.variables.Masterid != "0" && parseInt(BankMasterView.variables.Masterid) > 0) {
                BankMasterView.variables.Oper = 'Edit';
                BankMasterView.variables.addedit = 'updated';
            }
            if (BankMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (BankMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            var xmlsaveFiles = "<CHEQUEBOOKDETAIL>";
            var resultXml = makeFileXml('#chequemasterbody');
            xmlsaveFiles += resultXml.xmlsaveFiles;
            xmlsaveFiles += "</CHEQUEBOOKDETAIL>";

            $('#btnSaveBankMaster').attr('disabled', true);
            //var chkByDefault
            //if ($('#chkByDefault').is(":checked")) {
            //    chkByDefault = '1'
            //}
            //else {
            //    chkByDefault = '0'
            //}
            var chkIsActive
            if ($('#chkIsActive').is(":checked")) {
                chkIsActive = '1'
            }
            else {
                chkIsActive = '0'
            }
            var data = {
                "BANKNAME": $("#txtBankName").val(),
                "SHORTNAME": $("#txtShortName").val(),
                "BALANCESHEETGROUPID": $("#ddlBalanceSheetGroupId").val(),
                "ACCOUNTNO": $("#txtAccountNo").val(),
                "SWIFTCODE": $("#txtSwiftCode").val(),
                "BRANCHNAME": $("#txtBranchName").val(),
                "BANKADDRESS": $("#txtBankAddress").val(),
                "BANKLINK": $("#txtBankLink").val(),
                "BANKNAMEID": $("#ddlBankNameId").val(),
                "RPTFILEID": $("#ddlRPTfile").val(),
                "PHONE": $("#txtPhone").val().replace('-', ''),
                "GSTNO": $("#txtGSTNo").val(),
                //"BYDEFAULT": chkByDefault,
                "ISACTIVE": chkIsActive,
                "oper": BankMasterView.variables.Oper,
                "BANKMASTERID": BankMasterView.variables.Masterid,

                "BANKID": BankMasterView.variables.Masterid,
                "XMLPARAM": escape(xmlsaveFiles),
                "CHEQUEMASTERID": BankMasterView.variables.ChequeMasterID
            }
            BankMasterView.savedata(data);

        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (BankMasterView.variables.Oper == 'Delete')
                $('#btnDeleteBankMaster').attr('disabled', false);
            else
                $('#btnSaveBankMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(BankMasterView.variables.Oper + ' Operation', 'Record is ' + BankMasterView.variables.addedit + ' successfully', 'success');
                BankMasterView.clearControls();
                $("#table_BankMaster").trigger("reloadGrid", [{ current: true }]);
            } else if ($(data).find('RESPONSECODE').text() == "-3") {
                notificationMessage('', $(data).find('RESPONSEMESSAGE').text(), 'warning');
                BankMasterView.clearControls();
            }
            else {
                InvalidResponseCode(data);
            }

        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#frmBankMaster").validate().resetForm();
            $("#Modal_BankMasterEdit").modal('hide');
            $("#Modal_BankMasterDelete").modal('hide');
            $("#panelBankMasterList").show();
            $("#txtBankMasterId").val("");
            $("#txtBankName").val("");
            $("#txtShortName").val("");
            $("#ddlBalanceSheetGroupId").val("");
            $("#txtAccountNo").val("");
            $("#txtSwiftCode").val("");
            $("#txtBranchName").val("");
            $("#txtBankLink").val("");
            $("#txtBankAddress").val("");
            $("#ddlBankNameId").val("");
            $("#ddlRPTfile").val("");
            $("#txtPhone").val("");
            $("#txtGSTNo").val("");
            $("#hdnBankMasterId").val('');
            $("#chkByDefault").iCheck('uncheck');
            $("#chkIsActive").iCheck('check');
            BankMasterView.variables.Oper = 'Add';
            BankMasterView.variables.addedit = "added";
            jQuery("#table_list_BankMaster").jqGrid('resetSelection');

            $("#chequemasterbody").html("");
            BankMasterView.variables.ChequeMasterID = "";
            $("#ModalChequeDelete").modal('hide');
            BankMasterView.variables.CheckBoxId = "";
            BankMasterView.variables.ChequeDetailsId = "";

        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + BankMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: BankMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveBankMaster").show();
                $("#dBankMasterTitle").show();
                $("#dViewBankMasterTitle").hide();
            }
            else {
                if ($("#btnSaveBankMaster").length > 0) {
                    $("#btnSaveBankMaster").hide();
                }
                $("#dViewBankMasterTitle").show();
                $("#dBankMasterTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, BankMasterView.variables.File);
        }
    },

    bindBSGroup: function () {
        $("#ddlBalanceSheetGroupId").html("");
        BindDropdown('ddlBalanceSheetGroupId', 'BSGroupNameList', getDomain() + BankMasterView.variables.BindBSGroupUrl, '-- Balance Sheet Group --', true);
    },
    bindBankGroup: function () {
        $("#ddlBankNameId").html("");
        //BindDropdown('ddlBankNameId', 'BankNameList', getDomain() + BankMasterView.variables.BindMasterUrl, '-- Bank Name --', true);
        BindCommonDetailsByType('Bank Name', 'ddlBankNameId', 'CommonMasterDetailDropdownList', '-- select Bank Name --');
    },
    bindRptFiles: function () {
        $("#ddlRPTfile").html("");
        BindCommonDetailsByType('ChequeBook RPT', 'ddlRPTfile', 'CommonMasterDetailDropdownList', '-- Select RPT --');
    },

    ViewCHequeList: function (id) {
        $("#panelBankMasterList").hide();
        $("#panelChequeBookIssueList").show();
        BankMasterView.variables.ChequeMasterID = id;
        BankMasterView.ViewAllcheckbook(id);
        //var rowData = jQuery("#table_BankMaster").getRowData(id);
        //$("#showbankname").html(rowData['BANKNAME']);
    },

    ViewAllcheckbook: function (id) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "CHEQUEMASTERID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CHEQUEBOOKDETAIL_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#chequemasterissuelistbody").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var list;
                        if (JsonObject.serviceresponse.detailslist.details.length > 1)
                            list = JsonObject.serviceresponse.detailslist.details;
                        else
                            list = JsonObject.serviceresponse.detailslist;
                        $.each(list, function (key, innerjsonDetails) {
                            var cnt = $('#chequemasterissuelistbody').find('tr').length + 1;
                            var ischecked;
                            if (innerjsonDetails.isactive == 1) {
                                ischecked = "Yes";
                            }
                            else {
                                ischecked = "No";
                            }
                            var start = (innerjsonDetails.startchequeno).replace(/-/g, "")
                            var end = (innerjsonDetails.endchequeno).replace(/-/g, "")
                            $("#chequemasterissuelistbody").append(" <tr onclick='ShowCheckIssueList(" + innerjsonDetails.chequebookdetailid + ")' id='list" + innerjsonDetails.chequebookdetailid + "'>" +
                                '<td style="text-align: center;"></td>' +
                                '<td style="text-align: center;">' +
                                ' <span>' + start + '</span>' +
                                ' </td>' +
                                '<td style="text-align: center;">' +
                                ' <span>' + end + '</span>' +
                                ' </td>' +
                                '<td style="text-align: center;">' +
                                ' <span>' + innerjsonDetails.noofcheque + '</span>' +
                                ' </td>' +
                                '<td style="text-align: center;">' +
                                ' <span>' + innerjsonDetails.issueqty + '</span>' +
                                ' </td>' +
                                '<td style="text-align: center;">' +
                                ' <span>' + innerjsonDetails.cancelqty + '</span>' +
                                ' </td>' +
                                '<td style="text-align: center;">' +
                                ' <span>' + innerjsonDetails.issuedate + '</span>' +
                                ' </td>' +
                                '<td style="text-align: center;">' +
                                ' <span>' + ischecked + '</span>' +
                                '</td>' +
                                "</tr>");
                            $("#showbankname").html(innerjsonDetails.bankname);
                            BankMasterView.variables.Count++;

                        });
                        $("#chequemasterissuelistbody tr").removeClass('orangebackcolor');
                        $("#chequemasterissuelistbody tr:first").addClass('orangebackcolor');
                        var myfilter, listid,
                            listid = ($("#chequemasterissuelistbody tr.orangebackcolor").prop("id")).replace('list', '')
                        myfilter = { rules: [] };
                        myfilter.rules.push({ field: "CHEQUEBOOKDETAILID", op: "eq", data: listid });
                        var url = "/Common/BindMastersDetails?ServiceName=CHEQUEISSUELIST_GET" + "&myfilters=" + JSON.stringify(myfilter);
                        BankMasterView.initializeJqgridIssueList(url);
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },

    initializeJqgridIssueList: function (url) {
        var colNames = ['ChequeIssueListId', 'ChequeBookDetailId', 'Issue Date', 'Cheque No', 'Cheque Name', 'AccountId', 'Account Code', 'Account Name', 'Clear Cheque', 'Amount', 'Remark', 'Cancel'];
        var colModel = [
            { name: "CHEQUEISSUELISTID", index: "CHEQUEISSUELISTID", xmlmap: xmlvars.common_colmap + "CHEQUEISSUELISTID", stype: 'text', sortable: false, hidden: true, search: false },
            { name: "CHEQUEBOOKDETAILID", index: "CHEQUEBOOKDETAILID", xmlmap: xmlvars.common_colmap + "CHEQUEBOOKDETAILID", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "CREATEDDATE", width: 20, index: "CREATEDDATE", xmlmap: xmlvars.common_colmap + "CREATEDDATE", stype: 'text', sortable: false, search: false },
            { name: "CHEQUENO", width: 25, index: "CHEQUENO", xmlmap: xmlvars.common_colmap + "CHEQUENO", stype: 'text', sortable: false, search: false },
            { name: "CHEQUENAME", width: 30, index: "CHEQUENAME", xmlmap: xmlvars.common_colmap + "CHEQUENAME", stype: 'text', sortable: false, search: false },
            { name: "ACCOUNTID", index: "ACCOUNTID", xmlmap: xmlvars.common_colmap + "ACCOUNTID", stype: 'int', sortable: false, search: false, hidden: true },
            { name: "ACCOUNTCODE", width: 20, index: "ACCOUNTCODE", xmlmap: xmlvars.common_colmap + "ACCOUNTCODE", sortable: false, search: false },
            { name: "ACCOUNTNAME", width: 30, index: "ACCOUNTNAME", xmlmap: xmlvars.common_colmap + "ACCOUNTNAME", sortable: false, search: false },
            { name: "CLEARCHEQUEDATE", width: 20, index: "CLEARCHEQUEDATE", xmlmap: xmlvars.common_colmap + "CLEARCHEQUEDATE", stype: 'text', sortable: false, search: false },
            { name: "CHEQUEAMOUNT", width: 15, index: "CHEQUEAMOUNT", xmlmap: xmlvars.common_colmap + "CHEQUEAMOUNT", stype: 'text', sortable: false, search: false },
            { name: "REMARK", width: 30, index: "REMARK", xmlmap: xmlvars.common_colmap + "REMARK", stype: 'text', sortable: false, search: false },
            {
                name: 'ISCANCEL', index: 'ISCANCEL', width: 10, sortable: false, search: false,
                //formatter: function (cv, op, ro) {
                //    if (cv == 0) {
                //        return jqGridVariables.CheckBoxBtnFmatter(cv, op, ro, 'BankMasterView');
                //    }
                //    else {
                //        return '<span></span>';
                //    }
                //}
                formatter: function (cv, op, ro) {
                    if (cv == 0) {
                        //return '<input type="checkbox" style="cursor:nodrop" name="txtIsActive" id="' + op.rowId + '" checked class="icheckminimal" disabled/>';
                        return '<input type="checkbox" name="txtIsActive" id="' + op.rowId + '"  class="icheckminimal" />';
                    }
                    else {
                        //    $('#chkROF').on('ifChecked', function (event) {
                        //        RoundOff();
                        //    });
                        return '<span></span>';
                    }
                }
            }
        ];

        //$("#table_ChequeBookMasterList").GridUnload();
        $.jgrid.gridUnload("#table_ChequeBookMasterList");
        $("#table_ChequeBookMasterList").jqGrid({
            //data: mydata,
            url: getDomain() + url,
            datatype: "xml",
            height: '100%',
            autowidth: true,
            shrinkToFit: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            colNames: colNames,
            colModel: colModel,
            pager: "#pager_ChequeBookMasterList",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CHEQUEISSUELISTID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');
                $(".icheckminimal").iCheck({
                    checkboxClass: 'icheckbox_minimal-blue',
                    radioClass: 'iradio_minimal-blue',
                    labelHover: true,
                    cursor: true,
                    increaseArea: '20%',// optional
                    tap: true
                }).on('ifChanged', function (e) {
                    // Get the field name
                    var isChecked = e.currentTarget.id;

                    var rowData = jQuery("#table_ChequeBookMasterList").getRowData(isChecked);
                    var chequedetaildid = rowData['CHEQUEBOOKDETAILID'];
                    $("#delChequeNo").html(rowData['CHEQUENO']);
                    $("#delChequeName").html(rowData['CHEQUENAME']);
                    $("#delAmount").html(rowData['CHEQUEAMOUNT']);
                    $("#ModalChequeDelete").modal('show');
                    BankMasterView.variables.CheckBoxId = isChecked;
                    BankMasterView.variables.ChequeDetailsId = chequedetaildid;
                    //Cancelcheque(isChecked, chequedetaildid);
                });

                $(".icheckbox_minimal-blue").css("position", "relative !important");
                // Hide column headers and top pager if no records were returned
                if ($('#table_ChequeBookMasterList').getGridParam('records') === 0) {
                    $('#gview_table_ChequeBookMasterList .ui-jqgrid-htable').hide();
                }
                else
                    $('#gview_table_ChequeBookMasterList .ui-jqgrid-htable').show();

                var width = $('#jqGrid_ChequeBookMasterList').width();
                if (width <= 630) {
                    width = 700;
                }
                $('#table_ChequeBookMasterList').setGridWidth(1200);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: "CHEQUEISSUELISTID",
            sortorder: 'desc',
        });

        // Setup buttons
        $("#table_ChequeBookMasterList").jqGrid('navGrid', '#pager_ChequeBookMasterList',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_ChequeBookMasterList_left").css("width", "");
        AlignJqGridHeader('table_ChequeBookMasterList', ['edit', 'delete', 'ISACTIVE']);
        // JqGrid navigations shortcuts
    },

};

function ItemAddNewRowModal() {
    var d = new Date();
    var month = d.toLocaleString('en-us', { month: 'short' });
    var strDate = d.getDate() + "/" + month + "/" + d.getFullYear();
    $("#chequemasterbody tr:last td:last .icon-plus-circle2").remove();
    $("#chequemasterbody").append('<tr>' +
        '<td style="text-align: center;"></td>' +
        '<td>' +
        ' <input type="text" onfocusout="Calculatechequestart(' + BankMasterView.variables.Count + ')"  class="form-control numbers txtstartchequeno" name="txtstartchequeno' + BankMasterView.variables.Count + '" id="txtstartchequeno' + BankMasterView.variables.Count + '">' +
        ' </td>' +
        '<td>' +
        ' <input type="text" onfocusout="Calculatechequeend(' + BankMasterView.variables.Count + ')" class="form-control numbers txtendchequeno" name="txtendchequeno' + BankMasterView.variables.Count + '" id="txtendchequeno' + BankMasterView.variables.Count + '">' +
        ' </td>' +
        '<td>' +
        ' <span class="form-control numbers txttotalcheque" name="txtchequenum" id="txttotalcheque' + BankMasterView.variables.Count + '"></span>' +
        ' </td>' +
        '<td>' +
        ' <span class="form-control numbers txtissuedate" name="txtissuedate" id="txtissuedate' + BankMasterView.variables.Count + '">' + strDate + '</span>' +
        ' </td>' +
        '<td style="text-align: center;">' +
        '<input id="isactivecheck' + BankMasterView.variables.Count + '" name="chkLess' + BankMasterView.variables.Count + '" type="checkbox" class="OtherCheck chkOtherCheck' + BankMasterView.variables.Count + '">' +
        '</td>' +
        '<td class="btnAddcommomRemove">' +
        ' <div>' +
        '     <i class="icon-cancel-circle2" onclick="ItemRemoveRow(this)"></i>' +
        ' </div>' +
        '</td>' +
        '<td style="text-align: center;display:none" class="chequemasterid"></td>' +
        '</tr>');

    $('.numbers').keypress(function (event) {
        return numbersOnly(this, event, false, false);
    });
    BankMasterView.variables.Count = BankMasterView.variables.Count + 1;
    $("#chequemasterbody tr:first td:nth-last-child(2)").html('<div>' +
        '<i class="icon-cancel-circle2" onclick="ItemRemoveRow(this)"></i>' +
        '</div>');

    //document.activeElement.offsetParent.parentElement.nextElementSibling.children[1].firstElementChild.focus();
    $("#chequemasterbody tr:last td:nth-child(2)  input").focus();
}

function ItemRemoveRow(row) {
    $(row).closest('tr').remove();
    $("#chequemasterbody tr:last td:nth-last-child(2)").html('<div>' +
        '<i class="icon-cancel-circle2" onclick="ItemRemoveRow(this)"></i>' +
        '</div>');
    if ($("#chequemasterbody tr").length == 1) {
        $("#chequemasterbody tr:last td:nth-last-child(2) div").remove();
    }
}

function makeFileXml(saveDiv) {
    var i = 1;
    var xmlsaveFiles = '';
    $(saveDiv).find('tr').each(function (key, obj) {
        xmlsaveFiles += '<DETAILS>';
        xmlsaveFiles += '<CHEQUEBOOKDETAILID>' + $(obj).find('.chequemasterid').html() + '</CHEQUEBOOKDETAILID>';
        xmlsaveFiles += '<STARTCHEQUENO>' + $(obj).find('.txtstartchequeno').val() + '</STARTCHEQUENO>';
        xmlsaveFiles += '<ENDCHEQUENO>' + $(obj).find('.txtendchequeno').val() + '</ENDCHEQUENO>';
        xmlsaveFiles += '<ISACTIVE>' + $(obj).find(".OtherCheck").prop("checked") + '</ISACTIVE>';
        xmlsaveFiles += '</DETAILS>';
        i++;
    });
    return { xmlsaveFiles: xmlsaveFiles };
}

function Calculatechequestart(id) {
    if ($("#txtstartchequeno" + id).val() == "") {
        $("#txtstartchequeno" + id).addClass("table-input-error");
    }
    else {
        $("#txtstartchequeno" + id).removeClass("table-input-error");
        var end = parseInt($('#txtendchequeno' + id).val());
        var start = parseInt($('#txtstartchequeno' + id).val());
        if (start > end) {
            $("#txtstartchequeno" + id).addClass("table-input-error");
        }
        else {
            $("#txtstartchequeno" + id).removeClass("table-input-error");
            $("#txtendchequeno" + id).removeClass("table-input-error");
        }
        if ($('#txtendchequeno' + id).val() != "" && $('#txtstartchequeno' + id).val() != "") {
            $("#txttotalcheque" + id).html((end - start) + 1);
        }
    }
}

function Calculatechequeend(id) {
    if ($("#txtendchequeno" + id).val() == "") {
        $("#txtendchequeno" + id).addClass("table-input-error");
    }
    else {
        $("#txtendchequeno" + id).removeClass("table-input-error");
        var end = parseInt($('#txtendchequeno' + id).val());
        var start = parseInt($('#txtstartchequeno' + id).val());
        if (end < start) {
            $("#txtendchequeno" + id).addClass("table-input-error");
        }
        else {
            $("#txtendchequeno" + id).removeClass("table-input-error");
            $("#txtstartchequeno" + id).removeClass("table-input-error");
        }
        if ($('#txtendchequeno' + id).val() != "" && $('#txtstartchequeno' + id).val() != "") {
            $("#txttotalcheque" + id).html((end - start) + 1);
        }
    }
}

function ShowCheckIssueList(id) {
    $("#chequemasterissuelistbody tr").removeClass('orangebackcolor');
    $("#list" + id).addClass('orangebackcolor');
    var myfilter,
        myfilter = { rules: [] };
    myfilter.rules.push({ field: "CHEQUEBOOKDETAILID", op: "eq", data: id });
    var url = "/Common/BindMastersDetails?ServiceName=CHEQUEISSUELIST_GET" + "&myfilters=" + JSON.stringify(myfilter);
    BankMasterView.initializeJqgridIssueList(url);
}

function Cancelcheque(id, chequedetaildid) {
    var data = {
        "oper": "Iscancel",
        "CHEQUEISSUELISTID": id,
        "CHEQUEBOOKDETAILID": chequedetaildid
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=CHEQUEISSUELIST_CRUD",
        data: data,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            try {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#ModalChequeDelete").modal('hide');
                    var myfilter, listid,
                        listid = ($("#chequemasterissuelistbody tr.orangebackcolor").prop("id")).replace('list', '');

                    BankMasterView.ViewAllcheckbook(BankMasterView.variables.ChequeMasterID);
                    $("#chequemasterissuelistbody tr").removeClass('orangebackcolor');
                    $("#list" + listid).addClass('orangebackcolor');

                    myfilter = { rules: [] };
                    myfilter.rules.push({ field: "CHEQUEBOOKDETAILID", op: "eq", data: listid });
                    var url = "/Common/BindMastersDetails?ServiceName=CHEQUEISSUELIST_GET" + "&myfilters=" + JSON.stringify(myfilter);
                    BankMasterView.initializeJqgridIssueList(url);
                } else {
                    InvalidResponseCode(data);
                }
            } catch (e) {
                ErrorDetails(e, BankMasterView.variables.File);
            }
        },
        error: OnError
    });
}

function ItemRemoveEditRow(id) {
    var data = {
        "oper": "deleteChequebook",
        "CHEQUEBOOKDETAILID": id
    }
    $.ajax({
        url: getDomain() + BankMasterView.variables.PerformMasterOperationUrl,
        data: data,
        async: false,
        cache: false,
        type: 'POST',
        success: function (data) {
            try {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    $("#" + id).remove();
                } else {
                    InvalidResponseCode(data);
                }
            } catch (e) {
                ErrorDetails(e, BankMasterView.variables.File);
            }
        },
        error: OnError
    });
}

$(document).ready(function () {
    try {
        $('#lblbranchnameid').text($('#ddlPartyBranch option:selected').text());
        $('.number').keypress(function (event) {
            return numbersOnly(this, event, false, false);
        });
        var url = BankMasterView.variables.BindMasterUrl;
        BankMasterView.initializeJqgrid(url);
        BankMasterView.clearControls();
        BankMasterView.bindBSGroup();
        BankMasterView.bindBankGroup();
        BankMasterView.bindRptFiles();

        //ItemAddNewRowModal();

        $("#btnAddBankMaster").click(function () {
            BankMasterView.btnMasterShowAddPanel();
            $("#ddlBalanceSheetGroupId").val($('#ddlBalanceSheetGroupId option:contains("BANK ACCOUNT")').val());
        });

        $("#btnSaveBankMaster").click(function () {
            BankMasterView.btnMasterSubmit();
        });

        $("#btnDeleteBankMaster").click(function () {
            BankMasterView.btnMasterDelete();
        });

        $('button[name="CancelBankMaster"]').click(function () {
            BankMasterView.clearControls();
        });
        $('#Modal_BankMasterEdit').on('shown.bs.modal', function () {
            $('#txtBankName').focus();
        });

        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = BankMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                BankMasterView.initializeJqgrid(url);
            }
        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = BankMasterView.variables.BindMasterUrl;
                BankMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = BankMasterView.variables.BindMasterUrl;
                BankMasterView.initializeJqgrid(url);
            }
        });

        $("#backissuelist").click(function () {
            $("#panelBankMasterList").show();
            $("#panelChequeBookIssueList").hide();
        });

        $("#txtissuesearchbox").keyup(function (event) {
            if ($("#txtissuesearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtissuesearchbox").val() });
                var url = "/Common/BindMastersDetails?ServiceName=CHEQUEISSUELIST_GET" + "&myfilters=" + JSON.stringify(myfilter);
                BankMasterView.initializeJqgridIssueList(url);
            }

        });
        $("#txtissuesearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = "/Common/BindMastersDetails?ServiceName=CHEQUEISSUELIST_GET";
                BankMasterView.initializeJqgridIssueList(url);
            }
            if ($("#txtissuesearchbox").val().length == 2) {
                var url = "/Common/BindMastersDetails?ServiceName=CHEQUEISSUELIST_GET";
                BankMasterView.initializeJqgridIssueList(url);
            }
        });

        $("#CancelCheque").click(function () {
            $("#ModalChequeDelete").modal('hide');
            jQuery('#table_ChequeBookMasterList').trigger('reloadGrid');
            //$("#table_ChequeBookMasterList #" + BankMasterView.variables.CheckBoxId + " td:last-child [type=checkbox]").iCheck('uncheck');
        });

        $("#btnDeleteCheque").click(function () {
            Cancelcheque(BankMasterView.variables.CheckBoxId);
        });

    } catch (e) {
        ErrorDetails(e, BankMasterView.variables.File);
    }
});