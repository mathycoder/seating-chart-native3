import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { getCurrentUser } from '../actions/currentUserActions.js'
import { connect } from 'react-redux'
import Login from '../components/sessions/Login'
import NavBarRightLoggedOut from '../navBar/NavBarRightLoggedOut'

const HomeScreen = ({ navigation, getCurrentUser, currentUser }) => {

  const [ login, setLogin ] = useState(true)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavBarRightLoggedOut navigation={navigation} setLogin={setLogin} />
      ),
    });
  }, [navigation, setLogin]);

  if (login) {
    return (
      <View style={styles.containerStyle}>
        <Login navigation={navigation} />
      </View>
    )
  } else {
    return (
      <View>
        <Text>Hi</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    flex: 1
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
