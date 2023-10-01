import styles from './index.module.scss';
import {useSelector} from "react-redux";
import {Spin} from 'antd';
import {compareValues} from "../../../../helpers/compareValues.js";
import {useEffect, useState} from "react";

const CardTicket = () => {
    let {list, sort, filters} = useSelector(state => state.TicketList);

    const [listTickets, setListTickets] = useState([]);
    const [cardTickets, setCardTickets] = useState(5);

    useEffect(() => {
        if (sort) {
            setListTickets(list?.tickets?.slice(0, cardTickets).sort(compareValues(sort.key, sort.order)))
        } else {
            setListTickets(list?.tickets?.slice(0, cardTickets))
        }
    }, [sort, list]);
    let priceRU = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
    });
    const formatDuration = (min) => {
        const hours = Math.floor(min / 60);
        const minites = min % 60;
        if (hours === 0) {
            return `${minites}м`;
        } else if (minites === 0) {
            return `${hours}ч`;
        } else {
            return `${hours}ч ${minites}м`
        }
    }

    const timeInFly = (date, duration) => {
        const dates = new Date(date);
        const depHours = dates.getHours();
        const depMinutes = dates.getMinutes();
        dates.setMinutes(dates.getMinutes() + duration);
        const arrHours = dates.getHours();
        const arrMinutes = dates.getMinutes();
        return `${depHours < 10 ? "0" + depHours : depHours}:${depMinutes < 10 ? "0" + depMinutes : depMinutes} -
        ${arrHours < 10 ? "0" + arrHours : arrHours}:${arrMinutes < 10 ? "0" + arrMinutes : arrMinutes}`;
    }
    useEffect(() => {
        if (filters.length > 0) {
            let arr = [];
            list?.tickets?.filter((el) => {
                return el.segments.filter(stops => {
                    return filters.forEach(val => {
                        if (val !== 5 && stops.stops.length === val) {
                            arr.push(el)
                        }
                    })
                })
            })
            arr.length > 0 && setListTickets(arr)
        }
        if (filters.length === 0 && list?.tickets?.length) {
            list && setListTickets(list.tickets)
        }
    }, [filters, list, cardTickets])

    return (
        <>
            {list ?
                <>
                    {listTickets?.slice(0, cardTickets).map((el, index) => (

                        <div className={styles.cardTicket} key={index}>
                            <div className={styles.cardTicketHeader}>
                                <div className={styles.cardTicketPrice}>{priceRU.format(el.price)}</div>
                                <div>
                                    <img alt="ticket" src={`https://pics.avs.io/99/36/${el.carrier}.png`}/>
                                </div>
                            </div>

                            {el.segments.map((value, key) => (

                                <div className={styles.cardTicketInfo} key={key}>

                                    <div className={styles.cardTicketInfoDate}>
                                        <div className={styles.cardTicketInfoDateDay}>
                                            {value.origin} – {value.destination}

                                        </div>
                                        <div className={styles.cardTicketInfoDateTime}>
                                            {timeInFly(value.date, value.duration)}
                                        </div>
                                    </div>
                                    <div className={styles.cardTicketInfoDate}>
                                        <div className={styles.cardTicketInfoDateDay}>
                                            В пути
                                        </div>
                                        <div className={styles.cardTicketInfoDateTime}>
                                            {formatDuration(value.duration)}
                                        </div>
                                    </div>
                                    <div className={styles.cardTicketInfoDate}>
                                        <div className={styles.cardTicketInfoDateDay}>
                                            {value.stops.length} пересадки
                                        </div>
                                        <div className={styles.cardTicketInfoDateTime}>
                                            {value.stops.map(value => {
                                                    let res = value.concat(", ");

                                                    return res;
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    ))}
                    <button className={styles.showTicketButton} onClick={() => {
                        setCardTickets((cT) => cT +5 );
                    }}>
                        Показать еще 5 билетов
                    </button>

                </> :
                <div className={styles.cardTicketSpinner}>
                    <Spin tip="Loading" size="large">
                        <div className="content"/>
                    </Spin>
                </div>
            }
        </>

    )
}

export default CardTicket;
