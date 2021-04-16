import React, {useState} from "react";
import style from "./Paginator.module.css";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize: number
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>back</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span onClick={(e) => {props.onPageChanged(p)}}
                                 className={props.currentPage === p ? style.selectedPage : ""}>{p}</span>
                })}

            {portionCount > portionNumber &&
            <button onClick={() => setPortionNumber(portionNumber + 1)}>next</button>}
        </div>
    )
}