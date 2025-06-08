using lifeflow_api.Models;
using lifeflow_api.Models.Objects;
using lifeflow_api.Models.Scaffold;
using lifeflow_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lifeflow_api.Controllers
{
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly LifeFlowContext _context;
        private readonly IUsuarioService _userService;
        private readonly ICicloService _cicloService;

        public UsuarioController(LifeFlowContext context, IUsuarioService userService, ICicloService cicloService)
        {
            _context = context;
            _userService = userService;
            _cicloService = cicloService;
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

        [HttpPost("{Id}")]
        public async Task<Usuario> EsNuevoUsuario(string Id, [FromBody] JsonElement Json)
        {
            string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
            string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;

            if (!string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos))
            {
                Usuario? Usuario = await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.Id.Equals(Id) && u.Nombre.Equals(Nombre) && u.Apellidos.Equals(Apellidos));
         
                if (Usuario != null) 
                {
                    bool HayDatosCicloBase = _cicloService.TieneCiclos(Usuario.Id);

                    return HayDatosCicloBase ? Usuario : Usuario.Desconocido;
                } 
                else
                {
                    return Usuario.Desconocido;
                }
            } 
            else
            {
                return Usuario.Desconocido;
            }
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

        [HttpPost("guardar-datos-ciclo-base/{id}")]
        public async Task<ActionResult> GuardarDatosCicloBase(string Id, [FromBody] JsonElement Json)
        {
            // Nombre y Apellidos
            string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
            string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;

            // Datos del último ciclo
            JsonElement JsonDatosUltimoCiclo = Json.GetProperty("DatosCiclo");
            DatosCicloBase DatosUltimoCiclo = JsonDatosUltimoCiclo.Deserialize<DatosCicloBase>() ?? null!;

            try
            {
                if (DatosUltimoCiclo != null && !string.IsNullOrWhiteSpace(Id) && 
                    !string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos))
                {
                    // Buscar o guardar usuario
                    Usuario Usuario = await _userService.FindOrRegister(Id, Nombre, Apellidos);

                    if (!_userService.IsRegistered(Usuario))
                    {
                        return StatusCode(500, new { message = "No se pudo registrar al usuario." });
                    }
                    else
                    {
                        // Crear objeto "Ciclo"
                        Ciclo Ciclo = new Ciclo
                        {
                            Id = Guid.NewGuid(),
                            IdUsuario = Usuario.Id,
                            IdEmbarazazo = null,
                            EsPrediccion = false,
                            InicioCiclo = _cicloService.ObtenerFechaUltimoCiclo(DatosUltimoCiclo.DiaInicioCiclo),
                            DuracionCiclo = _cicloService.DuracionCiclo(DatosUltimoCiclo.DuracionCiclo),
                            DuracionMenstruacion = DatosUltimoCiclo.DuracionMenstruacion,
                        };

                        _context.Ciclos.Add(Ciclo);
                        _context.SaveChanges();

                        (Ciclo Ciclo1, Ciclo Ciclo2) Predicciones = _cicloService.PredecirDosSiguientesCiclos(Ciclo);
                        Predicciones.Ciclo1.IdUsuario = Usuario.Id;
                        Predicciones.Ciclo2.IdUsuario = Usuario.Id;

                        List<Ciclo> CiclosTrimestre = new List<Ciclo> { Ciclo, Predicciones.Ciclo1, Predicciones.Ciclo2 };

                        for (int Index = 0; Index < 3; Index++)
                        {
                            Ciclo NuevoCiclo = _cicloService.PredecirProximoCicloDesdeLista(CiclosTrimestre);

                            if (NuevoCiclo != null)
                            {
                                CiclosTrimestre.Add(NuevoCiclo);
                                _context.Add(NuevoCiclo);
                                await _context.SaveChangesAsync();
                            }
                        }

                        _context.Ciclos.Add(Predicciones.Ciclo1);
                        _context.Ciclos.Add(Predicciones.Ciclo2);
                        _context.SaveChanges();
                    }

                    return Ok();
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
