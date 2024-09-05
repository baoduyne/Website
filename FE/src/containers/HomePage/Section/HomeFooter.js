import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
class HomeFooter extends Component {

    render() {
        return (

            <div className='section-container section-home-footer'>
                <div className='footer-description'>This website was developed by Bao Duy with purposes acquire knownledge and improve skills </div>
                <div className='footer-description'>© Indipendent Project. All Rights Reserved</div>
                <div className='footer-term'>
                <div className='term-items'>Privacy & Terms of Use</div>
                <div className='term-items'>About Me</div>
                <div className='term-items'>Why Trust Me</div>
                <div className='term-items'>Editorial Policy</div>
                <div className='term-items'>Login</div>
                <div className='term-items'>Email Me</div>
                </div>
                <div className='footer-social-link'>
                <a href='https://www.facebook.com/baoduy.lo.1/' className='social-icon' target='blank_'><i class="fab fa-facebook"></i></a>
                <a href='https://github.com/baoduyne' className='social-icon' target='blank_'><i class="fab fa-github social-icon"></i></a>
                <a href='https://www.instagram.com/' className='social-icon' target='blank_'><i class="fab fa-instagram social-icon"></i></a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
