import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Profile } from '../../domain/Profile'
import { RoutingService } from '../routing/routing.service';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class WebsocketService {

    private ws: WebSocket

    constructor() {}

    createObservableSocket(id: String): Observable<HttpResponse> {

        this.ws = new WebSocket(`ws://localhost:8080/kwetter/websockettimeline?id=${id}`)

        return new Observable(obs => {
            this.ws.onmessage = event => obs.next(event.data)
            this.ws.onerror = event => obs.error(event)
            this.ws.onclose = event => obs.complete();
            this.ws.onopen = event => console.log('Connected to the Kwetter Socket')

            return () => this.ws.close()
        })
    }

}