type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsType = {
    id: number
    name: string
}
type FriendsType = {
    id: number
    name: string
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
export type DialogsPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
    newMessage: string
}
type SidebarType = {
    friends: Array<FriendsType>
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType

}
export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType //
    _callSubscriber: () => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
    addMessageInState: () => void
    addMessage: (newText: string) => void
    subscribe: (observer: () => void) => void
}

export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 11},
                {id: 2, message: "It's my first message", likesCount: 12},
                {id: 3, message: "Blabla", likesCount: 12},
                {id: 4, message: "Dada", likesCount: 12}
            ],
            newPostText: 'new post...'
        },
        dialogsPage: {
            messages: [
                {id: 1, message: "hi"},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'yo'},
                {id: 4, message: 'yo'},
                {id: 5, message: 'yo'},
            ],
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}
            ],
            newMessage: 'new message'
        },
        sidebar: {
            friends: [
                {id: 1, name: "Andrew"},
                {id: 2, name: "Sasha"},
                {id: 3, name: "Sveta"}
            ]
        }
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('state was changed')
    },
    addPost() {
        let newPost: PostsType = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ""
        this._callSubscriber()
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber()
    },
    addMessageInState() {
        let newMessageObj: MessagesType = {id: 7, message: this._state.dialogsPage.newMessage}
        this._state.dialogsPage.messages.push(newMessageObj)
        this._state.dialogsPage.newMessage = ''
        this._callSubscriber()
    },
    addMessage(newText: string) {
        this._state.dialogsPage.newMessage = newText;
        this._callSubscriber()
    },
    subscribe(observer) {
        this._callSubscriber = observer
    }
}

