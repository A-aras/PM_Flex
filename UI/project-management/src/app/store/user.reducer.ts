import * as User from './user.action';
import { State } from '@ngrx/store';
//import { State } from 'fs';

export function reducer( state:any,action:User.Union) : State  {
    switch (action.type)
    {
        case User.Add:
    }
}