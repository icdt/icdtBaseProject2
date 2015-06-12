using icdtBaseProject2.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Models
{
    public class UserProfile:Entity
    {
        [Key, ForeignKey("UserAccount")]
        public string Id { get; set; }

        public string MobilePhone { get; set; }
        public string Address { get; set; }

        public virtual ApplicationUser UserAccount { get; set; }

    }
}


// in identity
//SELECT TOP 1000 [Id]
//      ,[FirstName]
//      ,[LastName]
//      ,[Level]
//      ,[JoinDate]
//      ,[Email]
//      ,[EmailConfirmed]
//      ,[PasswordHash]
//      ,[SecurityStamp]
//      ,[PhoneNumber]
//      ,[PhoneNumberConfirmed]
//      ,[TwoFactorEnabled]
//      ,[LockoutEndDateUtc]
//      ,[LockoutEnabled]
//      ,[AccessFailedCount]
//      ,[UserName]
//FROM[AspNetIdentity].[dbo].[AspNetUsers]