import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../servicos/produto/produto.service';
import { Produto } from '../modelo/produto.model';

@Component({
  selector: "produto",
  templateUrl: "./produto.component.html"
})
export class ProdutoComponent implements OnInit {

  private produto;
  
  constructor(private produtoService: ProdutoService) {

  }

  ngOnInit() {
    this.produto = new Produto();
  }

  cadastrar() {
    this.produtoService.cadastrar(this.produto).subscribe(
      produtoJson => {
        console.log(produtoJson);
      },
      e => {
        console.log(e.error);
      }
    );
  }

}
