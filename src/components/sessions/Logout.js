import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { logout } from '../../actions/currentUserActions'
import { connect } from 'react-redux'

const Logout = ({ logout, navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => logout(navigation)}>
        <Text style={styles.textStyle}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    marginRight: 20
  }
})


function mapDispatchToProps(dispatch){
  return {
    logout: (navigation) => dispatch(logout(navigation))
  }
}

export default connect(null, mapDispatchToProps)(Logout)
