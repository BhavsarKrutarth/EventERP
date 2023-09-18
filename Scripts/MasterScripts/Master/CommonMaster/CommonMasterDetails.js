//var View = "CommonMasterDetailsView", afterTableId = "btnDSubmit";
var CommonMasterDetailsView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=COMMONMASTER_GET&sidx=COMMONMASTERNAME&sord=asc&IsRecordAll=true&ColumnRequested=COMMONMASTERID,COMMONMASTERNAME,ICON",
        BindMasterDetailsurl: "/Common/BindMasterDetailsById?ServiceName=COMMONMASTERDETAIL_GET&COMMONMASTERID=",
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=COMMONMASTERDETAIL_CRUD",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        gridObj: null,
        frmvalidator: $("#frmCommonDetail").validate({
            rules: {
                CMDName: {
                    required: true
                },
                CMDDisplayOrder: {
                    required: true,
                    number: true,
                }
            }
        }),
    },

    initalizeCommonMasterLeftMenu: function () { 
        $.ajax({
            url: getDomain() + CommonMasterDetailsView.variables.BindMasterUrl,
            data: {},
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) { CommonMasterDetailsView.CommonMenuBindOnSuccess(data) },
            error: function (e) {
                alert("Operation Failed");
            }
        });
    },

    fillGridDetails: function (commonMasterId) {
        debugger
        CommonMasterDetailsView.clearControls();
        // highlight selected common master
        $("#MasterContents>li").removeClass('active');
        $("ul>#li" + commonMasterId).addClass('active');
        // Set icon of list
        $('#iconDList').attr('class', $("ul>#li" + commonMasterId).find('i').attr('class'));
        // Change header name and form's label
        var header = $("ul>#li" + commonMasterId).find('a').text();
        $("#tab-2 #spanListHeader").html(header);
        $("#tab-2 #lblCommonMasterName").html(header);
        $("#tab-2 #spanAdd").html(header);
        // fetch common master details for the selected common master
        var OldUrlVariable = CommonMasterDetailsView.variables.BindMasterDetailsurl;
        CommonMasterDetailsView.variables.BindMasterDetailsurl = CommonMasterDetailsView.variables.BindMasterDetailsurl + commonMasterId;
        $("#hdnCommonMasterId").val(commonMasterId);
        CommonMasterDetailsView.initializeCommonMasterDetailsJqgrid();
        CommonMasterDetailsView.variables.BindMasterDetailsurl = OldUrlVariable;        
    },

    initializeCommonMasterDetailsJqgrid: function () {
        var colNames = ['COMMONMASTERDETAILID', 'COMMONMASTERID', $("#tab-2 #spanListHeader").html(), 'Order', 'Is Active'];
        var colModel = [
                { name: "COMMONMASTERDETAILID", index: "COMMONMASTERDETAILID", xmlmap: xmlvars.common_colmap + "COMMONMASTERDETAILID", stype: 'int', hidden: true },
                { name: "COMMONMASTERID", index: "COMMONMASTERID", xmlmap: xmlvars.common_colmap + "COMMONMASTERID", stype: 'int', hidden: true },
                { name: "COMMONMASTERDETAILNAME", index: "COMMONMASTERDETAILNAME", xmlmap: xmlvars.common_colmap + "COMMONMASTERDETAILNAME", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                { name: "DISPLAYORDER", index: "DISPLAYORDER", xmlmap: xmlvars.common_colmap + "DISPLAYORDER", stype: 'text', align: "center", searchoptions: jqGridVariables.stringSearchOption },
                { name: "ISACTIVE", index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'text', formatter: jqGridVariables.chkFmatter, align: "center", searchoptions: jqGridVariables.stringSearchOption }
        ];
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "GETALL", op: "eq", data: 'GetAll' });
        myfilter.rules.push({ field: "COMMONMASTERID", op: "eq", data: $("#hdnCommonMasterId").val() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMMONMASTERDETAIL_OTHERCOLUMN_GET&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.detailslist != undefined) {
                    var list;
                    if (JsonObject.serviceresponse.detailslist.details.length > 1)
                        list = JsonObject.serviceresponse.detailslist.details;
                    else
                        list = JsonObject.serviceresponse.detailslist;
                    $.each(list, function (key, innerjsonDetails) {
                        colNames.push(innerjsonDetails.columnname);
                        colModel.push({ name: innerjsonDetails.columnname.replace(' ', ''), index: innerjsonDetails.columnname.replace(' ', ''), sortable: false, search: false });
                    });
                }
            }
        });
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'CommonMasterDetailsView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'CommonMasterDetailsView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'CommonMasterDetailsView') } });
        }
        CommonMasterDetailsView.variables.gridObj = $.jgrid.gridUnload("#table_CommonMasDetail");

        //if (CommonMasterDetailsView.variables.gridObj == false) {            
        CommonMasterDetailsView.variables.gridObj =  $("#table_CommonMasDetail").jqGrid({
                url: getDomain() + CommonMasterDetailsView.variables.BindMasterDetailsurl,
                datatype: "xml",
                height: getGridHeight(),
                scroll: 1,
                autowidth: true,
                shrinkToFit: true,
                rowNum: 30,
                rowList: [20, 30, 40],
                colNames: colNames,
                colModel: colModel,
                pager: "#pager_CommonMasDetail",
                xmlReader: {
                    root: xmlvars.common_root,
                    row: xmlvars.common_row,
                    page: xmlvars.common_response + "CURRENTPAGE",
                    total: xmlvars.common_response + "TOTALPAGES",
                    records: xmlvars.common_response + "TOTALRECORDS",
                    repeatitems: false,
                    id: "COMMONMASTERDETAILID"
                },
                loadComplete: function () {
                    $("tr.jqgrow:even").addClass('myAltRowClass');
                    // Hide column headers and top pager if no records were returned
                    if ($('#table_CommonMasDetail').getGridParam('records') === 0)
                        $('.ui-jqgrid-htable').hide();
                    else
                        $('.ui-jqgrid-htable').show();

                    setTimeout(function () {
                        var width = $('#jqgrid_cmd').width();
                        if (width <= 750) {
                            width = 750;
                        }
                        $('#table_CommonMasDetail').setGridWidth(width);
                    },200)
                },
                loadError: OnJqloadError,
                beforeProcessing: function (data, status, xhr) {
                    OnJqbeforeProcessingErrorcheck(data, status, xhr);
                    //CommonMasterDetailsView.variables.MaxOrder = jqGridVariables.getMaxOrder(data);
                },
                viewrecords: true,
                add: false,
                edit: true,
                edittext: 'Edit',
                hidegrid: false,
                sortname: 'DISPLAYORDER',
                sortorder: 'asc',
            });

        jQuery("#table_CommonMasDetail").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    CommonMasterDetailsView.triggerId(rowid, 'edit')
                }
            }
        });


            // Setup buttons
            $("#table_CommonMasDetail").jqGrid('navGrid', '#pager_CommonMasDetail',
                    { edit: false, add: false, del: false, search: true, refresh: false },
                    { height: 200, reloadAfterSubmit: true }
            );
            AlignJqGridHeader('table_CommonMasDetail', ['edit', 'delete', 'ISACTIVE', 'DISPLAYORDER']);         
            CommonMasterDetailsView.variables.gridObj = true;
        //}
        //else {
        //    $("#table_CommonMasDetail").jqGrid('setGridParam', { url: getDomain() + CommonMasterDetailsView.variables.BindMasterDetailsurl, page: 1 }).trigger("reloadGrid");
        //}
    },

    triggerId: function (id, oper) {
        $('#spanHeader').html($("#tab-2 #spanListHeader").html());
        var rowData = jQuery("#table_CommonMasDetail").getRowData(id);
        $("#txtCMDName").val(rowData['COMMONMASTERDETAILNAME']);
        $("#hdnCommonMasterId").val(rowData['COMMONMASTERID']);
        if ($(rowData['ISACTIVE']).html() == "Yes") {
            $("input[name='txtIsActive']").iCheck('check');
        }
        else {
            $("input[name='txtIsActive']").iCheck('uncheck');
        }
        $("#txtCMDDisplayOrder").val(rowData['DISPLAYORDER']);
        CommonMasterDetailsView.OtherColumnAdd(id);
        $("#hdnCMDId").val(id);        
        $("#panelCommonMasterDetailEdit").modal('show');
        $("#panelDDelete").modal('hide');
        $("#panelDList").show();
        CommonMasterDetailsView.showTitlePermissionWise(oper);
    },

    deleteRow: function (id) {
        CommonMasterDetailsView.variables.addedit = "deleted";
        CommonMasterDetailsView.variables.Oper = "Delete";
        if (id > 0) {
            var rowData = jQuery("#table_CommonMasDetail").getRowData(id);
            $("#delblCMDName").html(rowData['COMMONMASTERDETAILNAME']);
            $("#delblCMDDisplayOrder").html(rowData['DISPLAYORDER']);
            $("#delblActive").html($(rowData['ISACTIVE']).html());
            $("#hdnCMDId").val(id);

            $("#spandelLabel").html($("#tab-2 #spanListHeader").html());
            $('#spandelHeader').html($("#tab-2 #spanListHeader").html());
            $("#panelCommonMasterDetailEdit").modal('hide');
            $("#panelDDelete").modal('show');
            $("#panelDList").show();
        }
        else alert("Please select row");
    },

    btnMasterDelete: function () {
        if (isD() == 0) {
            notificationMessage('Response', permissionvars.delete, 'error');
            return;
        }
        $('#btnDDelete').attr('disabled', true);

        var data = {
            "oper": CommonMasterDetailsView.variables.Oper,
            "COMMONMASTERDETAILID": $("#hdnCMDId").val()
        }
        CommonMasterDetailsView.savedata(CommonMasterDetailsView.variables.Oper, data);
    },

    btnMasterCancel: function () {
        CommonMasterDetailsView.clearControls();       
        if (CommonMasterDetailsView.variables.gridObj != null)
            jQuery("#table_CommonMasDetail").jqGrid('resetSelection');
    },

    btnMasterSubmit: function () {
        var isValid = $("#frmCommonDetail").valid();
        if (!isValid)
            return;
        CommonMasterDetailsView.variables.Oper = 'Add';
        CommonMasterDetailsView.variables.addedit = "added";
        CommonMasterDetailsView.variables.Masterid = $("#hdnCMDId").val();
        if (CommonMasterDetailsView.variables.Masterid != "0" && parseInt(CommonMasterDetailsView.variables.Masterid) > 0) {
            CommonMasterDetailsView.variables.Oper = 'Edit';
            CommonMasterDetailsView.variables.addedit = 'updated';
        }

        if (CommonMasterDetailsView.variables.Oper == 'Add' && isA() == 0) {
            notificationMessage('Response', permissionvars.add, 'error');
            return;
        }
        if (CommonMasterDetailsView.variables.Oper == 'Edit' && isU() == 0) {
            notificationMessage('Response', permissionvars.edit, 'error');
            return;
        }
        $('#btnDSubmit').attr('disabled', true);
        var xmlsaveFiles = "<COMMOMOTHERDETAILS>";
        var typeselect, disonperorrs;
        var resultXml = makeFileXml1('#commondetaildiv');
        xmlsaveFiles += resultXml.xmlsaveFiles;
        xmlsaveFiles += "</COMMOMOTHERDETAILS>";

        var data = {
            "COMMONMASTERDETAILNAME": $("#txtCMDName").val(),
            "DISPLAYORDER": $("#txtCMDDisplayOrder").val(),
            "COMMONMASTERID": $("#hdnCommonMasterId").val(),
            "ISACTIVE":(($('input[name="txtIsActive"]').prop("checked") == true) ? 1 : 0),
            "oper": CommonMasterDetailsView.variables.Oper,
            "COMMONMASTERDETAILID": CommonMasterDetailsView.variables.Masterid,
            "XMLPARAM": escape(xmlsaveFiles),
        }
        CommonMasterDetailsView.savedata(CommonMasterDetailsView.variables.Oper, data);
    },

    triggerInitialClick: function () {     
        CommonMasterDetailsView.initalizeCommonMasterLeftMenu();
        CommonMasterDetailsView.variables.gridObj = $('#table_CommonMasDetail').jqGrid('GridUnload');
        $("#hdnCommonMasterId").val("");
        CommonMasterDetailsView.variables.gridObj = null;
        CommonMasterDetailsView.clearControls();
        $("#panelDList").hide();
    },

    CommonMenuBindOnSuccess: function (data) {
        if ($(data).find('RESPONSECODE').text() == "0") {
            var JsonObject = xml2json.parser(data);
            $.each(JsonObject, function (key, innerjson) {
                $.each(innerjson.detailslist, function (key, innerjsonDetails) {
                    $("#MasterContents").html($("#MasterDetailsMenu").render(innerjsonDetails));
                });
            });
        }
        else {
            InvalidResponseCode(data);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        if (CommonMasterDetailsView.variables.Oper == 'Delete')
            $('#btnDDelete').attr('disabled', false);
        else
            $('#btnDSubmit').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(CommonMasterDetailsView.variables.Oper + ' Operation', 'Record is ' + CommonMasterDetailsView.variables.addedit + ' successfully', 'success');
            var commonMasterId = $("#hdnCommonMasterId").val();            
            CommonMasterDetailsView.fillGridDetails(commonMasterId);
            CommonMasterDetailsView.clearControls();
        }
        else {
            InvalidResponseCode(data);
        }
    },

    clearControls: function () {
        $("#panelCommonMasterDetailEdit").modal('hide');
        $("#panelDDelete").modal('hide');
        $("#panelDList").show();
        $("#txtCMDName").val("");
        $("input[name='txtIsActive']").iCheck('check');
        $("#txtCMDDisplayOrder").val(CommonMasterDetailsView.variables.MaxOrder);
        $("#hdnCMDId").val("");
        CommonMasterDetailsView.variables.Oper = 'Add';
        CommonMasterDetailsView.variables.addedit = "added";
        CommonMasterDetailsView.variables.Masterid = "";
    },

    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + CommonMasterDetailsView.variables.PerformMasterOperationurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: CommonMasterDetailsView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    btnMasterShowAddPanel: function () {
        CommonMasterDetailsView.clearControls();
        $("#panelCommonMasterDetailEdit").modal('show');
        $("#panelDDelete").modal('hide');
        $("#panelDList").show();
        $(".Hr-suite-addbtn").hide();
        $('#spanHeader').html($("#tab-2 #spanListHeader").html());
        CommonMasterDetailsView.showTitlePermissionWise('add');
    },

    searchCommonMaster: function (val) {
        var searchval = '';
        if (val == 'search') {
            searchval = $('#txtSearchCommonMaster').val().toLowerCase();
        }
        else
            $('#txtSearchCommonMaster').val('');
        $("#tab-2 #MasterContents li").each(function () {
            var litext = $(this).text().toLowerCase();
            if (litext.indexOf(searchval) > -1)
                $(this).show();
            else
                $(this).hide();
        });
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnDSubmit").show();           
        }
        else {
            if ($("#btnDSubmit").length > 0) {
                $("#btnDSubmit").hide();
            }
        }
    },

    OtherColumnAdd: function (id) {
        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "COMMONMASTERDETAILID", op: "eq", data: id });
        myfilter.rules.push({ field: "COMMONMASTERID", op: "eq", data: $("#hdnCommonMasterId").val() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMMONMASTERDETAIL_OTHERCOLUMN_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#commondetaildiv").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var list;
                        if (JsonObject.serviceresponse.detailslist.details.length > 1)
                            list = JsonObject.serviceresponse.detailslist.details;
                        else
                            list = JsonObject.serviceresponse.detailslist;
                        $.each(list, function (key, innerjsonDetails) {
                            //var cnt = $('#distablecolumnbody').find('tr').length + 1;
                            var numdecimal, datavalue;
                            if (innerjsonDetails.datatype == "int") {
                                numdecimal = "numbers";
                            }
                            else if (innerjsonDetails.datatype == "decimal(18,2)" || innerjsonDetails.datatype == "decimal(18,4)") {
                                numdecimal = "decimal"
                            }
                            else {
                                numdecimal = "";
                            }
                            if (innerjsonDetails.datavalue == "[object Object]") {
                                datavalue = "";
                            }
                            else {
                                datavalue = innerjsonDetails.datavalue;
                            }
                            $("#commondetaildiv").append(
                                             '<div class="form-group readdiv">' +
                                             '<input class="txtothercommonid" type="hidden" value = "' + innerjsonDetails.commonmaster_otherid + '">' +
                                             '   <label class="col-sm-3 control-label addstar">' + innerjsonDetails.columnname + '</label>' +
                                             '   <div class="col-sm-3">' +
                                             '       <input type="text" name="newdecimal" placeholder="" class="newinput form-control txtdatavalue ' + numdecimal + '" tabindex="' + innerjsonDetails.tabindex + '" value="' + datavalue + '">' +
                                             '   </div>' +
                                             '</div>');
                        });
                        $('.numbers').keypress(function (event) {
                            return numbersOnly(this, event, false, false);
                        });
                        $('.decimal').keypress(function (event) {
                            return numbersOnly(this, event, true, false);
                        });
                        $(".newinput:last").keydown(function (event) {
                            if (event.keyCode == 13) {
                                $("#btnDSubmit").click();
                            }
                        })
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    }

};

function makeFileXml1(saveDiv) {
    var i = 1;
    var xmlsaveFiles = '';
    $(saveDiv).find('.readdiv').each(function (key, obj) {
        xmlsaveFiles += '<DETAILS>';
        xmlsaveFiles += '<COMMONMASTER_OTHERID>' + $(obj).find('.txtothercommonid').val() + '</COMMONMASTER_OTHERID>';
        xmlsaveFiles += '<DATAVALUE>' + $(obj).find('.txtdatavalue').val() + '</DATAVALUE>';
        xmlsaveFiles += '</DETAILS>';
        i++;
    });
    return { xmlsaveFiles: xmlsaveFiles };
}
$(document).ready(function () {
    $("#chkActive").bootstrapSwitch();
    
    $('#panelCommonMasterDetailEdit').on('shown.bs.modal', function () {
        $("#txtCMDName").focus();
    });
    $("#btnDSubmit").click(function () { 
        CommonMasterDetailsView.btnMasterSubmit();
    });
    $('.numbers').keypress(function (event) {
        return numbersOnly(this, event, true, false);
    });
    $('.decimal').keypress(function (event) {
        return numbersOnly(this, event, true, false);
    });
    $("#btnDCancel").click(function () {
        CommonMasterDetailsView.btnMasterCancel();
        CommonMasterDetailsView.variables.frmvalidator.resetForm();
    });
    $("#btnDAdd").click(function () {
        var value = "";
        CommonMasterDetailsView.OtherColumnAdd(value);
        CommonMasterDetailsView.btnMasterShowAddPanel();
    });
    $("#btnDDelete").click(function () {
        CommonMasterDetailsView.btnMasterDelete();
    });
    $("#btnDBack").click(function () {
        CommonMasterDetailsView.btnMasterCancel();
    });
  
});

