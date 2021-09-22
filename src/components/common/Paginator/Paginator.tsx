import React, {useState} from 'react';
import s from "./Paginator.module.css";
import cn from 'classnames'


let Paginator : React.FC<propsType> = ({totalUsersCount, pageSize, currentPage, onPageChange, portionSize = 10}) => {
    let totalPageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(totalPageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftElementNumber = (portionNumber - 1) * portionSize + 1;
    let rightElementNumber = portionNumber * portionSize;

    return (
        <div>
            <span>{portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>left</button>}</span>
            {pages.filter(p => p >= leftElementNumber && p <= rightElementNumber)
                .map(p => <span key={p} className={ cn ({[s.active_page]: currentPage === p && s.active_page})}
                                onClick={() => onPageChange(p)}>{p} </span>)}
            <span>
                {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>right</button>}</span>
        </div>
    )
};

export default Paginator;


type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    portionSize?: number
}
