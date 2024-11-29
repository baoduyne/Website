import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getDataHandbookStart } from '../../../store/actions/adminActions';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { TYPE } from '../../../utils';
class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allHandbook: ''
        }
    }

    componentDidMount = async () => {
        await this.props.getDataHandbookStart(TYPE.ALL, -1);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.allHandbook !== prevProps.allHandbook && this.props.allHandbook) {
            this.setState({ allHandbook: this.props.allHandbook })
        }
    }
    handleOnClickHandbook = (id) => {
        this.props.history.push(`/handbook-detail/${id}`)
    }

    render() {

        let { allHandbook } = this.state;
        return (

            <div className='section-container section-hand-book'>
                <div className='section-content'>
                    <div className="section-detail">
                        <span>Cẩm nang</span>
                        <button>Xem thêm</button>
                    </div>
                    {allHandbook && allHandbook.length > 1 &&
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
                            {allHandbook && allHandbook.length > 1 && allHandbook.map(item => {
                                let imgBase64 = new Buffer(item.image, 'base64').toString('binary');
                                return (
                                    <div
                                        onClick={() => this.handleOnClickHandbook((item.id))}
                                        className='section-items section-hand-book'>
                                        <div className='section-image section-hand-book ' style={{ backgroundImage: `url(${imgBase64})` }}></div>
                                        <div className='section-text section-hand-book'>{item.title}
                                        </div>
                                    </div>
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
        allHandbook: state.admin.allHandbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataHandbookStart: (type, id) => dispatch(actions.getDataHandbookStart(type, id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
