import axios from "axios";
import React, { Component } from "react";

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      message: "",
      submitMessage: "",
      submitMessageTextColor: "",
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  async sendMail(newContact_obj) {
    const response = await axios.post("https://arpitayush94-backend.tech/api/contact/send", newContact_obj);
    return response.data.isSuccessful;
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { name, email, message } = this.state;
    const newContact_obj = {
      name: name,
      email: email,
      message: message,
    };

    let isSuccessful = this.sendMail(newContact_obj);
    if (isSuccessful) {
      this.setState({
        submitMessage: `Mail sent. Thank you ${name}. I will contact you soon!`,
        submitMessageTextColor: "text-info",
      });
    } else {
      this.setState({
        submitMessage: "Oops! Something went wrong. Please try again later :(",
        submitMessageTextColor: "text-danger",
      });
    }
  };
  render() {
    const { submitMessage, submitMessageTextColor } = this.state;
    return (
      <div className="container my-5 py-5">
        <h1 className="font-weight-light text-center py-5">
          <span className="text-info">Thank you! </span>for your valuable time.
        </h1>
        <div className="row justify-content-center">
          <div className="col-11 col-lg-5">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" name="name" className="form-control" onChange={this.onChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" name="email" className="form-control" onChange={this.onChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Type your message *</label>
                <textarea className="form-control" name="message" rows="5" onChange={this.onChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-dark float-right" style={{ backgroundColor: "black" }}>
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="py-5 mx-2 text-center">
          <h5 className={submitMessageTextColor}>{submitMessage}</h5>
        </div>
      </div>
    );
  }
}

export default Contact;
