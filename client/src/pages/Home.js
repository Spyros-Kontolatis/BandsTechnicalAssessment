import React from 'react';
import { Link } from "react-router-dom";
import guitar from "../assets/images/guitar.jpg";

const Home = () => {
  
    return (
      <React.Fragment>
          <div className="mt-3 container">
            <div className="fullwidth text-center">
                <img src={guitar} alt="guitar" className="cover-img" />
            </div>
            <div className="text-center mt-5">
                <h1 >Welcome to BANDS</h1>
                <div>
                    <Link className="btn btn-success" to="/bands">See your Bands</Link>
                </div>
                    
            </div>
          </div>
      </React.Fragment>
    );
  }
  
  export default Home;