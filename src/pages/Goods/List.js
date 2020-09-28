import React, { Component, Fragment } from 'react';

import Header from "../../components/Header"
import "../../assets/css/goodlist.css"
import { Link, withRouter } from 'react-router-dom';


import { getGoodsList  } from "../../common/api"
import { pixImg } from "../../common/utils"
import { add_car } from "../../actions/car"


class List extends Component {
    constructor(){
        super();
        this.state = {
            toggle:true,
            list:[],
            page:1,
            order:"goods_id",
            sjx:"asc"  // asc 升序！！！
        }
        this.canload = true;
    }
    menutoggle = ()=>{
        this.setState(state=>({
            toggle:!state.toggle
        }))
    }
    tabChange(attr){
        let sjx = this.state.sjx;
        if (attr ==='shop_price'){
            sjx = sjx === 'asc' ? 'desc':'asc'
        }else{
            sjx = 'asc'
        }
        this.setState({
            order:attr,
            sjx: sjx,
            page:1,
            list:[],
        },async ()=>{
            this.canload = true; // 可以重新加载数据！
            let menuid = this.props.match.params.id;
            let res = await getGoodsList(menuid, this.state.page, this.state.order, this.state.sjx)
            this.setState({
                list: res
            })
            window.scroll(0,0)
        })
    }
    render() {
        let { list, order, sjx} =this.state;
        return (
            <Fragment>
                <Header title="商品列表" isback={true}>
                    <i className="icon-r iconfont icon-shaixuan"></i>
                </Header>
                <div className="container good-box">
                    <div className="fix-top">
                        <div onClick={() => this.tabChange('goods_id') } className={order ==='goods_id' ? "active":"" }>最新</div>
                        <div onClick={() => this.tabChange('sales_sum')}  className={order === 'sales_sum' ? "active" : ""}>销量</div>
                        <div onClick={() => this.tabChange('comment_count')} className={order === 'comment_count' ? "active" : ""}>评论</div>
                        <div onClick={() => this.tabChange('shop_price')}  className={order === 'shop_price' ? "active" : ""}>
                            价格
					        <span>
                                <i className={order === 'shop_price' && sjx === 'asc' ? 'iconfont icon-shengxu on' : 'iconfont icon-shengxu'}></i>
                                <i className={order === 'shop_price' && sjx === 'desc' ? 'iconfont icon-jiangxu on' :'iconfont icon-jiangxu' }></i>
                            </span>
                        </div>
                        <div onClick={ this.menutoggle }>
                            <i className={this.state.toggle ? 'iconfont icon-menu-line' :'iconfont icon-menus'}></i>
                        </div>
                    </div>
                    <ul className={this.state.toggle ? 'goods-list active' :'goods-list'}>
                        {list.map((val, idx) => (
                            <li key={idx}>
                                <div className="item">
                                    <div className="pic">
                                        <Link to={'/goodinfo/' + val.goods_id}>
                                            <img src={pixImg(val.goods_id)} alt={val.goods_name} />
                                        </Link>
                                    </div>
                                    <div className="txt">
                                        <h3 className="name"><Link to={'/goodinfo/' + val.goods_id}>{val.goods_name}</Link></h3>
                                        <h4 className="pirce">￥{val.shop_price}</h4>
                                        <i onClick={() => add_car(val.goods_id, 1)} className="iconfont icon-gouwuche"></i>
                                    </div>
                                </div>
                            </li>
                        ))}    
                    </ul>
                </div>
            </Fragment>
        );
    }
    bindWindowScroll = ()=>{  // 监听滚动！
        // 出去的距离+屏幕的高度  =  文档的高度
        let wH = window.innerHeight;
        window.onscroll = ()=>{
            let dH = document.getElementById('root').offsetHeight;
            let sT = window.scrollY
            if( (wH+sT) >= (dH-20) ){  // 滚动到底了！
                // 判断是否可以加载数据，可以加载采取执行页码加1，和发送新的请求！
                if(!this.canload){
                    return;
                }
                this.canload = false;
                this.setState(state=>({
                    page:state.page+1
                }),async ()=>{  // 等到state更新完成之后再去发送ajax!
                    let menuid = this.props.match.params.id;
                        let res = await getGoodsList(menuid, this.state.page, this.state.order, this.state.sjx)
                    // 如果返回的数据条数小于10条，那么这就是最后一页，不允许在发送请求！
                    if(res.length<10){  
                        this.canload = false;
                    }else{
                        this.canload = true;
                    }
                    let list = this.state.list.concat(res);
                    this.setState({
                        list: list
                    })
                })
                
            }
        }
    }
    async componentDidMount() {
        let menuid = this.props.match.params.id;
        let res = await getGoodsList(menuid, this.state.page, this.state.order, this.state.sjx)
        this.setState({
            list: res
        })
        this.bindWindowScroll();
    }
}

//  滚动到底部要加载！
    // 判断是否可以加载数据！ canload = ???
        // 可以加载
            // canload = false;  防止有下个滚动到底走下来！
            // 请求数据
                // 回来的数据条数小于10，说明最后一页！ canload =false
                // 条数为10条，那么就要打开允许下一次滚动到底  canload =true
        // 不可以加载数据   
            // return      

export default withRouter(List);
