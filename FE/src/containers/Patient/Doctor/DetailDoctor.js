import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomeHeader from '../../HomePage/HomeHeader';
class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {
       
    }

    render() {
        let id = this.props.match.params.id;
        return (
            <>
                <HomeHeader isShowBanner = {false}/>
                
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language : state.app.language,       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorStart: (limit) => dispatch(actions.fetchTopDoctorStart(limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
