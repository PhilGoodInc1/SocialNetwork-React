import dialogsReducer, {dialogsActions} from "../dialogs-reducer";

let initialState = {
    dialogs: [
        {id: 1, name: 'Jo'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How u doin?'},
        {id: 3, message: 'test1'},
        {id: 4, message: 'test2'},
        {id: 5, message: 'test3'},
    ],
};

it('correct length after send message', () => {
    let action = dialogsActions.sendNewMessage('messageText');
    let newState = dialogsReducer(initialState, action);
    expect(newState.messages.length).toBe(6);
});

