using lifeflow_api.Models.Scaffold;
using lifeflow_api.Services;

namespace lifeflow_api.Models.Objects
{
    public class DatosCicloBase
    {
        public int DiaInicioCiclo { get; set; }
        public int DuracionMenstruacion { get; set; }
        public string DuracionCiclo { get; set; } = string.Empty;
    }

    public class InformacionDiariaTrimestral
    {
        public InformacionDiaria InformacionMesAnterior { get; set; } = null!;
        public InformacionDiaria InformacionMesActual { get; set; } = null!;
        public InformacionDiaria InformacionMesSiguiente { get; set; } = null!;
    }
}
