import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { editUserService } from '../../../services/userService'
class EditUserModal extends Component {
    constructor(props){
        super(props);
        this.state = {  
            firstName :'',
            lastName :'',
            address :'',
        }
    }

    componentDidMount(){
       
    }

    toggle = () =>{
        this.props.toggle();
    }

    handleEditUser =async () =>{
        try{
            let res = await editUserService(this.state);

        }
        catch(e){
            console.log(e);
        }
    }
    render(){
        return(
            <div>
        <Modal
        isOpen={this.props.isOpenEditUserModal}
        toggle={()=>this.toggle()}
        >
        <ModalHeader toggle={()=>this.toggle()}>Modal title</ModalHeader>
        <ModalBody>
            <div >
            <label for = "email">Email</label>
            <input value = {this.props.user.email} name = "email" type = "text" disabled></input>
            <label for = "firstName">First Name</label>
            <input value = {this.props.user.firstName} name = "firstName" type = "text" ></input>
            <label for = "lastName">Last Name</label>
            <input value = {this.props.user.lastName} name ="lastName" type = "text"></input>
            <label for = "address">Address</label>
            <input value = {this.props.user.address} name = "address"type = "text"></input>
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>this.handleEditUser()}>
           Edit
          </Button>{' '}
          <Button color="secondary" onClick={()=>this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);