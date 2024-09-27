import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
class HandBook extends Component {

    render() {
        return (

            <div className='section-container section-hand-book'>
                <div className='section-content'>
                    <div className="section-detail">
                        <span>Cẩm nang</span>
                        <button>Xem thêm</button>
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
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>This text is styled with some of the text formatting properties. The heading uses the text-align, text-transform, and color properties. The paragraph is indented, aligned, and the space between characters is specified. The underline is removed from this colored "Try it Yourself" link.</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp2</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp3</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp4</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp5</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp6</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp7</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp8</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp9</div></div>
                        <div className='section-items section-hand-book'><div className='section-image section-hand-book'></div><div className='section-text section-hand-book'>Khoa xương khớp10</div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
