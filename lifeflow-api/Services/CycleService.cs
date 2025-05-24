using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace lifeflow_api.Services
{
    public class CycleService
    {
        public static DateOnly MesAnterior => DateOnly.FromDateTime(DateTime.Today.AddMonths(-1));

        public static float DuracionCiclo(string Duracion) => Duracion.Equals("corto")
            ? 25 : Duracion.Equals("largo") ? 32 : 28;

    }
}
