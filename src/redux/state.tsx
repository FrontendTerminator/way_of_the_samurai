let rerenderEntireTree = () => {
    console.log('state was changed')
}

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

let state: RootStateType = {
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
}

export let addPost = () => {
    let newPost: PostsType = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ""
    rerenderEntireTree()
}

export let updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree()
}
////////////////////////////////////////

export let addMessageInState = () => {
    let newMessageObj: MessagesType = {id: 7, message: state.dialogsPage.newMessage}
    state.dialogsPage.messages.push(newMessageObj)
    state.dialogsPage.newMessage = ''
    rerenderEntireTree()
}

export let addMessage = (newText: string) => {
    state.dialogsPage.newMessage = newText;
    rerenderEntireTree()
}

export const subscribe = (observer: () => void) => {
    rerenderEntireTree = observer
}

export default state;