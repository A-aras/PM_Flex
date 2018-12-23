import { Component, OnInit, NgZone ,Injectable} from '@angular/core';
//import { Observable } from 'rxjs/Observable'
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment.prod';
import { Subject,Observable } from 'rxjs';

@Injectable(
    {providedIn:"root"}
)
export class PMNotificationService
{
    private serverSentEventSource : any;
    private eventSubject:Subject<any>;

    constructor(private zone:NgZone) {
        var EventSource=window['EventSource'];
            this.serverSentEventSource=new EventSource( environment.ApiService + 'Notification/Subscribe');

            this.serverSentEventSource.onmessage=evt=> {
                this.eventSubject.next(evt);
                };
        }

        public WhenEvents(route:string):Observable<any>
        {
            return this.eventSubject;
        }
}