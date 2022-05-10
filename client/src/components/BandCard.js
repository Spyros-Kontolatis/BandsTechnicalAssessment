import React from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import guitar from "../assets/images/guitar.jpg";

const BandCard = ({band,openModal,action,imgHeight}) => {
    return (
      <React.Fragment>
        <Card style={{ width: '100%' }} className="mt-4 mb-4">
            <Card.Img 
                variant="top" 
                height={imgHeight}
                src={ band && band.image ? band.image : guitar} 
            />
            <Card.Body>
                <Card.Title>{band.name}</Card.Title>
                <ListGroup className="list-group-flush">
                    {
                        band?.genre && 
                        <ListGroupItem><strong>Genre:</strong> {band.genre}</ListGroupItem>
                    }
                    {
                        band?.favourite_album && 
                        <ListGroupItem><strong>Favourite Album:</strong> {band.favourite_album}</ListGroupItem>
                    }
                    {
                        band?.favourite_song && 
                        <ListGroupItem><strong>Favourite Song:</strong> {band.favourite_song}</ListGroupItem>
                    }
                </ListGroup>
                <div className='row text-center'>
                    <div className='col-6'> 
                        <Button 
                            style={{width:"150px"}} 
                            variant="danger"
                            onClick={()=>openModal(band)}
                        >Delete</Button>
                    </div>
                    <div className='col-6'> 
                        <Button 
                            style={{width:"150px"}} 
                            variant="primary"
                            onClick={()=>action.fn(band)}
                        >{action.name}</Button>
                    </div>
                </div>
                
            </Card.Body>
        </Card>
        
      </React.Fragment>
    );
  }
  
  export default BandCard;