import React from "react";
import RecommendationCard from "./RecommendationCard";
import { v4 as uuid } from "uuid";
import { Consumer } from "../context";

function RecommendationSection() {
  return (
    <Consumer>
      {(value) => {
        const { recommendations } = value;
        return (
          <div className="container-fluid">
            <div className="row text-center py-5 d-flex flex-nowrap overflow-auto scrollbar">
              {recommendations.map((recommendation) => (
                <RecommendationCard key={uuid()} recommendation={recommendation} />
              ))}
            </div>
            <p className="text-right text-muted">
              <span
                onClick={() => {
                  alert("To scroll horizontally using mouse, press shift and scroll!");
                }}
              >
                Scroll<i className="fas fa-arrow-right align-middle"></i>
              </span>
            </p>
          </div>
        );
      }}
    </Consumer>
  );
}

export default RecommendationSection;
