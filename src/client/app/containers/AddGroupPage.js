import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addGroup, changeGroup, createEmptyGroup } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'
import EditGroupForm from '../components/EditGroupForm';

class AddGroupPage extends Component {
  constructor(props) {
    super(props);

    this.addGroup = this.addGroup.bind(this);
  }

  componentWillMount() {
    this.props.createEmptyGroup();
  }

  addGroup(group) {
    this.props.addGroup(group)
      .then(() => {
        this.props.push(`/groups`);
      });
  }

  render() {
    if (!this.props.group) return null;

    return (

      <div>
        <h1>Add group</h1>
        <EditGroupForm
          group={this.props.group}
          save={this.addGroup}
          groupChanged = {this.props.changeGroup}
          saveButtonText='Add' />
      </div>
    )
  }
}

AddGroupPage.propTypes = {
  addGroup: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    group: state.groupForEdit
  }
}

export default connect(mapStateToProps, {
  changeGroup,
  addGroup,
  createEmptyGroup,
  push
})(AddGroupPage)


