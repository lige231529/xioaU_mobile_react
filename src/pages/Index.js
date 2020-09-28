import React, { Component, Fragment } from 'react';

import Header from "../components/Header"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { Link } from 'react-router-dom';
import "../assets/css/index.css"

import { getIndex } from "../common/api"
import {pixImg} from "../common/utils"
import { add_car } from "../actions/car"

class Index extends Component {
    constructor(){
        super();
        this.state ={
            ad:[],
            favourite_goods:[],
            goods:[]
        }
    }
    render() {  
        let { ad,favourite_goods,goods} = this.state;
        let newgoods = goods.concat([]);
        if (newgoods.length){
            newgoods = newgoods.splice(1,newgoods.length-1)
        }
        return (
            <Fragment>
                <Header title="首页">
                    <i className="icon-r iconfont icon-sousuo1"></i>
                </Header>
                <div className="container page-content" id="app">
                    {/* 轮播图 */}
                    <Swiper className="banner" >
                        {ad.map((val,idx)=>{
                            return (<SwiperSlide key={idx}>
                                        <img className="imgs" src={val.ad_code} alt={val.ad_name} />
                                    </SwiperSlide>)
                        })}
                    </Swiper>
                    {/* 菜单区域 */}
                    <ul className="navs">
                        <li>
                            <Link to="menu.html">
                                <img src={require("../assets/img/icons/menu-fl.jpg")} />
                                <p>全部分类</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="brand.html">
                                <img src={require("../assets/img/icons/menu-ppj.jpg")} />
                                <p>品牌街</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="store_list.html">
                                <img src={require("../assets/img/icons/menu-dpj.jpg")} />
                                <p>店铺街</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <img src={require("../assets/img/icons/menu-yhhd.jpg")} />
                                <p>优惠活动</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <img src={require("../assets/img/icons/menu-tg.jpg")} />
                                <p>团购</p>
                            </Link>
                        </li>

                        <li>
                            <Link to="order.html">
                                <img src={require("../assets/img/icons/menu-order.jpg")} />
                                <p>我的订单</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="car.html">
                                <img src={require("../assets/img/icons/menu-car.jpg")} />
                                <p>购物车</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="user.html">
                                <img src={require("../assets/img/icons/menu-user.jpg")} />
                                <p>用户中心</p>
                            </Link>
                        </li>
                    </ul>
                    {/* 特惠促销 */}
                    <div className="thcx">
                        <h3 className="idx-title">
                            <span>{ goods.length ? goods[0].name:""}</span>
                        </h3>
                        <ul className="idx-list">
                            { !goods.length ? "" : goods[0].goods_list.map(val=>{
                                return (<li key={val.goods_id}>
                                            <div className="pic">
                                                <Link to={'/goodinfo/'+val.goods_id}>
                                                    <img src={pixImg(val.goods_id)} alt={val.goods_name} />
                                                    <p>20时:10分:08秒</p>
                                                </Link>
                                            </div>
                                            <h4 className="title">{val.goods_name}</h4>
                                            <h5 className="desc">
                                                <span>¥{val.shop_price}</span>
                                                <i onClick={() => add_car(val.goods_id,1) } className="iconfont icon-gouwuche"></i>
                                            </h5>
                                        </li>)
                            })}
                            
                        </ul>
                    </div>
                    {/* 相同区域 */}
                    { !newgoods.length ? "": newgoods.map((val,idx)=>(
                        <div className="jptj" key={idx}>
                            <h3 className="idx-title">
                                <span>{val.name}</span>
                            </h3>
                            <ul className="idx-list box-list">
                                {val.goods_list.map(v=>(
                                    <li key={v.goods_id}>
                                        <div className="pic">
                                            <Link to={'/goodinfo/' + v.goods_id}>
                                                <img src={pixImg(v.goods_id)} alt={v.goods_name} />
                                            </Link>
                                        </div>
                                        <h4 className="title">{v.goods_name}</h4>
                                        <h5 className="desc">
                                            <span>¥{v.shop_price}</span>
                                            <i onClick={() => add_car(v.goods_id, 1)} className="iconfont icon-gouwuche"></i>
                                        </h5>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )) }
                    {/* 猜你喜欢 */}
                    <div className="cnxh">
                        <div className="h-title">
                            <span>猜你喜欢</span>
                            <a href="">更多 <i className="iconfont icon-xiangyou"></i> </a>
                        </div>
                        <ul className="list">
                            {favourite_goods.map(val=>{
                                return (
                                    <li key={val.goods_id}>
                                        <div className="item">
                                            <div className="pic">
                                                <Link to={'/goodinfo/'+val.goods_id}>
                                                    <img src={pixImg(val.goods_id)} alt={val.goods_name} />
                                                </Link>
                                                <h3 className="title">
                                                    <Link to={'/goodinfo/' + val.goods_id}>
                                                        {val.goods_name}
                                                    </Link>
                                                </h3>
                                                <p className="desc">
                                                    <span className="price">¥ {val.shop_price}</span>
                                                    <i onClick={() => add_car(val.goods_id, 1)} className="iconfont icon-gouwuche"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                            
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
    async componentDidMount(){
        let res =  await getIndex()
        this.setState({
            ad: res.ad,
            favourite_goods: res.favourite_goods,
            goods: res.goods
        })
    }
}

export default Index;
