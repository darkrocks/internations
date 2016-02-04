import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Explore from '../components/Explore'
import { resetErrorMessage } from '../actions'
import '../../style/style.styl'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
    this.onGroupsClick = this.onGroupsClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    this.props.push(`/${nextValue}`)
  }

  onGroupsClick () {
    this.handleChange('groups')
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {

    function onGroupsClick (){
      this.handleChange('groups')
    }

    const { children, inputValue } = this.props
    return (
      <div>
        <div>
          <button onClick={this.onGroupsClick}>Groups</button>
          <button>Users</button>

        </div>
        <Explore value={inputValue}
                 onChange={this.handleChange} />
        <hr />

        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    inputValue: state.routing.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  push
})(App)
