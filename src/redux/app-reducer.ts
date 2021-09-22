import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";


let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action: ActionsTypes) : InitialStateType => {
    switch (action.type) {

        case "/app/INITIALAIZING_SUCCESS": {
            return {
                ...state,
                initialized: true,
            };
        }

        default :
            return state;
    }
};

const actions = {
    initialazing: () => ({type: '/app/INITIALAIZING_SUCCESS'} as const)
};

export const initializeApp = ()  => {
    return async (dispatch: any) => {
        await dispatch(getAuthUserData());
        dispatch(actions.initialazing());
    }
};

export default appReducer;


type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>