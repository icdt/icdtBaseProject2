using icdtBaseProject2.Identity;
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
        public List<RoleInfo> RolesInGroup { get; set; }


        //json 字串
        //{
        //    Id: 'guid',
        //    Name: '群組名稱',
        //    Description: '群組描述',
        //    RolesInGroup:[
        //        {
        //            Id: 'guid',
        //            Name: '角色名稱'
        //        },
        //        {
        //            Id: 'guid',
        //            Name: '角色名稱'
        //        }
        //    ]
        //}
        
    }

    public class RoleInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }

    }
}