import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/currentUserActions.js'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import BigButton from '../buttons/BigButton'

const Login = ({ login, navigation }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const submitHandler = () => {
    const data = {
      email: email,
      password: password
    }
    login(data, navigation)
  }

  return (
    <View style={styles.signupWrapper}>
      <Text style={styles.flexseatsTitle}>
        Login
      </Text>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter email"
        value={email}
        onChangeText={(newValue) => setEmail(newValue)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter password"
        value={password}
        onChangeText={(newValue) => setPassword(newValue)}
      />
      <BigButton
        callbackFunction={() => submitHandler()}
        title="Log In"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  signupWrapper: {
    backgroundColor: "rgb(166, 152, 143)",
    alignItems: "center",
    justifyContent: "space-around",
    width: 300,
    height: 200,
    alignSelf: "center",
    borderColor: "#3e4444",
    borderWidth: 3,

  },
  flexseatsTitle: {
    fontSize: 24,
    fontWeight: "500"
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    width: 200,
    fontSize: 16
  }
})

function mapDispatchToProps(dispatch){
  return {
    login: (credentials, navigation) => dispatch(login(credentials, navigation))
  }
}

export default connect(null, mapDispatchToProps)(Login)
