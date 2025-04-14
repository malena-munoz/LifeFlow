using System.ComponentModel.DataAnnotations;

namespace LifeFlow.Models.Database
{
    public class Etiqueta
    {
        [Key]
        public Guid Id { get; set; }

        public string NombreEtiqueta { get; set; } = string.Empty;

        public string ImagenEtiqueta { get; set; } = string.Empty;

        [Range(1, 5)]
        public int? Intensidad { get; set; } = null;
    }
}
