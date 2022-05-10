import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BandCard from '../components/BandCard';
import { Context } from '../context/appContext';
import DeleteConfirmation from "../components/DeleteConfirmation";
import ModalBandForm from '../components/ModalBandForm';
import CustomAlert from "../components/CustomAlert";


const Band = () => {
    const {state, apiGetBand, apiDeleteBand} = useContext(Context);
    const [alertProps, setAlertProps] = useState({show:false,message:'',variant:'info'});
    const [showDelete, setShowDelete] = useState(false);
    const [showBandForm, setShowBandForm] = useState(false);
    const navigate = useNavigate();
    var bandId = useParams("/band/:id").id;


    const deleteBand = (userResponse) => {
        if(userResponse)
        {
            apiDeleteBand(state.band, state.bands , (message,success)=>{
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
                setShowDelete(false);
                navigate('/bands');
            })
        }
        setShowDelete(false);
    }

    const openModal = (variant, band) => {
        switch(variant){
            case 'delete':
                setShowDelete(true)
                break;
            case 'update':
                setShowBandForm(true)
                break;
            default:
                break;
        }
    }

    useEffect( ()=>{
        if(!state.band || state.band._id !== bandId)
        {
            apiGetBand(bandId,(message,success)=>{

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
    },[state.band, apiGetBand, bandId])

    return (
      <React.Fragment>
          <div className="container mt-5">
            <CustomAlert alertProps={alertProps}/>
            <div className='row'>
                {
                    state.band && 
                    <BandCard 
                        band={state.band}
                        openModal = {openModal}
                        action = {
                            {
                                name: 'Update',
                                fn: (band)=>{openModal('update',band)}
                            }
                        }
                        imgHeight="600"
                    /> 
                }
            </div>
            <DeleteConfirmation 
                show={showDelete} 
                handleUserResponse={deleteBand} 
                name={state.band?.name}
            />
            <ModalBandForm
                show={showBandForm}
                toggleFunction = {setShowBandForm}
                variant = 'Update'
                band={state.band}
            />
          </div>
          
      </React.Fragment>
    );
  }
  
  export default Band;