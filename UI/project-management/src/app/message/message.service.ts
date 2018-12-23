import {
  Component,
  OnInit,
  NgZone,
  Injectable,
  OnDestroy
} from "@angular/core";
import {
  Http,
  Response
} from "@angular/http";

import {
  environment
} from "src/environments/environment";
import {
  Observable,
  Subject
} from "rxjs";

@Injectable()
export class MessageService implements OnDestroy {
    
  ngOnDestroy(): void {
    this.sse.close();
  }
  private sse: any;
  private messageObservable: Subject < any > ;

  constructor() {
    var EventSource = window["EventSource"];
    this.sse = new EventSource(environment.ApiService + "/Message/Subscribe");
    this.sse.onmessage = evt => {
      this.messageObservable.next(evt.data);
    };
  }

  public whenEvents(): Observable < any > {
    return this.messageObservable;
  }
}
