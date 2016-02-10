import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addUser, fetchGroups } from '../actions'
import { Link } from 'react-router'
import { find, filter } from 'lodash'

class EditUserForm extends Component {
  constructor(props) {
    super(props)

    this.saveButtonClicked = false;

    this.state = {
      user: null,
      selectedGroupId: null,
      validation: {
        name: true,
        groups: true
      }
    };

    this.userNameChanged = this.userNameChanged.bind(this)
    this.selectGroupChanged = this.selectGroupChanged.bind(this)
    this.addToGroup = this.addToGroup.bind(this)
    this.removeFromGroup = this.removeFromGroup.bind(this)
    this.save = this.save.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.selectedGroupId && newProps.allGroups && newProps.allGroups.length > 0) {
      this.setState({
        selectedGroupId: newProps.allGroups[0].id
      })
    }
    
    if (this.state.user === null && newProps.user ) {
      this.setState({
        user: newProps.user
      });
    }
  }

  userNameChanged(event) {
    var user = this.state.user;
    user.name = event.target.value;

    this.setState({
      user: user
    }, () => {
      this.setState({
        validation: this.getValidationState()
      });
    });
  }

  selectGroupChanged(event) {
    this.setState({selectedGroupId: parseInt(event.target.value)});
  }

  save() {
    this.saveButtonClicked = true;
    if (this.isFormValid()) {
      this.props.save(this.state.user.name, this.state.user.groups);
    }
    else {
      this.setState({validation: this.getValidationState()});
    }
  }

  isFormValid() {
    return this.state.user.name && this.state.user.groups.length;
  }

  getValidationState() {
    var validation = {
      name: true,
      groups: true
    };

    if (this.saveButtonClicked) {
      if (!this.state.user.name) validation.name = false;
      if (!this.state.user.groups.length) validation.groups = false;
    }

    return validation;
  }

  addToGroup() {
    const isInGroup = find(this.state.user.groups, (g) => g.id === this.state.selectedGroupId);

    if (!isInGroup) {
      var groupToAdd = find(this.props.allGroups, (g) => g.id === this.state.selectedGroupId);

      var groups = this.state.user.groups;
      groups.push(groupToAdd);

      this.setStateForGroups(groups);
    }
  }

  removeFromGroup(groupId) {
    var newGroups = filter(this.state.user.groups, (group) => group.id !== groupId);
    this.setStateForGroups(newGroups);
  }

  setStateForGroups(groups) {
    var user = this.state.user;
    user.groups = groups;

    this.setState({
      user: user
    }, () => {
      this.setState({
        validation: this.getValidationState()
      });
    });
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
    const that = this;
    if (!this.state.user.groups.length) return null;

    return (
      <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Users</th>
          </tr>
          </thead>
          <tbody>
          {this.state.user.groups.map((group) => {
            function remove () {
              that.removeFromGroup(group.id);
            }

            return (
              <tr>
                <td>
                    {group.name}
                </td>
                <td><button onClick={remove}>Remove</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    if (!this.state.user) return null;

    return (
      <div>
        <div>
          <span>Name: </span>
          <span><input type="text" value={this.state.user.name} onChange={this.userNameChanged} /></span>
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


