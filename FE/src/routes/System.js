import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import manageDoctor from "../containers/System/Admin/ManageDoctor";
import Header from '../containers/Header/Header';
import UserRedux from '../containers/System/Admin/UserRedux'
class System extends Component {
    render() {
        const { systemMenuPath,isLoggedIn } = this.props;
        console.log("check",this.props.data)
        return (
            <React.Fragment>
                <div className="system-container">
                    <div className="system-list">
                        {isLoggedIn && <Header />}
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/product-manage" component={ProductManage}/>
                            <Route path="/system/manage-doctor" component={manageDoctor}></Route>
                            <Route path="/system/user-redux" component={UserRedux}></Route>
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
        data:state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
