import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();

    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                className='modal-user-container'
                centered
            >   
                <ModalHeader toggle={() => this.toogle()}>Modal title</ModalHeader>
                <ModalBody
                    className="modal-user-body">


                    <div className='input-container'>
                        <label>Email</label>
                        <input type="text" className='input'></input>

                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input type="password" className='input'></input>
                    </div>
                    <div className='input-container'>
                        <label>FirstName</label>
                        <input type="text" className='input'></input>
                    </div>
                    <div className='input-container'>
                        <label>LastName</label>
                        <input type="text" className='input'></input>
                    </div>
                    <div className='input-container address'>
                        <label>Address</label>
                        <input type="text" className='input'></input>
                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





