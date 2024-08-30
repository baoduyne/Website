import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
       
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id : user.id,
                email: user.email,
                password: "hashPassword",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
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

    handleSaveUser = () =>{
        let isValid = this.checkValideInput();
        
        if(isValid === true){
           
            this.props.editUser(this.state);
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
                <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
                <ModalBody
                    className="modal-user-body">


                    <div className='input-container'>
                        <label>Email</label>
                        <input
                            type="text"
                            className='input'
                            onChange={(event) => this.handleOnchangeInput(event, "email")}
                            value={this.state.email}
                            disabled
                        ></input>

                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input
                            type="password"
                            className='input'
                            onChange={(event) => this.handleOnchangeInput(event, 'password')}
                            value={this.state.password}
                            disabled
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
                    <Button color="primary" onClick={(event) => this.handleSaveUser(event)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





