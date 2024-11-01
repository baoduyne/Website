import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../../utils';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: ''
        }
    }

    componentDidMount() {
        this.props.getAllSpecialtyStart();
    }

    componentDidUpdate(prevProps) {
        if (this.props.allSpecialty && prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({ allSpecialty: this.props.allSpecialty })
        }
    }

    handleOnClickSpecialty = (specialty) => {
        this.props.history.push(`/specialty-detail/${specialty.id}`)
    }

    handleOnClickList = () => {
        this.props.history.push(`/list/${TYPE.SPECIALTY}`)
        //<Redirect to = {`/detail-doctor/${doctor.id}`}></Redirect>
    }

    render() {
        let { allSpecialty } = this.state;

        return (

            <div className='section-container section-specialty'>
                <div className='section-content'>

                    <div className="section-detail">
                        <span><FormattedMessage id="section.pupularSpecialty"></FormattedMessage></span>
                        <button
                            onClick={() => this.handleOnClickList()}
                        ><FormattedMessage id='section.more'></FormattedMessage></button>
                    </div>
                    {allSpecialty && allSpecialty.length > 0 &&
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
                            {allSpecialty && allSpecialty.length > 0 && allSpecialty.map(item => {
                                let imageBase64 = new Buffer(item.image, 'base64').toString('binary');

                                return (
                                    <><div
                                        onClick={() => this.handleOnClickSpecialty(item)}
                                        className='section-items specialty'>
                                        <div
                                            className='section-image section-specialty'
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                        ></div>
                                        <div className='section-text section-specialty'>{item.name}</div>
                                    </div>
                                    </>
                                )
                            })
                            }


                        </Carousel>}

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSpecialtyStart: () => dispatch(actions.getAllSpecialtyStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
