import React from "react";
import { Link } from "react-router-dom";

function onClick() {
  alert("Link only accessible by the owner of the website!");
}

function Footer() {
  return (
    <footer>
      <div className="container-fluid text-center py-5" style={{ backgroundColor: "black" }}>
        <div className="row">
          <div className="col-12 col-md-4">
            <h5 className="text-info">More Links</h5>
            <Link to="/" className="text-light d-block mb-1">
              Home
            </Link>
            <Link to="/allprojects" className="text-light d-block mb-1">
              Projects
            </Link>
            <Link to="/allcertificates" className="text-light d-block mb-1">
              Certificates
            </Link>
            <Link to="/contact" className="text-light d-block mb-1">
              Contact me
            </Link>
            <Link to="/write-a-recommendation" className="text-light d-block mb-1">
              Write a recommendation<i className="fas fa-heart text-light"></i>
            </Link>
            <a href="#unaccessibleforyou" className="text-light d-block mb-1" onClick={onClick}>
              Add Project
            </a>
            <a href="#unaccessibleforyou" className="text-light d-block mb-1" onClick={onClick}>
              Add Certificate
            </a>
          </div>
          <div className="col-12 col-md-4 text-light text-center mt-3">
            <h2 className="text-light">Have something in mind?</h2>
            <Link to="/contact">
              <button className="btn btn-outline-light btn-lg">Let's talk</button>
            </Link>
            <p className="text-muted pt-3">Copyright © Arpit Ayush 2023</p>
          </div>
          <div className="col-12 col-md-4">
            <h5 className="text-info pb-2">Social</h5>
            <a href="https://github.com/Arpit-Ayush">
              <i className="fab fa-github text-light h1 d-block"></i>
            </a>
            <a href="https://www.instagram.com/_arpit_ayush/">
              <i className="fab fa-brands fa-instagram text-light h1 d-block"></i>
            </a>
            <a href="https://www.linkedin.com/in/arpit-ayush-li">
              <i className="fab fa-brands fa-linkedin text-light h1 d-block"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
