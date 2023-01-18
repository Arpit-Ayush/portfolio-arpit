import React from "react";
import { Link } from "react-router-dom";

function modifyTitleView(title) {
  if (title.length > 25) {
    return title.slice(0, 25) + "...";
  }
  return title;
}

function modifyExcerptView(excerpt) {
  if (excerpt.length > 110) {
    return excerpt.slice(0, 110) + "...";
  }
  return excerpt;
}

function ProjectCard(props) {
  const { id, title, excerpt, imageUrl } = props.project;

  return (
    <div className="card shadow h-100">
      <img className="card-img-top" src={imageUrl} alt={title} style={{ maxHeight: "20em" }} />
      <div className="card-body">
        <h4 className="card-title">{modifyTitleView(title)}</h4>
        <p className="card-text">{modifyExcerptView(excerpt)}</p>
        <Link to={`/project/${id}`} className="stretched-link"></Link>
      </div>
    </div>
  );
}

export default ProjectCard;
