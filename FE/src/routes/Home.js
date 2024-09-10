import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const { isLoggedIn } = this.props;
        console.log("check redux",this.props.data);
        let linkToRedirect = isLoggedIn ? '/home' : '/system/user-manage';
        return (
            <Redirect to={linkToRedirect}/>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        data:state    
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
