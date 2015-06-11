using icdtBaseProject2.Infrastructure;
using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;

namespace icdtBaseProject2.Migrations
{
    
    internal sealed class Configuration : DbMigrationsConfiguration<icdtBaseProject2.Infrastructure.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }
    
        protected override void Seed(icdtBaseProject2.Infrastructure.ApplicationDbContext context)
        {
            

            DbSeed.InitializePermissions(context, AvailableModules.Permissions);
            DbSeed.InitializeGroup(context, AvailableModules.GroupAdmin);
            DbSeed.InitBaseUserData(context);
            
        }
    }
}
