import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './SpecialtyDetail.scss';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
class SpecialtyDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    componentDidMount = async () => {


    }


    componentDidUpdate = async (prevProps, prevState) => {

    }




    render() {


        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                ></HomeHeader>
                test
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCode: state.admin.times,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodeStart: () => dispatch(actions.fetchAllCodeStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail));
