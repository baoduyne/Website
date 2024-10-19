import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import CustomScrollbars from '../components/CustomScrollbars.js';
import Home from '../routes/Home';
//import Login from '../routes/Login';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import Doctor from '../routes/Doctor.js'
import HomePage from './HomePage/HomePage.js'
import { CustomToastCloseButton } from '../components/CustomToast';
import DetailDoctor from './Patient/Doctor/DetailDoctor.js';
import VerifyEmail from './Patient/VerifyEmail/VerifyEmail.js'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        <span className="content-container">
                            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={userIsAuthenticated(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}></Route>
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.VERIFY_APPOINMENT} component={VerifyEmail}></Route>
                                </Switch>
                            </CustomScrollbars>
                        </span>
                    </div>
                </Router>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);