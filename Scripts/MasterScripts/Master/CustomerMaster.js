var searchtxt = "";
var CustomerMasterView = {
    variables: {
        BindMasterUrl: "/Common/BindMastersDetails?ServiceName=CUSTOMERMASTER_GET",
        ISAddressCRUD: "/Common/OpeartionsOnMaster?ServiceName=CUSTOMERMASTER_ISADDRESS_CRUD",
        PerformMasterOperationurl: "/Common/OpeartionsOnMaster?ServiceName=CUSTOMERMASTER_CRUD",
        BindBalanceSheetGroupUrl: "/Common/BindMastersDetails?ServiceName=BALANCESHEETGROUPMAS_GET&IsRecordAll=true&ISACTIVE=1",
        Oper: 'Add',
        addedit: "added",
        Masterid: "",
        checkbox: [],
        File: "CustomerMaster.js",
        SaveImageUrl: "/Common/SaveSingleImage",
        frmvalidator: $("#formCustomerMaster").validate({
            rules: {
            }
        }),
        table: "",
    },

    initializeJqgrid: function (url) {
        var colNames = ['CustomerAccId', 'Account Name', 'Address', 'Mobile', 'Mobile 1', 'City', 'Active', 'Address', 'BS GROUP'];
        var colModel = [
            { name: "CUSTOMERACCID", index: "CUSTOMERACCID", xmlmap: xmlvars.common_colmap + "CUSTOMERACCID", stype: 'int', sortable: false, hidden: true, search: false },
            { name: "ACCOUNTNAME", width: 30, index: "ACCOUNTNAME", xmlmap: xmlvars.common_colmap + "ACCOUNTNAME", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            { name: "ADDRESS1", width: 30, index: "ADDRESS1", xmlmap: xmlvars.common_colmap + "ADDRESS1", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            { name: "MOBILE", width: 10, index: "MOBILE", xmlmap: xmlvars.common_colmap + "MOBILE", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            { name: "MOBILE1", width: 10, index: "MOBILE1", xmlmap: xmlvars.common_colmap + "MOBILE1", stype: 'text', sortable: false, searchoptions: jqGridVariables.stringSearchOption },
            { name: "CITYNAME", width: 10, index: "CITYNAME", xmlmap: xmlvars.common_colmap + "CITYNAME", stype: 'text', sortable: false, search: false },
            { name: "ISACTIVE", width: 10, index: "ISACTIVE", xmlmap: xmlvars.common_colmap + "ISACTIVE", stype: 'text', align: "center", sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
            { name: "ISADDRESS", width: 10, index: "ISADDRESS", xmlmap: xmlvars.common_colmap + "ISADDRESS", align: "center", stype: 'text', sortable: false, search: false, formatter: jqGridVariables.chkFmatter },
            //{ name: "EMAILID", width: 10, index: "EMAILID", xmlmap: xmlvars.common_colmap + "EMAILID", align: "center", stype: 'text', sortable: false, search: false, hidden: true },
            { name: "BSGROUPNAME", width: 30, index: "BSGROUPNAME", xmlmap: xmlvars.common_colmap + "BSGROUPNAME", stype: 'text', sortable: false, search: false },
            //{
            //    name: 'ISADDRESS', index: 'ISADDRESS', width: 8, sortable: false, cursor: "pointer",
            //    align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter_CheckBox(cv, op, ro, 'CustomerMasterView', 'edit') }
            //},
        ];

        if (isU()) {
            colNames.push('Edit');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.editBtnFmatter(cv, op, ro, 'CustomerMasterView', 'edit') } });
        }
        else {
            colNames.push('View');
            colModel.push({ name: 'edit', index: 'edit', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.viewBtnFmatter(cv, op, ro, 'CustomerMasterView', 'view') } });
        }
        if (isD()) {
            colNames.push('Delete');
            colModel.push({ name: 'delete', index: 'delete', width: 5, sortable: false, align: "center", search: false, formatter: function (cv, op, ro) { return jqGridVariables.deleteBtnFmatter(cv, op, ro, 'CustomerMasterView') } });
        }
        //$("#table_CustomerMaster").GridUnload();
        $.jgrid.gridUnload("#table_CustomerMaster");
        //$("#div_loading").show();
        $("#table_CustomerMaster").jqGrid({
            //data: mydata,
            url: getDomain() + url,
            datatype: "xml",
            height: getGridHeight(),
            scroll: 1,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 100,
            rowList: [100, 200, 300],
            colNames: colNames,
            colModel: colModel,
            type: "POST",
            async: true,
            cache: false,
            pager: "#pager_CustomerMaster",
            multiselect: false,
            xmlReader: {
                root: xmlvars.common_root,
                row: xmlvars.common_row,
                page: xmlvars.common_response + "CURRENTPAGE",
                total: xmlvars.common_response + "TOTALPAGES",
                records: xmlvars.common_response + "TOTALRECORDS",
                repeatitems: false,
                id: "CUSTOMERACCID"
            },
            loadComplete: function () {
                $("tr.jqgrow:even").addClass('myAltRowClass');

                setTimeout(function () {
                    var width = $('#jqgrid_CustomerMaster').width();
                    if (width <= 430) {
                        width = 1000;
                    }
                    $('#table_CustomerMaster').setGridWidth(width);
                }, 50);

                jQuery("#table_CustomerMaster").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

                $.each($("#table_CustomerMaster").jqGrid('getRowData'), function (i, item) {
                    if (item.ADDRESS1 == "") {
                        $("#jqg_table_CustomerMaster_" + item.CUSTOMERACCID).hide();
                    }
                });
                //$("#div_loading").hide();
            },
            loadError: OnJqloadError,
            beforeProcessing: OnJqbeforeProcessingErrorcheck,
            viewrecords: true,
            hidegrid: false,
            sortname: 'ACCOUNTNAME',
            sortorder: 'asc',
            ondblClickRow: function (rowid) {
                if (isU()) {
                    CustomerMasterView.triggerId(rowid, 'edit')
                }
            }
        });

        // JqGrid navigations shortcuts
        jQuery("#table_CustomerMaster").jqGrid('bindKeys', {
            "onEnter": function (rowid) {
                CustomerMasterView.triggerId(rowid, 'edit')
            }
        });

        // Setup buttons
        $("#table_CustomerMaster").jqGrid('navGrid', '#pager_CustomerMaster',
            { edit: false, add: false, del: false, search: false, refresh: true },
            { height: 200 }
        );

        $("#pager_CustomerMaster_left").css("width", "");
        AlignJqGridHeader('table_CustomerMaster', ['edit', 'delete']);
    },

    //IntializeDatatable: function (Url) {
    //    try {
    //        var data = {
    //            "WHERE_EQ_TYPE": "GRIDBIND"
    //        }
    //        CustomerMasterView.variables.table = $('#CustomerMasterTable').DataTable({
    //            processing: true,
    //            serverSide: true,
    //            destroy: true,
    //            ordering: false,
    //            serverMethod: 'POST',
    //            bLengthChange: false,
    //            bFilter: false,
    //            searching: true,

    //            //scrollY: 500,
    //            //deferRender: true,
    //            //scroller: true,

    //            dom: '<"as_tbl_hd"<"as_d_flex as_gap_10"<"as_add">B<"as_exit">>>rt<"as_tbl_info"pi>',
    //            scroller: {
    //                loadingIndicator: true
    //            },
    //            ajax: {
    //                url: getDomain() + Url,// + "&ISRECORDALL=true",
    //                data: data,
    //                type: 'POST',
    //                dataSrc: 'SERVICERESPONSE.DETAILSLIST.DETAILS'
    //            },
    //            columns: [
    //                { data: 'ACCOUNTNAME' },
    //                //{ data: 'ADDRESS1' },
    //                //{ data: 'MOBILE' },
    //                //{ data: 'MOBILE1' },
    //                //{ data: 'CITYNAME' },
    //                { data: 'ISACTIVE' },
    //                { data: 'ISADDRESS' },
    //                { data: 'BSGROUPNAME' },
    //                { data: 'CUSTOMERACCID', visible: false },
    //                {
    //                    data: 'Print',
    //                    render: function (data, type, row, meta) {
    //                        // Otherwise just give the original data
    //                        return DatatableVaribales.printBtnFormatter(meta.row, 'CustomerMasterView', row.QUOTATIONID);
    //                    }
    //                },
    //                {
    //                    data: 'Action',
    //                    render: function (data, type, row, meta) {
    //                        // Otherwise just give the original data
    //                        return DatatableVaribales.editBtnFormatter(meta.row, 'CustomerMasterView') + ' | ' + DatatableVaribales.deleteBtnFormatter(meta.row, 'CustomerMasterView');
    //                    }
    //                },
    //            ],
    //            buttons: [
    //                //'excel', 'pdf'
    //                {
    //                    extend: 'excelHtml5',
    //                    text: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24" width="24" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
    //                <path style="fill:#12B347;" d="M456.348,495.304c0,9.217-7.479,16.696-16.696,16.696H72.348c-9.217,0-16.696-7.479-16.696-16.696  V16.696C55.652,7.479,63.131,0,72.348,0h233.739c4.424,0,8.674,1.761,11.804,4.892l133.565,133.565  c3.131,3.13,4.892,7.379,4.892,11.804V495.304z"></path>
    //                <path style="fill:#0F993E;" d="M456.348,495.304V150.278c0-4.437-1.766-8.691-4.909-11.822L317.389,4.871  C314.258,1.752,310.019,0,305.601,0H256v512h183.652C448.873,512,456.348,504.525,456.348,495.304z"></path>
    //                <path style="fill:#12B347;" d="M451.459,138.459L317.891,4.892C314.76,1.76,310.511,0,306.082,0h-16.691l0.001,150.261  c0,9.22,7.475,16.696,16.696,16.696h150.26v-16.696C456.348,145.834,454.589,141.589,451.459,138.459z"></path>
    //                <path style="fill:#FFFFFF;" d="M372.87,211.478H139.13c-9.217,0-16.696,7.479-16.696,16.696v200.348  c0,9.217,7.479,16.696,16.696,16.696H372.87c9.217,0,16.696-7.479,16.696-16.696V228.174  C389.565,218.957,382.087,211.478,372.87,211.478z M155.826,311.652h66.783v33.391h-66.783V311.652z M256,311.652h100.174v33.391  H256V311.652z M356.174,278.261H256V244.87h100.174V278.261z M222.609,244.87v33.391h-66.783V244.87H222.609z M155.826,378.435  h66.783v33.391h-66.783V378.435z M256,411.826v-33.391h100.174v33.391H256z"></path>
    //                <path style="fill:#E6F3FF;" d="M372.87,211.478H256v33.391h100.174v33.391H256v33.391h100.174v33.391H256v33.391h100.174v33.391H256  v33.391h116.87c9.22,0,16.696-7.475,16.696-16.696V228.174C389.565,218.953,382.09,211.478,372.87,211.478z"></path>
    //                </svg>`,
    //                    className: 'excel_page',
    //                    exportOptions: {
    //                        modifier: {
    //                            page: 'current'
    //                        }
    //                    }
    //                },
    //                {
    //                    extend: 'pdfHtml5',
    //                    text: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="_x35_" height="24" width="24" viewBox="0 0 512 512" xml:space="preserve">
    //            <g>
    //                <polygon style="fill:#B12A27;" points="475.435,117.825 475.435,512 47.791,512 47.791,0.002 357.613,0.002 412.491,54.881  "></polygon>
    //                <rect x="36.565" y="34.295" style="fill:#F2F2F2;" width="205.097" height="91.768"></rect>
    //                <g>
    //                    <g>
    //                        <path style="fill:#B12A27;" d="M110.132,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.658-1.658-3.694-3.015-6.031-3.92     c-2.412-0.98-5.126-1.432-8.141-1.432H69.651v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432     c2.337-0.905,4.372-2.261,6.031-3.92c1.659-1.658,2.865-3.543,3.769-5.804c0.829-2.186,1.282-4.523,1.282-6.935 C111.413,68.902,110.961,66.565,110.132,64.379z M97.844,77.118c-1.508,1.432-3.618,2.186-6.181,2.186H81.034V63.323h10.629     c2.563,0,4.674,0.754,6.181,2.261c1.432,1.432,2.186,3.392,2.186,5.804C100.031,73.726,99.277,75.686,97.844,77.118z"></path>
    //                        <path style="fill:#B12A27;" d="M164.558,75.761c-0.075-2.035-0.151-3.844-0.377-5.503c-0.226-1.659-0.603-3.166-1.131-4.598     c-0.528-1.357-1.206-2.714-2.111-3.92c-2.035-2.94-4.523-5.126-7.312-6.483c-2.865-1.357-6.257-2.035-10.252-2.035h-20.956     v58.195h20.956c3.995,0,7.387-0.678,10.252-2.035c2.789-1.357,5.277-3.543,7.312-6.483c0.905-1.206,1.583-2.563,2.111-3.92     c0.528-1.432,0.905-2.94,1.131-4.598c0.226-1.658,0.301-3.468,0.377-5.503c0.075-1.96,0.075-4.146,0.075-6.558 C164.633,79.908,164.633,77.721,164.558,75.761z M153.175,88.2c0,1.734-0.151,3.091-0.302,4.297     c-0.151,1.131-0.377,2.186-0.678,2.94c-0.301,0.829-0.754,1.583-1.281,2.261c-1.885,2.412-4.749,3.543-8.518,3.543h-8.669V63.323     h8.669c3.769,0,6.634,1.206,8.518,3.618c0.528,0.678,0.98,1.357,1.281,2.186s0.528,1.809,0.678,3.015     c0.151,1.131,0.302,2.563,0.302,4.221c0.075,1.659,0.075,3.694,0.075,5.955C153.251,84.581,153.251,86.541,153.175,88.2z"></path>
    //                        <path style="fill:#B12A27;" d="M213.18,63.323V53.222h-38.37v58.195h11.383V87.823h22.992V77.646h-22.992V63.323H213.18z"></path>
    //                    </g>
    //                    <g>
    //                        <path style="fill:#B12A27;" d="M110.132,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.658-1.658-3.694-3.015-6.031-3.92     c-2.412-0.98-5.126-1.432-8.141-1.432H69.651v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432     c2.337-0.905,4.372-2.261,6.031-3.92c1.659-1.658,2.865-3.543,3.769-5.804c0.829-2.186,1.282-4.523,1.282-6.935 C111.413,68.902,110.961,66.565,110.132,64.379z M97.844,77.118c-1.508,1.432-3.618,2.186-6.181,2.186H81.034V63.323h10.629     c2.563,0,4.674,0.754,6.181,2.261c1.432,1.432,2.186,3.392,2.186,5.804C100.031,73.726,99.277,75.686,97.844,77.118z"></path>
    //                    </g>
    //                </g>
    //                <polygon style="opacity:0.08;fill:#040000;" points="475.435,117.825 475.435,512 47.791,512 47.791,419.581 247.705,219.667 259.54,207.832 266.098,201.273 277.029,190.343 289.995,177.377 412.491,54.881"></polygon>
    //                <polygon style="fill:#771B1B;" points="475.435,117.836 357.599,117.836 357.599,0"></polygon>
    //                <g>
    //                    <path style="fill:#F2F2F2;" d="M414.376,370.658c-2.488-4.372-5.88-8.518-10.101-12.287c-3.467-3.166-7.538-6.106-12.137-8.82    c-18.544-10.93-45.003-16.207-80.961-16.207h-3.618c-1.96-1.809-3.995-3.618-6.106-5.503    c-13.644-12.287-24.499-25.63-32.942-40.48c16.584-36.561,24.499-69.126,23.519-96.867c-0.151-4.674-0.829-9.046-2.035-13.117    c-1.809-6.558-4.824-12.363-9.046-17.112c-0.075-0.075-0.075-0.075-0.151-0.151c-6.709-7.538-16.056-11.835-25.555-11.835    c-9.574,0-18.393,4.146-24.801,11.76c-6.332,7.538-9.724,17.866-9.875,30.002c-0.226,18.544,1.281,36.108,4.448,52.315    c0.301,1.282,0.528,2.563,0.829,3.844c3.166,14.7,7.84,28.645,13.87,41.611c-7.086,14.398-14.247,26.836-19.223,35.279    c-3.769,6.408-7.915,13.117-12.212,19.826c-19.373,3.468-35.807,7.689-50.129,12.966c-19.373,7.011-34.902,16.056-46.059,26.836    c-7.237,6.935-12.137,14.323-14.549,22.012c-2.563,7.915-2.412,15.83,0.452,22.916c2.638,6.558,7.387,12.061,13.72,15.83    c1.508,0.905,3.091,1.658,4.749,2.337c4.825,1.96,10.101,3.015,15.604,3.015c12.74,0,25.856-5.503,36.937-15.378    c20.655-18.469,41.988-48.169,54.577-66.94c10.327-1.583,21.559-2.94,34.224-4.297c14.926-1.508,28.118-2.412,40.104-2.865    c3.694,3.317,7.237,6.483,10.629,9.498c18.846,16.81,33.168,28.947,46.134,37.465c0,0.075,0.075,0.075,0.151,0.075    c5.126,3.392,10.026,6.181,14.926,8.443c5.503,2.563,11.081,3.92,16.81,3.92c7.237,0,14.021-2.186,19.675-6.181    c5.729-4.146,9.875-10.101,11.76-16.81C420.18,387.694,418.899,378.724,414.376,370.658z M247.705,219.667    c-1.055-9.348-1.508-19.072-1.357-29.324c0.151-9.724,3.694-16.283,8.895-16.283c3.92,0,8.066,3.543,9.95,10.327    c0.528,2.035,0.905,4.372,0.98,7.01c0.151,3.166,0.075,6.483-0.075,9.875c-0.452,9.574-2.111,19.75-4.975,30.681    c-1.734,7.011-3.995,14.323-6.784,21.936C251.173,243.186,248.911,231.803,247.705,219.667z M121.967,418.073    c-1.282-3.166,0.151-9.272,7.991-16.81c11.986-11.458,30.756-20.504,56.914-27.364c-4.975,6.784-9.875,12.966-14.624,18.619    c-7.237,8.744-14.172,16.132-20.429,21.71c-5.352,4.824-11.232,7.84-16.81,8.594c-0.98,0.151-1.96,0.226-2.94,0.226    C127.168,423.049,123.173,421.089,121.967,418.073z M242.428,337.942l0.528-0.829l-0.829,0.151    c0.151-0.377,0.377-0.754,0.603-1.055c3.166-5.352,7.161-12.212,11.458-20.127l0.377,0.829l0.98-2.035    c3.166,4.523,6.634,8.971,10.252,13.267c1.734,2.035,3.543,3.995,5.352,5.955l-1.206,0.075l1.055,0.98    c-3.091,0.226-6.332,0.528-9.574,0.829c-2.035,0.226-4.146,0.377-6.257,0.603C250.796,337.037,246.499,337.49,242.428,337.942z     M369.297,384.98c-8.971-5.729-18.996-13.795-31.359-24.575c17.564,1.809,31.359,5.654,41.159,11.383    c4.297,2.488,7.538,5.051,9.724,7.538c3.618,3.844,4.9,7.312,4.221,9.649c-0.603,2.337-3.241,3.92-6.483,3.92    c-1.885,0-3.844-0.452-5.88-1.432c-3.468-1.658-7.086-3.694-10.93-6.181C369.598,385.282,369.448,385.131,369.297,384.98z"></path>
    //                </g>
    //            </g>
    //            </svg>`,
    //                    className: 'pdf_page',
    //                    titleAttr: 'PDF'
    //                }
    //            ],
    //            initComplete: function () {
    //                let table = this;
    //                this.api()
    //                    .columns()
    //                    .every(function () {
    //                        var par = document.getElementById(table[0].id);
    //                        par.querySelectorAll('input').forEach((el, i) => {
    //                            el.setAttribute('data-column', i);
    //                        });

    //                        let column = this;
    //                        $('input.as_dt_search').on('keyup', (el, i) => {
    //                            var nTable = $(`#${table[0].id}`).DataTable();
    //                            nTable.columns(el.currentTarget.dataset.column).search(el.currentTarget.value).draw();
    //                        });
    //                    });
    //            }
    //        });
    //    }
    //    catch (e) {
    //        ErrorDetails(e, CustomerMasterView.variables.File);
    //    }
    //},

    triggerInitialClick: function () {
        try {
            $("#panelCustomerMasterEdit").modal('hide');
            $("#panelCustomerMasterDelete").modal('hide');
            $("#panelList").show();
            var url = CustomerMasterView.variables.BindMasterUrl;
            CustomerMasterView.initializeJqgrid(url);
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },

    BindDropDown: function () {
        CustomerMasterView.bindCustomerCategory();
        CustomerMasterView.bindBalanceSheetGroup();
        CustomerMasterView.bindCustomerType();
        CustomerMasterView.CityAutoComplete();
    },

    BindEditData: function (id, oper) {
        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "ID", op: "eq", data: id });
        var url = getDomain() + CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: url,
            type: "POST",
            async: false,
            cache: false,
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);

                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        List = JsonObject.serviceresponse.detailslist.details;

                        $("#hdn_Customermasterid").val(List.customeraccid);
                        $("#txtaccoutid").val(List.accid);
                        $("#txtaccname").val(List.accountname);
                        $("#ddlBalnceSheetGroup").val(List.balancesheetgroupid);
                        $("#txt_gstno").val(List.gst == '[object Object]' ? '' : List.gst);
                        $("#txt_panno").val(List.pan == '[object Object]' ? '' : List.pan);
                        $("#txt_adhaar").val(List.adhaar);
                        if (List.customerimg) {
                            $('#imgCustomer').attr('src', getDomain() + "/UploadFiles/CustomerMaster/" + List.customerimg);
                        } else {
                            $('#imgCustomer').attr('src', getDomain() + "/Content/assets/images/default-user.png");
                        }
                        $("#hdnimg").val("/UploadFiles/CustomerMaster/" + List.customerimg);

                        if (List.address1)
                            $("#divaddress1").show();
                        else
                            $("#divaddress1").hide();

                        if (List.isaddress)
                            $("#chkaddress").iCheck('check');
                        else
                            $("#chkaddress").iCheck('uncheck');

                        $("#txt_address1").val(List.address1 == '[object Object]' ? '' : List.address1);
                        $("#txt_address2").val(List.address2 == '[object Object]' ? '' : List.address2);
                        $("#txt_address3").val(List.address3 == '[object Object]' ? '' : List.address3);
                        $("#hdnCityId").val(List.cityid);
                        $('#ddlCity').val(List.cityname);
                        //var selectedValuesTest = (List.cityid.toString()).split(',');
                        //$('#ddlCity').val(selectedValuesTest).trigger("change");

                        $("#txt_pincode").val(List.pincode == '[object Object]' ? '' : List.pincode);

                        $("#txt_EmailId").val(List.emailid == '[object Object]' ? '' : List.emailid);

                        $("#txt_Mobile").val(List.mobile == '[object Object]' ? '' : List.mobile);
                        $("#txt_Mobile1").val(List.mobile1 == '[object Object]' ? '' : List.mobile1);
                        $("#txt_phone").val(List.phone == '[object Object]' ? '' : List.phone);
                        if (List.isactive == 1) {
                            $('#chkActive').iCheck('check');
                        }
                        else {
                            $('#chkActive').iCheck('uncheck');
                        }
                        if (List.isdndactivate == 1) {
                            $('#chkDNDActive').iCheck('check');
                        }
                        else {
                            $('#chkDNDActive').iCheck('uncheck');
                        }
                        $("#txtcustcardno").val(List.customercardno == '[object Object]' ? '' : List.customercardno);
                        $("#ddlcategory").val(List.customercategoryid);
                        $("#ddlcustomertype").val(List.customertypeid);
                        if (List.isosbillnotaccept == 1) {
                            $('#chkBillNotAccept').iCheck('check');
                        }
                        else {
                            $('#chkBillNotAccept').iCheck('uncheck');
                        }
                        $("#Panel_CustomerMasterEdit").modal('show');
                        $("#Modal_CustomerMasterDelete").modal('hide');
                        $("#spanCustomerMasteroper").text("Edit ");
                        setTimeout(function () {
                            $("#txtaccname").focus();
                        }, 200)
                    }
                }
            }
        });
    },

    triggerId: function (id, oper) {
        try {
            CustomerMasterView.BindDropDown();
            CustomerMasterView.BindEditData(id, oper);

            $("#Panel_CustomerMasterEdit").modal('show');
            $("#Modal_CustomerMasterDelete").modal('hide');
            $("#spanCustomerMasteroper").text("Edit ");
            setTimeout(function () { $("#txtaccname").focus(); }, 200)
            /*$('.mobilenomask').mask("0000000000");*/
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    deleteRow: function (id) {
        try {
            CustomerMasterView.variables.addedit = "deleted";
            CustomerMasterView.variables.Oper = "Delete";
            if (id > 0) {
                var rowData = jQuery("#table_CustomerMaster").getRowData(id);
                $("#dellblCustomername").html(rowData['ACCOUNTNAME']);
                $("#hdn_Customermasterid").val(id);
                $("#Panel_CustomerMasterEdit").modal('hide');
                $("#Modal_CustomerMasterDelete").modal('show');
            }
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    btnMasterShowAddPanel: function () {
        try {
            CustomerMasterView.clearControls();
            $("#Panel_CustomerMasterEdit").modal('hide');
            $("#txtaccname").focus();
            $("#Modal_CustomerMasterDelete").modal('hide');
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    btnMasterDelete: function () {
        try {
            if (isD() == 0) {
                notificationMessage('Response', permissionvars.delete, 'error');
                return;
            }
            $('#btnDeleteCustomerMaster').attr('disabled', true);
            var data = {
                "oper": CustomerMasterView.variables.Oper,
                "CUSTOMERACCID": $("#hdn_Customermasterid").val()
            }
            CustomerMasterView.savedata(CustomerMasterView.variables.Oper, data);
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    savedata: function (oper, data) {
        try {
            if ($("#imgCustomer").attr('src') != "/Content/assets/images/default-user.png") {
                var originalfile = '';
                var newfile = '';
                if (CustomerMasterView.variables.Oper == 'Delete') {
                    originalfile = $('#hdnimg').val();
                    newfile = $("#imgCustomer").val();
                }
                else {
                    originalfile = $('#hdnimg').val();
                    newfile = $('#imgCustomer').attr('src');
                }
                $.ajax({
                    url: getDomain() + CustomerMasterView.variables.SaveImageUrl,
                    async: false,
                    cache: false,
                    data: {
                        originalfile: originalfile,
                        newfile: newfile,
                        module: 'CustomerMaster',
                        isResize: false,
                        oper: CustomerMasterView.variables.Oper
                    },
                    success: function (result) {
                        if (result != 'error') {
                            data.CUSTOMERIMG = result;
                        }
                        //if ($("#imgCustomer").attr('src') != "/Content/assets/images/default-user.png")
                        //{
                        //    data.CUSTOMERIMG = $("#imgCustomer").attr('src');
                        //}
                        $.ajax({
                            url: getDomain() + CustomerMasterView.variables.PerformMasterOperationurl,
                            data: data,
                            async: false,
                            cache: false,
                            type: 'POST',
                            success: CustomerMasterView.btnMasterSubmitOnSuccess,
                            error: OnError
                        });
                    }
                });

            } else {
                $.ajax({
                    url: getDomain() + CustomerMasterView.variables.PerformMasterOperationurl,
                    data: data,
                    async: false,
                    cache: false,
                    type: 'POST',
                    success: CustomerMasterView.btnMasterSubmitOnSuccess,
                    error: OnError
                });
            }
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    btnMasterCancel: function () {
        try {
            CustomerMasterView.clearControls();
            var myfilter,
                myfilter = { rules: [] };
            myfilter.rules.push({ field: "TYPE", op: "eq", data: "GRIDBIND" });
            if ($("#chkisAddress").prop('checked'))
                myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });

            var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
            CustomerMasterView.initializeJqgrid(url);
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    btnMasterSubmit: function () {
        try {
            var isValid = $("#formCustomerMaster").valid();
            if (!isValid)
                return;
            if (!$("#hdnCityId").val()) {
                notificationMessage('', 'Please select City.', 'warning');
                return;
            }

            CustomerMasterView.variables.Oper = 'Add';
            CustomerMasterView.variables.addedit = "added";
            CustomerMasterView.variables.Masterid = $("#hdn_Customermasterid").val();
            if (CustomerMasterView.variables.Masterid != "0" && parseInt(CustomerMasterView.variables.Masterid) > 0) {
                CustomerMasterView.variables.Oper = 'Edit';
                CustomerMasterView.variables.addedit = 'updated';
            }

            if (CustomerMasterView.variables.Oper == 'Add' && isA() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }
            if (CustomerMasterView.variables.Oper == 'Edit' && isU() == 0) {
                notificationMessage('Response', permissionvars.unauthorized, 'error');
                return;
            }


            $('#btnSaveCustomerMaster').attr('disabled', true);
            var data = {
                "ACCOUNTNAME": $("#txtaccname").val(),
                "ISDNDACTIVATE": (($('#chkDNDActive').prop("checked") == true) ? 1 : 0),

                "CITYID": $("#hdnCityId").val(),
                "MOBILE": $("#txt_Mobile").val().replace('-', ''),
                "MOBILE1": $("#txt_Mobile1").val().replace('-', ''),
                "ISACTIVE": (($('#chkActive').prop("checked") == true) ? 1 : 0),
                "ISOSBILLNOTACCEPT": (($('#chkBillNotAccept').prop("checked") == true) ? 1 : 0),
                "oper": CustomerMasterView.variables.Oper,
                "CUSTOMERACCID": CustomerMasterView.variables.Masterid,
                "BALANCESHEETGROUPID": $("#ddlBalnceSheetGroup").val()
            };

            if ($("#txt_address1").val() == "") {
                data.ISADDRESS = 0;
            }
            else {
                data.ISADDRESS = (($('#chkaddress').prop("checked") == true) ? 1 : 0);
            }

            $("#txt_pincode").val() ? data.PINCODE = $("#txt_pincode").val() : "";
            $("#txt_EmailId").val() ? data.EMAILID = $("#txt_EmailId").val() : "";
            $("#txt_gstno").val() ? data.GST = $("#txt_gstno").val() : "";
            $("#txt_panno").val() ? data.PAN = $("#txt_panno").val() : "";
            $("#txt_adhaar").val() ? data.ADHAAR = $("#txt_adhaar").val() : "";
            $("#txt_address1").val() ? data.ADDRESS1 = capitalize($("#txt_address1").val()) : "";
            $("#txt_address2").val() ? data.ADDRESS2 = capitalize($("#txt_address2").val()) : "";
            $("#txt_address3").val() ? data.ADDRESS3 = capitalize($("#txt_address3").val()) : "";
            $("#txt_phone").val() ? data.PHONE = $("#txt_phone").val() : "";
            $("#txtcustcardno").val() ? data.CUSTOMERCARDNO = $("#txtcustcardno").val() : "";
            $("#ddlcustomertype").val() ? data.CUSTOMERTYPEID = $("#ddlcustomertype").val() : "";
            $("#ddlcategory").val() ? data.CUSTOMERCATEGORYID = $("#ddlcategory").val() : "";

            CustomerMasterView.savedata(CustomerMasterView.variables.Oper, data);
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    btnMasterSubmitOnSuccess: function (data) {
        try {
            if (CustomerMasterView.variables.Oper == 'Delete')
                $('#btnDeleteCustomerMaster').attr('disabled', false);
            else
                $('#btnSaveCustomerMaster').attr('disabled', false);

            if ($(data).find('RESPONSECODE').text() == "0") {


                //if ($("#hdnCommonCustomerId").val()) {
                //    $("#hdnCommonNewCustomerId").val($("#hdnCommonCustomerId").val());
                //    $("#hdnCommonCustomerId").val('');
                //    $("#idCustomerMaster i").click();
                //} else if ($("#hdnCommonNewCustomer").val() == '1') {
                //    if ($("#hdnCommonPreviousActiveId").val() != '') {
                //        $("#hdnCommonNewCustomerId").val($(data).find('CUSTOMERID').text());
                //        $("#idCustomerMaster i").click()
                //    } else {
                //        notificationMessage(CustomerMasterView.variables.Oper + ' Operation', 'Record is ' + CustomerMasterView.variables.addedit + ' successfully', 'success');
                //        CustomerMasterView.clearControls();
                //        $("#table_CustomerMaster").trigger("reloadGrid", [{ current: true }]);
                //    }
                //} else {
                notificationMessage(CustomerMasterView.variables.Oper + ' Operation', 'Record is ' + CustomerMasterView.variables.addedit + ' successfully', 'success');
                CustomerMasterView.clearControls();
                $("#table_CustomerMaster").trigger("reloadGrid", [{ current: true }]);
                //}
            }
            else {
                InvalidResponseCode(data);
            }
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    clearControls: function () {
        try {
            $("#chkisAddress").prop("checked", false);
            $("#divaddress").attr("flag", "0");
            $("#divaddress1").hide();
            $("#Modal_CustomerMasterDelete").modal('hide');
            $("#Panel_CustomerMasterEdit").modal('hide');
            $("#txtaccname").val("");
            $("#ddlBalnceSheetGroup").val("");
            $("#txtcustcardno").val("");
            $("#txt_gstno").val("");
            $("#txt_panno").val("");
            $("#txt_adhaar").val("");
            $("#txt_address1").val("");
            $("#txt_address2").val("");
            $("#txt_address3").val("");
            $("#hdnCityId").val("");
            $("#ddlCity").val("");
            $('#imgCustomer').attr('src', getDomain() + "/Content/assets/images/default-user.png");
            $("#txt_pincode").val("");
            $("#txt_EmailId").val("");
            $("#txt_Mobile").val("");
            $("#txt_Mobile1").val("");
            $("#txt_phone").val("");
            $("#ddlcategory").val("");
            $("#ddlcustomertype").val("");
            $('#chkDNDActive').iCheck('uncheck');
            $('#chkBillNotAccept').iCheck('uncheck');
            $('#chkActive').iCheck('check');
            $("#hdn_Customermasterid").val("");
            $("#formCustomerMaster").validate().resetForm();
            CustomerMasterView.variables.Oper = 'Add';
            CustomerMasterView.variables.addedit = "added";
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    bindCustomerCategory: function () {
        try {
            $("#ddlcategory").html("");
            BindCommonDetailsByType('Customer Category', 'ddlcategory', 'CommonMasterDetailDropdownList', '-- select Category --');
        }
        catch (e) {
            ErrorDetails(e, Customerdetailview.variables.File);
        }
    },

    bindCustomerType: function () {
        try {
            $("#ddlcustomertype").html("");
            BindCommonDetailsByType('Customer Type', 'ddlcustomertype', 'CommonMasterDetailDropdownList', '-- select Customer Type --');
        }
        catch (e) {
            ErrorDetails(e, Customerdetailview.variables.File);
        }
    },
    OnChangeGST: function () {
        $("#txt_panno").val($("#txt_gstno").val().substring(2, 12));
    },

    bindBalanceSheetGroup: function () {
        $("#ddlBalnceSheetGroup").html("");
        BindDropdown('ddlBalnceSheetGroup', 'BalnceSheetGroupList', getDomain() + CustomerMasterView.variables.BindBalanceSheetGroupUrl, '-- Balance Sheet Group --');
    },
    GetCustomerDetails: function (id) {
        var myfilter;
        myfilter = {
            rules: []
        };
        myfilter.rules.push({ field: "ACCID", op: "eq", data: id });
        var url = getDomain() + CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: url,
            type: "POST",
            async: false,
            cache: false,
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);

                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        List = JsonObject.serviceresponse.detailslist.details;

                        $("#hdn_Customermasterid").val(List.customeraccid);
                        $("#txtaccoutid").val(List.accid);
                        $("#txtaccname").val(List.accountname);
                        $("#ddlBalnceSheetGroup").val(List.balancesheetgroupid);
                        $("#txt_gstno").val(List.gst);
                        $("#txt_panno").val(List.pan);
                        $("#txt_adhaar").val(List.adhaar);
                        if (List.customerimg) {
                            $('#imgCustomer').attr('src', getDomain() + "/UploadFiles/CustomerMaster/" + List.customerimg);
                        } else {
                            $('#imgCustomer').attr('src', getDomain() + "/Content/assets/images/default-user.png");
                        }
                        $("#hdnimg").val("/UploadFiles/PartyMaster/" + List.customerimg);
                        $("#txt_address1").val(List.address1);
                        $("#txt_address2").val(List.address2);
                        $("#txt_address3").val(List.address3);
                        $("#hdnCityId").val(List.cityid);
                        $('#ddlCity').val(List.cityname);
                        //var selectedValuesTest = (List.cityid.toString()).split(',');
                        //$('#ddlCity').val(selectedValuesTest).trigger("change");

                        $("#txt_pincode").val(List.pincode);
                        $("#txt_EmailId").val(List.emailid);
                        $("#txt_Mobile").val(List.mobile == '[object Object]' ? '' : List.mobile);
                        $("#txt_Mobile1").val(List.mobile1 == '[object Object]' ? '' : List.mobile1);
                        $("#txt_phone").val(List.phone);
                        if (List.isactive == 1) {
                            $('#chkActive').iCheck('check');
                        }
                        else {
                            $('#chkActive').iCheck('uncheck');
                        }
                        if (List.isdndactivate == 1) {
                            $('#chkDNDActive').iCheck('check');
                        }
                        else {
                            $('#chkDNDActive').iCheck('uncheck');
                        }
                        $("#txtcustcardno").val(List.customercardno);
                        $("#ddlcategory").val(List.customercategoryid);
                        $("#ddlcustomertype").val(List.customertypeid);
                        if (List.isosbillnotaccept == 1) {
                            $('#chkBillNotAccept').iCheck('check');
                        }
                        else {
                            $('#chkBillNotAccept').iCheck('uncheck');
                        }
                        $("#Panel_CustomerMasterEdit").modal('show');
                        $("#Modal_CustomerMasterDelete").modal('hide');
                        $("#spanCustomerMasteroper").text("Edit ");
                        setTimeout(function () {
                            $("#txtaccname").focus();
                        }, 200)
                    }
                }
            }
        });
    },
    CityAutoComplete: function () {
        try {
            debugger
            $("#ddlCity").autocomplete({
                source: function (request, response) {
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=COMMON_CITYMASTER_GET&_search=true&ISRECORDALL=1&ISACTIVE=1&searchField=CITYNAME&searchOper=cn&searchString=" + $("#ddlCity").val();
                    $.ajax({
                        url: url,
                        type: "POST",
                        async: false,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                debugger
                                var JsonObject = xml2json.parser(data);

                                if (JsonObject.serviceresponse.detailslist != undefined) {
                                    var List;
                                    if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    else
                                        List = JsonObject.serviceresponse.detailslist;
                                    debugger
                                    response(
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {

                                                return {
                                                    label: item.cityname,
                                                    value: item.cityname,
                                                    Id: item.cityid,
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.cityname,
                                                    value: item.cityname,
                                                    Id: item.cityid,
                                                }
                                            }
                                        }))
                                }
                                else {
                                    if ($("#ddlCity").val().length <= 1) {
                                        $("#ddlCity").val('');
                                        $("#hdnCityId").val('');
                                    }
                                    response([{ label: 'No Results Found', val: '' }]);
                                    $("#ddlCity").val('');
                                }
                            }
                            else {
                                if ($("#ddlCity").val().length <= 1) {
                                    $("#ddlCity").val('');
                                    $("#hdnCityId").val('');
                                }
                                response([{ label: 'No Results Found', val: '' }]);
                                notificationMessage('City Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                                $("#ddlCity").val('');
                            }
                        }
                    })
                },
                messages: {
                    noResults: "No Results Found"
                },
                select: function (event, ui) {
                    if (ui.item.label != 'No Results Found') {
                        $("#hdnCityId").val(ui.item.Id);
                    }
                    else {
                        setTimeout(function () {
                            $("#hdnCityId").val('');
                            $("#ddlCity").val('');
                            $("#ddlCity").focus();
                        }, 1);
                    }
                },
                change: function (event, ui) {
                    if (!ui.item) {
                    }
                },
                focus: function (event, ui) {
                },
                minLength: 1,
                autoFocus: true
            });
        } catch (e) {
            ErrorDetails(e, CustomerMasterView.variables.File);
        }
    },
    PartyAutoComplete: function () {
        try {
            $("#txtaccname").autocomplete({
                source: function (request, response) {
                    var myfilter = { rules: [] };
                    myfilter.rules.push({ field: "PARTYSEARCH", op: "eq", data: $("#txtaccname").val() })
                    var url = getDomain() + "/Common/BindMastersDetails?ServiceName=PARTYMASTER_GET&ISRECORDALL=1&myfilters=" + JSON.stringify(myfilter);
                    $.ajax({
                        url: url,
                        type: "POST",
                        async: false,
                        cache: false,
                        success: function (data) {
                            if ($(data).find('RESPONSECODE').text() == "0") {
                                var JsonObject = xml2json.parser(data);

                                if (JsonObject.serviceresponse.detailslist != undefined) {
                                    var List;
                                    if (JsonObject.serviceresponse.detailslist.details.length > 1)
                                        List = JsonObject.serviceresponse.detailslist.details;
                                    else
                                        List = JsonObject.serviceresponse.detailslist;
                                    response(
                                        $.map(List, function (item) {
                                            if (jQuery.type(item) == "object") {

                                                return {
                                                    label: item.partyname + "(" + item.mobile1 + ")",
                                                    value: item.partyname,
                                                }
                                            }
                                            else {
                                                return {
                                                    label: item.partyname + "(" + item.mobile1 + ")",
                                                    value: item.partyname,
                                                }
                                            }
                                        }))
                                }
                                else {
                                    var result = [
                                        {
                                            label: 'No Results Found',
                                            value: $("#txtaccname").val()
                                        }
                                    ];
                                    response(result);

                                }
                            }
                            else {
                                notificationMessage('Head Name', $(data).find('RESPONSEMESSAGE').text(), 'error');
                            }
                        }
                    })
                },
                select: function (event, ui) {
                    if (ui.item.label != 'No Results Found') {
                        setTimeout(function () {
                            $("#txtaccname").val('');
                            $("#txtaccname").focus();
                        }, 1);
                    }

                },
                minLength: 1,
                autoFocus: true
            });
        } catch (e) {
            ErrorDetails(e, Partydetailview.variables.File);
        }
    },
    askpopup: function () {
        if ($("#txt_address1").val() != "") {
            $("#divaddress").show();
            $("#chkaddress").attr("disabled", false);
            $("#divaddress").modal('show');
            $("#btnSaveaddress").focus();
            $("#divaddress").attr("flag", "1");
            $("#divaddress1").show();
        }
        else {
            $("#divaddress1").hide();
            $('#chkaddress').iCheck('uncheck');
            $("#divaddress").attr("flag", "0");
        }
    },
    Bind_IsAddress: function () {
        var myfilter,
            myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "GRIDBIND" });
        if ($("#chkisAddress").prop('checked'))
            myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });

        var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
        CustomerMasterView.initializeJqgrid(url);
    },
};

$(document).ready(function () {
    try {

        //-------------------- new code ----------------------//
        //CustomerMasterView.IntializeDatatable(CustomerMasterView.variables.BindMasterUrl);

        //CommonView.AddDataTableHeader("CustomerMasterView");
        //CommonView.AddDatepicker();

        //$('.as_edt_cls svg').click(function () {
        //    $('.as_add_data_wrap').hide();
        //});
        //-------------------- /new code ----------------------//

        $("#btnAlladdress").click(function () {
            var Tagid = []

            $.each($("#table_CustomerMaster").jqGrid('getRowData'), function (i, item) {
                if ($("#jqg_table_CustomerMaster_" + item.CUSTOMERACCID).is(':visible')) {
                    if ($("#jqg_table_CustomerMaster_" + item.CUSTOMERACCID).prop('checked')) {
                        Tagid.push(item.CUSTOMERACCID);
                    }
                }
            });

            //var Tagid = jQuery("#table_CustomerMaster").jqGrid('getGridParam', 'selarrrow');

            if (Tagid.length == 0) {
                notificationMessage('warning', 'Please select at list one checkbox.', 'warning');
                return
            }
            var data = {
                TAGID: Tagid.toString(),
                ISADDRESS: "1",
                oper: "edit"
            }
            $.ajax({
                url: getDomain() + CustomerMasterView.variables.ISAddressCRUD,
                data: data,
                async: false,
                cache: false,
                type: 'POST',
                success: CustomerMasterView.btnMasterSubmitOnSuccess,
                error: OnError
            });
        });

        $("#btnSaveaddress").click(function () {
            $('#chkaddress').iCheck('check');
            $("#divaddress").modal('hide');
            $("#divaddress").attr("flag", "0");
        });

        $("#btncloseaddress").click(function () {
            $("#divaddress").modal('hide');
            $("#divaddress").attr("flag", "0");
            $('#chkaddress').iCheck('uncheck');
        });
        //$(document).ajaxStart(function () {
        //    notificationTost('warning', 'Ajax call start.');
        //});

        var myfilter,
            myfilter = { rules: [] };
        myfilter.rules.push({ field: "TYPE", op: "eq", data: "GRIDBIND" });
        if ($("#chkisAddress").prop('checked'))
            myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });
        var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
        CustomerMasterView.initializeJqgrid(url);


        //CustomerMasterView.bindCustomerCategory();
        //CustomerMasterView.bindBalanceSheetGroup();
        //CustomerMasterView.bindCustomerType();
        //CustomerMasterView.CityAutoComplete();

        $("#btnAddNewCustomer").click(function () {
            CustomerMasterView.BindDropDown();
            $("#Panel_CustomerMasterEdit").modal('show');
            $("#ddlBalnceSheetGroup").val($('#ddlBalnceSheetGroup option:contains("SUNDRY DEBTORS")').val());
            setTimeout(function () {
                $("#txtaccname").focus();
            }, 200)

        });
        $("#btnSaveCustomerMaster").click(function () {
            CustomerMasterView.btnMasterSubmit();
        });
        $("#btnCancelCustomerMaster,#btnDeleteCancelCustomerMaster").click(function () {
            //if ($("#hdnCommonCustomerId").val()) {
            //    $("#hdnCommonCustomerId").val('');
            //    $("#idCustomerMaster i").click();
            //} else if ($("#hdnCommonNewCustomer").val() == '1') {
            //    $("#hdnCommonNewCustomer").val('');
            //    $("#hdnCommonCustomerId").val('');
            //    $("#idCustomerMaster i").click();
            //} else {
            CustomerMasterView.btnMasterCancel();
            CustomerMasterView.variables.frmvalidator.resetForm();
            //}
        });
        $("#btnDeleteCustomerMaster").click(function () {
            CustomerMasterView.btnMasterDelete();
        });
        RegisterFileUpload('BtnImageUpload', 'imgCustomer', '#BtnImageUpload-error');

        $("#CustomerimgCrop").cropper({
            aspectRatio: 1,
            preview: ".preview",
            background: false,
            minContainerWidth: 250,
            minContainerHeight: 250,
            data: {
                x: 208,
                y: 22
            }
        });

        $('#BtnImageUpload').fileupload({
            url: getDomain() + '/Helpers/Handler/FileUploadHandler.ashx',
            add: function (e, data) {
                data.submit();
            },
            success: function (response, status) {
                $('#ModelProfileImage').modal();
                $("#dpCropCanvas").html('');
                $("#CustomerimgCrop").cropper("replace", response);
            },
            error: OnError
        });

        $('.docs-buttons1').on('click', '[data-method]', function () {
            var $this = $(this);
            var data = $this.data();
            var $target;
            var result;

            result = $("#CustomerimgCrop").cropper(data.method, data.option, data.secondOption);
            switch (data.method) {
                case 'scaleX':
                case 'scaleY':
                    $(this).data('option', -data.option);
                    break;
                case 'getCroppedCanvas':
                    if (result) {
                        $('#ModelProfileImage').modal().find('#dpCropCanvas').html(result);
                        $("canvas").hide();
                        $('#ModelProfileImage').modal('hide');
                        var c = $("#dpCropCanvas").find('canvas')[0];
                        if (c != undefined) {
                            var ctx = c.getContext("2d");
                            var img = $("#CustomerimgCrop")[0];
                            ctx.drawImage(c, 0, 0);
                            img.setAttribute('crossOrigin', 'anonymous');

                            //Setting image quality
                            //var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
                            //var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
                            //var lowQuality = canvas.toDataURL('image/jpeg', 0.1);
                            var mydataURL = c.toDataURL('image/jpeg', 0.5);
                            if (mydataURL != '')
                                setTimeout(function () {
                                    $.ajax({
                                        url: getDomain() + "/Common/convertstring",
                                        data: { imagestring: mydataURL },
                                        async: false,
                                        cache: false,
                                        type: 'POST',
                                        success: function (res) {
                                            $('#imgCustomer').attr('src', res);
                                            $('#imgCustomer').data('newurl', res);
                                        },
                                        error: OnError
                                    });
                                }, 10);
                        }
                        //$(".cd-overlay").removeClass("is-visible");
                        //$(".loding-img-div").hide();
                    }
                    break;
            }
        });
        $("#txtsearchbox").keyup(function (event) {

            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                myfilter.rules.push({ field: "TYPE", op: "eq", data: "GRIDBIND" });
                if ($("#chkisAddress").prop('checked'))
                    myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });
                var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                CustomerMasterView.initializeJqgrid(url);
            }

        });
        $("#txtsearchbox").keydown(function (event) {
            if (event.ctrlKey && event.keyCode == 65) {
                searchtxt = true;
            }
            else if (event.keyCode == 8 && searchtxt == true) {
                searchtxt = false;
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "TYPE", op: "eq", data: "GRIDBIND" });
                if ($("#chkisAddress").prop('checked'))
                    myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });
                var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                CustomerMasterView.initializeJqgrid(url);
            }
            if ($("#txtsearchbox").val().length == 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "TYPE", op: "eq", data: "GRIDBIND" });
                if ($("#chkisAddress").prop('checked'))
                    myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });
                var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                var url = CustomerMasterView.variables.BindMasterUrl;
                CustomerMasterView.initializeJqgrid(url);
            }
        });

        $("#btnsearch").click(function () {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                CustomerMasterView.initializeJqgrid(url);
            }
        });


        if ($(location).attr('search').split('=')) {
            if ($(location).attr('search').split('=')[1]) {
                var id = $(location).attr('search').split('=')[1];
                CustomerMasterView.GetCustomerDetails(id);
            } else {
                CustomerMasterView.btnMasterShowAddPanel();
                $("#ddlBalnceSheetGroup").val($('#ddlBalnceSheetGroup option:contains("SUNDRY DEBTORS")').val());
            }
        }
        else {
            CustomerMasterView.btnMasterShowAddPanel();
            $("#ddlBalnceSheetGroup").val($('#ddlBalnceSheetGroup option:contains("SUNDRY DEBTORS")').val());
        }
        /*$('.mobilenomask').mask("0000000000");*/
        //if ($("#hdnCommonCustomerId").val()) {
        //    CustomerMasterView.GetCustomerDetails($("#hdnCommonCustomerId").val());
        //    $("#Panel_CustomerMasterEdit").modal('show');
        //    setTimeout(function () {
        //        $("#txtaccname").focus();
        //    }, 200)
        //} else if ($("#hdnCommonNewCustomer").val() == '1') {
        //    $("#Panel_CustomerMasterEdit").modal('show');
        //    $("#ddlBalnceSheetGroup").val($('#ddlBalnceSheetGroup option:contains("SUNDRY DEBTORS")').val());
        //    setTimeout(function () {
        //        $("#txtaccname").focus();
        //    }, 200)
        //}
        //else {

        //}
    } catch (e) {
        ErrorDetails(e, CustomerMasterView.variables.File);
    }
});

$(window).keydown(function (event) {
    try {
        if (event.keyCode == 13) {
            if ($("#txtsearchbox").val().length > 2) {
                var myfilter,
                    myfilter = { rules: [] };
                myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val() });
                if ($("#chkisAddress").prop('checked'))
                    myfilter.rules.push({ field: "ISADDRESS", op: "eq", data: $("#chkisAddress").prop('checked') });
                var url = CustomerMasterView.variables.BindMasterUrl + "&myfilters=" + JSON.stringify(myfilter);
                CustomerMasterView.initializeJqgrid(url);
            }

            if ($("#divaddress").attr("flag") == "1") {
                $('#chkaddress').iCheck('check');
                $("#divaddress").modal('hide');
                $("#txt_address2").focus();
            }

        }
        else if (event.keyCode == 27) {
            $("#divaddress").modal('hide');
            $("#txt_address2").focus();
            $("#divaddress").attr("flag", "0");
            $('#chkaddress').iCheck('uncheck');
        }
        else if (event.keyCode == 8) {

            if ($("#txtsearchbox").val().length == 1) {
                var myfilter,
                    myfilter = { rules: [] };
                /*myfilter.rules.push({ field: "SEARCH", op: "eq", data: $("#txtsearchbox").val("") });*/
                var url = CustomerMasterView.variables.BindMasterUrl // + "&myfilters=" + JSON.stringify(myfilter);
                CustomerMasterView.initializeJqgrid(url);
            }
        }
    }
    catch (e) {
        ErrorDetails(e, Purchasedetailview.variables.File);
    }
});