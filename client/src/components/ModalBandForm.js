import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CustomAlert from "./CustomAlert";
import { Context } from '../context/appContext';


const ModalBandForm = (props)=>{
    const {show, toggleFunction, variant, band} = props;
    const {state, apiCreateBand, apiUpdateBand} = useContext(Context);
    const [alertProps, setAlertProps] = useState({show:false,message:'',variant:'info'});
    const [newBand, setNewBand] = useState( 
        {
            name : '',
            genre : '',
            image : '',
            favourite_album : '',
            favourite_song : ''
        }
    );


    const changeValue = (e) => {
        e.persist();
        let changedBand = {
            ...newBand
        };
        changedBand[e.target.name] = e.target.value;
        setNewBand(changedBand);
    }

    const saveBand = () => {
        switch(variant) {
            case 'Create':
                createBand()
                break;
            case 'Update':
                updateBand()
                break;
            default:
                break;
        }
    }

    useEffect( ()=>{
        if(band)
        {
            setNewBand(band)
        }
    },[band])

    const createBand = () => {
        apiCreateBand(newBand, state.bands, (message,success)=>{
            if(!success)
            {
                setAlertProps(
                    {
                        message,
                        show: true,
                        variant: 'danger'
                    }
                );
                return;
            }
            setAlertProps({show:false,message:'',variant:'info'});
            toggleFunction(false);
        })
    }

    const updateBand = () => {
        apiUpdateBand(newBand, (message,success)=>{
            if(!success)
            {
                setAlertProps(
                    {
                        message,
                        show: true,
                        variant: 'danger'
                    }
                );
                return;
            }
            setAlertProps({show:false,message:'',variant:'info'});
            toggleFunction(false);
        })
    }

    const close = () => {
        setNewBand({
            name : '',
            genre : '',
            image : '',
            favourite_album : '',
            favourite_song : ''
        });
        setAlertProps({show:false,message:'',variant:'info'});
        toggleFunction(false);
    }


    return (
        <React.Fragment>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>{variant} band</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomAlert alertProps={alertProps}/>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter the band name" 
                                value={newBand?.name}
                                onChange={(e)=>changeValue(e)}
                                name='name'
                            />
                            <Form.Text className="text-muted">
                                Name field is required.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter the band genre" 
                                value={newBand?.genre}
                                onChange={(e)=>changeValue(e)}
                                name='genre'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Image url</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter image url" 
                                value={newBand?.image}
                                onChange={(e)=>changeValue(e)}
                                name='image'
                            />
                            <Form.Text className="text-muted">
                                Enter a valid image url as a cover image.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAlbum">
                            <Form.Label>Favourite Album</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your favourite album" 
                                value={newBand?.favourite_album}
                                onChange={(e)=>changeValue(e)}
                                name='favourite_album'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSong">
                            <Form.Label>Favourite song</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your favourite song" 
                                value={newBand?.favourite_song}
                                onChange={(e)=>changeValue(e)}
                                name='favourite_song'
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={saveBand}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
      );
}


export default ModalBandForm;



