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

    public virtual DbSet<TbAuthor> TbAuthor { get; set; }

    public virtual DbSet<TbBook> TbBook { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=BookDB;User Id=sa;Password=magna24685;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Thai_100_CI_AS_SC_UTF8");

        modelBuilder.Entity<TbAuthor>(entity =>
        {
            entity.HasKey(e => e.NAuthorId).HasName("PK__TbAuthor__1D377277646BFFED");

            entity.Property(e => e.NAuthorId)
                .ValueGeneratedNever()
                .HasColumnName("nAuthorID");
            entity.Property(e => e.SAuthorName)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("sAuthorName");
        });

        modelBuilder.Entity<TbBook>(entity =>
        {
            entity.HasKey(e => e.NBookId).HasName("PK__TbBook__EA8ADEC0A439B842");

            entity.Property(e => e.NBookId)
                .ValueGeneratedNever()
                .HasColumnName("nBookID");
            entity.Property(e => e.DDeleted)
                .HasColumnType("datetime")
                .HasColumnName("dDeleted");
            entity.Property(e => e.DRelease)
                .HasColumnType("datetime")
                .HasColumnName("dRelease");
            entity.Property(e => e.DUpdate)
                .HasColumnType("datetime")
                .HasColumnName("dUpdate");
            entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            entity.Property(e => e.NAuthorId).HasColumnName("nAuthorID");
            entity.Property(e => e.NPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("nPrice");
            entity.Property(e => e.NQuantity).HasColumnName("nQuantity");
            entity.Property(e => e.SBookName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("sBookName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
