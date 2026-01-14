using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Mediwink.DataAccessLayer.Models;

public partial class MediWinkContext : DbContext
{
    public MediWinkContext()
    {
    }

    public MediWinkContext(DbContextOptions<MediWinkContext> options)
        : base(options)
    {
    }

    public virtual DbSet<DocLink> DocLinks { get; set; }

    public virtual DbSet<Medicine> Medicines { get; set; }

    public virtual DbSet<PrescMedicine> PrescMedicines { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source =(localdb)\\MSSQLLocalDB;Initial Catalog=MediWink;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DocLink>(entity =>
        {
            entity.HasKey(e => e.LinkId).HasName("pk_linkId");

            entity.ToTable("DOC_LINK");

            entity.Property(e => e.LinkId)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(6, 0)")
                .HasColumnName("LINK_ID");
            entity.Property(e => e.DocId)
                .HasColumnType("numeric(5, 0)")
                .HasColumnName("DOC_ID");
            entity.Property(e => e.LinkDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("LINK_DATE");
            entity.Property(e => e.PatientId)
                .HasColumnType("numeric(5, 0)")
                .HasColumnName("PATIENT_ID");

            entity.HasOne(d => d.Doc).WithMany(p => p.DocLinkDocs)
                .HasForeignKey(d => d.DocId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_docId");

            entity.HasOne(d => d.Patient).WithMany(p => p.DocLinkPatients)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_patientId");
        });

        modelBuilder.Entity<Medicine>(entity =>
        {
            entity.HasKey(e => e.MedId).HasName("pk_medId");

            entity.ToTable("MEDICINES");

            entity.Property(e => e.MedId)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(5, 0)")
                .HasColumnName("MED_ID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("CREATED_DATE");
            entity.Property(e => e.MedName)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("MED_NAME");
            entity.Property(e => e.MedType)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("MED_TYPE");
        });

        modelBuilder.Entity<PrescMedicine>(entity =>
        {
            entity.HasKey(e => e.PrescMedid).HasName("pk_pRES_medId");

            entity.ToTable("PRESC_MEDICINE");

            entity.Property(e => e.PrescMedid)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(5, 0)")
                .HasColumnName("PRESC_MEDID");
            entity.Property(e => e.Dosage)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("DOSAGE");
            entity.Property(e => e.Duration)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("DURATION");
            entity.Property(e => e.Frequency)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("FREQUENCY");
            entity.Property(e => e.MedId)
                .HasColumnType("numeric(5, 0)")
                .HasColumnName("MED_ID");
            entity.Property(e => e.PatientId)
                .HasColumnType("numeric(5, 0)")
                .HasColumnName("PATIENT_ID");
            entity.Property(e => e.Remarks)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("REMARKS");

            entity.HasOne(d => d.Med).WithMany(p => p.PrescMedicines)
                .HasForeignKey(d => d.MedId)
                .HasConstraintName("fk_medId");

            entity.HasOne(d => d.Patient).WithMany(p => p.PrescMedicines)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_patId");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("pk_userId");

            entity.ToTable("USERS");

            entity.HasIndex(e => e.Email, "uk_email").IsUnique();

            entity.Property(e => e.Userid)
                .ValueGeneratedOnAdd()
                .HasColumnType("numeric(5, 0)")
                .HasColumnName("USERID");
            entity.Property(e => e.Contact)
                .HasColumnType("numeric(15, 0)")
                .HasColumnName("CONTACT");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("CREATED_BY");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("CREATED_DATE");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("EMAIL");
            entity.Property(e => e.Gender)
                .IsRequired()
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("GENDER");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasDefaultValueSql("((1))")
                .IsFixedLength()
                .HasColumnName("IS_ACTIVE");
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("PASSWORD");
            entity.Property(e => e.UserName)
                .IsRequired()
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("USER_NAME");
            entity.Property(e => e.UserType)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("USER_TYPE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
