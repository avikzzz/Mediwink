using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mediwink.DataAccessLayer;
using Mediwink.DataAccessLayer.Models;
using Microsoft.Identity.Client;
using MediWink.Services.Mediwink_Services.Interfaces;


namespace MediWink.Services.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        //MediwinkRepository _repository;

        private readonly IUserServices _userServices;

        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet]
        public JsonResult GetUserbyType(char user_type)
        {
            List<User> user = new List<User>();
            try
            {
                user = _userServices.GetUserbyType(user_type);
            }
            catch (Exception ex)
            {
                user = null;
            }

            return Json(user);
        }


        [HttpPost]
        public async Task<IActionResult> RegisterUser(User user)
        {
            var userId = await _userServices.RegisterUserAsync(user);


            return Ok("Successfull with ID " + userId);

        }

        [HttpPost]
        public IActionResult Login(User loginUser)
        {
            if (loginUser == null || string.IsNullOrEmpty(loginUser.Email) || string.IsNullOrEmpty(loginUser.Password))
                return BadRequest("Email and Password are required.");

            var user = _userServices.AuthenticateUser(loginUser.Email, loginUser.Password);

            if (user == null)
                return Unauthorized("Invalid credentials.");

            return Ok(user); // Returns full user details (UserId, UserName, UserType)
        }

        [HttpGet]
        public IActionResult getPatientsLinktoDoc(int docId)
        {
            List<User> patientlist = new List<User>();

            patientlist = _userServices.getPatientsLinktoDoc(docId);
            return Json(patientlist);
        }

        [HttpPost]
        public bool LinkPatientwithDoc(DocLink docLink)
        {
            return _userServices.LinkPatientwithDoc(docLink);
        }
    }
        
}
