using LifeFlow.Models.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lifeflow_api.Models.Database
{
    public class Ciclo
    {
        [Key]
        public Guid Id { get; set; }
        public string Identificador { get; set; } = string.Empty;
        public Guid IdSintomas { get; set; }

        public DateOnly InicioCiclo { get; set; }
        [NotMapped]
        public float Mes => InicioCiclo.Month;
        [NotMapped]
        public float Anio => InicioCiclo.Year;

        public float DuracionCiclo { get; set; }
        public float DuracionMenstruacion { get; set; }
        public bool Embarazo { get; set; }
        public bool PrimerCicloRegistrado { get; set; } = false;

        public float? PrediccionInicioCiclo { get; set; }
        public float? PrediccionDuracionCiclo { get; set; }
        public float? PrediccionInicioOvulacion { get; set; }
        public float? PrediccionDuracionOvulacion { get; set; }


        public static Ciclo Desconocido = new Ciclo
        {
            Id = Guid.NewGuid(),
            InicioCiclo = DateOnly.MinValue,
            DuracionCiclo = -1
        };
    }
}
