import {  Redirect, Route, Switch } from "react-router-dom"
import React, { Component } from 'react';


import Loadable from 'react-loadable';
import Loading from '../components/Loading'; 


const Index = Loadable({ loader: () => import("../pages/Index"), loading: Loading })
const Menu = Loadable({ loader: () => import("../pages/Menu"), loading: Loading })
const Car = Loadable({ loader: () => import("../pages/Car"), loading: Loading })
const User = Loadable({ loader: () => import("../pages/User/User"), loading: Loading })
const UserAresss = Loadable({ loader: () => import("../pages/User/Address"), loading: Loading })
const UserLove = Loadable({ loader: () => import("../pages/User/Love"), loading: Loading })
const Login = Loadable({ loader: () => import("../pages/User/Login"), loading: Loading })
const Reg = Loadable({ loader: () => import("../pages/User/Reg"), loading: Loading })
const GoodsList = Loadable({ loader: () => import("../pages/Goods/List"), loading: Loading })
const GoodsInfo = Loadable({ loader: () => import("../pages/Goods/Info"), loading: Loading })




const routeConfig = [
    { path: "/", exact: true, component: <Index />, title: "首页" },
    {path:"/menu",exact:false, component:<Menu/>,title:"分类"},
    { path: "/car", exact: false, component:<Car/>,title:"购物车"},
    { path: "/user", exact: true, component: <User />, title: "我的" },
    { path: "/user/address", exact: false, component: <UserAresss />, title: "我的地址",needLogin:true },
    { path: "/user/love", exact: false, component: <UserLove />, title: "我的收藏",needLogin:true },
    { path: "/login", exact: false, component: <Login />, title: "登录" },
    { path: "/reg", exact: false, component: <Reg />, title: "注册" },
    { path: "/goodlist/:id", exact: false, component: <GoodsList />, title: "商品列表" },
    { path: "/goodinfo/:id", exact: false, component: <GoodsInfo />, title: "商品详情" }
]


class MyRouter extends Component {
    renderCom=(val)=>{
        document.title = val.title
        if(val.redirect){
            return <Redirect to={val.redirect} />
        }else{
             // 这里要权限访问判断！！！！
            if(val.needLogin){
                if(localStorage.getItem('userinfo')){
                    return val.component;
                }else{
                    return <Redirect to={ '/login?'+val.path }/>
                }
            }else{
                return val.component;
            }
        }
    }
    render() {
        return (
            <Switch>
                {routeConfig.map((val,idx)=>{
                    return <Route key={idx} path={val.path} exact={val.exact} render={() => this.renderCom(val)} ></Route>
                })}
            </Switch>
        );
    }
}

export default MyRouter;

