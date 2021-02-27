import React from "react";
import {NavLink} from "react-router-dom";
import s from "./header.module.css";

type HeaderTypePropsType = {
    login: string | null
    isAuth: boolean
}

const Header: React.FC<HeaderTypePropsType> = (props) => {
    return <header className={s.header}>
        {/*<img*/}
        {/*    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-LsQsFeofHHKzAKKv_gJpQrz8NC_O3yQkdQ&usqp=CAU"*/}
        {/*    />*/}
        <div className={s.loginBlock}>
            {props.isAuth
                ? props.login
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;