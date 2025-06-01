using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lifeflow_api.Models;
using lifeflow_api.Models.Scaffold;
using System.Text.Json;
using lifeflow_api.Models.Objects;
using lifeflow_api.Services;

namespace lifeflow_api.Controllers
{
    [Route("api/info-diaria")]
    [ApiController]
    public class InformacionDiariaController : ControllerBase
    {
        private readonly LifeFlowContext _context;
        private readonly ICicloService _cicloService;

        public InformacionDiariaController(LifeFlowContext context, ICicloService cicloService)
        {
            _context = context;
            _cicloService = cicloService;
        }

        
        [HttpPost("trimestre/{id}")]
        public async Task<ActionResult<List<InformacionDiaria>>> InformacionDiariaTrimestre(string Id, [FromBody] JsonElement Json)
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
                        List<InformacionDiaria> InformacionDiariaTrimestre = _context.InformacionDiaria
                            .Where(i => i.IdUsuario.Equals(Id))
                            .Where(i => i.Fecha >= PeriodoTrimestre.Inicio && i.Fecha <= PeriodoTrimestre.Final)
                            .ToList();

                        return Ok(InformacionDiariaTrimestre);
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

        [HttpPost("guardar/{id}")]
        public async Task<ActionResult> GetInformacionDiaria(string Id, [FromBody] JsonElement Json)
        {   
            try
            {
                // Nombre y Apellidos
                string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
                string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;

                // Datos del último ciclo
                JsonElement JsonInformacionDiaria = Json.GetProperty("InformacionDiaria");
                InformacionDiaria InformacionDiaria = JsonInformacionDiaria.Deserialize<InformacionDiaria>() ?? null!;

                if (!string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos) 
                    && !string.IsNullOrWhiteSpace(Id) && InformacionDiaria != null)
                {
                    bool UsuarioRegistrado = await _context.Usuarios
                        .AnyAsync(u => u.Id.Equals(Id) && u.Nombre.Equals(Nombre) && u.Apellidos.Equals(Apellidos));

                    if (UsuarioRegistrado)
                    {
                        InformacionDiaria.Id = Guid.NewGuid();
                        _context.InformacionDiaria.Add(InformacionDiaria);
                        _context.SaveChanges();

                        return NoContent();
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



    }
}
