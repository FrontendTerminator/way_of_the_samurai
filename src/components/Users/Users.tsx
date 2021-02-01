import React from "react";
import style from "./Users.module.css";
import {UserType} from "../../redux/Users-reducer";

type UsersPagePropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

export const Users: React.FC<UsersPagePropsType> = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                followed: false,
                fullName: 'Dmitry',
                status: 'I am a boss',
                location: {city: 'Minsk', country: 'Belarus'},
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC7rtjhrDaRCo1l_Qn26n7xroTBhw2SgCDsw&usqp=CAU"
            },
            {
                id: 2,
                followed: true,
                fullName: 'Sasha',
                status: 'I am a boss too',
                location: {city: 'Moscow', country: 'Russia'},
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC7rtjhrDaRCo1l_Qn26n7xroTBhw2SgCDsw&usqp=CAU"

            },
            {
                id: 3,
                followed: false,
                fullName: 'Andrew',
                status: 'I am a boss too',
                location: {city: 'Kiev', country: 'Ukraine'},
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC7rtjhrDaRCo1l_Qn26n7xroTBhw2SgCDsw&usqp=CAU"

            }
        ])
    }

    return (
        <div>
            {
                props.users.map((u: UserType) => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={style.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                    ? <button onClick={() => {props.unfollow(u.id)} }>Unfollow</button>
                                    : <button onClick={() => {props.follow(u.id)} }>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}