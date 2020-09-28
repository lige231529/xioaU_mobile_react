import React, { Component } from 'react';

import Header from "../../components/Header"
import "../../assets/css/goodinfo.css"
import { Link, withRouter } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import { getGoodsInfo } from "../../common/api"
import { pixHost } from "../../common/utils"


class Info extends Component {
    constructor() {
        super();
        this.state = {
            toggle: true,
            gallery: [],
            goods:{},
            store:{}
        }
    }
    render() {
        let { gallery,goods,store } = this.state;
        return (
            <div className="page-goods">
                <Header title="商品详情" isback={true}>
                    <i className="icon-r iconfont icon-shaixuan"></i>
                </Header>
                <div style={{ height: '.88rem' }}></div>
                {/* 轮播图 */}
                <Swiper className="good-banner" >
                    {/* 轮播图 */}
                    <Swiper className="banner" >
                        {gallery.map((val, idx) => {
                            return (<SwiperSlide key={idx}>
                                <img className="imgs" src={val.image_url} alt={val.image_url} />
                            </SwiperSlide>)
                        })}
                    </Swiper>
                </Swiper>
                <div className="good-desc">
                    <span className="price">￥{goods.market_price}元</span>
                </div>
                <h3 className="good-name">{goods.goods_name}</h3>
                <h3 className="good-name">{goods.goods_remark}</h3>
                <p className="info-txt">
                    <span>折扣：4.6折</span>
                    <span>5人评价</span>
                    <span>21人参团</span>
                </p>
                <div className="tab-box">
                    <div className="title">
                        <span>购买数量</span>
                        <i className="iconfont icon-xiangyou"></i>
                    </div>
                    <div className="box">
                        <div className="nums-box">
                            <span className="iconfont icon-jian"></span>
                            <input type="text" readOnly value="1" />
                            <span className="iconfont icon-jia"></span>
                        </div>
                    </div>
                </div>
                <div className="tab-box">
                    <div className="title">
                        <span>会员专享价</span>
                        <i className="iconfont icon-xiangyou"></i>
                    </div>
                    <div className="box">
                        <ul className="hy-price">
                            <li>铜牌：<span>9折</span></li>
                            <li>金牌：<span>8折</span></li>
                            <li>钻石：<span>7折</span></li>
                        </ul>
                    </div>
                </div>
                <div className="good-store">
                    <div className="top">
                        <img src={pixHost(store.store_logo)} alt={store.store_name}/>
                            <div className="txt">
                            <h3>{store.store_name}</h3>
                                <p>共xxx件商品</p>
                            </div>
                        <Link to={'/storeinfo/' + store.store_id }>进入店铺</Link>
				</div>
                        <div className="bot">
                            <span>
                            宝贝描述：{store.store_servicecredit}
						<i className="iconfont icon-gaoxiao"></i>
                            </span>
                            <span>
                            卖家服务：{store.store_servicecredit}
						<i className="iconfont icon-zhongwen"></i>
                            </span>
                            <span>
                            物流服务：{store.store_servicecredit}
						<i className="iconfont icon-minzhengxinxi-dibaorenyuan"></i>
                            </span>
                        </div>
                    </div>
                <div className="good-detail">
                    <h3 className="tit">商品详情</h3>
                    <div className="box" dangerouslySetInnerHTML={{ __html: goods.goods_content}}>
                    </div>
                </div>
                <div className="fix-bot">
                    <a href="">
                        <i className="iconfont icon-shangjia"></i>
                        <p>店铺</p>
                    </a>
                    <a href="">
                        <i className="iconfont icon-kefu"></i>
                        <p>客服</p>
                    </a>
                    <a>
                        <i className="iconfont icon-shouhouguanli"></i>
                        <p>收藏</p>
                    </a>
                    <button className="car">加入购物车</button>
                    <button className="buy">立即购买</button>
                </div>
            </div>
        );
    }
    async componentDidMount() {
        let goodsid = this.props.match.params.id;
        let res = await getGoodsInfo(goodsid)
        console.log(res);
        this.setState({
            gallery: res.gallery,
            goods:res.goods,
            store: res.store
        })
    }
}

export default withRouter(Info);
