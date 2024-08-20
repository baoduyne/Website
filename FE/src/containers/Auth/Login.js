import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

//import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isShowPassword : false,
        }
    }

    handleOnChangeInput = (event) =>{
        this.setState({
            username:event.target.value
        })
        
    }
    handleOnChangePassword = (event) =>{
        this.setState({
            password : event.target.value
        })
      
    }
    handleLogin = (event) => {
        console.log("username: "+this.state.username +"password: "+this.state.password);
    }
    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword : !this.state.isShowPassword
        })
    }
    render() {

        return (
            <div className = "login-background">
                <div className = "login-container">
                    <div className ="login-content row">
                        <div className="col-12 login-text">Login</div>
                        <div className ="col-12 form-group login-input">
                            <label>Username:</label>
                            <input placeholder='Enter your username' type ="text" className ="form-control"
                            onChange={(event) => this.handleOnChangeInput(event)}
                            value = {this.state.username}></input>
                        </div>
                        <div className ="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className = "custom-input-password">
                                <input
                                placeholder='Enter your password'
                                type = {this.state.isShowPassword ? 'text' : 'password'}
                                className ="form-control"
                                onChange={(event)=> this.handleOnChangePassword(event)}>
                                </input>
                                <span
                                onClick={() => this.handleShowHidePassword()}>
                                <i class={this.state.isShowPassword ? "fas fa-eye icon-input" : 'fas fa-eye-slash icon-input'}></i>
                                </span>
                            </div>
                        </div>
                        <div className = "col-12">
                        <button className = "btn-login"
                        onClick={(event) =>{this.handleLogin(event)} }>Login</button>
                        </div>
                        <div className = "col-12">
                            <span>Forgot your password?</span>
                        </div>
                        <div className = "col-12 text-center mt-3">
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                        <i className="fab fa-google-plus-g google"></i>
                        <i className="fab fa-facebook facebook"></i>
                        </div>
                        <div className ="col-12 form-group"></div>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
