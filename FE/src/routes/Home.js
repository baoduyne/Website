import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : false
        }
    }
    componentDidMount(){

    }


    render() {
        
        console.log("check redux",this.props.data);
        this.setState({
            isLoggedIn : this.props.isLoggedIn
        })
        let linkToRedirect = this.state.isLoggedIn ? '/home' : '/system/user-manage';
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
