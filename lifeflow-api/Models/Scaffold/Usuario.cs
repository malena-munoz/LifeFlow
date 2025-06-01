using System;
using System.Collections.Generic;

namespace lifeflow_api.Models.Scaffold;

public partial class Usuario
{

    public static readonly string IdentificadorInvalido = "-1";

    public static readonly Usuario Desconocido = new Usuario
    {
        Id = IdentificadorInvalido,
        Nombre = string.Empty,
        Apellidos = string.Empty
    };

    // ================================================================================================

    public string Id { get; set; } = null!;

    public Guid IdRol { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    // ================================================================================================

    public virtual ICollection<Ciclo> Ciclos { get; set; } = new List<Ciclo>();

    public virtual ICollection<Embarazo> Embarazos { get; set; } = new List<Embarazo>();

    public virtual Rol IdRolNavigation { get; set; } = null!;

    public virtual ICollection<InformacionDiaria> InformacionDiaria { get; set; } = new List<InformacionDiaria>();

    public virtual ICollection<Recordatorio> Recordatorios { get; set; } = new List<Recordatorio>();
}
