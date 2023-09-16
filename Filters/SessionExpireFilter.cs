using EventERP.CommonClasses;
using EventERP.CommonComponents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EventERP.Filters
{
    public class SessionExpireFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string controller = string.Empty;
            string action = string.Empty;

            // Getting controller, action name from HttpRequest
            FormPermissionHelper.GetControllerAction(filterContext.HttpContext, ref controller, ref action);

            if (SessionFacade.UserSession == null)
            {
                filterContext.Result = new RedirectResult("~/" + controller + "/" + action + "");
                return;
            }

            if (SessionFacade.UserSession == null)
            {
                if (DefaultAccessMethodlist.CheckIsBeforeLoginAccess(controller, action) == false)
                {
                    if (filterContext.HttpContext.Request.IsAjaxRequest())
                    {
                        filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                    "<RESPONSECODE>-405</RESPONSECODE>" +
                                                                    "<RESPONSEMESSAGE>YOUR SESSION TIMEOUT. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                    "</SERVICERESPONSE>");
                    }
                    else
                    {
                        filterContext.Result = new ContentResult() { Content = "<script>top.window.parent.location.href='" + System.Configuration.ConfigurationManager.AppSettings["domainPath"] + "/Login/Login'</script>" };
                        return;
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

    public class AuthorizeUserAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            string controller = string.Empty;
            string action = string.Empty;

            // Getting controller, action name from request URL
            FormPermissionHelper.GetControllerAction(httpContext, ref controller, ref action);

            if (SessionFacade.UserSession == null)
            {
                return FormPermissionHelper.CheckFormPermission(action, controller);
            }

            if (SessionFacade.UserSession == null)
            {
                if (DefaultAccessMethodlist.CheckIsBeforeLoginAccess(controller, action) == true)
                    return true;
                else
                    return false;
            }
            else
            {
                if (SessionFacade.UserSession.USERGROUPNAME.ToLower() == "administrator" || SessionFacade.UserSession.USERGROUPNAME.ToLower() == "admin")
                {
                    return true;
                }
                return FormPermissionHelper.CheckFormPermission(action, controller); // Checking in form permision
            }
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                if (SessionFacade.UserSession == null)
                {
                    filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                "<RESPONSECODE>-405</RESPONSECODE>" +
                                                                "<RESPONSEMESSAGE>YOUR APPLICATION SESSION TIMEOUT. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                "</SERVICERESPONSE>");
                }
                else
                {
                    filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                "<RESPONSECODE>-401</RESPONSECODE>" +
                                                                "<RESPONSEMESSAGE>APPLICATION UNAUTHORIZED ACCESS. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                "</SERVICERESPONSE>");
                }
            }
            else
            {
                //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Login", action = "Login" }));
                filterContext.Result = new ContentResult() { Content = "<script>top.window.parent.location.href='" + System.Configuration.ConfigurationManager.AppSettings["domainPath"] + "/Login/Login'</script>" };
            }
        }

    }
}