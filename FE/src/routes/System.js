import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import manageDoctor from "../containers/System/Admin/ManageDoctor";
import Header from '../containers/Header/Header';
import UserRedux from '../containers/System/Admin/ManageUser';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';

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
                            <Route path="/system/product-manage" component={ProductManage} />
                            <Route path="/system/manage-user" component={UserRedux}></Route>
                            <Route path='/system/manage-specialty' component={ManageSpecialty}></Route>
                            <Route path='/system/manage-clinic' component={ManageClinic}></Route>
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
