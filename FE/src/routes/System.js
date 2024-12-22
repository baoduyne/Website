import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import manageDoctor from "../containers/System/Admin/ManageDoctor";
import Header from '../containers/Header/Header';
import UserRedux from '../containers/System/Admin/ManageUser';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManageHandbook from '../containers/System/Handbook/ManageHandbook';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                <div className="system-container">
                    <div className="system-list">
                        {isLoggedIn && <Header />}
                        <Switch>
                            <Route path="/system/manage-doctor" component={manageDoctor}></Route>
                            <Route path="/system/manage-user" component={UserRedux}></Route>
                            <Route path='/system/manage-specialty' component={ManageSpecialty}></Route>
                            <Route path='/system/manage-clinic' component={ManageClinic}></Route>
                            <Route path='/doctor/manage-patient' component={ManagePatient}></Route>
                            <Route path='/doctor/manage-handbook' component={ManageHandbook}></Route>
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        data: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
