import React from "react";
import { Dropdown, Loader } from "semantic-ui-react";

import CreateBoardModal from "./CreateBoardModal";

const DisabledItem = ({ children }) => {
  return (
    <Dropdown.Item disabled style={{ fontStyle: "italic" }}>
      {children}
    </Dropdown.Item>
  );
};

const BoardItem = ({ board, onClick }) => {
  return <Dropdown.Item onClick={onClick}>{board.name}</Dropdown.Item>;
};

const BoardNav = props => {
  const { boards, loading, loggedIn, selectBoard, selectDemoBoard } = props;

  return (
    <Dropdown item scrolling text="Boards">
      <Dropdown.Menu>
        <Dropdown.Header>Select a Board</Dropdown.Header>
        <Dropdown.Item onClick={() => selectDemoBoard()}>
          Demo Board
        </Dropdown.Item>
        <Dropdown.Divider />
        {loggedIn &&
          !loading &&
          boards.length > 0 &&
          boards.map(board => (
            <BoardItem
              key={board.id}
              board={board}
              onClick={() => selectBoard(board.id)}
            />
          ))}
        {loggedIn &&
          !loading &&
          boards.length === 0 && <DisabledItem> No boards found </DisabledItem>}
        {loggedIn &&
          loading && (
            <DisabledItem>
              {" "}
              <Loader active size="tiny" />{" "}
            </DisabledItem>
          )}
        {!loggedIn && (
          <DisabledItem> Please sign-in to see your boards </DisabledItem>
        )}
        <Dropdown.Divider />
        <Dropdown.Item disabled={!loggedIn}>
          <CreateBoardModal />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BoardNav;
