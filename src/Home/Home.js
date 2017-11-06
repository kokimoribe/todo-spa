import React, { Component } from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Container } from "semantic-ui-react";

import Board from "../Board/Board";
import { actions as userActions } from "../userReducer";
import { actions as laneActions } from "../Lane/laneReducer";
import { actions as boardActions } from "../Board/boardReducer";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile((err, profile) => {
        if (err) {
          console.log(err);
        } else {
          this.props.setUserProfile(profile);
        }
      });
      this.props.getBoards();
    }

    this.props.selectDemoBoard();
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

    this.props.moveTask(source, destination);

    console.log("END; onDragEnd");
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container style={{ marginTop: "7em" }}>
          <Board />
        </Container>
      </DragDropContext>
    );
  }
}

export default connect(null, {
  moveTask: laneActions.moveTask,
  setUserProfile: userActions.setUserProfile,
  selectDemoBoard: boardActions.selectDemoBoard,
  getBoards: boardActions.getBoards
})(Home);
