import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'

const NavBarTitle = () => {
  return (
    <View style={styles.containerStyle}>
      <Text style={[styles.textStyle, {fontWeight: '700'}]}>Flex</Text>
      <Image
        style={styles.imageStyle}
        source={require('../../assets/desk.png')}
      />
      <Text style={styles.textStyle}>Seats</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    width: 130,
    justifyContent: 'space-around'
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

export default NavBarTitle
