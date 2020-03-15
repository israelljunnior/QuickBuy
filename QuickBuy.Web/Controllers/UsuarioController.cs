using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Dominio.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickBuy.Web.Controllers
{

    [Route("/api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;

        public UsuarioController(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;   
        }

        [HttpPost("VerificarUsuario")]
        public ActionResult VerificarUsuario([FromBody] Usuario usuario)
        {
            try {
                var usuarioRetorno = _usuarioRepositorio.Obter(usuario.Email, usuario.Senha);
                if (usuarioRetorno != null)
                    return Ok(usuario);
                return BadRequest("Usuario ou Senha Inválidos");
            } catch(Exception ex) {
                return BadRequest(ex.ToString()); 
            }
        }
        [HttpPost("ValidarEmail")]
        public ActionResult ValidarEmail([FromBody] string email)
        {
            try
            {
                var usuarioRetorno = _usuarioRepositorio.Obter(email);
                if (usuarioRetorno == null)
                    return Ok(true);
                return BadRequest("Email está disponível");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioCadastrado = _usuarioRepositorio.Obter(usuario.Email);
                if (usuarioCadastrado != null) 
                    return BadRequest("Email já cadastrado");

                _usuarioRepositorio.Adicionar(usuario);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
