using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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

        [HttpPost]
        [Route("mvc/CSV")]
        public ActionResult UploadCSV(HttpPostedFileBase FileUploadCSV)
        {
            StreamReader streamReader = new System.IO.StreamReader(FileUploadCSV.InputStream, System.Text.Encoding.Default);
            string UploadOwnersString = streamReader.ReadToEnd();//(各筆資料分隔符號為\r\n)
            UploadOwnersString = UploadOwnersString.Replace(" ", "");
            streamReader.Dispose();

            //int index = 0;
            foreach (string SingleOwnerString in UploadOwnersString.Split(new string[] { "\n", "\r" }, StringSplitOptions.RemoveEmptyEntries))
            {
                
                string[] SourceProductValue = SingleOwnerString.Split(',');

                // 根據記錄格式作調整
                string[] recordFields = new string[] { "", "", "", "", "", "", "", "", "", "", "", "", "", "" };



                
            }

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}