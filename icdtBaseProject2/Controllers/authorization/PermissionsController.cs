using icdtBaseProject2.Controllers.api;
using icdtBaseProject2.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace icdtBaseProject2.Controllers.authorization
{
    public class PermissionsController : BaseController
    {
        [HttpGet]
        [Route("api/permissions")]
        public IHttpActionResult GetPermissions()
        { 
            return Ok(AvailableModules.Permissions);
        }
    }
}
