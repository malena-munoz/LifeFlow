using lifeflow_api.Models;
using lifeflow_api.Models.Scaffold;

namespace lifeflow_api.Services
{
    public interface IUserService
    {
        Task<Usuario> FindOrRegister(string id, string nombre, string apellidos);
        bool IsRegistered(Usuario usuario);

        // --- INFORMACION DIARIA --------------------------------------------------------
        void GuardarInformacionDiaria(InformacionDiaria info);
    }

    public class UserService : IUserService
    {
        private readonly LifeFlowContext _context;

        public UserService(LifeFlowContext context)
        {
            _context = context;
        }

        public async Task<Usuario> FindOrRegister(string id, string nombre, string apellidos)
        {
            try
            {
                Usuario? Usuario = _context.Usuarios.FirstOrDefault(u => u.Id.Equals(id) && u.Nombre.Equals(nombre) && u.Apellidos.Equals(apellidos));

                if (Usuario == null)
                {
                    Usuario = new Usuario
                    {
                        Id = id,
                        IdRol = Rol.User,
                        Nombre = nombre,
                        Apellidos = apellidos
                    };

                    await _context.Usuarios.AddAsync(Usuario);
                    _context.SaveChanges();
                }

                return Usuario;
            }
            catch (Exception)
            {
                return Usuario.Desconocido;
            }
        }

        public void GuardarInformacionDiaria(InformacionDiaria info)
        {
            throw new NotImplementedException();
        }

        public bool IsRegistered(Usuario usuario)
        {
            return usuario.Id.Equals(Usuario.IdentificadorInvalido) ? false : true;
        }
    }

}
