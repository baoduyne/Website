import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class OutStandingDoctor extends Component {

    render() {
        return (
            <div className='section-container section-outstanding-doctor'>
            <div className='section-content'>
            
           
                <div className="section-detail">
                    <span>Bác sĩ nổi bật tuần qua</span>
                    <button>Xem thêm</button>
                </div>
                  <Carousel
                   swipeable={false}
                   draggable={false}
                   showDots={false}
                   responsive={this.props.responsive}
                   ssr = {true} // means to render carousel on server-side.   
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
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                    <div className='section-items'><div className='section-image section-outstanding-doctor '></div><div className='section-text section-outstanding-doctor'>Bác sĩ nổi bật</div></div>
                  </Carousel>;
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
