import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GuardaRotas implements CanActivate {
    
    constructor(private router: Router){

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(sessionStorage.getItem("usuario_autenticado")){
            return true;
        }
        this.router.navigate(['entrar'], {queryParams: {returnUrl: state.url}});
        return false;
    }

}