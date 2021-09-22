import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";


let rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;

export type InferActionsTypes<T> = T extends {[keys:string]:(...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R= Promise<void>> = ThunkAction<Promise<void>, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store;

export default store;