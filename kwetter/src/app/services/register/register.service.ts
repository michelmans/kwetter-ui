import { Observable } from "rxjs/Observable";
import { HttpResponse } from "selenium-webdriver/http";
import { Profile } from "../../domain/Profile";
import { Injectable } from "@angular/core";
import { RoutingService } from "../routing/routing.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class RegisterService {

    private API_URL = 'http://localhost:8080/kwetter/api'
    private API_VERSION = 'v1'

    public token: string
    public profile: Profile

    constructor(private httpClient: HttpClient, private routingService: RoutingService){}
    
    register(username: string, password: string, bio: string, website: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/profiles/register`
        const postHeaders = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}

        let postParams = new HttpParams().append("username", username).append("password", password).append("bio", bio).append("website", website)

        return this.httpClient.post<HttpResponse>(url,postParams,postHeaders)

    }


}