import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, YesNoObj, dateFormat } from '../../../utils/constant';
import Select from 'react-select';
import './ManagePatient.scss';
import DatePicker from "../../../components/Input/DatePicker";
import moment, { lang } from 'moment';
import _ from 'lodash';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import SendMailModal from './SendMailModal';

// import Button from '@mui/material/Button';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {

            allDoctors: '',
            selectedDoctor: '',

            currentDate: moment(new Date()).startOf('day').valueOf(),

            isShowSupportTable: false,
            isOpenModal: false,

            allBooking: '',
            bookingList: '',
            supportBookingList: '',

            selectedBooking: '',

        }
    }
    componentDidMount = async () => {

        await this.props.getBookingStart(this.props.userInfo.id, this.state.currentDate);
        if (this.props.userInfo.roleId === 'R1') {
            await this.props.getAllDoctorsStart();
        }
        else if (this.props.userInfo.roleId === 'R2') {
            this.setState({
                selectedDoctor: { value: this.props.userInfo.id, label: this.props.userInfo.id + ' - ' + this.props.userInfo.firstName + ' ' + this.props.userInfo.lastName }
            }, async () => await this.props.getBookingStart(this.state.selectedDoctor.value, 'ALL'))
        }

    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.allDoctors !== prevProps.allDoctors && this.props.allDoctors) {
            let allDoctors = this.builtDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: allDoctors
            })
        }

        if (this.props.allBooking !== prevProps.allBooking && this.props.allBooking) {
            let supportBookingList = [];
            let bookingList = [];
            this.props.allBooking.map(item => {
                if (item.supportFirstName && item.supportLastName && item.supportPhoneNumber) {
                    supportBookingList.push(item);
                }
                else {
                    bookingList.push(item);
                }
            })

            this.setState({
                allBooking: this.props.allBooking,
                bookingList: bookingList,
                supportBookingList: supportBookingList
            })
        }

    }

    builtDataInputSelect(inputData) {
        let result = [];
        if (inputData) {
            inputData.map((item, index) => {
                let object = {};
                let valueVi = item.id + " - " + item.firstName + " " + item.lastName;
                let valueEn = item.id + " - " + item.lastName + " " + item.firstName;

                object.value = item.id;
                object.label = this.props.language === LANGUAGES.VI ? valueVi : valueEn;

                result.push(object)
            })
        }

        return result;
    }

    handleChange = (selectedOption) => {

        if (selectedOption && selectedOption.value) {
            this.setState({
                selectedOption: selectedOption,
                currentDate: 'ALL'
            })
        }
    }

    handleOnchangeInput = async (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event;
        this.setState({
            ...copyState
        }, async () => {
            await this.props.getBookingStart(this.state.selectedDoctor.value, 'ALL');
        })

    }

    handleOnchangeDatePicker = async (date) => {
        if (date === 'ALL') {
            await this.props.getBookingStart(this.state.selectedDoctor.value, 'ALL');
        }
        else {
            if (date && date.length > 0) {
                this.setState({
                    currentDate: date[0]
                }, async () => {
                    let formattedDate = new Date(this.state.currentDate).getTime();
                    await this.props.getBookingStart(this.state.selectedDoctor.value, formattedDate);
                })
            }
        }


    }


    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }

    handleSwiftTable = (type) => {
        if (type === YesNoObj.YES) {
            this.setState({
                isShowSupportTable: true
            })
        }
        else {
            this.setState({
                isShowSupportTable: false
            })
        }
    }

    onCloseModalFromParent = (event) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            selectedBooking: event
        })
    }


    render() {
        let { selectedOption, allSchedules, allBooking, bookingList, supportBookingList, isShowSupportTable } = this.state;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className='manage-patient-container'>
                    <div className='manage-patient-content'>
                        <div
                            onClick={() => this.handleOnClickLogo()}
                            className='Patient-logo'>
                            <div className='logo'></div>
                        </div>

                        <div className='title-container'>
                            <div className='Patient-title'>Quản lý bệnh nhân</div>
                            <div className='Patient-description'>Duyệt lịch khám hoặc xóa lịch bệnh nhân thông qua hệ thống</div>
                        </div>



                        <div className='Patient-form'>
                            <div className='horizon-line'></div>
                            <div className="Patient-section-container">

                                <div className="section-content">
                                    <div className='time-container'>
                                        {this.props.userInfo && this.props.userInfo.roleId === 'R1' ?

                                            <Select
                                                value={this.state.selectedDoctor}
                                                onChange={(event) => this.handleOnchangeInput(event, 'selectedDoctor')}
                                                options={this.state.allDoctors}
                                                id='select'
                                                className='w-50'
                                                placeholder='Chọn bác sĩ'
                                            />

                                            : <Select
                                                value={this.state.selectedDoctor}
                                                onChange={(event) => this.handleOnchangeInput(event, 'selectedDoctor')}
                                                options={this.state.allDoctors}
                                                id='select'
                                                className='w-25'
                                                hidden
                                            />}


                                        <div className='date-picker-content'>
                                            <DatePicker
                                                onChange={this.handleOnchangeDatePicker}
                                                className='form-control date-picker-child'
                                                id='datepicker'
                                                value={this.state.currentDate}
                                            // minDate={new Date(Date.now() - 86400000)}
                                            ></DatePicker>
                                            <span className='date-picker-detail'>Chọn ngày hiển thị các đơn thăm khám bệnh hoặc
                                                <span
                                                    onClick={() => this.handleOnchangeDatePicker('ALL')}
                                                    className='date-picker-detail-all'> hiển thị toàn bộ đơn khám</span></span>
                                        </div>



                                    </div>
                                </div>
                            </div>

                            <div className="Patient-section-container">
                                <div className="section-content">
                                    <div className='table-options-container'>
                                        <span className={isShowSupportTable === false ? 'changeBtn' : 'changeBtn changeBtnSecond'} onClick={() => this.handleSwiftTable(YesNoObj.NO)}>Người dùng tự đặt ({bookingList.length}/{allBooking.length})</span>
                                        <span className={isShowSupportTable === true ? 'changeBtn' : 'changeBtn changeBtnSecond'} onClick={() => this.handleSwiftTable(YesNoObj.YES)}>Người dùng đặt hộ ({supportBookingList.length}/{allBooking.length})</span>
                                    </div>
                                </div>

                            </div>

                            <div className="Patient-section-container">
                                <div className="section-content">
                                    {this.state.isShowSupportTable === false ?
                                        <table class="table">
                                            <caption>List of patients</caption>
                                            <thead>
                                                <tr>
                                                    <th scope='col' className="set-width-note ele0">STT</th>
                                                    <th scope='col' className="set-width-note ele1 ">Họ và Tên</th>
                                                    <th scope='col' className="set-width-note ele2 ">Email</th>
                                                    <th scope='col' className="set-width-note ele3 ">Số điện thoại</th>
                                                    <th scope='col' className="set-width-note ele1 ">Địa chỉ</th>
                                                    <th scope='col' className="set-width-note ele4 ">Thời gian khám</th>
                                                    <th scope='col' className='set-width-note ele5'>Lý do khám</th>
                                                    <th scope="col" className='set-width-note ele6'>Gửi hóa đơn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookingList && bookingList.length > 0 ? bookingList.map((item, index) => {

                                                    let formattedDateVi = moment.unix(item.date / 1000).format('dddd - DD/MM/YYYY');
                                                    let formattedDateEn = moment.unix(item.date / 1000).locale('en').format('dddd - DD/MM/YYYY');
                                                    return (
                                                        <tr className='adjust-table-row'>
                                                            <th scope="row">{index}</th>
                                                            <td>{item.patientData.firstName + " " + item.patientData.lastName}</td>
                                                            <td>{item.patientData.email}</td>
                                                            <td>{item.patientData.phoneNumber}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{item.timeData && item.timeData.valueVi && item.timeData.valueEn && this.props.language === LANGUAGES.VI ? formattedDateVi + " | " + item.timeData.valueVi : formattedDateEn + " | " + item.timeData.valueEn}</td>
                                                            <td>{item.note}</td>
                                                            <td>
                                                                <div className='table-group-btn'>
                                                                    <button
                                                                        onClick={() => this.onCloseModalFromParent(item)}
                                                                        className='btn btn-primary'><FontAwesomeIcon icon={faPaperPlane} /></button>
                                                                    <button className='btn btn-light'><FontAwesomeIcon icon={faTrash} /></button>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <div className='no-data-content'>No data...</div>}


                                            </tbody>
                                        </table>
                                        :
                                        <table className="table w-100">
                                            <caption>List of patients</caption>
                                            <thead className='w-100'>
                                                <tr className='adjust-table-row w-100'>
                                                    <th scope="col " className='set-width-note-1 ele0'>STT</th>
                                                    <th scope="col " className='set-width-note-1 ele1'>Tên người bảo hộ</th>
                                                    <th scope="col " className='set-width-note-1 ele1'>Sdt người bảo hộ</th>
                                                    <th scope="col " className='set-width-note-1 ele1'>Tên bệnh nhân</th>
                                                    <th scope="col " className='set-width-note-1 ele2' >Năm sinh</th>
                                                    {/* <th scope="col ">Địa chỉ</th> */}
                                                    <th scope="col " className='set-width-note-1 ele3'>Số điện thoại</th>
                                                    <th scope="col " className='set-width-note-1 ele4'>Thời gian khám</th>
                                                    <th scope="col " className="set-width-note-1 ele5">Lý do khám</th>
                                                    <th scope="col " className="set-width-note-1 ele6">Gửi hóa đơn</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {supportBookingList && supportBookingList.length > 0 ? supportBookingList.map((item, index) => {
                                                    let formattedDateVi = moment.unix(item.date / 1000).format('dddd - DD/MM/YYYY');
                                                    let formattedDateEn = moment.unix(item.date / 1000).locale('en').format('dddd - DD/MM/YYYY');
                                                    return (
                                                        <tr className='adjust-table-row'>
                                                            <th scope="row">{index}</th>
                                                            <td>{item.patientData.firstName + " " + item.patientData.lastName}</td>
                                                            <td>{item.patientData.phoneNumber}</td>
                                                            <td>{item.supportFirstName + ' ' + item.supportLastName}</td>
                                                            <td>{item.supportBirthDay}</td>
                                                            {/* <td>{item.patientData.address}</td> */}
                                                            <td

                                                            >{item.supportPhoneNumber}</td>
                                                            <td

                                                            >{item.timeData && item.timeData.valueVi && item.timeData.valueEn && this.props.language === LANGUAGES.VI ? formattedDateVi + " | " + item.timeData.valueVi : formattedDateEn + " | " + item.timeData.valueEn}</td>
                                                            <td class='set-width-note'>{item.note}</td>
                                                            <td>
                                                                <div className='table-group-btn table2'>
                                                                    <button
                                                                        onClick={() => this.onCloseModalFromParent(item)}
                                                                        className='btn btn-primary'><FontAwesomeIcon icon={faPaperPlane} /></button>
                                                                    <button className='btn btn-light'><FontAwesomeIcon icon={faTrash} /></button>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                    :

                                                    <div className='no-data-content'>No data...</div>


                                                }


                                            </tbody>
                                        </table>

                                    }

                                </div>

                            </div>


                        </div>



                    </div>
                </div>
                <SendMailModal
                    onCloseModalFromParent={this.onCloseModalFromParent}
                    isOpenModal={this.state.isOpenModal}
                    bookingData={this.state.selectedBooking}
                ></SendMailModal>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        allDoctors: state.admin.allDoctors,
        allBooking: state.admin.allBooking
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookingStart: (doctorId, time) => dispatch(actions.getBookingStart(doctorId, time)),
        getAllDoctorsStart: () => dispatch(actions.getAllDoctorsStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));
