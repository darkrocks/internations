import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { addGroup, changeGroup, createEmptyGroup } from '../actions'
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
        <h4>Create group</h4>

        <div className="row">
          <div className="twelve columns">
            <EditGroupForm
              group={this.props.group}
              save={this.addGroup}
              groupChanged={this.props.changeGroup}
              saveButtonText='Create'/>
          </div>
        </div>
      </div>
    )
  }
}

AddGroupPage.propTypes = {
  addGroup: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired
}

function mapStateToProps(state) {
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


