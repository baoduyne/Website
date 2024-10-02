import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, dateFormat } from '../../../utils/constant';
import Select from 'react-select';
import './DoctorSchedule.scss';
import DatePicker from "../../../components/Input/DatePicker";
import moment, { lang } from 'moment';
import _ from 'lodash';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormattedDate } from 'react-intl';


class Doctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDoctors: [],
            selectedOption: null,
            currentDate: new Date(),
            allSchedules: [],

        }
    }
    componentDidMount() {
        this.props.getAllDoctorsStart();
        this.props.getScheduleStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allDoctors && (prevProps.allDoctors !== this.props.allDoctors)) {
            let data = this.builtDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: data
            })
        }
        if (this.props.allSchedules && (prevProps.allSchedules !== this.props.allSchedules)) {

            // let { allSchedules } = this.props;
            let data = this.props.allSchedules;
            data = data.map((item, index) => {
                item.isSelected = false;
                return item;
            })
            this.setState({
                allSchedules: data
            })
        }
    }

    builtDataInputSelect(inputData) {
        let result = [];
        if (inputData) {
            inputData.map((item, index) => {
                let object = {};
                let valueVi = item.firstName + " " + item.lastName;
                let valueEn = item.lastName + " " + item.firstName;

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
            })
        }
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })

    }

    handleOnClickSchedule = (data) => {
        let { allSchedules } = this.state;
        if (allSchedules && allSchedules.length > 0) {

            allSchedules = allSchedules.map(item => {
                if (item.id === data.id) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
        }

        this.setState({
            allSchedules: allSchedules
        })


    }

    handleSaveInfomation = () => {
        let { selectedOption, currentDate, allSchedules } = this.state;
        if (!selectedOption) {
            toast(' Invalid doctor!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        }
        else if (!currentDate) {
            toast('Invalid date!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        }
        else {
            let selectedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
            let saveDate = [];
            if (allSchedules && allSchedules.length > 0) {
                saveDate = allSchedules.filter(item => item.isSelected === true);
            }
            let result = []
            if (saveDate && saveDate.length > 0) {
                saveDate.map(item => {
                    let object = {};
                    object.keyMap = item.keyMap;
                    object.doctorId = selectedOption.value;
                    object.date = selectedDate;
                    result.push(object)
                })
            }
            toast.success('Saved complete!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            console.log('check result', result)
        }



    }

    render() {
        let { selectedOption, allSchedules } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>

                <div className='doctor-schedule-container'>
                    <div className='doctor-schedule-content'>
                        <div className='content-up'>
                            <div className='select-container'>
                                <label for='select'>Chọn bác sĩ </label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.allDoctors}
                                    id='select'
                                />
                            </div>
                            <div className='select-date'>
                                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                                <label for="datepicker">Chọn ngày</label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    id='datepicker'
                                    value={this.state.currentDate[0]}
                                    minDate={new Date()}
                                ></DatePicker>
                            </div>
                        </div>
                        <div className='content-center'>
                            <div className='content-title'>Chọn lịch hẹn</div>
                            <div className='schedule-content'>
                                {allSchedules && allSchedules.length > 0 && allSchedules.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn btn-info date-button' : 'btn btn-light date-button'}
                                            onClick={() => this.handleOnClickSchedule(item)}
                                        > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>)
                                })}
                            </div>
                        </div>
                        <div className='content-down'>
                            <button
                                onClick={() => this.handleSaveInfomation()}
                                className='btn btn-primary'>Lưu thông tin</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        data: state.user,
        allDoctors: state.admin.allDoctors,
        allSchedules: state.admin.allSchedules
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsStart: () => dispatch(actions.getAllDoctorsStart()),
        getScheduleStart: () => dispatch(actions.getScheduleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
