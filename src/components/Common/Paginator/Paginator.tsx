import React from "react";
import style from "./Paginator.module.css";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (

        <div>
            {pages.map(p => {
                return <span
                    onClick={(e) => {
                        props.onPageChanged(p)
                    }}
                    className={props.currentPage === p ? style.selectedPage : ""}>{p}</span>
            })}
        </div>
    )
}