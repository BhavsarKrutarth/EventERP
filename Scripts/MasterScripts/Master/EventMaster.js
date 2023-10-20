var searchtxt = "";
var EventMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=EVENTMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=EVENTMASTER_CRUD",
        Oper: 'Add',
        File: 'ItemMaster.js',
        addedit: "added",
        Masterid: "",
        // for form validation
        frmvalidator: $("#frmEventMaster").validate({
            rules: {
            },
            messages: {
            }
        })
    },

    initializeJqgrid: function (url) {
        var colNames = ['EVENTMASTERID', 'Name'];
        var colModel = [
            { name: "EVENTMASTERID", index: "EVENTMASTERID", xmlmap: xmlvars.common_colmap + "EVENTMASTERID", stype: 'int', sortable: true, hidden: true, search: false },
            { name: "EVENTMASTERNAME", width: 15, index: "EVENTMASTERNAME", xmlmap: xmlvars.common_colmap + "EVENTMASTERNAME", stype: 'text', sortable: true, searchoptions: jqGridVariables.stringSearchOption },


        ];
        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'EventMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.ViewBtnFmatter(cv, op, ro, 'EventMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 4, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'EventMasterView') } });
        }
        //$("#table_EventMaster").GridUnload();
        $.jgrid.gridUnload("#table_EventMaster");
        $("#table_EventMaster").jqGrid({
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
            pager: "#pager_EventMaster",
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "EVENTMASTERID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                // Hide column headers and top pager if no records were returned
                if ($('#table_EventMaster').getGridParam('records') === 0) {
                    $('.ui-jqgrid-htable').hide();
                }
                else
                    $('.ui-jqgrid-htable').show();

                setTimeout(function () {
                    var width = $('#jqGrid_EventMaster').width();
                    if (width <= 630) {
                        width = 700;
                    }
                    $('#table_EventMaster').setGridWidth(width);
                    $("#gbox_table_EventMaster").width(width);
                }, 200);
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'EVENTMASTERID',
            sortorder: 'desc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    EventMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // Setup buttons
        $("#table_EventMaster").jqGrid('navGrid', '#pager_EventMaster',
            { edit: false, add: false, del: false, search: false, refresh: false },
            { height: 200 }
        );

        $("#pager_EventMaster_left").css("width", "");
        AlignJqGridHeader('table_EventMaster', ['edit', 'delete', 'ALLOWNEGATIVESTOCK', 'TAGLOOSEGROUP']);
        // JqGrid navigations shortcuts
        jQuery("#table_EventMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                if (isU()) {
                    EventMasterView.triggerId(rowid, 'edit')
                }
            }
        });
    },

    triggerInitialClick: function () {
        var url = EventMasterView.variables.BindMasterUrl;
        EventMasterView.initializeJqgrid(url);
        EventMasterView.clearControls();
    },

    triggerId: function (id, oper) {
        try {
            $("#hdnEventMasterid").val(id);
            FixValue();
            var rowData = jQuery("#table_EventMaster").getRowData(id);
            $("#txtEventName").val(rowData['EVENTMASTERNAME']);
            

            $("#panelEventMasterEdit").modal("show");
            $("#panelEventMasterDelete").modal("hide");
            $("#spanItemMasteroper").text("Edit Item");
            EventMasterView.showTitlePermissionWise('edit');
        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
        }
    },

    deleteRow: function (id) {
        try {
            EventMasterView.variables.addedit = "deleted";
            EventMasterView.variables.Oper = "Delete";
            var rowData = jQuery("#table_EventMaster").getRowData(id);
            $("#delblEventName").html(rowData['EVENTMASTERNAME']);
            $("#hdnEventMasterid").val(id);

            $("#panelEventMasterEdit").modal("hide");
            $("#panelEventMasterDelete").modal("show");
        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
        }
    },

    btnMasterShowAddPanel: function () {
        try {
            EventMasterView.clearControls();
            $("#panelEventMasterEdit").modal("show");
            $("#panelEventMasterDelete").modal("hide");
            $("#spanItemIdoper").text("Add New Item");
            EventMasterView.showTitlePermissionWise('add');
        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
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
                "oper": EventMasterView.variables.Oper,
                "EVENTMASTERID": $("#hdnEventMasterid").val()
            }
            EventMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
        }
    },

    btnMasterSubmit: function () {
        try {
            var subitem = '', ItemCategory = '';
            var isValid = $("#frmEventMaster").valid();
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

            EventMasterView.variables.Oper = 'Add';
            EventMasterView.variables.addedit = "added";
            EventMasterView.variables.Masterid = $("#hdnEventMasterid").val();

            if (EventMasterView.variables.Masterid != "0" && parseInt(EventMasterView.variables.Masterid) > 0) {
                EventMasterView.variables.Oper = 'Edit';
                EventMasterView.variables.addedit = 'updated';
            }
            if (EventMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (EventMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }

            $('#btnSaveItemMaster').attr('disabled', true);
            var data = {
                "EVENTMASTERNAME": $("#txtEventName").val(),
                "CITYID": $("#ddlPartyBranch").val(),
                "oper": EventMasterView.variables.Oper,
                "EVENTMASTERID": EventMasterView.variables.Masterid
            }

            EventMasterView.savedata(data);
        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
        }
    },

    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (EventMasterView.variables.Oper == 'Delete')
                $('#btnDeleteItemMaster').attr('disabled', false);
            else
                $('#btnSaveItemMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {
                notificationMessage(EventMasterView.variables.Oper + ' Operation', 'Record is ' + EventMasterView.variables.addedit + ' successfully', 'success');
                EventMasterView.clearControls();
                $("#table_EventMaster").trigger("reloadGrid", [{ current: true }]);
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
        }
    },

    clearControls: function () {
        try {
            $("#frmEventMaster .required").removeClass('table-input-error');
            $("#panelEventMasterEdit").modal("hide");
            $("#panelEventMasterDelete").modal("hide");
            $("#txtEventName").val("");
           
            $("#hdnEventMasterid").val('');
            EventMasterView.variables.Oper = 'Add';
            EventMasterView.variables.addedit = "added";
            jQuery("#table_EventMaster").jqGrid('resetSelection');
            $("#frmEventMaster").validate().resetForm();

        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
        }
    },

    savedata: function (data) {
        try {
            $.ajax({
                url: getDomain() + EventMasterView.variables.PerformMasterOperationUrl,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: EventMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        } catch (e) {
            ErrorDetails(e, EventMasterView.variables.File);
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
            ErrorDetails(e, EventMasterView.variables.File);
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
        EventMasterView.bindItemType();
        EventMasterView.bindHSNCode();
        EventMasterView.bindItemGroup();
        /*EventMasterView.bindSubItemType();*/
        /*EventMasterView.BindItemCategory();*/


        //$("#ddlItemGroup").select2();

        //$('#ddlSubItemType').multiselect();
        //$($("#ddlSubItemType")[0].nextSibling).attr("tabindex", "6");

        //$('#ddlItemCategory').multiselect();
        //$($("#ddlItemCategory")[0].nextSibling).attr("tabindex", "5");

        var url = EventMasterView.variables.BindMasterUrl;
        EventMasterView.initializeJqgrid(url);
        $('#panelEventMasterEdit').on('shown.bs.modal', function () {
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
            EventMasterView.btnMasterShowAddPanel();
            /*EventMasterView.bindSubItemType();*/
            EventMasterView.BindItemCategory();
            setTimeout(function () {
                //$('#ddlItemCategory').multiselect();
                //$($("#ddlItemCategory")[0].nextSibling).attr("tabindex", "5");
            }, 200)
        });

        $("#btnSaveItemMaster").click(function () {
            EventMasterView.btnMasterSubmit(EventMasterView.btnMasterSubmitOnSuccess);
        });

        $("#btnDeleteItemMaster").click(function () {
            EventMasterView.btnMasterDelete();
        });

        $('button[name="CancelItemMaster"]').click(function () {
            EventMasterView.clearControls();
        });
        // For focusing on first textbox in modal
        $('#panelEventMasterEdit').on('shown.bs.modal', function () {
            $('#txtItemName').focus();
        });
        $("#txtsearchbox").keyup(function (event) {
            if ($("#txtsearchbox").val().length > 1) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = EventMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                EventMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var url = EventMasterView.variables.BindMasterUrl;
                EventMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 1) {
                var url = EventMasterView.variables.BindMasterUrl;
                EventMasterView.initializeJqgrid(url);
            }
        });
    } catch (e) {
        ErrorDetails(e, EventMasterView.variables.File);
    }
});