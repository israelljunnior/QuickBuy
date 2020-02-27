import { Component, OnInit, Injectable } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/servicos/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public returnUrl: string = "/";
  public mensagem: string;

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }

  entrar() {
    this.usuarioService.verificarUsuario(this.usuario)
      .subscribe(data =>{
        var usuarioRetorno = data;
        sessionStorage.setItem('usuario_autenticado', '1');
        sessionStorage.setItem('usuario_email', usuarioRetorno.email);
        if(this.returnUrl) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(["/"]);
        }
      },
      err => {
        console.log(err.error);
        this.mensagem = err.error
      });
    }
}
