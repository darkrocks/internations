import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addUser, fetchGroups } from '../actions'
import { Link } from 'react-router'
import { find, filter } from 'lodash'
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy'


class EditUserForm extends Component {
  constructor(props) {
    super(props)

    this.validatorTypes = {
      username: Joi.string().required().label('Username'),
      groups: Joi.array().min(1).label('Groups')
    };

    this.state = {
      selectedGroupId: null,
      user: this.props.user
    };
    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);

    this.userNameChanged = this.userNameChanged.bind(this)
    this.selectGroupChanged = this.selectGroupChanged.bind(this)
    this.addToGroup = this.addToGroup.bind(this)
    this.removeFromGroup = this.removeFromGroup.bind(this)
    this.save = this.save.bind(this)
  }

  getValidatorData() {
    return {
      username: ReactDOM.findDOMNode(this.refs.username).value,
      groups: this.state.user.groups
    };
  }

  userNameChanged(event) {
    var user = this.state.user;
    user.name = event.target.value;

    this.setState({
      user: user
    });
  }

  selectGroupChanged(event) {
    this.setState({selectedGroupId: parseInt(event.target.value)});
  }

  save() {
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        this.props.save(this.state.user.name, this.state.user.groups);
      }
    };
    this.props.validate(onValidate);
  }

  addToGroup() {
    if (!this.props.allGroups.length) return;

    var selectedGroupId = this.state.selectedGroupId ? this.state.selectedGroupId : this.props.allGroups[0].id;

    const isInGroup = find(this.state.user.groups, (g) => g.id === selectedGroupId);

    if (!isInGroup) {
      var groupToAdd = find(this.props.allGroups, (g) => g.id === selectedGroupId);

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
    });
    this.props.handleValidation('groups')();
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
          <span>
            <input
              type="text"
              ref='username'
              value={this.state.user.name}
              onChange={this.userNameChanged}
              onBlur={this.props.handleValidation('username')}
              />
          </span>
        </div>
        {this.renderHelpText(this.props.getValidationMessages('username'))}
        <div>
          <span>Add to group: </span>
          <span>{ this.renderGroupsSelector()}</span>
          <span><button onClick={this.addToGroup}>Add</button></span>
        </div>
        <div><span>Groups: </span>
          { this.renderGroups()}
        </div>
        {this.renderHelpText(this.props.getValidationMessages('groups'))}
        <div><button onClick={this.save}>{this.props.saveButtonText}</button></div>
      </div>
    )
  }

  renderHelpText(message) {
    return (
      <span className='help-block'>{message}</span>
    );
  }
}


EditUserForm.propTypes = {
  save: PropTypes.func.isRequired,
  saveButtonText: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default validation(strategy)(EditUserForm);

