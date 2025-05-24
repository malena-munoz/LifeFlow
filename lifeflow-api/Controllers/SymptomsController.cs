using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LifeFlow.Models;
using lifeflow_api.Models.Database;

namespace lifeflow_api.Controllers
{
    [Route("api/symptoms")]
    [ApiController]
    public class SymptomsController : ControllerBase
    {
        private readonly LifeFlowContext _context;

        public SymptomsController(LifeFlowContext context)
        {
            _context = context;
        }

        // GET: api/Symptoms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sintomas>>> GetSintomas()
        {
            return await _context.Sintomas.ToListAsync();
        }

        // GET: api/Symptoms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sintomas>> GetSintomas(Guid id)
        {
            var sintomas = await _context.Sintomas.FindAsync(id);

            if (sintomas == null)
            {
                return NotFound();
            }

            return sintomas;
        }

        // PUT: api/Symptoms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSintomas(Guid id, Sintomas sintomas)
        {
            if (id != sintomas.Id)
            {
                return BadRequest();
            }

            _context.Entry(sintomas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SintomasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Symptoms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sintomas>> PostSintomas(Sintomas sintomas)
        {
            _context.Sintomas.Add(sintomas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSintomas", new { id = sintomas.Id }, sintomas);
        }

        // DELETE: api/Symptoms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSintomas(Guid id)
        {
            var sintomas = await _context.Sintomas.FindAsync(id);
            if (sintomas == null)
            {
                return NotFound();
            }

            _context.Sintomas.Remove(sintomas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SintomasExists(Guid id)
        {
            return _context.Sintomas.Any(e => e.Id == id);
        }
    }
}
