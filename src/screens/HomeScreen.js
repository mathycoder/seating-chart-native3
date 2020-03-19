import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { getCurrentUser } from '../actions/currentUserActions.js'
import { connect } from 'react-redux'

const HomeScreen = ({ navigation, getCurrentUser }) => {
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title="Go to My Classes"
        onPress={() => navigation.navigate('Klasses')}
      />
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
    klasses: state.klasses
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
