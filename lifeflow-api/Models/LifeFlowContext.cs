using LifeFlow.Models.Database;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

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
        public DbSet<Etiqueta> Etiquetas { get; set; } = null!;


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

            modelBuilder.Entity<Etiqueta>(entity =>
            {
                entity.ToTable("Etiqueta");
                 
                entity.HasKey(e => e.Id); 

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.NombreEtiqueta)
                    .HasColumnName("Nombre")
                    .IsRequired(); 

                entity.Property(e => e.ImagenEtiqueta)
                    .HasColumnName("Imagen")
                    .IsRequired(); 

                entity.Property(e => e.Intensidad)
                    .HasDefaultValue(null) 
                    .HasColumnType("int")
                    .HasColumnName("Intensidad"); 
            });

        }

    }
}
