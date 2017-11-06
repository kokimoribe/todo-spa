import React from "react";
import { Dropdown, Image } from "semantic-ui-react";

const UserNav = ({ profile, onLogout }) => {
  const trigger = (
    <div>
      <Image src={profile.picture} avatar style={{ marginRight: "1rem" }} />
      <span>{profile.name}</span>
    </div>
  );

  return (
    <Dropdown size="small" trigger={trigger} item simple>
      <Dropdown.Menu>
        <Dropdown.Item icon="sign out" text="Sign out" onClick={onLogout} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserNav;
