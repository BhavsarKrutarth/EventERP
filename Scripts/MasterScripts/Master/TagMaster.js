var searchtxt = "";
var TagMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=TAGMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=TAGMASTER_CRUD",
        //BindSalesTaxCodeUrl: "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        File: 'ItemGroupMaster.js',
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
    },

    initializeJqgrid: function (url) {
        var colNames = ['TAGMASTERID', 'Tag', 'Active'];
        var colModel = [
            { name: "TAGMASTERID", index: "TAGMASTERID", xmlmap: xmlvars.common_colmap + "TAGMASTERID", stype: 'int', sortable: true, hidden: true },
            { name: "TAGMASTERNAME", index: "TAGMASTERNAME", xmlmap: xmlvars.common_colmap + "TAGMASTERNAME", stype: 'text', width: 20, sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "TAGACTIVE", index: "TAGACTIVE", width: 5, xmlmap: xmlvars.common_colmap + "TAGACTIVE", stype: 'int', align: "center", sortable: false, searchoptions: jqGridVariables.ActiveSearchOption, formatter: jqGridVariables.chkFmatter }

        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'TagMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'TagMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 15, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'TagMasterView') } });
        }
        //$("#table_ItemGroupMaster").GridUnload();
        $.jgrid.gridUnload("#table_ItemGroupMaster");
        $("#table_ItemGroupMaster").jqGrid({
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
            pager: "#pager_ItemGroupMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "TAGMASTERID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_ItemGroupMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqgrid_ItemGroupdetail').width();
                    if (width <= 700) {
                        width = 1000;
                    }
                    $('#table_ItemGroupMaster').setGridWidth(width);
                }, 200);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'TAGMASTERID',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    TagMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        jQuery("#table_ItemGroupMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    TagMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_ItemGroupMaster").jqGrid('navGrid', '#pager_ItemGroupMaster',
            { edit: false, add: false, del: false, search: false, refresh: true },
            { height: 200 }
        );

        $("#pager_ItemGroupMaster_left").css("width", "");
        AlignJqGridHeader('table_ItemGroupMaster', ['edit', 'delete']);
    },

    triggerInitialClick: function () {
        var url = TagMasterView.variables.BindMasterUrl;
        TagMasterView.initializeJqgrid(url);
        TagMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            var rowData = jQuery("#table_ItemGroupMaster").getRowData(id);
            $("#hdnTagMasterid").val(id);

            $("#txttagName").val(rowData['TAGMASTERNAME']);
            debugger
            if ($(rowData['TAGACTIVE']).html() == 'Yes') {
                $('#txtIsActive').iCheck('check');

            } else if($(rowData['TAGACTIVE']).html() == 'No') {
                $('#txtIsActive').iCheck('uncheck');
            }
            $("#Modal_ItemGroupMasterEdit").modal("show");
            $("#Modal_ItemGroupDelete").modal("hide");
            $("#spanItemGroupMasteroper").text("Edit Item Group");
            TagMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            TagMasterView.variables.addedit = "deleted";
            TagMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_ItemGroupMaster").getRowData(id);
            $("#delblItemGroupName").html(rowData['ITEMGROUPNAME']);
            $("#hdnTagMasterid").val(id);

            $("#Modal_ItemGroupDelete").modal("show");
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            $("#Modal_ItemGroupMasterEdit").modal("show");
            $("#Modal_ItemGroupDelete").modal("hide");
            $("#spanItemGroupIdoper").text("Add New Item Group");
            TagMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteItemGroupMaster').attr('disabled', true);
            var data = {
                "oper": TagMasterView.variables.Oper,
                "TAGMASTERID": $("#hdnTagMasterid").val()
            }
            TagMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmItemGroupMaster").valid();
            if (!isValid)
                return;
            TagMasterView.variables.Oper = 'Add';
            TagMasterView.variables.addedit = "added";
            TagMasterView.variables.Masterid = $("#hdnTagMasterid").val();

            if (TagMasterView.variables.Masterid != "0" && parseInt(TagMasterView.variables.Masterid) > 0) {
                TagMasterView.variables.Oper = 'Edit';
                TagMasterView.variables.addedit = 'updated';
            }
            if (TagMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (TagMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveTagMaster').attr('disabled', true);
           
            var data = {
                "TAGMASTERNAME": $("#txttagName").val(),
                "TAGACTIVE": (($("#txtIsActive").prop("checked") == true) ? 1 : 0),
                "oper": TagMasterView.variables.Oper,
                "TAGMASTERID": TagMasterView.variables.Masterid
            }
            TagMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (TagMasterView.variables.Oper == 'Delete')
                $('#btnDeleteItemGroupMaster').attr('disabled', false);
            else
                $('#btnSaveTagMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(TagMasterView.variables.Oper + ' Operation', 'Record is ' + TagMasterView.variables.addedit + ' successfully', 'success');
                TagMasterView.clearControls();
                $("#table_ItemGroupMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#frmItemGroupMaster").validate().resetForm();
            $("#Modal_ItemGroupMasterEdit").modal("hide");
            $("#Modal_ItemGroupDelete").modal("hide");
            $("#txttagName").val("");
            $('#txtIsActive').iCheck('check');
            $("#hdnTagMasterid").val("");
            TagMasterView.variables.Oper = 'Add';
            TagMasterView.variables.addedit = "added";
            jQuery("#table_list_ItemGroupMaster").jqGrid('resetSelection');
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + TagMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: TagMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveTagMaster").show();
                $("#dItemGroupMasterTitle").show();
                $("#dViewItemGroupMasterTitle").hide();
            }
            else {
                if ($("#btnSaveTagMaster").length > 0) {
                    $("#btnSaveTagMaster").hide();
                }
                $("#dViewItemGroupMasterTitle").show();
                $("#dItemGroupMasterTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, TagMasterView.variables.File);
        }
    },

    //bindSameGroup: function () {
    //    $("#ddlSameItemGroup").html("");
    //    BindDropdown('ddlSameItemGroup', 'SameItemGroupList', getDomain() + TagMasterView.variables.BindMasterUrl, '-- Same Item Group --', true);
    //},
    //SalesTaxcode: function () {
    //    $("#ddlSalesTaxCode").html("");
    //    BindDropdown('ddlSalesTaxCode', 'SalesTaxCodeList', getDomain() + TagMasterView.variables.BindSalesTaxCodeUrl, '--Sales Tax Code--', true);
    //},

    MetalType: function () {
        $("#ddlMetalType").html("");
        BindCommonDetailsByType('Metal Type', 'ddlMetalType', 'CommonMasterDetailDropdownList', '--Metal Type--');
    },

    MesrUnitCode: function () {
        $("#ddlMesrUnitCode").html("");
        BindCommonDetailsByType('Mesr Unit Code', 'ddlMesrUnitCode', 'CommonMasterDetailDropdownList', '--Mesr Unit Code--');
    },
};

$(document).ready(function () {
    try {
        $('.number').keypress(function (event) {
            return numbersOnly(this, event, false, false);
        });
        var url = TagMasterView.variables.BindMasterUrl;
        TagMasterView.initializeJqgrid(url);
        TagMasterView.clearControls();
        //TagMasterView.bindSameGroup();
        TagMasterView.MetalType();
        //TagMasterView.SalesTaxcode();
        TagMasterView.MesrUnitCode();

        $("#btnAddItemGroupMaster").click(function () {
            TagMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveTagMaster").click(function () {
            TagMasterView.btnMasterSubmit();
        });

        $("#btnDeleteItemGroupMaster").click(function () {
            TagMasterView.btnMasterDelete();
        });

        $('button[name="CancelItemGroupMaster"]').click(function () {
            TagMasterView.clearControls();
        });

        // For focusing on first textbox in modal
        $('#Modal_ItemGroupMasterEdit').on('shown.bs.modal', function () {
            $('#txtItemGroupName').focus();
        })
        //$('select[name="SameItemGroup"]').change(function () {
        //    var Id = $("#ddlSameItemGroup").val();
        //    $.ajax({
        //        url: getDomain() + TagMasterView.variables.BindMasterUrl + "&_search=true&searchOper=eq&searchField=ITEMGROUPID&searchString=" + Id,
        //        async: false,
        //        cache: false,
        //        type: 'POST',
        //        success: function (data) {
        //            if (data != null && data != "") {
        //                $("#ddlMetalType").val($(data).find('METALTYPEID').text());
        //                $("#txtTouch").val($(data).find('TOUCH').text());
        //                $("#ddlMesrUnitCode").val($(data).find('MESRUNITCODEID').text());
        //                $("#ddlSalesTaxCode").val($(data).find('SALESTAXCODEID').text());
        //                //$("#txtKundanConvTouch").val($(data).find('KUNDANCONVTOUCH').text());
        //                $("#txtRateDecimal").val($(data).find('RATEDECIMAL').text());
        //                $("#chkShowInRateMast").val($(data).find('SHOWINRATEMAST').text());
        //            }
        //        },
        //        error: OnError
        //    });
        //});
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 1) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = TagMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                TagMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = TagMasterView.variables.BindMasterUrl;
                TagMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 1) {
                var url = TagMasterView.variables.BindMasterUrl;
                TagMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, TagMasterView.variables.File);
    }
});