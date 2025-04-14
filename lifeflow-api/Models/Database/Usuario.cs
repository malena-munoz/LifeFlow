using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Numerics;
using System.Security.Claims;
using System.Security.Policy;

namespace LifeFlow.Models.Database
{
    public class Usuario
    {
        [Key]
        public string Identificador { get; set; } = string.Empty;
        public Guid IdRol { get; set; }
        public virtual Rol? Rol { get; set; }


        //{
        //"sub": "105348146036563382953",
        //"name": "Malena Muñoz",
        //"given_name": "Malena",
        //"family_name": "Muñoz",
        //"picture": "https://lh3.googleusercontent.com/a/ACg8ocKIXKyHQ2euCQgRSWeKnaZotkCbBQ-P7ZwA8ejQ7nGMTDQ25W_aZA=s96-c",
        //"email": "malecuca2004@gmail.com",
        //"email_verified": true
        //}
    }
}
