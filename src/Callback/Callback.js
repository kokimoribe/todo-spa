import React, { Component } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

class Callback extends Component {
  render() {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }
}

export default Callback;
