import React, { Component, Fragment } from 'react';
import Header from "../../components/Header"
import "../../assets/css/reg.css"
import { Link, withRouter } from 'react-router-dom';

import { UserReg } from "../../common/api"

class Reg extends Component {
    constructor() {
        super();
        this.state = {
            forminfo: {
                username: "13293117576",
                password: "admin888",
                password2: "admin888",
            },
            isshow:false
        }

    }
    singleChange(attr,ev) {
        let newval = ev.target.value;
        let isshow = false;
        if (attr === 'username' && newval) {
            isshow = true;
        }
        this.setState(state=>({
            forminfo:{
                ...state.forminfo,
                [attr]:newval
            },
            isshow:isshow
        }))
       
    }
    toggleeye(str){
        // str传过来的是1 2
        let eyedom = this['eye' + str];//this.属性名  通过定义的ref属性   this.eye1或this.eye2
        let iptdom = this['pwd' + str];
        iptdom.type = iptdom.type === 'text' ? 'password' : 'text'
        eyedom.className = eyedom.className === 'iconfont icon-biyan' ? 'iconfont icon-icon-eye-open' : 'iconfont icon-biyan'
    }
    clearUsername=()=>{
        this.setState(state => ({
            forminfo: {
                ...state.forminfo,
                username:''
            },
            isshow: false
        }))
    }
    submit = async ()=>{
        console.log(this.state.forminfo);
        // todo：验证（为空、正则！）
        let res = await UserReg(this.state.forminfo);
        if (res.status==-1){
            alert(res.msg)
        }else{
            alert(res.msg)
            this.props.history.goBack();
        }
    }
    render() {
        let { username, password, password2 } = this.state.forminfo;
        let { isshow } = this.state;
        return (
            <Fragment>
                <Header title="注册" isback={true}></Header>
                <div className="container reg">
                    <div className="reg-box">
                        <div className="items">
                            <label><i className="iconfont icon-shouji"></i></label>
                            <input type="text" value={username}   onChange={this.singleChange.bind(this,'username') } placeholder="请输入手机号" />
                            {isshow ? <span onClick={this.clearUsername}><i className="iconfont icon-guanbi"></i></span>:""}
                        </div>
                        <div className="items">
                            <label><i className="iconfont icon-iconfontmima"></i></label>
                            <input type="password" ref={ node=>this.pwd1=node }  value={password} onChange={this.singleChange.bind(this, 'password')}  placeholder="请输入密码" />
                            <span onClick={() => this.toggleeye('1')}><i ref={node => this.eye1 = node} className="iconfont icon-biyan"></i></span>
                        </div>
                        <div className="items">
                            <label><i className="iconfont icon-iconfontmima"></i></label>
                            <input type="password" value={password2} ref={node => this.pwd2 = node} onChange={this.singleChange.bind(this, 'password2')}  placeholder="请确认密码" />
                            <span onClick={() => this.toggleeye('2')}><i ref={node => this.eye2 = node} className="iconfont icon-biyan"></i></span>
                        </div>
                        <button onClick={this.submit}>立即注册</button>
                        <p>
                            <Link to="/login">已有账号？立即登录</Link>
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
    componentDidMount(){
        console.log(this);
    }
}

export default withRouter(Reg);
