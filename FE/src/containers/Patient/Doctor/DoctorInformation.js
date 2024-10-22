import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './DoctorInformation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { NumericFormat } from 'react-number-format';

class DoctorInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            doctorInfors: '',
            priceValue: '',
            paymentValue: '',
            detailIsOpened: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ doctorId: this.props.doctorId })
        await this.getDoctorInformation();
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.doctorInfors && (prevProps.doctorInfors !== this.props.doctorInfors)) {
            if (this.props.doctorId === this.props.doctorInfors.doctorId) {
                this.setState({
                    doctorInfors: this.props.doctorInfors
                })
            }
        }
        if (this.props.doctorId && (prevProps.doctorId !== this.props.doctorId)) {
            this.setState({ doctorId: this.props.doctorId });
            this.getDoctorInformation();
        }
    }

    getDoctorInformation = async () => {

        await this.props.getDoctorInformationsStart(this.props.doctorId);

    }

    handlePriceButton = () => {
        this.setState({
            detailIsOpened: !this.state.detailIsOpened
        })
    }

    render() {

        let { doctorInfors, detailIsOpened } = this.state;
        let language = this.props.language;
        let priceValueVi, priceValueEn, paymentValueEn, paymentValueVi = '';
        if (doctorInfors && doctorInfors.priceData && doctorInfors.priceData.valueEn && doctorInfors.priceData.valueVi) {
            priceValueVi = doctorInfors.priceData.valueVi;
            priceValueEn = doctorInfors.priceData.valueEn;
            paymentValueEn = doctorInfors.paymentData.valueEn;
            paymentValueVi = doctorInfors.paymentData.valueVi;
        }
        return (
            <>
                <div className='Doctor-infor-container'>
                    <div className='Doctor-infor-content'>

                        <div className='clinic-address'>
                            <div className='clinic-address-title'>Địa chỉ khám :</div>
                            <div className='clinic-address-name'>{doctorInfors.nameClinic}</div>
                            <div className='clinic-address-description'>{doctorInfors.addressClinic}</div>
                        </div>

                        <div className='booking-price'>
                            <div className={detailIsOpened === false ? 'booking-price-title' : "booking-price-title booking-price-title-active"}>
                                <span className='price-header'>Giá khám :</span>
                                <div className={detailIsOpened === false ? 'price-body-up' : 'price-body-up price-dis-active'}>{language === LANGUAGES.VI ?
                                    <NumericFormat displayType='text' value={priceValueVi} allowLeadingZeros={true} thousandSeparator="," suffix=' VNĐ' /> : priceValueEn + ' $'}</div>
                                <div className={detailIsOpened === false ? 'price-body-down price-dis-active' : 'price-body-down'}>
                                    <div className='price-body-down-content'>
                                        <ol class="list-group list-group-numbered">
                                            <li class="list-group-item">
                                                <div className='list-content-left'>
                                                    Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm :
                                                </div>
                                                <div className='list-content-right'>
                                                    {language === LANGUAGES.VI ? <NumericFormat displayType='text' value={priceValueVi} allowLeadingZeros thousandSeparator="," suffix=' VNĐ' /> : priceValueEn + ' $'}
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div className='list-content-left'>
                                                    Các phương thức thanh toán :
                                                </div>
                                                <div className='list-content-right'>
                                                    {language === LANGUAGES.VI ? paymentValueVi : paymentValueEn}
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
                                    <div className='price-discount'>
                                        <div className='price-discount-icon'>
                                            <FontAwesomeIcon icon={faBolt} />
                                        </div>
                                        <div className='price-discount-content'>Chương trình khuyến mại</div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => this.handlePriceButton()}
                                className='booking-price-button'>{detailIsOpened === false ? 'Xem chi tiết' : 'Ẩn chi tiết'}</div>
                        </div>

                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorInfors: state.admin.doctorInfors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorInformationsStart: (doctorId) => dispatch(actions.getDoctorInformationsStart(doctorId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorInformation));
