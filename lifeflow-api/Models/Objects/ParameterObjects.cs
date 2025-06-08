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

    public class FaseCiclo
    {
        public DateOnly Desde { get; set; }
        public DateOnly Hasta { get; set; }
    }

    public class ReporteOpcion1
    {
        public int Opcion { get => 1; }
        public Ciclo UltimoCicloReal { get; set; } = new Ciclo();
        public Ciclo PrimerCicloPrediccion { get; set; } = new Ciclo();
        public Dictionary<string, List<DateOnly>> RankingEmociones { get; set; } = new Dictionary<string, List<DateOnly>>();
        public Dictionary<string, List<DateOnly>> RankingMolestias { get; set; } = new Dictionary<string, List<DateOnly>>();
        public Dictionary<string, List<DateOnly>> RankingSintomas { get; set; } = new Dictionary<string, List<DateOnly>>();
        public Dictionary<string, List<DateOnly>> RankingFluido { get; set; } = new Dictionary<string, List<DateOnly>>();
        public Dictionary<string, List<DateOnly>> PruebasEmbarazo { get; set; } = new Dictionary<string, List<DateOnly>>();
    }

    public class ReporteOpcion2
    {
        public int Opcion { get => 2; }
        public Ciclo CicloActual { get; set; } = new Ciclo();
        public FaseCiclo FaseMenstruacion { get; set; } = new FaseCiclo();
        public FaseCiclo FaseFolicular { get; set; } = new FaseCiclo();
        public FaseCiclo FaseOvulacion { get; set; } = new FaseCiclo();
        public FaseCiclo FaseLutea { get; set; } = new FaseCiclo();
        public List<InformacionDiaria> InfoFaseMenstruacion { get; set; } = new List<InformacionDiaria>();
        public List<InformacionDiaria> InfoFaseFolicular { get; set; } = new List<InformacionDiaria>();
        public List<InformacionDiaria> InfoFaseOvulacion { get; set; } = new List<InformacionDiaria>();
        public List<InformacionDiaria> InfoFaseLutea { get; set; } = new List<InformacionDiaria>();
    }
}
