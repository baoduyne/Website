import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, STICKY_ELEMENT, TYPE } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './HandbookDetail.scss'
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/Section/HomeFooter'
import HandBook from '../../HomePage/Section/HandBook.js'
class HandbookDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allHandbook: ''
        }
    }

    componentDidMount = async () => {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            await this.props.getDataHandbookStart('...', this.props.match.params.id);
        }
    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.allHandbook !== prevProps.allHandbook && this.props.allHandbook) {
            this.setState({ allHandbook: this.props.allHandbook })
        }
    }

    handleOnclickButtonSubmit(id) {
        this.props.history.push(`/specialty-detail/${id}`)
    }

    render() {


        console.log('check render state arr ', this.state.allHandbook)
        let { allHandbook } = this.state;
        let imgBase64 = ''
        if (allHandbook) {
            imgBase64 = new Buffer(allHandbook.image, 'base64').toString('binary');
        }

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                ></HomeHeader>
                <div className="handbook-banner-container">
                </div>
                <div className="handbook-banner-outline">
                </div>

                <div className='handbook-banner-content'>
                    <span className='handbook-banner-text1'>Cẩm nang - Sống khỏe - Sức khỏe</span>
                    <span className='handbook-banner-text2'>Tiêm filler môi là gì? Những điều cần biết khi tiêm filler môi</span>
                </div>

                <div className='handbook-container'>
                    <div className='handbook-content'>

                        <div className='content-section1-container'>
                            <div className='content-section1-content'>
                                <div className='section1-content-left'>
                                    <div className='section1-image' style={{ backgroundImage: `url(${imgBase64})` }}></div>
                                    <div
                                        className='section1-handbook'
                                        dangerouslySetInnerHTML={{ __html: allHandbook ? allHandbook.contentHTML : '' }}
                                    ></div>
                                </div>
                                <div className='section1-content-right'>
                                    <div className='main-schedule'>
                                        <div className='main-schedule-title'>
                                            <div className='main-schedule-text'>Thông tin chuyên khoa</div>
                                            <div className='main-schedule-dotline'></div>
                                        </div>
                                        <div className='main-schedule-content'
                                            dangerouslySetInnerHTML={{
                                                __html: allHandbook && allHandbook.SpecialtyData2 ? allHandbook.SpecialtyData2.descriptionHTML : ''
                                            }}
                                        >

                                        </div>
                                        <div className='main-scheule-submit'>
                                            <div
                                                onClick={() => this.handleOnclickButtonSubmit(allHandbook.specialtyId)}
                                                className='main-schedule-button'>
                                                Đặt khám
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='content-section2-container'>
                            <div className='content-section2-content'>

                            </div>
                        </div>

                        <div className='content-section3-container'>
                            <div className='content-section3-content'>

                            </div>
                        </div>

                        {/* <HandBook responsive={responsiveHandBook}></HandBook> */}
                    </div>
                </div>


            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCode: state.admin.provinces,
        allHandbook: state.admin.allHandbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart()),
        getDataHandbookStart: (type, id) => dispatch(actions.getDataHandbookStart(type, id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandbookDetail));
