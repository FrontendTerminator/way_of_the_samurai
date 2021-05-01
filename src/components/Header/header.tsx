import React from "react";
import {NavLink} from "react-router-dom";
import s from "./header.module.scss";

type HeaderTypePropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

const Header: React.FC<HeaderTypePropsType> = (props) => {
    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div className={s.auth}>
                        <span>{props.login}</span>
                        <button className={s.btn}
                                onClick={props.logout}>Log out
                        </button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;