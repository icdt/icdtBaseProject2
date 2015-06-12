using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Identity
{
    public class ApplicationGroup
    {
        public ApplicationGroup()
        {
            this.Id = Guid.NewGuid().ToString();
            this.ApplicationRoles = new List<ApplicationGroupRole>();
            this.ApplicationUsers = new List<ApplicationUserGroup>();
        }

        public ApplicationGroup(string name)
            : this()
        {
            this.Name = name;
        }

        public ApplicationGroup(string name, string description)
            : this(name)
        {
            this.Description = description;
        }

        [Key]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public virtual ICollection<ApplicationGroupRole> ApplicationRoles { get; set; }
        [JsonIgnore]
        public virtual ICollection<ApplicationUserGroup> ApplicationUsers { get; set; }
    }


    public class ApplicationUserGroup
    {
        [Key, Column(Order = 0)]
        [ForeignKey("user")]
        public string ApplicationUserId { get; set; }
        [Key, Column(Order = 1)]
        [ForeignKey("group")]
        public string ApplicationGroupId { get; set; }
        public virtual ApplicationGroup group { get; set; }
        public virtual ApplicationUser user { get; set; }
    }

    public class ApplicationGroupRole
    {
        [Key, Column(Order = 0)]
        [ForeignKey("role")]
        public string ApplicationRoleId { get; set; }
        [Key, Column(Order = 1)]
        [ForeignKey("group")]
        public string ApplicationGroupId { get; set; }
        public virtual ApplicationGroup group { get; set; }
        public virtual ApplicationRole role { get; set; }
    }
}