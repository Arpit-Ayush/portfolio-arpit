import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CertificatePage() {
  const { id } = useParams();
  let [certificate, setCertificateState] = useState({
    result: {},
  });

  const fetchData = useCallback(async () => {
    let response = await axios.get(`https://arpitayush94-backend.tech/api/certificate?id=${id}`);
    if (response.data.isSuccessful) {
      setCertificateState(response.data.result);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { imageUrl, title } = certificate;
  return (
    <div className="container py-5 my-5 markdown">
      <div className="justify-content-center" style={{ pointerEvents: "none" }}>
        <img src={imageUrl} alt={title} style={{ width: "100%", height: "50%" }} />
      </div>
      <h1 className="font-weight-light text-center my-5">{title}</h1>
    </div>
  );
}

export default CertificatePage;
