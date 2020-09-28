import store from "../store"

export async function quit(){
    store.dispatch({
        type:"QUIT"
    })
}