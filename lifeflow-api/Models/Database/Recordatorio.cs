using System.ComponentModel.DataAnnotations;

namespace lifeflow_api.Models.Database
{
    public class Recordatorio
    {
        [Key]
        public Guid Id { get; set; }
        public string Identificador { get; set; } = string.Empty;
        public string IdRecordatorio { get; set; } = string.Empty;
    }
}
