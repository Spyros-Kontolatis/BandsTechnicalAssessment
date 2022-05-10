import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BandCard from '../components/BandCard';
import { Context } from '../context/appContext';
import DeleteConfirmation from "../components/DeleteConfirmation";
import ModalBandForm from '../components/ModalBandForm';
import CustomAlert from "../components/CustomAlert";
import { Button } from "react-bootstrap";


const Bands = () => {
    const {state, apiGetAllBands, apiDeleteBand} = useContext(Context);
    const navigate = useNavigate();
    const [alertProps, setAlertProps] = useState({show:false,message:'',variant:'info'});
    const [showDelete, setShowDelete] = useState(false);
    const [showBandForm, setShowBandForm] = useState(false);
    const [currentBand, setCurrentBand] = useState(null);


    const deleteBand = (userResponse) => {
        if(userResponse)
        {
            apiDeleteBand(currentBand, state.bands , (message,success)=>{
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
                setAlertProps({
                    message,
                    show: true,
                    variant: 'success'
                });
            })
        }
        setShowDelete(false);
    }

    const openDeleteModal = (band) => {
        setCurrentBand(band);
        setShowDelete(true)
    }

    const viewBand = (band) => {
        navigate(`/band/${band._id}`)
    }
    
    useEffect( ()=>{
        if(!state.bands || state.bands.length === 0)
        {
            apiGetAllBands((message,success)=>{

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
            });
        }
    },[state.bands, apiGetAllBands])

    return (
      <React.Fragment>
          <div className="container mt-5">
            <CustomAlert alertProps={alertProps}/>
            <Button
                variant="success"
                onClick={()=>setShowBandForm(true)}
            >Create a new band</Button>
            <div className='row'>
                {
                    state.bands && state.bands.length > 0 
                    ?
                        state.bands.map((band,idx)=>{
                            return(
                                <div key={`band_${idx}`} className='col-12 col-md-6 col-xl-4'>
                                    <BandCard 
                                        band={band}
                                        openModal = {openDeleteModal}
                                        action = {
                                            {
                                                name: 'View',
                                                fn: viewBand
                                            }
                                        }
                                        imgHeight="400"
                                    />
                                </div>
                            )
                        }) 
                    : <div className='mt-5'> 
                        No Bands created yet. 
                      </div>
                }
            </div>
            <DeleteConfirmation 
                show={showDelete} 
                handleUserResponse={deleteBand} 
                name={currentBand?.name}
            />
            <ModalBandForm
                show={showBandForm}
                toggleFunction = {setShowBandForm}
                variant = 'Create'
            />
          </div>
          
      </React.Fragment>
    );
  }
  
  export default Bands;