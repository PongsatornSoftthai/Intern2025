using System;
using System.Collections.Generic;

namespace backend2.Models;

public partial class TbBook
{
    public int NBookId { get; set; }

    public string SBookName { get; set; } = null!;

    public decimal NPrice { get; set; }

    public int NQuantity { get; set; }

    public DateTime? DRelease { get; set; }

    public int NAuthorId { get; set; }

    public DateTime? DUpdate { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? DDeleted { get; set; }
}
