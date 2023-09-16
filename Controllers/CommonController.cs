using EventERP.CommonClasses;
using EventERP.CommonComponents;
using EventERP.EventERPReference;

using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace EventERP.Controllers
{
    public class CommonController : Controller
    {
        public string BindMastersDetails()
        {
            try
            {
                string XMLValue = string.Empty;
                CommonGridParams parms = new CommonGridParams();
                int Mid = 0;
                Mid = FormPermissionHelper.GetFormMID(HttpContext);
                parms.Mid = Mid.ToString();
                parms.PageIndex = Convert.ToString(Request.QueryString["page"]);
                parms.draw = Convert.ToString(Request.QueryString["draw"]);
                parms.PageSize = Convert.ToString(Request.QueryString["rows"]);
                parms.SortColumn = Convert.ToString(Request.QueryString["sidx"]);
                parms.SortOrder = Convert.ToString(Request.QueryString["sord"]);
                parms.ColumnRequested = Request.QueryString["ColumnRequested"];
                parms.ServiceName = Request.QueryString["ServiceName"];
                parms.JsonConvert = Request.QueryString["JsonConvert"];

                if (Request.Form["XMLPARAM"] != null)
                    parms.XmlParam = Request.Form["XMLPARAM"];

                if (Request.QueryString["IsRecordAll"] != null && Request.QueryString["IsRecordAll"] != "")
                {
                    parms.IsRecordAll = Convert.ToString(Request.QueryString["IsRecordAll"]);
                }

                if (Request.QueryString["IsActive"] != null && Request.QueryString["IsActive"] != "")
                {
                    parms.IsActive = Convert.ToString(Request.QueryString["IsActive"]);
                }

                if (Request.QueryString["_search"] != null && Request.QueryString["_search"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_search"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                        {
                            string searchString = Request.QueryString["searchString"].ToString();
                            searchString = searchString.Replace("<", "&lt;");
                            searchString = searchString.Replace("&", "&amp;");
                            parms.SearchKeyword = searchString;
                        }

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }

                if (Request.QueryString["_gridsearch"] != null && Request.QueryString["_gridsearch"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_gridsearch"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                            parms.SearchKeyword = Request.QueryString["searchString"].ToString();

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }

                //string DataMatch = string.Empty;
                //Regex r = new Regex(@"^\+?\d{0,2}\-?\d{4,5}\-?\d{5,6}");


                if (Request.QueryString["myfilters"] != null)
                    parms.MyFilters = Request.QueryString["myfilters"].ToString();

                GenerateXml xmlGenerator = new GenerateXml();
                string ChildNodes = xmlGenerator.GenerateCommonRequestNodes(parms);
                string RequestNodes = xmlGenerator.FinalXml("SERVICEREQUEST", ChildNodes);

                EventErp_InterfaceClient client = new EventErp_InterfaceClient();
                XMLValue = client.PERFORM_ACTIONS(RequestNodes, parms.ServiceName);
                client.Close();
                if (parms.JsonConvert == "JSON" || parms.JsonConvert == "json")
                {
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml(XMLValue);

                    // Convert XmlDocument to JSON string
                    string jsonString = JsonConvert.SerializeXmlNode(xmlDoc);
                    return jsonString;
                }
                else
                {
                    return XMLValue;
                }

            }
            catch (Exception ex)
            {
                ErrorCsharp(ex, "BindMastersDetails");
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public string OpeartionsOnMaster(string ServiceName, string Jewellery)
        {
            try
            {
                string XMLValue = string.Empty;
                int Mid = 0;
                Mid = FormPermissionHelper.GetFormMID(HttpContext);

                System.Collections.Specialized.NameValueCollection forms = new System.Collections.Specialized.NameValueCollection();

                forms.Add("MID", Mid.ToString());
                forms.Add(Request.Form);

                if (Jewellery != null)
                    if (Jewellery != "0")
                    {
                        var fileStream = new FileStream(@"E:\Project_21\EventERP\EventERP\Readmeip.txt", FileMode.Open, FileAccess.Read);
                        using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
                        {
                            string text;
                            text = streamReader.ReadToEnd();
                            //forms.Add("JEWELLERYTEXT", text);

                            string[] textSplits = text.Split('\n');
                            string data1 = textSplits[0];
                            forms.Add("DATA1", data1);
                            string data2 = textSplits[1];
                            forms.Add("DATA2", data2);
                            string data3 = textSplits[2];
                            forms.Add("DATA3", data3);
                            //foreach (var textSplit in textSplits)
                            //{
                            //    Console.WriteLine(textSplit);// process the line
                            //    Console.WriteLine("================");// process the line
                            //}
                        }
                    }

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = performOper.PerformOpeartions(forms, "SERVICEREQUEST", ServiceName);

                //if (Request.QueryString["JsonConvert"] == "JSON")
                //{
                //    XmlDocument xmlDoc = new XmlDocument();
                //    xmlDoc.LoadXml(XMLValue);

                //    // Convert XmlDocument to JSON string
                //    string jsonString = JsonConvert.SerializeXmlNode(xmlDoc);
                //    return jsonString;
                //}
                //else
                //{
                return XMLValue;
                //}
            }
            catch (Exception ex)
            {
                ErrorCsharp(ex, "OpeartionsOnMaster");
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        public string BindMasterDetailsById(string ServiceName)
        {
            try
            {
                string XMLValue = string.Empty;
                int Mid = 0;

                Mid = FormPermissionHelper.GetFormMID(HttpContext);

                CommonGridParams parms = new CommonGridParams();

                parms.Mid = Mid.ToString();
                parms.PageIndex = Convert.ToString(Request.QueryString["page"]);
                parms.PageSize = Convert.ToString(Request.QueryString["rows"]);
                parms.SortColumn = Convert.ToString(Request.QueryString["sidx"]);
                parms.SortOrder = Convert.ToString(Request.QueryString["sord"]);
                parms.ServiceName = ServiceName;
                if (Request.QueryString["IsRecordAll"] != null && Request.QueryString["IsRecordAll"] != "")
                {
                    parms.IsRecordAll = Convert.ToString(Request.QueryString["IsRecordAll"]);
                }
                //check if the operation is a search (if true then search else it is Retrive data ) 
                bool search = Convert.ToBoolean(Request.QueryString["_search"].ToString());
                if (search == true)
                {
                    //gets the search string that u have entered
                    parms.SearchKeyword = Request.QueryString["searchString"].ToString();

                    //get the name of the column that u r searching for
                    parms.SearchColumn = Request.QueryString["searchField"].ToString();

                    //specifies the operation that u are searching the records on 
                    parms.SearchOper = Request.QueryString["searchOper"].ToString();
                    ////set the boolean value as true
                    //string searchbool = "true";
                }

                // for multi colum search operation
                if (Request.QueryString["filters"] != null)
                    parms.Filters = Request.QueryString["filters"].ToString();

                GenerateXml xmlGenerator = new GenerateXml();
                string ChildNodes = xmlGenerator.GenerateCommonRequestNodes(parms);
                string RequestNodes = xmlGenerator.FinalXml("SERVICEREQUEST", ChildNodes);
                if (Request.QueryString["COMMONMASTERID"] != null && Request.QueryString["COMMONMASTERID"] != "")
                {
                    string AdditionalNodes = "<COMMONMASTERID>" + Convert.ToString(Request.QueryString["COMMONMASTERID"]) + "</COMMONMASTERID>";
                    string NewRequestXml = xmlGenerator.AddAdditionalNodesToXmlString(RequestNodes, AdditionalNodes);
                    RequestNodes = NewRequestXml;
                }
                EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(RequestNodes, ServiceName);

                return XMLValue;
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        public string SetAccountYearBranchSession(int AccountYearId, int BranchId, string BranchName, string AccountYear)
        {
            try
            {
                string XMLValue = string.Empty;
                string XMLMenuValue = string.Empty;
                string DecryptPass = string.Empty;

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>COMMON_EMP_CURRENTACCOUNTYEAR_CRUD</SERVICENAME>" +
                            "<EMPID>" + SessionFacade.UserSession.EMPID + "</EMPID>" +
                            "<TOKEN>" + SessionFacade.UserSession.TOKEN + "</TOKEN>" +
                            "<FILTERACCOUNTYEARID>" + AccountYearId + "</FILTERACCOUNTYEARID>" +
                            "<FILTERBRANCHID>" + BranchId + "</FILTERBRANCHID>" +
                            "<oper>View</oper>" +
                            "<LOGINID>" + SessionFacade.UserSession.LOGINID + "</LOGINID>" +
                            "<MID>" + FormPermissionHelper.GetFormMID(HttpContext) + "</MID>" +
                            "</SERVICEREQUEST>";

                EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue, "COMMON_EMP_CURRENTACCOUNTYEAR_CRUD");
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {
                    SessionFacade.UserSession.ACCOUNTYEARID = AccountYearId;
                    SessionFacade.UserSession.EMPBRANCHID = BranchId;
                    SessionFacade.UserSession.EMPBRANCHNAME = BranchName;
                    SessionFacade.UserSession.ACCOUNTYEAR = AccountYear;

                    if (doc.SelectSingleNode("SERVICERESPONSE//FROMDATE").InnerText != null)
                    {
                        SessionFacade.UserSession.ACCOUNTYEARFROMDATE = doc.SelectSingleNode("SERVICERESPONSE//FROMDATE").InnerText;
                    }
                    if (doc.SelectSingleNode("SERVICERESPONSE//TODATE").InnerText != null)
                    {
                        SessionFacade.UserSession.ACCOUNTYEARTODATE = doc.SelectSingleNode("SERVICERESPONSE//TODATE").InnerText;
                    }
                    return doc.InnerXml.ToString();

                }
                return doc.InnerXml.ToString();
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        public JsonResult Custome_FileDelete(string deletedfiles, string filepath)
        {
            // delete files from directory
            if (deletedfiles != string.Empty)
            {
                string[] deletedfilesArr = deletedfiles.Split(',');
                if (deletedfilesArr.Length > 0)
                {
                    int i = 0;
                    for (; i < deletedfilesArr.Length; i++)
                    {
                        if (deletedfilesArr[i] != string.Empty)
                        {
                            if (deletedfilesArr[i].Contains("/UploadFiles/Temp/"))
                            {
                                string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                if (System.IO.File.Exists(deleteFilePath))
                                    System.IO.File.Delete(deleteFilePath);
                            }
                            string destFile = "~/UploadFiles/" + "/" + filepath + "/";
                            string destServerpath = Server.MapPath(destFile + deletedfilesArr[i]);
                            //string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                            if (System.IO.File.Exists(destServerpath))
                                System.IO.File.Delete(destServerpath);
                        }
                    }
                }
            }
            return Json("success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveImage(string category, string deletedfiles, string savefiles)
        {
            try
            {
                string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                if (VirtualDirectory != "")
                {
                    if (!string.IsNullOrEmpty(deletedfiles))
                    { deletedfiles = deletedfiles.Replace(VirtualDirectory, ""); }

                    if (!string.IsNullOrEmpty(savefiles))
                    { savefiles = savefiles.Replace(VirtualDirectory, ""); }
                }

                // delete files from directory
                if (deletedfiles != string.Empty)
                {
                    string[] deletedfilesArr = deletedfiles.Split(',');
                    if (deletedfilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < deletedfilesArr.Length; i++)
                        {
                            if (deletedfilesArr[i] != string.Empty)
                            {
                                if (deletedfilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                    if (System.IO.File.Exists(deleteFilePath))
                                        System.IO.File.Delete(deleteFilePath);
                                }
                                string destFile = "~/UploadFiles/" + "/" + category + "/";
                                string destServerpath = Server.MapPath(destFile + deletedfilesArr[i]);
                                //string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                if (System.IO.File.Exists(destServerpath))
                                    System.IO.File.Delete(destServerpath);
                            }
                        }
                    }
                }

                if (savefiles != string.Empty)
                {
                    string destFile = "~/UploadFiles/" + "/" + category + "/";
                    string destServerpath = Server.MapPath(destFile);

                    if (!System.IO.Directory.Exists(destServerpath))
                        System.IO.Directory.CreateDirectory(destServerpath);

                    // Save file to Original folder
                    string[] savefilesArr = savefiles.Split(',');
                    string savefilePath;
                    if (savefilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < savefilesArr.Length; i++)
                        {
                            if (savefilesArr[i] != string.Empty)
                            {
                                if (savefilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    savefilePath = Server.MapPath("~" + savefilesArr[i]);
                                    if (System.IO.File.Exists(savefilePath))
                                    {
                                        if (System.IO.File.Exists(destServerpath + System.IO.Path.GetFileName(savefilesArr[i])) == false)
                                            System.IO.File.Copy(savefilePath, destServerpath + System.IO.Path.GetFileName(savefilesArr[i]));

                                        System.IO.File.Delete(savefilePath);
                                    }
                                }
                            }
                        }
                    }
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult SaveSingleImage(string originalfile, string newfile, string oper, bool isResize, string module)
        {
            string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];
            if (VirtualDirectory != "")
            {
                if (!string.IsNullOrEmpty(originalfile))
                { originalfile = originalfile.Replace(VirtualDirectory, ""); }

                if (!string.IsNullOrEmpty(newfile))
                { newfile = newfile.Replace(VirtualDirectory, ""); }
            }

            string newfilePath = Server.MapPath("~" + newfile);
            string originalfilePath = Server.MapPath("~" + originalfile);

            if (newfile != null && newfile.Contains("/UploadFiles/") && (oper == "Add" || oper == "Delete" || oper == "Edit"))
            {
                string destFile = "/UploadFiles/" + module + "/"; // /" + SessionFacade.Client + "
                string destServerpath = Server.MapPath("~" + destFile);
                try
                {
                    if (!Directory.Exists(destServerpath))
                    {
                        Directory.CreateDirectory(destServerpath);
                    }
                    if (System.IO.File.Exists(newfilePath))
                    {
                        if ((oper != "Delete" && oper != "Edit") || (oper == "Edit" && newfilePath != originalfilePath))
                            System.IO.File.Copy(newfilePath, destServerpath + Path.GetFileName(newfile));

                        if (isResize) { }

                        if (oper == "Delete" || (oper == "Edit" && newfilePath != originalfilePath) || oper == "Add")
                        {
                            System.IO.File.Delete(newfilePath); // delete Temp file
                            if (System.IO.File.Exists(originalfilePath)) // delete old file
                                System.IO.File.Delete(originalfilePath);
                            string deleteFile = Path.GetDirectoryName(originalfilePath) + "\\Resize\\" + Path.GetFileName(originalfile);
                            if (System.IO.File.Exists(deleteFile)) // delete resized file
                                System.IO.File.Delete(deleteFile);
                        }
                    }
                }
                catch (Exception ex)
                {
                    ErrorCsharp(ex, "SaveSingleImage");
                    return Json("error", JsonRequestBehavior.AllowGet);
                }
                return Json(System.IO.Path.GetFileName(newfile), JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (newfile == null)
                    newfile = "";
                return Json(System.IO.Path.GetFileName(newfile), JsonRequestBehavior.AllowGet);
            }
        }

        public void ErrorCsharp(Exception error, string filename)
        {
            string XMLValue = string.Empty;
            string Msg = error.Message;
            string errprmsg = error.StackTrace;
            string msgline = string.Empty;
            int index = errprmsg.IndexOf("\\Controllers\\");
            if (index > 0)
                msgline = errprmsg.Substring(index);

            PerformCrudOperations performOper = new PerformCrudOperations();
            XMLValue = "<SERVICEREQUEST><SERVICENAME>COMMON_WEB_ERROR_ENTRY</SERVICENAME>" +
                        "<ERRORLINE>" + msgline + "</ERRORLINE>" +
                        "<ERRORMESSAGE>" + Msg + "</ERRORMESSAGE>" +
                        "<ERRORFROM>web</ERRORFROM>" +
                        "<ERRORPROCEDURE>" + filename + "</ERRORPROCEDURE>" +
                        "<BROWSER>" + GetBrowserInfo() + "</BROWSER>" +
                        "<IPADDRESS>" + GetClientIpAddress() + "</IPADDRESS>" +
                        "</SERVICEREQUEST>";

            EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
            XMLValue = proxy.PERFORM_ACTIONS(XMLValue, "COMMON_WEB_ERROR_ENTRY");
        }

        public string ErrorJS(int line, string msg, string filename)
        {
            string XMLValue = string.Empty;
            PerformCrudOperations performOper = new PerformCrudOperations();
            XMLValue = "<SERVICEREQUEST><SERVICENAME>COMMON_WEB_ERROR_ENTRY</SERVICENAME>" +
                        "<ERRORLINE>" + line + "</ERRORLINE>" +
                        "<ERRORMESSAGE>" + msg + "</ERRORMESSAGE>" +
                        "<ERRORFROM>web</ERRORFROM>" +
                        "<ERRORPROCEDURE>" + filename + "</ERRORPROCEDURE>" +
                        "<BROWSER>" + GetBrowserInfo() + "</BROWSER>" +
                        "<IPADDRESS>" + GetClientIpAddress() + "</IPADDRESS>" +
                        "</SERVICEREQUEST>";

            EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
            XMLValue = proxy.PERFORM_ACTIONS(XMLValue, "COMMON_WEB_ERROR_ENTRY");
            return XMLValue;
        }

        public static string GetBrowserInfo()
        {
            System.Web.HttpBrowserCapabilities browser = System.Web.HttpContext.Current.Request.Browser;
            string s = "Browser Capabilities\n"
                + "Type = " + browser.Type + "\n"
                + "Name = " + browser.Browser + "\n"
                + "Version = " + browser.Version + "\n"
                + "Major Version = " + browser.MajorVersion + "\n"
                + "Minor Version = " + browser.MinorVersion + "\n"
                + "Platform = " + browser.Platform + "\n"
                + "Is Beta = " + browser.Beta + "\n"
                + "Is Crawler = " + browser.Crawler + "\n"
                + "Is AOL = " + browser.AOL + "\n"
                + "Is Win16 = " + browser.Win16 + "\n"
                + "Is Win32 = " + browser.Win32 + "\n"
                + "Supports VBScript = " + browser.VBScript + "\n"
                + "Supports JavaScript = " +
                    browser.EcmaScriptVersion.ToString() + "\n"
                + "Supports JavaScript Version = " + browser["JavaScriptVersion"] + "\n";
            return s;
        }

        public static string GetClientIpAddress()
        {
            HttpRequest request = System.Web.HttpContext.Current.Request;
            try
            {
                var userHostAddress = request.UserHostAddress;
                IPAddress.Parse(userHostAddress);

                var xForwardedFor = request.ServerVariables["X_FORWARDED_FOR"];

                if (string.IsNullOrEmpty(xForwardedFor))
                    return userHostAddress;

                var publicForwardingIps = xForwardedFor.Split(',').Where(ip => !IsPrivateIpAddress(ip)).ToList();

                return publicForwardingIps.Any() ? publicForwardingIps.Last() : userHostAddress;
            }
            catch (Exception)
            {
                return "0.0.0.0";
            }
        }

        public static bool IsPrivateIpAddress(string ipAddress)
        {
            var ip = IPAddress.Parse(ipAddress);
            var octets = ip.GetAddressBytes();

            var is24BitBlock = octets[0] == 10;
            if (is24BitBlock) return true;

            var is20BitBlock = octets[0] == 172 && octets[1] >= 16 && octets[1] <= 31;
            if (is20BitBlock) return true;

            var is16BitBlock = octets[0] == 192 && octets[1] == 168;
            if (is16BitBlock) return true;

            var isLinkLocalAddress = octets[0] == 169 && octets[1] == 254;
            return isLinkLocalAddress;
        }

        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("Local IP Address Not Found!");//output 192.168.0.120
        }

        public string convertstring(string imagestring)
        {
            string DomainPath = System.Configuration.ConfigurationManager.AppSettings["domainPath"];
            string destFile = "/UploadFiles/Temp/";
            string destServerpath = Server.MapPath("~" + destFile);
            int index = imagestring.IndexOf(',');
            string final = imagestring.Substring(index + 1);
            string imgname = Guid.NewGuid() + ".jpg".ToString();
            System.IO.File.WriteAllBytes(destServerpath + imgname, Convert.FromBase64String(final));
            return DomainPath + destFile + imgname;
        }

        public int SessionCheck()
        {
            if (SessionFacade.UserSession == null)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        public JsonResult GetDataFromExcelFile(string FilePath)
        {
            try
            {
                DataTable dt = new DataTable();
                dt = GenrateNodeFromExcelFile.GenrateNodeFromExcel(FilePath);
                string JSONString = string.Empty;
                JSONString = JsonConvert.SerializeObject(dt);
                return Json(JSONString, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ErrorCsharp(ex, "GetDataFromExcelFile");
                return Json("error", JsonRequestBehavior.AllowGet);
            }
        }

        //--------------------------------------------PRN formate Print-----------------------------------------------
        //[HttpPost]
        //[ValidateInput(false)]
        //public string PRNTagPrint(string ServiceName, string FileName)
        //{
        //    string downloadpath = "";
        //    //string FileName = "";
        //    string XMLString;
        //    string destFile = "/UploadFiles/TagPrint/";
        //    string destServerpath = Server.MapPath("~" + destFile);
        //    Random r = new Random();
        //    int random = r.Next(999);
        //    try
        //    {
        //        int Mid = 0;
        //        Mid = FormPermissionHelper.GetFormMID(HttpContext);

        //        System.Collections.Specialized.NameValueCollection forms = new System.Collections.Specialized.NameValueCollection();

        //        forms.Add("MID", Mid.ToString());
        //        forms.Add(Request.Form);

        //        PerformCrudOperations performOper = new PerformCrudOperations();
        //        XMLString = performOper.PerformOpeartions(forms, "SERVICEREQUEST", ServiceName);
        //        XmlDocument doc = new XmlDocument();
        //        doc.LoadXml(XMLString);
        //        string FinalFilename = "";
        //        var file = "";
        //        FinalFilename = FileName + random;
        //        downloadpath = destFile + FinalFilename + ".prn";
        //        if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0")
        //        {
        //            var prnformat = doc.SelectSingleNode("SERVICERESPONSE//PRNCONTENT").InnerText;
        //            file = destServerpath + FinalFilename + ".prn";
        //            if (!Directory.Exists(destServerpath))
        //                Directory.CreateDirectory(destServerpath);
        //            System.IO.File.WriteAllText(file, prnformat);
        //        }
        //        else
        //        {
        //            downloadpath = "Error: " + doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText;
        //        }
        //        return downloadpath;
        //    }
        //    catch (Exception e)
        //    {
        //        downloadpath = e.Message.ToString();
        //    }
        //    return downloadpath;
        //}


      

        List<string> printers = new List<string>();

        class PrintSpoolerApi
        {
            [DllImport("winspool.drv", SetLastError = true, CharSet = CharSet.Auto)]
            public static extern bool OpenPrinter(
                [MarshalAs(UnmanagedType.LPTStr)]
            string printerName,
                out IntPtr printerHandle,
                PrinterDefaults printerDefaults);

            [DllImport("winspool.drv", SetLastError = true, CharSet = CharSet.Auto)]
            public static extern bool GetPrinter(
                IntPtr printerHandle,
                int level,
                IntPtr printerData,
                int bufferSize,
                ref int printerDataSize);

            [DllImport("winspool.drv", SetLastError = true, CharSet = CharSet.Auto)]
            public static extern bool ClosePrinter(
                IntPtr printerHandle);

            [StructLayout(LayoutKind.Sequential)]
            public struct PrinterDefaults
            {
                public IntPtr pDatatype;
                public IntPtr pDevMode;
                public int DesiredAccess;
            }

            //public enum PrinterProperty
            //{
            //    ServerName,
            //    PrinterName,
            //    ShareName,
            //    PortName,
            //    DriverName,
            //    Comment,
            //    Location,
            //    PrintProcessor,
            //    Datatype,
            //    Parameters,
            //    Attributes,
            //    Priority,
            //    DefaultPriority,
            //    StartTime,
            //    UntilTime,
            //    Status,
            //    Jobs,
            //    AveragePpm
            //};

            public struct PrinterInfo2
            {
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string ServerName;
                [MarshalAs(UnmanagedType.LPTStr)]
                public string PrinterName;
                [MarshalAs(UnmanagedType.LPTStr)]
                public string ShareName;
                [MarshalAs(UnmanagedType.LPTStr)]
                public string PortName;
                public uint Status;
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string DriverName;
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string Comment;
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string Location;
                //public IntPtr DevMode;
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string SepFile;
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string PrintProcessor;
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string Datatype;
                //[MarshalAs(UnmanagedType.LPTStr)]
                //public string Parameters;
                //public IntPtr SecurityDescriptor;
                //public uint Attributes;
                //public uint Priority;
                //public uint DefaultPriority;
                //public uint StartTime;
                //public uint UntilTime;
                //public uint Jobs;
                //public uint AveragePpm;
            }

            public static PrinterInfo2 GetPrinterProperty(string printerUncName)
            {
                var printerInfo2 = new PrinterInfo2();

                var pHandle = new IntPtr();
                var defaults = new PrinterDefaults();
                try
                {
                    //Open a handle to the printer
                    bool ok = OpenPrinter(printerUncName, out pHandle, defaults);
                    if (!ok)
                    {
                        //OpenPrinter failed, get the last known error and thrown it
                        throw new Win32Exception(Marshal.GetLastWin32Error());
                    }
                    //Here we determine the size of the data we to be returned
                    //Passing in 0 for the size will force the function to return the size of the data requested
                    int actualDataSize = 0;
                    GetPrinter(pHandle, 2, IntPtr.Zero, 0, ref actualDataSize);

                    int err = Marshal.GetLastWin32Error();

                    if (err == 122)
                    {
                        if (actualDataSize > 0)
                        {
                            //Allocate memory to the size of the data requested
                            IntPtr printerData = Marshal.AllocHGlobal(actualDataSize);
                            //Retrieve the actual information this time
                            GetPrinter(pHandle, 2, printerData, actualDataSize, ref actualDataSize);

                            //Marshal to our structure
                            printerInfo2 = (PrinterInfo2)Marshal.PtrToStructure(printerData, typeof(PrinterInfo2));
                            //We've made the conversion, now free up that memory
                            Marshal.FreeHGlobal(printerData);
                        }
                    }
                    else
                    {
                        throw new Win32Exception(err);
                    }
                    return printerInfo2;
                }
                finally
                {
                    //Always close the handle to the printer
                    ClosePrinter(pHandle);
                }
            }
        }


        //--------------------------------------Tag Scan--------------------------------------//
        string Status = "";

        public object RfcommDeviceService { get; private set; }
        public object RfcommServiceId { get; private set; }


        public void WhatsappShare(string Mobileno, string File)
        {
            System.Diagnostics.Process.Start("http://api.whatsapp.com/send?phone=+917043422211&text=SayHello&pdf=http://192.168.1.2/EventERP/UploadFiles/TaxInvoice/508078d1-b441-4d62-a6b1-90e28cd6092b.pdf");
        }

        

    }
}