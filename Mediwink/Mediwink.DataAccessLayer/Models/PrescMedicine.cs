using System;
using System.Collections.Generic;

namespace Mediwink.DataAccessLayer.Models;

public partial class PrescMedicine
{
    public decimal PrescMedid { get; set; }

    public int PatientId { get; set; }

    public decimal? MedId { get; set; }

    public string Dosage { get; set; }

    public string Duration { get; set; }

    public string Frequency { get; set; }

    public string Remarks { get; set; }

    public virtual Medicine Med { get; set; }

    public virtual User Patient { get; set; }
}
