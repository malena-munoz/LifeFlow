using LifeFlow.Models.Database;
using lifeflow_api.Models.Database;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using System.Text.Json;

namespace LifeFlow.Models
{
    public class LifeFlowContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public LifeFlowContext(DbContextOptions<LifeFlowContext> options, IConfiguration configuration) : base(options) 
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("LifeFlowConnection")); 
            }
        }


        public DbSet<Usuario> Usuarios { get; set; } = null!;
        public DbSet<Rol> Roles { get; set; } = null!;
        public DbSet<Recordatorio> Recordatorios { get; set; } = null!;
        public DbSet<Ciclo> Ciclos { get; set; } = null!;
        public DbSet<Sintomas> Sintomas { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("Usuario");

                entity.HasKey(e => e.Identificador);

                entity.Property(e => e.Identificador).HasColumnName("Id");

                entity.Property(e => e.IdRol).HasColumnName("Id_Rol");

                entity.HasOne(u => u.Rol)
                    .WithOne(e => e.Usuario)
                    .HasForeignKey<Usuario>(e => e.IdRol)
                    .IsRequired().OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.ToTable("Rol");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.NombreRol).HasColumnName("Nombre");
            });

            modelBuilder.Entity<Recordatorio>(entity =>
            {
                entity.ToTable("Recordatorio");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Identificador).HasColumnName("Identificador");

                entity.Property(e => e.IdRecordatorio).HasColumnName("Id_Recordatorio");
            });

            modelBuilder.Entity<Ciclo>(entity =>
            {
                entity.ToTable("Ciclo");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Identificador).HasColumnName("Id_Usuario");

                entity.Property(e => e.IdSintomas).HasColumnName("Id_Sintomas");

                entity.Property(e => e.InicioCiclo)
                    .HasColumnName("InicioCiclo")
                    .HasColumnType("date");

                entity.Property(e => e.DuracionCiclo)
                    .HasColumnName("DuracionCiclo")
                    .HasColumnType("real");

                entity.Property(e => e.DuracionMenstruacion)
                    .HasColumnName("DuracionMenstruacion")
                    .HasColumnType("real");

                entity.Property(e => e.Embarazo)
                    .HasColumnName("Embarazo")
                    .HasColumnType("bit");

                entity.Property(e => e.PrediccionInicioCiclo)
                    .HasColumnName("PrediccionInicioCiclo")
                    .HasColumnType("real");

                entity.Property(e => e.PrediccionDuracionCiclo)
                    .HasColumnName("PrediccionDuracionCiclo")
                    .HasColumnType("real");

                entity.Property(e => e.PrediccionInicioOvulacion)
                    .HasColumnName("PrediccionInicioOvulacion")
                    .HasColumnType("real");

                entity.Property(e => e.PrediccionDuracionOvulacion)
                    .HasColumnName("PrediccionDuracionOvulacion")
                    .HasColumnType("real");

                entity.Property(e => e.PrimerCicloRegistrado)
                  .HasColumnName("PrimerCicloRegistrado")
                  .HasColumnType("bit");

            });

            modelBuilder.Entity<Sintomas>(entity =>
            {
                entity.ToTable("Sintomas");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.PruebaEmbarazo).HasColumnName("PruebaEmbarazo");

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

                entity.Property(e => e.SintomasCuerpo)
                   .HasColumnName("SintomasCuerpo")
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
        }

    }
}
