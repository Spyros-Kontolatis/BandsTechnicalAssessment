import React from 'react';
import { Link } from "react-router-dom";
import error from "../assets/images/error-img.png";

const NoMatch = () => {
  
    return (
      <React.Fragment>
          <div >
                <div className="text-center mt-3">
                    <h1 >404</h1>
                    <h4 >Sorry, page not found</h4>
                    <div>
                        <Link className="btn btn-primary" to="/">Back to Home</Link>
                    </div>
                        
                </div>
                <div className="fullwidth text-center">
                    <img src={error} alt="error" className="cover-img" />
                </div>
          </div>
      </React.Fragment>
    );
  }
  
  export default NoMatch;