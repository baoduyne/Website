import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            arrDate: [],
            dateSelected: '',
            allDoctorSchedules: [],
            allCode: []
        }
    }

    componentDidMount = async () => {
        this.setState({
            doctorId: this.props.doctorId
        })
        await this.setArrDate();
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
        }
        if (this.props.allCode && prevProps.allCode !== this.props.allCode) {
            this.setState({
                allCode: this.props.allCode
            })
        }
    }

    setArrDate = async () => {
        let arrDate = [];
        let { doctorId } = this.state;

        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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

    handleChooseSchedule = (item) => {
        console.log('item', item)
    }
    render() {
        let { arrDate, allDoctorSchedules, allCode } = this.state;
        let language = this.props.language;
        // console.log('momentVi:', moment(new Date()).locale('en').format('ddd - DD/MM'));
        // console.log('momentEn:', moment(new Date()).valueOf());
        console.log('check state', this.state);
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
                        <div className='schedule-header'><i class="fa-solid fa-calendar-day"></i> Lịch khám</div>
                        <div className='schedule-list'>
                            {
                                allDoctorSchedules.map((item, index) => {
                                    let date = item.timeType;
                                    let result = allCode.filter(item =>
                                        item.keyMap === date
                                    )
                                    if (result && result[0] && result[0].valueVi && result[0].valueEn) {
                                        return (
                                            <button
                                                onClick={() => this.handleChooseSchedule(item)}
                                                className='btn btn-light schedule-list-date'>

                                                {language === LANGUAGES.VI ? result[0].valueVi : result[0].valueEn}</button>
                                        )
                                    }
                                })
                            }
                        </div>

                        <div className='schedule-description'>Chọn và đặt lịch (Phí đặt lịch 0đ)</div>
                    </div>
                </div>

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
