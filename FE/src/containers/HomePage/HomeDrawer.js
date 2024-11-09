import React, { Component } from 'react';
import './HomeDrawer.scss'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { Redirect, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { TYPE } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faStar, faBarsProgress, faHospitalUser, faHeartPulse, faPhone, faQuestion, faBook, faCopyright } from '@fortawesome/free-solid-svg-icons';

class HomeDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnClickList = (type) => {
        if (type === TYPE.DOCTOR) {
            this.props.history.push(`/doctor/manage-patient`)
        }
        else if (type === TYPE.PATIENT) {
            this.props.history.push(`/list/${TYPE.SPECIALTY}`)
        }
        else if (type === TYPE.POLICY) {
            this.props.history.push(`/policy`)
        }
    }


    render() {

        return (
            <React.Fragment>

                <Drawer
                    open={this.props.drawerIsOpen}
                    onClose={() => this.props.handleOnClickDrawer()}
                    direction='left'
                    className='bla bla bla'
                >
                    <div className='drawer-container'>
                        <div className='drawer-content'>

                            <div className='drawer-logo-group'>
                                <div className='drawer-logo-icon'><FontAwesomeIcon icon={faStar} /></div>
                                <div className='drawer-logo-description'>Tiện ích</div>
                            </div>

                            <div className='drawer-section'>
                                <div className='drawer-section-title'>Điều hướng</div>

                                <div
                                    onClick={() => this.handleOnClickList(TYPE.DOCTOR)}
                                    className='drawer-section-child'>
                                    <div className='drawer-section-child-icon'> <FontAwesomeIcon icon={faHospitalUser} /> </div>
                                    <div className='drawer-section-child-description'>Dành cho bác sĩ</div>
                                </div>

                                <div
                                    onClick={() => this.handleOnClickList(TYPE.PATIENT)}
                                    className='drawer-section-child'>
                                    <div className='drawer-section-child-icon'><FontAwesomeIcon icon={faHeartPulse} /></div>
                                    <div className='drawer-section-child-description'>Dành cho bệnh nhân</div>
                                </div>

                            </div>

                            <div className='drawer-section'>
                                <div className='drawer-section-title'>Pháp lý</div>

                                <div
                                    onClick={() => this.handleOnClickList(TYPE.POLICY)}
                                    className='drawer-section-child'>
                                    <div className='drawer-section-child-icon'><FontAwesomeIcon icon={faCopyright} /></div>
                                    <div className='drawer-section-child-description'>Chính sách & bảo mật</div>
                                </div>

                                <div
                                    onClick={() => this.handleOnClickList(TYPE.POLICY)}
                                    className='drawer-section-child'>
                                    <div className='drawer-section-child-icon'><FontAwesomeIcon icon={faBook} /></div>
                                    <div className='drawer-section-child-description'>Điều khoản sử dụng</div>
                                </div>

                                <div
                                    onClick={() => this.handleOnClickList(TYPE.POLICY)}
                                    className='drawer-section-child'>
                                    <div className='drawer-section-child-icon'><FontAwesomeIcon icon={faComments} /></div>
                                    <div className='drawer-section-child-description'>Câu hỏi thường gặp</div>
                                </div>


                                <div
                                    onClick={() => this.handleOnClickList(TYPE.POLICY)}
                                    className='drawer-section-child'>
                                    <div className='drawer-section-child-icon'><FontAwesomeIcon icon={faPhone} /></div>
                                    <div className='drawer-section-child-description'>Liên hệ</div>
                                </div>


                            </div>

                            <div className='drawer-section'>
                                <div className='drawer-section-title font-weight-light font-italic'>© 2024 BaoDuy, Inc.</div>
                            </div>



                        </div>
                    </div>
                </Drawer>
            </React.Fragment>



        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDrawer));
