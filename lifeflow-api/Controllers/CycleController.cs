using LifeFlow.Models;
using LifeFlow.Models.Database;
using lifeflow_api.Models.Database;
using lifeflow_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lifeflow_api.Controllers
{
    [Route("api/cycle")]
    [ApiController]
    public class CycleController : ControllerBase
    {
        private readonly LifeFlowContext _context;

        public CycleController(LifeFlowContext context)
        {
            _context = context;
        }

       

    }
}
