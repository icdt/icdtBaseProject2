using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace icdtBaseProject2.Identity
{
    public class ApplicationSignInManager : SignInManager<ApplicationUser, string>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager) :
            base(userManager, authenticationManager) { }

        public override async Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        {
            var externalIdentity = await AuthenticationManager.GetExternalIdentityAsync(DefaultAuthenticationTypes.ExternalCookie);

            var localIdentity = await user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);

            foreach (var item in externalIdentity.Claims)
            {
                if (!localIdentity.HasClaim(o => o.Type == item.Type))
                    localIdentity.AddClaim(item);
            }

            return localIdentity;
            //    @HttpContext.Current.GetOwinContext().Authentication.User.FindFirst("urn:google:picture").Value
        }            

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }
    }
}