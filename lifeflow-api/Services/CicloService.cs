using lifeflow_api.Models;
using lifeflow_api.Models.Scaffold;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace lifeflow_api.Services
{
    public interface ICicloService
    {
        bool TieneCiclos(string IdUsuario);
        DateOnly ObtenerFechaUltimoCiclo(int Dia);
        float DuracionCiclo(string Duracion);
        (DateOnly Inicio, DateOnly Final) PeriodoTrimestre();
        (Ciclo ciclo1, Ciclo ciclo2) PredecirDosSiguientesCiclos(Ciclo CicloBase);
        Ciclo ObtenerDiaDeSangrado(DateOnly FechaSangrado);
        Ciclo? ObtenerCicloDeUnDiaDeSangrado(DateOnly FechaSangrado, string IdUsuario);
        (Ciclo? Ciclo, string Posicion) ObtenerCicloConInicioCercano(DateOnly FechaSangrado, string IdUsuario);
        (Ciclo? Ciclo, string Posicion) ObtenerCicloRelativo(DateOnly FechaSangrado, string id);
    }

    public class CicloService : ICicloService
    {
        private readonly LifeFlowContext _context;

        public CicloService(LifeFlowContext context)
        {
            _context = context;
        }
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public DateOnly ObtenerFechaUltimoCiclo(int Dia)
        {
            DateTime Hoy = DateTime.Today;
            DateTime FechaAnterior  = new DateTime(Hoy.Year, Hoy.Month, Dia).AddMonths(-1);

            return DateOnly.FromDateTime(FechaAnterior);
        }
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public float DuracionCiclo(string Duracion) => Duracion.Equals("corto")
           ? 25 : Duracion.Equals("largo") ? 32 : 28;
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public bool TieneCiclos(string IdUsuario) => _context.Ciclos.Any(c => c.IdUsuario.Equals(IdUsuario));
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public (DateOnly Inicio, DateOnly Final) PeriodoTrimestre()
        {
            DateTime Hoy = DateTime.Today;
            DateTime Inicio = new DateTime(Hoy.Year, Hoy.Month, 1).AddMonths(-1);
            DateTime Final = new DateTime(Hoy.Year, Hoy.Month, 1).AddMonths(2).AddDays(-1);

            return (DateOnly.FromDateTime(Inicio), DateOnly.FromDateTime(Final));
        }
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public (Ciclo ciclo1, Ciclo ciclo2) PredecirDosSiguientesCiclos(Ciclo CicloBase)
        {
            // Primer ciclo predicho (basado solo en cicloBase)
            int DuracionCiclo1 = (int) Math.Round(CicloBase.DuracionCiclo);
            var InicioPrimerPrediccion = CicloBase.InicioCiclo.AddDays(DuracionCiclo1);

            Ciclo PrimerCicloPredicho = new Ciclo
            {
                Id = Guid.NewGuid(),
                InicioCiclo = InicioPrimerPrediccion,
                DuracionCiclo = CicloBase.DuracionCiclo,
                DuracionMenstruacion = CicloBase.DuracionMenstruacion,
                EsPrediccion = true
            };

            // Promedios entre cicloBase y primer predicho
            float DuracionPromedio = (CicloBase.DuracionCiclo + PrimerCicloPredicho.DuracionCiclo) / 2;
            float MenstruacionPromedio = (CicloBase.DuracionMenstruacion + PrimerCicloPredicho.DuracionMenstruacion) / 2;

            int DuracionCiclo2Dias = (int) Math.Round(DuracionPromedio);
            DateOnly InicioSegundaPrediccion = PrimerCicloPredicho.InicioCiclo.AddDays(DuracionCiclo2Dias);

            Ciclo SegundoCicloPredicho = new Ciclo
            {
                Id = Guid.NewGuid(),
                InicioCiclo = InicioSegundaPrediccion,
                DuracionCiclo = DuracionPromedio,
                DuracionMenstruacion = MenstruacionPromedio,
                EsPrediccion = true
            };

            return (PrimerCicloPredicho, SegundoCicloPredicho);
        }
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public Ciclo ObtenerDiaDeSangrado(DateOnly FechaSangrado)
        {
            Ciclo? DiaDeSangrado = _context.Ciclos
                .FirstOrDefault(c => c.InicioCiclo.Equals(FechaSangrado) 
                && c.DuracionCiclo.Equals(0) && c.EsPrediccion);

            return DiaDeSangrado ?? null!;
        }
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public Ciclo? ObtenerCicloDeUnDiaDeSangrado(DateOnly FechaSangrado, string IdUsuario)
        {
            return _context.Ciclos
                .Where(c => c.IdUsuario.Equals(IdUsuario) && c.DuracionCiclo > 0)
                .AsEnumerable() // Para poder usar AddDays con DateOnly (no soportado en LINQ to Entities)
                .FirstOrDefault(c =>
                {
                    int Duracion = (int) Math.Round(c.DuracionCiclo);
                    DateOnly FinCiclo = c.InicioCiclo.AddDays(Duracion);
                    return FechaSangrado >= c.InicioCiclo && FechaSangrado < FinCiclo;
                });
        }
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public (Ciclo? Ciclo, string Posicion) ObtenerCicloConInicioCercano(DateOnly FechaSangrado, string IdUsuario)
        {
            List<Ciclo> Ciclos = _context.Ciclos.Where(c => c.IdUsuario.Equals(IdUsuario)).ToList();
            
            var CicloAntes = Ciclos.FirstOrDefault(c => c.InicioCiclo.AddDays(-1) == FechaSangrado);
            if (CicloAntes != null) return (CicloAntes, "antes");

            var CicloDespues = Ciclos.FirstOrDefault(c => c.InicioCiclo.AddDays((int) c.DuracionMenstruacion) == FechaSangrado);
            if (CicloDespues != null) return (CicloDespues, "despues");

            return (null, string.Empty);
        }
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        public (Ciclo? Ciclo, string Posicion) ObtenerCicloRelativo(DateOnly FechaSangrado, string IdUsuario)
        {
            List<Ciclo> Ciclos = _context.Ciclos.Where(c => c.IdUsuario.Equals(IdUsuario)).ToList();

            Ciclo? CicloInicio = Ciclos.FirstOrDefault(c => c.InicioCiclo == FechaSangrado);
            if (CicloInicio != null) return (CicloInicio, "inicio");

            Ciclo? CicloFinal = Ciclos.FirstOrDefault(c => c.InicioCiclo.AddDays((int) c.DuracionMenstruacion) == FechaSangrado.AddDays(1));
            if (CicloFinal != null) return (CicloFinal, "final");

            Ciclo? CicloMediante = Ciclos.FirstOrDefault(c => 
            {
                return FechaSangrado < c.InicioCiclo.AddDays((int) c.DuracionMenstruacion) && FechaSangrado > c.InicioCiclo;
            });
            if (CicloFinal != null) return (CicloFinal, "mediante");

            return (null, string.Empty);
        }
    }
}
