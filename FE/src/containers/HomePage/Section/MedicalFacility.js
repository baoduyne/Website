import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../../utils';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allClinic: ''
        }
    }

    componentDidMount() {
        this.props.getAllClinicStart();
    }

    componentDidUpdate(prevProps) {
        if (this.props.allClinic && prevProps.allClinic !== this.props.allClinic) {
            this.setState({ allClinic: this.props.allClinic })
        }
    }


    handleOnClickClinic = (Clinic) => {
        this.props.history.push(`/clinic-detail/${Clinic.id}`)
    }

    handleOnClickList = () => {
        this.props.history.push(`/list/${TYPE.CLINIC}`)
        //<Redirect to = {`/detail-doctor/${doctor.id}`}></Redirect>
    }

    render() {

        return (
            <div className='section-container section-medical-facility'>
                <div className='section-content'>
                    <div className="section-detail">
                        <span><FormattedMessage id='section.medicalFacility'></FormattedMessage></span>
                        <button
                            onClick={() => this.handleOnClickList()}
                        ><FormattedMessage id="section.more"></FormattedMessage></button>
                    </div>
                    {this.state.allClinic && this.state.allClinic.length > 0 &&
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
                            {this.state.allClinic && this.state.allClinic.length > 0 && this.state.allClinic.map(item => {
                                let imageBase64 = new Buffer(item.image, 'base64').toString('binary');

                                return (
                                    <><div
                                        onClick={() => this.handleOnClickClinic(item)}
                                        className='section-items specialty'>
                                        <div
                                            className='section-image section-medical-facility'
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                        ></div>
                                        <div className='section-text section-facility'>{item.name}</div>
                                    </div>
                                    </>
                                )
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
        isLoggedIn: state.user.isLoggedIn,
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClinicStart: () => dispatch(actions.getAllClinicStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
