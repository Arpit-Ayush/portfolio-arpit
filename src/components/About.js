import React from "react";

function About() {
  return (
    <div className="bg-light">
      <div className="container text-center py-5">
        <h1 className="font-weight-light">
          <span className="text-info">About</span> me
        </h1>
        <div className="lead">Get to know about me a little.</div>
        <div className="row text-justify">
          <div className="col-12 col-md-6 pt-5 px-5">
            <h6 className="text-center">Who am I?</h6>
            <p>
              My name is Arpit Ayush, I am an MCA graduate from Vellore Institue of Technology &#40;Chennai&#41;, an
              individual who can take care of his assigned responsibilities and is honest in his work. I am confident
              about the current level of skills I possess in various aspects of life, but that doesn't stop me from
              learning, improving and gaining additional experience. If you're looking for a competent professional who
              will add value and make an impact working with your organization, I am the person you're looking for.
            </p>
          </div>
          <div className="col-12 col-md-6 pt-5 px-5">
            <h6 className="text-center">About my Education?</h6>
            <p>
              I have completed my 10th &#40;SSC-Secondary School Certificate&#41; in the year 2014 and 12th
              &#40;HSC-Higher School Certificate in PCM&#41; in the year 2016 from DPS, Ranchi with respective grades of
              10-CGPA and 83.66-percent. I have completed my graduation in BCA-Bachelor of Computer Applications from
              Birla Institute of Technology, Mesra with 7.24-CGPA &#40;2017-2020&#41; and post-graduation in MCA-Master
              of computer Application from Vellore Institute of Technology, Chennai with 8.51-CGPA &#40;2020-2022&#41;.
            </p>
          </div>
        </div>
        <div className="row text-justify">
          <div className="col-12 col-md-6 pt-5 px-5">
            <h6 className="text-center">What do I believe in?</h6>
            <p>
              The values and ethics I live by are one of the most important aspects of my life. Some of the core values
              I subscribe to are: Respect, Punctuality, Hardwork &#40;Even if one has more talent than others&#41;, and
              Honesty. Along with these the most important thing I think a person should have is the ability to try and
              grow oneself in different areas of life and to help others present around him grow as well.
            </p>
          </div>
          <div className="col-12 col-md-6 pt-5 px-5">
            <h6 className="text-center">Things I like to do?</h6>
            <p>
              Playing sports and listening to music are some of my favourite pass time activities. Adding to that I also
              like to go on a ride/drive on weekends or travel to some unvisited,unexplored place. I also sometimes like
              to cook.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
