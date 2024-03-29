import React, {useEffect, useState} from "react";
import styles from "./paginator.module.css";

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}

export const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage])

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];

    let postionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.paginationWrapper}>
            { portionNumber > 1 && <button onClick={ () => setPortionNumber(portionNumber - 1) }>Prev</button> }
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(page => {
                    return <span
                    key={page}
                        // @ts-ignore
                    className={currentPage === page && styles.selectedPage}
                    onClick={() => { onPageChanged(page) }}>
                            {page}
                    </span>
            })}
            { postionCount > portionNumber && <button onClick={ () => setPortionNumber(portionNumber + 1) }>Next</button> }
        </div>
    )
}
