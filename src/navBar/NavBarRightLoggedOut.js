import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'

const NavBarRightLoggedOut = ({ navigation, setLogin }) => {
  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={() => setLogin(true) }>
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLogin(false) }>
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
    fontSize: 16,
    marginRight: 20
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
