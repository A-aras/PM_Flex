import {
  TaskModel
} from '../model/task-model';
import {
  ProjectModel
} from '../model/project-model';
//import { ParentTaskModel } from '../model/parent-task-model';
import {
  UserModel
} from '../model/user-model';
import {
  Observable
} from 'rxjs/internal/Observable';


export abstract class IPmApiService {

  abstract getUsers(): Observable < UserModel[] > ;
  abstract AddUser(user: UserModel);
  abstract UpdateUser(user: UserModel): Observable < any > ;
  abstract DeleteUser(user: UserModel): Observable < any > ;

  abstract getProjects(): Observable < ProjectModel[] > ;

  abstract AddProject(project: ProjectModel);
  abstract UpdateProject(project: ProjectModel): Observable < any > ;

  abstract getTasks(): Observable < TaskModel[] > ;
  abstract getTaskById(id: number): Observable < TaskModel > ;

  abstract getParentTasks(): Observable < TaskModel[] > ;

  abstract getAllParentTasksForProject(project: ProjectModel): Observable < TaskModel[] > ;

  abstract getAllTaskForProject(project: ProjectModel): Observable < TaskModel[] > ;

  abstract AddTask(task: TaskModel);
  abstract UpdateTask(task: TaskModel): Observable < any > ;
  abstract DeleteTask(task: TaskModel): Observable < any > ;
}
