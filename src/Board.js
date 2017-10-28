import React from "react";
import { connect } from "react-redux";
import { Grid, Header } from "semantic-ui-react";

import Lane from "./Lane";
import CreateTaskModal from "./CreateTaskModal";

const Board = ({ laneIds, lanes, itemsById }) => {
  return (
    <div>
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column floated="left">
            <Header as="h1">Board</Header>
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right">
            <CreateTaskModal />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={laneIds.length}>
          {laneIds.map(laneId => {
            const itemIds = lanes[laneId];
            const items = itemIds.map(id => itemsById[id]);

            return (
              <Grid.Column key={laneId}>
                <Lane laneId={laneId} items={items} />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  const { lanes, itemsById } = state.home;

  return {
    lanes,
    itemsById
  };
};

export default connect(mapStateToProps)(Board);
