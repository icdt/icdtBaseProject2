using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace icdtBaseProject2.Identity
{
    public class RoleClaimAuthorize : AuthorizeAttribute
    {
        public string ACLS { get; set; }

        public override Task OnAuthorizationAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            var principal = actionContext.RequestContext.Principal as ClaimsPrincipal;

            if (!principal.Identity.IsAuthenticated)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return Task.FromResult<object>(null);
            }

            ClaimsIdentity claimsIdentity = principal.Identity as ClaimsIdentity;
            var aclsClaims = claimsIdentity.FindFirst("ACLS");

            if (aclsClaims == null)
            {
                // just extra defense, not sure it should happen
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return Task.FromResult<object>(null);
            }

            var aclsString = aclsClaims.Value;

            // use your desired logic on 'aclsString', maybe Contains if I get your example right?
            if (!this.ACLS.Contains(aclsString))
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return Task.FromResult<object>(null);
            }

            //User is Authorized, complete execution
            return Task.FromResult<object>(null);
        }

        //protected override bool IsAuthorized(HttpActionContext actionContext)
        //{
        //    var principal = actionContext.RequestContext.Principal as ClaimsPrincipal;

        //    if (!principal.Identity.IsAuthenticated)
        //    {
        //        actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
        //        return Task.FromResult<object>(null);
        //    }

        //    ClaimsIdentity claimsIdentity = principal.Identity as ClaimsIdentity;
        //    var aclsClaims = claimsIdentity.FindFirst("ACLS");

        //    if (aclsClaims == null)
        //    {
        //        // just extra defense, not sure it should happen
        //        return false;
        //    }

        //    var aclsString = aclsClaims.Value;
            

        //    // use your desired logic on 'userSubId' and `userLocId', maybe Contains if I get your example right?
        //    if (!this.SubjectID.Contains(userSubId) || !this.LocationID.Contains(userLocId))
        //    {
        //        actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized); ;
        //    }

        //    //Continue with the regular Authorize check
        //    return base.IsAuthorized(actionContext);
        //}
    }
}