using System.ComponentModel.DataAnnotations;

namespace lifeflow_api.Models.Database
{
    public class Sintomas
    {
        [Key]
        public Guid Id { get; set; }
        public string PruebaEmbarazo { get; set; } = string.Empty;
        public List<string> Emociones { get; set; } = new List<string>();
        public List<string> SintomasCuerpo { get; set; } = new List<string>();
        public List<string> Molestias { get; set; } = new List<string>();
        public List<string> FluidoFemenino { get; set; } = new List<string>();
    }
}
