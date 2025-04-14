using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace LifeFlow.Models.Database
{
    public class Rol
    {
        [Key]
        public Guid Id { get; set; }
        public string NombreRol { get; set; } = string.Empty;

        public virtual Usuario? Usuario { get; set; }
    }
}
