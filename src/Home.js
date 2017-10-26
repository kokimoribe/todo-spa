import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from "semantic-ui-react";

import Board from "./Board";
import * as C from "./Constants";
import * as Api from "./Api";
import { actions } from "./itemReducer";

class Home extends Component {
  componentDidMount() {
    Api.getTasks().then(r => console.log(r));
  }
  onDragEnd = result => {
    console.log("START: onDragEnd");
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = {
      laneId: result.source.droppableId,
      index: result.source.index
    };
    const destination = {
      laneId: result.destination.droppableId,
      index: result.destination.index
    };

    this.props.moveItem(source, destination);

    console.log("END; onDragEnd");
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container style={{ marginTop: "7em" }}>
          <Board laneIds={[C.TO_DO, C.IN_PROGRESS, C.DONE]} />
        </Container>
      </DragDropContext>
    );
  }
}

export default connect(null, { moveItem: actions.moveItem })(Home);
