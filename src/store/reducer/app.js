let haslogin = localStorage.getItem('userinfo') ? true : false
let userinfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')):{}

let initState = {
    haslogin: haslogin,
    userinfo: userinfo
}
function app(state = initState,action){
    switch(action.type){
        case 'QUIT':   // 退出 
            state.haslogin = false;
            localStorage.removeItem('userinfo')
            return state;
        case 'SET_USERINFO':  // 设置用户信息
            state.userinfo = action.payload
            state.haslogin = true;
            localStorage.setItem('userinfo',JSON.stringify(action.payload))
            return state;  
        default:
            return state;
    }
}

export default app;