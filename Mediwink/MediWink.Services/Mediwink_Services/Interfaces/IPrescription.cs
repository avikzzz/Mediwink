using Mediwink.DataAccessLayer.Models;
using Mediwink.DataAccessLayer.Models.ModelDTO;

namespace MediWink.Services.Mediwink_Services.Interfaces
{
    public interface IPrescription
    {
        public bool AddPrescription(PrescMedicine presc);
        public List<PrescriptionDetailsDto> getPrescriptionByPatientId(int patientId);

        
    }


}
