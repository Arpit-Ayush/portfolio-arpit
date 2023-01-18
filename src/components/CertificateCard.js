import React from "react";
import { Link } from "react-router-dom";

function modifyTitleView(title) {
  if (title.length > 45) {
    return title.slice(0, 45) + "...";
  }
  return title;
}

function CertificateCard(props) {
  const { id, title, imageUrl } = props.certificate;

  return (
    <div className="card shadow h-100">
      <img className="card-img-top" src={imageUrl} alt={title} style={{ maxHeight: "20em" }} />
      <div className="card-body">
        <h4 className="card-title">{modifyTitleView(title)}</h4>
        <Link to={`/certificate/${id}`} className="stretched-link"></Link>
      </div>
    </div>
  );
}

export default CertificateCard;
