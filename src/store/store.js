import {configureStore} from "@reduxjs/toolkit";
import TicketList from "./reducers/TicketList.js";

export const store = configureStore({
    reducer: {
        TicketList
    },
    devTools: true
})
window.store = store;