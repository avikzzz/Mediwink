using System;
using System.Collections.Generic;

namespace Mediwink.DataAccessLayer.Models;

public partial class User
{
    public int Userid { get; set; }
     
    public char UserType { get; set; }

    public string UserName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public decimal? Contact { get; set; }

    public string Gender { get; set; }

    public DateTime CreatedDate { get; set; }

    public string CreatedBy { get; set; }

    public char IsActive { get; set; }

    public virtual ICollection<DocLink> DocLinkDocs { get; set; } = new List<DocLink>();

    public virtual ICollection<DocLink> DocLinkPatients { get; set; } = new List<DocLink>();

    public virtual ICollection<PrescMedicine> PrescMedicines { get; set; } = new List<PrescMedicine>();
}
