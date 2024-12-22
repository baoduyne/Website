import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import DoctorSchedule from '../containers/System/Doctor/DoctorSchedule';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManageHandbook from '../containers/System/Handbook/ManageHandbook';
class Doctor extends Component {
    render() {
        const { DoctorMenuPath, isLoggedIn } = this.props;

        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <Switch>
                    <Route path="/doctor/manage-schedule" component={DoctorSchedule}></Route>
                    <Route path='/doctor/manage-patient' component={ManagePatient}></Route>
                    <Route path='/doctor/manage-handbook' component={ManageHandbook}></Route>
                    <Route component={() => { return (<Redirect to={'/doctor/manage-patient'} />) }} />
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
