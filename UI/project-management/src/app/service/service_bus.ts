import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { UserModel } from 'src/app/model/user-model';
import { ProjectModel } from 'src/app/model/project-model';
// import { TaskModel } from 'src/app/model/taskModel';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/Observable';
// import { ParentTaskModel } from 'src/app/model/parentTaskModel';
// import { of } from 'rxjs';
// import { TaskQueryModel } from 'src/app/model/taskQueryModel';
// import { HttpHeaders } from '@angular/common/http';
// import { URLSearchParams } from 'url';
// import { HttpParams } from '@angular/common/http';
// import {environment} from 'src/environments/environment';
// // import {Location} from '@angular/common';
// import {ITaskService} from 'src/app/Service/ITaskService';

@Injectable({
  providedIn: 'root'
})
export class PmServiceBus
{
  UserSearchObservable: Subject<boolean> = new Subject<boolean>();

  UserEditObservable: Subject<UserModel> = new Subject<UserModel>();

  ProjectSearchObservable: Subject<boolean> = new Subject<boolean>();

  ProjectEditObservable: Subject<ProjectModel> = new Subject<ProjectModel>();

  CommonSearchObservable: Subject<any> = new Subject<any>();

}