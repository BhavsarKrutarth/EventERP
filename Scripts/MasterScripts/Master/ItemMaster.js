var searchtxt = "";
var ItemMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=ITEMMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ITEMMASTER_CRUD",
        Oper: 'Add',
        File: 'ItemMaster.js',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmItemMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['ItemId', 'Item Name', 'Short Name', 'ItemGroup', 'Item Group Name', 'ITEMTYPE', 'HSNID', 'Size Maintain', 'Auto MRP In Tag', 'Is Active', 'HSN Code', 'Item Type','Price'];
        var colModel = [
            { name: "ITEMID", index: "ITEMID", xmlmap: xmlvars.common_colmap + "ITEMID", stype: 'int', sortable: true, hidden: true, search: false },
            { name: "ITEMNAME", width: 15, index: "ITEMNAME", xmlmap: xmlvars.common_colmap + "ITEMNAME", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "SHORTNAME", width: 7, index: "SHORTNAME", xmlmap: xmlvars.common_colmap + "SHORTNAME", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "ITEMGROUP", index: "ITEMGROUP", xmlmap: xmlvars.common_colmap + "ITEMGROUP", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption, hidden: true },
            { name: "ITEMGROUPNAME", width: 15, index: "ITEMGROUPNAME", xmlmap: xmlvars.common_colmap + "ITEMGROUPNAME", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "ITEMTYPE", hidden: true, index: "ITEMTYPE", xmlmap: xmlvars.common_colmap + "ITEMTYPE", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "HSNID", hidden: true, index: "HSNID", xmlmap: xmlvars.common_colmap + "HSNID", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "SIZEMANTAIN", hidden: true, index: "SIZEMANTAIN", xmlmap: xmlvars.common_colmap + "SIZEMANTAIN", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "AUTOMRPINTAG", hidden: true, index: "AUTOMRPINTAG", xmlmap: xmlvars.common_colmap + "AUTOMRPINTAG", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "ISACTIVE", hidden: true, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "HSNCODE", width: 15, index: "HSNCODE", xmlmap: xmlvars.common_colmap + "HSNCODE", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "ITEMTYPE_COMMON", width: 15, index: "ITEMTYPE_COMMON", xmlmap: xmlvars.common_colmap + "ITEMTYPE_COMMON", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
            { name: "PRICE", width: 15, index: "PRICE", xmlmap: xmlvars.common_colmap + "PRICE", stype: 'int', sortable: true, searchoptions: jqGridVariables.stringSearchOption },
           
            

        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'ItemMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'ItemMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'ItemMasterView') } });
        }
        //$("#table_ItemMaster").GridUnload();
        $.jgrid.gridUnload("#table_ItemMaster");
        $("#table_ItemMaster").jqGrid({
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
            pager: "#pager_ItemMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "ITEMID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_ItemMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_ItemMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_ItemMaster').setGridWidth(width);
                    $("#gbox_table_ItemMaster").width(width);
                }, 200);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ITEMID',
            sortorder: 'desc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    ItemMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_ItemMaster").jqGrid('navGrid', '#pager_ItemMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_ItemMaster_left").css("width", "");
        AlignJqGridHeader('table_ItemMaster', ['edit', 'delete', 'ALLOWNEGATIVESTOCK', 'TAGLOOSEGROUP']);
        // JqGrid navigations shortcuts
        jQuery("#table_ItemMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    ItemMasterView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = ItemMasterView.variables.BindMasterUrl;
        ItemMasterView.initializeJqgrid(url);
        ItemMasterView.clearControls();
    },

    triggerId: function (id, oper) {
        try {
            $("#hdnItemId").val(id);
            FixValue();
            var rowData = jQuery("#table_ItemMaster").getRowData(id);
            $("#txtItemName").val(rowData['ITEMNAME']);
            $("#txtShortName").val(rowData['SHORTNAME']);
            $("#ddlItemGroup").val(rowData['ITEMGROUP']);
            $("#ddlItemType").val(rowData['ITEMTYPE']);
            $("#ddlHsnCode").val(rowData['HSNID']);
            $("#txtPrice").val(rowData['PRICE']);

            
            if (rowData['SIZEMANTAIN'] == 1) {
                $("input[name='txtSizemantain']").iCheck('check');
            }
            else {
                $("input[name='txtSizemantain']").iCheck('uncheck');
            }

            if (rowData['AUTOMRPINTAG'] == 1) {
                $("input[name='txtAutoMRPInTag']").iCheck('check');
            }
            else {
                $("input[name='txtAutoMRPInTag']").iCheck('uncheck');
            }

            if (rowData['ISACTIVE'] == 1) {
                $("input[name='txtIsActive']").iCheck('check');
            }
            else {
                $("input[name='txtIsActive']").iCheck('uncheck');
            }
            
           
            $("#panelItemMasterEdit").modal("show");
            $("#panelItemMasterDelete").modal("hide");
            $("#spanItemMasteroper").text("Edit Item");
            ItemMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            ItemMasterView.variables.addedit = "deleted";
            ItemMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_ItemMaster").getRowData(id);
            $("#delblItemName").html(rowData['ITEMNAME']);
            $("#hdnItemId").val(id);

            $("#panelItemMasterEdit").modal("hide");
            $("#panelItemMasterDelete").modal("show");
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            ItemMasterView.clearControls();
            $("#panelItemMasterEdit").modal("show");
            $("#panelItemMasterDelete").modal("hide");
            $("#spanItemIdoper").text("Add New Item");
            ItemMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            $('#btnDeleteItemMaster').attr('disabled', true);
            var data = {
                "oper": ItemMasterView.variables.Oper,
                "ITEMID": $("#hdnItemId").val()
            }
            ItemMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var subitem = '', ItemCategory = '';
            var isValid = $("#frmItemMaster").valid();
            //if ($("#ddlSubItemType").val() != null) {
            //    subitem = $("#ddlSubItemType").val().toString();
            //}
            //if ($("#ddlItemCategory").val() != null) {
            //    ItemCategory = $("#ddlItemCategory").val().toString();
            //}
            //if ($("#ddlTLG option:selected").text() == 'Tag') {
            //    if ($('input[name="IsLot"]').prop("checked") == true) {

            //    }
            //    else {
            //        isValid = false;
            //        notificationMessage("Warning", "Please check lot With Tag", 'warning');
            //    }
            //}
            if (!isValid)
                return;

            ItemMasterView.variables.Oper = 'Add';
            ItemMasterView.variables.addedit = "added";
            ItemMasterView.variables.Masterid = $("#hdnItemId").val();

            if (ItemMasterView.variables.Masterid != "0" && parseInt(ItemMasterView.variables.Masterid) > 0) {
                ItemMasterView.variables.Oper = 'Edit';
                ItemMasterView.variables.addedit = 'updated';
            }
            if (ItemMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (ItemMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveItemMaster').attr('disabled', true);
            var data = {
                "ITEMNAME": $("#txtItemName").val(),
                "SHORTNAME": $("#txtShortName").val(),
                "ITEMGROUP": $("#ddlItemGroup").val(),
                "ITEMTYPE": $("#ddlItemType").val(),
                "HSNID": $("#ddlHsnCode").val(),
                "SIZEMANTAIN": (($('input[name="txtSizemantain"]').prop("checked") == true) ? 1 : 0),
                "AUTOMRPINTAG": (($('input[name="txtAutoMRPInTag"]').prop("checked") == true) ? 1 : 0),
                "ISACTIVE": (($('input[name="txtIsActive"]').prop("checked") == true) ? 1 : 0),
                "PRICE": $("#txtPrice").val(),
                "oper": ItemMasterView.variables.Oper,
                "ITEMID": ItemMasterView.variables.Masterid
            }

            ItemMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (ItemMasterView.variables.Oper == 'Delete')
                $('#btnDeleteItemMaster').attr('disabled', false);
            else
                $('#btnSaveItemMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(ItemMasterView.variables.Oper + ' Operation', 'Record is ' + ItemMasterView.variables.addedit + ' successfully', 'success');
                ItemMasterView.clearControls();
                $("#table_ItemMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#frmItemMaster .required").removeClass('table-input-error');
            $("#panelItemMasterEdit").modal("hide");
            $("#panelItemMasterDelete").modal("hide");
            $("#txtItemId").val("");
            $("#txtItemName").val("");
            $("#txtShortName").val("");
            $("#ddlItemGroup").val("");
            /*$("#txtTouch").val("");*/
            $("#ddlItemType").val("");
            //$('#ddlItemCategory').multiselect();
            //$($("#ddlItemCategory")[0].nextSibling).attr("tabindex", "5");
            //$('#ddlItemCategory').val('');
            //$('#ddlSubItemType').multiselect();
            //$($("#ddlSubItemType")[0].nextSibling).attr("tabindex", "6");
            //$('#ddlSubItemType').val('');

            /*$("#ddlLabourRateType").val("");*/
            /*$("#ddlTLG").val("");*/
            $("#ddlHsnCode").val("");
            $("input[name='txtAllowNegativeStock']").iCheck('uncheck');
            $("input[name='txtOtherDefaultChecked']").iCheck('uncheck');
            $("input[name='txtSizemantain']").iCheck('uncheck');
            $("input[name='txtAutoMRPInTag']").iCheck('uncheck');
            $("input[name='IsLot']").iCheck('uncheck');
            $("input[name='txtIsActive']").iCheck('check');
            $("#hdnItemId").val('');
            ItemMasterView.variables.Oper = 'Add';
            ItemMasterView.variables.addedit = "added";
            jQuery("#table_ItemMaster").jqGrid('resetSelection');
            $("#frmItemMaster").validate().resetForm();
            //$("#ddlItemCategory").multiselect("destroy");
            //$("#ddlSubItemType").multiselect("destroy");
            //$("#ddlSubItemType").multiselect().multiselectfilter();
            //$("#ddlItemCategory").multiselect().multiselectfilter();

        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + ItemMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: ItemMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },

    showTitlePermissionWise: function (oper) {
        try {
            if (oper == 'edit' || oper == 'add') {
                $("#btnSaveItemMaster").show();
                $("#dItemMasterTitle").show();
                $("#dViewItemMasterTitle").hide();
            }
            else {
                if ($("#btnSaveItemMaster").length > 0) {
                    $("#btnSaveItemMaster").hide();
                }
                $("#dViewItemMasterTitle").show();
                $("#dItemMasterTitle").hide();
            }
        } catch (e) {
            ErrorDetails(e, ItemMasterView.variables.File);
        }
    },
    bindItemGroup: function () {
        $("#ddlItemGroup").html("");
        BindDropdown('ddlItemGroup', 'GroupDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMGROUPMASTER_GET&IsRecordAll=true&ISACTIVE=1&COLUMNREQUESTED=ITEMGROUPMASTERID&COLUMNREQUESTED=ITEMGROUPNAME,ITEMGROUPMASTERID", '--Select Item Group--', true);
    },
    bindItemType: function () {
        $("#ddlItemType").html("");
        BindCommonDetailsByType('Item Type', 'ddlItemType', '', '-- Select Type --');
    },
    bindHSNCode: function () {
        $("#ddlHsnCode").html("");
        BindDropdown('ddlHsnCode', 'HSNDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=HSNCODEMASTER_GET&IsRecordAll=true&ISACTIVE=1&COLUMNREQUESTED=HSNID&COLUMNREQUESTED=HSNCODE", '--Select HSN--', true);
    },
    //bindSubItemType: function () {
    //    $("#ddlSubItemType").html("");
    //    BindDropdown('ddlSubItemType', 'SubItemTyperopdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMMASTER_GET&IsRecordAll=true&ISACTIVE=1&COLUMNREQUESTED=ITEMID&COLUMNREQUESTED=ITEMNAME&SORTORDER=desc", '');
    //},
  
    //BindItemCategory: function () {
    //    $("#ddlItemCategory").html("");
    //    BindCommonDetailsByType('Item Category', 'ddlItemCategory', '', '');
    //}

};

$(document).ready(function () {
    try {
        //$('#').select2({ placeholder: "Select Sub Item" });
        ItemMasterView.bindItemType();
        ItemMasterView.bindHSNCode();
        ItemMasterView.bindItemGroup();
        /*ItemMasterView.bindSubItemType();*/
        /*ItemMasterView.BindItemCategory();*/
        

        //$("#ddlItemGroup").select2();

        //$('#ddlSubItemType').multiselect();
        //$($("#ddlSubItemType")[0].nextSibling).attr("tabindex", "6");

        //$('#ddlItemCategory').multiselect();
        //$($("#ddlItemCategory")[0].nextSibling).attr("tabindex", "5");

        var url = ItemMasterView.variables.BindMasterUrl;
        ItemMasterView.initializeJqgrid(url);
        $('#panelItemMasterEdit').on('shown.bs.modal', function () {
        });
        $("#ddlItemGroup").on("change", function () {
            $.ajax({
                url: getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMGROUPMASTER_GET&IsRecordAll=true&ISACTIVE=1&_search=true&searchField=ITEMGROUPID&searchOper=eq&searchString=" + $("#ddlItemGroup").val(),
                async: false,
                cache: false,
                type: 'POST',
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        var JsonObject = xml2json.parser(data);
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            /*$("#txtTouch").val(JsonObject.serviceresponse.detailslist.details.touch);*/
                            $("#ddlHsnCode").val(JsonObject.serviceresponse.detailslist.details.salestaxcodeid);
                        }
                    }
                    else {
                        InvalidResponseCode(data);
                    }
                },
                error: OnError
            });
        });
        //$("#ddlTLG").on("change", function () {
        //    if ($("#ddlTLG option:selected").text() == 'Tag') {
        //        $("input[name='IsLot']").iCheck('check');
        //    }
        //    else {
        //        $("input[name='IsLot']").iCheck('uncheck');
        //    }
        //});

        $("#btnAddItemMaster").click(function () {
            FixValue();
            ItemMasterView.btnMasterShowAddPanel();
            /*ItemMasterView.bindSubItemType();*/
            ItemMasterView.BindItemCategory();
            setTimeout(function () {
                //$('#ddlItemCategory').multiselect();
                //$($("#ddlItemCategory")[0].nextSibling).attr("tabindex", "5");
            }, 200)
        });

        $("#btnSaveItemMaster").click(function () {
            ItemMasterView.btnMasterSubmit(ItemMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteItemMaster").click(function () {
            ItemMasterView.btnMasterDelete();
        });

        $('button[name="CancelItemMaster"]').click(function () {
            ItemMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelItemMasterEdit').on('shown.bs.modal', function () {
            $('#txtItemName').focus();
        });
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 1) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = ItemMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                ItemMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = ItemMasterView.variables.BindMasterUrl;
                ItemMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 1) {
                var url = ItemMasterView.variables.BindMasterUrl;
                ItemMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, ItemMasterView.variables.File);
    }
});