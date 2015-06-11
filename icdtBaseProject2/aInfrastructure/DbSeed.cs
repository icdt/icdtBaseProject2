using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using icdtBaseProject2.Identity;

namespace icdtBaseProject2.Infrastructure
{
    public static class DbSeed
    {
        public static void InitializePermissions(ApplicationDbContext context, string[] roles)
        {
            var RoleManager = new ApplicationRoleManager(new ApplicationRoleStore(context));
            foreach (var r in roles)
            {
                if (!context.Roles.Any(p => p.Name == r))
                {
                    RoleManager.Create(new ApplicationRole() { Name = r });
                }
            }
            //foreach (var item in context.Roles.ToList())
            //{
            //    if (!roles.Any(r => r == item.Name) && !item.Name.Equals("Admin"))
            //    {
            //        RoleManager.Delete(item);
            //    }
            //}
        }

        public static void InitializeGroup(ApplicationDbContext context, List<GroupRoleObj> groups)
        {
            var UserManager = new ApplicationUserManager(new ApplicationUserStore(context));
            var RoleManager = new ApplicationRoleManager(new ApplicationRoleStore(context));
            var GroupManager = new ApplicationGroupManager(context, UserManager, RoleManager);
            foreach (var item in groups)
            {
                if (!GroupManager.Groups.Any(g => g.Name == item.GroupName))
                {
                    var g = new ApplicationGroup() { Name = item.GroupName, Description = "系統預設群組" };
                    var result = GroupManager.CreateGroup(g);
                    if (result.Succeeded)
                    {
                        GroupManager.SetGroupRoles(g.Id, item.RolesInGroup);
                    }
                }
            }
        }

        public static void InitBaseUserData(ApplicationDbContext context)
        {
            var UserManager = new ApplicationUserManager(new ApplicationUserStore(context));
            var RoleManager = new ApplicationRoleManager(new ApplicationRoleStore(context));
            var GroupManager = new ApplicationGroupManager(context, UserManager, RoleManager);

            var user1 = new ApplicationUser() {
                UserName = "manager",
                Email = "m@m.com"
            };
            var user2 = new ApplicationUser()
            {
                UserName = "aaa",
                Email = "a@a.com"
            };

            if (!context.Users.Any())
            {
                IdentityResult result1 = UserManager.Create(user1, "manager");
                if (result1.Succeeded)
                {
                    GroupManager.SetUserGroups(user1.Id, new string[] { "Admin" });
                }
                
                IdentityResult result2 = UserManager.Create(user2, "abc123");
                if (result2.Succeeded)
                {
                    GroupManager.SetUserGroups(user2.Id, new string[] { "Admin" });
                }
               
            }
        }

    }
    
    public static class AvailableModules
    {
        #region 系統模組
        public static readonly string[] Permissions = {
                                                        "Admin",
                                                        "Users",
                                                        "Orders",
                                                        "mvcFiles",
                                                        "apiFiles"
                                                      };


        public static List<GroupRoleObj> GroupAdmin
        {
            get
            {
                return new List<GroupRoleObj>() {
                    new GroupRoleObj() { GroupName = "Admin", RolesInGroup = AvailableModules.Permissions}
                };
            }

        }

        #endregion

    }

    public class GroupRoleObj
    {
        public string GroupName { get; set; }
        public string[] RolesInGroup { get; set; }
    }
}