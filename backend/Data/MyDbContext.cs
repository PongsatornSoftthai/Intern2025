using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

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
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:MyDB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Thai_100_CI_AS_SC_UTF8");

        modelBuilder.Entity<TbAuthor>(entity =>
        {
            entity.HasKey(e => e.NAuthorId).HasName("PK__TbAuthou__80C43EBA26CDF552");

            entity.Property(e => e.NAuthorId)
                .ValueGeneratedNever()
                .HasColumnName("nAuthorID");
            entity.Property(e => e.SAuthorName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sAuthorName");
        });

        modelBuilder.Entity<TbBook>(entity =>
        {
            entity.HasKey(e => e.NBookId).HasName("PK__BookDB__EA8ADEC00C3B112D");

            entity.Property(e => e.NBookId)
                .ValueGeneratedNever()
                .HasColumnName("nBookID");
            entity.Property(e => e.DDelete)
                .HasColumnType("datetime")
                .HasColumnName("dDelete");
            entity.Property(e => e.DRelease)
                .HasColumnType("datetime")
                .HasColumnName("dRelease");
            entity.Property(e => e.DUpdate)
                .HasColumnType("datetime")
                .HasColumnName("dUpdate");
            entity.Property(e => e.IsDelete).HasColumnName("isDelete");
            entity.Property(e => e.NAuthorId).HasColumnName("nAuthorID");
            entity.Property(e => e.NPrice)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("nPrice");
            entity.Property(e => e.NQuantity).HasColumnName("nQuantity");
            entity.Property(e => e.SNamebook)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sNamebook");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
