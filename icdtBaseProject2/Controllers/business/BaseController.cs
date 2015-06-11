using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using icdtBaseProject2.Identity;
using icdtBaseProject2.Infrastructure;

namespace icdtBaseProject2.Controllers.api
{
    public class BaseController : ApiController
    {
        private ApplicationUserManager _userManager;
        private ApplicationRoleManager _roleManager;
        private ApplicationGroupManager _groupManager;
        private ApplicationDbContext _db;
        private dynamic _userdata;
        public ApplicationUserManager UserManager
        {
            get
            {
                _userManager = _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
                return _userManager;
            }
            private set
            {
                _userManager = value;
            }
        }

        public ApplicationRoleManager RoleManager
        {
            get
            {
                _roleManager = _roleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
                return _roleManager;
            }
            private set
            {
                _roleManager = value;
            }
        }

        public ApplicationGroupManager GroupManager
        {
            get
            {
                _groupManager = _groupManager ?? new ApplicationGroupManager(DB, UserManager, RoleManager);
                return _groupManager;
            }
            private set
            {
                _groupManager = value;
            }
        }

        public ApplicationDbContext DB
        {
            get
            {
                _db = _db ?? Request.GetOwinContext().Get<ApplicationDbContext>();
                return _db;
            }
            private set
            {
                _db = value;
            }
        }
        public dynamic UserData
        {
            get
            {
                _userdata = _userdata ?? GetDataByLoginUsername();
                return _userdata;
            }
            private set
            {
                _userdata = value;
            }
        }
        private dynamic GetDataByLoginUsername()
        {
            dynamic data="";
            //var userid = User.Identity.GetUserId();
            //var usertype = User.Identity.GetUserType();
            //switch (usertype)
            //{
            //    case UserType.系統管理員:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.公司客戶:
            //        data = DB.CustomerCompany.Include("CustomerPersons").Single(c => c.UserID == userid);                                        
            //        break;
            //    case UserType.個人客戶:
            //        data = DB.CustomerPerson.Include("CustomerCompany").Single(c => c.UserID == userid);
            //        //data = DB.CustomerPerson.Include("CustomerCompany").SingleOrDefault(c => c.UserID == userid);
            //        break;
            //    case UserType.司機員工:
            //        data = new
            //        {
            //            driver = DB.Driver.Single(d => d.UserID == userid),
            //            employee = DB.EmployeeDriver.Single(c => c.UserID == userid)
            //        };
            //        break;
            //    case UserType.司機非員工:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.司機計時:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.主任:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.會計:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.助理:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.外務:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.機場:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.調度:
            //        data = new
            //        {

            //        };
            //        break;
            //    case UserType.副主任:
            //        data = new
            //        {

            //        };
            //        break;
            //    default:
            //        data = null;
            //        break;
            //}
            return data;
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {                
                UserManager.Dispose();
                DB.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
