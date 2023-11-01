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
    public class MasterController : Controller
    {
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult City_State_Country()
        {
            return View(FormPermissionHelper.GetFormPermission("City_State_Country", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult User_Groups()
        {
            return View(FormPermissionHelper.GetFormPermission("User_Groups", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult AccountYearMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("AccountYearMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult CommonMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("CommonMaster", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult EmployeeMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("EmployeeMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult User_Account()
        {
            return View(FormPermissionHelper.GetFormPermission("User_Account", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult BranchMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("BranchMaster", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult HSNCodeMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("HSNCodeMaster", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult CustomerMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("CustomerMaster", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult PartyMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("PartyMaster", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult BankMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("BankMaster", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult TDSMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("TDSMaster", "Master"));
        }
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult ItemGroupMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("ItemGroupMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult ItemMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("ItemMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult TCSMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("TCSMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult GSTMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("GSTMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult EventMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("EventMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult AddNewStock()
        {
            return View(FormPermissionHelper.GetFormPermission("AddNewStock", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult TagMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("TagMaster", "Master"));
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult BalanceSheetGroupMaster()
        {
            return View(FormPermissionHelper.GetFormPermission("BalanceSheetGroupMaster", "Master"));
        }

    }
}