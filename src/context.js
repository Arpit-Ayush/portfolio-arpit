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
          certificates_all: [newObject, ...this.state.certificates],
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

    certificates_all: [],

    certificates_additional: [],

    certificates_curricular: [],
  };

  async componentDidMount() {
    const [
      recommendations_response,
      skills_response,
      projects_response,
      certificates_all_response,
      certificates_additional_response,
      certificates_curricular_response,
    ] = await Promise.all([
      axios.get("https://arpitayush94-backend.tech/api/recommendations"),
      axios.get("https://arpitayush94-backend.tech/api/skills"),
      axios.get("https://arpitayush94-backend.tech/api/projects"),
      axios.get("https://arpitayush94-backend.tech/api/certificates/all"),
      axios.get("https://arpitayush94-backend.tech/api/certificates/additional"),
      axios.get("https://arpitayush94-backend.tech/api/certificates/curricular"),
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
    if (certificates_all_response.data.isSuccessful && certificates_all_response.data.results.length > 0) {
      newState.certificates_all = certificates_all_response.data.results;
    }
    if (
      certificates_additional_response.data.isSuccessful &&
      certificates_additional_response.data.results.length > 0
    ) {
      newState.certificates_additional = certificates_additional_response.data.results;
    }
    if (
      certificates_curricular_response.data.isSuccessful &&
      certificates_curricular_response.data.results.length > 0
    ) {
      newState.certificates_curricular = certificates_curricular_response.data.results;
    }
    this.setState(newState);
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export const Consumer = Context.Consumer;
