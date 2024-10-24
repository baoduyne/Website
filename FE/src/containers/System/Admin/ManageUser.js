import React, { Component } from "react";
import { connect } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import LoadingPage from './LoadingPage';
import './ManageUser.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ManageUserTable from "./ManageUserTable";
import { ACTIONS } from '../../../utils/constant';
import CommonUtils from "../../../utils/CommonUtils";
class ManageUser extends Component {

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

            action: '',
            id: ''
        }
    }

    componentDidMount = async () => {
        // setTimeout(async() => {
        await this.props.fetchAllCodeStart();
        // }, 1000);



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
                objectUrl: '',
                action: ACTIONS.CREATE
            })
        }


        if (this.props.allCodeData && this.props.allCodeData.genders && (prevProps.allCodeData !== this.props.allCodeData)) {
            let genders = this.props.allCodeData.genders;
            let positions = this.props.allCodeData.positions;
            let roles = this.props.allCodeData.roles;

            this.setState({
                arrAllCode: this.props.allCodeData,
                gender: genders && genders.length > 0 && genders[0].keyMap,
                position: positions && genders.length > 0 && positions[0].keyMap,
                role: roles && roles.length > 0 && roles[0].keyMap
            })

        }


    }
    handlePreviewImage = async (event) => {

        let data = event.target.files;
        let file = data[0];

        if (file) {

            let objectUrl = URL.createObjectURL(file);
            let avtBase64 = await CommonUtils.getBase64(file);
            this.setState({
                avatar: avtBase64,
                objectUrl: objectUrl
            });
        }

    }

    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
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

    handleSubmitUser = async (event) => {


        let data = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            genderId: this.state.gender,
            positionId: this.state.position,
            roleId: this.state.role,
            avatar: this.state.avatar,
            id: this.state.id
        }

        if (this.state.action === ACTIONS.CREATE) {
            let isValid = this.checkValidate();
            if (isValid === true) {

                await this.props.saveUserAction(data);
            }
        }

        if (this.state.action === ACTIONS.EDIT) {

            await this.props.editUserStart(data);

            // setTimeout(async () => {
            //   //  await this.props.editUserStart(data);
            // }, 1000)
        }
    }

    handleEditUser = async (user) => {
        let imageBase64 = '';
        if (user.avatar) {
            imageBase64 = new Buffer(user.avatar, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: '*******',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.genderId,
            position: user.positionId,
            role: user.roleId,
            avatar: imageBase64,
            action: ACTIONS.EDIT,
            id: user.id,

            objectUrl: imageBase64,
        })

    }

    handleDeleteImage = () => {
        this.setState({ objectUrl: '' })
    }

    render() {
        let isLoading = this.props.allCodeData.isLoading;
        let language = this.props.language;
        let imagePreview = this.state.objectUrl;

        let { email, password, firstName, lastName, address
            , phoneNumber, gender, position, role, avatar, action }
            = this.state;
        return (
            <React.Fragment>
                {isLoading ? <LoadingPage></LoadingPage> :
                    <div className="user-redux-container">
                        <div className="user-redux-body">
                            <div className="user-redux-content">
                                <div className='schedule-logo'>
                                    <div
                                        className='logo'
                                        onClick={() => this.handleOnClickLogo()}
                                    ></div>
                                </div>
                                <div className="title-container">
                                    <div className="redux-title"><FormattedMessage id="menu.admin.redux-handle"></FormattedMessage></div>
                                    <div className="redux-description">Thêm sửa xóa người dùng và chỉnh sửa thông tin</div>
                                </div>


                                <div className="doctor-form">

                                    <div className="doctor-section-container">
                                        <div className='horizon-line'></div>
                                        <div className="section-content">
                                            <div className="content-left">Tài khoản</div>
                                            <div className="content-right">
                                                <div class="form-group d-flex gap-3 justify-content-center flex-column">
                                                    <div class="form-group col-12">
                                                        <label for="inputEmail4">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="inputEmail4"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                                            disabled={action === ACTIONS.EDIT ? true : false}
                                                        ></input>
                                                    </div>
                                                    <div class="form-group col-12">
                                                        <label for="inputPassword4"><FormattedMessage id="menu.admin.password"></FormattedMessage></label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="inputPassword4"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                                            disabled={action === ACTIONS.EDIT ? true : false}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="doctor-section-container">
                                        <div className='horizon-line'></div>
                                        <div className="section-content">
                                            <div className="content-left">Tên đầy đủ</div>
                                            <div className="content-right">
                                                <div class="form-group d-flex gap-3 justify-content-center">
                                                    <div class="form-group col-6">
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
                                                    <div class="form-group col-6">
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
                                            </div>
                                        </div>
                                    </div>



                                    <div className="doctor-section-container">
                                        <div className='horizon-line'></div>
                                        <div className="section-content">
                                            <div className="content-left">Vị trí</div>
                                            <div className="content-right">
                                                <div class="form-group d-flex justify-content-center">
                                                    <div class="form-group col-12">
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
                                            </div>
                                        </div>
                                    </div>



                                    <div className="doctor-section-container">
                                        <div className='horizon-line'></div>
                                        <div className="section-content">
                                            <div className="content-left">Thông tin bổ sung</div>
                                            <div className="content-right">
                                                <div class="form-group d-flex gap-3 justify-content-center">
                                                    <div class="form-group col-6">
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
                                                    <div class="form-group col-6">
                                                        <label for="inputAddress"><FormattedMessage id="menu.admin.gender"></FormattedMessage></label>
                                                        <select
                                                            id="inputState"
                                                            class="form-control"
                                                            onChange={(event) => this.handleOnchangeInput(event, 'gender')}
                                                            value={gender}
                                                        >

                                                            {this.state.arrAllCode.genders && this.state.arrAllCode.genders.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.keyMap}>
                                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                    </option>
                                                                );
                                                            }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="doctor-section-container">
                                        <div className='horizon-line'></div>
                                        <div className="section-content">
                                            <div className="content-left">Vai trò</div>
                                            <div className="content-right">
                                                <div class="form-group d-flex gap-3 justify-content-center">
                                                    <div class="form-group col-6">
                                                        <label for="inputAddress"><FormattedMessage id="menu.admin.rank"></FormattedMessage></label>
                                                        <select
                                                            id="inputState"
                                                            class="form-control"
                                                            onChange={(event) => this.handleOnchangeInput(event, 'position')}
                                                            value={position}

                                                        >
                                                            {this.state.arrAllCode.positions && this.state.arrAllCode.positions.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.keyMap}>
                                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                    </option>

                                                                );
                                                            }
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-6">
                                                        <label for="inputAddress"><FormattedMessage id="menu.admin.role"></FormattedMessage></label>
                                                        <select
                                                            id="inputState"
                                                            class="form-control"
                                                            onChange={(event) => this.handleOnchangeInput(event, 'role')}
                                                            value={role}
                                                        >
                                                            {this.state.arrAllCode.roles && this.state.arrAllCode.roles.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.keyMap}>
                                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                                    </option>

                                                                );
                                                            }
                                                            )}
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="doctor-section-container">
                                        <div className='horizon-line'></div>
                                        <div className="section-content">
                                            <div className="content-left">Tài khoản</div>
                                            <div className="content-right">
                                                {/* <label
                                            htmlFor="imagePreview"><FormattedMessage id="menu.admin.image"></FormattedMessage></label> */}
                                                <div className='image-content'>
                                                    <div
                                                        className="preview-box"
                                                        style={{ backgroundImage: `url(${this.state.objectUrl})` }}
                                                        onClick={() => this.setState({ isOpen: true })}>
                                                    </div>
                                                    <div className='image-group-button'>
                                                        <label htmlFor='imagePreview' className='preview-button add-image btn btn-primary'>
                                                            Thêm ảnh
                                                            <input
                                                                onChange={(event) => this.handlePreviewImage(event)}
                                                                id='imagePreview'
                                                                type='file'
                                                                hidden
                                                            ></input>
                                                        </label>

                                                        <button
                                                            onClick={() => this.handleDeleteImage()}
                                                            className='preview-button add-image btn btn-light'>
                                                            Xóa ảnh
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="doctor-section-container">
                                        <div className='horizon-line'></div>
                                        <div className="section-content">
                                            <div class="form-group d-flex gap-3 align-items-center w-100 d-flex flex-row-reverse mt-5 ">
                                                <div>
                                                    <button
                                                        type="submit"
                                                        class={this.state.action === ACTIONS.CREATE ? "btn btn-primary ml-3" : "btn btn-success ml-3"}
                                                        onClick={(event) => this.handleSubmitUser(event)}
                                                    ><FormattedMessage
                                                        id={this.state.action === ACTIONS.CREATE ? "menu.admin.Create" : 'menu.admin.Edit'}></FormattedMessage></button>
                                                </div>
                                                {
                                                    this.state.action === ACTIONS.CREATE ?
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" id="gridCheck" ></input>
                                                            <label class="form-check-label" for="gridCheck">
                                                                <FormattedMessage id="menu.admin.check-me-out"></FormattedMessage>
                                                            </label>
                                                        </div> : ""
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {this.state.isOpen === true &&
                            <Lightbox
                                mainSrc={imagePreview}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />}

                    </div>}

                <ManageUserTable
                    handleEditUser={this.handleEditUser}
                ></ManageUserTable>

            </React.Fragment >
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
        saveUserAction: (data) => dispatch(actions.saveUserAction(data)),
        editUserStart: (user) => dispatch(actions.editUserStart(user))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(ManageUser);



/*Net work :
- packet + IP = IP datagram
- IP + MAC = ARP






*/
//0 - 126   16 mili
//128 - 191 64 thousand
//192 - 224  254
//224 - 239
//240 - 255