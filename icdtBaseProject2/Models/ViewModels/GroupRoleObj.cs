using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Models.ViewModels
{
    public class GroupRoleObj
    {
        public string Id { set; get; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] RolesInGroup { get; set; }
    }
}