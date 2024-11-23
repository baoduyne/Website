import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _, { size } from 'lodash';
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
import { ACTIONS } from '../../../utils/constant';
class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getAllSpecialtyStart();
    }



    componentDidUpdate = (prevProps, prevState) => {



    }








    handleOnClickLogo = () => {
        if (this.props.location.pathname !== '/home') {
            this.props.history.push(`/home`);
        }
    }



    render() {

        const mdParser = new MarkdownIt(/* Markdown-it options */);
        return (
            <>

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createSpecialtyStart: (data) => dispatch(actions.createSpecialtyStart(data)),
        getAllSpecialtyStart: () => dispatch(actions.getAllSpecialtyStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);





