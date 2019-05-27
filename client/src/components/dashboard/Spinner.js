import React from "react";
import spinner from "../../img/css3-loading-spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "110%",height: "100%", margin: "auto", display: "block" }}
        alt="Loading.."
      />
    </div>
  );
};
