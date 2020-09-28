import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from "./App"

import { HashRouter } from "react-router-dom"
import "./assets/css/style.css"
import store from "./store"
Component.prototype.$store = store;

ReactDOM.render(<HashRouter><App /></HashRouter>,document.getElementById('root'));



/*
create-react-app中处理跨域问题:
    1、安装插件
        npm install http-proxy-middleware --save
    2、书写跨域配置文件
        src/setupProxy.js
        内容为：
        const { createProxyMiddleware } = require('http-proxy-middleware');
        module.exports = function(app) {
            app.use('/api',
                createProxyMiddleware({
                    target: 'http://localhost:5000',
                    changeOrigin: true
                })
            );
        };

*/