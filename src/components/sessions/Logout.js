import React from 'react'
import { logout } from '../../actions/currentUserActions'
import { connect } from 'react-redux'

const Logout = ({ logout, history }) => {
  return (
    <div className="home-page-wrapper">
      {logout(history)}
    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    logout: (history) => dispatch(logout(history))
  }
}

export default connect(null, mapDispatchToProps)(Logout)
