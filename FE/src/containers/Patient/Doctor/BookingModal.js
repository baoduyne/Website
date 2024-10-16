import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './BookingModal.scss';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import DoctorDetailTag from './DoctorDetailTag.js';

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

            supportFirstName: '',
            supportLastName: '',
            supportPhoneNumber: '',

            reasonBooking: '',

        }
    }

    componentDidMount = async () => {

    }

    componentDidUpdate(prevProps, prevState) {

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

    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }

    render() {

        let {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            supportFirstName,
            supportLastName,
            supportPhoneNumber,
            reasonBooking
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
                                        doctorId={this.props.id}
                                        doctorDescriptionIsShow={false}
                                        scheduleData={this.props.scheduleData}
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
                                    <button className='col-12 button-submit'>Xác nhận đặt lịch khám</button>
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
        allCodes: state.admin.times
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingModal));
