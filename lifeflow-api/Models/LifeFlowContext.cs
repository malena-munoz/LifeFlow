using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using lifeflow_api.Models.Scaffold;
using System.Text.Json;

namespace lifeflow_api.Models;

public partial class LifeFlowContext : DbContext
{
    public LifeFlowContext()
    {
    }

    public LifeFlowContext(DbContextOptions<LifeFlowContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ciclo> Ciclos { get; set; }

    public virtual DbSet<Embarazo> Embarazos { get; set; }

    public virtual DbSet<InformacionDiaria> InformacionDiaria { get; set; }

    public virtual DbSet<Recordatorio> Recordatorios { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=malena\\MSSQLSERVER01;Initial Catalog=LifeFlow;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ciclo>(entity =>
        {
            entity.ToTable("Ciclo");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.IdUsuario).HasMaxLength(50);

            entity.HasOne(d => d.IdEmbarazazoNavigation).WithMany(p => p.Ciclos)
                .HasForeignKey(d => d.IdEmbarazazo)
                .HasConstraintName("FK_Ciclo_Embarazo");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Ciclos)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Ciclo_Usuario");
        });

        modelBuilder.Entity<Embarazo>(entity =>
        {
            entity.ToTable("Embarazo");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.IdUsuario).HasMaxLength(50);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Embarazos)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Embarazo_Usuario");
        });

        modelBuilder.Entity<InformacionDiaria>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.IdUsuario).HasMaxLength(50);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.InformacionDiaria)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_InformacionDiaria_Usuario");

            entity.Property(e => e.Emociones)
                    .HasColumnName("Emociones")
                    .HasColumnType("nvarchar(max)")
                    .HasConversion
                    (
                         v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
                         v => JsonSerializer.Deserialize<List<string>>(v, JsonSerializerOptions.Default) ?? new List<string>()
                    );

            entity.Property(e => e.Molestias)
               .HasColumnName("Molestias")
               .HasColumnType("nvarchar(max)")
               .HasConversion
               (
                    v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
                    v => JsonSerializer.Deserialize<List<string>>(v, JsonSerializerOptions.Default) ?? new List<string>()
               );

            entity.Property(e => e.Sintomas)
               .HasColumnName("Sintomas")
               .HasColumnType("nvarchar(max)")
               .HasConversion
               (
                    v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
                    v => JsonSerializer.Deserialize<List<string>>(v, JsonSerializerOptions.Default) ?? new List<string>()
               );

            entity.Property(e => e.FluidoFemenino)
               .HasColumnName("FluidoFemenino")
               .HasColumnType("nvarchar(max)")
               .HasConversion
               (
                    v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
                    v => JsonSerializer.Deserialize<List<string>>(v, JsonSerializerOptions.Default) ?? new List<string>()
               );
        });

        modelBuilder.Entity<Recordatorio>(entity =>
        {
            entity.ToTable("Recordatorio");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.IdUsuario).HasMaxLength(50);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Recordatorios)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Recordatorio_Usuario");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.ToTable("Rol");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("Usuario");

            entity.Property(e => e.Id).HasMaxLength(50);

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Usuario_Rol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
