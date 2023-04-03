import React from "react";
import { Link } from "react-router-dom";
import CertificateCard from "./CertificateCard";
import { Consumer } from "../context";

function CertificateSection() {
  return (
    <Consumer>
      {(value) => {
        const { certificates_all } = value;
        return (
          <div className="container text-center my-5">
            <h1 className="font-weight-light">
              My <span className="text-info">Certificates</span>
            </h1>
            <div className="lead">Here are my educational and extra-curricular certificates.</div>
            <div className="row my-5 pt-3">
              {certificates_all.slice(0, 3).map((certificate) => (
                <div key={certificate.id} className="col-12 col-md-4 my-2">
                  <CertificateCard certificate={certificate} />
                </div>
              ))}
            </div>
            <div className="my-5">
              <Link to="/allcertificates" className="text-dark text-right">
                <h5>
                  See my certificates
                  <i className="fas fa-arrow-right align-middle"></i>
                </h5>
              </Link>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}

export default CertificateSection;
