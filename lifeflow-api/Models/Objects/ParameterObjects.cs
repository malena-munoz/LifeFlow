using lifeflow_api.Models.Scaffold;
using lifeflow_api.Services;
using System.Globalization;

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

    public class ReporteOpcion3
    {
        public int Opcion { get => 3; }
        public List<Ciclo> Menstruaciones { get; set; } = new List<Ciclo>();
        public List<List<string>> MenstruacionesFilas 
        { 
            get
            {
                List<List<string>> Filas = new List<List<string>>();

                foreach (Ciclo Menstruacion in Menstruaciones)
                {
                    var cultura = new CultureInfo("es-ES");

                    string InicioFormateado = Menstruacion.InicioCiclo
                        .ToDateTime(TimeOnly.MinValue) // convertir DateOnly a DateTime
                        .ToString("dddd, d 'de' MMMM 'de' yyyy", cultura);

                    // Capitalizar la primera letra
                    InicioFormateado = char.ToUpper(InicioFormateado[0]) + InicioFormateado[1..];

                    Filas.Add(new List<string>
                    {
                        InicioFormateado,
                        Menstruacion.DuracionMenstruacion.ToString(),
                        Menstruacion.DuracionCiclo.ToString()
                    });
                }

                return Filas;
            }
        }
        public List<Ciclo> Sangrados { get; set; } = new List<Ciclo>();
        public List<List<string>> SangradosFilas
        {
            get
            {
                List<List<string>> Filas = new List<List<string>>();

                foreach (Ciclo Sangrado in Sangrados)
                {
                    Filas.Add(new List<string> {
                        Sangrado.InicioCiclo.ToString("yyyy-MM-dd")
                    });
                }

                return Filas;
            }
        }
    }
}
