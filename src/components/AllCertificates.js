import React from "react";
import { Consumer } from "../context";
import CertificateCard from "./CertificateCard";

function AllCertificates() {
  return (
    <Consumer>
      {(value) => {
        const { certificates_additional, certificates_curricular } = value;
        return (
          <div className="container text-center my-5 py-5">
            <h1 className="font-weight-light py-5">
              <u>
                All my <span className="text-info">Certificates</span>
              </u>
            </h1>
            <h3 className="font-weight-light ">
              <u>Additional Course Certificates</u>
            </h3>
            <div className="row my-4 pt-4">
              {certificates_additional.map((certificate) => (
                <div key={certificate.id} className="col-12 col-md-4 py-3">
                  <CertificateCard certificate={certificate} />
                </div>
              ))}
            </div>
            <h3 className="font-weight-light">
              <u>Co&Extra Curricular Certificates</u>
            </h3>
            <div className="row my-4 pt-4">
              {certificates_curricular.map((certificate) => (
                <div key={certificate.id} className="col-12 col-md-4 py-3">
                  <CertificateCard certificate={certificate} />
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}

export default AllCertificates;
