import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';

import { TaskModel } from '../model/task-model';
import { ProjectModel } from '../model/project-model';
//import { ParentTaskModel } from '../model/parent-task-model';
import { UserModel } from '../model/user-model';
import { IPmApiService } from './pm-api.service-interface';
import { PMApiServiceMockData } from './pm-api.service.mock';



@Injectable()
export class PmApiServiceFake extends IPmApiService {
    getAllParentTasksForProject(project: ProjectModel): Observable<TaskModel[]> {
        throw new Error("Method not implemented.");
    }
    getUsers(): Observable<UserModel[]> {
        return of(PMApiServiceMockData.Users);
    }
    AddUser(user: UserModel) {
        throw new Error("Method not implemented.");
    }
    UpdateUser(user: UserModel): Observable<any> {
        throw new Error("Method not implemented.");
    }
    DeleteUser(user: UserModel): Observable<any> {
        throw new Error("Method not implemented.");
    }
    getProjects(): Observable<ProjectModel[]> {
            return of(PMApiServiceMockData.Projects);
    }
    
    AddProject(project: ProjectModel) {
        throw new Error("Method not implemented.");
    }
    UpdateProject(project: ProjectModel): Observable<any> {
        throw new Error("Method not implemented.");
    }
    getTasks(): Observable<TaskModel[]> {
        return of(PMApiServiceMockData.Tasks);
    }
    getTaskById(id: number): Observable<TaskModel> {
        throw new Error("Method not implemented.");
    }
    getParentTasks(): Observable<TaskModel[]> {
        throw new Error("Method not implemented.");
    }
    getAllTaskForProject(project: ProjectModel): Observable<TaskModel[]> {
        throw new Error("Method not implemented.");
    }
    AddTask(task: TaskModel) {
        throw new Error("Method not implemented.");
    }
    UpdateTask(task: TaskModel): Observable<any> {
        throw new Error("Method not implemented.");
    }
    DeleteTask(task: TaskModel): Observable<any> {
        throw new Error("Method not implemented.");
    }
}