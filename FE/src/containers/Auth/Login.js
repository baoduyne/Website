import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    componentDidMount = () => {
        this.props.history.push('/login')
    }

    handleOnChangeInput = (event) => {
        this.setState({
            username: event.target.value
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

    }
    handleLogin = async (event) => {
        this.setState({
            errMessage: ""
        })
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            else {
                this.props.userLoginSuccess(data.user);
                console.log("login success!");
            }


        }
        catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }

        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()

        }
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input
                                placeholder='Enter your username'
                                type="text"
                                className="form-control"
                                onChange={(event) => this.handleOnChangeInput(event)}
                                value={this.state.username}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            ></input>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input
                                    placeholder='Enter your password'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control"
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                >

                                </input>
                                <span
                                    onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye icon-input" : 'fas fa-eye-slash icon-input'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login"
                                onClick={(event) => { this.handleLogin(event) }}

                            >Login</button>
                        </div>
                        <div className="col-12">
                            <span>Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook facebook"></i>
                        </div>
                        <div className="col-12 form-group"></div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //   userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
