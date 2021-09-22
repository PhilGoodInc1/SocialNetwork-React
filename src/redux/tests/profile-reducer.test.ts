import profileReducer, {profileActions} from "../profile-reducer";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    userData: null,
    status: '',
};

it('correct length on add post', () => {
    let action = profileActions.addPost('test post text');
    let newState = profileReducer(initialState, action);
    expect(newState.posts.length).toBe(5);
});

