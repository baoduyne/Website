import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { GENDERS, LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './BookingModal.scss';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import DoctorDetailTag from './DoctorDetailTag.js';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { createBooking } from '../../../services/userService.js';
import _ from 'lodash';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import { locale } from 'moment';
import { emitter } from '../../../utils/emitter';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supportBookingIsShow: false,

            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            gender: '',
            birthDay: '',

            supportFirstName: '',
            supportLastName: '',
            supportPhoneNumber: '',
            supportGender: '',
            supportBirthDay: '',

            reasonBooking: '',

            selectDoctor: '',

            scheduleData: '',
            doctorId: '',


        }
    }

    componentDidMount = async () => {
        this.setState({
            scheduleData: this.props.scheduleData,
            doctorId: this.props.doctorId
        }
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectDoctor && (prevProps.selectDoctor !== this.props.selectDoctor)) {
            this.setState({ selectDoctor: this.props.selectDoctor })
        }

        if (this.props.scheduleData && this.props.scheduleData !== prevProps.scheduleData) {
            this.setState({ scheduleData: this.props.scheduleData })
        }
        if (this.props.doctorId && this.props.doctorId !== prevProps.doctorId) {
            this.setState({ doctorId: this.props.doctorId })
        }
    }



    handleOnClickSupportBooking = (type) => {
        if (type === 'ON') {
            this.setState({
                supportBookingIsShow: true
            })
        }

        if (type === 'OFF') {
            this.setState({
                supportBookingIsShow: false
            })
        }

    }

    handleOnchangeInput = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleOnchangeCheckBox = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }

    checkValidateInput = () => {
        let result = true;

        if (!this.state.firstName) {
            result = false;
            toast(' Invalid first name!');
            return result;
        }

        if (!this.state.lastName) {
            result = false;
            toast(' Invalid last name!');
            return result;
        }

        if (!this.state.gender) {
            result = false;
            toast(' Invalid gender!');
            return result;
        }

        if (!this.state.phoneNumber) {
            result = false;
            toast(' Invalid phone number!');
            return result;
        }

        if (!this.state.email) {
            result = false;
            toast(' Invalid email!');
            return result;
        }

        if (!this.state.address) {
            result = false;
            toast(' Invalid address!');
            return result;
        }

        if (!this.state.birthDay) {
            result = false;
            toast(' Invalid birthyear!');
            return result;
        }

        if (!this.state.reasonBooking) {
            result = false;
            toast(' Invalid reason to booking!');
            return result;
        }

        if (this.state.supportBookingIsShow === true) {
            if (!this.state.supportFirstName) {
                result = false;
                toast(' Invalid patient first name!');
                return result;
            }

            if (!this.state.supportLastName) {
                result = false;
                toast(' Invalid support last name!');
                return result;
            }

            if (!this.state.email) {
                result = false;
                toast(' Invalid support email!');
                return result;
            }

            if (!this.state.supportPhoneNumber) {
                result = false;
                toast(' Invalid phone number!');
                return result;
            }

            if (!this.state.supportGender) {
                result = false;
                toast(' Invalid support gender!');
                return result;
            }

            if (!this.state.supportBirthDay) {
                result = false;
                toast(' Invalid support gender!');
                return result;
            }

        }
        return result;
    }

    buildTimeBooking = () => {
        let allCode = this.props.allCodes;
        let scheduleData = this.props.scheduleData;
        let priceData = '';
        let bookingDate = '';
        let bookingTime = '';
        let time = '';
        let price = '';
        console.log('test 0', this.props.doctorInfors);
        if (this.props.scheduleData && !_.isEmpty(this.props.scheduleData) && !_.isEmpty(this.props.doctorInfors)) {
            console.log('test 1');
            priceData = this.props.doctorInfors.priceData;
            allCode.map(item => {
                if (item.keyMap === this.props.scheduleData.timeType) {
                    bookingDate = item;
                }
            })
            if (this.props.language === LANGUAGES.VI) {
                bookingDate = bookingDate.valueVi;
                bookingTime = moment.unix(scheduleData.date / 1000).format('dddd - DD/MM/YYYY');
                price = <NumericFormat displayType='text' value={priceData.valueVi} allowLeadingZeros thousandSeparator="," suffix=' VNĐ' />;
            }
            else {
                bookingDate = bookingDate.valueEn;
                bookingTime = moment.unix(scheduleData.date / 1000).locale('en').format('ddd - DD/MM/YYYY');
                price = priceData.valueEn + "$";
            }
            console.log('test 2');
            return `${bookingTime} | ${bookingDate}`;
        }

        return ``;
    }

    handleSubbmitPatient = async () => {

        let checkValid = this.checkValidateInput();

        if (checkValid === true) {

            let fullTime = this.buildTimeBooking();
            let doctorName = ''
            if (this.props.language === LANGUAGES.VI) {
                doctorName = `${this.state.selectDoctor.firstName}  ${this.state.selectDoctor.lastName}`
            }
            else {
                doctorName = `${this.state.selectDoctor.lastName}  ${this.state.selectDoctor.firstName}`
            }


            let data = {
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                genderId: this.state.gender,
                doctorId: this.state.doctorId,
                date: this.state.scheduleData.date,
                timeType: this.state.scheduleData.timeType,
                note: this.state.reasonBooking,

                language: this.props.language,
                fullTime: fullTime,
                doctorName: doctorName

            }

            if (this.state.supportBookingIsShow === true) {
                data.supportFirstName = this.state.supportFirstName;
                data.supportLastName = this.state.supportLastName;
                data.supportBirthDay = this.state.supportBirthDay;
                data.supportPhoneNumber = this.state.supportPhoneNumber;
                data.supportGender = this.state.supportGender;
            }

            await this.props.createBookingStart(data);

            this.componentDidMount();

        }
        else {

        }


    }

    render() {
        console.log('check modal render', this.state)
        let {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            gender,
            birthDay,

            supportFirstName,
            supportLastName,
            supportPhoneNumber,
            supportBirthDay,
            supportGender,

            reasonBooking,

        } = this.state;


        return (
            <React.Fragment>
                <Modal open={this.props.modalIsOpen} onClose={this.props.toggleModalFromParent}>
                    <div className='booking-modal-container'>
                        <div className='booking-modal-content'>

                            <div className='schedule-logo'>
                                <div
                                    className='logo'
                                    onClick={() => this.handleOnClickLogo()}
                                ></div>
                            </div>
                            <div className="title-container">
                                <div className="redux-title">Đặt lịch khám</div>
                                <div className="redux-description">Điền thông tin khám bệnh cho bạn hoặc người thân</div>
                            </div>

                            <div className="doctor-form">


                                <div className="doctor-section-container">
                                    <div className='horizon-line'></div>
                                    <DoctorDetailTag
                                        doctorId={this.state.doctorId}
                                        doctorDescriptionIsShow={false}
                                        scheduleData={this.state.scheduleData}
                                    ></DoctorDetailTag>
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

                                            <div class="form-group d-flex gap-3" >
                                                <div class="form-group d-flex gap-3 col-6 flex-column">
                                                    <label className='mt-1' for='123'>Giới tính</label>
                                                    <div class="form-group d-flex gap-3 col-12 pl-0 pr-0">
                                                        <div class="form-group col-3">
                                                            <input
                                                                class="form-check-input"
                                                                type="radio"
                                                                name="flexRadioDefault4"
                                                                id="flexRadioDefault5"
                                                                value={GENDERS.MALE}
                                                                onClick={(event) => this.handleOnchangeCheckBox(event, 'gender')}
                                                            ></input>
                                                            <label class="form-check-label" for="flexRadioDefault5">
                                                                Nam
                                                            </label>
                                                        </div>

                                                        <div class='from-group col-3'>
                                                            <input
                                                                class="form-check-input"
                                                                type="radio"
                                                                name="flexRadioDefault4"
                                                                id="flexRadioDefault6"
                                                                value={GENDERS.FEMALE}
                                                                onClick={(event) => this.handleOnchangeCheckBox(event, 'gender')}
                                                            ></input>
                                                            <label class="form-check-label" for="flexRadioDefault6">
                                                                Nữ
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group d-flex gap-3 col-6 flex-column">
                                                    <label class='' for='inputBirthDay'>Năm sinh</label>
                                                    <div class="form-group d-flex gap-3 col-12 pl-0 pr-0">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            id="inputBirthDay"
                                                            placeholder="Năm sinh"
                                                            value={birthDay}
                                                            onChange={(event) => this.handleOnchangeInput(event, 'birthDay')}
                                                        ></input>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="doctor-section-container">
                                    <div className='horizon-line'></div>
                                    <div className="section-content">
                                        <div className="content-left">Thông tin liên hệ</div>
                                        <div className="content-right">
                                            <div class="form-group d-flex gap-3 justify-content-center flex-column">

                                                <div class="form-group col-12">
                                                    <label for="inputEmail4">Email</label>
                                                    <input
                                                        className='form-control'
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                                    ></input>
                                                </div>

                                                <div class="form-group col-12">
                                                    <label for="inputEmail4">Số điện thoại</label>
                                                    <input
                                                        className='form-control'
                                                        placeholder="Số điện thoại"
                                                        value={phoneNumber}
                                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
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
                                                    <textarea
                                                        type="text"
                                                        class="form-control"
                                                        id="inputAddress"
                                                        placeholder="1234 Main St"
                                                        value={address}
                                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                                        rows="3"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="doctor-section-container">
                                    <div className='horizon-line'></div>
                                    <div className="section-content">
                                        <div className="content-left">Đặt cho ai ?</div>
                                        <div className="content-right">
                                            <div class="form-group d-flex justify-content-center">
                                                <div class="form-group col-12 d-flex flex-column">
                                                    <div className='form-check type-book'>
                                                        <input
                                                            class="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault1"
                                                            onClick={() => this.handleOnClickSupportBooking('OFF')}
                                                        ></input>
                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                            Đặt cho mình
                                                        </label>
                                                    </div>

                                                    <div className='form-check type-book'>
                                                        <input
                                                            class="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault2"
                                                            onClick={() => this.handleOnClickSupportBooking('ON')}

                                                        ></input>
                                                        <label class="form-check-label" for="flexRadioDefault2">
                                                            Đặt cho người thân
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SubModal will be displayed depend on state... */}
                                <div className={this.state.supportBookingIsShow === true ? "doctor-section-container" : "doctor-section-container support-booking-display-none"}>
                                    <div className='horizon-line'></div>
                                    <div className="section-content">
                                        <div className="content-left">Thông tin bệnh nhân</div>
                                        <div className="content-right">
                                            <div class="form-group d-flex justify-content-center">
                                                <div class="form-group col-12 d-flex flex-column">
                                                    <div class="form-group d-flex gap-3 justify-content-center">
                                                        <div class="form-group col-6">
                                                            <label for="inputAddress">Họ bệnh nhân</label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="inputAddress"
                                                                placeholder="First Name"
                                                                value={supportFirstName}
                                                                onChange={(event) => this.handleOnchangeInput(event, 'supportFirstName')}
                                                            ></input>
                                                        </div>
                                                        <div class="form-group col-6">
                                                            <label for="inputAddress">Tên Bệnh Nhân</label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="inputAddress"
                                                                placeholder="Last Name"
                                                                value={supportLastName}
                                                                onChange={(event) => this.handleOnchangeInput(event, 'supportLastName')}
                                                            ></input>
                                                        </div>
                                                    </div>

                                                    <div class="form-group d-flex gap-3 justify-content-center">
                                                        <div class="form-group col-12">
                                                            <label for="inputEmail4">Số điện thoại bệnh nhân</label>
                                                            <input
                                                                className='form-control'
                                                                placeholder="Số điện thoại"
                                                                value={supportPhoneNumber}
                                                                onChange={(event) => this.handleOnchangeInput(event, 'supportPhoneNumber')}
                                                            ></input>
                                                        </div>
                                                    </div>

                                                    <div class="form-group d-flex gap-3" >
                                                        <div class="form-group d-flex gap-3 col-6 flex-column">
                                                            <label className='mt-1' for='123'>Giới tính bệnh nhân</label>
                                                            <div class="form-group d-flex gap-3 col-12 pl-0">
                                                                <div class="form-group col-3">
                                                                    <input
                                                                        class="form-check-input"
                                                                        type="radio"
                                                                        name="flexRadioDefault3"
                                                                        id="flexRadioDefault3"
                                                                        value={GENDERS.MALE}
                                                                        onClick={(event) => this.handleOnchangeCheckBox(event, 'supportGender')}
                                                                    ></input>
                                                                    <label class="form-check-label" for="flexRadioDefault3">
                                                                        Nam
                                                                    </label>
                                                                </div>

                                                                <div class='from-group col-3'>
                                                                    <input
                                                                        class="form-check-input"
                                                                        type="radio"
                                                                        name="flexRadioDefault3"
                                                                        id="flexRadioDefault4"
                                                                        value={GENDERS.FEMALE}
                                                                        onClick={(event) => this.handleOnchangeCheckBox(event, 'supportGender')}
                                                                    ></input>
                                                                    <label class="form-check-label" for="flexRadioDefault4">
                                                                        Nữ
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group d-flex gap-3 col-6 flex-column">
                                                            <label class='' for='inputBirthDay'>Năm sinh bệnh nhân</label>
                                                            <div class="form-group d-flex gap-3 col-12 pl-0 pr-0">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    id="inputBirthDay"
                                                                    placeholder="Năm sinh"
                                                                    value={supportBirthDay}
                                                                    onChange={(event) => this.handleOnchangeInput(event, 'supportBirthDay')}
                                                                ></input>
                                                            </div>
                                                        </div>

                                                    </div>
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
                                            <div class="form-group d-flex gap-3 justify-content-center flex-column">
                                                <div class="form-group col-12">
                                                    <label for="inputAddress">Lý do khám bệnh</label>
                                                    <textarea
                                                        type="text"
                                                        class="form-control"
                                                        id="inputAddress"
                                                        placeholder="......."
                                                        value={reasonBooking}
                                                        onChange={(event) => this.handleOnchangeInput(event, 'reasonBooking')}
                                                        rows="3"
                                                    ></textarea>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="doctor-section-container">
                                    <div className='horizon-line'></div>
                                    <div className='doctor-sectioc-description margin-up'>
                                        <p><strong>LƯU Ý</strong></p>
                                        <p>Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:</p>
                                        <ul>
                                            <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: <strong>Trần Văn Phú</strong></li>
                                            <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn &quot;Xác nhận&quot;</li>
                                            <li>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="doctor-section-container">
                                    <button
                                        onClick={() => this.handleSubbmitPatient()}
                                        className='col-12 button-submit'>Xác nhận đặt lịch khám</button>
                                    <p className='booking-description-policy'>Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với <span className='right-policy'>Điều khoản sử dụng dịch vụ</span> của chúng tôi.</p>
                                </div>




                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCodes: state.admin.times,
        doctorInfors: state.admin.doctorInfors,
        selectDoctor: state.admin.selectDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createBookingStart: (data) => dispatch(actions.createBookingStart(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingModal));
