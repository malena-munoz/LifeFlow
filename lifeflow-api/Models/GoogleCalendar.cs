namespace lifeflow_api.Models
{
    public class GoogleCalendarReminder
    {
        public string Summary { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string Description { get; set; } = null!;
        public List<Attendee> Attendees { get; set; } = null!;
        public string ColorId { get; set; } = null!;
        public EventDateTime Start { get; set; } = null!;
        public EventDateTime End { get; set; } = null!;
    }

    public class Attendee
    {
        public string Email { get; set; } = null!;
    }

    public class EventDateTime
    {
        public string DateTime { get; set; } = null!;
        public string TimeZone { get; set; } = null!;
    }

}
