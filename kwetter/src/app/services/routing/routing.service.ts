import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from "@angular/router";

@Injectable()
export class RoutingService {

    constructor(private router: Router) {}

    openLogin() {
        this.router.navigate(['login'])
    }

    openRegister(){
        this.router.navigate(['register'])
    }

    openTimeline(){
        this.router.navigate(['timeline'])
    }



}