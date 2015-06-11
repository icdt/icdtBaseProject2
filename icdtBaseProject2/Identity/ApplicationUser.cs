using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using icdtBaseProject2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace icdtBaseProject2.Identity
{
    public class ApplicationUser: IdentityUser<string, ApplicationUserLogin,ApplicationUserRole, ApplicationUserClaim>
    {

        public virtual UserProfile UserProfile { get; set; }

        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public async Task<ClaimsIdentity>GenerateUserIdentityAsync(ApplicationUserManager manager)
        {
            var userIdentity = await manager
                .CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            return userIdentity;
        }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(ApplicationUserManager manager, string authenticationType)
        {
            // 注意 authenticationType 必須符合 CookieAuthenticationOptions.AuthenticationType 中定義的項目
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // claims by roles
            //var claims = userIdentity.Claims;
            //var roles = claims.Where(c => c.Type == ClaimTypes.Role).ToList();
            //var rolesForUser = manager.GetRoles(userIdentity.GetUserId()); //可測看看
            

            //var aclsString = "";
            //foreach (string item in rolesForUser)
            //{
            //    ApplicationRole theRole = 
            //    aclsString += item.ACLS + ",";
            //}
            //// Add custom user claims here
            //userIdentity.AddClaim(new Claim("ACLS", aclsString.ToString()));


            return userIdentity;
        }

        /// <summary>
        /// kevin: code gnernated by GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
        /// </summary>
        /// <param name="v"></param>
        public static implicit operator IdentityUser(ApplicationUser v)
        {
            throw new NotImplementedException();
        }
    }
}