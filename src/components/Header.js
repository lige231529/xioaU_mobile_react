import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


class Header extends Component {
    render() {
        let { title, isback,children,history } = this.props;
        return (
            <div className="header">
                { isback ? <i onClick={history.goBack} className="icon-l iconfont icon-fanhui"></i>:'' }
                <h3>{title}</h3>
                {children}
            </div>
        );
    }
}


Header.propTypes = {
    title:PropTypes.string,
    isback:PropTypes.bool
};

Header.defaultProps = {
    title:"小U商城",
    isback:false
};


export default withRouter(Header);
