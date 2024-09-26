import React, { Component } from 'react';
import { connect } from "react-redux";
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            description: '',
            contentMarkdown: '',
            contentHTML: '',
            allDoctors: '',
            avatar: '',
        }
    }
    componentDidMount = async () => {
        await this.props.getAllDoctorsStart();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataInputSelect = this.builtDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: dataInputSelect,
                selectedOption: dataInputSelect[0]
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataInputSelect = this.builtDataInputSelect(this.props.allDoctors);
            this.setState({ allDoctors: dataInputSelect });
        }

        // if(prevState)
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


    handleChange = (selectedOption) => {
        let copyState = { ...this.state };
        copyState.selectedOption = selectedOption;

        this.setState({
            ...copyState
        })

    };

    handleOnclickMarkDown = (event) => {
        this.props.saveSelectDoctorStart({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
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
        const { selectedOption, avatar } = this.state;
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        let object = this.handlePreviewDescription();
        let valueVi = '';
        let valueEn = '';
        if (object.positionData) { valueVi = object.positionData.valueVi; }
        if (object.positionData) { valueEn = object.positionData.valueEn; }

        console.log('ttttt', object);
        console.log('ttttt1111', object.positionData);
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>MANAGE DOCTORS FROM ADMIN</div>
                <div className='manage-doctor-content'>
                    <div className='section1'>
                        <div className='content-left'>
                            <div className='chose-doctor'>
                                <label>Chọn bác sĩ</label>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.allDoctors}
                                />
                            </div>
                            <div className='description'>
                                <label for="description">Thông tin bác sĩ</label>
                                <textarea
                                    onChange={(event) => this.handleDescriptionArea(event)}
                                    id='description'
                                    className="form-control "
                                    value={this.state.description}
                                    
                                ></textarea>
                            </div>


                        </div>
                        <div className='content-right'>
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
                                            valueVi + ' ' + object.firstName + ' ' + object.lastName :
                                            valueEn + ' ' + object.lastName + ' ' + object.firstName}
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
                    </div>
                    <div className='section2'>
                        <div className='markdown'>
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange} />
                            <button onClick={(event) => this.handleOnclickMarkDown(event)} className='markdown-btn btn btn-primary'>Save</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ManageDoctorMenuPath: state.app.ManageDoctorMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        data: state.user,
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorsStart: () => dispatch(actions.getAllDoctorsStart()),
        saveSelectDoctorStart: (inforDoctor) => dispatch(actions.saveSelectDoctorStart(inforDoctor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);