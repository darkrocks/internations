import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
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
      selectedGroupId: null
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
      groups: this.props.user.groups
    };
  }

  userNameChanged(event) {
    this.props.userChanged({
      id: this.props.user.id,
      name: event.target.value,
      groups: this.props.user.groups
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
        this.props.save(this.props.user);
      }
    };
    this.props.validate(onValidate);
  }

  addToGroup() {
    if (!this.props.allGroups.length) return;

    var selectedGroupId = this.state.selectedGroupId ? this.state.selectedGroupId : this.props.allGroups[0].id;

    const isInGroup = find(this.props.user.groups, (g) => g.id === selectedGroupId);

    if (!isInGroup) {
      var groupToAdd = find(this.props.allGroups, (g) => g.id === selectedGroupId);

      var groups = this.props.user.groups;
      groups.push(groupToAdd);

      this.setStateForGroups(groups);
    }
  }

  removeFromGroup(groupId) {
    var newGroups = filter(this.props.user.groups, (group) => group.id !== groupId);
    this.setStateForGroups(newGroups);
  }

  setStateForGroups(groups) {
    this.props.userChanged({
      id: this.props.user.id,
      name: this.props.user.name,
      groups: groups
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
    if (!this.props.user.groups.length) return null;

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
          {this.props.user.groups.map((group) => {
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
    if (!this.props.user) return null;

    return (
      <div>
        <div>
          <span>Name: </span>
          <span>
            <input
              type="text"
              ref='username'
              value={this.props.user.name}
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
  userChanged: PropTypes.func.isRequired,
  saveButtonText: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default validation(strategy)(EditUserForm);

