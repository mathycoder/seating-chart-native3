import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HomeScreen = () => {

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Home Screen</Text>
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


export default HomeScreen
