import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import DoctorSchedule from '../containers/System/Doctor/DoctorSchedule';
class Doctor extends Component {
    render() {
        const { DoctorMenuPath, isLoggedIn } = this.props;
        console.log("check", this.props.data)
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <Switch>
                    <Route path="/doctor/manage-schedule" component={DoctorSchedule}></Route>
                </Switch>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        DoctorMenuPath: state.app.DoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        data: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
