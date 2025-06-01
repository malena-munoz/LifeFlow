using System;
using System.Collections.Generic;

namespace lifeflow_api.Models.Scaffold;

public partial class Rol
{
    public static readonly Guid User = new Guid("95DEF098-E4FB-4D36-9167-4775CB6C0D06");
    public static readonly Guid Admin = new Guid("A609726B-BB90-426D-A233-C15C890133B0");

    public Guid Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
