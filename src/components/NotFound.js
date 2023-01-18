import React from "react";

function NotFound() {
  return (
    <div className="container text-center py-5 my-5">
      <div className="display-4 pt-5 mt-4">
        <span className="text-danger">ERROR:</span> 404
      </div>
      <div className="lead">Sorry, the page you're looking for doesn't exist.</div>
    </div>
  );
}

export default NotFound;
