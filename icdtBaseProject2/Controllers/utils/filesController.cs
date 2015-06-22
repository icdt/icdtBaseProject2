using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace icdtBaseProject2.Controllers.api
{

    public class filesController : ApiController
    {
        [Authorize(Roles = "apiFiles")]
        [HttpPost]
        [Route("api/files")]
        public Task<IHttpActionResult> Post(string owner, string folder)
        {
            folder = folder.Replace(",", "/");
            string subPath = "~/Uploads/" + owner + "/" + folder + "/";
            var PATH = HttpContext.Current.Server.MapPath(subPath);

            // 建立資料夾
            System.IO.Directory.CreateDirectory(PATH);

            #region 抓名字
            var httpRequest = HttpContext.Current.Request;
            string filename = httpRequest.Files.Count == 0 ? "" : httpRequest.Files[0].FileName;
            #endregion

            var rootUrl = Request.RequestUri.AbsoluteUri.Replace(Request.RequestUri.AbsolutePath, String.Empty);
            if (Request.Content.IsMimeMultipartContent())
            {
                var streamProvider = new CustomMultipartFormDataStreamProvider(PATH);
                var task = Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith<IHttpActionResult>(t =>
                {

                    if (t.IsFaulted || t.IsCanceled)
                    {
                        throw new HttpResponseException(HttpStatusCode.InternalServerError);
                    }


                    var fileUrl = Url.Content(subPath);
                    fileUrl += filename;
                    return new TextResult(fileUrl, Request);

                });

                return task;
            }
            else
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted"));
            }
        }
        public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
        {
            public CustomMultipartFormDataStreamProvider(string path)
                : base(path)
            { }

            public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
            {
                var name = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName) ? headers.ContentDisposition.FileName : "NoName";
                return name.Replace("\"", string.Empty); //this is here because Chrome submits files in quotation marks which get treated as part of the filename and get escaped
            }
        }

        public class TextResult : IHttpActionResult
        {
            string _value;
            HttpRequestMessage _request;

            public TextResult(string value, HttpRequestMessage request)
            {
                _value = value;
                _request = request;
            }
            public Task<HttpResponseMessage> ExecuteAsync(System.Threading.CancellationToken cancellationToken)
            {
                var response = new HttpResponseMessage()
                {
                    Content = new StringContent(_value, System.Text.Encoding.UTF8, "text/javascript"),
                    RequestMessage = _request
                };

                //response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/x-javascript");
                return Task.FromResult(response);
            }
        }


        #region 
        // POST api/<controller>
        //public void Post(HttpPostedFileBase upload, String userName, String forder)
        //{
        //}
        //public Task<HttpResponseMessage> PostFormData(string username, string folder)
        //{
        //    // Check if the request contains multipart/form-data.
        //    if (!Request.Content.IsMimeMultipartContent())
        //    {
        //        throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        //    }

        //    string root = HttpContext.Current.Server.MapPath("~/App_Data");
        //    var provider = new MultipartFormDataStreamProvider(root);

        //    // Read the form data and return an async task.
        //    var task = Request.Content.ReadAsMultipartAsync(provider).
        //        ContinueWith<HttpResponseMessage>(t =>
        //        {
        //            if (t.IsFaulted || t.IsCanceled)
        //            {
        //                Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
        //            }

        //            // This illustrates how to get the file names.
        //            foreach (MultipartFileData file in provider.FileData)
        //            {
        //                System.Diagnostics.Trace.WriteLine(file.Headers.ContentDisposition.FileName);
        //                System.Diagnostics.Trace.WriteLine("Server file path: " + file.LocalFileName);
        //            }
        //            return Request.CreateResponse(HttpStatusCode.OK);
        //        });

        //    return task;
        //}
        #endregion
    }
}
