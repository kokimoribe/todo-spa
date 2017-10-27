import React from "react";

import { Droppable } from "react-beautiful-dnd";

import { Label, Segment } from "semantic-ui-react";

import Item from "./Item";

import * as C from "./Constants";

const statusToColor = {
  [C.TO_DO]: "blue",
  [C.IN_PROGRESS]: "yellow",
  [C.DONE]: "green"
};

const Lane = props => {
  const { provided, snapshot, items } = props;

  return (
    <div ref={provided.innerRef}>
      <Segment
        secondary={!snapshot.isDraggingOver}
        tertiary={snapshot.isDraggingOver}
      >
        <Label attached="top" color={statusToColor[props.laneId]}>
          {props.laneId}
        </Label>
        {items.map((item, i) => <Item key={i} item={item} />)}
        {provided.placeholder}
      </Segment>
    </div>
  );
};

const DroppableLane = props => {
  return (
    <Droppable droppableId={props.laneId}>
      {(provided, snapshot) => (
        <Lane provided={provided} snapshot={snapshot} {...props} />
      )}
    </Droppable>
  );
};

export default DroppableLane;
