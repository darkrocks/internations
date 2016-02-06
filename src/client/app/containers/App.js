import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { resetErrorMessage } from '../actions'
import '../../style/style.styl'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onGroupsClick = this.onGroupsClick.bind(this)
  }


  handleChange(nextValue) {
    this.props.push(`/${nextValue}`)
  }

  onGroupsClick () {
    this.handleChange('groups')
  }

  render() {
    const { children} = this.props
    return (
      <div>
        <div>
          <button onClick={this.onGroupsClick}>Groups</button>
          <button>Users</button>
        </div>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  push: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, {
  push
})(App)
