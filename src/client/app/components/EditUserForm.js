import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addUser, fetchGroups } from '../actions'
import { Link } from 'react-router'
import find from 'lodash/find'

class EditUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.user.name,
      groups: this.props.user.groups,
      selectedGroupId: null,
      validation: {
        name: true,
        groups: true
      }
    };

    this.userNameChanged = this.userNameChanged.bind(this)
    this.selectGroupChanged = this.selectGroupChanged.bind(this)
    this.addToGroup = this.addToGroup.bind(this)
    this.save = this.save.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.selectedGroupId && newProps.allGroups && newProps.allGroups.length > 0) {
      this.setState({
        selectedGroupId: newProps.allGroups[0].id
      })
    }
  }

  userNameChanged(event) {
    this.setState({
      name: event.target.value,
      validation: this.getValidationState()
    });
  }

  selectGroupChanged(event) {
    this.setState({selectedGroupId: parseInt(event.target.value)});
  }

  save() {
    if (this.isFormValid()) {
      this.props.save(this.state.name, this.state.groups);
    }
    else {
      this.setState({validation: this.getValidationState()});
    }
  }

  isFormValid() {
    return this.state.name && this.state.groups.length;
  }

  getValidationState() {
    var validation = {
      name: true,
      groups: true
    };

    if (!this.state.name) validation.name = false;
    if (!this.state.groups.length) validation.groups = false;

    return validation;
  }

  addToGroup() {
    const isInGroup = find(this.state.groups, (g) => g.id === this.state.selectedGroupId);

    if (!isInGroup) {
      var groupToAdd = find(this.props.allGroups, (g) => g.id === this.state.selectedGroupId);

      var groups = this.state.groups;
      groups.push(groupToAdd);
      this.setState({
        groups: groups,
        validation: this.getValidationState()
      });
    }
  }

  renderGroupsSelector() {
    if (!this.props.allGroups) return null;

    return (
      <select value={this.state.selectedGroupId} onChange={this.selectGroupChanged}>
        {
          this.props.allGroups.map((group) => {
            return (
              <option value={group.id}>{group.name}</option>
            )
          })
        }
      </select>
    );
  }

  renderGroups() {
    if (!this.state.groups.length) return null;

    return this.state.groups.map((group) => {
      return (
        <span>
            {group.name},
        </span>
      )
    });
  }


  render() {
    return (
      <div>
        <div>
          <span>Name: </span>
          <span><input type="text" value={this.state.name} onChange={this.userNameChanged} /></span>
        </div>
        { !this.state.validation.name ? (<div>Name field id required</div>) : null }
        <div>
          <span>Add to group: </span>
          <span>{ this.renderGroupsSelector()}</span>
          <span><button onClick={this.addToGroup}>Add</button></span>
        </div>
        <div><span>Groups: </span>
          { this.renderGroups()}
        </div>
        { !this.state.validation.groups ? <div>User should be added at least to one group</div> : null }
        <div><button onClick={this.save}>{this.props.saveButtonText}</button></div>
      </div>
    )
  }
}

EditUserForm.propTypes = {
  save: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  saveButtonText: PropTypes.string.isRequired
}

export default EditUserForm;


