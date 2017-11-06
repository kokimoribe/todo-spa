import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Header, Message, Modal } from "semantic-ui-react";

import { actions as laneActions } from "../Lane/laneReducer";
import { actions as taskActions } from "../Task/taskReducer";
import * as Api from "../Api";
import * as C from "../Constants";

const validateTitle = value => (value.trim() ? null : "Title cannot be empty");
const validateDescription = value => null;

const CreateTaskForm = ({ errors, onChange }) => {
  const errorMessages = Object.values(errors).filter(msg => !!msg);

  return (
    <Form error={errorMessages.length > 0}>
      <Form.Input
        required
        error={!!errors.title}
        label="Title"
        placeholder="Title"
        onChange={(_, d) => onChange({ field: "title", value: d.value })}
      />
      <Form.TextArea
        error={!!errors.description}
        label="Description"
        placeholder="Description"
        onChange={(_, d) => onChange({ field: "description", value: d.value })}
      />
      <Message
        error
        header="Oops! The following errors occurred:"
        list={errorMessages}
      />
    </Form>
  );
};

class CreateTaskModal extends Component {
  state = {
    isOpen: false,
    isLoading: false,
    title: "",
    description: "",
    errors: {}
  };

  handleOpen = () => this.setState({ isOpen: true });

  handleClose = () => this.setState({ isOpen: false, isLoading: false });

  handleChange = ({ field, value }) => this.setState({ [field]: value });

  handleConfirm = () => {
    this.setState({
      isLoading: true,
      errors: { title: null, description: null, api: null }
    });
    const { title, description } = this.state;

    const errors = {
      title: validateTitle(title),
      description: validateDescription(description),
      api: null
    };

    const hasErrors = Object.values(errors).filter(err => !!err).length > 0;

    const { boards, tasks } = this.props;

    if (hasErrors) {
      this.setState({
        isLoading: false,
        errors
      });
    } else if (boards.selectedId === "demo") {
      const task = {
        id: Math.max(...tasks.ids) + 1,
        title,
        description,
        status: C.TO_DO
      };

      this.props.addTask(task);
      this.props.addTaskToLane(task.status, task.id);
      this.handleClose();
    } else {
      Api.createTask(boards.selectedId, title, description)
        .then(task => {
          this.props.addTask(task);
          this.props.addTaskToLane(task.status, task.id);
          this.handleClose();
        })
        .catch(e => {
          console.log(e);
          const message =
            "There was a problem with the server handling your request. Please try again later.";
          this.setState({
            isLoading: false,
            errors: { title: null, description: null, api: message }
          });
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
            content={"Add task"}
            icon="plus"
            labelPosition="right"
            onClick={() => this.handleOpen()}
          />
        }
      >
        <Header icon="edit" content="Add a new task" />
        <Modal.Content>
          <CreateTaskForm errors={errors} onChange={this.handleChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button basic content={"Cancel"} onClick={() => this.handleClose()} />
          <Button
            primary
            loading={this.state.isLoading}
            disabled={this.state.isLoading}
            content={"Add task"}
            icon="plus"
            labelPosition="right"
            onClick={() => this.handleConfirm()}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards,
    tasks: state.tasks
  };
};

export default connect(mapStateToProps, {
  addTask: taskActions.addTask,
  addTaskToLane: laneActions.addTaskToLane
})(CreateTaskModal);
