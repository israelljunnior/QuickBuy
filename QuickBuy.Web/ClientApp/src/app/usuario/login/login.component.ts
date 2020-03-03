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
  public ativar_spinner: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }

  entrar() {
    this.ativar_spinner = true
    this.usuarioService.verificarUsuario(this.usuario)
      .subscribe(data => {
        this.usuarioService.usuario = data;
        if(this.returnUrl) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(["/"]);
        }
        this.ativar_spinner = false;
      },
      err => {
        console.log(err.error);
        this.mensagem = err.error;
        this.ativar_spinner = false;
      });
    }
}
