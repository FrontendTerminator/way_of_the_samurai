import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";

type FriendsType = {
    id: number
    name: string
}
type friendsType = {
    friends: Array<FriendsType>
}
type NavbarType = {
    sidebar: friendsType
}

const Navbar: React.FC<NavbarType> = (props) => {

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <a href="/news">News</a>
            </div>
            <div className={s.item}>
                <a href="/music">Music</a>
            </div>
            <div className={s.item}>
                <a href="/settings">Settings</a>
            </div>
            <div className={s.item}>
                <a href="/friends">Friends</a>
                <div className={s.friends}>
                    <div className={s.friend}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_iEXq5Tq8suPbnZd51iuXk2m7Q64Zide5WA&usqp=CAU"/>
                        <br/>
                        {props.sidebar.friends[0].name}
                    </div>
                    <div className={s.friend}>
                        <img src="https://i.pinimg.com/originals/0c/a9/e2/0ca9e28dcb12dc698cfd2beda6d6fa64.jpg"/>
                        <br/>
                        {props.sidebar.friends[1].name}
                    </div>
                    <div className={s.friend}>
                        <img src="https://klike.net/uploads/posts/2019-03/1551511784_4.jpg"/>
                        <br/>
                        {props.sidebar.friends[2].name}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;