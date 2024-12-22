import React, { Component } from 'react';
import './DeleteBillModal.scss';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from "react-redux";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../../../store/actions';

class DeleteBillModal extends Component {

    handleOnClickDeleteBill = () => {
        if (this.props.billData && this.props.billData.id) {
            this.props.deleteBillStart(this.props.billData.id)
            this.props.toggleDeleteModalFromParent();

        }
    }
    render() {

        return (
            <div>
                <Modal open={this.props.isOpenDeleteModal} onClose={this.props.toggleDeleteModalFromParent} center>

                    <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header flex-column">
                                <div class="icon-box">
                                    <FontAwesomeIcon className='delete-icon' icon={faXmark} />
                                </div>
                                <h4 class="modal-title w-100">Xóa hóa đơn khám?</h4>

                            </div>
                            <div class="modal-body">
                                <p>Bạn có chắc muốn xóa lịch trình khám của người dùng {this.props.billData && this.props.billData.patientData && this.props.billData.patientData.firstName + " " + this.props.billData.patientData.lastName} ( {this.props.billData && this.props.billData.patientData && this.props.billData.patientData.email} )</p>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button
                                    onClick={this.props.toggleDeleteModalFromParent}
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal">Hủy</button>
                                <button
                                    onClick={() => this.handleOnClickDeleteBill()}
                                    type="button"
                                    class="btn btn-danger">Xóa</button>
                            </div>
                        </div>
                    </div>

                </Modal>
            </div>
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
        deleteBillStart: (id) => dispatch(actions.deleteBillStart(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteBillModal));
