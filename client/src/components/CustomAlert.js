import React from 'react';
import { Alert } from 'react-bootstrap';


const CustomAlert = (props) => {
    const { message, show, variant} = props.alertProps;
    if(show)
    {
        return(
            <Alert variant={variant}>
                {message}
            </Alert>
        )
    }
    return null;
    
}

export default CustomAlert;