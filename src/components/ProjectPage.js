import React, { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProjectPage() {
  const { id } = useParams();
  let [project, setProjectState] = useState({
    result: {},
  });

  const fetchData = useCallback(async () => {
    let response = await axios.get(`https://arpitayush94-backend.tech/api/project?id=${id}`);
    if (response.data.isSuccessful) {
      setProjectState(response.data.result);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { imageUrl, title, body } = project;
  return (
    <div className="container py-5 my-5 markdown">
      <div className="justify-content-center" style={{ pointerEvents: "none" }}>
        <img src={imageUrl} alt={title} style />
      </div>
      <h1 className="font-weight-light text-center my-5">
        <u>{title}</u>
      </h1>
      <ReactMarkdown children={body} />
    </div>
  );
}

export default ProjectPage;
