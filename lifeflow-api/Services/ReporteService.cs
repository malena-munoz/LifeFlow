using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using lifeflow_api.Models;
using lifeflow_api.Models.Objects;
using lifeflow_api.Models.Scaffold;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace lifeflow_api.Services
{
    public interface IReporteService
    {
        ReporteOpcion1 Reporte_Opcion1(string IdUsuario);
        byte[] Excel_Opcion1(ReporteOpcion1 Reporte, Usuario Usuario);
        ReporteOpcion2 Reporte_Opcion2(string IdUsuario);
        object Reporte_Opcion3(string IdUsuario);
        object Reporte_Opcion4(string IdUsuario);

    }

    public class ReporteService : IReporteService
    {
        private readonly LifeFlowContext _context;
        public ReporteService(LifeFlowContext context)
        {
            _context = context;
        }

        private void Excel_EstilosPrevios(IXLWorksheet Worksheet)
        {
            Worksheet.Column(1).Width = 3;
            Worksheet.Row(1).Height = 15;
        }

        private void Excel_EstilosPosteriores(IXLWorksheet Worksheet)
        {
            Worksheet.CellsUsed().Style
                .Alignment.SetVertical(XLAlignmentVerticalValues.Center)
                .Font.SetFontName("Arial");

            Worksheet.RowsUsed().AdjustToContents();
            foreach (IXLRow Row in Worksheet.RowsUsed())
            {
                Row.Height = Row.Height + 10;
            }

            foreach (IXLColumn Column in Worksheet.ColumnsUsed())
            {
                Column.Width = Column.Width + 3;
            }
        }

        private void Excel_DatosUsuario(IXLWorksheet Worksheet, Usuario Usuario)
        {
            Worksheet.Range(Worksheet.Cell(2, 2), Worksheet.Cell(2, 3)).Merge()
                .SetValue("Usuario").Style
                .Fill.SetBackgroundColor(XLColor.FromHtml("#0D47A1"))
                .Font.SetBold(true).Font.SetFontColor(XLColor.White);

            Worksheet.Cell(3, 2).SetValue("ID").Style
                .Font.SetFontColor(XLColor.FromHtml("#c2185b"))
                .Font.SetBold(true);

            Worksheet.Cell(4, 2).SetValue("Nombre").Style
                .Font.SetFontColor(XLColor.FromHtml("#c2185b"))
                .Font.SetBold(true);

            Worksheet.Cell(5, 2).SetValue("Apellidos").Style
                .Font.SetFontColor(XLColor.FromHtml("#c2185b"))
                .Font.SetBold(true);

            Worksheet.Cell(3, 3).SetValue(Usuario.Id);
            Worksheet.Cell(4, 3).SetValue(Usuario.Nombre);
            Worksheet.Cell(5, 3).SetValue(Usuario.Apellidos);
            Worksheet.Column(2).Width = Worksheet.Column(2).Width + 5;
            Worksheet.Column(3).AdjustToContents();
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        // Devuelve los datos estructurados para el reporte 1: Comparación del ciclo actual y último ciclo
        public ReporteOpcion1 Reporte_Opcion1(string IdUsuario)
        {
            List<Ciclo> Ciclos = _context.Ciclos
                .Where(c => c.IdUsuario.Equals(IdUsuario)).ToList();

            // El último ciclo real sería el último registrado como no predictivo
            Ciclo? UltimoCicloReal = Ciclos
                .Where(c => !c.EsPrediccion)
                .OrderByDescending(c => c.InicioCiclo)
                .FirstOrDefault();

            // El ciclo actual es el primer ciclo predictivo registrado
            Ciclo? PrimerCicloPrediccion = Ciclos
                .Where(c => c.EsPrediccion)
                .OrderBy(c => c.InicioCiclo)
                .FirstOrDefault();

            // Si alguno de ellos es nulo, se retorna nulo
            if (UltimoCicloReal == null || PrimerCicloPrediccion == null) return null!;

            // Información diaria registrada entre ambos ciclos
            List<InformacionDiaria> InformacionEntreCiclos = _context.InformacionDiaria
                .Where(i => i.IdUsuario.Equals(IdUsuario))
                .Where(delegate (InformacionDiaria i) 
                {
                    return 
                        i.Fecha >= UltimoCicloReal.InicioCiclo &&
                        i.Fecha <= PrimerCicloPrediccion.InicioCiclo.AddDays((int)PrimerCicloPrediccion.DuracionCiclo);
                })
                .ToList();

            // Emociones ordenadas por cantidad de apariciones
            Dictionary<string, List<DateOnly>> RankingEmociones = InformacionEntreCiclos
                .SelectMany(d => d.Emociones.Select(e => new { Emocion = e, d.Fecha }))
                .GroupBy(x => x.Emocion)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.Fecha).Distinct().ToList()
                );

            // Molestias ordenadas por cantidad de apariciones
            Dictionary<string, List<DateOnly>> RankingMolestias = InformacionEntreCiclos
                .SelectMany(d => d.Molestias.Select(e => new { Molestia = e, d.Fecha }))
                .GroupBy(x => x.Molestia)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.Fecha).Distinct().ToList()
                );

            // Sintomas ordenados por cantidad de apariciones
            Dictionary<string, List<DateOnly>> RankingSintomas = InformacionEntreCiclos
              .SelectMany(d => d.Sintomas.Select(e => new { Sintoma = e, d.Fecha }))
                .GroupBy(x => x.Sintoma)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.Fecha).Distinct().ToList()
                );

            // Fluidos ordenados por cantidad de apariciones
            Dictionary<string, List<DateOnly>> RankingFluido = InformacionEntreCiclos
               .SelectMany(d => d.FluidoFemenino.Select(e => new { Fluido = e, d.Fecha }))
                .GroupBy(x => x.Fluido)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.Fecha).Distinct().ToList()
                );

            // Pruebas de embarazo ordenadas por cantidad de apariciones
            Dictionary<string, List<DateOnly>> PruebasEmbarazo = InformacionEntreCiclos
               .Select(d => new { Prueba = d.PruebaEmbarazo, d.Fecha })
                .GroupBy(x => x.Prueba)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.Fecha).Distinct().ToList()
                );

            return new ReporteOpcion1
            {
                PrimerCicloPrediccion = PrimerCicloPrediccion,
                UltimoCicloReal = UltimoCicloReal,
                RankingEmociones = RankingEmociones,
                RankingFluido = RankingFluido,
                RankingMolestias = RankingMolestias,
                RankingSintomas = RankingSintomas,
                PruebasEmbarazo = PruebasEmbarazo
            };
         }

        public byte[] Excel_Opcion1(ReporteOpcion1 Reporte, Usuario Usuario)
        {
            using (XLWorkbook Workbook = new XLWorkbook())
            {
                IXLWorksheet Worksheet = Workbook.Worksheets.Add("Reporte");
                Excel_EstilosPrevios(Worksheet);
                Excel_DatosUsuario(Worksheet, Usuario);

                Worksheet.Cell(9, 4).SetValue("Último ciclo").Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Font.SetBold(true).Fill.SetBackgroundColor(XLColor.FromHtml("#AEE4FF"));
                Worksheet.Column(4).Width = 25;

                Worksheet.Cell(9, 5).SetValue("Ciclo actual").Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Font.SetBold(true).Fill.SetBackgroundColor(XLColor.FromHtml("#AEE4FF"));
                Worksheet.Column(5).Width = 25;

                Worksheet.Range(Worksheet.Cell(7, 2), Worksheet.Cell(7, 5)).Merge()
                    .SetValue("Comparación del último ciclo y el ciclo actual").Style
                    .Fill.SetBackgroundColor(XLColor.FromHtml("#FFC1E3"))
                    .Font.SetBold(true).Font.SetFontColor(XLColor.FromHtml("#8B0A36"));
                Worksheet.Range(Worksheet.Cell(10, 2), Worksheet.Cell(10, 3)).Merge()
                    .SetValue("Fecha").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);
                Worksheet.Range(Worksheet.Cell(11, 2), Worksheet.Cell(11, 3)).Merge()
                    .SetValue("Duración de la menstruación").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);
                Worksheet.Range(Worksheet.Cell(12, 2), Worksheet.Cell(12, 3)).Merge()
                    .SetValue("Duración del ciclo").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);

                Worksheet.Cell(10, 4).SetValue(Reporte.UltimoCicloReal.InicioCiclo.ToString("dd/MM/yyyy")).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Cell(10, 5).SetValue(Reporte.PrimerCicloPrediccion.InicioCiclo.ToString("dd/MM/yyyy")).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Cell(11, 4).SetValue(Reporte.UltimoCicloReal.DuracionMenstruacion).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Cell(11, 5).SetValue(Reporte.PrimerCicloPrediccion.DuracionMenstruacion).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Cell(12, 4).SetValue(Reporte.UltimoCicloReal.DuracionCiclo).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Cell(12, 5).SetValue(Reporte.PrimerCicloPrediccion.DuracionCiclo).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                Worksheet.Range(Worksheet.Cell(15, 4), Worksheet.Cell(15, 3 + Reporte.RankingEmociones.Count())).Merge()
                   .SetValue("Emociones").Style.Font
                   .SetFontColor(XLColor.White)
                   .Fill.SetBackgroundColor(XLColor.FromHtml("#1976D2"))
                   .Font.SetBold(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Range(Worksheet.Cell(17, 2), Worksheet.Cell(17, 3)).Merge()
                   .SetValue("Repeticiones durante ambos ciclos").Style.Font
                   .SetFontColor(XLColor.FromHtml("#c2185b"))
                   .Font.SetBold(true);
                Worksheet.Range(Worksheet.Cell(18, 2), Worksheet.Cell(18, 3)).Merge()
                    .SetValue("Fechas registradas").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);

                for (int Index = 0; Index < Reporte.RankingEmociones.Count(); Index++)
                {
                    string Valor = StaticObjects.Emociones
                        .FirstOrDefault(e => e.Id.ToString() == Reporte.RankingEmociones.ElementAt(Index).Key).Label;

                    Worksheet.Cell(16, 4 + Index).SetValue(Valor).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Font.SetBold(true).Fill.SetBackgroundColor(XLColor.FromHtml("#AEE4FF"));

                    Worksheet.Cell(17, 4 + Index).SetValue(Reporte.RankingEmociones.ElementAt(Index).Value.Count())
                        .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Cell(18, 4 + Index)
                        .SetValue(string.Join("\n", Reporte.RankingEmociones.ElementAt(Index).Value.Select(e => e.ToString("dd/MMM/yyyy"))))
                        .Style.Alignment.SetWrapText(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Column(4 + Index).Width = 25;
                }

                Worksheet.Range(Worksheet.Cell(21, 4), Worksheet.Cell(21, 3 + Reporte.RankingMolestias.Count())).Merge()
                  .SetValue("Molestias").Style.Font
                  .SetFontColor(XLColor.White)
                  .Fill.SetBackgroundColor(XLColor.FromHtml("#1976D2"))
                  .Font.SetBold(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Range(Worksheet.Cell(23, 2), Worksheet.Cell(23, 3)).Merge()
                   .SetValue("Repeticiones durante ambos ciclos").Style.Font
                   .SetFontColor(XLColor.FromHtml("#c2185b"))
                   .Font.SetBold(true);
                Worksheet.Range(Worksheet.Cell(24, 2), Worksheet.Cell(24, 3)).Merge()
                    .SetValue("Fechas registradas").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);

                for (int Index = 0; Index < Reporte.RankingMolestias.Count(); Index++)
                {
                    string Valor = StaticObjects.PartesCuerpo
                        .FirstOrDefault(e => e.Id.ToString() == Reporte.RankingMolestias.ElementAt(Index).Key).Label;

                    Worksheet.Cell(22, 4 + Index).SetValue(Valor).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Font.SetBold(true).Fill.SetBackgroundColor(XLColor.FromHtml("#AEE4FF"));

                    Worksheet.Cell(23, 4 + Index).SetValue(Reporte.RankingMolestias.ElementAt(Index).Value.Count())
                        .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Cell(24, 4 + Index)
                        .SetValue(string.Join("\n", Reporte.RankingMolestias.ElementAt(Index).Value.Select(e => e.ToString("dd/MMM/yyyy"))))
                        .Style.Alignment.SetWrapText(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Column(4 + Index).Width = 25;
                }

                Worksheet.Range(Worksheet.Cell(27, 4), Worksheet.Cell(27, 3 + Reporte.RankingSintomas.Count())).Merge()
                .SetValue("Síntomas").Style.Font
                .SetFontColor(XLColor.White)
                .Fill.SetBackgroundColor(XLColor.FromHtml("#1976D2"))
                .Font.SetBold(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Range(Worksheet.Cell(29, 2), Worksheet.Cell(29, 3)).Merge()
                   .SetValue("Repeticiones durante ambos ciclos").Style.Font
                   .SetFontColor(XLColor.FromHtml("#c2185b"))
                   .Font.SetBold(true);
                Worksheet.Range(Worksheet.Cell(30, 2), Worksheet.Cell(30, 3)).Merge()
                    .SetValue("Fechas registradas").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);

                for (int Index = 0; Index < Reporte.RankingSintomas.Count(); Index++)
                {
                    string Valor = StaticObjects.Sintomas
                        .FirstOrDefault(e => e.Id.ToString() == Reporte.RankingSintomas.ElementAt(Index).Key).Label;

                    Worksheet.Cell(28, 4 + Index).SetValue(Valor).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Font.SetBold(true).Fill.SetBackgroundColor(XLColor.FromHtml("#AEE4FF"));

                    Worksheet.Cell(29, 4 + Index).SetValue(Reporte.RankingSintomas.ElementAt(Index).Value.Count())
                        .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Cell(30, 4 + Index)
                        .SetValue(string.Join("\n", Reporte.RankingSintomas.ElementAt(Index).Value.Select(e => e.ToString("dd/MMM/yyyy"))))
                        .Style.Alignment.SetWrapText(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Column(4 + Index).Width = 25;
                }

                Worksheet.Range(Worksheet.Cell(33, 4), Worksheet.Cell(33, 3 + Reporte.RankingFluido.Count())).Merge()
               .SetValue("Síntomas").Style.Font
               .SetFontColor(XLColor.White)
               .Fill.SetBackgroundColor(XLColor.FromHtml("#1976D2"))
               .Font.SetBold(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Range(Worksheet.Cell(35, 2), Worksheet.Cell(35, 3)).Merge()
                   .SetValue("Repeticiones durante ambos ciclos").Style.Font
                   .SetFontColor(XLColor.FromHtml("#c2185b"))
                   .Font.SetBold(true);
                Worksheet.Range(Worksheet.Cell(36, 2), Worksheet.Cell(36, 3)).Merge()
                    .SetValue("Fechas registradas").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);

                for (int Index = 0; Index < Reporte.RankingFluido.Count(); Index++)
                {
                    string Valor = StaticObjects.Fluido
                        .FirstOrDefault(e => e.Id.ToString() == Reporte.RankingFluido.ElementAt(Index).Key).Label;

                    Worksheet.Cell(34, 4 + Index).SetValue(Valor).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Font.SetBold(true).Fill.SetBackgroundColor(XLColor.FromHtml("#AEE4FF"));

                    Worksheet.Cell(35, 4 + Index).SetValue(Reporte.RankingFluido.ElementAt(Index).Value.Count())
                        .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Cell(36, 4 + Index)
                        .SetValue(string.Join("\n", Reporte.RankingFluido.ElementAt(Index).Value.Select(e => e.ToString("dd/MMM/yyyy"))))
                        .Style.Alignment.SetWrapText(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Column(4 + Index).Width = 25;
                }

                Worksheet.Range(Worksheet.Cell(39, 4), Worksheet.Cell(39, 3 + Reporte.PruebasEmbarazo.Count())).Merge()
                    .SetValue("Síntomas").Style.Font
                    .SetFontColor(XLColor.White)
                    .Fill.SetBackgroundColor(XLColor.FromHtml("#1976D2"))
                    .Font.SetBold(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                Worksheet.Range(Worksheet.Cell(41, 2), Worksheet.Cell(41, 3)).Merge()
                   .SetValue("Repeticiones durante ambos ciclos").Style.Font
                   .SetFontColor(XLColor.FromHtml("#c2185b"))
                   .Font.SetBold(true);
                Worksheet.Range(Worksheet.Cell(42, 2), Worksheet.Cell(42, 3)).Merge()
                    .SetValue("Fechas registradas").Style.Font
                    .SetFontColor(XLColor.FromHtml("#c2185b"))
                    .Font.SetBold(true);

                for (int Index = 0; Index < Reporte.PruebasEmbarazo.Count(); Index++)
                {
                    string Valor = Reporte.PruebasEmbarazo.ElementAt(Index).Key;

                    Worksheet.Cell(40, 4 + Index).SetValue(Valor).Style
                    .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Font.SetBold(true).Fill.SetBackgroundColor(XLColor.FromHtml("#AEE4FF"));

                    Worksheet.Cell(41, 4 + Index).SetValue(Reporte.PruebasEmbarazo.ElementAt(Index).Value.Count())
                        .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Cell(42, 4 + Index)
                        .SetValue(string.Join("\n", Reporte.PruebasEmbarazo.ElementAt(Index).Value.Select(e => e.ToString("dd/MMM/yyyy"))))
                        .Style.Alignment.SetWrapText(true).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    Worksheet.Column(4 + Index).Width = 25;
                }

                Excel_EstilosPosteriores(Worksheet);

                using (MemoryStream Stream = new MemoryStream())
                {
                    Workbook.SaveAs(Stream);
                    return Stream.ToArray();
                } 
            }
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        // Devuelve los datos estructurados para el reporte 2: Correlación entre síntomas y etapas del ciclo actual
        public ReporteOpcion2 Reporte_Opcion2(string IdUsuario)
        {
            ReporteOpcion2 Reporte = new ReporteOpcion2();

            // El ciclo actual es el primer ciclo predictivo registrado
            Ciclo? CicloActual = _context.Ciclos
                .Where(c => c.IdUsuario.Equals(IdUsuario))
                .Where(c => c.EsPrediccion)
                .OrderBy(c => c.InicioCiclo)
                .FirstOrDefault();

            // Si es nulo
            if (CicloActual == null) return null!;

            // Metemos el ciclo actual en el objeto reporte
            Reporte.CicloActual = CicloActual;

            DateOnly Ovulacion = CicloActual.InicioCiclo.AddDays((int)(CicloActual.DuracionCiclo - 14));
            DateOnly InicioFertilidad = Ovulacion.AddDays(-5);
            DateOnly FinCiclo = CicloActual.InicioCiclo.AddDays((int) CicloActual.DuracionCiclo - 1);

            // Menstruación
            Reporte.FaseMenstruacion = new FaseCiclo
            {
                Desde = CicloActual.InicioCiclo,
                Hasta = CicloActual.InicioCiclo.AddDays((int) CicloActual.DuracionMenstruacion - 1)
            };

            Reporte.InfoFaseMenstruacion = _context.InformacionDiaria
                .Where(i => i.IdUsuario.Equals(IdUsuario))
                .Where(i => i.Fecha >= Reporte.FaseMenstruacion.Desde && i.Fecha <= Reporte.FaseMenstruacion.Hasta).ToList();

            // Fase folicular
            Reporte.FaseFolicular = new FaseCiclo
            {
                Desde = CicloActual.InicioCiclo.AddDays((int) CicloActual.DuracionMenstruacion),
                Hasta = InicioFertilidad.AddDays(-1)
            };

            Reporte.InfoFaseFolicular = _context.InformacionDiaria
                .Where(i => i.IdUsuario.Equals(IdUsuario))
                .Where(i => i.Fecha >= Reporte.FaseFolicular.Desde && i.Fecha <= Reporte.FaseFolicular.Hasta).ToList();

            // Ovulación
            Reporte.FaseOvulacion = new FaseCiclo
            {
                Desde = InicioFertilidad,
                Hasta = Ovulacion
            };

            Reporte.InfoFaseOvulacion = _context.InformacionDiaria
                .Where(i => i.IdUsuario.Equals(IdUsuario))
                .Where(i => i.Fecha >= Reporte.FaseOvulacion.Desde && i.Fecha <= Reporte.FaseOvulacion.Hasta).ToList();

            // Fase lútea
            Reporte.FaseLutea = new FaseCiclo
            {
                Desde = Ovulacion.AddDays(1),
                Hasta = FinCiclo
            };

            Reporte.InfoFaseLutea = _context.InformacionDiaria
                .Where(i => i.IdUsuario.Equals(IdUsuario))
                .Where(i => i.Fecha >= Reporte.FaseLutea.Desde && i.Fecha <= Reporte.FaseLutea.Hasta).ToList();

            return Reporte;
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        // Devuelve los datos estructurados para el reporte 3: Estadísticas de los ciclos del último año
        public object Reporte_Opcion3(string IdUsuario)
        {
            throw new NotImplementedException();
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        // Devuelve los datos estructurados para el reporte 4: Variabilidad de los ciclos del último año
        public object Reporte_Opcion4(string IdUsuario)
        {
            throw new NotImplementedException();
        }
    }
}
