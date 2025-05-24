using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace LifeFlow.Models.Database
{
    public class Rol
    {
        public static readonly Guid USER = new Guid("95DEF098-E4FB-4D36-9167-4775CB6C0D06");
        public static readonly Guid ADMIN = new Guid("A609726B-BB90-426D-A233-C15C890133B0");

        [Key]
        public Guid Id { get; set; }
        public string NombreRol { get; set; } = string.Empty;

        public virtual Usuario? Usuario { get; set; }
    }
}
