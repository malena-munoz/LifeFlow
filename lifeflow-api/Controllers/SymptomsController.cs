using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using lifeflow_api.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;
using lifeflow_api.Models;
using lifeflow_api.Models.Scaffold;

namespace lifeflow_api.Controllers
{
    [Route("api/symptoms")]
    [ApiController]
    public class SymptomsController : ControllerBase
    {
        private readonly LifeFlowContext _context;
        private readonly IUserService _userService;

        public SymptomsController(LifeFlowContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpPost("register-symptoms")]
        public async Task<ActionResult> CreateSymptoms([FromHeader] string token, [FromHeader] string identificador,
            [FromHeader] DateOnly fecha, [FromBody] InformacionDiaria sintomas)
        {
            try
            {
                

                    return Ok();
                    
            } 
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ocurrió un error inesperado", details = ex.Message });
            }
        }

    }
}
