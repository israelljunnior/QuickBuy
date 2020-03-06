import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario.model';
import { UsuarioService } from 'src/app/servicos/usuario/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  cadastrar() {
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      usuarioJson => {

      },
      err => {
        console.log(err);
      }
    );

  }

}
