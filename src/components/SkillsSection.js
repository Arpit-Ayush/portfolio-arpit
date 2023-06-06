import { React, useState, useEffect } from "react";
import Skill from "./Skill";
import { v4 as uuid } from "uuid";
import { Consumer } from "../context";

function SkillsSection() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <Consumer>
      {(value) => {
        const { skills } = value;
        let rowlength = 4;

        if (windowWidth < 769) {
          rowlength = 3;
        }

        const finalSkillRow = [];

        for (let i = 0; i < skills.length / rowlength; ++i) {
          //console.log(rowlength, windowWidth);
          let skillRow = skills.slice(i * rowlength, (i + 1) * rowlength);
          finalSkillRow.push(
            <div key={uuid()} className="d-flex justify-content-around py-3">
              {skillRow.map((skill) => (
                <Skill key={skill.id} skill={skill} />
              ))}
            </div>
          );
        }

        return (
          <div className="bg-light w-100 text-center">
            <div className="container text-center py-5">
              <h1 className="font-weight-light">
                <span className="text-info">Technology</span> stack
              </h1>
              <div className="lead pb-5">These are my weapons which I've used.</div>
              {finalSkillRow}
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}

export default SkillsSection;
