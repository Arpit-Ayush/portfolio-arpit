import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function modifyTitleView(title) {
  if (title.length > 45) {
    if (title[44] === " ") {
      return title.slice(0, 44) + "...";
    }
    return title.slice(0, 45) + "...";
  }
  return title;
}

function CertificateCard(props) {
  const { id, title, imageUrl } = props.certificate;
  const cert_variant = {
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
    <motion.div ref={ref} variants={cert_variant} initial="hidden" animate={control} className="card shadow h-100">
      <img className="card-img-top" src={imageUrl} alt={title} style={{ height: "250px", width: "100%" }} />
      <div className="card-body">
        <h4 className="card-title">{modifyTitleView(title)}</h4>
        <Link to={`/certificate/${id}`} className="stretched-link"></Link>
      </div>
    </motion.div>
  );
}

export default CertificateCard;
