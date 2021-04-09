import profileReducer, {addPostActionCreator, deletePost} from "./Profile-reducer";

let state = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 11},
        {id: 2, message: "It's my first message", likesCount: 12},
        {id: 3, message: "Yo!", likesCount: 12},
        {id: 4, message: "Dada", likesCount: 12}
    ],
    profile: null,
    status: ""
}

test('length of posts should be incremented', () => {

    let action = addPostActionCreator("New post")

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
})

test('after deleting length of messages should be decrement', () => {

    let action = deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})