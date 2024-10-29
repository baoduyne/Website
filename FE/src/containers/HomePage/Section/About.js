import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
class About extends Component {

    render() {
        return (

            <div className='section-container section-about'>

                <div className='about-detail'>Thông tin cần thiết</div>
                <div className='about-content'>
                    <iframe src="https://www.youtube.com/embed/e_UYhqrL8ic"
                        title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                        className='content-left'>

                    </iframe>

                    <div className='content-right'>
                        <p>
                            "Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success."<br></br> <br></br> --Swami Vivekananda
                        </p>
                        {/*fire this codes below to embed the program icons*/}
                        {/*<div className='gallery-items vtv1'></div>
                        <div className='gallery-items vtv2'></div>
                        <div className='gallery-items vtv3'></div>
                        <div className='gallery-items vtv4'></div>*/}

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
