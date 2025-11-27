using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend2.Models;

namespace backend2.Data;

public partial class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TbSubjects> TbSubjects { get; set; }

    public virtual DbSet<TbTeachers> TbTeachers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:MyDB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TbSubjects>(entity =>
        {
            entity.HasKey(e => e.SSubjectId).HasName("PK__TbSubjec__E04314696E48F211");

            entity.Property(e => e.SSubjectId)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("sSubjectID");
            entity.Property(e => e.DDelete)
                .HasColumnType("datetime")
                .HasColumnName("dDelete");
            entity.Property(e => e.DUpdate)
                .HasColumnType("datetime")
                .HasColumnName("dUpdate");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.NCredit).HasColumnName("nCredit");
            entity.Property(e => e.SName)
                .HasMaxLength(255)
                .HasColumnName("sName");
        });

        modelBuilder.Entity<TbTeachers>(entity =>
        {
            entity.HasKey(e => e.STeacherId).HasName("PK__TbTeache__93E9014BDFF6A80A");

            entity.Property(e => e.STeacherId)
                .HasMaxLength(7)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("sTeacherID");
            entity.Property(e => e.DBirthDate).HasColumnName("dBirthDate");
            entity.Property(e => e.DDelete)
                .HasColumnType("datetime")
                .HasColumnName("dDelete");
            entity.Property(e => e.DUpdate)
                .HasColumnType("datetime")
                .HasColumnName("dUpdate");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.SAddress).HasColumnName("sAddress");
            entity.Property(e => e.SFaculty)
                .HasMaxLength(255)
                .HasColumnName("sFaculty");
            entity.Property(e => e.SFirstName)
                .HasMaxLength(255)
                .HasColumnName("sFirstName");
            entity.Property(e => e.SGender)
                .HasMaxLength(10)
                .HasColumnName("sGender");
            entity.Property(e => e.SLastName)
                .HasMaxLength(255)
                .HasColumnName("sLastName");
            entity.Property(e => e.SPhoneNumber)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("sPhoneNumber");
            entity.Property(e => e.SSubjectId)
                .HasMaxLength(7)
                .IsFixedLength()
                .HasColumnName("sSubjectID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
