using System;
using System.Collections.Generic;

namespace backend2.Models;

public partial class TbTeachers
{
    public string STeacherId { get; set; } = null!;

    public string SFirstName { get; set; } = null!;

    public string SLastName { get; set; } = null!;

    public string? SGender { get; set; }

    public DateOnly? DBirthDate { get; set; }

    public string? SAddress { get; set; }

    public string? SPhoneNumber { get; set; }

    public bool IsDeleted { get; set; }

    public string? SSubjectId { get; set; }

    public DateTime? DUpdate { get; set; }

    public DateTime? DDelete { get; set; }

    public string? SFaculty { get; set; }
}
