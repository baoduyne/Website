import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import LoadingPage from './LoadingPage';
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ManageUserTable from "./ManageUserTable";
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            objectUrl: '',
            arrAllCode: {},

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

        

        }
    }

    componentDidMount = async () => {
        await this.props.fetchAllCodeStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allCodeData.users !== this.props.allCodeData.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                objectUrl: ''
            })
        }


        if (prevProps.allCodeData !== this.props.allCodeData) {

            let genders = this.props.allCodeData.genders;
            let positions = this.props.allCodeData.positions;
            let roles = this.props.allCodeData.roles;
            this.setState({
                arrAllCode: this.props.allCodeData,
                gender: genders && genders.length > 0 && genders[0].key,
                position: positions && genders.length > 0 && positions[0].key,
                role: roles && roles.length > 0 && roles[0].key
            })

        }


    }
    handlePreviewImage = (event) => {

        let data = event.target.files;
        let file = data[0];
        if (file) {
            this.setState({ avatar: file })
            let objectUrl = URL.createObjectURL(file);
            this.setState({ objectUrl: objectUrl })

        }

    }


    handleOnchangeInput = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value;
        this.setState({
            ...copyState
        })

    }
    checkValidate = () => {
        let isValid = true;
        let arrValid = ['email', 'password', 'firstName', 'lastName', 'address'
            , 'phoneNumber', 'gender', 'position', 'role', 'avatar'];
        let validKey = '';
        for (let i = 0; i < arrValid.length; i++) {
            if (!this.state[arrValid[i]]) {
                isValid = false;
                validKey = arrValid[i];
                break;
            }
        }
        if (isValid === false) {
            alert('Missing parameter : ' + validKey);
            return isValid;
        }
        return isValid;
    }

    handleSubmitUser = (event) => {

        let isValid = this.checkValidate();

        if (isValid === true) {
            let data = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                position: this.state.position,
                role: this.state.role,
                avatar: this.state.avatar
            }
            setTimeout(async () => {
                await this.props.saveUserAction(data);
            }, 1000)

        }
    }

    render() {
        let isLoading = this.props.allCodeData.isLoading;
        let language = this.props.language;
        let imagePreview = this.state.objectUrl;

        let { email, password, firstName, lastName, address
            , phoneNumber, gender, position, role, avatar }
            = this.state;

        return (
            <React.Fragment>

                {isLoading ? <LoadingPage></LoadingPage> :
                    <div className="user-redux-container">
                        <div className="title">
                            <FormattedMessage id="menu.admin.redux-handle"></FormattedMessage>
                        </div>
                        <div className="user-redux-body">
                            <form>
                                <div class="form-group d-flex gap-3 justify-content-center">
                                    <div class="form-group col-3">
                                        <label for="inputEmail4">Email</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="inputEmail4"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                        ></input>
                                    </div>
                                    <div class="form-group col-3">
                                        <label for="inputPassword4"><FormattedMessage id="menu.admin.password"></FormattedMessage></label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="inputPassword4"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                        ></input>
                                    </div>
                                </div>
                                <div class="form-group d-flex gap-3 justify-content-center">
                                    <div class="form-group col-3">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.first-name"></FormattedMessage></label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="inputAddress"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                        ></input>
                                    </div>
                                    <div class="form-group col-3">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.last-name"></FormattedMessage></label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="inputAddress"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                        ></input>
                                    </div>
                                </div>
                                <div class="form-group d-flex justify-content-center">
                                    <div class="form-group col-6">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.address"></FormattedMessage></label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="inputAddress"
                                            placeholder="1234 Main St"
                                            value={address}
                                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                        ></input>
                                    </div>
                                </div>
                                <div class="form-group d-flex gap-3 justify-content-center">
                                    <div class="form-group col-3">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.phonenumber"></FormattedMessage></label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="inputAddress"
                                            placeholder="0123456789"
                                            value={phoneNumber}
                                            onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                        ></input>
                                    </div>
                                    <div class="form-group col-3">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.gender"></FormattedMessage></label>
                                        <select
                                            id="inputState"
                                            class="form-control"
                                            onChange={(event) => this.handleOnchangeInput(event, 'gender')}
                                        >

                                            {this.state.arrAllCode.genders && this.state.arrAllCode.genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                );
                                            }
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group d-flex gap-3 justify-content-center">
                                    <div class="form-group col-3">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.rank"></FormattedMessage></label>
                                        <select
                                            id="inputState"
                                            class="form-control"
                                            value={position}
                                            onChange={(event) => this.handleOnchangeInput(event, 'position')}
                                        >
                                            {this.state.arrAllCode.positions && this.state.arrAllCode.positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>

                                                );
                                            }
                                            )}
                                        </select>
                                    </div>
                                    <div class="form-group col-3">
                                        <label for="inputAddress"><FormattedMessage id="menu.admin.role"></FormattedMessage></label>
                                        <select
                                            id="inputState"
                                            class="form-control"
                                            value={role}
                                            onChange={(event) => this.handleOnchangeInput(event, 'role')}
                                        >
                                            {this.state.arrAllCode.roles && this.state.arrAllCode.roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>

                                                );
                                            }
                                            )}
                                        </select>
                                    </div>

                                </div>

                                <div class="form-group d-flex justify-content-center">
                                    <div class="form-group image-preview-container">
                                        <label htmlFor="imagePreview"><FormattedMessage id="menu.admin.image"></FormattedMessage></label>
                                        <input onChange={(event) => this.handlePreviewImage(event)} id='imagePreview' class="form-control " type='file' hidden></input>
                                        <div className="preview-box" style={{ backgroundImage: `url(${imagePreview})` }} onClick={() => this.setState({ isOpen: true })}></div>
                                    </div>
                                </div>

                                <div class="form-group d-flex gap-3 justify-content-center mt-3 ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck" ></input>
                                        <label class="form-check-label" for="gridCheck">
                                            <FormattedMessage id="menu.admin.check-me-out"></FormattedMessage>
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        class="btn btn-primary ml-3"
                                        onClick={(event) => this.handleSubmitUser(event)}
                                    ><FormattedMessage id="menu.admin.Create"></FormattedMessage></button>
                                </div>

                            </form>

                        </div>
                        {this.state.isOpen === true &&
                            <Lightbox
                                mainSrc={imagePreview}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />}

                    </div>}
                <ManageUserTable></ManageUserTable>
                
            </React.Fragment>
        );
    }

}


let mapStateToProps = state => {
    return {
        language: state.app.language,
        allCodeData: state.admin
    };
}

let mapDispathToProps = dispatch => {
    return {
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart()),
        saveUserAction: (data) => dispatch(actions.saveUserAction(data))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(UserRedux);