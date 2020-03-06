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

  get usuario(): Usuario {
    this._usuario = JSON.parse(sessionStorage.getItem("usuario_autenticado"));
    return this._usuario;
  }

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario_autenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public usuarioAutenticado(): boolean {
    return this._usuario != null && this._usuario.email != "" && this._usuario.senha != ""  ;
  }

  public limparSessao() {
    sessionStorage.setItem("usuario_autenticado", "");
    this._usuario = null;
  }

  verificarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      email: usuario.email,
      senha: usuario.senha
    }
    return this.http.post<Usuario>(`${this.baseUrl}/api/usuario/verificarUsuario`, body, { headers });
  }
  
  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      email: usuario.email,
      senha: usuario.senha,
      nome: usuario.nome,
      sobreNome: usuario.sobreNome,
    }
    return this.http.post<Usuario>(`${this.baseUrl}/api/usuario/usuario`, body, { headers });
  }

}
