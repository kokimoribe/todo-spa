import React from "react";
import { connect } from "react-redux";
import { Button, Grid, Header } from "semantic-ui-react";

import Lane from "./Lane";

const Board = props => {
  const { laneIds, lanes, itemsById } = props;

  return (
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column floated="left">
          <Header as="h1">Board</Header>
        </Grid.Column>
        <Grid.Column floated="right">
          <Button
            primary
            floated="right"
            content={"Add a task"}
            icon="plus"
            labelPosition="right"
          />
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
