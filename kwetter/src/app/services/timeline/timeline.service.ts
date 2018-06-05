import { Observable } from "rxjs/Observable";
import { HttpResponse } from "selenium-webdriver/http";
import { Injectable } from "@angular/core";
import { RoutingService } from "../routing/routing.service";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Profile } from "../../domain/Profile";
import { LoginService } from "../login/login.service";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class TimelineService {

    private API_URL = 'http://localhost:8080/kwetter/api'
    private API_VERSION = 'v1'

    constructor(private loginService: LoginService, private httpClient: HttpClient, private routingService: RoutingService){}
    
    getAllTweets(): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/tweets`
        return this.httpClient.get(url)

    }

    getAllPersonalizedTweets(id: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/tweets/personalized/${id}`
        return this.httpClient.get(url)
    }

    getProfileTweets(id: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/tweets/profile/${id}`
        return this.httpClient.get(url)
    }

    postTweet(tweetText: string, token: string): Observable<HttpResponse> {
        const url = `${this.API_URL}/${this.API_VERSION}/tweets/post`
        const postHeaders = { 
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded', 
                    'token': token
                })
        };

        let postParams = new HttpParams().append("tweet", tweetText)

        return this.httpClient.post<HttpResponse>(url,postParams,postHeaders)

    }


}