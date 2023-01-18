import React from "react";
import Arpit from "../assets/Arpit.jpg";

function Title() {
  const name = "Arpit Ayush";
  const denomination = "full stack developer.";
  const leadText = "Welcome to my website.";

  return (
    <div className="container">
      <div className="row text-center align-items-center my-5 py-5">
        <div className="col-12  col-md-6" style={{ pointerEvents: "none" }}>
          <img className="img-fluid rounded-circle w-75" src={Arpit} alt="img_Arpit" />
        </div>
        <div className="col-12 col-md-6 pt-5">
          <div className="font-weight-light" style={{ fontSize: "50px" }}>
            Hi, I am <span className="text-info">{name}</span>
          </div>
          <h3 className="font-weight-light">
            I am a <span className="text-info">{denomination}</span>
          </h3>
          <h5 className="font-weight-light">{leadText}</h5>
        </div>
      </div>
    </div>
  );
}

export default Title;
