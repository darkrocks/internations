import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { saveGroup, fetchGroupDetails, changeGroup } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'
import EditGroupForm from '../components/EditUserForm';

class EditGroupPage extends Component {
  constructor(props) {
    super(props);
    this.saveGroup = this.saveGroup.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroupDetails(this.props.groupId);
  }

  saveGroup(group) {
    this.props.saveGroup(group)
      .then(() => {
        this.props.push(`/groups`);
      });
  }

  render() {
    if (!this.props.group) return null;

    return (
      <div>
        <h1>Edit group</h1>
        <EditUserForm user={this.props.group} save={this.saveGroup} saveButtonText='Save'
                      groupChanged ={this.props.changeGroup}
                      />
      </div>
    )
  }
}

EditGroupPage.propTypes = {
  saveGroup: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired
}

function mapStateToProps(state, props) {
  return {
    group: state.groupForEdit,
    groupId:  props.params.groupId
  }
}

export default connect(mapStateToProps, {
  fetchGroupDetails,
  changeGroup,
  saveGroup,
  push
})(EditGroupPage)


