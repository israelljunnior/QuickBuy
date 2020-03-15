import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Produto } from "src/app/modelo/produto.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ProdutoService implements OnInit{
    

    private _baseUrl: any;
    public produtos: Produto[];

    constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    ngOnInit() {
        this.produtos = [];
    }

    get headers(): HttpHeaders {
        return new HttpHeaders().set("content-type", "application/json");
    }

    cadastrar(produto: Produto): Observable<Produto> {

        return this.http.post<Produto>(`${this._baseUrl}/api/produto`, JSON.stringify(produto), { headers: this.headers });
    }

    salvar(produto: Produto): Observable<Produto> {

        return this.http.post<Produto>(`${this._baseUrl}produto`, JSON.stringify(produto), { headers: this.headers });
    }

    deletar(produto: Produto): Observable<Produto> {

        return this.http.post<Produto>(`${this._baseUrl}api/produto`, JSON.stringify(produto), { headers: this.headers });
    }

    obterTodos(): Observable<Produto[]> {

        return this.http.get<Produto[]>(`${this._baseUrl}api/produto`);
    }

    obterProduto(id: number): Observable<Produto> {

        return this.http.get<Produto>(`${this._baseUrl}api/produto/${id}`);

    }
}