import React, {useState} from "react";
import style from "./Paginator.module.scss";
import cn from "classnames";

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
        <div className={style.paginatorBlock}>
            {portionNumber > 1 && <button className={style.btn}
                                          onClick={() => setPortionNumber(portionNumber - 1)}>back</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    /* classNames */
                    return <div className={cn(style.pageNumber, {[style.selectedPage]: props.currentPage === p})}
                                key={p}
                                onClick={(e) => {
                                    props.onPageChanged(p)
                                }}>{p}</div>
                })}

            {portionCount > portionNumber &&
            <button className={style.btn}
                    onClick={() => setPortionNumber(portionNumber + 1)}>next</button>}
        </div>
    )
}