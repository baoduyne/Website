import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { verifyUserBookingAppoinmentService } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerify: false
        }
    }
    componentDidMount = async () => {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let response = await verifyUserBookingAppoinmentService(token, doctorId);

            if (response && response.errCode === 0) {
                this.setState({ isVerify: true })
            }
        }

    }

    buildHTMLContainer = () => {
        if (this.state.isVerify === true) {
            return (
                <>
                    <div className='verify-container '>
                        <div className='verify-content alert alert-success' role="alert">
                            <div className='verify-title'>Đặt lịch thành công!</div>
                            <div className='verify-child'>~ Vui lòng liên hệ với cộng tác viên nếu cần hỗ trợ hotline: 0123-1234-1234-1234 ~</div>
                        </div>


                    </div>

                </>
            )
        }
        else {
            return (
                <>
                    <div className='verify-container '>
                        <div className='verify-content alert alert-warning' role="alert">
                            <div class="verify-title">Đặt lịch thất bại...</div>

                            <div >1. Do lịch đã được đặt trước đó</div>
                            <div >2. Do lịch không tồn tại</div>

                            <div className='verify-child'> Vui lòng liên hệ với cộng tác viên để được hỗ trợ hotline: 0123-1234-1234-1234</div>


                        </div>

                    </div>
                </>
            )
        }
    }


    render() {
        return (
            <Fragment>
                <HomeHeader
                    isShowBanner={false}
                >
                </HomeHeader>
                {this.buildHTMLContainer()}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);