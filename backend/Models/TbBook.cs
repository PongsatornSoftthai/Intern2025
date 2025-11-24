using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class TbBook
{
    public int NBookId { get; set; }

    public string SNamebook { get; set; } = null!;

    public decimal NPrice { get; set; }

    public int NQuantity { get; set; }

    public DateTime? DRelease { get; set; }

    public int NAuthorId { get; set; }

    public DateTime? DUpdate { get; set; }

    public bool IsDelete { get; set; }

    public DateTime? DDelete { get; set; }
}
