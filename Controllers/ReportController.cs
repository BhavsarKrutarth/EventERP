using EventERP.CommonComponents;
using EventERP.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EventERP.Controllers
{
    [SessionExpireFilterAttribute]
    [AuthorizeUserAttribute]
    public class ReportController : Controller
    {
        public ActionResult LedgerReport()
        {
            return View(FormPermissionHelper.GetFormPermission("LedgerReport", "Report"));
        }
    }
}