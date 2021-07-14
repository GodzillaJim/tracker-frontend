import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ className }) => {
  return (
    <div className={className ? className + " m-2" : "m-2"}>
      <Spinner animation="border" className="text-bolder" />
    </div>
  );
};

export default Loader;
