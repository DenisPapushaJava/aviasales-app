

import  {useState} from "react";
import styles from './index.module.scss'
import {useDispatch} from 'react-redux';
import {sortAction} from "../../../../store/reducers/TicketList.js";

function TabFilter() {
    const [activeId, setActiveId] = useState(1);
    const dispatch = useDispatch();
    const data = [
        {
            id: 1,
            selectId: 1,
            title: "Самый дешевый"
        },
        {
            id: 2,
            selectId: 2,
            title: "Самый быстрый"
        },
        {
            id: 3,
            selectId: 3,
            title: "Оптимальный"
        },

    ];
    const filterClickSort = (id) => {
        switch (id) {
            case 1:
                dispatch(sortAction({key: "price", order: "asc"}))
                break;
            case 2:
                dispatch(sortAction({key: "price", order: "desc"}))
                break;
            case 3:
                dispatch(sortAction({key: "price", order: "asc"}))
                break;
        }
        setActiveId(id);
    }
    return (
        <div className={styles.tabFilter}>
            {data.map(el => (
                <button className={`${styles.tabFilterSelect} ${el.selectId === activeId ? styles.active : ''}`} key={el.id} onClick={() => filterClickSort(el.selectId)}>
                    {el.title}
                </button>
            ))}
        </div>
    )
}

export default TabFilter;
