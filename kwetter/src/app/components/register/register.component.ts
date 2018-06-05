import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../../services/register/register.service";
import { RoutingService } from "../../services/routing/routing.service"
import { Profile } from "../../domain/Profile";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username: string
    password: string
    bio: string
    website: string

    constructor(private registerService: RegisterService, private routingService: RoutingService){}

    ngOnInit() {
        this.isLoggedIn()
    }

    register(){
        console.log(this.username + this.password)

        if(this.username == null || undefined) return;
        if(this.password == null || undefined) return;
        if(this.bio == null || undefined) return;
        if(this.website == null || undefined) return;

        this.registerService.register(this.username, this.password, this.bio, this.website).subscribe(response => {
            console.log(response['response'])
            this.routingService.openLogin()
        })

        this.username = null;
        this.password = null;
        this.bio = null;
        this.website = null;

    }

    isLoggedIn(){
        if(localStorage.getItem("token") != null){
            this.routingService.openTimeline()
        }
    }
}