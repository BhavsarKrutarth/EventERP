using System.Web;
using System.Web.Optimization;

namespace EventERP
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/assets/plugin/jquery-ui/jquery-ui.js",
                        "~/Content/assets/js/core/libraries/bootstrap.min.js",
                        "~/Content/assets/plugin/Conform/jquery-confirm.min.js",
                        "~/Content/assets/js/plugins/loaders/blockui.min.js",
                        "~/Content/assets/js/plugins/ui/nicescroll.min.js",
                        "~/Content/assets/js/plugins/ui/drilldown.js",
                        "~/Content/assets/plugin/notifications/sweet_alert.min.js",
                        "~/Content/assets/js/plugins/visualization/d3/d3.min.js",
                        "~/Content/assets/js/plugins/visualization/d3/d3_tooltip.js",
                        "~/Content/assets/js/plugins/forms/styling/switchery.min.js",
                        "~/Content/assets/js/plugins/forms/styling/uniform.min.js",
                        "~/Content/assets/js/plugins/forms/selects/bootstrap_multiselect.js",
                        "~/Content/assets/js/plugins/ui/moment/moment.min.js",
                        "~/Content/assets/plugin/jquery-validation/validator.js",
                        "~/Content/assets/plugin/JqGrid/js/i18n/grid.locale-en.js",
                        "~/Content/assets/plugin/JqGrid/js/jquery.jqGrid.min.js",
                        "~/Content/assets/plugin/JqGrid/js/jszip.min.js",
                        "~/Content/assets/plugin/JqGrid/js/jQuery.jqGrid.setColWidth.js",
                        "~/Content/assets/plugin/JSRender/jsrender.min.js",
                        "~/Content/assets/plugin/JSRender/Xml2Json.js",
                        "~/Content/assets/plugin/Toster/toastr.min.js",
                        "~/Content/assets/plugin/filupload/jquery.fileupload.js",
                        "~/Content/assets/plugin/jquery-validation/jquery.validate.js",
                        "~/Content/assets/plugin/DatePicker/js/bootstrap-datepicker.min.js",
                        "~/Content/assets/plugin/switch/js/bootstrap-switch.js",
                        "~/Content/assets/plugin/Select2/select2.min.js",
                        "~/Content/assets/plugin/iCheck/icheck.js",
                        "~/Content/assets/plugin/maskedinput/js/jquery.maskedinput.min.js",
                        "~/Content/assets/plugin/multiple-select/bootstrap-multiselect.js",
                        "~/Content/assets/plugin/pupload/js/jquery.ui.plupload.js",
                        "~/Content/assets/plugin/plupload/plupload.full.min.js",
                        "~/Content/assets/plugin/plupload/jquery.plupload.queue/jquery.plupload.queue.min.js",
                        "~/Content/assets/plugin/JqGrid/js/JqContextMenu.js",
                        "~/Content/assets/plugin/rangyinputs-jquery.js",
                        "~/Content/assets/plugin/Excel/xls.core.min.js",
                        "~/Content/assets/plugin/Excel/xlsx.core.min.js",
                        "~/Content/assets/plugin/QRCode/jquery.qrcode.min.js"

                    ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/assets/css/icons/icomoon/icomoon.css",
                        "~/Content/assets/css/bootstrap.css",
                        "~/Content/assets/plugin/Conform/jquery-confirm.min.css",
                        "~/Content/assets/css/icons/glyphicons/glyphicons.css",
                        "~/Content/assets/css/components.css",
                        "~/Content/assets/css/colors.css",
                        "~/Content/assets/css/icons/fontawesome/styles.min.css",
                        "~/Content/assets/plugin/DatePicker/css/datepicker.css",
                        "~/Content/assets/plugin/DatePicker/css/bootstrap-datetimepicker.css",
                        "~/Content/assets/plugin/JqGrid/css/ui.jqgrid.css",
                        "~/Content/assets/plugin/JqGrid/css/Layout-jqgrid.css",
                        "~/Content/assets/plugin/Toster/toastr.min.css",
                        "~/Content/assets/plugin/filupload/jquery.fileupload.css",
                        "~/Content/assets/plugin/Select2/select2.min.css",
                        "~/Content/assets/plugin/iCheck/blue.css",
                        "~/Content/assets/plugin/switch/css/bootstrap-switch.css",
                        "~/Content/assets/plugin/multiple-select/bootstrap-multiselect.css",
                        "~/Content/assets/plugin/pupload/css/jquery.ui.plupload.css",
                        "~/Content/assets/plugin/plupload/jquery.plupload.queue/css/jquery.plupload.queue.css",
                        "~/Content/assets/plugin/RightClick/css/contextMenu.css",
                        "~/Content/assets/css/Custom.css"
                     ));


            bundles.Add(new ScriptBundle("~/bundles/newjquery").Include(
                    "~/Content/assets/Customjs/jquery-3.6.3.min.js"
                   , "~/Content/assets/plugin/jquery-ui/jquery-ui.js"
                   , "~/Content/assets/Customjs/jquery.dataTables.min.js"

                   , "~/Content/assets/plugin/JqGrid/js/i18n/grid.locale-en.js"
                   , "~/Content/assets/plugin/JqGrid/js/jquery.jqGrid.min.js"
                   , "~/Content/assets/plugin/JqGrid/js/jszip.min.js"
                   , "~/Content/assets/plugin/JqGrid/js/jQuery.jqGrid.setColWidth.js"

                   , "~/Content/assets/Customjs/moment.min.js"
                   , "~/Content/assets/Customjs/daterangepicker.min.js"
                   , "~/Content/assets/plugin/notifications/sweet_alert.min.js"
                   , "~/Content/assets/plugin/JSRender/jsrender.min.js"
                   , "~/Content/assets/plugin/JSRender/Xml2Json.js"
                   , "~/Content/assets/plugin/maskedinput/js/jquery.maskedinput.min.js"
                   , "~/Content/assets/plugin/jquery-validation/validator.js"
                   , "~/Content/assets/plugin/jquery-validation/jquery.validate.js"

            //,"~/Content/assets/Customjs/commonscript.js"
            //,"~/Scripts/Common/Common.js"
            ));

            bundles.Add(new StyleBundle("~/Content/newcss").Include(
                    "~/Content/assets/css/jquery.dataTables.min.css"

                   , "~/Content/assets/plugin/JqGrid/css/ui.jqgrid.css"
                   , "~/Content/assets/plugin/JqGrid/css/Layout-jqgrid.css"

                   , "~/Content/assets/css/daterangepicker.css"
                   , "~/Content/assets/plugin/notifications/sweet_alert.css"
                   , "~/Content/assets/Customcss/variable.css"
                   , "~/Content/assets/Customcss/cssFramework.css"
                   , "~/Content/assets/Customcss/common.css"
            ));

            BundleTable.EnableOptimizations = false;
        }
    }
}
