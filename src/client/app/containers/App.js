import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import '../../style/style.styl'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.onGroupsClick = this.onGroupsClick.bind(this)
    this.onUsersClick = this.onUsersClick.bind(this)
  }


  handleChange(nextValue) {
    this.props.push(`/${nextValue}`)
  }

  onGroupsClick () {
    this.handleChange('groups')
  }

  onUsersClick () {
    this.handleChange('users')
  }

  render() {
    const groupsBtnClassName = this.props.routing.location.pathname === '/groups'? 'button-primary': '';
    const usersBtnClassName = this.props.routing.location.pathname === '/users'? 'button-primary': '';

    const { children} = this.props
    return (
    <div className="container">
      <section className="ik-header">
        <h2>Test task for Internations by Dmitriy Kazinov</h2>
        <button className={groupsBtnClassName} onClick={this.onGroupsClick}>Groups</button>
        <button className={usersBtnClassName} onClick={this.onUsersClick}>Users</button>
      </section>

      {children}
    </div>
    )
  }
}

App.propTypes = {
  push: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  }
}

export default connect(mapStateToProps, {
  push
})(App)
