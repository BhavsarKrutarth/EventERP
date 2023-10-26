var searchtxt = "";
var AddNewStockView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=ITEMMASTER_GET",
        PerformMasterOperationUrl: "/Common/OpeartionsOnMaster?ServiceName=ADDNEWSTOCK_CRUD",
        Oper: 'Add',
        addedit: "added",
        File: "AddNewStock.js",
       
    },
    bindItemGroup: function () {
        $("#divItemDeatil").html("");
        $("#ddlItemGroup").html("");
        BindDropdown('ddlItemGroup', 'GroupDropdownList', getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMGROUPMASTER_GET&IsRecordAll=true&ISACTIVE=1&COLUMNREQUESTED=ITEMGROUPMASTERID&COLUMNREQUESTED=ITEMGROUPNAME,ITEMGROUPMASTERID", '', true);
        AddNewStockView.BindItemMaster();
    },

    
    BindItemMaster: function () {
        
        $("#div_loading").show();
        $("#divItemDeatil").html("");
        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "ITEMGROUPID", op: "eq", data: $("#ddlItemGroup").val() }); //$('#txtAccount').val()
        myfilter.rules.push({ field: "ACCOUNTYEARID", op: "eq", data: $("#CurrentAccountYear").attr("accyearid") }); //$('#txtAccount').val()
        myfilter.rules.push({ field: "CITYID", op: "eq", data: $("#ddlPartyBranch").val() }); //$('#txtAccount').val()
        var url = getDomain() + "/Common/BindMastersDetails?ServiceName=ITEMMASTER_GET&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: url,
            type: "POST",
            async: false,
            cache: false,
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);

                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        debugger
                        $("#divItemDeatil").html("")
                        var List;
                        List = JsonObject.serviceresponse.detailslist.details;

                        
                        var DecimalHelper = { format: decimal };
                        $("#divItemDeatil").html($("#ItemDeatilList").render(List, DecimalHelper));

                        $("#div_loading").hide();
                        
                    }
                    else {
                        $("#div_loading").hide();
                        /*notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');*/
                    }
                }
                else {
                    $("#div_loading").hide();
                    /*notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');*/
                }
            }
        })
    },
    chkStockQty: function (itemid, stockqty) {
        debugger
        var txtstockqty = +$("#txtstockqty" + itemid).val() || 0;
        var txtrentstockqty = +$("#txtrentstockqty" + itemid).html() || 0;
        
        if (txtstockqty >= txtrentstockqty) {
            $("#txtavailablestockqty" + itemid).html(txtstockqty - txtrentstockqty)
            $("#flage" + itemid).attr("changeFlag","true")
        } else {
            +$("#txtstockqty" + itemid).val(stockqty)
            $("#txtavailablestockqty" + itemid).html(stockqty - txtrentstockqty)
        }
    }


};

$(document).ready(function () {
    try {
        AddNewStockView.bindItemGroup();
       
        $("#ddlItemGroup").change(function () {
            AddNewStockView.BindItemMaster()
        });

        $("#btnSaveStock").click(function () {
            
            var xmlsaveFiles = "<STOCKDETAILS>";
            var resultXml = makeFileXml('#divItemDeatil');

            if (resultXml.xmlsaveFiles == '') {
                notificationTost('warning', 'No Data Update..! At list One Item Value change is required.');
                return;
            }

            xmlsaveFiles += resultXml.xmlsaveFiles;
            xmlsaveFiles += "</STOCKDETAILS>";

            var data = {
                "oper": 'add',
                "XMLPARAM": escape(xmlsaveFiles)
            };

            $.ajax({
                url: getDomain() + AddNewStockView.variables.PerformMasterOperationUrl,
                type: "POST",
                data: data,
                async: false,
                cache: false,
                success: function (data) {
                    if ($(data).find('RESPONSECODE').text() == "0") {
                        notificationMessage('Update Operation', $(data).find('RESPONSEMESSAGE').text(), 'success');
                        AddNewStockView.BindItemMaster()
                    }
                    else {
                        notificationMessage('Error', $(data).find('RESPONSEMESSAGE').text(), 'error');
                    }
                }
            });
        })
    }
    catch (e) {
        ErrorDetails(e, AddNewStockView.variables.File);
    }
});

function makeFileXml(saveDiv) {
    try {
        debugger
        var xmlsaveFiles = '';

        $(saveDiv + '> div[changeflag="true"]').each(function (key, obj) {
            debugger
            if ($(obj).find('.txtstockqty').val() > 0 && $(obj).find('.txtstockqty').val() != undefined) {
                if ($(obj).find('.itemid').attr("itemid1")) {
                    
                        xmlsaveFiles += '<DETAILS>';
                            xmlsaveFiles += '<ITEMID>' + $(obj).find('.itemid').attr("itemid1") + '</ITEMID>';
                            xmlsaveFiles += '<STOCKQTY>' + ($(obj).find('.txtstockqty').val() || 0) + '</STOCKQTY>';
                            xmlsaveFiles += '<RENTSTOCKQTY>' + ($(obj).find('.txtrentstockqty').html() || 0) + '</RENTSTOCKQTY>';
                            xmlsaveFiles += '<AVAILABLESTOCKQTY>' + ($(obj).find('.txtavailablestockqty').html() || 0) + '</AVAILABLESTOCKQTY>';
                            xmlsaveFiles += '<ACCOUNTYEARID>' + $("#CurrentAccountYear").attr("accyearid") + '</ACCOUNTYEARID>';
                            xmlsaveFiles += '<CITYID>' + $("#ddlPartyBranch").val() + '</CITYID>';
                        xmlsaveFiles += '</DETAILS>';
                }
            }
        });
        return { xmlsaveFiles: xmlsaveFiles };
    } catch (e) {
        ErrorDetails(e, AddNewStockView.variables.File);
    }
}
