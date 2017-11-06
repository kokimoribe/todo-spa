import React from "react";

import { Droppable } from "react-beautiful-dnd";

import { Label, Segment } from "semantic-ui-react";

import Task from "../Task/Task";

const Lane = props => {
  const { provided, snapshot, tasks, name, color } = props;

  return (
    <div ref={provided.innerRef}>
      <Segment
        secondary={!snapshot.isDraggingOver}
        tertiary={snapshot.isDraggingOver}
        style={{ minHeight: "11.1rem" }}
      >
        <Label attached="top" color={color}>
          <div style={{ float: "left" }}>{name}</div>
          {tasks.length > 0 && (
            <div style={{ float: "right" }}>{tasks.length}</div>
          )}
        </Label>
        {tasks.map((task, i) => <Task key={i} task={task} color={color} />)}
        {provided.placeholder}
      </Segment>
    </div>
  );
};

const DroppableLane = props => {
  return (
    <Droppable droppableId={props.id}>
      {(provided, snapshot) => (
        <Lane provided={provided} snapshot={snapshot} {...props} />
      )}
    </Droppable>
  );
};

export default DroppableLane;
