import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import './DoctorSchedule.scss';
import DatePicker from "../../../components/Input/DatePicker";
import moment, { lang } from 'moment';

class Doctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDoctors: [''],
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
            this.setState({
                allSchedules: this.props.allSchedules
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
        console.log('check state', this.state.currentDate)
    }

    render() {
        let { selectedOption, allSchedules } = this.state;
        let { language } = this.props;
        console.log('check state', this.state.allSchedules)
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

                            {allSchedules && allSchedules.length > 0 && allSchedules.map((item, index) => {
                                { console.log('tes', language) }
                                return (
                                    <button
                                        className='btn btn-light date-button'
                                    > {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>)
                            })}
                        </div>
                        <div className='content-down'>
                            <button className='btn btn-primary'>Lưu thông tin</button>
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
