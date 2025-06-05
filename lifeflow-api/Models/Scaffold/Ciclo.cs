using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace lifeflow_api.Models.Scaffold;

public partial class Ciclo
{
    public Guid Id { get; set; }

    public string IdUsuario { get; set; } = null!;

    public Guid? IdEmbarazazo { get; set; }

    public DateOnly InicioCiclo { get; set; }

    public float DuracionCiclo { get; set; }

    public float DuracionMenstruacion { get; set; }

    public bool EsPrediccion { get; set; }

    // ─────────────────────────────────────────────────────────────────────────────────

    public virtual Embarazo? IdEmbarazazoNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}