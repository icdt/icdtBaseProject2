using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using icdtBaseProject2.Identity;
using icdtBaseProject2.Models.ViewModels;

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

        public static void InitializeGroup(ApplicationDbContext context, List<InitGroupRoleObj> groups)
        {
            var UserManager = new ApplicationUserManager(new ApplicationUserStore(context));
            var RoleManager = new ApplicationRoleManager(new ApplicationRoleStore(context));
            var GroupManager = new ApplicationGroupManager(context, UserManager, RoleManager);
            foreach (var item in groups)
            {
                if (!GroupManager.Groups.Any(g => g.Name == item.Name))
                {
                    var g = new ApplicationGroup() { Name = item.Name, Description = "系統預設群組" };
                    var result = GroupManager.CreateGroup(g);
                    if (result.Succeeded)
                    {
                        List<string> rolesList = new List<string>();
                        for (int i = 0; i < item.RolesInGroup.Length; i++)
                        {
                            rolesList.Add(item.RolesInGroup[i]);
                        }
                        string[] rolesStr = rolesList.ToArray();
                        GroupManager.SetGroupRoles(g.Id, rolesStr);
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
                string groupId = GroupManager.Groups.First(g => g.Name == "Admin").Id;

                IdentityResult result1 = UserManager.Create(user1, "manager");
                if (result1.Succeeded)
                {   
                    GroupManager.SetUserGroups(user1.Id, new string[] { groupId });
                }
                
                IdentityResult result2 = UserManager.Create(user2, "abc123");
                if (result2.Succeeded)
                {   
                    GroupManager.SetUserGroups(user2.Id, new string[] { groupId });
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


        public static List<InitGroupRoleObj> GroupAdmin
        {
            get
            {
                return new List<InitGroupRoleObj>() {
                    new InitGroupRoleObj() { Name = "Admin", RolesInGroup = AvailableModules.Permissions}
                };
            }

        }



        #endregion

    }

    public class InitGroupRoleObj
    {
        public string Id { set; get; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] RolesInGroup { get; set; }
    }
}