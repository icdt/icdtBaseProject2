using icdtBaseProject2.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Models.ViewModels
{
    public class UserGroupObj
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        //json 字串
        //{
        //    
        //    UserGroups:[
        //        {
        //          Id: 'guid',
        //          Name: '群組名稱',
        //          Description: '群組描述'
        //        },
        //        {
        //          Id: 'guid',
        //          Name: '群組名稱',
        //          Description: '群組描述'
        //        }
        //    ]
        //}
    }
}