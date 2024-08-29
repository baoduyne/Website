import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',() => {
            this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
            })
        })
        
    }
    componentDidMount() {
        console.log("mouting modal")
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) => {
      let copyState = this.state;
      copyState[id] = event.target.value;
      this.setState({
        ...copyState
      },() =>{
        
      })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing ' + arrInput[i] + "'s parameter")
                break;
            }
        }
        return true;
    }

    handleAddNewUser = (event) => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
          this.props.createNewUser(this.state);
        }
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
                        <input
                            type="text"
                            className='input'
                            onChange={(event) => this.handleOnchangeInput(event, "email")}
                            value={this.state.email}
                        ></input>

                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input
                            type="password"
                            className='input'
                            onChange={(event) => this.handleOnchangeInput(event, 'password')}
                            value={this.state.password}
                        ></input>
                    </div>
                    <div className='input-container'>
                        <label>FirstName</label>
                        <input
                            type="text"
                            className='input'
                            onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                            value={this.state.firstName}
                        ></input>
                    </div>
                    <div className='input-container'>
                        <label>LastName</label>
                        <input
                            type="text"
                            className='input'
                            onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                            value={this.state.lastName}
                        ></input>
                    </div>
                    <div className='input-container address'>
                        <label>Address</label>
                        <input
                            type="text"
                            className='input'
                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                            value={this.state.address}
                        ></input>
                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(event) => this.handleAddNewUser(event)}>
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





