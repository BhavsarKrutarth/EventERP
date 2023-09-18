var searchtxt = "";
var HSNCodeMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=HSNCODEMASTER_CRUD",
        Oper: 'Add',
        File: 'HSNCodeMaster.js',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmHSNCodeMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['HSNId', 'HSN Code', 'Description', /*'TaxId',*/ 'Tax', 'GST', 'IsActive'];
        var colModel = [
            { name: "HSNID", index: "HSNID", xmlmap: xmlvars.common_colmap + "HSNID", stype: 'int', sortable: true, hidden: true, search: false },
            { name: "HSNCODE", width: 10, index: "HSNCODE", xmlmap: xmlvars.common_colmap + "HSNCODE", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "DESCRIPTION", width: 35, index: "DESCRIPTION", xmlmap: xmlvars.common_colmap + "DESCRIPTION", stype: 'text', sortable: false, search: false },
            /*{ name: "TAXID", index: "TAXID", xmlmap: xmlvars.common_colmap + "TAXID", stype: 'int', sortable: false, search: false, hidden: true },*/
            { name: "TAXNAME", width: 20, index: "TAXNAME", xmlmap: xmlvars.common_colmap + "TAXNAME", stype: 'text', sortable: false, search: false },
            { name: "GST", width: 20, index: "GST", xmlmap: xmlvars.common_colmap + "GST", stype: 'text', sortable: false, search: false },
            //{ name: "STARTDATE", width: 10, index: "STARTDATE", xmlmap: xmlvars.common_colmap + "STARTDATE", stype: 'text', sortable: true, align: 'center', searchoptions: jqGridVariables.stringSearchOption },
            //{ name: "ENDDATE", width: 10, index: "ENDDATE", xmlmap: xmlvars.common_colmap + "ENDDATE", stype: 'text', sortable: true, align: 'center', searchoptions: jqGridVariables.stringSearchOption },
            { name: "ISACTIVE", width: 5, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'text', sortable: true, align: 'center', searchoptions: jqGridVariables.ActiveSearchOption, formatter: jqGridVariables.chkFmatter },
        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'HSNCodeMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'HSNCodeMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'HSNCodeMasterView') } });
        }
        //$("#table_HSNCodeMaster").GridUnload();
        $.jgrid.gridUnload("#table_HSNCodeMaster");
        $("#table_HSNCodeMaster").jqGrid({
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
            pager: "#pager_HSNCodeMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "HSNID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_HSNCodeMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_HSNCodeMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_HSNCodeMaster').setGridWidth(width);
                    $("#gbox_table_HSNCodeMaster").width(width);
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
                    HSNCodeMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_HSNCodeMaster").jqGrid('navGrid', '#pager_HSNCodeMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_HSNCodeMaster_left").css("width", "");
        AlignJqGridHeader('table_HSNCodeMaster', ['edit', 'delete', 'ISACTIVE']);
        // JqGrid navigations shortcuts
        jQuery("#table_HSNCodeMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    HSNCodeMasterView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = HSNCodeMasterView.variables.BindMasterUrl;
        HSNCodeMasterView.initializeJqgrid(url);
        HSNCodeMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            $("#hdnHSNId").val(id);
            var rowData = jQuery("#table_HSNCodeMaster").getRowData(id);
            $("#txtHSNId").val(rowData['HSNID']);
            $("#txtHSNCode").val(rowData['HSNCODE']);
            $("#txtDescription").val(rowData['DESCRIPTION']);
            $("#ddlTaxId").val(rowData['TAXNAME']);
            $("#txtGST").val(rowData['GST']);
            //$("#txtStartDate").val(rowData['STARTDATE']);
            //$("#txtEndDate").val(rowData['ENDDATE']);
            if ($(rowData['ISACTIVE']).html() == "Yes") {
                $("input[name='txtIsActive']").iCheck('check');
            }
            else {
                $("input[name='txtIsActive']").iCheck('uncheck');
            }
            $("#panelHSNCodeMasterEdit").modal("show");
            $("#panelHSNCodeMasterDelete").modal("hide");
            $("#spanHSNCodeMasteroper").text("Edit HSN Code");
            HSNCodeMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, HSNCodeMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            HSNCodeMasterView.variables.addedit = "deleted";
            HSNCodeMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_HSNCodeMaster").getRowData(id);
            $("#delblHSNCode").html(rowData['HSNCODE']);
            $("#delblDescription").html(rowData['DESCRIPTION']);
            $("#delblTaxId").html(rowData['TAXNAME']);
            //$("#delblStartDate").html(rowData['STARTDATE']);
            //$("#delblEndDate").html(rowData['ENDDATE']);
            $("#delblIsActive").html($(rowData['ISACTIVE']).html());
            $("#hdnHSNId").val(id);

            $("#panelHSNCodeMasterEdit").modal("hide");
            $("#panelHSNCodeMasterDelete").modal("show");
        } catch (e) {
            ErrorDetails(e, HSNCodeMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        HSNCodeMasterView.clearControls();

        $("#panelHSNCodeMasterEdit").modal("show");
        $("#panelHSNCodeMasterDelete").modal("hide");
        $("#spanHSNIdoper").text("Add New HSN Code");
        HSNCodeMasterView.showTitlePermissionWise('add');
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteHSNCodeMaster').attr('disabled', true);
            var data = {
                "oper": HSNCodeMasterView.variables.Oper,
                "HSNID": $("#hdnHSNId").val()
            }
            HSNCodeMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, HSNCodeMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmHSNCodeMaster").valid();
            if (!isValid)
                return;

            HSNCodeMasterView.variables.Oper = 'Add';
            HSNCodeMasterView.variables.addedit = "added";
            HSNCodeMasterView.variables.Masterid = $("#hdnHSNId").val();

            if (HSNCodeMasterView.variables.Masterid != "0" && parseInt(HSNCodeMasterView.variables.Masterid) > 0) {
                HSNCodeMasterView.variables.Oper = 'Edit';
                HSNCodeMasterView.variables.addedit = 'updated';
            }
            if (HSNCodeMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (HSNCodeMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            //var startdate = $("#txtStartDate").val();
            //if (startdate.match(/[a-z]/i) == null) {
            //    startdate = $("#txtStartDate").val().split('/')[1] + "-" + $("#txtStartDate").val().split('/')[0] + "-" + $("#txtStartDate").val().split('/')[2];
            //}
            //var enddate = $("#txtEndDate").val();
            //if (startdate.match(/[a-z]/i) == null) {
            //    enddate = $("#txtEndDate").val().split('/')[1] + "-" + $("#txtEndDate").val().split('/')[0] + "-" + $("#txtEndDate").val().split('/')[2];
            //}
            $('#btnSaveHSNCodeMaster').attr('disabled', true);
            var data = {
                "HSNCODE": $("#txtHSNCode").val(),
                "DESCRIPTION": $("#txtDescription").val(),
                "TAXNAME": $("#ddlTaxId").val(),
                "GST": $("#txtGST").val(),
                //"STARTDATE": startdate,
                //"ENDDATE": enddate,
                "ISACTIVE": (($('input[name="txtIsActive"]').prop("checked") == true) ? 1 : 0),
                "oper": HSNCodeMasterView.variables.Oper,
                "HSNID": HSNCodeMasterView.variables.Masterid
            }
            HSNCodeMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, HSNCodeMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (HSNCodeMasterView.variables.Oper == 'Delete')
                $('#btnDeleteHSNCodeMaster').attr('disabled', false);
            else
                $('#btnSaveHSNCodeMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(HSNCodeMasterView.variables.Oper + ' Operation', 'Record is ' + HSNCodeMasterView.variables.addedit + ' successfully', 'success');
                HSNCodeMasterView.clearControls();
                $("#table_HSNCodeMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, HSNCodeMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#panelHSNCodeMasterEdit").modal("hide");
            $("#panelHSNCodeMasterDelete").modal("hide");
            $("#txtHSNCode").val("");
            $("#txtDescription").val("");
            $("#ddlTaxId").val("");
            //$("#txtStartDate").val("");
            //$("#txtEndDate").val("");
            $("#txtIsActive").val("");
            $("#frmHSNCodeMaster").validate().resetForm();
            $("#hdnHSNId").val('');
            $("#txtGST").val('');
            HSNCodeMasterView.variables.Oper = 'Add';
            HSNCodeMasterView.variables.addedit = "added";
            jQuery("#table_list_HSNCodeMaster").jqGrid('resetSelection');
        } catch (e) {
            ErrorDetails(e, HSNCodeMasterView.variables.File);
        }
    },

    savedata: function (data) {
        $.ajax({
            url: getDomain() + HSNCodeMasterView.variables.PerformMasterOperationUrl,
            data: data,
            async: false,
            cache: false,
            type: 'POST',
            success: HSNCodeMasterView.btnMasterSubmitOnSuccess,
            error: OnError
        });
    },

    showTitlePermissionWise: function (oper) {
        if (oper == 'edit' || oper == 'add') {
            $("#btnSaveHSNCodeMaster").show();
            $("#dHSNCodeMasterTitle").show();
            $("#dViewHSNCodeMasterTitle").hide();
        }
        else {
            if ($("#btnSaveHSNCodeMaster").length > 0) {
                $("#btnSaveHSNCodeMaster").hide();
            }
            $("#dViewHSNCodeMasterTitle").show();
            $("#dHSNCodeMasterTitle").hide();
        }
    },

    //bindTax: function () {
    //    try {
    //        $("#ddlTaxId").html("");
    //        BindDropdown('ddlTaxId', 'TaxDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=TAXMASTER_GET&IsRecordAll=true&ISACTIVE=1", '--Select Tax--', true);
    //    } catch (e) {
    //        ErrorDetails(e, HSNCodeMasterView.variables.File);
    //    }
    //}
};

function cleartodate() {
    $('#txtEndDate').val("");
}

$(document).ready(function () {
    try {
        //$('#txtStartDate').datepicker({
        //    format: 'dd/mm/yyyy'
        //}).on('changeDate', function () {
        //    $('#txtEndDate').datepicker('setStartDate', new Date($(this).val()));
        //});
        /*HSNCodeMasterView.bindTax();*/
        var url = HSNCodeMasterView.variables.BindMasterUrl;
        HSNCodeMasterView.initializeJqgrid(url);
        $("#btnAddHSNCodeMaster").click(function () {
            HSNCodeMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveHSNCodeMaster").click(function () {
            HSNCodeMasterView.btnMasterSubmit(HSNCodeMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteHSNCodeMaster").click(function () {
            HSNCodeMasterView.btnMasterDelete();
        });

        $('button[name="CancelHSNCodeMaster"]').click(function () {
            HSNCodeMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelHSNCodeMasterEdit').on('shown.bs.modal', function () {
            $('#txtHSNCode').focus();
        });
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = HSNCodeMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                HSNCodeMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = HSNCodeMasterView.variables.BindMasterUrl;
                HSNCodeMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var url = HSNCodeMasterView.variables.BindMasterUrl;
                HSNCodeMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, HSNCodeMasterView.variables.File);
    }
});