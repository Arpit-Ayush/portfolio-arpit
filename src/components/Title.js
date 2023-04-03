import { React } from "react";
import Arpit from "../assets/Arpit.webp";

function Title() {
  const name = "Arpit Ayush";
  const denomination = "full stack developer.";
  const leadText = "Welcome to my website.";

  return (
    <div className="container">
      <div className="row text-center align-items-center mt-5 pt-5 pb-3">
        <div className="col-12  col-md-6 bounceIn" style={{ pointerEvents: "none" }}>
          <img
            className="img-fluid rounded-circle w-75"
            src={Arpit}
            alt="img_Arpit"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="col-12 col-md-6 pt-5">
          <div className="font-weight-light" style={{ fontSize: "50px" }}>
            Hi, I am{" "}
            <span className="title_name text-info animate__animated animate__swing animate__delay-1s animate__repeat-2 animate__slow">
              {name}
            </span>
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
