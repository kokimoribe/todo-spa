import React from "react";
import { connect } from "react-redux";
import { Button, Container, Menu } from "semantic-ui-react";

import { actions as boardActions } from "../Board/boardReducer";
import BoardNav from "./BoardNav";
import UserNav from "./UserNav";

const Header = ({ auth, boards, user, selectBoard, selectDemoBoard }) => {
  const loggedIn = auth.isAuthenticated();

  const { profile } = user;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <BoardNav
          boards={boards.ids.map(id => boards.byId[id])}
          loggedIn={loggedIn}
          loading={boards.loading}
          selectBoard={selectBoard}
          selectDemoBoard={selectDemoBoard}
        />
        <Menu.Menu position="right">
          {loggedIn && profile ? (
            <UserNav profile={profile} onLogout={auth.logout} />
          ) : (
            <Menu.Item>
              <Button compact primary onClick={() => auth.login()}>
                Sign in
              </Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    boards: state.boards
  };
};

export default connect(mapStateToProps, {
  selectBoard: boardActions.selectBoard,
  selectDemoBoard: boardActions.selectDemoBoard
})(Header);
