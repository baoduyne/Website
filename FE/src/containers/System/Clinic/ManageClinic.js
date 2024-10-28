import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _, { size } from 'lodash';
import './ManageClinic.scss';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import CommonUtils from "../../../utils/CommonUtils";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { ACTIONS } from '../../../utils/constant';
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClinic: '',
            selectedClinic: '',
            ClinicOptions: '',

            nameClinic: '',
            addressClinic: '',

            avatar: '',
            backgroundImage: '',
            objectUrlAvatar: '',
            objectUrlBackgroundImage: '',
            isOpen: false,

            contentMarkdown: '',
            contentHTML: '',

            action: '',
            hasOldData: false
        }
    }

    componentDidMount() {
        this.getClinicData();
    }

    getClinicData = async () => {
        await this.props.getAllClinicStart();
    }


    builtClinicSelectOptions = (data) => {
        let result = [];
        if (data) {
            data.map(item => {
                let object = {}
                object.value = item.id;
                object.label = item.name;
                result.push(object);
            })
        }
        if (result) {
            result.push({ value: -1, label: '...' })
            return result;
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.allClinic && prevProps.allClinic !== this.props.allClinic) {
            let ClinicOptions = this.builtClinicSelectOptions(this.props.allClinic);
            console.log('log', ClinicOptions.length);
            this.setState({
                allClinic: this.props.allClinic,
                selectedClinic: ClinicOptions[ClinicOptions.length - 1],
                ClinicOptions: ClinicOptions
            })

        }
        if (prevState.allClinic !== this.state.allClinic) {
            this.handleSetStateDependOnId(this.state.ClinicOptions[this.state.ClinicOptions.length - 1].value);
        }



    }

    handlePreviewImage = async (event, type) => {

        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectUrl = URL.createObjectURL(file);
            let avtBase64 = await CommonUtils.getBase64(file);
            if (type === 'AVATAR') {
                this.setState({
                    avatar: avtBase64,
                    objectUrl: objectUrl
                });
            }
            else {
                this.setState({
                    backgroundImage: avtBase64,
                    objectUrlBackgroundImage: objectUrl
                });
            }

        }

    }

    handleDeleteImage = (type) => {
        if (type === 'AVATAR') {
            this.setState({ objectUrl: '' })
        }
        else {
            this.setState({ objectUrlBackgroundImage: '' })
        }
    }

    handleSetStateDependOnId = (ClinicId) => {
        let Clinic = '';
        if (this.state.allClinic) {
            this.state.allClinic.map(item => {
                if (item.id === ClinicId) {
                    Clinic = item;
                }
            })

        }
        if (Clinic) {

            let imageBase64Avatar = new Buffer(Clinic.image, 'base64').toString('binary');
            let imageBase64BackgroundImage = new Buffer(Clinic.backgroundImage, 'base64').toString('binary');
            this.setState({
                nameClinic: Clinic.name,
                addressClinic: Clinic.address,
                avatar: imageBase64Avatar,
                objectUrl: imageBase64Avatar,

                backgroundImage: imageBase64BackgroundImage,
                objectUrlBackgroundImage: imageBase64BackgroundImage,

                contentMarkdown: Clinic.contentMarkDown,
                contentHTML: Clinic.contentHTML,

                hasOldData: true
            })
        }
        else {

            this.setState({
                nameClinic: '',
                addressClinic: '',
                avatar: '',
                objectUrl: '',

                backgroundImage: '',
                objectUrlBackgroundImage: '',

                contentMarkdown: '',
                contentHTML: '',
                hasOldData: false
            })
        }

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

    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }

    checkValidate = () => {
        let isValid = true;
        let arrValid = ['nameClinic', 'avatar'];
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

    handleSubmitClinic = async () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            let data = {
                id: this.state.selectedClinic.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                avatar: this.state.avatar,
                backgroundImage: this.state.backgroundImage,
                contentHTML: this.state.contentHTML,
                contentMarkDown: this.state.contentMarkdown,
                action: this.state.hasOldData === true ? ACTIONS.EDIT : ACTIONS.CREATE
            }
            await this.props.createClinicStart(data);

            this.setState({
                selectedClinic: this.state.ClinicOptions[size() - 1],
                nameClinic: '',
                addressClinic: '',
                avatar: '',
                objectUrl: '',

                backgroundImage: '',
                objectUrlBackgroundImage: '',
                isOpen: false,

                contentMarkdown: '',
                contentHTML: '',

                action: '',
                hasOldData: false
            })

            this.getClinicData();
        }
    }

    render() {
        // imageBase64 = new Buffer(user.avatar, 'base64').toString('binary');
        const mdParser = new MarkdownIt(/* Markdown-it options */);

        return (
            <>
                <div className='manage-Clinic-container'>
                    <div className='manage-Clinic-content'>
                        <div
                            onClick={() => this.handleOnClickLogo()}
                            className='Clinic-logo'>
                            <div className='logo'></div>
                        </div>

                        <div className='title-container'>
                            <div className='Clinic-title'>Quản lý phòng khám</div>
                            <div className='Clinic-description'>Thêm hoặc chỉnh sửa thông tin của phòng khám</div>
                        </div>

                        <div className='Clinic-form'>

                            <div className="Clinic-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Phòng khám</div>
                                    <div className="content-right">
                                        <div class="form-group d-flex justify-content-center">
                                            <div class="form-group col-12">
                                                <label for="inputAddress">Chọn phòng khám</label>
                                                <Select
                                                    value={this.state.selectedClinic}
                                                    onChange={(event) => this.handleOnchangeInput(event, 'SELECT')}
                                                    options={this.state.ClinicOptions}
                                                    id='select'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Clinic-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Thông tin</div>
                                    <div className="content-right">
                                        <div class="form-group d-flex justify-content-center">
                                            <div class="form-group col-12">
                                                <label for="inputAddress">Tên phòng khám</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inputName"
                                                    placeholder="Tên phòng khám"
                                                    value={this.state.nameClinic}
                                                    onChange={(event) => this.handleOnchangeInput(event, 'nameClinic')}
                                                ></input>
                                            </div>
                                        </div>
                                        <div class="form-group d-flex justify-content-center">
                                            <div class="form-group col-12">
                                                <label for="inputAddress">Địa chỉ phòng khám</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inputName"
                                                    placeholder="Địa chỉ phòng khám"
                                                    value={this.state.addressClinic}
                                                    onChange={(event) => this.handleOnchangeInput(event, 'addressClinic')}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Clinic-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Ảnh logo</div>
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
                                                        onChange={(event) => this.handlePreviewImage(event, 'AVATAR')}
                                                        id='imagePreview'
                                                        type='file'
                                                        hidden
                                                    ></input>
                                                </label>

                                                <button
                                                    onClick={() => this.handleDeleteImage('AVATAR')}
                                                    className='preview-button add-image btn btn-light'>
                                                    Xóa ảnh
                                                </button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Clinic-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Ảnh bìa</div>
                                    <div className="content-right">
                                        {/* <label
                                            htmlFor="imagePreview"><FormattedMessage id="menu.admin.image"></FormattedMessage></label> */}
                                        <div className='image-content'>
                                            <div
                                                className="preview-box"
                                                style={{ backgroundImage: `url(${this.state.objectUrlBackgroundImage})` }}
                                                onClick={() => this.setState({ isOpen: true })}>
                                            </div>
                                            <div className='image-group-button'>
                                                <label htmlFor='backgroundImagePreview' className='preview-button add-image btn btn-primary'>
                                                    Thêm ảnh
                                                    <input
                                                        onChange={(event) => this.handlePreviewImage(event)}
                                                        id='backgroundImagePreview'
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

                            <div className="Clinic-section-container">
                                <div className='horizon-line'></div>
                                <div className='title-container'>
                                    <div>Thông tin phòng khám</div>
                                </div>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditorChange}
                                    value={this.state.contentMarkdown}
                                />
                            </div>

                            <div className="Clinic-section-container mt-5">
                                <div className="doctor-section-container">
                                    <div className='horizon-line'></div>
                                    <div className='Clinic-section-description margin-up'>
                                        <p><strong>LƯU Ý</strong></p>
                                        <p>Thông tin anh/chị cung cấp sẽ được sử dụng làm thông tin phòng khám, khi điền thông tin anh/chị vui lòng:</p>
                                        <ul>
                                            <li>Ghi rõ tên phòng khám, viết hoa chữ cái đầu tiên, ví dụ: <strong>Khoa sương khớp</strong></li>
                                            <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn &quot;Xác nhận&quot;</li>

                                        </ul>
                                    </div>
                                </div>
                                {this.state.hasOldData === true ? <button
                                    onClick={() => this.handleSubmitClinic()}
                                    className='col-12 button-edit btn btn-primary'>Xác nhận sửa phòng khám</button> :

                                    <button
                                        onClick={() => this.handleSubmitClinic()}
                                        className='col-12 button-submit'>Xác nhận tạo phòng khám</button>}

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
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createClinicStart: (data) => dispatch(actions.createClinicStart(data)),
        getAllClinicStart: () => dispatch(actions.getAllClinicStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);





