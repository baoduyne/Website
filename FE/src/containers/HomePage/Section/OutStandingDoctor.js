import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as actions from '../../../store/actions';
class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
        }
    }

    componentDidMount() {

        this.props.fetchTopDoctorStart(5);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctors != this.props.topDoctors) {
            this.setState({ arrDoctor: this.props.topDoctors });
        }
    }
    render() {
        let { arrDoctor } = this.state;
        // arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor);
        console.log('test', arrDoctor);
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
                        {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((item, index) => {
                            let avatarUrl = '';
                              if(item.avatar){ avatarUrl = new Buffer(item.avatar, 'base64').toString('binary');}
                            
                            return (
                                <div className='section-items'>
                                    <div style={{ backgroundImage: `url(${avatarUrl})` }} className='section-image section-outstanding-doctor'></div>
                                    <div className='section-text section-outstanding-doctor'>{item.firstName +" "+ item.lastName}</div>
                                </div>
                            );
                        })}

                    </Carousel>;
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorStart: (limit) => dispatch(actions.fetchTopDoctorStart(limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
