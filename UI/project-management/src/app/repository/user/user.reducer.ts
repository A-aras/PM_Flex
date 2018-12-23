import {
  Injectable
} from '@angular/core'
import {
  Action
} from '@ngrx/store'
import {
  UserModel
} from './../../model/user-model'
import {
  UserActions,
  AddToRepository,
  ADD,
  REMOVE,
  UPDATE,
  LOAD
} from '../user/user.action';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import {
  start
} from 'repl';

export interface UserState extends EntityState < UserModel > {
  Users: Array < UserModel > ;
  loaded: boolean;

}

export function selectUserId(a: UserModel): number {
  //In this case this would be optional since primary key is id
  return a.UserId;
}

export function sortByName(a: UserModel, b: UserModel): number {
  return a.FirstName.localeCompare(b.FirstName);
}

export const adapter: EntityAdapter < UserModel > = createEntityAdapter < UserModel > ({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  Users: [],
  loaded: false
});

export function UserReducer(state: UserState = initialState, action: UserActions): UserState {
  // Section 3
  switch (action.type) {
    case ADD:
      return adapter.addOne(action.payload, state);
    case REMOVE:
      return adapter.removeOne(action.payload.EmployeeId, state);
    case UPDATE:
      return adapter.updateOne({
        id: action.payload.EmployeeId,
        changes: action.payload
      }, state);

      case LOAD:
      state.loaded=true;
      return adapter.addMany(action.payload,state);

    default:
      return state;
  }
}
