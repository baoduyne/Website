import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import BookingModal from './BookingModal'
import _ from 'lodash'
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            arrDate: [],
            dateSelected: '',

            allDoctorSchedules: [],
            allCode: [],

            //modal
            scheduleData: '',
            modalIsOpen: false,
        }
    }

    componentDidMount = async () => {
        this.setState({
            doctorId: this.props.doctorId
        })
        await this.setArrDate();
        await this.getDoctorSchedule();
        await this.props.fetchAllCodeStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setArrDate();
        }
        if (this.props.doctorId && prevProps.doctorId !== this.props.doctorId) {
            this.setState({
                doctorId: this.props.doctorId
            })
            this.setArrDate();
            this.getDoctorSchedule();
        }

        // if (this.state.arrDate && this.prevState.arrDate !== this.state.arrDate) {
        //     this.getDoctorSchedule();
        // }
        if (this.props.allCode && prevProps.allCode !== this.props.allCode) {
            this.setState({
                allCode: this.props.allCode
            })
        }
    }

    capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    setArrDate = async () => {
        let arrDate = [];
        let { doctorId, modalIsOpen } = this.state;

        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                if (this.props.language === LANGUAGES.VI) {
                    let string1 = "Hôm nay ";
                    let string2 = moment(new Date()).format('- DD/MM');
                    object.label = string1 + string2;
                }
                else {
                    let string1 = "Today ";
                    let string2 = moment(new Date()).locale('en').format('- DD/MM');
                    object.label = string1 + string2;
                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                arrDate.push(object);
                continue;
            }
            if (this.props.language === LANGUAGES.VI) {
                let string = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalize(string);
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object);
        }
        this.setState({
            dateSelected: arrDate[0].value,
            arrDate: arrDate
        })
    }

    getDoctorSchedule = async () => {

        let { doctorId, arrDate } = this.state;
        if (arrDate[0] && arrDate[0].value) {

            await this.props.getDoctorSchedulesStart(doctorId, arrDate[0].value);
            if (this.props.allDoctorSchedules) {
                let copyDoctorSchedules = this.props.allDoctorSchedules;
                copyDoctorSchedules = copyDoctorSchedules.map((item, index) => {
                    item.isSelected = false;
                    return (item)
                })
                this.setState({
                    allDoctorSchedules: copyDoctorSchedules,
                })
            }
        }
    }

    handleScheduleOption = async (event) => {
        let { doctorId } = this.state;
        await this.props.getDoctorSchedulesStart(doctorId, event.target.value);
        if (this.props.allDoctorSchedules) {

            let copyDoctorSchedules = this.props.allDoctorSchedules;
            copyDoctorSchedules = copyDoctorSchedules.map((item, index) => {
                item.isSelected = false;
                return (item)
            })

            this.setState({
                allDoctorSchedules: copyDoctorSchedules,
                dateSelected: event.target.value
            });

        }

    }

    handleChooseSchedule = (data) => {
        if (data && !_.isEmpty(data)) {
            let { allDoctorSchedules } = this.state;

            allDoctorSchedules = allDoctorSchedules.map((item, index) => {
                if (item.id === data.id) {
                    item.isSelected = !item.isSelected;
                }
                return (item);
            })

            this.setState({
                allDoctorSchedules: allDoctorSchedules,
                scheduleData: data,
                modalIsOpen: !this.state.modalIsOpen
            })

        }
    }

    toggleModalFromParent = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })


        let allDoctorSchedules = this.state.allDoctorSchedules.map(item => {
            item.isSelected = false;
            return item;
        })
        this.setState({
            allDoctorSchedules: allDoctorSchedules
        })

    }


    render() {
        let { arrDate, allDoctorSchedules, allCode, modalIsOpen } = this.state;
        let language = this.props.language;
        // console.log('momentVi:', moment(new Date()).locale('en').format('ddd - DD/MM'));
        // console.log('momentEn:', moment(new Date()).valueOf());
        return (
            <React.Fragment>
                <div className='doctor-schedule-client-container'>
                    <div className='doctor-schedule-client-content'>
                        <div className='schedule-select'>
                            <select
                                className='schedule-select-box'
                                onChange={(event) => this.handleScheduleOption(event)}
                            >
                                {arrDate && arrDate.length > 0 && arrDate.map((item, index) => {
                                    // let valueDate = moment(item.label).format('ddd-DD/MM');

                                    return (
                                        <option
                                            key={index}
                                            value={item.value}
                                        >{item.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='schedule-header'><FontAwesomeIcon icon={faListUl} /> <FormattedMessage id='patient.doctor-schedule.Schedule'></FormattedMessage></div>
                        <div className='schedule-list'>
                            {

                                allDoctorSchedules && allDoctorSchedules.length > 0 ? allDoctorSchedules.map((item, index) => {
                                    let date = item.timeType;
                                    let result = allCode.filter(item =>
                                        item.keyMap === date
                                    )
                                    if (result && result[0] && result[0].valueVi && result[0].valueEn) {
                                        return (
                                            <button
                                                onClick={() => this.handleChooseSchedule(item)}
                                                className={item.isSelected === true ? 'btn btn-info schedule-list-date' : 'btn btn-light schedule-list-date'}>

                                                {language === LANGUAGES.VI ? result[0].valueVi : result[0].valueEn}</button>
                                        )
                                    }
                                }) :

                                    <div className='text-secondary'><FormattedMessage id='patient.doctor-schedule.Missing-schedule'></FormattedMessage>...</div>

                            }

                        </div>

                        <div className='schedule-description'><FormattedMessage id='patient.doctor-schedule.Choose-schedule'></FormattedMessage></div>
                    </div>
                </div>

                <BookingModal
                    modalIsOpen={this.state.modalIsOpen}
                    scheduleData={this.state.scheduleData}
                    toggleModalFromParent={this.toggleModalFromParent}
                    doctorId={this.state.doctorId}
                ></BookingModal>


            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorSchedules: state.admin.allDoctorSchedules,
        allCode: state.admin.times,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorSchedulesStart: (doctorId, date) => dispatch(actions.getDoctorSchedulesStart(doctorId, date)),
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
