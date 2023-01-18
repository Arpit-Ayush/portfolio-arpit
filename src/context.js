import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  handler = (action, newObject) => {
    switch (action) {
      case "ADD_PROJECT":
        this.setState({
          projects: [newObject, ...this.state.projects],
        });
        break;
      case "ADD_CERTIFICATE":
        this.setState({
          certificates: [newObject, ...this.state.certificates],
        });
        break;
      case "ADD_RECOMMENDATION":
        this.setState({
          recommendations: [newObject, ...this.state.recommendations],
        });
        break;
      default:
        break;
    }
  };

  state = {
    handler: this.handler,

    recommendations: [],

    skills: [],

    projects: [],

    certificates: [],
  };

  async componentDidMount() {
    const [recommendations_response, skills_response, projects_response, certificates_response] = await Promise.all([
      axios.get("http://127.0.0.1:9000/api/recommendations"),
      axios.get("http://127.0.0.1:9000/api/skills"),
      axios.get("http://127.0.0.1:9000/api/projects"),
      axios.get("http://127.0.0.1:9000/api/certificates"),
    ]);

    const newState = {};

    if (recommendations_response.data.isSuccessful && recommendations_response.data.results.length > 0) {
      newState.recommendations = recommendations_response.data.results;
    }
    if (skills_response.data.isSuccessful && skills_response.data.results.length > 0) {
      newState.skills = skills_response.data.results;
    }
    if (projects_response.data.isSuccessful && projects_response.data.results.length > 0) {
      newState.projects = projects_response.data.results;
    }
    if (certificates_response.data.isSuccessful && certificates_response.data.results.length > 0) {
      newState.certificates = certificates_response.data.results;
    }

    this.setState(newState);
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export const Consumer = Context.Consumer;
