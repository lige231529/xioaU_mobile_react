import React, { Component, Fragment } from 'react';


import Header from "../components/Header"
import "../assets/css/car.css"
import { Link } from 'react-router-dom';
import { pixImg } from "../common/utils"

import { get_car_list, del_car, edit_car }  from "../actions/car"


class Car extends Component {
    constructor() {
        super();
        let state = this.$store.getState();
        this.state = {
            haslogin: state.app.haslogin,
            storeList: state.car.storeList,
            total_price: state.car.total_price
        }
    }
    render() {
        let { haslogin, storeList,total_price} = this.state;
        let allgoodslist = [];
        storeList.forEach(val=>{
            allgoodslist = allgoodslist.concat(val.cartList)
        })
        let allCheck = false;
        allCheck = allgoodslist.every(val=>val.selected==='1')
        return (
            <Fragment>
                <Header title="购物车">
                    <i className="icon-r iconfont icon-sousuo1"></i>
                </Header>
                <div className="container page-content page-car">
                    {!haslogin ?
                        <div className="info" >
                            <img src={require("../assets/img/icons/icon-empty.jpg")} alt="" />
                            <p>登录后查看购物车中的商品</p>
                            <Link to="/login?/car">登录</Link>
                        </div>
                        :
                        !storeList.length ?
                        <div className="info" >
                            <img src={require("../assets/img/icons/icon-empty.jpg")} alt="" />
                            <p>您的购物车有点寂寞</p>
                            <Link to="/menu">马上逛逛</Link>
                        </div>
                        :
                            <div className="car-box">
                                <div className="car-list">
                                    {storeList.map(val=>(
                                        <div className="item" key={val.store_id}>
                                            <div className="tit">
                                                <Link to={'/store/' + val.store_id}> <i className="iconfont icon-shangjia"></i>供货商：{val.store_name}</Link>
						                    </div>
                                            <ul>
                                                {val.cartList.map(v => (
                                                    <li key={v.goods_id}>
                                                        {v.selected==="1" ?
                                                            <div className="check" onClick={() => edit_car(v.goods_num,0,v.id)}>
                                                                <i className='iconfont icon-quan-dui active'></i>
                                                            </div>
                                                            :
                                                            <div className="check" onClick={() => edit_car(v.goods_num,1,v.id)}>
                                                                <i className='iconfont icon-quan'></i>
                                                            </div>
                                                        }
                                                    <div className="text">
                                                            <Link className="pic" to={'/goodinfo/' + v.goods_id }>
                                                                <img src={pixImg(v.goods_id)} alt={v.goods_num} />
                                                        </Link>
                                                        <div className="desc">
                                                                <h3 className="t">{v.goods_name}</h3>
                                                            <div className="nums-box">
                                                                    
                                                                    <span className="iconfont icon-jian" onClick={() => edit_car(v.goods_num*1 -1, v.selected, v.id)}></span>
                                                                    <span > {v.goods_num}</span>
                                                                    <span className="iconfont icon-jia" onClick={() => edit_car(v.goods_num*1 + 1, v.selected, v.id)}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="price">
                                                        <h4>¥{v.goods_price}</h4>
                                                            <i className="iconfont icon-shanchu" onClick={() => del_car(v.id) }></i>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                <div className="car-bot">
                                    <label>
                                        <i className={allCheck ? 'iconfont icon-quan-dui active' : 'iconfont icon-quan'}></i>
                                        全选</label>
                                    <div className="rt">
                                        <div className="t">
                                            <h3>总计：¥{total_price.total_fee}元</h3>
                                            <p>不含运费</p>
                                        </div>
                                        <a>去结算</a>
                                    </div>
                                </div>
                            </div>

                    }
                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        if(this.state.haslogin){
            get_car_list();
        }
        this.unsubscribe = this.$store.subscribe(() => {
            let state = this.$store.getState();
            this.setState({
                haslogin: state.app.haslogin,
                storeList: state.car.storeList,
                total_price: state.car.total_price
            })
        })
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Car;
