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
  public mensagem: string;
  public ativar_spinner_cadastrar: boolean = false;
  public ativar_spinner_email: boolean = false;
  public usuarioCadastrado: Boolean = false;
  public emailDisponivel: Boolean;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  cadastrar() {
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      usuarioJson => {
        this.usuarioCadastrado = true;
        this.mensagem = "";
      },
      err => {
        this.mensagem = err.error;
      }
    );

  }

  validarEmail() {
    this.ativar_spinner_email = true;
    let email = this.usuario.email;
    if (email != null) {
      this.usuarioService.verificarEmail(email).subscribe(
        result => {
          console.log(result);
          this.ativar_spinner_email = false;
          this.emailDisponivel = result;
          console.log("sucesso"+this.emailDisponivel);
      
        },
        err => {
          console.log(err);
          this.ativar_spinner_email = false;
          this.emailDisponivel = false;
        }
      );
    } else {
      this.ativar_spinner_email = false;
    }
  }

}
