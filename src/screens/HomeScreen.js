import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {

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


export default HomeScreen
