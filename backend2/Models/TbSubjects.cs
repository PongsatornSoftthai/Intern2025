using System;
using System.Collections.Generic;

namespace backend2.Models;

public partial class TbSubjects
{
    public string SSubjectId { get; set; } = null!;

    public string SName { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public int NCredit { get; set; }

    public DateTime? DUpdate { get; set; }

    public DateTime? DDelete { get; set; }
}
