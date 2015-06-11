using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace icdtBaseProject2.Identity
{
    public class ApplicationRoleStore
    : RoleStore<ApplicationRole, string, ApplicationUserRole>,
    IQueryableRoleStore<ApplicationRole, string>,
    IRoleStore<ApplicationRole, string>, System.IDisposable
    {
        public ApplicationRoleStore()
            : base(new IdentityDbContext())
        {
            base.DisposeContext = true;
        }

        public ApplicationRoleStore(DbContext context)
            : base(context)
        {
        }
    }
}