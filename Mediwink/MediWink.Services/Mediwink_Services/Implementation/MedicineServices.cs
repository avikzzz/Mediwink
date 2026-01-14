using Mediwink.DataAccessLayer;
using Mediwink.DataAccessLayer.Models;
using MediWink.Services.Mediwink_Services.Interfaces;

namespace MediWink.Services.Mediwink_Services.Implementation
{
    public class MedicineServices : IMedicine
    {
        private readonly MediwinkRepository _repository;

        public MedicineServices(MediwinkRepository repository)
        {
            _repository = repository;
        }

        public List<Medicine> GetAllMedicines()
        {
            var medicineList = _repository.GetAllMedicines();
            return medicineList;
        }
    }
}
