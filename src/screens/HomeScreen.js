import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { getCurrentUser } from '../actions/currentUserActions.js'
import { connect } from 'react-redux'
import Login from '../components/sessions/Login'

const HomeScreen = ({ navigation, getCurrentUser, currentUser }) => {
  return (
    <View style={styles.containerStyle}>
      <Login navigation={navigation} />
      <Button title="Go to Classes" onPress={() => navigation.navigate('Klasses')} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {

  },
  textStyle: {
    fontSize: 20
  }
})

function mapStateToProps(state){
  return {
    klasses: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
