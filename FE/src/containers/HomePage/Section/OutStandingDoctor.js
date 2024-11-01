import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { Redirect, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
        }
    }

    componentDidMount() {

        this.props.fetchTopDoctorStart(10);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctors != this.props.topDoctors) {
            this.setState({ arrDoctor: this.props.topDoctors });
        }
    }

    handleDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
        //<Redirect to = {`/detail-doctor/${doctor.id}`}></Redirect>
    }
    render() {
        let language = this.props.language;
        let { arrDoctor } = this.state;
        console.log("top doctor", this.props.topDoctors)
        if (!arrDoctor) {
            this.componentDidMount();
        }
        // arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor);
        return (
            <div className='section-container section-outstanding-doctor'>
                <div className='section-content'>
                    <div className="section-detail">
                        <span><FormattedMessage id="section.outStandingDoctors"></FormattedMessage></span>
                        <button><FormattedMessage id="section.more"></FormattedMessage></button>
                    </div>
                    {arrDoctor && arrDoctor.length &&
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

                                if (item.avatar) { avatarUrl = new Buffer(item.avatar, 'base64').toString('binary'); }
                                let nameVi = `${item.positionData.valueVi},  ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn},  ${item.firstName} ${item.lastName}`;

                                return (
                                    <div
                                        className='section-items section-out-standing-doctor'
                                        onClick={() => this.handleDetailDoctor(item)}
                                    >
                                        <div style={{ backgroundImage: `url(${avatarUrl})` }} className='section-image section-outstanding-doctor'></div>
                                        <div className='section-text section-outstanding-doctor'>
                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                            <div className='section-text-description'>
                                                chuyên khoa {item.doctorInforData.specialtyData.name}
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}

                        </Carousel>
                    }
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorStart: (limit) => dispatch(actions.fetchTopDoctorStart(limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
