using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace icdtBaseProject2.Controllers.mvc
{
    public class mvcFilesController : Controller
    {
        [Authorize(Roles = "mvcFiles")]
        [HttpPost]
        [Route("mvc/files")]
        public ActionResult UploadPicture(HttpPostedFileBase upload, string CKEditorFuncNum, string folder, string langCode, string CKEditor)
        {
            string result = "";
            if (upload != null && upload.ContentLength > 0)
            {
                folder = folder.Replace(",", "/");
                string subPath = "~/uploads/" + folder;
                System.IO.Directory.CreateDirectory(Server.MapPath(subPath));

                //儲存圖片至Server
                upload.SaveAs(Server.MapPath(subPath + "/" + upload.FileName));


                var imageUrl = Url.Content(subPath + "/" + upload.FileName);

                var vMessage = string.Empty;

                var imageUrl2 = Request.Url.Scheme + "://" + Request.Url.Authority + imageUrl;
                result = @"<html><body><script>window.parent.CKEDITOR.tools.callFunction(" + CKEditorFuncNum + ", \"" + imageUrl2 + "\", \"" + vMessage + "\");</script></body></html>";

            }

            return Content(result);
        }
    }
}