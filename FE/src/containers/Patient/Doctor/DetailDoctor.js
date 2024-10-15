import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorInformation from './DoctorInformation';
import HomeFooter from '../../HomePage/Section/HomeFooter';
import DoctorDetailTag from './DoctorDetailTag';
class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            address: '',
            avatar: '',
            phoneNumber: '',
            positionVi: '',
            positionEn: '',

            description: '',
            contentMarkdown: '',
            contentHTML: ''
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            //this.props.getSelectDoctorStart(this.props.match.params.id);
            this.setState({
                id: this.props.match.params.id
            })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language != this.props.language) {
            this.componentDidMount();
        }

        if (prevProps.selectDoctor !== this.props.selectDoctor) {
            let copySelectDoctor = { ...this.props.selectDoctor };
            if (copySelectDoctor && copySelectDoctor.avatar) {
                copySelectDoctor.avatar = new Buffer(copySelectDoctor.avatar, 'base64').toString('binary');
            }
            let copyState = { ...this.state };
            copyState.selectDoctor = this.props.selectDoctor;
            if (copySelectDoctor.firstName && copySelectDoctor.lastName) {
                copyState.id = copySelectDoctor.id;
                copyState.firstName = copySelectDoctor.firstName;
                copyState.lastName = copySelectDoctor.lastName;
                copyState.address = copySelectDoctor.address;
                copyState.avatar = copySelectDoctor.avatar;
                copyState.phoneNumber = copySelectDoctor.phoneNumber;
            }
            if (copySelectDoctor.positionData) {
                copyState.positionVi = copySelectDoctor.positionData.valueVi;
                copyState.positionEn = copySelectDoctor.positionData.valueEn;
            }
            if (copySelectDoctor.Markdown) {
                copyState.description = copySelectDoctor.Markdown.description;
                copyState.contentMarkdown = copySelectDoctor.Markdown.contentMarkdown;
                copyState.contentHTML = copySelectDoctor.Markdown.contentHTML
            }
            this.setState({
                ...copyState
            })

        }

    }

    render() {


        let {
            id,
            firstName,
            lastName,
            address,
            avatar,
            phoneNumber,
            positionVi,
            positionEn,
            description,
            contentMarkdown,
            contentHTML
        } = this.state;
        let language = this.props.language;
        return (
            <>

                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <DoctorDetailTag
                        doctorId={this.state.id}
                        doctorDescriptionIsShow={true}
                    ></DoctorDetailTag>
                </div>

                <div className='schedule-container'>
                    <div className='schedule-content'>
                        <div className='content-left'><DoctorSchedule
                            doctorId={this.state.id}
                        ></DoctorSchedule></div>
                        <div className='content-right'>
                            <DoctorInformation
                                doctorId={this.state.id}
                            ></DoctorInformation>
                        </div>
                    </div>
                </div>

                <div className='doctor-detail-markdown'>
                    <div className='doctor-detail-markdown-content'>
                        <div
                            contentEditable='false'
                            dangerouslySetInnerHTML={{ __html: contentHTML }}
                            className='markdown-content-html'
                        ></div>
                    </div>
                </div>
                <HomeFooter></HomeFooter>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        selectDoctor: state.admin.selectDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSelectDoctorStart: (id) => dispatch(actions.getSelectDoctorStart(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
