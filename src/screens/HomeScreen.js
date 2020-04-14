import React, { useState } from 'react'
import { KeyboardAvoidingView, View, Text, StyleSheet, Button, ImageBackground } from 'react-native'
import { getCurrentUser } from '../actions/currentUserActions.js'
import { connect } from 'react-redux'
import Login from '../components/sessions/Login'
import Signup from '../components/sessions/Signup'
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

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.containerStyle}
      keyboardVerticalOffset={50}
    >
      <ImageBackground source={require('../../assets/desks4.png')} style={styles.imageStyle}>
        {login ? <Login navigation={navigation} /> : <Signup navigation={navigation} />}
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    flex: 1
  },
  imageStyle: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },
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
