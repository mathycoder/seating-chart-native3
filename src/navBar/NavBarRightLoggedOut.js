import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'

const NavBarRightLoggedOut = ({ navigation }) => {
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.textStyle}>Signup</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 14,
    marginRight: 10
  },
  boldStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  imageStyle: {
    marginTop: 10,
    width: 15,
    height: 15
  }
})

export default NavBarRightLoggedOut
