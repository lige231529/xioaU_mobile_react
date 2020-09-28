import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div>
                <img src={require("../assets/img/icons/loading.gif")} alt=""/>
            </div>
        );
    }
}

export default Loading;
