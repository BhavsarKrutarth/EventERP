using EventERP.CommonComponents;
using EventERP.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace EventERP.Controllers
{
    [SessionExpireFilterAttribute]
    [AuthorizeUserAttribute]
    public class HomeController : Controller
    {
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult Dashboard()
        {
            return View(FormPermissionHelper.GetFormPermission("Dashboard", "Home"));
        }
        public ActionResult DashboardDetails()
        {
            return View(FormPermissionHelper.GetFormPermission("DashboardDetails", "Home"));
        }
    }
}