import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signupTeacher } from '../../actions/teacherActions.js'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Signup = ({ login, navigation, signupTeacher }) => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const submitHandler = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }
    signupTeacher(data, navigation)
  }

  return (
    <View style={styles.signupWrapper}>
      <Text style={styles.flexseatsTitle}>
        Sign Up
      </Text>
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder="Enter first name"
        value={firstName}
        onChangeText={(newValue) => setFirstName(newValue)}
      />
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder="Enter last name"
        value={lastName}
        onChangeText={(newValue) => setLastName(newValue)}
      />
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        autoCapitalize="none"
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
    <TouchableOpacity onPress={() => submitHandler()}>
        <LinearGradient
          style={styles.myButton}
          start={[0.5, 0]}
          end={[0.5,1]}
          colors={['#eae0c2', '#ccc2a6']}>

          <Text style={styles.buttonText}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  signupWrapper: {
    backgroundColor: "rgb(166, 152, 143)",
    alignItems: "center",
    justifyContent: "space-around",
    width: 300,
    height: 280,
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
  },
  myButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
    borderColor: "#333029",
    borderWidth: 1,


  },
  buttonText: {
    fontSize: 16
  }
})


function mapDispatchToProps(dispatch){
  return {
    signupTeacher: (data, navigation) => dispatch(signupTeacher(data, navigation))
  }
}

export default connect(null, mapDispatchToProps)(Signup)
