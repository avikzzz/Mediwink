using System;
using System.Collections.Generic;

namespace Mediwink.DataAccessLayer.Models;

public partial class DocLink
{
    public int LinkId { get; set; }

    public int PatientId { get; set; }

    public int DocId { get; set; }

    public DateTime LinkDate { get; set; }

    public virtual User Doc { get; set; }

    public virtual User Patient { get; set; }
}
