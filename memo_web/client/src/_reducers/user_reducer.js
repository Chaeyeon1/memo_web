import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_LIST
} from '../_actions/types'

export default function (state ={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, login : action.payload};
        case REGISTER_USER:
                return {...state, register : action.payload};
        case AUTH_USER:
            return {...state, userData : action.payload};
        case ADD_TO_LIST:
            return {...state, userData : {
                                ...state.userData,
                                date : action.payload.date,
                                todolist : action.payload.todolist
                            }  
                    }
        default:
            return state;
    }
}