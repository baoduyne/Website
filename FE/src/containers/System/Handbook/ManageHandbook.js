import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageHandbook.scss';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import CommonUtils from "../../../utils/CommonUtils";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import { ACTIONS, TYPE } from '../../../utils/constant';
import _, { size } from 'lodash';
class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {

            allHandbook: '',
            allSpecialty: '',

            handbookOptions: '',
            handbookSelected: '',
            specialtyOptions: '',
            specialtySelected: '',

            title: '',

            contentMarkdown: '',
            contentHTML: '',

            image: '',
            objectImageURL: '',

            hasOldData: false,
            isOpen: false,
        }
    }

    componentDidMount() {
        this.props.getDataHandbookStart(TYPE.ALL, -1);
        this.props.getAllSpecialtyStart();
    }



    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.allHandbook !== prevProps.allHandbook && this.props.allHandbook) {
            let handbookOptions = this.buildDataInputSelect(this.props.allHandbook);
            let object = {};
            object.value = -1;
            object.label = "...";
            handbookOptions.push(object);
            this.setState({
                allHandbook: this.props.allHandbook,
                handbookOptions: handbookOptions

            })
        }
        if (this.props.allSpecialty !== prevProps.allSpecialty && this.props.allSpecialty) {
            let specialtyOptions = this.buildDataInputSelect(this.props.allSpecialty);
            this.setState({
                allSpecialty: this.props.allSpecialty,
                specialtyOptions: specialtyOptions
            })
        }
    }

    buildDataInputSelect = (data) => {
        let result = [];
        if (data) {
            data.map((item) => {
                let object = {}
                object.value = item.id;
                if (item.name) {
                    object.label = item.name;
                }
                else {
                    object.label = item.title;
                }

                result.push(object)
            })
        }
        return result;
    }
    handlePreviewImage = async (event) => {

        let data = event.target.files;
        let file = data[0];

        if (file) {
            let objectUrl = URL.createObjectURL(file);
            let avtBase64 = await CommonUtils.getBase64(file);

            this.setState({
                image: avtBase64,
                objectImageURL: objectUrl
            });
        }

    }

    handleSetStateDependOnId = (HandbookId) => {
        let Handbook = '';
        if (this.state.allHandbook) {
            this.state.allHandbook.map(item => {
                if (item.id === HandbookId) {
                    Handbook = item;
                }
            })

        }
        if (Handbook) {

            let imageBase64Avatar = new Buffer(Handbook.image, 'base64').toString('binary');
            let selected = '';
            this.state.specialtyOptions.map(item => {
                if (item.value === Handbook.specialtyId) {
                    selected = item
                }
            })
            let specialtySelected = selected;



            console.log('test img', imageBase64Avatar)
            this.setState({
                title: Handbook.title,

                image: imageBase64Avatar,
                objectImageURL: imageBase64Avatar,
                specialtySelected: specialtySelected,
                contentMarkdown: Handbook.contentMarkdown,
                contentHTML: Handbook.contentHTML,

                hasOldData: true
            })
        }
        else {

            this.setState({
                title: '',

                image: '',
                objectImageURL: '',
                specialtySelected: '',
                contentMarkdown: '',
                contentHTML: '',
                hasOldData: false
            })
        }

    }
    handleEditorChange = (html, text) => {
        let copyState = { ...this.state };
        copyState.contentHTML = html.html;
        copyState.contentMarkdown = html.text;
        this.setState({
            ...copyState
        })
    }

    handleOnchangeInput = (event, name) => {
        let copyState = { ...this.state };
        if (name === 'SELECT') {
            copyState.handbookSelected = event;
            this.setState({
                ...copyState
            })
            this.handleSetStateDependOnId(event.value);
        }
        else if (name === "SPECIALTY_SELECT") {
            copyState.specialtySelected = event;
            this.setState({
                ...copyState
            })
        }

        else {
            copyState[name] = event.target.value;
            this.setState({
                ...copyState
            })
        }
    }


    handleDeleteImage = () => {

        this.setState({ objectImageURL: '' })

    }

    checkValidate = () => {
        let isValid = true;
        let arrValid = ['title', 'image'];
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

    handleSubmitHandbook = async () => {
        let isValid = this.checkValidate();
        if (isValid === true) {
            let data = {
                id: this.state.handbookSelected.value,
                specialtyId: this.state.specialtySelected.value,
                title: this.state.title,

                image: this.state.image,

                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                action: this.state.hasOldData === true ? ACTIONS.EDIT : ACTIONS.CREATE
            }

            await this.props.createHandbookStart(data);

            this.setState({
                handbookSelected: '',
                specialtySelected: '',
                title: '',

                image: '',
                objectImageURL: '',

                isOpen: false,

                contentMarkdown: '',
                contentHTML: '',

                action: '',
                hasOldData: false
            })

            this.props.getDataHandbookStart('ALL', -1);
        }
    }

    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }



    render() {
        console.log('this state', this.state)
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        return (
            <>
                <div className='manage-handbook-container'>
                    <div className='manage-handbook-content'>

                        <div
                            onClick={() => this.handleOnClickLogo()}
                            className='Handbook-logo'>
                            <div className='logo'></div>
                        </div>

                        <div className='title-container'>
                            <div className='Handbook-title'>Quản lý cẩm nang</div>
                            <div className='Handbook-description'>Thêm hoặc chỉnh sửa thông tin của cẩm nang</div>
                        </div>

                        <div className='Handbook-form'>

                            <div className="Handbook-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Cẩm nang</div>
                                    <div className="content-right">
                                        <div class="form-group d-flex justify-content-center">
                                            <div class="form-group col-12">
                                                <label for="inputAddress">Chọn cẩm nang</label>
                                                <Select
                                                    value={this.state.handbookSelected}
                                                    onChange={(event) => this.handleOnchangeInput(event, 'SELECT')}
                                                    options={this.state.handbookOptions}
                                                    id='select'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Handbook-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Thông tin</div>
                                    <div className="content-right">
                                        <div class="form-group d-flex justify-content-center">
                                            <div class="form-group col-12">
                                                <label for="inputAddress">Tên cẩm nang</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inputName"
                                                    placeholder="Tên cẩm nang"
                                                    value={this.state.title}
                                                    onChange={(event) => this.handleOnchangeInput(event, 'title')}
                                                ></input>
                                            </div>
                                        </div>

                                        <div class="form-group d-flex justify-content-center">
                                            <div class="form-group col-12">
                                                <label for="inputAddress">Chuyên khoa</label>
                                                <Select
                                                    value={this.state.specialtySelected}
                                                    onChange={(event) => this.handleOnchangeInput(event, 'SPECIALTY_SELECT')}
                                                    options={this.state.specialtyOptions}
                                                    id='select'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="Handbook-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className="content-left">Ảnh logo</div>
                                    <div className="content-right">
                                        {/* <label
                                            htmlFor="imagePreview"><FormattedMessage id="menu.admin.image"></FormattedMessage></label> */}
                                        <div className='image-content'>
                                            <div
                                                className="preview-box"
                                                style={{ backgroundImage: `url(${this.state.objectImageURL})` }}
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
                                                    onClick={() => this.handleDeleteImage('AVATAR')}
                                                    className='preview-button add-image btn btn-light'>
                                                    Xóa ảnh
                                                </button>
                                            </div>




                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="Handbook-section-container">
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

                            <div className="Handbook-section-container mt-5">
                                <div className="doctor-section-container">
                                    <div className='horizon-line'></div>
                                    <div className='Handbook-section-description margin-up'>
                                        <p><strong>LƯU Ý</strong></p>
                                        <p>Thông tin anh/chị cung cấp sẽ được sử dụng làm thông tin phòng khám, khi điền thông tin anh/chị vui lòng:</p>
                                        <ul>
                                            <li>Ghi rõ tên phòng khám, viết hoa chữ cái đầu tiên, ví dụ: <strong>Khoa sương khớp</strong></li>
                                            <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn &quot;Xác nhận&quot;</li>

                                        </ul>
                                    </div>
                                </div>
                                {this.state.hasOldData === true ? <button
                                    onClick={() => this.handleSubmitHandbook()}
                                    className='col-12 button-edit btn btn-primary'>Xác nhận sửa phòng khám</button> :

                                    <button
                                        onClick={() => this.handleSubmitHandbook()}
                                        className='col-12 button-submit'>Xác nhận tạo phòng khám</button>}

                            </div>

                        </div>

                        {this.state.isOpen === true &&
                            <Lightbox
                                mainSrc={this.state.objectImageURL}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />}

                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        allHandbook: state.admin.allHandbook,
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataHandbookStart: (type, id) => dispatch(actions.getDataHandbookStart(type, id)),
        createHandbookStart: (data) => dispatch(actions.createHandbookStart(data)),
        getAllSpecialtyStart: () => dispatch(actions.getAllSpecialtyStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);





