import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how r u?', likesCount: 11 },
                { id: 2, message: 'Not bad.', likesCount: 19 },
                { id: 3, message: 'It\'s my first post.', likesCount: 25 },
            ],
            newPostText: 'first statement, change me'
        },
        dialogsPage: {
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'Coding' },
                { id: 3, message: 'Jiza' }
            ],
            newMessageBody: 'Write a message',
            dialogs: [
                { id: 1, name: 'Purira' },
                { id: 2, name: 'Pureira' },
                { id: 3, name: 'Purrito' },
                { id: 4, name: 'Perrito' },
                { id: 5, name: 'Ursulla' },
                { id: 6, name: 'Ursuliha' }
            ]
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    // _addPost() {
    //     let newPost = {
    //         id: 4,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     }

    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._callSubscriber(this._state);
    // },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}





window.state = store;

export default store;