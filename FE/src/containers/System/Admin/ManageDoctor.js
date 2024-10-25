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
            clinicData: '',

            priceSelected: '',
            paymentSelected: '',
            provinceSelected: '',

            clinicName: '',
            clinicAddress: '',
            clinicDescription: '',


            clinicList: '',
            specialtyList: '',
            selectClinic: '',
            selectSpecialty: '',


        }
    }
    componentDidMount = async () => {
        await this.props.getAllDoctorsStart();
        await this.props.getDoctorInformationAllCodeStart();
        await this.props.getAllSpecialtyStart();
        await this.props.getAllClinicStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.allDoctors && prevProps.allDoctors !== this.props.allDoctors)
            || (this.props.priceData && prevProps.priceData !== this.props.priceData)
            || (this.props.allSpecialty && prevProps.allSpecialty !== this.props.allSpecialty)
            || (this.props.allClinic && prevProps.allClinic !== this.props.allClinic)
        ) {
            let priceData = this.builtDataInputSelect(this.props.priceData, 'PRICES');
            let paymentData = this.builtDataInputSelect(this.props.paymentData, 'PAYMENTS');
            let provinceData = this.builtDataInputSelect(this.props.provinceData, 'PROVINCES');
            let dataInputSelect = this.builtDataInputSelect(this.props.allDoctors, 'DOCTORS');
            let specialtyList = this.builtDataInputSelect(this.props.allSpecialty, 'SPECIALTY');
            let clinicList = this.builtDataInputSelect(this.props.allClinic, 'CLINIC');
            this.setState({
                allDoctors: dataInputSelect,
                selectedOption: dataInputSelect[0],
                priceData: priceData,
                paymentData: paymentData,
                provinceData: provinceData,
                priceSelected: priceData[0],
                paymentSelected: paymentData[0],
                provinceSelected: provinceData[0],
                specialtyList: specialtyList,
                clinicList: clinicList,
            });
            this.handleChange(dataInputSelect[0], 'DOCTORS');
        }

    }

    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
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
                else if (type === 'SPECIALTY' || type === 'CLINIC') {
                    object.value = item.id;
                    object.label = item.name;
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
                    let specialtySelected = '';
                    let clinicSelected = '';
                    console.log('test doctor', this.props.selectDoctor);
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

                    this.state.specialtyList.map(item => {
                        if (item.value === selectDoctor.doctorInforData.specialtyId) {
                            specialtySelected = item;
                        }
                    })

                    this.state.clinicList.map(item => {
                        if (item.value === selectDoctor.doctorInforData.clinicId) {
                            clinicSelected = item;
                        }
                    })



                    this.setState({
                        selectedOption: selectedOption,
                        description: selectDoctor.Markdown.description,
                        contentMarkdown: selectDoctor.Markdown.contentMarkdown,
                        contentHTML: selectDoctor.Markdown.contentHTML,

                        priceSelected: priceSelected,
                        paymentSelected: paymentSelected,
                        provinceSelected: provinceSelected,
                        selectSpecialty: specialtySelected,
                        selectClinic: clinicSelected,

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
            else {
                if (selectedOption.value && selectedOption.label) {
                    let copyState = { ...this.state }
                    copyState[type] = selectedOption;

                    this.setState({
                        ...copyState
                    })
                }
            }
            // else if (type === 'PAYMENTS') {
            //     if (selectedOption.value && selectedOption.label) {
            //         let copyState = { ...this.state }
            //         copyState.paymentSelected = selectedOption;
            //         this.setState({
            //             ...copyState
            //         })
            //     }
            // }
            // else if (type === 'PROVINCES') {

            //     if (selectedOption.value && selectedOption.label) {
            //         let copyState = { ...this.state }
            //         copyState.provinceSelected = selectedOption;
            //         this.setState({
            //             ...copyState
            //         })
            //     }
            // }
            // else if (type === 'SPECIALTY') {
            //     if (selectedOption.value && selectedOption.label) {
            //         let copyState = { ...this.state }
            //         copyState.selectSpecialty = selectedOption;
            //         this.setState({
            //             ...copyState
            //         })
            //     }
            // }

            // else if (type === 'CLINIC') {
            //     if (selectedOption.value && selectedOption.label) {
            //         let copyState = { ...this.state }
            //         copyState.selectClinic = selectedOption;
            //         this.setState({
            //             ...copyState
            //         })
            //     }
            // }
        }

    };

    checkValidateInput = () => {
        let result = true;
        let objectCheck = {
            description: this.state.description,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            clinicDescription: this.state.clinicDescription,
            contentMarkdown: this.state.contentMarkdown,
            specialty: this.state.selectSpecialty
        }
        if (!objectCheck.description) {
            result = false;
            toast(' Invalid description!',);
        }
        else if (!objectCheck.clinicName) {
            result = false;
            toast(' Invalid clinic name!',);
        }
        else if (!objectCheck.specialty) {
            result = false;
            toast(' Invalid specialty!',);
        }
        else if (!objectCheck.clinicDescription) {
            result = false;
            toast(' Invalid clinic description!',);
        }
        else if (!objectCheck.clinicAddress) {
            result = false;
            toast(' Invalid clinic address!',);
        }
        else if (!objectCheck.contentMarkdown) {
            result = false;
            toast(' Invalid content markdown!',);
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

                // clinicId: this.state.selectClinic.value,
                specialtyId: this.state.selectSpecialty.value,
                clinicId: this.state.selectClinic.value,

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
            clinicName, clinicAddress, clinicDescription,
            selectClinic, selectSpecialty, clinicList, specialtyList
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
                    <div
                        onClick={() => this.handleOnClickLogo()}
                        className='doctor-manage-logo'>
                        <div className='logo'></div>
                    </div>

                    <div className='title-container'>
                        <div className='doctor-manage-title'>QUẢN LÝ BÁC SĨ</div>
                        <div className='doctor-manage-description'>Thêm hoặc chỉnh sửa thông tin của bác sĩ</div>
                    </div>

                    <div className='content-down'>
                        <div className='horizon-line'></div>
                        <div className='preview-description'>
                            <div className='doctor-manage-section1'>
                                <div
                                    className='avatar'
                                    style={{ backgroundImage: `url(${this.state.avatar})` }}
                                >
                                </div>

                            </div>
                            <div className='doctor-manage-section2'>
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
                                                onChange={(event) => this.handleChange(event, "priceSelected")}
                                                options={priceData}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='select'>Phương thức thanh toán</label>
                                            <Select
                                                value={paymentSelected}
                                                onChange={(event) => this.handleChange(event, "paymentSelected")}
                                                options={paymentData}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='select'>Tỉnh thành</label>
                                            <Select
                                                value={provinceSelected}
                                                onChange={(event) => this.handleChange(event, "provinceSelected")}
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
                                        <label for="description">Chuyên nghành</label></div>
                                    <div className='content-right'>
                                        <div className='content-right-child'>
                                            <label for='select'>Chọn chuyên khoa</label>
                                            <Select
                                                value={selectSpecialty}
                                                onChange={(event) => this.handleChange(event, "selectSpecialty")}
                                                options={specialtyList}
                                                id='select'
                                            />
                                        </div>
                                        <div className='content-right-child'>
                                            <label for='select'>Chọn phòng khám</label>
                                            <Select
                                                value={selectClinic}
                                                onChange={(event) => this.handleChange(event, "selectClinic")}
                                                options={clinicList}
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

                            <div className="doctor-section-container">
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
                                {this.state.hasOldData === true ? <button
                                    onClick={() => this.handleOnclickMarkDown()}
                                    className='col-12 button-edit btn btn-primary'>Xác nhận sửa thông tin bác sĩ</button> :

                                    <button
                                        onClick={() => this.handleOnclickMarkDown()}
                                        className='col-12 button-submit'>Xác nhận tạo thông tin bác sĩ</button>}

                            </div>

                        </div>
                    </div>
                </div >

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
        provinceData: state.admin.provinceData,
        allSpecialty: state.admin.allSpecialty,
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsStart: () => dispatch(actions.getAllDoctorsStart()),
        saveSelectDoctorStart: (inforDoctor) => dispatch(actions.saveSelectDoctorStart(inforDoctor)),
        getSelectDoctorStart: (id) => dispatch(actions.getSelectDoctorStart(id)),
        getDoctorInformationAllCodeStart: () => dispatch(actions.getDoctorInformationAllCodeStart()),
        getAllSpecialtyStart: () => dispatch(actions.getAllSpecialtyStart()),
        getAllClinicStart: () => dispatch(actions.getAllClinicStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
