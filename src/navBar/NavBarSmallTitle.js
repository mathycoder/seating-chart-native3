import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'

const NavBarSmallTitle = () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={[styles.textStyle, {fontWeight: '700'}]}>F</Text>
      <Image
        style={styles.imageStyle}
        source={require('../../assets/desk.png')}
      />
      <Text style={styles.textStyle}>S</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-around',
    marginLeft: 15
  },
  textStyle: {
    fontSize: 25
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

export default NavBarSmallTitle
