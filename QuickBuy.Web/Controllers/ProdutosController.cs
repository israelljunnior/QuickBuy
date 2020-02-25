using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProdutosController : Controller
    {
        private readonly IProdutoRepositorio _produtosRepositorios;

        public ProdutosController(IProdutoRepositorio produtosRepositorios)
        {
            _produtosRepositorios = produtosRepositorios;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_produtosRepositorios.ObterTodos());
            }
            catch (Exception ex) {
                return BadRequest(ex.ToString());
;            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Produto produto)
        {
            try
            {
                _produtosRepositorios.Adicionar(produto);

                return Created("api/produto", produto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
                ;
            }
        }
    }
}
