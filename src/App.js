import React, { Component,Fragment } from 'react';

import {withRouter } from "react-router-dom"
import MyRouter from "./router"
import TabNav from "./components/TabNav"

let tabslist = ['/','/menu','/car','/user']

class App extends Component {
    render() {
        let pathname = this.props.location.pathname;
        return (
            <Fragment>
                <MyRouter/>
                { tabslist.includes(pathname) ? <TabNav/>:"" }
            </Fragment>
        );
    }
}

export default withRouter(App);
