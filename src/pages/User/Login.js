import React, { Component, Fragment } from 'react';
import Header from "../../components/Header"
import "../../assets/css/login.css"
import { Link, withRouter } from 'react-router-dom';

import { UserLogin } from "../../common/api"


class Login extends Component {
    constructor(){
        super();
        this.state = {
            forminfo:{
                username:"13293117576",
                password: "admin888"
            }
        }
    }
    singleChange(attr, ev) {
        let newval = ev.target.value;
        this.setState(state => ({
            forminfo: {
                ...state.forminfo,
                [attr]: newval
            }
        }))
    }
    submit = async () => {
        console.log(this.state.forminfo);
        // todo：验证（为空、正则！）
        let res = await UserLogin(this.state.forminfo);
        if (res.status == -1) {
            alert(res.msg)
        } else {
            // this.props.history.goBack();
            alert('登录成功！')
            this.$store.dispatch({
                type:"SET_USERINFO",
                payload:res.result
            })
            let url = this.props.location.search.substring(1, this.props.location.search.length)
            this.props.history.replace(url)
        }
    }
    render() {
        let { username,password} = this.state.forminfo;
        return (
            <Fragment>
                <Header title="登录" isback={true}></Header>
                <div className="container login">
                    <img className="logo" src={require('../../assets/img/icons/logo.png')} alt="" />
                    <div className="login-box">
                        <div className="items">
                            <label>账号：</label>
                            <input type="text" value={username} onChange={ this.singleChange.bind(this,'username') } placeholder="请输入用户名/手机号" />
                        </div>
                        <div className="items">
                            <label>密码：</label>
                            <input type="text" value={password} onChange={this.singleChange.bind(this,'password')} placeholder="请输入账号密码" />
                        </div>
                        <button onClick={ this.submit }>登录</button>
                        <p>
                            <Link to="/reg">免费注册</Link>
                            <a href="password-forget.html">忘记密码？</a>
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);
