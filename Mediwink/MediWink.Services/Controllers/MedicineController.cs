using Mediwink.DataAccessLayer.Models;
using MediWink.Services.Mediwink_Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MediWink.Services.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicineController : Controller
    {
        private readonly IMedicine _medicineService;

        public MedicineController(IMedicine medicine)
        {
            _medicineService = medicine; ;
        }


        [HttpGet]

        public IActionResult GetAllMedicines()
        {
            var medicines = _medicineService.GetAllMedicines();

            return Json(medicines);

        }

    }
}
