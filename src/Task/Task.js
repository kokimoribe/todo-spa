import React from "react";

import { Header, Label, Segment } from "semantic-ui-react";

import { Draggable } from "react-beautiful-dnd";

const Task = props => {
  const { provided, snapshot, task, color } = props;

  return (
    <div>
      <div
        ref={provided.innerRef}
        style={{
          userSelect: "none",
          margin: "0 0 0.8rem 0",
          ...provided.draggableStyle // styles we need to apply on draggables
        }}
        {...provided.dragHandleProps}
      >
        <Segment
          raised={snapshot.isDragging}
          disabled={task.isPending}
          color={color}
          clearing
        >
          <Header as="h3" floated="left">
            {task.title}
          </Header>
          <Label
            basic
            attached="top right"
            style={{ opacity: 0.3, float: "right", borderStyle: "none" }}
          >
            {task.number}
          </Label>
          <div style={{ clear: "both" }}>{task.description}</div>
        </Segment>
      </div>
      {provided.placeholder}
    </div>
  );
};

const DraggableTask = props => {
  const { task } = props;

  return (
    <Draggable draggableId={task.id}>
      {(provided, snapshot) => (
        <Task provided={provided} snapshot={snapshot} {...props} />
      )}
    </Draggable>
  );
};

export default DraggableTask;
