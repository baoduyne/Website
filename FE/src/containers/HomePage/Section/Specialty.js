import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
class Specialty extends Component {

    render() {
        return (

            <div className='section-container section-specialty'>
                <div className='section-content'>
                    {/*  <div className="section-content">
                    <div className='switch-button'>
                        <button className='left-button'>{"<"}</button>
                    </div>
                    <div className='image-content'>
                        <div className="image-child">1</div>
                        <div className="image-child">2</div>
                        <div className="image-child">3</div>
                        <div className="image-child">4</div>
                        <div className="image-child">5</div>
                        <div className="image-child">6</div>
                        <div className="image-child">7</div>
                        <div className="image-child">8</div>
                        <div className="image-child">9</div>
                        <div className="image-child">10</div>
                    </div>
                    <div className='switch-button'>
                        <button className='right-button'>{">"}</button>
                    </div>
                </div> */}
                    <div className="section-detail">
                        <span><FormattedMessage id="section.pupularSpecialty"></FormattedMessage></span>
                        <button><FormattedMessage id='section.more'></FormattedMessage></button>
                    </div>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        responsive={this.props.responsive}
                        ssr={true} // means to render carousel on server-side.   
                        infinite={false}
                        autoPlay={false}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={[]}
                        deviceType={this.props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp1</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp2</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp3</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp4</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp5</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp6</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp7</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp8</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp9</div></div>
                        <div className='section-items'><div className='section-image section-specialty'></div><div className='section-text'>Khoa xương khớp10</div></div>
                    </Carousel>
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
