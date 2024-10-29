import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './DoctorDetailTag.scss';
import _ from 'lodash';
import moment from 'moment';
import { locale } from 'moment';
import { NumericFormat } from 'react-number-format';
class DoctorDetailTag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',

            firstName: '',
            lastName: '',
            address: '',
            avatar: '',
            phoneNumber: '',
            positionVi: '',
            positionEn: '',
            description: '',

            doctorDescriptionIsShow: true,
            bookingPrice: '',
            bookingPayment: '',

            scheduleData: '',
            doctorInfors: '',

            hasOldData: false

        }
    }

    componentDidMount = async () => {
        if (this.props.doctorInfors && this.props.scheduleData) {
            this.setState({
                scheduleData: this.props.scheduleData,
                doctorInfors: this.props.doctorInfors
            })
        }

        await this.fetchAllData()
    }

    fetchAllData = async () => {
        await this.props.fetchAllCodeStart();
        await this.props.getSelectDoctorStart(this.props.doctorId);
        if (this.props.doctorDescriptionIsShow === false) {
            await this.props.getDoctorInformationsStart(this.props.doctorId)
        }

    }

    handleOnchangeProps = () => {
        if (this.props.selectDoctor.id && this.props.doctorId && this.props.doctorId === this.props.selectDoctor.id) {

            let copySelectDoctor = { ...this.props.selectDoctor };
            if (copySelectDoctor && copySelectDoctor.avatar) {
                copySelectDoctor.avatar = new Buffer(copySelectDoctor.avatar, 'base64').toString('binary');
            }
            let copyState = { ...this.state };
            copyState.selectDoctor = this.props.selectDoctor;
            if (copySelectDoctor.firstName && copySelectDoctor.lastName) {
                copyState.id = copySelectDoctor.id;
                copyState.firstName = copySelectDoctor.firstName;
                copyState.lastName = copySelectDoctor.lastName;
                copyState.address = copySelectDoctor.address;
                copyState.avatar = copySelectDoctor.avatar;
                copyState.phoneNumber = copySelectDoctor.phoneNumber;
                copyState.description = copySelectDoctor.Markdown.description;
                copyState.hasOldData = true;
            }
            if (copySelectDoctor.positionData) {
                copyState.positionVi = copySelectDoctor.positionData.valueVi;
                copyState.positionEn = copySelectDoctor.positionData.valueEn;
            }

            this.setState({
                ...copyState
            })
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        // if (prevProps.language != this.props.language) {
        //     this.componentDidMount();
        // }

        if (
            // this.props.doctorId && this.props.doctorId === this.props.selectDoctor.id &&
            this.props.selectDoctor && prevProps.selectDoctor !== this.props.selectDoctor) {
            this.handleOnchangeProps();
        }

        if (this.props.allCode && (prevProps.allCode !== this.props.allCode)) {

            let allCode = this.props.allCode;
            let bookingDate = '';
            if (this.props.scheduleData && this.props.scheduleData.timeType) {

                allCode.map(item => {
                    if (item.keyMap === this.props.scheduleData.timeType) {
                        bookingDate = item;
                    }
                })
            }


        }

        if (this.props.doctorId && (prevProps.doctorId !== this.props.doctorId)) {
            await this.fetchAllData();
        }

        if (this.props.scheduleData && this.props.scheduleData !== prevProps.scheduleData) {
            this.setState({
                scheduleData: this.props.scheduleData
            })
        }

        if (this.props.doctorInfors && this.props.doctorInfors !== prevProps.doctorInfors) {
            this.setState({
                doctorInfors: this.props.doctorInfors
            })
        }

    }

    handleRenderDoctorTable = () => {

        let allCode = this.props.allCode;
        let scheduleData = this.state.scheduleData;
        let priceData = '';
        let bookingDate = '';
        let bookingTime = '';
        let time = '';
        let price = '';


        if (scheduleData && !_.isEmpty(scheduleData) && !_.isEmpty(this.state.doctorInfors)) {

            priceData = this.state.doctorInfors.priceData;

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

        }



        return (
            <>

                <div className='doctor-booking-up'>

                    <div className='doctor-booking-child'>
                        <div className='doctor-booking-child-left'>Ngày khám: </div>
                        <div className='doctor-booking-child-right'>{bookingTime}</div>
                    </div>

                    <div className='doctor-booking-child'>
                        <div className='doctor-booking-child-left'>Thời gian: </div>
                        <div className='doctor-booking-child-right'>{bookingDate}</div>
                    </div>

                    <div className='doctor-booking-child'>
                        <div className='doctor-booking-child-left'>Giá khám: </div>
                        <div className='doctor-booking-child-right'>{price}</div>
                    </div>

                </div>


                <div className='doctor-booking-down'>~Miễn phí đặt lịch~</div>

            </>
        )

    }



    render() {


        let { firstName, lastName, address, avatar, phoneNumber, positionVi, positionEn, description,
            bookingPrice, bookingPayment, bookingSchedule
        } = this.state;

        let { doctorId, doctorDescriptionIsShow, scheduleData } = this.props;

        let language = this.props.language;
        // console.log('check id props', this.props.doctorId)
        // console.log('check id state', this.state.doctorId)
        return (
            <>

                <div className='doctor-detail-content'>

                    <div className='doctor-detail-description'>

                        <div className='content-left'>
                            <div
                                style={{ backgroundImage: `url(${avatar})` }}
                                className='avatar'>
                            </div>
                        </div>

                        <div className='content-right'>
                            <div className='doctor-title'>
                                {language === LANGUAGES.VI ?
                                    positionVi + " " + firstName + " " + lastName
                                    :
                                    positionEn + " " + lastName + " " + firstName}
                            </div>
                            <div className={doctorDescriptionIsShow === true ? 'doctor-description' : 'doctor-des-hide'}>
                                {description}
                            </div>


                            <div className={doctorDescriptionIsShow === true ? 'doctor-address' : 'doctor-des-hide'}>
                                <i class="fas fa-map-marker-alt"></i>
                                <span>{address}</span>
                            </div>

                            <div className={doctorDescriptionIsShow === false ? 'doctor-description doctor-des-expand' : 'doctor-des-hide'}>
                                {this.handleRenderDoctorTable()}
                            </div>


                        </div>
                    </div>
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        selectDoctor: state.admin.selectDoctor,
        doctorInfors: state.admin.doctorInfors,
        allCode: state.admin.times,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSelectDoctorStart: (id) => dispatch(actions.getSelectDoctorStart(id)),
        getDoctorInformationsStart: (doctorId) => dispatch(actions.getDoctorInformationsStart(doctorId)),
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetailTag));
