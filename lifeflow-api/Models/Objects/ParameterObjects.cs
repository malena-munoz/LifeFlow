using lifeflow_api.Services;

namespace lifeflow_api.Models.Objects
{
    public class DatosUltimoCiclo
    {
        public float DiaInicioCiclo { get; set; }
        public DateOnly FechaInicioCiclo => new DateOnly(CycleService.MesAnterior.Year, CycleService.MesAnterior.Month, (int) DiaInicioCiclo);
        public float DuracionMenstruacion { get; set; }
        public string DuracionCiclo { get; set; } = string.Empty;
    }
}
