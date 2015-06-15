using icdtBaseProject2.Controllers.api;
using icdtBaseProject2.Identity;
using icdtBaseProject2.Models.ViewModels;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace icdtBaseProject2.Controllers.authorization
{
    //[Authorize(Roles = "Admin")]
    public class UsersController : BaseController
    {

        [HttpGet]
        [Route("api/users")]
        public IHttpActionResult GetUserList()
        {
            var users = UserManager.Users.Select(u=>new { Id=u.Id, UserName = u.UserName, Email = u.Email}).ToList();
            
            return Ok(users);
        }


        [HttpGet]
        [Route("api/users/{id}")]
        public IHttpActionResult GetUser(string id)
        {
            var user = DB.Users.Where(u => u.Id == id).FirstOrDefault();
            var userGroups = GroupManager.GetUserGroups(id);
            List<UserGroupObj> userGroupList = new List<UserGroupObj>();
            foreach (var item in userGroups)
            {
                UserGroupObj temp = new UserGroupObj() {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description
                };

                userGroupList.Add(temp);
            }

            UserViewModel returnUserObj = new UserViewModel() {
                Id= user.Id,
                UserName= user.UserName,
                Email = user.Email,
                UserGroups = userGroupList
            };

            return Ok(returnUserObj);

        }

        [HttpPost]
        [Route("api/users")]
        public IHttpActionResult PostUser(UserRegisterObj user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var applicationUser = new ApplicationUser() { UserName = user.UserName, Email = user.Email };
            IdentityResult result = UserManager.Create(applicationUser, user.Password);

            if (result.Succeeded)
            {
                UserManager.SetLockoutEnabled(applicationUser.Id, true);
                return Ok(applicationUser.Id);
            }
            else
            {
                return GetErrorResult(result);
            }
        }

        [HttpPut]
        [Route("api/users/{id}")]
        public IHttpActionResult PutUser(string id, UserViewModel userObj)
        {
           // userObj
           //{ 
           //     id: userId,
           //     UserName: 
           //     Email:
           //     UserGroups: [
           //         {
           //             Id:
           //             Name:
           //             Description:
           //         },
           //         {
           //             Id:
           //             Name:
           //             Description:
           //         }
           //     ]
           // }
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = DB.Users.Where(u => u.Id == userObj.Id).FirstOrDefault();

            user.UserName = userObj.UserName;
            user.Email = userObj.Email;

            IdentityResult result = GroupManager.SetUserGroups(user.Id, userObj.UserGroups);

            if (result.Succeeded)
            {
                return Ok();
            }
            else {
                return GetErrorResult(result);
            }
            
        }
        
        [HttpPut]
        [Route("api/users/{id}/newpassword")]
        public IHttpActionResult ResetUserPassword(string id, UserResetObj userObj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = UserManager.AddPassword(id, userObj.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

    }
}
