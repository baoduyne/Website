import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './SpecialtyDetail.scss';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInformation from '../Doctor/DoctorInformation';
import DoctorDetailTag from '../Doctor/DoctorDetailTag';
class SpecialtyDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [91, 86, 90, 89]
        }
    }

    componentDidMount = async () => {


    }


    componentDidUpdate = async (prevProps, prevState) => {

    }




    render() {
        console.log('check render')
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                ></HomeHeader>
                <div className='specialty-detail-container'>
                    <div className='specialty-detail-content'>
                        <div className='specialty-content-up'>this div tag will display specialty's data</div>
                        <div className='specialty-content-down'>
                            <div className='specialty-content-down-content'>
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
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCode: state.admin.times,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail));
