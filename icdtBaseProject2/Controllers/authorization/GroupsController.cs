using icdtBaseProject2.Identity;
using icdtBaseProject2.Infrastructure;
using icdtBaseProject2.Models.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace icdtBaseProject2.Controllers.api
{
    //[Authorize(Roles = "Admin")]
    public class GroupsController : BaseController
    {

        [HttpGet]
        [Route("api/groups")]
        public IHttpActionResult GetGroups()
        {
            return Ok(GroupManager.GetAllGroupRoles());
        }

        [HttpGet]
        [Route("api/groups/{id}/roles")]
        public IHttpActionResult GetGroupRole(string id)
        {
            GroupRoleObj groupRole = GroupManager.GetGroupRolesObj(id.ToString());
            
            if (groupRole == null)
            {
                return NotFound();
            }
            // 傳回字串陣列
            return Ok(groupRole);
        }

        [HttpPut]
        [Route("api/groups/{id}")]
        // PUT: api/Groups/5
        public IHttpActionResult PutGroupRoles(string id, GroupRoleObj ppGroup)
        {
          
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationGroup pureGroup = new ApplicationGroup() {
                Id = ppGroup.Id,
                Name = ppGroup.Name,
                Description = ppGroup.Description
            };

            GroupManager.UpdateGroup(pureGroup);

            IdentityResult result = GroupManager.SetGroupRoles(id, ppGroup);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }

        }

        [HttpPost]
        [Route("api/groups")]
        public IHttpActionResult PostGroup(ApplicationGroup ppGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationGroup group = GroupManager.MyCreateGroup(ppGroup);

            if (!"".Equals(group.Id) || group.Id != null)
            {
                return Ok(group);
            }
            else
            {
                return InternalServerError();
            }
            
        }

        [HttpDelete]
        [Route("api/groups/{id}")]
        public IHttpActionResult DeleteGroup(Guid id)
        {
            IdentityResult result = GroupManager.DeleteGroup(id.ToString());

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }
        }
        
        #region 使用者群組操作
        [HttpPost]
        [Route("api/user/{userId}/userGroups")]
        public IHttpActionResult PostUserGroups(string userId, string[] userGroups)
        {

            IdentityResult result = GroupManager.SetUserGroups(userId, userGroups);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }
        }

        [HttpGet]
        [Route("api/user/{userId}/userGroups")]
        public IHttpActionResult GetUserGroups(string userId)
        {   
            var userGroups = GroupManager.GetUserGroups(userId);

            return Ok(userGroups);
        }
        #endregion
    }
}
