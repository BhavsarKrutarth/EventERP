using EventERP.CommonClasses;
using EventERP.CommonComponents;
using EventERP.EventERPReference;
using EventERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace EventERP.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Login(string msg)
        {
            var urlParameters = HttpUtility.ParseQueryString(Request.Url.Query);
            if (urlParameters.AllKeys.Contains("msg"))
            {
                string url = Request.RawUrl;
                string query = Request.Url.Query;
                ViewBag.Message = Request.QueryString["msg"];
            }
            return View();
        }

        public ActionResult LogOut()
        {
            SessionFacade.UserSession = null;
            return Content("<script>top.window.parent.location.href='" + System.Configuration.ConfigurationManager.AppSettings["domainPath"] + "/Login/Login?msg=You logged out successfully.'</script>");

        }
        public ActionResult CheckIn()
        {
            PerformCrudOperations performOper = new PerformCrudOperations();
            string XMLValue = "<SERVICEREQUEST><SERVICENAME>CHECKINCHECKOUT_CRUD</SERVICENAME>" +
                        "<ISCHECKIN>1</ISCHECKIN>" +
                        "<EMPID>" + SessionFacade.UserSession.EMPID + "</EMPID>" +
                        "<oper>add</oper>" +
                        "</SERVICEREQUEST>";

            EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
            XMLValue = proxy.PERFORM_ACTIONS(XMLValue, "CHECKINCHECKOUT_CRUD");

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(XMLValue);

            if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
            {
                SessionFacade.UserSession.ISCHECKIN = 1;
            }
            //return RedirectToAction("Dashboard", "Home");
            return RedirectToAction("DashboardDetails", "Home");

        }
        public ActionResult CheckOut()
        {
            PerformCrudOperations performOper = new PerformCrudOperations();
            string XMLValue = "<SERVICEREQUEST><SERVICENAME>CHECKINCHECKOUT_CRUD</SERVICENAME>" +
                        "<ISCHECKIN>0</ISCHECKIN>" +
                        "<EMPID>" + SessionFacade.UserSession.EMPID + "</EMPID>" +
                        "<oper>add</oper>" +
                        "</SERVICEREQUEST>";

            EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
            XMLValue = proxy.PERFORM_ACTIONS(XMLValue, "CHECKINCHECKOUT_CRUD");

            XmlDocument doc = new XmlDocument();
            doc.LoadXml(XMLValue);

            if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
            {
                SessionFacade.UserSession.ISCHECKIN = 0;
            }
            //return RedirectToAction("Dashboard", "Home");
            return RedirectToAction("DashboardDetails", "Home");

        }
        public ActionResult DoLogin(LoginViewModel model, string returnUrl)
        {
            try
            {
                string XMLValue = string.Empty;

                string publicip = CommonController.GetClientIpAddress();

                if (publicip == "::1")
                {
                    publicip = CommonController.GetLocalIPAddress();
                }

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>SECURITY_USERLOGIN_AUTHENTICATION</SERVICENAME>" +
                            "<USERNAME>" + model.UserName + "</USERNAME>" +
                            "<PASSWORD>" + model.Password + "</PASSWORD>" +
                            "<LOGINIPADDRESS>" + publicip + "</LOGINIPADDRESS>" +
                            "</SERVICEREQUEST>";

                EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue, "SECURITY_USERLOGIN_AUTHENTICATION");

                string DomainPath = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                // CODE TO READ RESPONCE AND CREATE MENU
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {
                    UserDetails objUser = new UserDetails();
                    objUser.LOGINID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//LOGINID").InnerText);
                    objUser.USERNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//USERNAME").InnerText;
                    objUser.SHORTNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//SHORTNAME").InnerText;
                    objUser.PASSWORD = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//PASSWORD").InnerText;
                    objUser.TOKEN = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//TOKEN").InnerText;
                    objUser.EMPID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPID").InnerText);
                    objUser.EMPCODE = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPCODE").InnerText;
                    objUser.MOBILENO = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//MOBILENO").InnerText;
                    objUser.FULLNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//FULLNAME").InnerText;
                    objUser.GENDER = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//GENDER").InnerText;
                    objUser.EMAILID = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMAILID").InnerText;
                    objUser.ISVOUCEHREDIT = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ISVOUCEHREDIT").InnerText;
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPDEFAULTBANKACCID") != null)
                        objUser.EMPDEFAULTBANKACCID = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPDEFAULTBANKACCID").InnerText;
                    objUser.TCSPER = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//TCSPER").InnerText;
                    objUser.TCSLIMIT = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//TCSAMTLIMIT").InnerText;
                    objUser.USERGROUPNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//USERGROUPNAME").InnerText;
                    objUser.ISCHECKIN = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ISCHECKIN").InnerText);

                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARID").InnerText) > 0)
                        {
                            objUser.ACCOUNTYEARID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARID").InnerText);
                            objUser.ACCOUNTYEAR = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEAR").InnerText;
                            objUser.ACCOUNTYEARFROMDATE = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARFROMDATE").InnerText;
                            objUser.ACCOUNTYEARTODATE = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARTODATE").InnerText;
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPBRANCHID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPBRANCHID").InnerText) > 0)
                        {
                            objUser.EMPBRANCHID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPBRANCHID").InnerText);
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//BRANCHNAME") != null)
                    {
                        objUser.EMPBRANCHNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//BRANCHNAME").InnerText;
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATENAME") != null)
                    {
                        objUser.STATENAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATENAME").InnerText;
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATEID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATEID").InnerText) > 0)
                        {
                            objUser.STATEID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATEID").InnerText);
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//COUNTERID") != null)
                    {
                        //objUser.COUNTERID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//COUNTERID").InnerText);
                        objUser.COUNTERID = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//COUNTERID").InnerText;
                    }

                    SessionFacade.UserSession = objUser;

                    /*--Geting page permision and setting it to PagePermissionList and create dynamic menu------------------------------------*/
                    List<PagePermission> Pagelist = new List<PagePermission>();
                    StringBuilder ModuleStr = new StringBuilder("");
                    XmlNodeList xmlNodeList;
                    XmlNodeList module_nodes = doc.SelectNodes("SERVICERESPONSE//DETAILSLIST//DETAILS");
                    string ModuleName = "";

                    if (module_nodes.Count > 0)
                    {
                        //ModuleStr.Append("<ul class='nav navbar-nav'><li><a id='Dashboard' href='" + DomainPath + "/Home/Dashboard'><i class='icon-display4 position-left'></i> Dashboard</a></li>");
                        ModuleStr.Append("<ul class='nav navbar-nav'><li><a id='Dashboard' href='" + DomainPath + "/Home/DashboardDetails'><i class='icon-display4 position-left'></i> Dashboard</a></li>");
                        foreach (XmlNode node in module_nodes)
                        {
                            ModuleName = node["MODULENAME"].InnerText;
                            ModuleStr.Append("<li class='dropdown mega-menu mega-menu-wide'>" +
                                "<a href=\"javascript: void(0)\" class='dropdown-toggle' data-toggle='dropdown'><i class='" + node["MODULEICON"].InnerText + " position-left'></i>" + node["MODULENAME"].InnerText
                                + "&nbsp; <span class='caret'></span></a>");

                            ModuleStr.Append("<div class='dropdown-menu dropdown-content'>" +
                                              "<div class='dropdown-content-body'>" +
                                              "<div class='row'>");

                            xmlNodeList = node["SUBMENULIST"].SelectNodes("SUBMENU"); //node.SelectNodes("SUBMENULIST");

                            foreach (XmlNode SubMenunode in xmlNodeList)
                            {
                                ModuleStr.Append("<div class='col-md-3'><span class='menu-heading underlined'>" + SubMenunode["SUBMODULENAME"].InnerText + "</span>");
                                if (SubMenunode["MENULIST"] != null)
                                {
                                    XmlNodeList xmlnodelist1 = SubMenunode["MENULIST"].SelectNodes("MENU");
                                    ModuleStr.Append("<ul class='menu-list'>");
                                    foreach (XmlNode subnode in xmlnodelist1)
                                    {
                                        // SAVING PAGE DETAILS IN SESSION
                                        var page = new PagePermission();
                                        page.ID = Convert.ToInt32(subnode["MENUID"].InnerText);
                                        page.MODULE = ModuleName;
                                        page.NAME = subnode["MENUNAME"].InnerText;
                                        page.CONTROLLER = (subnode["CONTROLLER"] == null) ? string.Empty : subnode["CONTROLLER"].InnerText;
                                        page.ACTION = (subnode["ACTION"] == null) ? string.Empty : subnode["ACTION"].InnerText;
                                        page.ISVIEW = Convert.ToInt32(subnode["ISVIEW"].InnerText);
                                        page.ISADD = Convert.ToInt32(subnode["ISADD"].InnerText);
                                        page.ISDELETE = Convert.ToInt32(subnode["ISDELETE"].InnerText);
                                        page.ISUPDATE = Convert.ToInt32(subnode["ISUPDATE"].InnerText);
                                        page.ISDOWNLOAD = Convert.ToInt32(subnode["ISDOWNLOAD"].InnerText);
                                        page.ISSAMEDAYLOCK = Convert.ToInt32(subnode["ISSAMEDAYLOCK"].InnerText);
                                        page.HSNID = (subnode["HSNID"] == null) ? 0 : Convert.ToInt32(subnode["HSNID"].InnerText);
                                        //if (subnode["HSNCODE"] != null)
                                        //{
                                        //    XmlNodeList xmlnodelist2 = subnode["HSNCODE"].SelectNodes("HSNCODELIST");
                                        //    foreach(XmlNode hsnnode in xmlnodelist2)
                                        //    {
                                        //        var hsn = new HsnCodeDetail();
                                        //        hsn.HSNCODEID = (hsnnode["DAYHSNID"] == null) ? 0 : Convert.ToInt32(hsnnode["DAYHSNID"].InnerText);
                                        //        hsn.DAYBOOKNAME = hsnnode["DAYBOOKNAME"].InnerText;
                                        //    }
                                        //}
                                        Pagelist.Add(page);
                                        string favclass = "fa-star-o";
                                        if (Convert.ToInt32(subnode["FAVORITE"].InnerText) == 1)
                                        {
                                            favclass = "fa-star";
                                        }

                                        ModuleStr.Append("<li><a href=\"javascript:void(0)\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" id=\"" + page.ACTION + "_menu\" onclick=\"addnew('/" + page.CONTROLLER + "/" + page.ACTION + "','" + page.NAME + "')\" ><i class=\"" + subnode["ICON"].InnerText + "\"></i> " + page.NAME + "</a><span id='" + page.ID + "' class='favorite_menu'><i class='fa " + favclass + "' style='font-size: 17px;'></i></span></li>");
                                    }
                                    ModuleStr.Append("</ul>");
                                    ModuleStr.Append("</div>");
                                }
                            }
                            ModuleStr.Append("</div></div></div></li>");
                        }
                        ModuleStr.Append("</ul>");
                    }
                    SessionFacade.PagePermission = Pagelist;
                    SessionFacade.MenuListstr = ModuleStr.ToString();
                    if (module_nodes.Count == 0)
                    {
                        return RedirectToAction("Login", "Login", new { msg = "GIVE PERMISSIONS TO THE PAGE." });
                    }
                    else
                    {
                        return RedirectToAction("DashboardDetails", "Home");
                    }
                    //return RedirectToAction("DashboardDetails", "Home");
                    //return RedirectToAction("Dashboard", "Home");
                }
                else
                {
                    return RedirectToAction("Login", "Login", new { msg = doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText });
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Login", "Login", new { msg = ex.Message });
            }
        }

        public ActionResult DoLogin_New(LoginViewModel model, string returnUrl)
        {
            try
            {
                string XMLValue = string.Empty;

                string publicip = CommonController.GetClientIpAddress();

                if (publicip == "::1")
                {
                    publicip = CommonController.GetLocalIPAddress();
                }

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>SECURITY_USERLOGIN_AUTHENTICATION</SERVICENAME>" +
                            "<USERNAME>" + model.UserName + "</USERNAME>" +
                            "<PASSWORD>" + model.Password + "</PASSWORD>" +
                            "<LOGINIPADDRESS>" + publicip + "</LOGINIPADDRESS>" +
                            "</SERVICEREQUEST>";

                EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue, "SECURITY_USERLOGIN_AUTHENTICATION");

                string DomainPath = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                // CODE TO READ RESPONCE AND CREATE MENU
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {
                    UserDetails objUser = new UserDetails();
                    objUser.LOGINID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//LOGINID").InnerText);
                    objUser.USERNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//USERNAME").InnerText;
                    objUser.SHORTNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//SHORTNAME").InnerText;
                    objUser.PASSWORD = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//PASSWORD").InnerText;
                    objUser.TOKEN = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//TOKEN").InnerText;
                    objUser.EMPID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPID").InnerText);
                    objUser.EMPCODE = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPCODE").InnerText;
                    objUser.MOBILENO = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//MOBILENO").InnerText;
                    objUser.FULLNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//FULLNAME").InnerText;
                    objUser.GENDER = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//GENDER").InnerText;
                    objUser.EMAILID = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMAILID").InnerText;
                    objUser.ISVOUCEHREDIT = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ISVOUCEHREDIT").InnerText;
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPDEFAULTBANKACCID") != null)
                        objUser.EMPDEFAULTBANKACCID = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPDEFAULTBANKACCID").InnerText;
                    objUser.TCSPER = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//TCSPER").InnerText;
                    objUser.TCSLIMIT = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//TCSAMTLIMIT").InnerText;
                    objUser.USERGROUPNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//USERGROUPNAME").InnerText;
                    objUser.ISCHECKIN = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ISCHECKIN").InnerText);

                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARID").InnerText) > 0)
                        {
                            objUser.ACCOUNTYEARID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARID").InnerText);
                            objUser.ACCOUNTYEAR = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEAR").InnerText;
                            objUser.ACCOUNTYEARFROMDATE = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARFROMDATE").InnerText;
                            objUser.ACCOUNTYEARTODATE = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//ACCOUNTYEARTODATE").InnerText;
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPBRANCHID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPBRANCHID").InnerText) > 0)
                        {
                            objUser.EMPBRANCHID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//EMPBRANCHID").InnerText);
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//BRANCHNAME") != null)
                    {
                        objUser.EMPBRANCHNAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//BRANCHNAME").InnerText;
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATENAME") != null)
                    {
                        objUser.STATENAME = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATENAME").InnerText;
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATEID") != null)
                    {
                        if (Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATEID").InnerText) > 0)
                        {
                            objUser.STATEID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//STATEID").InnerText);
                        }
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//COUNTERID") != null)
                    {
                        //objUser.COUNTERID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//COUNTERID").InnerText);
                        objUser.COUNTERID = doc.SelectSingleNode("SERVICERESPONSE//USERDETAILS//COUNTERID").InnerText;
                    }

                    SessionFacade.UserSession = objUser;

                    /*--Geting page permision and setting it to PagePermissionList and create dynamic menu------------------------------------*/
                    List<PagePermission> Pagelist = new List<PagePermission>();
                    StringBuilder ModuleStr = new StringBuilder("");
                    StringBuilder SubModuleStr = new StringBuilder("");
                    XmlNodeList xmlNodeList;
                    XmlNodeList module_nodes = doc.SelectNodes("SERVICERESPONSE//DETAILSLIST//DETAILS");
                    string ModuleName = "";
                    string SVG = "";

                    if (module_nodes.Count > 0)
                    {
                        //ModuleStr.Append("<ul class='nav navbar-nav'><li><a id='Dashboard' href='" + DomainPath + "/Home/DashboardDetails'><i class='icon-display4 position-left'></i> Dashboard</a></li>");
                        ModuleStr.Append("<ul>" +
                        "<li>" +
                        "<div><svg xmlns='http://www.w3.org/2000/svg' width='24' height=\"24\" class=\"nav_icn\" viewBox=\"0 0 24 24\"" +
                        "fill=\"none\">" +
                        "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\"" +
                        "d=\"M12.6139 1.21065C12.2528 0.929784 11.7472 0.929784 11.3861 1.21065L2.38606 8.21065C2.14247 8.4001 2 8.69141 2 9V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V9C22 8.69141 21.8575 8.4001 21.6139 8.21065L12.6139 1.21065ZM16 20H20V9.48908L12 3.26686L4 9.48908V20H8V12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12V20ZM10 20V13H14V20H10Z\"" +
                        "/>" +
                        "</svg><span>Dashboard</span></div>" +
                        "</li>");
                        foreach (XmlNode node in module_nodes)
                        {
                            ModuleName = node["MODULENAME"].InnerText;
                            SVG = node["SVG"].InnerText;
                            ModuleStr.Append("<li><div>" + node["SVG"].InnerText
                                + "<span>" + node["MODULENAME"].InnerText + "</span></div>");

                            ModuleStr.Append("<div class=\"sub_nav_icn\">");
                            ModuleStr.Append("<ul>");

                            xmlNodeList = node["SUBMENULIST"].SelectNodes("SUBMENU"); //node.SelectNodes("SUBMENULIST");

                            foreach (XmlNode SubMenunode in xmlNodeList)
                            {
                                ModuleStr.Append("<li onmouseover=SubMenuBind('" + SubMenunode["MODULE_SUBMODULENAME"].InnerText + "') Data=" + SubMenunode["MODULE_SUBMODULENAME"].InnerText + "><div>" + SubMenunode["SUBSVG"].InnerText + "</div><span>" + SubMenunode["SUBMODULENAME"].InnerText + "</span></li>");
                                if (SubMenunode["MENULIST"] != null)
                                {
                                    XmlNodeList xmlnodelist1 = SubMenunode["MENULIST"].SelectNodes("MENU");
                                    SubModuleStr.Append("<div id='hdn" + SubMenunode["MODULE_SUBMODULENAME"].InnerText + "'>");
                                    foreach (XmlNode subnode in xmlnodelist1)
                                    {
                                        // SAVING PAGE DETAILS IN SESSION

                                        var page = new PagePermission();
                                        page.ID = Convert.ToInt32(subnode["MENUID"].InnerText);
                                        page.MODULE = ModuleName;
                                        page.NAME = subnode["MENUNAME"].InnerText;
                                        page.CONTROLLER = (subnode["CONTROLLER"] == null) ? string.Empty : subnode["CONTROLLER"].InnerText;
                                        page.ACTION = (subnode["ACTION"] == null) ? string.Empty : subnode["ACTION"].InnerText;
                                        page.ISVIEW = Convert.ToInt32(subnode["ISVIEW"].InnerText);
                                        page.ISADD = Convert.ToInt32(subnode["ISADD"].InnerText);
                                        page.ISDELETE = Convert.ToInt32(subnode["ISDELETE"].InnerText);
                                        page.ISUPDATE = Convert.ToInt32(subnode["ISUPDATE"].InnerText);
                                        page.ISDOWNLOAD = Convert.ToInt32(subnode["ISDOWNLOAD"].InnerText);
                                        page.ISSAMEDAYLOCK = Convert.ToInt32(subnode["ISSAMEDAYLOCK"].InnerText);
                                        page.HSNID = (subnode["HSNID"] == null) ? 0 : Convert.ToInt32(subnode["HSNID"].InnerText);
                                        Pagelist.Add(page);
                                        string favclass = "";
                                        if (Convert.ToInt32(subnode["FAVORITE"].InnerText) == 1)
                                        {
                                            favclass = "starChecked";
                                        }
                                        //SubModuleStr.Append("<li data-href='/\"+ page.CONTROLLER + \"/\" + page.ACTION + \"'  class='fav_svg_a'>" +
                                        //    "<div ><span>" + page.NAME + "</span>" +   //onclick=\"addnew('/" + page.CONTROLLER + "/" + page.ACTION + "','" + page.NAME + "')\"
                                        //    "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" class='"+ favclass + "' onClick='{e => e.stopPropagation()}'>" +
                                        //    "<path d=\"m21.747 10.576-5.303 4.293 1.894 6.187c.127.253 0 .632-.252.758-.127.126-.253.126-.38.126-.125 0-.252 0-.378-.126l-5.177-3.788-5.303 3.788a.805.805 0 0 1-.758 0c-.252-.126-.379-.505-.252-.758l1.641-6.313-5.177-4.167c-.252-.126-.379-.505-.252-.757.126-.253.378-.506.63-.506h6.693l2.02-5.808c.127-.252.38-.505.632-.505s.505.253.631.505l2.147 5.808h6.566c.252 0 .505.253.631.506 0 .252-.126.505-.253.757Z\"\r\n fill-opacity=\"0\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-miterlimit=\"10\"\r\n stroke-linejoin=\"round\" />" +
                                        //    "</svg></div>" +
                                        //    "</li>");

                                        SubModuleStr.Append($"<li data-href='{DomainPath}/{page.CONTROLLER}/{page.ACTION}' onClick='navHandler(this)' id='{page.ACTION}' class='fav_svg_a'><span>{page.NAME}</span><svg xmlns='http://www.w3.org/2000/svg' class='favorite_menu {favclass}' id='{page.ID}' onmouseover='svgOverHandler(event)' onclick='svgOnclick(this)' onmouseout='svgOoutHandler()' width='14' height='14' viewBox='0 0 24 24' fill='none'> <path d='m21.747 10.576-5.303 4.293 1.894 6.187c.127.253 0 .632-.252.758-.127.126-.253.126-.38.126-.125 0-.252 0-.378-.126l-5.177-3.788-5.303 3.788a.805.805 0 0 1-.758 0c-.252-.126-.379-.505-.252-.758l1.641-6.313-5.177-4.167c-.252-.126-.379-.505-.252-.757.126-.253.378-.506.63-.506h6.693l2.02-5.808c.127-.252.38-.505.632-.505s.505.253.631.505l2.147 5.808h6.566c.252 0 .505.253.631.506 0 .252-.126.505-.253.757Z' fill-opacity='0' stroke='#000000' stroke-width='1.5' stroke-miterlimit='10' stroke-linejoin='round'></path></svg></li>");
                                    }
                                    SubModuleStr.Append("</div>");
                                }
                            }
                            ModuleStr.Append("</ul>");
                            ModuleStr.Append("</div>");
                        }
                        ModuleStr.Append("</ul>");
                    }
                    SessionFacade.PagePermission = Pagelist;
                    SessionFacade.MenuListstrNew = ModuleStr.ToString();
                    SessionFacade.SubMenuListstr = SubModuleStr.ToString();

                    if (module_nodes.Count == 0)
                    {
                        return RedirectToAction("Login", "Login", new { msg = "GIVE PERMISSIONS TO THE PAGE." });
                    }
                    else
                    {
                        return RedirectToAction("DashboardDetails", "Home");
                    }
                    //return RedirectToAction("DashboardDetails", "Home");
                    //return RedirectToAction("Dashboard", "Home");
                }
                else
                {
                    return RedirectToAction("Login", "Login", new { msg = doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText });
                }
            }
            catch (Exception ex)
            {
                return RedirectToAction("Login", "Login", new { msg = ex.Message });
            }
        }

        public void ChangeMenu()
        {
            SessionFacade.MenuListstr = HttpUtility.UrlDecode(Request.Form["Menu"]);
        }
    }
}
