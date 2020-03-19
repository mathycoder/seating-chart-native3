import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/currentUserActions.js'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'

const Login = ({ login, history }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const submitHandler = () => {
    const data = {
      email: email,
      password: password
    }
    login(data, history)
  }

  return (
    <View style={styles.signupWrapper}>
      <View style={styles.signupForm}>
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
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter password"
          value={password}
          onChangeText={(newValue) => setPassword(newValue)}
        />
      <Button
        onPress={() => submitHandler()}
        title="Log In"
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  signupWrapper: {

  },
  signupForm: {
    fontSize: 20
  },
  flexseatsTitle: {

  },
  textInput: {

  }
})

function mapDispatchToProps(dispatch){
  return {
    login: (credentials, history) => dispatch(login(credentials, history))
  }
}

export default connect(null, mapDispatchToProps)(Login)
