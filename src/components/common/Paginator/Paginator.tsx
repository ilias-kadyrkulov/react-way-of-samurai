import React, { useState } from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames';

type PropsType = {
    currentPageNumber: number
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({ currentPageNumber,
    totalItemsCount,
    pageSize,
    onPageChanged,
    portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>
        }
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => <span className={cn({
                [styles.selectedPage]: currentPageNumber === p
            }, styles.pageNumber)}
                key={p}
                onClick={() => {
                    onPageChanged(p)
                }}>{p}</span>
            )}
        {portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>
        }
    </div>
}

export default Paginator;