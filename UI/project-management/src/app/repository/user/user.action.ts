import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { UserModel } from './../../model/user-model'

export const ADD = 'User - Add'
export const REMOVE = 'User - Remove'
export const UPDATE = 'User - Update'
export const LOAD = 'User - Load'

export class AddToRepository  implements Action {
    readonly type = ADD

    constructor(public payload: UserModel) { }
}

export class RemoveFromRepository implements Action {
    readonly type = REMOVE

    constructor(public payload: UserModel) { }
}

export class UpdateRepository  implements Action {
    readonly type = UPDATE

    constructor(public payload: UserModel) { }
}

export class LoadRepository  implements Action {
    readonly type = LOAD

    constructor(public payload: UserModel[]) { }
}

export type UserActions = AddToRepository | RemoveFromRepository | UpdateRepository | LoadRepository