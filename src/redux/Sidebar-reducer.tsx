type FriendsType = {
    id: number
    name: string
}
export type SidebarType = {
    friends: Array<FriendsType>
}

let initialState: SidebarType = {
    friends: [
        {id: 1, name: "Andrew"},
        {id: 2, name: "Sasha"},
        {id: 3, name: "Sveta"}
    ]
}

const sidebarReducer = (state = initialState, action: any) => {

    return state
}

export default sidebarReducer;