import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";

import * as Api from "../Api";
import { actions as boardActions } from "../Board/boardReducer";

const validateName = value => (value.trim() ? null : "Name cannot be empty");

const CreateBoardForm = ({ errors, onChange }) => {
  const errorMessages = Object.values(errors).filter(msg => !!msg);

  return (
    <Form error={errorMessages.length > 0}>
      <Form.Input
        required
        autoFocus
        error={!!errors.name}
        label="Name"
        placeholder="Name"
        onChange={(_, d) => onChange({ field: "name", value: d.value })}
      />
      <Message
        error
        header="Oops! The following errors occurred:"
        list={errorMessages}
      />
    </Form>
  );
};

class CreateBoardModal extends Component {
  state = {
    isOpen: false,
    isLoading: false,
    name: "",
    errors: {}
  };

  handleOpen = () => this.setState({ isOpen: true });

  handleClose = () => this.setState({ isOpen: false, isLoading: false });

  handleChange = ({ field, value }) => this.setState({ [field]: value });

  handleConfirm = () => {
    this.setState({
      isLoading: true,
      errors: { name: null, api: null }
    });
    const { name } = this.state;

    const errors = {
      name: validateName(name),
      api: null
    };

    const hasErrors = Object.values(errors).filter(err => !!err).length > 0;

    if (hasErrors) {
      this.setState({
        isLoading: false,
        errors
      });
    } else {
      Api.createBoard({ name })
        .then(board => {
          this.props.addBoard(board);
          this.handleClose();
        })
        .catch(e => {
          console.log(e);
          const message =
            "There was a problem with the server handling your request. Please try again later.";
          this.setState({
            isLoading: false,
            errors: { name: null, api: message }
          });
          this.handleClose();
        });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <Modal
        open={this.state.isOpen}
        size="small"
        onClose={this.handleClose}
        closeOnDimmerClick={false}
        trigger={
          <Button
            primary
            content={"Create board"}
            icon="plus"
            labelPosition="right"
            onClick={() => this.handleOpen()}
          />
        }
      >
        <Header icon="edit" content="Create board" />
        <Modal.Content>
          <CreateBoardForm errors={errors} onChange={this.handleChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button basic content={"Cancel"} onClick={() => this.handleClose()} />
          <Button
            primary
            loading={this.state.isLoading}
            disabled={this.state.isLoading}
            content={"Create"}
            icon="plus"
            labelPosition="right"
            onClick={() => this.handleConfirm()}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, {
  addBoard: boardActions.addBoard
})(CreateBoardModal);
