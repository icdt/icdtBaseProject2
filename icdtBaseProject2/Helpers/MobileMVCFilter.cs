using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace icdtBaseProject2.Helpers
{
    public class MobileMVCFilter : ActionFilterAttribute
    {
        public string Area { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (IsMobileBrowser(filterContext.HttpContext.Request))
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { area = Area, controller = Controller, action = Action }));
            }
            base.OnActionExecuting(filterContext);
        }

        private bool IsMobileBrowser(HttpRequestBase req)
        {
            string strUserAgent = req.UserAgent.ToString().ToLower();
            if (strUserAgent == null)
            {
                return false;
            }

            if (req.Browser.IsMobileDevice == true ||
                strUserAgent.Contains("iphone") ||
                strUserAgent.Contains("mobi"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}