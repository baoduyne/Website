import React, { Component } from 'react';
import { connect } from "react-redux";
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { ACTIONS, LANGUAGES } from '../../../utils/constant';
import _ from 'lodash';
// import Button from '@mui/material/Button';

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,

            firstName: '',
            lastName: '',
            positionVi: '',
            positionEn: '',

            description: '',
            contentMarkdown: '',
            contentHTML: '',
            allDoctors: '',
            avatar: '',
            hasOldData: false,
            action: '',

            priceData: '',
            provinceData: ''

        }
    }
    componentDidMount = async () => {
        await this.props.getAllDoctorsStart();
        await this.props.getDoctorInformationAllCodeStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allDoctors && prevProps.allDoctors !== this.props.allDoctors) {
            let dataInputSelect = this.builtDataInputSelect(this.props.allDoctors);
            this.handleChange(dataInputSelect[0]);
            this.setState({
                allDoctors: dataInputSelect,
                selectedOption: dataInputSelect[0]
            });
        }

        if (this.props.priceData && prevProps.priceData !== this.props.priceData) {
            this.setState({
                priceData: this.props.priceData,
                provinceData: this.props.provinceData
            })
        }
    }


    builtDataInputSelect = (inputData) => {
        let result = [];

        if (inputData) {
            inputData.map((item, index) => {
                let object = {};
                let valueVi = item.firstName + " " + item.lastName;
                let valueEn = item.lastName + " " + item.firstName;

                object.value = item.id;
                object.label = this.props.language === LANGUAGES.VI ? valueVi : valueEn;

                result.push(object)
            })
        }

        return result;
    }


    handleEditorChange = (html, text) => {
        let copyState = { ...this.state };
        copyState.contentHTML = html.html;
        copyState.contentMarkdown = html.text;
        this.setState({
            ...copyState
        })
    }


    handleChange = async (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            await this.props.getSelectDoctorStart(selectedOption.value);
            let selectDoctor = this.props.selectDoctor;
            if (selectDoctor && selectDoctor.Markdown) {
                this.setState({
                    selectedOption: selectedOption,
                    description: selectDoctor.Markdown.description,
                    contentMarkdown: selectDoctor.Markdown.contentMarkdown,
                    contentHTML: selectDoctor.Markdown.contentHTML,
                    hasOldData: true,
                })
            } else {
                let copyState = { ...this.state };
                copyState.selectedOption = selectedOption;
                this.setState({
                    selectedOption: selectedOption,
                    description: '',
                    contentMarkdown: '',
                    contentHTML: '',
                    hasOldData: false,
                })
            }
        }

    };

    handleOnclickMarkDown = (event) => {
        this.props.saveSelectDoctorStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: this.state.hasOldData ? ACTIONS.EDIT : ACTIONS.CREATE
        })
    }

    handleDescriptionArea = (event) => {
        let copyState = { ...this.state };
        copyState.description = event.target.value;
        this.setState({
            ...copyState
        })

    }

    handlePreviewDescription = () => {
        let object = {};

        if (this.state.allDoctors && this.state.allDoctors.length > 0 && this.props.allDoctors) {
            this.props.allDoctors.map((item, index) => {

                if (item.id === this.state.selectedOption.value) {
                    object = item;
                }

            })
        }
        let avtBase64 = '';
        if (object.avatar) {
            avtBase64 = new Buffer(object.avatar, 'base64').toString('binary');
        }
        if (avtBase64 !== '' && avtBase64 !== this.state.avatar) {
            this.setState({
                avatar: avtBase64
            })
        }

        return object;
    }

    render() {
        let { selectedOption, avatar, positionEn, positionVi, firstName, lastName } = this.state;
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        let object = this.handlePreviewDescription();

        if (object && object.positionData && object.positionData.valueEn && object.positionData.valueVi) {
            positionEn = object.positionData.valueEn;
            positionVi = object.positionData.valueVi;
            firstName = object.firstName;
            lastName = object.lastName;
        }

        console.log('check state', this.state)

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-content-up'>

                    <div className='content-down'>
                        <div className='preview-description'>
                            <div className='section1'>
                                <div
                                    className='avatar'
                                    style={{ backgroundImage: `url(${this.state.avatar})` }}
                                >
                                </div>

                            </div>
                            <div className='section2'>
                                <div className='name-doctor'>
                                    {this.props.language === LANGUAGES.VI ?
                                        positionVi + ' ' + firstName + ' ' + lastName :
                                        positionEn + ' ' + lastName + ' ' + firstName}
                                </div>
                                <div className='description'>
                                    <div className='text-description'>
                                        {this.state.description}
                                    </div>
                                    <div className='address-description'>
                                        <i class="fas fa-map-marker-alt"></i>
                                        <p>{object.address}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className='section1'>
                        <div className='content-up'>


                            <div className="doctor-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className='content-left'>
                                        Chọn bác sĩ
                                    </div>
                                    <div className='content-right'>

                                        <div className='content-right-child'>
                                            <label for='select'>Bác sĩ</label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.allDoctors}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='textarea'>Thông tin bác sĩ</label>
                                            <textarea
                                                onChange={(event) => this.handleDescriptionArea(event)}
                                                className="form-control "
                                                value={this.state.description}
                                                id='textarea'
                                            ></textarea>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="doctor-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className='content-left'>
                                        <label for="description">Thông tin bác sĩ</label></div>
                                    <div className='content-right'>
                                        <div className='content-right-child'>
                                            <label for='select'>Giá khám bệnh</label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.allDoctors}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='select'>Phương thức thanh toán</label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.allDoctors}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='select'>Tỉnh thành</label>
                                            <Select
                                                value={selectedOption}
                                                onChange={this.handleChange}
                                                options={this.state.allDoctors}
                                                id='select'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="doctor-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className='content-left'>
                                        <label for="description">Phòng khám</label></div>
                                    <div className='content-right'>
                                        <div className='content-right-child'>
                                            <label>Tên phòng khám</label>
                                            <input className='form-control h-25'></input>
                                        </div>
                                        <div className='content-right-child'>
                                            <label>Địa chỉ phòng khám</label>
                                            <textarea
                                                onChange={(event) => this.handleDescriptionArea(event)}
                                                id='description'
                                                className="form-control "
                                                value={''}

                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="doctor-section-container">
                                <div className='horizon-line'></div>
                                <div className="section-content">
                                    <div className='content-left'>
                                        <label for="description">Thông tin bổ sung</label></div>
                                    <div className='content-right'>
                                        <div className='content-right-child'>
                                            <label className=''>Ghi chú</label>
                                            <textarea
                                                onChange={(event) => this.handleDescriptionArea(event)}
                                                id='description'
                                                className="form-control "
                                                value={''}

                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div >



                <div className='section2'>
                    <div className='markdown'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                        <button
                            onClick={(event) => this.handleOnclickMarkDown(event)}
                            className={this.state.hasOldData ? 'markdown-btn btn btn-info' : 'markdown-btn btn btn-primary'}
                        >{this.state.hasOldData ? 'Change' : 'Save'}</button>
                    </div>
                </div>

            </div >

        );
    }
}

const mapStateToProps = state => {
    return {
        ManageDoctorMenuPath: state.app.ManageDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        data: state.user,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        selectDoctor: state.admin.selectDoctor,
        priceData: state.admin.priceData,
        provinceData: state.admin.provinceData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsStart: () => dispatch(actions.getAllDoctorsStart()),
        saveSelectDoctorStart: (inforDoctor) => dispatch(actions.saveSelectDoctorStart(inforDoctor)),
        getSelectDoctorStart: (id) => dispatch(actions.getSelectDoctorStart(id)),
        getDoctorInformationAllCodeStart: () => dispatch(actions.getDoctorInformationAllCodeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
