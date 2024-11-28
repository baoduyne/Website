import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES, TYPE } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomeHeader from '../../HomePage/HomeHeader';
import './List.scss';
import HomeFooter from '../../HomePage/Section/HomeFooter';
class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            allSpecialty: '',
            arrIdDoctor: '',
            allClinic: '',

        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            //this.props.getSelectDoctorStart(this.props.match.params.id);
            this.setState({
                type: this.props.match.params.type
            })

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language != this.props.language) {
            this.componentDidMount();
        }

        if (this.props.match.params !== prevProps.match.params && this.props.match.params) {
            this.setState({
                type: this.props.match.params.type
            })
        }

        if (prevProps.allSpecialty !== this.props.allSpecialty && this.props.allSpecialty) {
            this.setState({
                allSpecialty: this.props.allSpecialty
            })
        }
        if (prevProps.arrDoctorId !== this.props.arrDoctorId && this.props.arrDoctorId) {
            this.setState({
                arrDoctorId: this.props.arrDoctorId
            })
        }
        if (prevProps.allClinic !== this.props.allClinic && this.props.allClinic) {
            this.setState({
                allClinic: this.props.allClinic
            })
        }



        if (prevState.type !== this.state.type && this.state.type) {
            if (this.state.type === TYPE.SPECIALTY) {
                this.props.getAllSpecialtyStart()
            }
            else if (this.state.type === TYPE.DOCTOR) {
                this.props.getDetailSpecialtyStart('ALL', 'ALL', 'DOCTOR')
            }
            else if (this.state.type === TYPE.CLINIC) {
                this.props.getAllClinicStart()
            }
        }

    }

    handleOnClickSpecialty = (specialty) => {
        this.props.history.push(`/specialty-detail/${specialty.id}`)
    }
    handleOnClickClinic = (clinic) => {
        this.props.history.push(`/clinic-detail/${clinic.id}`)
    }

    render() {
        let {
            type, allSpecialty, allClinic
        } = this.state;
        let language = this.props.language;
        console.log('state', this.state)
        return (
            <>

                <HomeHeader isShowBanner={false} />
                <div className='list-container'>
                    <div className='list-content'>

                        {type && type === TYPE.CLINIC && allClinic && allClinic.length > 0 && allClinic.map(item => {
                            let base64Image = new Buffer(item.image, 'base64').toString('binary');
                            return (
                                <div
                                    onClick={() => this.handleOnClickClinic(item)}
                                    className='list-specialty-child list-specialty-child-clinic'  >
                                    <div className='list-specialty-content '>
                                        <div
                                            style={{ backgroundImage: `url(${base64Image})` }}
                                            className='list-specialty-left'></div>
                                        <div className='list-specialty-right list-specialty-child-clinic'>{item.name}</div>
                                    </div>
                                </div>
                            )

                        })}

                        {type && type === TYPE.SPECIALTY && allSpecialty && allSpecialty.length > 0 && allSpecialty.map(item => {
                            let base64Image = new Buffer(item.image, 'base64').toString('binary');
                            return (
                                <div
                                    onClick={() => this.handleOnClickSpecialty(item)}
                                    className='list-specialty-child' >
                                    <div className='list-specialty-content '>
                                        <div
                                            style={{ backgroundImage: `url(${base64Image})` }}
                                            className='list-specialty-left'></div>
                                        <div className='list-specialty-right'>{item.name}</div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div >

                <HomeFooter></HomeFooter>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allSpecialty: state.admin.allSpecialty,
        arrDoctorId: state.patient.arrDoctorId,
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailSpecialtyStart: (specialtyId, provinceId, type) => dispatch(actions.getDetailSpecialtyStart(specialtyId, provinceId, type)),
        getAllSpecialtyStart: () => dispatch(actions.getAllSpecialtyStart()),
        getAllClinicStart: () => dispatch(actions.getAllClinicStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
