import React, { useState } from "react";
import { Menu, Button, Header, Icon, Dropdown } from "semantic-ui-react";

const MenuSecondary = ({ openUploadModal, applyItemCount }) => {
  
  const getItems = (event, {value}) => {
    applyItemCount(value)
  }

  const options = [
    {text: "10", value: 10},
    {text: "25", value: 25},
    {text: "50", value: 50},
  ]

  return (
    <Menu secondary>
      <Menu.Item
        onClick={() => window.location.reload()}
        content={<Header as="h1">Photos</Header>}
        name="photos"
      />
      <Menu.Menu position="right">
        <Menu.Item
          content={
            <Button
              color="blue"
              icon
              onClick={() => openUploadModal(true)}
              labelPosition="left"
            >
              <Icon name="upload" />
              Upload
            </Button>
          }
        />
        <Menu.Item
          content={
            <Dropdown
              button
              className="icon"
              floating
              labeled
              icon="numbered list"
              options={options}
              text="Select number of items"
              onChange={getItems}
            />
          }
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuSecondary;