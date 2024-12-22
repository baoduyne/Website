import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

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

        let linkToRedirect = this.state.isLoggedIn ? '/system' : '/home';
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

