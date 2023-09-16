using EventERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventERP.CommonClasses
{
    public class SessionFacade
    {
        private const string UserDetails = "UserDetails";
        private const string PagePermissionlist = "PagePermissionlist";
        private const string MenuStr = "MenuStr";
        private const string MenuStrNew = "MenuStrNew";
        private const string SubMenuStr = "SubMenuStr";
        private const string HsnCodeDetailList = "HsnCodeDetailList";
        private const string InvoiceData = "InvoiceData";
        public static UserDetails UserSession
        {
            get
            {
                return (UserDetails)HttpContext.Current.Session[UserDetails];
            }
            set
            {
                HttpContext.Current.Session[UserDetails] = value;
            }
        }

        public static List<PagePermission> PagePermission
        {
            get
            {
                return (List<PagePermission>)HttpContext.Current.Session[PagePermissionlist];
            }
            set
            {
                HttpContext.Current.Session[PagePermissionlist] = value;
            }
        }

        public static string MenuListstr
        {
            get
            {
                return (string)HttpContext.Current.Session[MenuStr];
            }
            set
            {
                HttpContext.Current.Session[MenuStr] = value;
            }
        }
        public static string MenuListstrNew
        {
            get
            {
                return (string)HttpContext.Current.Session[MenuStrNew];
            }
            set
            {
                HttpContext.Current.Session[MenuStrNew] = value;
            }
        }
        public static string SubMenuListstr
        {
            get
            {
                return (string)HttpContext.Current.Session[SubMenuStr];
            }
            set
            {
                HttpContext.Current.Session[SubMenuStr] = value;
            }
        }

        //public static List<HsnCodeDetail> HsnCodeDetail
        //{
        //    get
        //    {
        //        return (List<HsnCodeDetail>)HttpContext.Current.Session[HsnCodeDetailList];
        //    }
        //    set
        //    {
        //        HttpContext.Current.Session[HsnCodeDetailList] = value;
        //    }
        //}
        public static string InvoiceContent
        {
            get
            {
                return (string)HttpContext.Current.Session[InvoiceData];
            }
            set
            {
                HttpContext.Current.Session[InvoiceData] = value;
            }
        }

    }
}