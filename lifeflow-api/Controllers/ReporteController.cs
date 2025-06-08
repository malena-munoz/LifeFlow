using lifeflow_api.Models;
using lifeflow_api.Models.Scaffold;
using lifeflow_api.Models.Objects;
using lifeflow_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace lifeflow_api.Controllers
{
    [Route("api/reporte")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        private readonly LifeFlowContext _context;
        private readonly IUsuarioService _usuarioService;
        private readonly ICicloService _cicloService;
        private readonly IReporteService _reporteService;

        public ReporteController(LifeFlowContext context, IUsuarioService usuarioService, 
            ICicloService cicloService, IReporteService reporteService)
        {
            _context = context;
            _usuarioService = usuarioService;
            _cicloService = cicloService;
            _reporteService = reporteService;
        }

        [HttpGet("opcion-1")]
        public async Task<ActionResult<ReporteOpcion1>> GenerarReporteOpcion1([FromHeader] string IdUsuario)
        {
            try
            {
                bool Existe = await _usuarioService.UsuarioExiteDuranteHTTP(IdUsuario);

                if (Existe)
                {
                    ReporteOpcion1 Reporte = _reporteService.Reporte_Opcion1(IdUsuario);

                    return Ok(Reporte);
                } 
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("excel-opcion-1/{IdUsuario}")]
        public async Task<ActionResult> ExcelOpcion1(string IdUsuario)
        {
            try
            {

                bool Existe = await _usuarioService.UsuarioExiteDuranteHTTP(IdUsuario);

                if (Existe && !string.IsNullOrWhiteSpace(IdUsuario))
                {
                    Usuario Usuario = await _usuarioService.UsuarioPorId(IdUsuario);

                    if (Usuario == null) return BadRequest();

                    ReporteOpcion1 Reporte = _reporteService.Reporte_Opcion1(IdUsuario);

                    byte[] BytesExcel = _reporteService.Excel_Opcion1(Reporte, Usuario);

                    return File(
                        BytesExcel,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Reporte.xlsx"
                    );
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("opcion-2")]
        public async Task<ActionResult<ReporteOpcion2>> GenerarReporteOpcion2([FromHeader] string IdUsuario)
        {
            try
            {
                bool Existe = await _usuarioService.UsuarioExiteDuranteHTTP(IdUsuario);

                if (Existe)
                {
                    ReporteOpcion2 Reporte = _reporteService.Reporte_Opcion2(IdUsuario);

                    return Ok(Reporte);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }
}
