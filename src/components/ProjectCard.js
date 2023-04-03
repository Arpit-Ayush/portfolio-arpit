import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function modifyTitleView(title) {
  if (title.length > 25) {
    if (title[24] === " ") {
      return title.slice(0, 24) + "...";
    }
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
  const card_variant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 2 } },
    hidden: { opacity: 1, scale: 0.5 },
  };
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <motion.div ref={ref} variants={card_variant} initial="hidden" animate={control} className="card shadow h-100">
      <img className="card-img-top" src={imageUrl} alt={title} style={{ height: "250px", width: "100%" }} />
      <div className="card-body">
        <h4 className="card-title">{modifyTitleView(title)}</h4>
        <p className="card-text">{modifyExcerptView(excerpt)}</p>
        <Link to={`/project/${id}`} className="stretched-link"></Link>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
