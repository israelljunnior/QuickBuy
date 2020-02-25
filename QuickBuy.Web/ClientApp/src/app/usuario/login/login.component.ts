import { Component, OnInit, Injectable } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public returnUrl: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.returnUrl =this.route.snapshot.queryParams['returnUrl'];
  }

  entrar() {
    if (this.usuario.email == 'israel@gmail.com' && this.usuario.senha == '123') {
      sessionStorage.setItem('usuario_autenticado', '1');
      if (this.returnUrl) {
        this.router.navigate([this.returnUrl]);

      } else {
        this.router.navigate(['/']);
      }
    }
  }
}
