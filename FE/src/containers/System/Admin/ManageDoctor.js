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
import { Bounce, ToastContainer, toast } from 'react-toastify';
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
            paymentData: '',
            provinceData: '',

            priceSelected: '',
            paymentSelected: '',
            provinceSelected: '',

            clinicName: '',
            clinicAddress: '',
            clinicDescription: '',

        }
    }
    componentDidMount = async () => {
        await this.props.getAllDoctorsStart();
        await this.props.getDoctorInformationAllCodeStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.allDoctors && prevProps.allDoctors !== this.props.allDoctors)
            || (this.props.priceData && prevProps.priceData !== this.props.priceData)
        ) {
            let priceData = this.builtDataInputSelect(this.props.priceData, 'PRICES');
            let paymentData = this.builtDataInputSelect(this.props.paymentData, 'PAYMENTS');
            let provinceData = this.builtDataInputSelect(this.props.provinceData, 'PROVINCES');
            let dataInputSelect = this.builtDataInputSelect(this.props.allDoctors, 'DOCTORS');
            this.setState({
                allDoctors: dataInputSelect,
                selectedOption: dataInputSelect[0],
                priceData: priceData,
                paymentData: paymentData,
                provinceData: provinceData,
                priceSelected: priceData[0],
                paymentSelected: paymentData[0],
                provinceSelected: provinceData[0]
            });
            this.handleChange(dataInputSelect[0], 'DOCTORS');
        }
    }


    builtDataInputSelect = (inputData, type) => {
        let result = [];

        if (inputData) {
            inputData.map((item, index) => {
                let object = {};
                if (type === 'DOCTORS') {
                    let valueVi = item.firstName + " " + item.lastName;
                    let valueEn = item.lastName + " " + item.firstName;

                    object.value = item.id;
                    object.label = this.props.language === LANGUAGES.VI ? valueVi : valueEn;
                }
                else {
                    object.value = item.id;
                    object.label = this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                }

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

    handleChange = async (selectedOption, type) => {
        if (selectedOption && selectedOption.value) {
            if (type === 'DOCTORS') {
                await this.props.getSelectDoctorStart(selectedOption.value);
                let selectDoctor = this.props.selectDoctor;
                if (selectDoctor && selectDoctor.Markdown && selectDoctor.doctorInforData && selectDoctor.doctorInforData.priceId) {
                    let priceSelected = '';
                    let paymentSelected = '';
                    let provinceSelected = '';
                    this.state.priceData.map(item => {
                        if (item.value === selectDoctor.doctorInforData.priceId) {
                            priceSelected = item;
                        };
                    })

                    this.state.paymentData.map(item => {
                        if (item.value === selectDoctor.doctorInforData.paymentId) {
                            paymentSelected = item;
                        };
                    })

                    this.state.provinceData.map(item => {
                        if (item.value === selectDoctor.doctorInforData.provinceId) {
                            provinceSelected = item;
                        };
                    })



                    this.setState({
                        selectedOption: selectedOption,
                        description: selectDoctor.Markdown.description,
                        contentMarkdown: selectDoctor.Markdown.contentMarkdown,
                        contentHTML: selectDoctor.Markdown.contentHTML,

                        priceSelected: priceSelected,
                        paymentSelected: paymentSelected,
                        provinceSelected: provinceSelected,

                        clinicName: selectDoctor.doctorInforData.nameClinic,
                        clinicAddress: selectDoctor.doctorInforData.addressClinic,
                        clinicDescription: selectDoctor.doctorInforData.note,
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
                        priceSelected: this.state.priceData[0],
                        paymentSelected: this.state.paymentData[0],
                        provinceSelected: this.state.provinceData[0],
                        clinicAddress: '',
                        clinicName: '',
                        clinicDescription: '',
                        hasOldData: false,
                    })
                }
            }
            else if (type === 'PRICES') {
                if (selectedOption.value && selectedOption.label) {
                    let copyState = { ...this.state }
                    copyState.priceSelected = selectedOption;

                    this.setState({
                        ...copyState
                    })
                }
            }
            else if (type === 'PAYMENTS') {
                if (selectedOption.value && selectedOption.label) {
                    let copyState = { ...this.state }
                    copyState.paymentSelected = selectedOption;
                    this.setState({
                        ...copyState
                    })
                }
            }
            else if (type === 'PROVINCES') {

                if (selectedOption.value && selectedOption.label) {
                    let copyState = { ...this.state }
                    copyState.provinceSelected = selectedOption;
                    this.setState({
                        ...copyState
                    })
                }
            }
        }

    };

    checkValidateInput = () => {
        let result = true;
        let objectCheck = {
            description: this.state.description,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            clinicDescription: this.state.clinicDescription,
            contentMarkdown: this.state.contentMarkdown
        }
        if (!objectCheck.description) {
            result = false;
            toast(' Invalid description!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else if (!objectCheck.clinicName) {
            result = false;
            toast(' Invalid description!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else if (!objectCheck.clinicDescription) {
            result = false;
            toast(' Invalid description!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else if (!objectCheck.clinicAddress) {
            result = false;
            toast(' Invalid description!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else if (!objectCheck.contentMarkdown) {
            result = false;
            toast(' Invalid description!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

        return result;
    }
    handleOnclickMarkDown = (event) => {

        if (this.checkValidateInput() === true) {
            this.props.saveSelectDoctorStart({
                doctorId: this.state.selectedOption.value,
                description: this.state.description,


                priceSelected: this.state.priceSelected.value,
                paymentSelected: this.state.paymentSelected.value,
                provinceSelected: this.state.provinceSelected.value,

                clinicName: this.state.clinicName,
                clinicAddress: this.state.clinicAddress,
                clinicDescription: this.state.clinicDescription,

                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,

                action: this.state.hasOldData ? ACTIONS.EDIT : ACTIONS.CREATE
            })

            if (this.state.hasOldData === false) {
                this.setState({ hasOldData: !this.state.hasOldData })
            }

        }
    }

    handleDescriptionArea = (event, type) => {
        if (type === 'DESCRIPTION') {
            let copyState = { ...this.state };
            copyState.description = event.target.value;
            this.setState({
                ...copyState
            })
        }
        else if (type === 'CLINICNAME') {
            let copyState = { ...this.state };
            copyState.clinicName = event.target.value;
            this.setState({
                ...copyState
            })
        }
        else if (type === 'CLINICADDRESS') {
            let copyState = { ...this.state };
            copyState.clinicAddress = event.target.value;
            this.setState({
                ...copyState
            })
        }
        else if (type === 'CLINICDESCRIPTION') {
            let copyState = { ...this.state };
            copyState.clinicDescription = event.target.value;
            this.setState({
                ...copyState
            })
        }

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
        let { selectedOption, avatar, positionEn, positionVi, firstName, lastName,
            priceData, paymentData, provinceData,
            priceSelected, paymentSelected, provinceSelected,
            clinicName, clinicAddress, clinicDescription
        } = this.state;

        const mdParser = new MarkdownIt(/* Markdown-it options */);
        let object = this.handlePreviewDescription();

        if (object && object.positionData && object.positionData.valueEn && object.positionData.valueVi) {
            positionEn = object.positionData.valueEn;
            positionVi = object.positionData.valueVi;
            firstName = object.firstName;
            lastName = object.lastName;
        }



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
                                                onChange={(event) => this.handleChange(event, 'DOCTORS')}
                                                options={this.state.allDoctors}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='textarea'>Thông tin bác sĩ</label>
                                            <textarea
                                                onChange={(event) => this.handleDescriptionArea(event, 'DESCRIPTION')}
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
                                                value={priceSelected}
                                                onChange={(event) => this.handleChange(event, 'PRICES')}
                                                options={priceData}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='select'>Phương thức thanh toán</label>
                                            <Select
                                                value={paymentSelected}
                                                onChange={(event) => this.handleChange(event, 'PAYMENTS')}
                                                options={paymentData}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='select'>Tỉnh thành</label>
                                            <Select
                                                value={provinceSelected}
                                                onChange={(event) => this.handleChange(event, 'PROVINCES')}
                                                options={provinceData}
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
                                            <input
                                                value={clinicName}
                                                onChange={(event) => this.handleDescriptionArea(event, "CLINICNAME")}
                                                className='form-control h-25'></input>
                                        </div>
                                        <div className='content-right-child'>
                                            <label>Địa chỉ phòng khám</label>
                                            <textarea
                                                onChange={(event) => this.handleDescriptionArea(event, 'CLINICADDRESS')}
                                                id='description'
                                                className="form-control "
                                                value={clinicAddress}
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
                                                onChange={(event) => this.handleDescriptionArea(event, 'CLINICDESCRIPTION')}
                                                id='description'
                                                className="form-control "
                                                value={clinicDescription}

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
        paymentData: state.admin.paymentData,
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
