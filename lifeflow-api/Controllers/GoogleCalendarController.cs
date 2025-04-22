using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using LifeFlow.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("create-event")]
        public async Task<IActionResult> CreateEvent([FromHeader] string token, [FromBody] Event reminder)
        {
            CalendarService Servicio = await GetCalendarServiceAsync(token);
            Event Evento = await Servicio.Events.Insert(reminder, "primary").ExecuteAsync();
            return Ok(Evento);
        }

        [HttpPut("update-event/{reminder_id}")]
        public async Task<IActionResult> UpdateEvent(string reminder_id, [FromHeader] string token, [FromBody] Event reminder)
        {
            CalendarService Servicio = await GetCalendarServiceAsync(token);
            Event Evento = await Servicio.Events.Update(reminder, "primary", reminder_id).ExecuteAsync();
            return Ok(Evento);
        }

        [HttpDelete("delete-event/{reminder_id}")]
        public async Task<IActionResult> DeleteEvent(string reminder_id, [FromHeader] string token)
        {
            CalendarService Servicio = await GetCalendarServiceAsync(token);
            await Servicio.Events.Delete("primary", reminder_id).ExecuteAsync();
            return NoContent();
        }

    }
}
