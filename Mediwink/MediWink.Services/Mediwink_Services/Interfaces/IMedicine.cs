using Mediwink.DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace MediWink.Services.Mediwink_Services.Interfaces
{
    public interface IMedicine
    {
        public List<Medicine> GetAllMedicines();
    }
}
