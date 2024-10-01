import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import './DoctorSchedule.scss';
import DatePicker from "../../../components/Input/DatePicker";
class Doctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDoctors: [''],
            selectedOption: null,

        }
    }
    componentDidMount() {
        this.props.getAllDoctorsStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allDoctors && (prevProps.allDoctors !== this.props.allDoctors)) {
            let data = this.builtDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: data
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
    handleOnchangeDatePicker = () => {

    }

    render() {
        let { selectedOption } = this.state;
        return (
            <React.Fragment>

                <div className='doctor-schedule-container'>
                    <div className='doctor-schedule-content'>
                        <div className='content-up'>
                            <div className='select-container'>
                                <label for='select'>Chọn bác sĩ</label>
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
                                ></DatePicker>
                            </div>

                            <div className='content-down'></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.user.isLoggedIn,
        data: state.user,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsStart: () => dispatch(actions.getAllDoctorsStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
