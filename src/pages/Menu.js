import React, { Component, Fragment } from 'react';

import Header from "../components/Header"
import "../assets/css/menu.css"
import { Link } from 'react-router-dom';

import { getTopMenu,getChildMenu } from "../common/api"
import { pixHost } from "../common/utils"


class Menu extends Component {
    constructor() {
        super();
        this.state = {
            topmenu: [],
            childmenu: [],
            curindex:0,
            curid:"",
            curimg:""
        }
    }
    async tabchange(idx,id,url){
        let child = await getChildMenu(id);
        this.setState({
            curindex:idx,
            childmenu:child,
            curid:id,
            curimg:url
        })
    }
    render() {
        let { topmenu, childmenu, curindex,curid,curimg} = this.state;
        return (
            <Fragment>
                <Header title="分类">
                    <i className="icon-r iconfont icon-sousuo1"></i>
                </Header>
                <div className="container page-content page-menu">
                    <div className="menus">
                        <ul>
                            {topmenu.map((val,idx)=>(
                                <li key={idx} onClick={() => this.tabchange(idx, val.id, val.image) } className={idx === curindex ? 'on' : ''}>{val.mobile_name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="info">
                        <div className="adv-top">
                            <Link to={'/goodlist/'+curid}>
                                <img src={pixHost(curimg)} alt={curimg} />
                                <p>全<br />部<br /> 》</p>
                            </Link>
                        </div>
                        <div className="menu-list">
                            {childmenu.map((val, idx) => (
                                <div className="items" key={idx}>
                                    <h3 className="tit"><span>{val.mobile_name}</span></h3>
                                    <ul>
                                        {val.sub_category.map((v, i) => (
                                            <li key={i}>
                                                <Link to={'/goodlist/' + v.id}>{v.mobile_name}</Link>
                                            </li>
                                         ))}
                                    </ul>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    async componentDidMount() {
        let res = await getTopMenu()
        if(res.length){
            this.tabchange(0,res[0].id,res[0].image);
        }
        this.setState({
            topmenu: res
        })
    }
}

export default Menu;
