using EventERP.CommonClasses;
using EventERP.Filters;
using EventERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace EventERP.CommonComponents
{
    public class FormPermissionHelper
    {
        public static void GetControllerAction(HttpContextBase httpContext, ref string controller, ref string action)
        {
            if (httpContext.Request.IsAjaxRequest())
            {
                string url = "/Login/Login";
                //url = httpContext.Request.UrlReferrer.LocalPath;

                if (System.Configuration.ConfigurationManager.AppSettings["domainPath"] != "")
                    url = httpContext.Request.UrlReferrer.LocalPath.Replace(System.Configuration.ConfigurationManager.AppSettings["domainPath"], "");
                else
                    url = httpContext.Request.UrlReferrer.LocalPath;

                if (!string.IsNullOrEmpty(url))
                {
                    if (url.Contains('/'))
                    {
                        int cnt = url.Count(c => c == '/');
                        string[] decodeurl = url.Split('/');

                        controller = decodeurl[1];

                        if (cnt > 1)
                            action = decodeurl[2];
                        else
                            action = "Index";

                        if (action.Contains("?"))
                        {
                            string[] decodeaction = action.Split('?');
                            action = decodeaction[0];
                        }
                    }
                    else
                    {
                        controller = url;
                        action = "Login";
                    }
                }
            }
            else
            {
                var routeData = ((MvcHandler)httpContext.Handler).RequestContext.RouteData;
                controller = (string)routeData.Values["controller"];
                action = (string)routeData.Values["action"];
            }
        }

        public static bool CheckFormPermission(string action, string controller)
        {
            bool isAllowed = false;
            if (SessionFacade.PagePermission != null && SessionFacade.PagePermission.Count() > 0)
            {
                var permission = SessionFacade.PagePermission.Where(t => t.CONTROLLER.ToLower().Equals(controller.ToLower()) && t.ACTION.ToLower().Equals(action.ToLower()));
                if (permission != null && permission.Count() > 0)
                {
                    isAllowed = permission.FirstOrDefault().ISVIEW == 1 ? true : false;
                }

                if (isAllowed == false)
                {
                    isAllowed = DefaultAccessMethodlist.CheckIsDefaultAccess(controller, action);
                }
            }
            return isAllowed;
        }

        public static PagePermission GetFormPermission(string action, string controller)
        {
            PagePermission ObjPermission = new PagePermission();

            if (SessionFacade.PagePermission != null && SessionFacade.PagePermission.Count() > 0)
            {
                var permission = SessionFacade.PagePermission.Where(t => t.CONTROLLER.ToLower().Equals(controller.ToLower()) && t.ACTION.ToLower().Equals(action.ToLower()));
                if (permission != null && permission.Count() > 0)
                {
                    ObjPermission.ID = permission.FirstOrDefault().ID;
                    ObjPermission.MODULE = permission.FirstOrDefault().MODULE;
                    ObjPermission.NAME = permission.FirstOrDefault().NAME;
                    ObjPermission.HSNID = permission.FirstOrDefault().HSNID;
                    ObjPermission.CONTROLLER = permission.FirstOrDefault().CONTROLLER;
                    ObjPermission.ACTION = permission.FirstOrDefault().ACTION;
                    ObjPermission.ISVIEW = permission.FirstOrDefault().ISVIEW;
                    ObjPermission.ISADD = permission.FirstOrDefault().ISADD;
                    ObjPermission.ISUPDATE = permission.FirstOrDefault().ISUPDATE;
                    ObjPermission.ISDELETE = permission.FirstOrDefault().ISDELETE;
                    ObjPermission.ISDOWNLOAD = permission.FirstOrDefault().ISDOWNLOAD;
                    ObjPermission.ISSAMEDAYLOCK = permission.FirstOrDefault().ISSAMEDAYLOCK;
                }
            }

            return ObjPermission;
        }

        public class JsonStringResult : ContentResult
        {
            public JsonStringResult(string json)
            {
                Content = json;
                ContentType = "application/json";
            }
        }

        public static int GetFormMID(HttpContextBase httpContext)
        {
            string controller = string.Empty;
            string action = string.Empty;
            int Mid = 0;
            // Getting controller, action name from request URL
            GetControllerAction(httpContext, ref controller, ref action);

            if (SessionFacade.PagePermission != null && SessionFacade.PagePermission.Count() > 0)
            {
                var permission = SessionFacade.PagePermission.Where(t => t.CONTROLLER.ToLower().Equals(controller.ToLower()) && t.ACTION.ToLower().Equals(action.ToLower()));
                if (permission != null && permission.Count() > 0)
                {
                    Mid = permission.FirstOrDefault().ID;
                }
            }
            return Mid;
        }
    }
}