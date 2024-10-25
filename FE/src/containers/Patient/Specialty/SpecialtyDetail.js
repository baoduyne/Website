import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, TYPE } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './SpecialtyDetail.scss';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInformation from '../Doctor/DoctorInformation';
import DoctorDetailTag from '../Doctor/DoctorDetailTag';
import Select from 'react-select';
import HomeFooter from '../../HomePage/Section/HomeFooter';
class SpecialtyDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyId: '',
            specialtyData: '',
            arrDoctorId: [],

            allProvince: '',
            selectecProvince: '',

            isExpandContentUp: false,
        }
    }

    componentDidMount = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            await this.props.getDetailSpecialtyStart(id, 'ALL', TYPE.SPECIALTY);
            await this.props.getDetailSpecialtyStart(id, 'ALL', TYPE.DOCTOR);
            await this.props.fetchAllCodeStart();
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
        if (this.props.language !== prevProps.language) {
            this.builtDataInputSelect(this.props.allCode)
        }

        if (this.props.allCode && this.props.allCode !== prevProps.allCode) {
            let allProvince = this.builtDataInputSelect(this.props.allCode);
            this.setState({
                allProvince: allProvince,
            })
        }
        if (this.props.specialtyData && prevProps.specialtyData !== this.props.specialtyData) {
            let copyState = { ...this.state }
            copyState.specialtyData = this.props.specialtyData;
            this.setState({
                ...copyState
            })
        }

        if (this.props.arrDoctorId && prevProps.arrDoctorId !== this.props.arrDoctorId) {
            let copyState = { ...this.state }
            copyState.arrDoctorId = this.props.arrDoctorId;
            this.setState({
                ...copyState
            })
        }
    }

    renderContentUp = (specialtyData) => {

        if (specialtyData && !_.isEmpty(specialtyData)) {
            let base64Image = new Buffer(specialtyData.image, 'base64').toString('binary');
            return (<>
                <div
                    style={{ backgroundImage: `url(${base64Image})` }}
                    className={this.state.isExpandContentUp === false ? 'content-up-content' : 'content-up-content expand-content'}
                >
                    <div className='content-lineear'></div>
                </div >
                <div
                    dangerouslySetInnerHTML={{ __html: specialtyData.descriptionHTML }}
                    className={this.state.isExpandContentUp === false ? 'content-up-description' : 'content-up-description expand-content'}
                >
                </div>
            </>)
        }
    }
    handleExpandButton = () => {
        this.setState({
            isExpandContentUp: !this.state.isExpandContentUp
        })
    }

    handleOnclickSort = async (event) => {
        this.setState({
            selectecProvince: event
        })
        let id = this.props.match.params.id;

        await this.props.getDetailSpecialtyStart(id, event.value, TYPE.DOCTOR);
    }


    render() {

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                ></HomeHeader>
                <div className='specialty-detail-container'>
                    <div className='specialty-detail-content'>
                        <div className={this.state.isExpandContentUp === false ? 'specialty-content-up' : 'specialty-content-up expand-content'}>{this.renderContentUp(this.state.specialtyData)}</div>
                        <div
                            onClick={() => this.handleExpandButton()}
                            className='content-up-expand'
                        >Xem thêm...</div>

                        <div className='specialty-content-down'>

                            <div className='specialty-content-down-content'>
                                <div className='province-sort'>
                                    <Select
                                        value={this.state.selectedOption}
                                        onChange={(event) => this.handleOnclickSort(event)}
                                        options={this.state.allProvince}
                                        className='w-3'
                                        placeholder='Tỉnh thành'
                                        id='select'
                                    />
                                </div>
                                {this.state.arrDoctorId && this.state.arrDoctorId.length > 0 && this.state.arrDoctorId.map(item => {

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

                            </div>
                        </div>
                    </div>
                </div>
                {/* <HomeFooter></HomeFooter> */}
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCode: state.admin.provinces,
        arrDoctorId: state.patient.arrDoctorId,
        specialtyData: state.patient.specialtyData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart()),
        getDetailSpecialtyStart: (specialtyId, provinceId, type) => dispatch(actions.getDetailSpecialtyStart(specialtyId, provinceId, type)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail));
