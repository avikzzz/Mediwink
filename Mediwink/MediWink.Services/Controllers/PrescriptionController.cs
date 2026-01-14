using Mediwink.DataAccessLayer.Models;
using Mediwink.DataAccessLayer.Models.ModelDTO;
using MediWink.Services.Mediwink_Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MediWink.Services.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PrescriptionController : Controller
    {
        private readonly IPrescription _prescription;

        public PrescriptionController(IPrescription prescription)
        {
                _prescription = prescription;
        }

        [HttpGet]
        public JsonResult getPrescriptionByPatientId(int patientId)
        {
            List<PrescriptionDetailsDto> prescMedicines = new List<PrescriptionDetailsDto>();
            prescMedicines = _prescription.getPrescriptionByPatientId(patientId);
            return Json(prescMedicines);
        }

        [HttpPost]
        public bool AddPrescription(PrescMedicine presc)
        {
             var res = _prescription.AddPrescription(presc);

             return res;

        }

    }
}
