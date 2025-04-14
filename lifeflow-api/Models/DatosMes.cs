namespace LifeFlow.Models
{
    public class DatosMes
    {
        public DatosMes(int Anio, int Mes)
        {
            this.Anio = Anio;
            this.Mes = Mes;
        }

        public int Mes { get; set; }
        public int Anio { get; set; }

        public List<DateOnly> DiasMes
        {
            get
            {
                // Lista de dias del mes
                List<DateOnly> DiasMes = Enumerable.Range(1, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month))
                .Select(dia => new DateOnly(DateTime.Now.Year, DateTime.Now.Month, dia)).ToList();

                DateOnly PrimerDia = DiasMes[0];
                DateOnly UltimoDia = DiasMes[DiasMes.Count() - 1];

                for (int Inicio = 1; Inicio < (int) PrimerDia.DayOfWeek; Inicio++)
                {
                    DiasMes.Insert(0, PrimerDia.AddDays(-Inicio));
                }
                for (int Final = 1; Final <= (int) UltimoDia.DayOfWeek; Final++)
                {
                    DiasMes.Add(UltimoDia.AddDays(Final));
                }

                return DiasMes;
            }
        }

    }
}
