using LifeFlow.Models;
using LifeFlow.Models.Database;
using lifeflow_api.Models.Database;
using lifeflow_api.Models.Objects;
using lifeflow_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lifeflow_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly LifeFlowContext _context;

        public UserController(LifeFlowContext context)
        {
            _context = context;
        }

        private async Task<Usuario> Register(string identificador)
        {
            try
            {
                Usuario? Usuario = _context.Usuarios.FirstOrDefault(u => u.Identificador.Equals(identificador));

                if (Usuario == null)
                {
                    Usuario = new Usuario
                    {
                        Identificador = identificador,
                        IdRol = Rol.USER
                    };

                    await _context.Usuarios.AddAsync(Usuario);
                    _context.SaveChanges();
                }

                return Usuario;
            }
            catch (Exception)
            {
                return Usuario.Desconocido;
            }
        }


        [HttpGet("{identificador}")]
        public async Task<ActionResult<Usuario>> Get(string identificador)
        {
            Usuario? usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Identificador.Equals(identificador));

            if (usuario == null)
            {
                return Usuario.Desconocido;
            }

            bool primerCiclo = await _context.Ciclos.AnyAsync(c => c.PrimerCicloRegistrado);

            return primerCiclo ? usuario : Usuario.Desconocido;
        }
        

        [HttpPost("first-login")]
        public async Task<ActionResult> FirstLogin([FromHeader] string identificador, [FromBody] DatosUltimoCiclo datos)
        {
            try
            {
                Usuario Usuario = await Register(identificador);
                
                if (Usuario.Identificador.Equals(Usuario.IdentificadorInvalido))
                {
                    return StatusCode(500, new { message = "No se pudo registrar al usuario."});
                }
                else
                {
                    Ciclo Ciclo = new Ciclo
                    {
                        Identificador = Usuario.Identificador,
                        InicioCiclo = datos.FechaInicioCiclo,
                        DuracionMenstruacion = datos.DuracionMenstruacion,
                        DuracionCiclo = CycleService.DuracionCiclo(datos.DuracionCiclo),
                        Embarazo = false,
                        PrimerCicloRegistrado = true
                    };

                    await _context.Ciclos.AddAsync(Ciclo);
                    _context.SaveChanges();

                    return Ok(Ciclo);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ocurrió un error inesperado", details = ex.Message });
            }
        }
    }

}
