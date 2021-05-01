import React from "react";
import {NavLink} from "react-router-dom";
import s from "./header.module.scss";

type HeaderTypePropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

const Header: React.FC<HeaderTypePropsType> = (props) => {
    return <header className={s.header}>
        {/*<img*/}
        {/*    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LsQsFeofHHKzAKKv_gJpQrz8NC_O3yQkdQ&usqp=CAU"*/}
        {/*    />*/}


        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;