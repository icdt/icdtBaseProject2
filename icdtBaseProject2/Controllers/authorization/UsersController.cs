using icdtBaseProject2.Controllers.api;
using icdtBaseProject2.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace icdtBaseProject2.Controllers.authorization
{
    public class UsersController : BaseController
    {

        [HttpGet]
        [Route("api/users")]
        public IHttpActionResult GetUserList()
        {
            var _users = UserManager.Users;
            var users = _users.Select(u=> new {
                Id = u.Id,
                UserName = u.UserName
            }).ToList();
            return Ok(users);
        }



    }
}
