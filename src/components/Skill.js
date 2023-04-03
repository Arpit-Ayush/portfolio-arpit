import { React, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Skill(props) {
  const { name, imageUrl, starsTotal, starsActive } = props.skill;

  const skill_variant = {
    visible: { opacity: 1, transition: { duration: 3 } },
    hidden: { opacity: 0 },
  };
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  const starsList = [];
  for (let i = 0; i < starsTotal; ++i) {
    if (i < starsActive) {
      starsList.push(
        <span key={uuid()} className="text-info">
          ★
        </span>
      );
    } else {
      starsList.push(<span key={uuid()}>★</span>);
    }
  }

  return (
    <motion.div ref={ref} variants={skill_variant} initial="hidden" animate={control}>
      <img className="rounded-circle" src={imageUrl} alt={name} style={{ width: "5em", height: "5em" }} />
      <div>{starsList}</div>
    </motion.div>
  );
}

export default Skill;
