import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/model/user-model';

export enum ActionTypes {
    GetAll = '[User] GetALL',
    GetById = '[User] GetById',
    AddUser = '[User] Add',
    UpdateUser = '[User] Update',
    DeleteUser = '[User] Delete',
  }

  export class GetAll implements Action
  {
    readonly type=ActionTypes.GetAll;
    constructor(public payload:UserModel[]) {     }
  }

  export class GetById implements Action
  {
    readonly type=ActionTypes.GetById;
    constructor(public payload:UserModel) {     }
  }

  export class Add implements Action
  {
    readonly type=ActionTypes.AddUser;
    constructor(public payload:UserModel) {     }
  }

  export class Update implements Action
  {
    readonly type=ActionTypes.UpdateUser;
    constructor(public payload:UserModel) {     }
  }

  export class Delete implements Action
  {
    readonly type=ActionTypes.DeleteUser;
    constructor(public payload:UserModel) {     }
  }

  export type Union=GetAll|GetById|Add|Update|Delete