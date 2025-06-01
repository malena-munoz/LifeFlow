using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace lifeflow_api.Models.Scaffold;

public partial class InformacionDiaria
{
    public Guid Id { get; set; }

    public string IdUsuario { get; set; } = null!;

    public DateOnly Fecha { get; set; }

    public string PruebaEmbarazo { get; set; } = null!;
    public string Notas { get; set; } = null!;

    public List<string> Emociones { get; set; } = new List<string>();

    public List<string> Sintomas { get; set; } = new List<string>();

    public List<string> Molestias { get; set; } = new List<string>();

    public List<string> FluidoFemenino { get; set; } = new List<string>();

    public virtual Usuario? IdUsuarioNavigation { get; set; } = null!;
}
