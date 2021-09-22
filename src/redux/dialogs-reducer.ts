import {InferActionsTypes} from "./redux-store";


let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ] as Array<DialogsType>,
        messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How u doin?'},
        {id: 3, message: 'test1'},
        {id: 4, message: 'test2'},
        {id: 5, message: 'test3'},
    ] as Array<MessagesType>,
};

const dialogsReducer = (state = initialState, action: ActionsType) : InitialStateType => {
    switch (action.type) {
        case "socialnetwork/dialogs/sendMessage":
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.messageText}],
            };

        default:
            return state;
    }
};

export const dialogsActions = {
    sendNewMessage: (messageText: string) => ({
        type: 'socialnetwork/dialogs/sendMessage',
        messageText: messageText,
    } as const)
};


export default dialogsReducer;


type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof dialogsActions>;

export type DialogsType = {
    id: number,
    name: string,
};

export type MessagesType = {
    id: number,
    message: string
};