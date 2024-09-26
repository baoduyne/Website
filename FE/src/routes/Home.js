import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : false,
        }
    }


    render() {
       
        console.log('check redux',this.state);  
        let linkToRedirect = this.state.isLoggedIn ? '/system/user-manage' : '/home';
        return (
            <Redirect to={linkToRedirect}/>
        
        );
    }

}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        data:state.user,   
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
