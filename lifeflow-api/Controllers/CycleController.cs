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
                            .Where(i => i.InicioCiclo >= PeriodoTrimestre.Inicio.AddMonths(-1) && i.InicioCiclo <= PeriodoTrimestre.Final.AddMonths(1))
                            .ToList();

                        // Si los ciclos no llegan a 6
                        if (CiclosTrimestre.Count() < 6)
                        {
                            // El sistema creará nuevos ciclos hasta la fecha necesitada
                            int Limite = PeriodoTrimestre.Final.AddMonths(1).Month - _context.Ciclos.Min(c => c.InicioCiclo).Month;

                            for (int Index = 0; Index < Limite; Index++)
                            {
                                Ciclo Ciclo = _cicloService.PredecirProximoCicloDesdeLista(CiclosTrimestre);

                                if (Ciclo != null)
                                {
                                    CiclosTrimestre.Add(Ciclo);
                                    _context.Add(Ciclo);
                                    await _context.SaveChangesAsync();
                                }
                            }
                        }
                        else if (!CiclosTrimestre.Any())
                        {
                            CiclosTrimestre = await _cicloService.PredecirCiclosRestantes(Id, PeriodoTrimestre);
                        }


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

        [HttpPost("agregar-sangrado/{id}")]
        public async Task<ActionResult> AgregarSangrado(string Id, [FromBody] JsonElement Json)
        {
            try
            {
                // Nombre, Apellidos y Fecha de Sangradu
                string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
                string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;
                string Fecha = Json.GetProperty("Fecha").GetString() ?? null!;

                if (!string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos) 
                    && !string.IsNullOrWhiteSpace(Id) && !string.IsNullOrWhiteSpace(Fecha))
                {
                    bool UsuarioRegistrado = await _context.Usuarios
                        .AnyAsync(u => u.Id.Equals(Id) && u.Nombre.Equals(Nombre) && u.Apellidos.Equals(Apellidos));

                    if (UsuarioRegistrado && DateOnly.TryParse(Fecha, out DateOnly FechaSangradoFormateada))
                    {
                        (Ciclo? Ciclo, string Posicion) CicloEnDiaDeSangrado = _cicloService.ObtenerCicloConInicioCercano(FechaSangradoFormateada, Id);

                        if (CicloEnDiaDeSangrado.Ciclo != null)
                        {
                            CicloEnDiaDeSangrado.Ciclo.DuracionMenstruacion += 1;
                            CicloEnDiaDeSangrado.Ciclo.InicioCiclo = CicloEnDiaDeSangrado.Posicion.Equals("antes") ?
                                CicloEnDiaDeSangrado.Ciclo.InicioCiclo.AddDays(-1) : CicloEnDiaDeSangrado.Ciclo.InicioCiclo;

                            Ciclo? SangradoAproximado = _context.Ciclos
                                .FirstOrDefault(delegate(Ciclo c)
                                {
                                    bool Apoximado = CicloEnDiaDeSangrado.Posicion.Equals("antes") ?
                                        c.InicioCiclo == CicloEnDiaDeSangrado.Ciclo.InicioCiclo.AddDays(-1):
                                        c.InicioCiclo == CicloEnDiaDeSangrado.Ciclo
                                            .InicioCiclo.AddDays((int)CicloEnDiaDeSangrado.Ciclo.DuracionMenstruacion);

                                    return Apoximado && c.EsPrediccion
                                    && c.DuracionCiclo.Equals(0) && c.DuracionMenstruacion.Equals(0);
                                });

                            if (SangradoAproximado != null)
                            {
                                CicloEnDiaDeSangrado.Ciclo.DuracionMenstruacion += 1;
                                CicloEnDiaDeSangrado.Ciclo.InicioCiclo = CicloEnDiaDeSangrado.Posicion.Equals("antes") ?
                                    CicloEnDiaDeSangrado.Ciclo.InicioCiclo.AddDays(-1) : CicloEnDiaDeSangrado.Ciclo.InicioCiclo;

                                _context.Remove(SangradoAproximado);
                            }

                            _context.Update(CicloEnDiaDeSangrado.Ciclo);
                            _context.SaveChanges();
                        }
                        else
                        {
                            Ciclo CicloSangrado = new Ciclo
                            {
                                Id = Guid.NewGuid(),
                                IdUsuario = Id,
                                InicioCiclo = FechaSangradoFormateada,
                                DuracionCiclo = 0,
                                EsPrediccion = true,
                                DuracionMenstruacion = 0
                            };

                            _context.Add(CicloSangrado);
                            _context.SaveChanges();
                        }

                        return Ok();
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

        [HttpPost("borrar-sangrado/{id}")]
        public async Task<ActionResult> BorrarSangrado(string Id, [FromBody] JsonElement Json)
        {
            try
            {
                // Nombre, Apellidos y Fecha de Sangradu
                string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
                string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;
                string Fecha = Json.GetProperty("Fecha").GetString() ?? null!;

                if (!string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos)
                    && !string.IsNullOrWhiteSpace(Id) && !string.IsNullOrWhiteSpace(Fecha))
                {
                    bool UsuarioRegistrado = await _context.Usuarios
                        .AnyAsync(u => u.Id.Equals(Id) && u.Nombre.Equals(Nombre) && u.Apellidos.Equals(Apellidos));

                    if (UsuarioRegistrado && DateOnly.TryParse(Fecha, out DateOnly FechaSangradoFormateada))
                    {
                        Ciclo? DiaDeSangrado = await _context.Ciclos
                            .FirstOrDefaultAsync(c => c.EsPrediccion && c.DuracionCiclo.Equals(0) 
                                && c.DuracionMenstruacion.Equals(0) && c.InicioCiclo.Equals(FechaSangradoFormateada));

                        if (DiaDeSangrado != null)
                        {
                            _context.Remove(DiaDeSangrado);
                            _context.SaveChanges();
                        }
                        else
                        {
                            (Ciclo? Ciclo, string Posicion) CicloEnDiaDeSangrado = _cicloService.ObtenerCicloRelativo(FechaSangradoFormateada, Id);

                            if (CicloEnDiaDeSangrado.Ciclo != null)
                            {
                                CicloEnDiaDeSangrado.Ciclo.DuracionMenstruacion -= 1;
                                CicloEnDiaDeSangrado.Ciclo.InicioCiclo = CicloEnDiaDeSangrado.Posicion.Equals("inicio") ?
                                    CicloEnDiaDeSangrado.Ciclo.InicioCiclo.AddDays(1) : CicloEnDiaDeSangrado.Ciclo.InicioCiclo;

                                _context.Update(CicloEnDiaDeSangrado.Ciclo);
                                _context.SaveChanges();
                            }
                            else
                            {
                                return BadRequest(new{ status = 400, title = "No se puede borrar un sangrado entre periodos de sangrado." });
                            }
                        }

                        return Ok();
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
        [HttpPost("embarazo/{id}")]
        public async Task<ActionResult<Embarazo>> ObtenerEmbarazo(string Id, [FromBody] JsonElement Json)
        {
            try
            {
                // Nombre, Apellidos
                string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
                string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;

                if (!string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos) && !string.IsNullOrWhiteSpace(Id))
                {
                    bool UsuarioRegistrado = await _context.Usuarios
                        .AnyAsync(u => u.Id.Equals(Id) && u.Nombre.Equals(Nombre) && u.Apellidos.Equals(Apellidos));

                    if (UsuarioRegistrado)
                    {
                        Embarazo? Embarazo = await _context.Embarazos
                            .FirstOrDefaultAsync(e => e.IdUsuario.Equals(Id) && e.Activo && DateOnly.FromDateTime(DateTime.Now) >= e.EstimacionFecundacion);

                        return Embarazo != null ? Ok(Embarazo) : BadRequest();
                    }
                    else
                    {
                        return BadRequest();
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
        [HttpPost("borrar-embarazo/{id}")]
        public async Task<ActionResult> BorrarEmbarazo(string Id, [FromBody] JsonElement Json)
        {
            try
            {
                // Nombre, Apellidos y Fecha de Sangradu
                string Nombre = Json.GetProperty("Nombre").GetString() ?? null!;
                string Apellidos = Json.GetProperty("Apellidos").GetString() ?? null!;
                string IdEmbarazo = Json.GetProperty("IdEmbarazo").GetString() ?? null!;

                if (!string.IsNullOrWhiteSpace(Nombre) && !string.IsNullOrWhiteSpace(Apellidos) 
                    && !string.IsNullOrWhiteSpace(Id) && !string.IsNullOrWhiteSpace(IdEmbarazo))
                {
                    bool UsuarioRegistrado = await _context.Usuarios
                        .AnyAsync(u => u.Id.Equals(Id) && u.Nombre.Equals(Nombre) && u.Apellidos.Equals(Apellidos));

                    if (UsuarioRegistrado)
                    {
                        Embarazo? Embarazo = await _context.Embarazos
                            .FirstOrDefaultAsync(e => e.Id.Equals(Guid.Parse(IdEmbarazo)));

                        if (Embarazo != null)
                        {
                            List<InformacionDiaria> InfoEmbarazo = _context.InformacionDiaria
                                .Where(i => i.IdUsuario.Equals(Id) && i.Fecha >= Embarazo.EstimacionFecundacion && i.PruebaEmbarazo.Equals("Positivo")).ToList();

                            foreach(InformacionDiaria Info in InfoEmbarazo)
                            {
                                Info.PruebaEmbarazo = "No realizado";
                            }

                            _context.UpdateRange(InfoEmbarazo);
                            _context.Remove(Embarazo);
                            _context.SaveChanges();

                            return Ok();
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                    else
                    {
                        return BadRequest();
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
