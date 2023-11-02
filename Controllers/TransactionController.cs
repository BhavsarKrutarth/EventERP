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
    public class TransactionController : Controller
    {
        public ActionResult Purchase(string VoucherId)
        {
            ViewBag.VoucherId = VoucherId;
            return View(FormPermissionHelper.GetFormPermission("Purchase", "Transaction"));
        }
        public ActionResult Estimate()
        {
            return View(FormPermissionHelper.GetFormPermission("Estimate", "Transaction"));
        }
        
        public ActionResult Sales(string VoucherId)
        {
            ViewBag.VoucherId = VoucherId;
            return View(FormPermissionHelper.GetFormPermission("Sales", "Transaction"));
        }

        public ActionResult SalesEstimate()
        {
            return View(FormPermissionHelper.GetFormPermission("SalesEstimate", "Transaction"));
        }
        public ActionResult BankBook()
        {
            return View(FormPermissionHelper.GetFormPermission("BankBook", "Transaction"));
        }
    }
}