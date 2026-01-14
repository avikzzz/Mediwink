namespace Mediwink.DataAccessLayer.Models.ModelDTO
{
    public class PrescriptionDetailsDto
    {
        public object PrescId { get; set; }
        public int PatientId { get; set; }
        public decimal? MedId { get; set; }
        public string MedName { get; set; }
        public string MedType { get; set; }
        public string Dosage { get; set; }
        public string Duration { get; set; }
        public string Frequency { get; set; }
        public string Remarks { get; set; }
    }
}