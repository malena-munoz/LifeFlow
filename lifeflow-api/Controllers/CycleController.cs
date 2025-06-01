using lifeflow_api.Models;
using lifeflow_api.Models.Scaffold;
using lifeflow_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace lifeflow_api.Controllers
{
    [Route("api/ciclos")]
    [ApiController]
    public class CycleController : ControllerBase
    {
        private readonly LifeFlowContext _context;
        private readonly IUserService _userService;
        private readonly ICicloService _cicloService;

        public CycleController(LifeFlowContext context, IUserService userService, ICicloService cicloService)
        {
            _context = context;
            _userService = userService;
            _cicloService = cicloService;
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

        [HttpPost("trimestre/{id}")]
        public async Task<ActionResult<List<InformacionDiaria>>> CiclosTrimestre(string Id, [FromBody] JsonElement Json)
        {
            try
            {
                // Nombre y Apellidos
                string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
                string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;

                if (!string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos) && !string.IsNullOrWhiteSpace(Id))
                {
                    bool UsuarioRegistrado = await _context.Usuarios
                        .AnyAsync(u => u.Id.Equals(Id) && u.Nombre.Equals(Nombre) && u.Apellidos.Equals(Apellidos));

                    if (UsuarioRegistrado)
                    {
                        (DateOnly Inicio, DateOnly Final) PeriodoTrimestre = _cicloService.PeriodoTrimestre();
                        List<Ciclo> CiclosTrimestre = _context.Ciclos
                            .Where(i => i.IdUsuario.Equals(Id))
                            .Where(i => i.InicioCiclo >= PeriodoTrimestre.Inicio && i.InicioCiclo <= PeriodoTrimestre.Final)
                            .ToList();

                        return Ok(CiclosTrimestre);
                    }
                    else
                    {
                        return NotFound();
                    }
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
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    }
}
