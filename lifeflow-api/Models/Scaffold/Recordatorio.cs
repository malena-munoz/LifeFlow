using System;
using System.Collections.Generic;

namespace lifeflow_api.Models.Scaffold;

public partial class Recordatorio
{
    public Guid Id { get; set; }

    public string IdUsuario { get; set; } = null!;

    public string IdGoogleCalendarEvent { get; set; } = null!;

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
