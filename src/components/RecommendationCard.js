import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

class RecommendationCard extends Component {
  state = {
    visibility: false,
  };

  onClick(visibility) {
    if (visibility === false) {
      this.setState({
        visibility: true,
      });
    } else {
      this.setState({
        visibility: false,
      });
    }
  }

  modifyMessageView(message) {
    if (message.length > 31) {
      return message.slice(0, 31) + "...";
    }
    return message;
  }

  render() {
    const { name, company, designation, message } = this.props.recommendation;
    const { visibility } = this.state;

    return (
      <>
        <div className="col-12 col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="card-text">{this.modifyMessageView(message)}</h4>
              <p className="card-text text-secondary mb-0">{name}</p>
              <p className="card-text text-secondary">
                {designation} at {company}
              </p>
            </div>
            <Link onClick={this.onClick.bind(this, visibility)} className="stretched-link"></Link>
          </div>
        </div>
        <Modal show={visibility} onHide={this.onClick.bind(this)}>
          <Modal.Header style={{ borderBottom: 0 }} closeButton="true"></Modal.Header>
          <Modal.Body className="text-center">
            <div>
              <h5>{message}</h5>
            </div>
            <div>
              <p className="card-text text-secondary mb-0">{name}</p>
              <p className="card-text text-secondary">
                {designation} at {company}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default RecommendationCard;
