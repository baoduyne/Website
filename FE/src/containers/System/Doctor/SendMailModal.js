import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES, YesNoObj, dateFormat } from '../../../utils/constant';
import Select from 'react-select';
import './SendMailModal.scss';
import _ from 'lodash';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// import Button from '@mui/material/Button';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

class SendMailModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            note: '',
            pillPrice: ''

        }
    }
    componentDidMount = async () => {


    }

    componentDidUpdate(prevProps, prevState) {


    }

    handleOnchangeInput = (event, name) => {
        if (name === 'SELECT') {
            console.log('asdsad', event.value);
            let copyState = { ...this.state };
            copyState.selectedClinic = event;
            this.setState({
                ...copyState
            })
            this.handleSetStateDependOnId(event.value);
        }
        else {
            let copyState = { ...this.state };
            copyState[name] = event.target.value;
            this.setState({
                ...copyState
            })
        }
    }

    handleOnclickSubbmit = () => {
        let data = {
            email: this.state.email,
            pillPrice: this.state.pillPrice,
            note: this.state.note,
            bookingData: this.props.bookingData
        }
        console.log("sadads", data)
    }


    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.isOpenModal} onClose={this.props.onCloseModalFromParent} center>

                    <div className='bill-container'>
                        <div className='bill-content'>Gửi hóa đơn</div>
                    </div>
                    <div className='send-email-container'>
                        <div className='send-email-conent'>

                            <div className="email-form">

                                <div className="email-section-container">
                                    <div className="section-content">
                                        <div className="content-right">
                                            <div class="form-group d-flex gap-3 justify-content-center flex-column">
                                                <div class="form-group col-12">
                                                    <label for="inputEmail4">Email</label>
                                                    <input
                                                        className='form-control'
                                                        placeholder="Email"
                                                        value={this.state.email}
                                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="email-section-container">
                                    <div className="section-content">
                                        <div className="content-right">
                                            <div class="form-group d-flex gap-3 justify-content-center flex-column">
                                                <div class="form-group col-12">
                                                    <label for="inputEmail4">Giá thuốc</label>
                                                    <input
                                                        className='form-control'
                                                        placeholder="Giá thuốc"
                                                        value={this.state.pillPrice}
                                                        onChange={(event) => this.handleOnchangeInput(event, 'pillPrice')}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="email-section-container">
                                    <div className="section-content">
                                        <div className="content-right">
                                            <div class="form-group d-flex gap-3 justify-content-center flex-column">
                                                <div class="form-group col-12">
                                                    <label for="inputEmail4">Thông tin bổ sung</label>
                                                    <input
                                                        type="text"
                                                        class="form-control text-field-mail"
                                                        id="inputAddress"
                                                        placeholder=""
                                                        value={this.state.note}
                                                        onChange={(event) => this.handleOnchangeInput(event, 'note')}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="email-section-container">
                                    <div className="section-content">
                                        <div className="content-right">
                                            <div className='specialty-section-description margin-up'>
                                                <p><strong>LƯU Ý</strong></p>
                                                <p>Thông tin anh/chị cung cấp sẽ được sử dụng làm thông tin chuyên khoa, khi điền thông tin anh/chị vui lòng:</p>
                                                <ul>
                                                    <li>Ghi rõ tên chuyên khoa, viết hoa chữ cái đầu tiên, ví dụ: <strong>Khoa sương khớp</strong></li>
                                                    <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn &quot;Xác nhận&quot;</li>

                                                </ul>
                                            </div>
                                            <button
                                                onClick={() => this.handleOnclickSubbmit()}
                                                className='col-12 button-submit'>Xác nhận gửi hóa đơn
                                            </button>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendMailModal));
