import LeftFilter from "./components/LeftFilter";
import TabFilter from "./components/TabFilter";
import CardTicket from "./components/CardTicket";
import { Alert } from "antd";

import img from "../../assets/logo.svg";
import styles from './index.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSearchApi} from "../../services/TicketList/index.js";

function App() {
    let {filters} = useSelector(state => state.TicketList);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSearchApi());
    }, [dispatch]);

    return (
        <>
            <img className={styles.appLogo} alt="logo" src={img}/>
            <div className={styles.appWrapper}>
                <aside>
                    <LeftFilter/>
                </aside>
                <div className={styles.appMain}>
                    <TabFilter/>
                    {filters.length ===0?
                        <Alert
                            description="Рейсов, подходящих под заданные фильтры, не найдено"
                            type="info"
                        />
                        :
                        <CardTicket/>
                    }

                </div>
            </div>
        </>
    )
}

export default App;
