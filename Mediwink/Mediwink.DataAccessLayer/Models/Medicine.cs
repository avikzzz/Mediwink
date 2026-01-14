using System;
using System.Collections.Generic;

namespace Mediwink.DataAccessLayer.Models;

public partial class Medicine
{
    public decimal MedId { get; set; }

    public string MedType { get; set; }

    public string MedName { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<PrescMedicine> PrescMedicines { get; set; } = new List<PrescMedicine>();
}
