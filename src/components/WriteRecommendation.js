import React, { Component } from "react";
import { Consumer } from "../context";
import { v4 as uuid } from "uuid";
import axios from "axios";

class WriteRecommendation extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      company: "",
      designation: "",
      recommendationMessage: "",
      submitMessage: "",
      submitMessageTextColor: "",
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async (addRecommendationHandler, event) => {
    event.preventDefault();

    const newRecommendation = {
      id: uuid(),
      name: this.state.name,
      email: this.state.email,
      company: this.state.company,
      designation: this.state.designation,
      recommendationMessage: this.state.recommendationMessage,
    };

    const response = await axios.post("https://arpitayush94-backend.tech/api/recommendation/add", newRecommendation);
    const isSuccessful = response.data.isSuccessful;
    const { name } = this.state;

    if (isSuccessful) {
      console.log("Recommendation added successfuly? (True/False)" + isSuccessful);
      this.setState({
        submitMessage: `Thank you ${name} for the recommendation. I really appreciate it. It will be visible once it's authorized by me :)`,
        submitMessageTextColor: "text-info",
      });
    } else {
      //console.log("Recommendation added successfuly? (True/False)" + isSuccessful);
      this.setState({
        submitMessage: "Oops! Something went wrong. Please try again later :(",
        submitMessageTextColor: "text-danger",
      });
    }

    addRecommendationHandler("ADD_RECOMMENDATION", newRecommendation);
  };
  render() {
    return (
      <Consumer>
        {(value) => {
          const { submitMessage, submitMessageTextColor } = this.state;
          const { handler } = value;

          return (
            <div className="container my-5 py-5">
              <h1 className="font-weight-light text-center py-5">
                <span className="text-info">Thank you! </span>for your interest.
              </h1>
              <div className="row justify-content-center">
                <div className="col-11 col-lg-5">
                  <form onSubmit={this.onSubmit.bind(this, handler)}>
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input type="text" name="name" className="form-control" onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input type="email" name="email" className="form-control" onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company/Institution *</label>
                      <input type="text" name="company" className="form-control" onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="designation">Designation *</label>
                      <input
                        type="text"
                        name="designation"
                        className="form-control"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="recommendationMessage">Recommendation *</label>
                      <textarea
                        className="form-control"
                        name="recommendationMessage"
                        rows="5"
                        onChange={this.onChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-danger float-right">
                      Lot's of love!
                    </button>
                  </form>
                </div>
              </div>

              <div className="py-5 mx-2 text-center">
                <h5 className={submitMessageTextColor}>{submitMessage}</h5>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default WriteRecommendation;
