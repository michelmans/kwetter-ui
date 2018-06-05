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
export class ProfileService {

    private API_URL = 'http://localhost:8080/kwetter/api'
    private API_VERSION = 'v1'

    public token: string
    public profile: Profile

    constructor(private httpClient: HttpClient, private routingService: RoutingService){}
    
    getProfileByToken(token: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/profiles/token/${token}`

        return this.httpClient.get(url);

    }

    getProfileByName(username: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/profiles/${username}`

        return this.httpClient.get(url);
    }

    followProfile(token: string, toFollowID: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/profiles/follow`
        const postHeaders = { 
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded', 
                    'token': token
                })
        };

        let postParams = new HttpParams().append("following", toFollowID)

        return this.httpClient.post<HttpResponse>(url,postParams,postHeaders)
    }

    unfollowProfile(token: string, toUnFollowID: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/profiles/unfollow`
        const postHeaders = { 
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded', 
                    'token': token
                })
        };

        let postParams = new HttpParams().append("following", toUnFollowID)

        return this.httpClient.post<HttpResponse>(url,postParams,postHeaders)
    }

    getFollowersById(id: string): Observable<HttpResponse>{
        const url = `${this.API_URL}/${this.API_VERSION}/profiles/followers/${id}`

        return this.httpClient.get(url);
    }

    getFollowingById(id: string): Observable<HttpResponse>{
        const url = `${this.API_URL}/${this.API_VERSION}/profiles/following/${id}`

        return this.httpClient.get(url);
    }


}