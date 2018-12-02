import { TaskModel } from "./task-model";


export interface UserModel {
    UserId: number;
    FirstName     : string;
    LastName: string ;
    EmployeeId: number|null ;
    //ProjectId: number|null;
    //TaskId     : number|null;
    //Task     : TaskModel |null;
}
