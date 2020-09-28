import store from "../store"
import qs from "qs";
import { GetCarList, AddCar, DelCar,EditCar } from "../common/api"

export async function get_car_list() {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let unique_id = userinfo.user_id;
    let data = qs.stringify({
        unique_id: unique_id
    })
    let res = await GetCarList(data);
    if(res.status===1){
        let storeList = res.result.storeList ? res.result.storeList:[];
        let total_price = res.result.total_price
        store.dispatch({
            type:"SET_CAR_INFO",
            payload: { storeList, total_price}
        })
    }
}
export async function add_car(goods_id, goods_num) {
    let userinfo = localStorage.getItem('userinfo');
    if(!userinfo){
        alert('请登录')
        return false;
    }
    console.log(userinfo);
    userinfo = JSON.parse(userinfo);
    let unique_id = userinfo.user_id;
    let data = qs.stringify({
        unique_id: unique_id,
        goods_id: goods_id,
        goods_num: goods_num
    })
    let res = await AddCar(data);
    // 添加成功请求列表
    if (res.status===1){
        get_car_list();
    }else{
        alert(res.msg)
    }
}
export async function del_car(ids) {
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let unique_id = userinfo.user_id;
    let data = qs.stringify({
        unique_id: unique_id,
        ids
    })   
    let res = await DelCar(data)
    if (res.status === 1) {
        get_car_list();
    } else {
        alert(res.msg)
    }
}
export async function edit_car(goodsNum, selected, cartID){
    goodsNum = goodsNum === 0 ? 1 : goodsNum;
    let cart_form_data = [{ goodsNum, selected, cartID}]
    cart_form_data = JSON.stringify(cart_form_data);
    let userinfo = JSON.parse(localStorage.getItem('userinfo'));
    let unique_id = userinfo.user_id;
    let data = qs.stringify({
        unique_id: unique_id,
        cart_form_data
    })  
    let res = await EditCar(data)
    if (res.status === 1) {
        get_car_list();
    } else {
        alert(res.msg)
    }
}