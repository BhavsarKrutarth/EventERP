using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace EventERP.Models
{
    //public class ExternalLoginConfirmationViewModel
    //{
    //    [Required]
    //    [Display(Name = "Email")]
    //    public string Email { get; set; }
    //}

    //public class ExternalLoginListViewModel
    //{
    //    public string ReturnUrl { get; set; }
    //}

    //public class SendCodeViewModel
    //{
    //    public string SelectedProvider { get; set; }
    //    public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
    //    public string ReturnUrl { get; set; }
    //    public bool RememberMe { get; set; }
    //}

    //public class VerifyCodeViewModel
    //{
    //    [Required]
    //    public string Provider { get; set; }

    //    [Required]
    //    [Display(Name = "Code")]
    //    public string Code { get; set; }
    //    public string ReturnUrl { get; set; }

    //    [Display(Name = "Remember this browser?")]
    //    public bool RememberBrowser { get; set; }

    //    public bool RememberMe { get; set; }
    //}

    //public class ForgotViewModel
    //{
    //    [Required]
    //    [Display(Name = "Email")]
    //    public string Email { get; set; }
    //}

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

    }

    //public class LoginViewModel
    //{
    //    [Required]
    //    [Display(Name = "Email")]
    //    [EmailAddress]
    //    public string Email { get; set; }

    //    [Required]
    //    [DataType(DataType.Password)]
    //    [Display(Name = "Password")]
    //    public string Password { get; set; }

    //    [Display(Name = "Remember me?")]
    //    public bool RememberMe { get; set; }
    //}

    //public class RegisterViewModel
    //{
    //    [Required]
    //    [EmailAddress]
    //    [Display(Name = "Email")]
    //    public string Email { get; set; }

    //    [Required]
    //    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    //    [DataType(DataType.Password)]
    //    [Display(Name = "Password")]
    //    public string Password { get; set; }

    //    [DataType(DataType.Password)]
    //    [Display(Name = "Confirm password")]
    //    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    //    public string ConfirmPassword { get; set; }
    //}

    //public class ResetPasswordViewModel
    //{
    //    [Required]
    //    [EmailAddress]
    //    [Display(Name = "Email")]
    //    public string Email { get; set; }

    //    [Required]
    //    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    //    [DataType(DataType.Password)]
    //    [Display(Name = "Password")]
    //    public string Password { get; set; }

    //    [DataType(DataType.Password)]
    //    [Display(Name = "Confirm password")]
    //    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    //    public string ConfirmPassword { get; set; }

    //    public string Code { get; set; }
    //}

    //public class ForgotPasswordViewModel
    //{
    //    [Required]
    //    [EmailAddress]
    //    [Display(Name = "Email")]
    //    public string Email { get; set; }
    //}

    public class UserDetails
    {
        public int LOGINID { get; set; }
        public string USERNAME { get; set; }
        public string SHORTNAME { get; set; }
        public string PASSWORD { get; set; }
        public string TOKEN { get; set; }
        public int EMPID { get; set; }
        public int EMPBRANCHID { get; set; }
        public string EMPBRANCHNAME { get; set; }
        public string EMPCODE { get; set; }
        public string MOBILENO { get; set; }
        public string FULLNAME { get; set; }
        public string GENDER { get; set; }
        public string EMAILID { get; set; }
        public int ACCOUNTYEARID { get; set; }
        public string ACCOUNTYEAR { get; set; }
        public string ACCOUNTYEARFROMDATE { get; set; }
        public string ACCOUNTYEARTODATE { get; set; }
        public string STATENAME { get; set; }
        public int STATEID { get; set; }
        public string COUNTERID { get; set; }
        public string ISVOUCEHREDIT { get; set; }
        public string EMPDEFAULTBANKACCID { get; set; }
        public string TCSPER { get; set; }
        public string TCSLIMIT { get; set; }
        public string USERGROUPNAME { get; set; }
        public int ISCHECKIN { get; set; }

    }

    public class PagePermission
    {
        public int ID { get; set; }
        public string MODULE { get; set; }
        public string NAME { get; set; }
        public string CONTROLLER { get; set; }
        public string ACTION { get; set; }
        public int ISVIEW { get; set; }
        public int ISADD { get; set; }
        public int ISUPDATE { get; set; }
        public int ISDELETE { get; set; }
        public int ISDOWNLOAD { get; set; }
        public int ISSAMEDAYLOCK { get; set; }
        public int HSNID { get; set; }

    }

    //public class HsnCodeDetail
    //{
    //    public int HSNCODEID { get; set; }
    //    public string DAYBOOKNAME { get; set; }
    //}

}
