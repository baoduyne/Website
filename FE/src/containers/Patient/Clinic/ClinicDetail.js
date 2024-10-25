import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, STICKY_ELEMENT, TYPE } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './ClinicDetail.scss';

import _ from 'lodash';

import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInformation from '../Doctor/DoctorInformation';
import DoctorDetailTag from '../Doctor/DoctorDetailTag';
import Select from 'react-select';
import HomeFooter from '../../HomePage/Section/HomeFooter';
import HomeHeader from '../../HomePage/HomeHeader';
class ClinicDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedClinic: '',

            image: '',
            backgroundImage: '',

            arrDoctorId: '',
        }
    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            console.log('id', id)
            await this.props.getDetailClinicStart(id)
            await this.props.fetchAllCodeStart();
            await this.props.getDetailSpecialtyStart(TYPE.ALL, TYPE.ALL, TYPE.DOCTOR);
        }
    }

    builtDataInputSelect = (inputData) => {
        let result = [];

        result.push({
            value: 'ALL',
            label: this.props.language === LANGUAGES.VI ? 'Tất cả tỉnh thành' : 'All province'
        })

        if (inputData) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.id;
                object.label = this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                result.push(object)
            })
        }

        return result;
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.selectedClinic !== prevProps.selectedClinic && this.props.selectedClinic) {
            let imageBase64 = new Buffer(this.props.selectedClinic.clinicData.image, 'base64').toString('binary');
            let backgroundImageBase64 = new Buffer(this.props.selectedClinic.clinicData.backgroundImage, 'base64').toString('binary');
            this.setState({
                selectedClinic: this.props.selectedClinic,
                image: imageBase64,
                backgroundImage: backgroundImageBase64,

            })
        }

        if (this.props.arrDoctorId !== prevProps.arrDoctorId && this.props.arrDoctorId) {
            this.setState({
                arrDoctorId: this.props.arrDoctorId
            })
        }
    }

    scrollIntoView = (valueSection) => {

        const element = document.getElementById(valueSection);

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }





    render() {
        console.log('check render state arr ', this.props.arrDoctorId)
        let { selectedClinic, image, backgroundImage, arrDoctorId } = this.state;
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                ></HomeHeader>
                <div
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    className='clinic-detail-background'
                ></div>

                <div className='clinic-detail-container'>
                    <div className='clinic-detail-content'>

                        <div className='clinic-detail-header'>
                            <div className='clinic-header-content-left'>
                                <div
                                    style={{ backgroundImage: `url(${image})` }}
                                    className='content-left-logo'></div>
                            </div>
                            <div className='clinic-header-content-right'>
                                <div className='content-right-text'>
                                    <span className='clinic-detail-name'>{selectedClinic && selectedClinic.clinicData && selectedClinic.clinicData.name}</span>
                                    <span className='clinic-detail-address'>{selectedClinic && selectedClinic.clinicData && selectedClinic.clinicData.address}</span></div>
                            </div>
                        </div>

                        <div className='clinic-sticky-header'>
                            <span onClick={() => this.scrollIntoView(STICKY_ELEMENT.SECTION1)} className='sticky-child'>GIỚI THIỆU</span>
                            <span onClick={() => this.scrollIntoView(STICKY_ELEMENT.SECTION1)} className='sticky-child'>THẾ MẠNH CHUYÊN MÔN</span>
                            <span onClick={() => this.scrollIntoView(STICKY_ELEMENT.SECTION1)} className='sticky-child'>TRANG THIẾT BỊ</span>
                            <span onClick={() => this.scrollIntoView(STICKY_ELEMENT.SECTION1)} className='sticky-child'>VỊ TRÍ</span>
                            <span onClick={() => this.scrollIntoView(STICKY_ELEMENT.SECTION1)} className='sticky-child'>QUY TRÌNH KHÁM</span>
                            <span onClick={() => this.scrollIntoView(STICKY_ELEMENT.SECTION6)} className='sticky-child'>ĐỘI NGŨ BÁC SĨ</span>
                        </div>

                        <div className='clinic-detail-description-up'>
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div>
                        <div className='clinic-detail-description-down'>
                            <span className='description-down-header'>
                                Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.
                            </span>
                            <ul className='description-down-list'>
                                <li>Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm</li>
                                <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch) </li>
                                <li>Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước</li>
                                <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
                            </ul>
                        </div>

                        <section
                            id={STICKY_ELEMENT.SECTION1}
                            className='clinic-detail-contentHTML'
                            dangerouslySetInnerHTML={{ __html: selectedClinic ? selectedClinic.clinicData.contentHTML : '' }}
                        ></section>
                        <section id={STICKY_ELEMENT.SECTION6} className='clinic-detail-doctor'>
                            {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map(item => {

                                return (
                                    <>
                                        <div className='content-down-child'>
                                            <div className='content-down-left'>
                                                <DoctorDetailTag
                                                    doctorDescriptionIsShow={true}
                                                    doctorId={item}
                                                ></DoctorDetailTag>
                                            </div>
                                            <div className='content-down-right'>
                                                <div className='right-schedule-container'>
                                                    <DoctorSchedule doctorId={item}></DoctorSchedule>
                                                </div>
                                                <div className='right-information-container'>
                                                    <DoctorInformation doctorId={item}></DoctorInformation>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </section>

                    </div>
                </div >


            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCode: state.admin.provinces,
        selectedClinic: state.patient.selectedClinic,
        arrDoctorId: state.patient.arrDoctorId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart()),
        getDetailClinicStart: (clinicId) => dispatch(actions.getDetailClinicStart(clinicId)),
        getDetailSpecialtyStart: (specialtyId, provinceId, type) => dispatch(actions.getDetailSpecialtyStart(specialtyId, provinceId, type)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClinicDetail));
