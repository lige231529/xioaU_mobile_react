import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class TabNav extends Component {
    render() {
        return (
            <ul className="footer">
                <li>
                    <NavLink to='/' exact>
                        <i className="iconfont icon-shouye"></i>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/menu'>
                        <i className="iconfont icon-menus"></i>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/car'>
                        <i className="iconfont icon-gouwuche"></i>
                        <span>购物车</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/user'>
                        <i className="iconfont icon-yonghu"></i>
                        <span>用户</span>
                    </NavLink>
                </li>
            </ul>
        );
    }
}

export default TabNav;
