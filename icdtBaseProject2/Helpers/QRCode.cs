using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace icdtBaseProject2.Helpers
{
    public static class QRCode
    {
        public static MvcHtmlString QRcodeSrc(this HtmlHelper htmlhelper, string message, int width = 80, int height = 80)
        {
            if (string.IsNullOrEmpty(message))
            {
                throw new ArgumentException();
            }
            else if (width <= 0 || height <= 0)
            {
                throw new ArgumentException();
            }
            var s = string.Format("https://chart.googleapis.com/chart?chs={1}x{2}&cht=qr&chl={0}", message, width, height);
            return new MvcHtmlString(s);
        }
    }    
}