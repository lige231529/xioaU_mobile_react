
let initState = {
    storeList:[],
    total_price:{}
}
function car(state = initState, action) {
    switch (action.type) {
        case 'SET_CAR_INFO':
            state.storeList = action.payload.storeList
            state.total_price = action.payload.total_price
            return state;
        case 'CLEAR_CAR':
            state.storeList =[]
            state.total_price = {}
            return state;
        default:
            return state;
    }
}

export default car;