using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using LifeFlow.Models;
using lifeflow_api.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lifeflow_api.Controllers
{
    [Route("api/google-calendar")]
    [ApiController]
    public class GoogleCalendarController : ControllerBase
    {
        private readonly LifeFlowContext _context;
        public GoogleCalendarController(LifeFlowContext context)
        {
            _context = context;
        }
        private Task<CalendarService> GetCalendarServiceAsync(string token)
        {
            GoogleCredential Credencial = GoogleCredential.FromAccessToken(token);

            return Task.FromResult(new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = Credencial,
                ApplicationName = "LifeFlow"
            }));
        }

        [HttpGet("events")]
        public async Task<IActionResult> GetEventsByIds([FromHeader] string token, [FromHeader] string identificador)
        {
            try
            {
                // Obtén el servicio de Calendar
                CalendarService Servicio = await GetCalendarServiceAsync(token);

                // Obtener recordatorios y lista vacía para guardar los recordatorios en formato "Event"
                List<string> Recordatorios = _context.Recordatorios
                    .Where(c => c.Identificador.Equals(identificador)).Select(c => c.IdRecordatorio).ToList();

                List<Event> Eventos = new List<Event>();

                foreach (string Id in Recordatorios)
                {
                    Event Evento = await Servicio.Events.Get("primary", Id).ExecuteAsync();
                    Eventos.Add(Evento);
                }

                return Ok(Eventos);
            }
            catch (Exception ex)
            {
                // Si ocurre un error, devolver BadRequest con el mensaje de error
                return BadRequest(new { error = ex.Message });
            }
        }


        [HttpPost("create-event")]  // CREA UN EVENTO EN EL CALENDARIO
        public async Task<IActionResult> CreateEvent([FromHeader] string token, [FromHeader] string identificador, [FromBody] Event reminder)
        {
            try
            {
                // Creación de evento en Google Calendar
                CalendarService Servicio = await GetCalendarServiceAsync(token);
                Event Evento = await Servicio.Events.Insert(reminder, "primary").ExecuteAsync();

                // Guardar ID del evento en la base de datos
                Recordatorio Recordatorio = new Recordatorio
                {
                    Identificador = identificador,
                    IdRecordatorio = Evento.Id
                };
                _context.Recordatorios.Add(Recordatorio);
                _context.SaveChanges();

                return Ok(Evento);
            }
            catch (Google.GoogleApiException ex)
            {
                return BadRequest(new { message = "Error al crear el evento en Google Calendar", details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ocurrió un error inesperado", details = ex.Message });
            }
        }

        [HttpPut("edit-event/{reminder_id}")]
        public async Task<IActionResult> EditEvent(string reminder_id, [FromHeader] string token, [FromHeader] string identificador, [FromBody] Event reminder)
        {
            try
            {
                CalendarService Servicio = await GetCalendarServiceAsync(token);
                Event Evento = await Servicio.Events.Update(reminder, "primary", reminder_id).ExecuteAsync();
                return Ok(Evento);
            }
            catch (Google.GoogleApiException ex)
            {
                int CodigoError = ex.Error.Code;
                string MensajeError = "Error en Google Calendar API durante el proceso de editado.";
                return BadRequest(new { message = MensajeError, details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ocurrió un error inesperado", details = ex.Message });
            }
            finally
            {
                _context.SaveChanges();
            }
        }

        [HttpDelete("delete-event/{reminder_id}")]
        public async Task<IActionResult> DeleteEvent(string reminder_id, [FromHeader] string token, [FromHeader] string identificador)
        {
            Recordatorio Recordatorio = _context.Recordatorios
                .FirstOrDefault(r => r.IdRecordatorio.Equals(reminder_id)) ?? new Recordatorio();

            try
            {
                CalendarService Servicio = await GetCalendarServiceAsync(token);
                await Servicio.Events.Delete("primary", reminder_id).ExecuteAsync();

                _context.Recordatorios.Remove(Recordatorio);

                return NoContent();
            }
            catch (Google.GoogleApiException ex)
            {
                int CodigoError = ex.Error.Code;
                string MensajeError = "Error en Google Calendar API durante el proceso de borrado.";

                if (CodigoError == 410)
                {
                    _context.Recordatorios.Remove(Recordatorio);
                    MensajeError = "El evento ya estaba borrado de Google Calendar. Se borrará de la base de datos. Recarga para actualizar.";
                }

                return BadRequest(new { message = MensajeError, details = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ocurrió un error inesperado", details = ex.Message });
            } 
            finally 
            {
                _context.SaveChanges();
            }

        }

    }
}
