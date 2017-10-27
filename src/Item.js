import React from "react";

import { Header, Segment } from "semantic-ui-react";

import { Draggable } from "react-beautiful-dnd";

import * as C from "./Constants";

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const statusToColor = {
  [C.TO_DO]: "blue",
  [C.IN_PROGRESS]: "yellow",
  [C.DONE]: "green"
};

const Item = props => {
  const { provided, snapshot, item } = props;

  return (
    <div>
      <div
        ref={provided.innerRef}
        style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
        {...provided.dragHandleProps}
      >
        <Segment
          raised={snapshot.isDragging}
          disabled={item.isPending}
          color={statusToColor[item.status]}
        >
          <Header as="h3" floated="left">
            {item.title}
          </Header>
          <div style={{ clear: "both" }}>{item.description}</div>
        </Segment>
      </div>
      {provided.placeholder}
    </div>
  );
};

const DraggableItem = props => {
  const { item } = props;

  return (
    <Draggable draggableId={item.id}>
      {(provided, snapshot) => (
        <Item provided={provided} snapshot={snapshot} {...props} />
      )}
    </Draggable>
  );
};

export default DraggableItem;
