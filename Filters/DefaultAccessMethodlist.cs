using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventERP.Filters
{
    public class DefaultAccessMethodlist
    {
        static Dictionary<string, bool> Allowlist;
#pragma warning disable CS0649 // Field 'DefaultAccessMethodlist.BeforeLoginMenulist' is never assigned to, and will always have its default value null
        static Dictionary<string, bool> BeforeLoginMenulist;
#pragma warning restore CS0649 // Field 'DefaultAccessMethodlist.BeforeLoginMenulist' is never assigned to, and will always have its default value null

        static DefaultAccessMethodlist()
        {
            Allowlist = new Dictionary<string, bool>();
            Allowlist.Add("login_login", true);
            Allowlist.Add("login_dologin", true);

            Allowlist.Add("login_logout", true);
            Allowlist.Add("home_dashboard", true);
            Allowlist.Add("home_dashboarddetails", true);
            Allowlist.Add("home_tabpage", true);
            Allowlist.Add("transaction_crystalfile", true);

        }

        public static bool CheckIsDefaultAccess(string controller, string action)
        {
            try
            {
                bool IsAllow = false;

                Allowlist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }

        public static bool CheckIsBeforeLoginAccess(string controller, string action)
        {
            try
            {
                bool IsAllow = false;

                BeforeLoginMenulist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }
    }
}