using System;
using System.Collections.Generic;

namespace lifeflow_api.Models.Scaffold;

public partial class Embarazo
{
    public Guid Id { get; set; }

    public string IdUsuario { get; set; } = null!;

    public DateOnly EstimacionFecundacion { get; set; }

    public DateOnly EstimacionParto { get; set; }

    public DateOnly FechaParto { get; set; }

    public bool Activo { get; set; }

    public virtual ICollection<Ciclo> Ciclos { get; set; } = new List<Ciclo>();

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
