import React from "react";

import { Header, Segment } from "semantic-ui-react";

import { Draggable } from "react-beautiful-dnd";

import * as C from "./Constants";

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
        style={{
          userSelect: "none",
          margin: "0 0 0.8rem 0",
          ...provided.draggableStyle // styles we need to apply on draggables
        }}
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
