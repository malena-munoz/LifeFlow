using LifeFlow.Models;
using LifeFlow.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace lifeflow_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly LifeFlowContext _context;

        public UsuarioController(LifeFlowContext context)
        {
            _context = context;
        }

        // GET api/usuario/5
        [HttpGet("{identificador}")]
        public async Task<ActionResult<Usuario>> Get(string identificador)
        {
            Usuario? usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Identificador.Equals(identificador));

            return usuario != null ? usuario : NotFound();
        }

    }
}
