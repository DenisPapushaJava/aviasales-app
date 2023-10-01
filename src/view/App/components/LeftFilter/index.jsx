import styles from "./index.module.scss";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {filtersAction} from "../../../../store/reducers/TicketList.js";


const LeftFilter = () => {
    const [checkbox, setCheckbox] = useState([5, 0, 1, 2, 3]);
    const dispatch = useDispatch();

    const checkList = [
        {
            id: 1,
            name: "all",
            title: "Все",
            select: 5
        },
        {
            id: 2,
            name: "NotTransfers",
            title: "Без пересадок",
            select: 0
        },
        {
            id: 3,
            name: "OneTransfers",
            title: "1 пересадка",
            select: 1
        },
        {
            id: 4,
            name: "TwoTransfers",
            title: "2 пересадки",
            select: 2
        },
        {
            id: 5,
            name: "ThreeTransfers",
            title: "3 пересадки",
            select: 3
        }
    ];
    useEffect(() => {
        dispatch(filtersAction(checkbox));
        return () => {
        }
    }, [checkbox, dispatch]);

    const handlerCheckbox = (name, id, event) => {
        const {
            checked,
            value,
        } = event.target;

        if (parseInt(value) === 5) {
            const allOthersChecked = [0, 1, 2, 3].every(val => checkbox.includes(val));
            setCheckbox(allOthersChecked ? [0, 1, 2, 3, 5] : [0, 1, 2, 3]);
        }
        if (parseInt(value) === 5 && !checked) {
            setCheckbox([]);
        }

        {
            setCheckbox(
                prev => {
                    const updatedState = checked
                        ? [...prev, parseInt(value)]
                        : prev.filter(val => val !== parseInt(value));


                    const allOthersChecked = [0, 1, 2, 3].every(val => updatedState.includes(val));

                    return allOthersChecked ? [...updatedState, 5] : updatedState.filter(val => val !== 5);
                }
            );
        }
    }


    return (
        <aside className={styles.leftFilter}>
            <p className={styles.leftFilterTitle}>Количество пересадок</p>
            {checkList.map((item) =>
                <label key={item.id} className={styles.leftFilterLabel}
                       onClick={(event) => handlerCheckbox(item.name, item.id, event)}>
                    <input className={styles.leftFilterInput} value={item.select} type="checkbox"
                           checked={checkbox.includes(item.select)}/>
                    <p>{item.title}</p>
                </label>
            )
            }
        </aside>
    )
}

export default LeftFilter;
