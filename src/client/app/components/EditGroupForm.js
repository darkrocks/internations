import React, { Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { find, filter } from 'lodash'
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy'


class EditGroupForm extends Component {
  constructor(props) {
    super(props)

    this.validatorTypes = {
      groupname: Joi.string().required().label('Group name')
    };

    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);

    this.groupNameChanged = this.groupNameChanged.bind(this)
    this.save = this.save.bind(this)
  }

  getValidatorData() {
    return {
      groupname: ReactDOM.findDOMNode(this.refs.groupname).value
    };
  }

  groupNameChanged(event) {
    this.props.groupChanged({
      id: this.props.group.id,
      name: event.target.value
    });
  }

  save() {
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        this.props.save(this.props.group);
      }
    };
    this.props.validate(onValidate);
  }

  render() {
    if (!this.props.group) return null;

    return (
      <div>
        <div>
          <label className="ik-inline-label">Name:</label>
          <input
            type="text"
            ref='groupname'
            value={this.props.group.name}
            onChange={this.groupNameChanged}
            onBlur={this.props.handleValidation('groupname')}
            />
        </div>
        <div>
          <button className="button-primary" onClick={this.save}>{this.props.saveButtonText}</button>
        </div>
      </div>
    )
  }

  renderHelpText(message) {
    return (
      <span className='help-block'>{message}</span>
    );
  }
}


EditGroupForm.propTypes = {
  save: PropTypes.func.isRequired,
  groupChanged: PropTypes.func.isRequired,
  saveButtonText: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired
}

export default validation(strategy)(EditGroupForm);

