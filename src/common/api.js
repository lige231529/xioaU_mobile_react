// 导入封装的请求方法
import $http from './http'
import qs from "qs";

// 请求层！

/**
 * 首页数据请求
 */
export async  function getIndex(){
    let p1 = $http.get("/Index/home");
    let p2 = $http.get("/Index/favourite");
    let res =await $http.all([p1,p2])
    let res1 = res[0].result;
    let res2 = res[1].result;
    return {
        ...res1,
        ...res2
    }
}
/**
 * 一级分类
 */
export async function getTopMenu(){
    let res = await $http.get('/Goods/goodsCategoryList');
    return res.result;
}
/**
 * 二三级分类
 * @param {number} pid  一级分类id
 */
export async function getChildMenu(pid) {
    let res = await $http.get('/Goods/goodsSecAndThirdCategoryList',{
        parent_id:pid
    });
    return res.result;
}


export async function getGoodsList(menuid, page, order = 'goods_id', sjx ='asc'){
    let res = await $http.get('/Goods/goodsList', {
        id: menuid,
        p:page,
        sort_asc: sjx,
        sort: order
    });
    return res.result.goods_list;
}

export async function getGoodsInfo(goodsid) {
    let res = await $http.get('/Goods/goodsInfo', {
        id: goodsid
    });
    return res.result;
}

export async function UserReg(data) {
    data = qs.stringify(data);
    let res = await $http.post('/User/reg', data,{
        'Content-Type':"application/x-www-form-urlencoded"
    });
    return res;
}
export async function UserLogin(data) {
    data = qs.stringify(data);
    let res = await $http.post('/User/login', data, {
        'Content-Type': "application/x-www-form-urlencoded"
    });
    return res;
}



export async function GetCarList(data){
    let res = $http.post('/Cart/cartList', data, {
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res;
}
export async function AddCar(data){
    let res = $http.post('/Cart/addCart', data, {
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res
}
export async function DelCar(data) {
    let res = $http.post('/Cart/delCart', data, {
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res
}
export async function EditCar(data) {
    let res = $http.post('/Cart/cartList', data, {
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res
}