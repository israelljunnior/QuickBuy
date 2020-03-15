import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modelo/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string;
  private _usuario: Usuario;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get usuario(): Usuario {
    this._usuario = JSON.parse(sessionStorage.getItem("usuario_autenticado"));
    return this._usuario;
  }

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario_autenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set("content-type", "application/json");
  }

  public usuarioAutenticado(): boolean {
    return this._usuario != null && this._usuario.email != "" && this._usuario.senha != ""  ;
  }

  public limparSessao() {
    sessionStorage.setItem("usuario_autenticado", "");
    this._usuario = null;
  }

  verificarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}api/usuario/verificarUsuario`, JSON.stringify(usuario), { headers: this.headers });
  }

  verificarEmail(email: string): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.baseUrl}api/usuario/ValidarEmail`, JSON.stringify(email), { headers: this.headers });
  }
  
  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}api/usuario/`, JSON.stringify(usuario), { headers: this.headers });
  }

}
