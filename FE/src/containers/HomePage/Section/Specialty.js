import React, { Component } from 'react';
import './Specialty.scss'
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
//import Slider from "//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className='section-specialty'>
                <div className="specialty-content">
                    <div className='image-content'>
                    <div className = "image-child">1</div>
                    <div className = "image-child">2</div>
                    <div className = "image-child">3</div>
                    <div className = "image-child">4</div>
                    <div className = "image-child">5</div>
                    <div className = "image-child">6</div>
                    <div className = "image-child">7</div>
                    <div className = "image-child">8</div>
                    <div className = "image-child">9</div>
                    <div className = "image-child">10</div>
                    </div>
                    <div className='switch-button'>
                    <button className='left-button'>{"<"}</button>
                    <button className='right-button'>{">"}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
