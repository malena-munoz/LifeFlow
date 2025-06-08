using lifeflow_api.Models;
using lifeflow_api.Models.Scaffold;
using Microsoft.EntityFrameworkCore;

namespace lifeflow_api.Services
{
    public interface IUsuarioService
    {
        Task<Usuario> FindOrRegister(string id, string nombre, string apellidos);
        bool IsRegistered(Usuario usuario);
        Task<bool> UsuarioExiteDuranteHTTP(string IdUsuario);
        Task<Usuario> UsuarioPorId(string IdUsuario);
    }

    public class UsuarioService : IUsuarioService
    {
        private readonly LifeFlowContext _context;

        public UsuarioService(LifeFlowContext context)
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
        public bool IsRegistered(Usuario usuario)
        {
            return usuario.Id.Equals(Usuario.IdentificadorInvalido) ? false : true;
        }

        public async Task<bool> UsuarioExiteDuranteHTTP(string IdUsuario)
        {
            return await _context.Usuarios.AnyAsync(u => u.Id == IdUsuario);
        }

        public async Task<Usuario> UsuarioPorId(string IdUsuario)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == IdUsuario) ?? null!;
        }
    }

}
