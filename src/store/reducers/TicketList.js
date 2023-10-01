import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    list: null,
    sort: {key: "price", order: "asc"},
    filters: []
}

const TicketList = createSlice({
    name: "TicketList",
    initialState,
    reducers: {
        listAction(state, action) {
            state.list = action.payload
        },
        sortAction(state, action) {
            state.sort = action.payload
        },
        filtersAction(state, action) {
            state.filters = action.payload
        }
    }
})

export const {
    listAction,
    sortAction,
    filtersAction,
} = TicketList.actions;
export default TicketList.reducer
