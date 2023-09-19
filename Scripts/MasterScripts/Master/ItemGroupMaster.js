var searchtxt = "";
var ItemGroupMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=ITEMGROUPMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ITEMGROUPMASTER_CRUD",
        //BindSalesTaxCodeUrl: "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET&IsRecordAll=true&ISACTIVE=1",
        File: 'ItemGroupMaster.js',
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
    },

    initializeJqgrid: function (url) {
        var colNames = ['ITEMGROUPMASTERID', 'Item Group Name', 'Short Name'];
        var colModel = [
            { name: "ITEMGROUPMASTERID", index: "ITEMGROUPMASTERID", xmlmap: xmlvars.common_colmap + "ITEMGROUPMASTERID", stype: 'int', sortable: true, hidden: true },
            { name: "ITEMGROUPNAME", index: "ITEMGROUPNAME", xmlmap: xmlvars.common_colmap + "ITEMGROUPNAME", stype: 'text', width: 20, sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "SHORTNAME", index: "SHORTNAME", xmlmap: xmlvars.common_colmap + "SHORTNAME", stype: 'text', sortable: true, width: 10, searchoptions: jqGridVariables.stringSearchOption },

        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ItemGroupMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'ItemGroupMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 15, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'ItemGroupMasterView') } });
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
                id: "ITEMGROUPMASTERID"
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
            sortname: 'ITEMGROUPMASTERID',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    ItemGroupMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        jQuery("#table_ItemGroupMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    ItemGroupMasterView.triggerId(rowid, 'edit')
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
        var url = ItemGroupMasterView.variables.BindMasterUrl;
        ItemGroupMasterView.initializeJqgrid(url);
        ItemGroupMasterView.clearControls();
    },

    triggerId: function (id) {
        try {
            var rowData = jQuery("#table_ItemGroupMaster").getRowData(id);
            $("#hdnItemGroupId").val(id);
            $("#txtItemGroupId").val(rowData['ITEMGROUPMASTERID']);
            $("#txtItemGroupName").val(rowData['ITEMGROUPNAME']);
            $("#txtShortName").val(rowData['SHORTNAME']);
            //$("#ddlSameItemGroup").val(rowData['ITEMGROUPID']);
            $("#ddlMetalType").val(rowData['METALTYPEID']);
            $("#txtTouch").val(rowData['TOUCH']);
            $("#ddlMesrUnitCode").val(rowData['MESRUNITCODEID']);
            //$("#ddlSalesTaxCode").val(rowData['SALESTAXCODEID']);
            $("#ddlPurchaseRateType").val(rowData['PURCHASERATETYPE']);
            $("#ddlSalesRateType").val(rowData['SALESRATETYPE']);
            //$("#txtRateDecimal").val(rowData['RATEDECIMAL']);
            if ($(rowData['SHOWINRATEMAST']).html() == 'Yes') {
                $("#chkShowInRateMast").iCheck('check');

            } else if (rowData['ISFORM'] == 0) {
                $("#chkShowInRateMast").iCheck('uncheck');
            }
            $("#Modal_ItemGroupMasterEdit").modal("show");
            $("#Modal_ItemGroupDelete").modal("hide");
            $("#spanItemGroupMasteroper").text("Edit Item Group");
            ItemGroupMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            ItemGroupMasterView.variables.addedit = "deleted";
            ItemGroupMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_ItemGroupMaster").getRowData(id);
            $("#delblItemGroupName").html(rowData['ITEMGROUPNAME']);
            $("#hdnItemGroupId").val(id);

            $("#Modal_ItemGroupDelete").modal("show");
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            $("#Modal_ItemGroupMasterEdit").modal("show");
            $("#Modal_ItemGroupDelete").modal("hide");
            $("#spanItemGroupIdoper").text("Add New Item Group");
            ItemGroupMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
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
                "oper": ItemGroupMasterView.variables.Oper,
                "ITEMGROUPMASTERID": $("#hdnItemGroupId").val()
            }
            ItemGroupMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var isValid = $("#frmItemGroupMaster").valid();
            if (!isValid)
                return;
            ItemGroupMasterView.variables.Oper = 'Add';
            ItemGroupMasterView.variables.addedit = "added";
            ItemGroupMasterView.variables.Masterid = $("#hdnItemGroupId").val();

            if (ItemGroupMasterView.variables.Masterid != "0" && parseInt(ItemGroupMasterView.variables.Masterid) > 0) {
                ItemGroupMasterView.variables.Oper = 'Edit';
                ItemGroupMasterView.variables.addedit = 'updated';
            }
            if (ItemGroupMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (ItemGroupMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveItemGroupMaster').attr('disabled', true);
            var chkShowInRateMast
            if ($('#chkShowInRateMast').is(":checked")) {
                chkShowInRateMast = '1'
            }
            else {
                chkShowInRateMast = '0'
            }
            var data = {
                "ITEMGROUPNAME": $("#txtItemGroupName").val(),
                "SHORTNAME": $("#txtShortName").val(),
               
                "oper": ItemGroupMasterView.variables.Oper,
                "ITEMGROUPMASTERID": ItemGroupMasterView.variables.Masterid
            }
            ItemGroupMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (ItemGroupMasterView.variables.Oper == 'Delete')
                $('#btnDeleteItemGroupMaster').attr('disabled', false);
            else
                $('#btnSaveItemGroupMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(ItemGroupMasterView.variables.Oper + ' Operation', 'Record is ' + ItemGroupMasterView.variables.addedit + ' successfully', 'success');
                ItemGroupMasterView.clearControls();
                $("#table_ItemGroupMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#frmItemGroupMaster").validate().resetForm();
            $("#Modal_ItemGroupMasterEdit").modal("hide");
            $("#Modal_ItemGroupDelete").modal("hide");
            $("#txtItemGroupId").val("");
            $("#hdnItemGroupId").val('');
            $("#chkShowInRateMast").iCheck('uncheck');
            //$("#ddlSalesTaxCode").val('');
            $("#txtItemGroupName").val("");
            $("#txtShortName").val("");
            //$("#ddlSameItemGroup").val("");
            $("#ddlMetalType").val("");
            $("#txtTouch").val("");
            $("#ddlMesrUnitCode").val("");
            //$("#ddlPurchaseRateType").val("");
            //$("#ddlSalesRateType").val("");
            //$("#txtRateDecimal").val("");
            $("#chkShowInRateMast").val("");
            ItemGroupMasterView.variables.Oper = 'Add';
            ItemGroupMasterView.variables.addedit = "added";
            jQuery("#table_list_ItemGroupMaster").jqGrid('resetSelection');
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + ItemGroupMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: ItemGroupMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveItemGroupMaster").show();
                $("#dItemGroupMasterTitle").show();
                $("#dViewItemGroupMasterTitle").hide();
            }
            else {
                if ($("#btnSaveItemGroupMaster").length > 0) {
                    $("#btnSaveItemGroupMaster").hide();
                }
                $("#dViewItemGroupMasterTitle").show();
                $("#dItemGroupMasterTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, ItemGroupMasterView.variables.File);
        }
    },

    //bindSameGroup: function () {
    //    $("#ddlSameItemGroup").html("");
    //    BindDropdown('ddlSameItemGroup', 'SameItemGroupList', getDomain() + ItemGroupMasterView.variables.BindMasterUrl, '-- Same Item Group --', true);
    //},
    //SalesTaxcode: function () {
    //    $("#ddlSalesTaxCode").html("");
    //    BindDropdown('ddlSalesTaxCode', 'SalesTaxCodeList', getDomain() + ItemGroupMasterView.variables.BindSalesTaxCodeUrl, '--Sales Tax Code--', true);
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
        var url = ItemGroupMasterView.variables.BindMasterUrl;
        ItemGroupMasterView.initializeJqgrid(url);
        ItemGroupMasterView.clearControls();
        //ItemGroupMasterView.bindSameGroup();
        ItemGroupMasterView.MetalType();
        //ItemGroupMasterView.SalesTaxcode();
        ItemGroupMasterView.MesrUnitCode();

        $("#btnAddItemGroupMaster").click(function () {
            ItemGroupMasterView.btnMasterShowAddPanel();
        });

        $("#btnSaveItemGroupMaster").click(function () {
            ItemGroupMasterView.btnMasterSubmit();
        });

        $("#btnDeleteItemGroupMaster").click(function () {
            ItemGroupMasterView.btnMasterDelete();
        });

        $('button[name="CancelItemGroupMaster"]').click(function () {
            ItemGroupMasterView.clearControls();
        });

        // For focusing on first textbox in modal
        $('#Modal_ItemGroupMasterEdit').on('shown.bs.modal', function () {
            $('#txtItemGroupName').focus();
        })
        //$('select[name="SameItemGroup"]').change(function () {
        //    var Id = $("#ddlSameItemGroup").val();
        //    $.ajax({
        //        url: getDomain() + ItemGroupMasterView.variables.BindMasterUrl + "&_search=true&searchOper=eq&searchField=ITEMGROUPID&searchString=" + Id,
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
                var url = ItemGroupMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                ItemGroupMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = ItemGroupMasterView.variables.BindMasterUrl;
                ItemGroupMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 1) {
                var url = ItemGroupMasterView.variables.BindMasterUrl;
                ItemGroupMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, ItemGroupMasterView.variables.File);
    }
});