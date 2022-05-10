import React from 'react';
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({show,handleUserResponse,name}) => {
  
    return (
      <React.Fragment>
            <Modal show={show} onHide={()=>handleUserResponse(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {name}?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>handleUserResponse(false)}>
                    Cancel
                </Button>
                <Button variant="warning" onClick={()=>handleUserResponse(true)}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
      </React.Fragment>
    );
  }
  
  export default DeleteConfirmation;