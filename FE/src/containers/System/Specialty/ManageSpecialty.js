import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import './ManageSpecialty.scss';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import CommonUtils from "../../../utils/CommonUtils";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import * as actions from '../../../store/actions';
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameSpecialty: '',

            avatar: '',
            objectUrl: '',
            isOpen: false,

            contentMarkdown: '',
            contentHTML: '',

            action: '',
            hasOldData: false
        }
    }

    componentDidMount() {

    }

    handlePreviewImage = async (event) => {

        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectUrl = URL.createObjectURL(file);
            let avtBase64 = await CommonUtils.getBase64(file);
            this.setState({
                avatar: avtBase64,
                objectUrl: objectUrl
            });
        }

    }

    handleDeleteImage = () => {
        this.setState({ objectUrl: '' })
    }

    handleOnchangeInput = (event, name) => {
        let copyState = { ...this.state };
        copyState[name] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }

    checkValidate = () => {
        let isValid = true;
        let arrValid = ['nameSpecialty', 'avatar'];
        let validKey = '';
        for (let i = 0; i < arrValid.length; i++) {
            if (!this.state[arrValid[i]]) {
                isValid = false;
                validKey = arrValid[i];
                break;
            }
        }
        if (isValid === false) {
            toast('Missing parameter : ' + validKey);
            return isValid;
        }
        return isValid;
    }

    handleEditorChange = (html, text) => {
        let copyState = { ...this.state };
        copyState.contentHTML = html.html;
        copyState.contentMarkdown = html.text;
        this.setState({
            ...copyState
        })
    }

    handleSubmitSpecialty = () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            let data = {
                nameSpecialty: this.state.nameSpecialty,
                avatar: this.state.avatar,
                descriptionHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown
            }
            this.props.createSpecialtyStart(data);
        }
    }

    render() {
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        console.log('check state manage specialty =>>', this.state)
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='manage-specialty-content'>
                        <div
                            onClick={() => this.handleOnClickLogo()}
                            className='specialty-logo'>
                            <div className='logo'></div>
                        </div>

                        <div className='title-container'>
                            <div className='specialty-title'>Quản lý chuyên khoa</div>
                            <div className='specialty-description'>Thêm hoặc chỉnh sửa thông tin của chuyên khoa</div>
                        </div>

                        <div className='specialty-form'>

                            <div className="specialty-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Thông tin</div>
                                    <div className="content-right">
                                        <div class="form-group d-flex justify-content-center">
                                            <div class="form-group col-12">
                                                <label for="inputAddress">Tên chuyên khoa</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inputName"
                                                    placeholder="Tên chuyên khoa"
                                                    value={this.state.nameSpecialty}
                                                    onChange={(event) => this.handleOnchangeInput(event, 'nameSpecialty')}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="specialty-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Ảnh</div>
                                    <div className="content-right">
                                        {/* <label
                                            htmlFor="imagePreview"><FormattedMessage id="menu.admin.image"></FormattedMessage></label> */}
                                        <div className='image-content'>
                                            <div
                                                className="preview-box"
                                                style={{ backgroundImage: `url(${this.state.objectUrl})` }}
                                                onClick={() => this.setState({ isOpen: true })}>
                                            </div>
                                            <div className='image-group-button'>
                                                <label htmlFor='imagePreview' className='preview-button add-image btn btn-primary'>
                                                    Thêm ảnh
                                                    <input
                                                        onChange={(event) => this.handlePreviewImage(event)}
                                                        id='imagePreview'
                                                        type='file'
                                                        hidden
                                                    ></input>
                                                </label>

                                                <button
                                                    onClick={() => this.handleDeleteImage()}
                                                    className='preview-button add-image btn btn-light'>
                                                    Xóa ảnh
                                                </button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="specialty-section-container">
                                <div className='horizon-line'></div>
                                <div className='title-container'>
                                    <div>Thông tin chuyên khoa</div>
                                </div>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown}
                                />
                            </div>

                            <div className="specialty-section-container mt-5">
                                <div className="doctor-section-container">
                                    <div className='horizon-line'></div>
                                    <div className='specialty-section-description margin-up'>
                                        <p><strong>LƯU Ý</strong></p>
                                        <p>Thông tin anh/chị cung cấp sẽ được sử dụng làm thông tin chuyên khoa, khi điền thông tin anh/chị vui lòng:</p>
                                        <ul>
                                            <li>Ghi rõ tên chuyên khoa, viết hoa chữ cái đầu tiên, ví dụ: <strong>Khoa sương khớp</strong></li>
                                            <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn &quot;Xác nhận&quot;</li>

                                        </ul>
                                    </div>
                                </div>
                                <button
                                    onClick={() => this.handleSubmitSpecialty()}
                                    className='col-12 button-submit'>Xác nhận tạo chuyên khoa</button>
                            </div>

                        </div>

                    </div>
                </div >

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.objectUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />}
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createSpecialtyStart: (data) => dispatch(actions.createSpecialtyStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);





