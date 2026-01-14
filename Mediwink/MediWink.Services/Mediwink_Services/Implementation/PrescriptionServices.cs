using Mediwink.DataAccessLayer;
using Mediwink.DataAccessLayer.Models;
using Mediwink.DataAccessLayer.Models.ModelDTO;
using MediWink.Services.Mediwink_Services.Interfaces;

namespace MediWink.Services.Mediwink_Services.Implementation
{
    public class PrescriptionServices:IPrescription
    {
        private readonly MediwinkRepository _repository;
             
        public PrescriptionServices(MediwinkRepository repository)
        {
            _repository = repository;
        }

        public bool AddPrescription(PrescMedicine prescription)
        { 
            return _repository.AddPrescription(prescription);
        }

        public List<PrescriptionDetailsDto> getPrescriptionByPatientId(int patientId)
        {

            var pres = _repository.GetPrescriptionByPatient(patientId);

            return pres;
        }


    }
}
