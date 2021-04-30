import React from 'react'
import s from "./Button.module.scss"

type ButtonPropsType = {
    text: string
    disabled?: boolean
}

export const Button: React.FC<ButtonPropsType> = (props) => {
    return (
        <button className={s.btn}
                disabled={props.disabled}
        >{props.text}</button>
    )
}