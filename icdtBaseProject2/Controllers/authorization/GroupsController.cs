using icdtBaseProject2.Identity;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace icdtBaseProject2.Controllers.api
{
    [Authorize(Roles = "Permissions")]
    public class GroupsController : BaseController
    {

        [HttpGet]
        [Route("api/groups")]
        public IHttpActionResult GetGroups()
        {
            return Ok(GroupManager.Groups);
        }

        [HttpGet]
        [Route("api/groups/{id}")]
        public IHttpActionResult GetGroup(Guid id)
        {
            var group = GroupManager.FindById(id.ToString());
            if (group == null)
            {
                return NotFound();
            }

            return Ok(group);
        }

        [HttpPut]
        [Route("api/groups/{id}")]
        // PUT: api/Groups/5
        public IHttpActionResult PutGroup(Guid id, ApplicationGroup ppGroup)
        {
            string gId = id.ToString();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (gId != ppGroup.Id)
            {
                return BadRequest();
            }

            IdentityResult result = GroupManager.UpdateGroup(ppGroup);

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

            IdentityResult identityResult = GroupManager.CreateGroup(ppGroup);

            if (identityResult.Succeeded)
            {
                return Ok();
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
