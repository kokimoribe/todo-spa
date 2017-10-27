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

const statusToDisplayName = {
  [C.TO_DO]: "TO DO",
  [C.IN_PROGRESS]: "IN PROGRESS",
  [C.DONE]: "DONE"
};

const Lane = props => {
  const { provided, snapshot, items } = props;

  return (
    <div ref={provided.innerRef} style={{ minHeight: "10rem" }}>
      <Segment
        secondary={!snapshot.isDraggingOver}
        tertiary={snapshot.isDraggingOver}
      >
        <Label attached="top" color={statusToColor[props.laneId]}>
          <div style={{ float: "left" }}>
            {statusToDisplayName[props.laneId]}
          </div>
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
