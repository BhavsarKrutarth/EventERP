var searchtxt = "";
var View = "MasterView", afterTableId = "btnSubmit"; // -------- variables for keyboard use in tables
var MasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=COMMONMASTER_GET",
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=COMMONMASTER_CRUD",
        OperFevorite: 'Add',
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        Count: 1,
        frmvalidator: $("#frmCommon").validate({
            rules: {
                CMName: {
                    required: true
                },
                CMDescription: {
                    required: true,
                },
                CMDisplayOrder: {
                    required: true,
                    number: true,
                }
            }
        }),
    },

    initializeCommonMasterJqgrid: function (url) {
        var colNames = ['COMMONMASTERID', 'Common Master Name', 'Description', 'Icon', 'Order'];
        var colModel = [
                { name: "COMMONMASTERID", index: "COMMONMASTERID", xmlmap: xmlvars.common_colmap + "COMMONMASTERID", stype: 'int', sortable: false, hidden: true },
                { name: "COMMONMASTERNAME", index: "COMMONMASTERNAME", width: 30, xmlmap: xmlvars.common_colmap + "COMMONMASTERNAME", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                { name: "DESCRIPTION", index: "DESCRIPTION", width: 30, xmlmap: xmlvars.common_colmap + "DESCRIPTION", stype: 'text', searchoptions: jqGridVariables.stringSearchOption },
                { name: "ICON", index: "ICON", width: 15, xmlmap: xmlvars.common_colmap + "ICON", align: "center", search: false, sortable: false, formatter: function (cv, op, ro) { return "<i class=\"" + cv + "\"></i>"; } },
                { name: "DISPLAYORDER", index: "DISPLAYORDER", width: 15, xmlmap: xmlvars.common_colmap + "DISPLAYORDER", align: "center", search: false }
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'MasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'MasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'MasterView') } });
        }
        //$("#table_CommonMas").GridUnload();
        $.jgrid.gridUnload("#table_CommonMas");
        $("#table_CommonMas").jqGrid({
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
            pager: "#pager_CommonMas",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "COMMONMASTERID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                if ($('#table_CommonMas').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_list_CommonMas').width();
                    if (width <= 800) {
                        width = 1000;
                    }
                    $('#table_CommonMas').setGridWidth(width);
                }, 200);
            },
            loadError: OnJqloadError,
            beforeProcessing: function (data, status, xhr) {
                OnJqbeforeProcessingErrorcheck(data, status, xhr);
                //MasterView.variables.MaxOrder = jqGridVariables.getMaxOrder(data);
            },
            viewrecords: true,
            add: false,
            edit: true,
            hidegrid: true,
            sortname: 'DISPLAYORDER',
            sortorder: 'asc', ondblClickRow: function (rowid) {
                if (isU()) {
                    MasterView.triggerId(rowid, 'Edit');
                }
            }
        });

        jQuery("#table_CommonMas").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    MasterView.triggerId(rowid, 'edit');
                }
            }
        });

        $("#table_CommonMas").jqGrid('navGrid', '#pager_CommonMas',
                { edit: false, add: false, del: false, search: false, refresh: false },
                { height: 320, reloadAfterSubmit: true }
        );
        $("#pager_CommonMas_left").css("width", "");
        AlignJqGridHeader('table_CommonMas', ['edit', 'delete', 'ICON', 'DISPLAYORDER']);
    },

    triggerInitialClick: function () {
        $("#panelCommonMasterEdit").modal('hide');
        $("#panelCommonMasterDelete").modal('hide');
        $("#panelList").show();
        var url = MasterView.variables.BindMasterUrl;
        MasterView.initializeCommonMasterJqgrid(url);
    },

    triggerId: function (id, oper) {
        var rowData = jQuery("#table_CommonMas").getRowData(id);
        $("#txtCMName").val(rowData['COMMONMASTERNAME']);
        $("#txtCMDescription").val(rowData['DESCRIPTION']);
        $("#txtIcon").val($(rowData['ICON']).attr('class'));
        $("#txtCMDisplayOrder").val(rowData['DISPLAYORDER']);
        $("#hdnCMId").val(id);

        var myfilter = { rules: [] };
        myfilter.rules.push({ field: "COMMONMASTERID", op: "eq", data: id });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=COMMONMASTER_OTHERCOLUMN_GET&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#distablecolumnbody").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        var list;
                        if (JsonObject.serviceresponse.detailslist.details.length > 1)
                            list = JsonObject.serviceresponse.detailslist.details;
                        else
                            list = JsonObject.serviceresponse.detailslist;
                        $.each(list, function (key, innerjsonDetails) {
                            var cnt = $('#distablecolumnbody').find('tr').length + 1;
                            $("#distablecolumnbody").append(" <tr id=''>" +
                                             '<td style="text-align: center;"></td>' +
                                              
                                             '<td>' +
                                                   ' <input type="text" class="form-control txtcolumnname" name="txtcolumnname' + MasterView.variables.Count + '" id="txtcolumnname' + MasterView.variables.Count + '"  value="' + innerjsonDetails.columnname + '">'+
                                             ' </td>' +
                                             ' <td>' +
                                             '     <select class="form-control txtdatatype" name="txtdatatype1" id="txtdatatype' + MasterView.variables.Count + '">' +
                                             '         <option value="int">int</option>' +
                                             '         <option value="varchar(100)">varchar(100)</option>' +
                                             '         <option value="varchar(MAX)">varchar(MAX)</option>' +
                                             '         <option value="decimal(18,2)">decimal(18,2)</option>' +
                                             '         <option value="decimal(18,4)">decimal(18,4)</option>' +
                                             '     </select>' +
                                             ' </td>' +
                                             '<td class="btnAddcommomRemove">' +
                                             ' <div>' +
                                             '     <i class="icon-cancel-circle2" onclick="ItemRemoveRow(this)"></i>' +
                                             ' </div>' +
                                             '<td style="text-align: center;display:none" class="othercolumid">' + innerjsonDetails.commonmaster_otherid + '</td>' +
                                             '</td>' +
                                     "</tr>");
                            $("#txtdatatype" + MasterView.variables.Count).val(innerjsonDetails.datavalue)
                            MasterView.variables.Count++;

                        });
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

        $("#panelCommonMasterEdit").modal('show');
        $("#panelCommonMasterDelete").modal('hide');
        $("#panelList").show();
        MasterView.showTitlePermissionWise(oper);
    },

    deleteRow: function (id) {
        MasterView.variables.addedit = "deleted";
        MasterView.variables.Oper = "Delete";
        if (id > 0) {
            var rowData = jQuery("#table_CommonMas").getRowData(id);
            $("#delblCMName").html(rowData['COMMONMASTERNAME']);
            $("#delblCMDescription").html(rowData['DESCRIPTION']);
            $("#delblCMDisplayOrder").html(rowData['DISPLAYORDER']);
            $("#delblIcon").html(rowData['ICON']);
            $("#hdnCMId").val(id);
            $("#panelCommonMasterEdit").modal('hide');
            $("#panelCommonMasterDelete").modal('show');
            $("#panelList").show();
        }
        else alert("Please select row");
    },

    btnMasterShowAddPanel: function () {
        MasterView.clearControls();
        $("#panelCommonMasterEdit").modal('show');
        $("#panelCommonMasterDelete").modal('hide');
        $(".Hr-suite-addbtn").hide();
        MasterView.showTitlePermissionWise('add');
    },

    btnMasterDelete: function () {
        if (isD() == 0) {
            notificationMessage('Response', permissionvars.delete, 'error');
            return;
        }
        $('#btnDelete').attr('disabled', true);
        var data = {
            "oper": MasterView.variables.Oper,
            "COMMONMASTERID": $("#hdnCMId").val()
        }
        MasterView.savedata(MasterView.variables.Oper, data);
    },

    savedata: function (oper, data) {
        $.ajax({
            url: getDomain() + MasterView.variables.PerformMasterOperationurl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: MasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    btnMasterCancel: function () {
        MasterView.clearControls();
        if ($(window).width() < 667)
            $(".Hr-suite-addbtn").show();
        else
            $(".Hr-suite-addbtn").hide();
        jQuery("#table_CommonMas").jqGrid('resetSelection');
    },

    btnMasterSubmit: function () {
        var isValid = $("#frmCommon").valid();
        if (!isValid)
            return;
        MasterView.variables.Oper = 'Add';
        MasterView.variables.addedit = "added";
        MasterView.variables.Masterid = $("#hdnCMId").val();
        if (MasterView.variables.Masterid != "0" && parseInt(MasterView.variables.Masterid) > 0) {
            MasterView.variables.Oper = 'Edit';
            MasterView.variables.addedit = 'updated';
        }

        if (MasterView.variables.Oper == 'Add' && isA() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }
        if (MasterView.variables.Oper == 'Edit' && isU() == 0) {
            notificationMessage('Response', permissionvars.unauthorized, 'error');
            return;
        }

        $('#btnSubmit').attr('disabled', true);

        var xmlsaveFiles = "<COMMOMDETAILS>";
        var typeselect, disonperorrs;
        var resultXml = makeFileXml('#distablecolumnbody');
        xmlsaveFiles += resultXml.xmlsaveFiles;
        xmlsaveFiles += "</COMMOMDETAILS>";

        $.ajax({
            url: getDomain() + MasterView.variables.PerformMasterOperationurl,
            data: {
                "COMMONMASTERNAME": $("#txtCMName").val(),
                "DESCRIPTION": $("#txtCMDescription").val(),
                "DISPLAYORDER": $("#txtCMDisplayOrder").val(),
                "ICON": $("#txtIcon").val(),
                "oper": MasterView.variables.Oper,
                "XMLPARAM": escape(xmlsaveFiles),
                "COMMONMASTERID": MasterView.variables.Masterid
            },
            async: false,
            cache: false,
            type: 'POST',
            success: MasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    btnMasterSubmitOnSuccess: function (data) {
        if (MasterView.variables.Oper == 'Delete')
            $('#btnDelete').attr('disabled', false);
        else
            $('#btnSubmit').attr('disabled', false);

        if ($(data).find('RESPONSECODE').text() == "0") {
            notificationMessage(MasterView.variables.Oper + ' Operation', 'Record is ' + MasterView.variables.addedit + ' successfully', 'success');
            MasterView.clearControls();
            $("#table_CommonMas").trigger("reloadGrid", [{ current: true }]);
        }
        else {
            InvalidResponseCode(data);
        }
    },

    clearControls: function () {
        $("#panelCommonMasterDelete").modal('hide');
        $("#panelList").show();
        $("#panelCommonMasterEdit").modal('hide');
        $("#txtCMName").val("");
        $("#txtCMDescription").val("");
        $("#txtCMDisplayOrder").val(MasterView.variables.MaxOrder);
        $("#txtIcon").val("");
        $("#hdnCMId").val("");
        MasterView.variables.Oper = 'Add';
        MasterView.variables.addedit = "added";
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSubmit").show();            
        }
        else {
            if ($("#btnSubmit").length > 0) {
                $("#btnSubmit").hide();
            }
        }
    },
};

function makeFileXml(saveDiv) {
    var i = 1;
    var xmlsaveFiles = '';
    $(saveDiv).find('tr').each(function (key, obj) {
        xmlsaveFiles += '<DETAILS>';
        xmlsaveFiles += '<COMMONMASTER_OTHERID>' + $(obj).find('.othercolumid').html() + '</COMMONMASTER_OTHERID>';
        xmlsaveFiles += '<COLUMNNAME>' + $(obj).find('.txtcolumnname').val() + '</COLUMNNAME>';
        xmlsaveFiles += '<DATATYPE>' + $(obj).find('.txtdatatype').val() + '</DATATYPE>';
        xmlsaveFiles += '</DETAILS>';
        i++;
    });
    return { xmlsaveFiles: xmlsaveFiles };
}

function ItemAddNewRowModal() {
    $("#distablecolumnbody").append('<tr>' +
                                                '<td style="text-align: center;"></td>' +
                                               
                                               '<td>'+
                                                     ' <input type="text" class="form-control txtcolumnname" name="txtcolumnname' + MasterView.variables.Count + '" id="txtcolumnname' + MasterView.variables.Count + '">' +
                                               ' </td>'+
                                               ' <td>'+
                                               '     <select class="form-control txtdatatype" name="txtdatatype1" id="txtdatatype' + MasterView.variables.Count + '">' +
                                               '         <option value="int">int</option>'+
                                               '         <option value="varchar(100)">varchar(100)</option>'+
                                               '         <option value="varchar(MAX)">varchar(MAX)</option>'+
                                               '         <option value="decimal(18,2)">decimal(18,2)</option>'+
                                               '         <option value="decimal(18,4)">decimal(18,4)</option>'+
                                               '     </select>'+
                                               ' </td>' +
                                               '<td class="btnAddcommomRemove">' +
                                               ' <div>'+
                                               '     <i class="icon-cancel-circle2" onclick="ItemRemoveRow(this)"></i>'+
                                               ' </div>' +
                                               '<td style="text-align: center;display:none" class="othercolumid"></td>' +
                                               '</td>'+
                                                '</tr>');

    MasterView.variables.Count = MasterView.variables.Count + 1;
    $("#distablecolumnbody tr:last td:nth-child(2)  input").focus();
    //document.activeElement.offsetParent.parentElement.nextElementSibling.children[1].firstElementChild.focus();


}

function ItemRemoveRow(row) {
    $(row).closest('tr').remove();
    //$("#FrmCommomItemList table tbody tr:last td:last").html('<div>' +
    //                                                       '<i class="icon-cancel-circle2" onclick="ItemRemoveRow(this)"></i>' +
    //                                                   '</div>');
    //if ($("#FrmCommomItemList table tbody tr").length == 1) {
    //    $("#FrmCommomItemList table tbody tr:last td:last div").remove();
    //}

}

$(document).ready(function () {
    var url = MasterView.variables.BindMasterUrl;
    MasterView.initializeCommonMasterJqgrid(url);
    //ItemAddNewRowModal();
    $("#btnAdd").click(function () {
        $("#distablecolumnbody").html("");
        $("#distablecolumnbody").append('<tr>' +
                                               '<td style="text-align: center;"></td>' +
                                              '<td>' +
                                                    ' <input type="text" class="form-control txtcolumnname" name="txtcolumnname' + MasterView.variables.Count + '" id="txtcolumnname' + MasterView.variables.Count + '">' +
                                              ' </td>' +
                                              ' <td>' +
                                              '     <select class="form-control txtdatatype" name="txtdatatype1" id="txtdatatype' + MasterView.variables.Count + '">' +
                                              '         <option value="int">int</option>' +
                                              '         <option value="varchar(100)">varchar(100)</option>' +
                                              '         <option value="varchar(MAX)">varchar(MAX)</option>' +
                                              '         <option value="decimal(18,2)">decimal(18,2)</option>' +
                                              '         <option value="decimal(18,4)">decimal(18,4)</option>' +
                                              '     </select>' +
                                              ' </td>' +
                                              '<td class="btnAddcommomRemove">' +
                                              ' <div>' +
                                              '     <i class="icon-cancel-circle2" onclick="ItemRemoveRow(this)"></i>' +
                                              ' </div>' +
                                              '<td style="text-align: center;display:none" class="othercolumid"></td>' +
                                              '</td>' +
                                               '</tr>');

        MasterView.variables.Count = MasterView.variables.Count + 1;
        MasterView.btnMasterShowAddPanel();
    });
    $("#txtIcon").keydown(function (event) {
        setTimeout(function () {
            if (event.keyCode == 13) {
                document.getElementById("distablecolumnbody").children[0].children[1].firstElementChild.focus();
            }
        }, 100);
    });
    $("#btnSubmit").click(function () {
        MasterView.btnMasterSubmit();
    });
    $("#btnCancel").click(function () {
        MasterView.btnMasterCancel();
        MasterView.variables.frmvalidator.resetForm();
    });
    $("#btnDelete").click(function () {
        MasterView.btnMasterDelete();
    });
    $("#btnBack").click(function () {
        MasterView.btnMasterCancel();
    });
    $("#btnPrintCommonMas").click(function () {
        window.print();
    });
    $("#txtsearchbox").keyup(function (event) {
        if ($("#txtsearchbox").val().length > 2) {
            var myfilter,
            myfilter = { rules: [] };
            myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
            var url = MasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
            MasterView.initializeCommonMasterJqgrid(url);
        }

    });
    $("#txtsearchbox").keydown(function (event) {
        if (event.ctrlKey && event.keyCode == 65) {
            searchtxt = true;
        }
        else if (event.keyCode == 8 && searchtxt == true) {
            searchtxt = false;
            var url = MasterView.variables.BindMasterUrl;
            MasterView.initializeCommonMasterJqgrid(url);
        }
        if ($("#txtsearchbox").val().length == 2) {
            var url = MasterView.variables.BindMasterUrl;
            MasterView.initializeCommonMasterJqgrid(url);
        }
    });
});