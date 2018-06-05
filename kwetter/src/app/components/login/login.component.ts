import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login/login.service";
import { RoutingService } from "../../services/routing/routing.service"
import { Profile } from "../../domain/Profile";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string
    password: string

    errorMessage: string
    errorMessageState: boolean

    constructor(private loginService: LoginService, private routingService: RoutingService){}

    ngOnInit() {

        this.isLoggedIn();

    }

    login(){
        this.loginService.login(this.username, this.password).subscribe(response => {
            if(response['status'] != "ERROR") {
                localStorage.setItem("token", response['response'])
                this.loginSuccessfull(response['response'])
            } else {
                this.errorMessage = "Login failed"
                this.errorMessageState = true
            }
        })

        this.username = null;
        this.password = null;

    }

    loginSuccessfull(token: string){
        this.loginService.getProfileByToken(token).subscribe(response => {
            if(response['status'] != "ERROR") {
                this.loginService.profile = response['response']
                this.routingService.openTimeline()
            } else {
                this.errorMessage = "Fetching profile failed"
                this.errorMessageState = false
            }
        })
    }

    isLoggedIn(){
        if(localStorage.getItem("token") != null){
            this.routingService.openTimeline()
        }
    }
}