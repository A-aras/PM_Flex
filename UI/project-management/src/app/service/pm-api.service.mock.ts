import { Injectable } from '@angular/core';
import { ProjectModel } from 'src/app/model/project-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TaskModel  } from 'src/app/model/task-model';
import { of } from 'rxjs';
import { UserModel } from 'src/app/model/user-model';
import { HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { IPmApiService } from 'src/app/Service/pm-api.service-interface';


export class PMApiServiceMockData {

    public static User1: UserModel={
        UserId : 1,
        FirstName : "FName1",
        LastName : "LName1",
        EmployeeId : 1,
        //Task:null
    };

    public static User2: UserModel={
        UserId : 2,
        FirstName : "FName2",
        LastName : "LName2",
        EmployeeId : 2,
        //Task:null
    };

    public static Users: UserModel[] = [
        PMApiServiceMockData.User1, PMApiServiceMockData.User2
    ];
    
    private static Project1: ProjectModel={
        ProjectId : 1,
        Project : "Project1",
        StartDate : new Date(2018, 9, 1),
        EndDate : new Date(2018,9,30),
        IsActive : true,
        Priority : 10,
        ProjectManager : PMApiServiceMockData.User1,
        ProjectManagerId : PMApiServiceMockData.User1.UserId,
        Tasks:null,
        NoOfClosedTasks:0
    };

    private static Project2: ProjectModel={
        ProjectId : 2,
        Project : "Project2",
        StartDate : new Date(2018, 10, 1),
        EndDate : new Date(2018, 10, 31),
        IsActive : true,
        Priority : 20,
        ProjectManager : PMApiServiceMockData.User2,
        ProjectManagerId : PMApiServiceMockData.User2.UserId,
        Tasks:null,
        NoOfClosedTasks:0
    };

    // // public static Projects: ProjectModel[] = [
    // //     PMApiServiceMockData.Project1, PMApiServiceMockData.Project2
    // // ];

    private static Project1_ParentTask1: TaskModel={
        TaskId : 1,
        TaskDescription : "ParentTask1",
        IsParentTask : true,
        IsClosed : false,
        User : null,
        UserId : null,
        ParentTask : null,
        ParentTaskId : null,
        ProjectId : PMApiServiceMockData.Project1.ProjectId,
        //ChildTasks :[PMApiServiceMockData.Project1_ParentTask1_ChildTask1],
        ChildTasks:null,
        StartDate:null,
        EndDate:null,
        Priority:0,
        Project:PMApiServiceMockData.Project1
    };

    public static Project1_ParentTask1_ChildTask1: TaskModel={
        TaskId : 2,
        TaskDescription : "Project1_ParentTask1_ChildTask1",
        IsParentTask : false,
        IsClosed : false,
        User : null,
        UserId : null,
        ParentTask : null,
        ParentTaskId : null,
        ProjectId : PMApiServiceMockData.Project1.ProjectId,
        ChildTasks :null,
        StartDate:null,
        EndDate:null,
        Priority:0,
        Project:PMApiServiceMockData.Project1
    };

    public static Project1_ParentTask1_ChildTask2: TaskModel={
        TaskId : 2,
        TaskDescription : "Project1_ParentTask1_ChildTask2",
        IsParentTask : false,
        IsClosed : false,
        User : null,
        UserId : null,
        ParentTask : null,
        ParentTaskId : null,
        ProjectId : PMApiServiceMockData.Project1.ProjectId,
        ChildTasks :null,
        StartDate:null,
        EndDate:null,
        Priority:0,
        Project:PMApiServiceMockData.Project1
    };

    public static Project1_ParentTask1_WithChildTasks():TaskModel
    {
        var task=PMApiServiceMockData.Project1_ParentTask1;
        task.ChildTasks=[PMApiServiceMockData.Project1_ParentTask1_ChildTask1];
        return  task;
    }

    // public static Tasks: TaskModel[] = [
    //     PMApiServiceMockData.Project1_ParentTask1_WithChildTasks(), PMApiServiceMockData.Project1_ParentTask1_ChildTask1,PMApiServiceMockData.Project1_ParentTask1_ChildTask2
    // ];

    public static Tasks: TaskModel[] = [
        PMApiServiceMockData.Project1_ParentTask1_WithChildTasks(), PMApiServiceMockData.Project1_ParentTask1_ChildTask1,PMApiServiceMockData.Project1_ParentTask1_ChildTask2
    ];

    public static Project1_WithAll():ProjectModel
    {
        var project=PMApiServiceMockData.Project1;
        project.Tasks=PMApiServiceMockData.Tasks;
        return project;
    }

    public static Projects: ProjectModel[] = [
        PMApiServiceMockData.Project1_WithAll(), PMApiServiceMockData.Project2
    ];
    
}