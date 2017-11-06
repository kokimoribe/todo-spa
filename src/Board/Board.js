import React from "react";
import { connect } from "react-redux";
import { Dimmer, Grid, Header, Loader } from "semantic-ui-react";

import Lane from "../Lane/Lane";
import CreateTaskModal from "./CreateTaskModal";

const Board = ({ boards, lanes, tasks }) => {
  const board =
    boards.selectedId === "demo"
      ? boards.demoBoard
      : boards.byId[boards.selectedId];

  return (
    <Dimmer.Dimmable dimmed={tasks.loading}>
      <Dimmer active={tasks.loading} inverted>
        <Loader />
      </Dimmer>
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column floated="left">
            <Header as="h1">{board.name}</Header>
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right">
            <CreateTaskModal />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={lanes.ids.length}>
          {lanes.ids.map(laneId => {
            const lane = lanes.byId[laneId];
            const laneTasks = lane.taskIds.map(id => tasks.byId[id]);

            return (
              <Grid.Column key={laneId}>
                <Lane
                  id={laneId}
                  name={lane.name}
                  color={lane.color}
                  tasks={laneTasks}
                />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </Dimmer.Dimmable>
  );
};

const mapStateToProps = state => {
  return {
    boards: state.boards,
    lanes: state.lanes,
    tasks: state.tasks
  };
};

export default connect(mapStateToProps)(Board);
