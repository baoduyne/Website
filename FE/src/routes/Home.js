import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import manageDoctor from "../containers/System/Admin/ManageDoctor";
import Header from '../containers/Header/Header';
import UserRedux from '../containers/System/Admin/UserRedux'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            data: '',
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.data && prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data })
        }
    }


    render() {

        let linkToRedirect = this.state.isLoggedIn ? '/system/user-manage' : '/home';
        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        //   systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        data: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

