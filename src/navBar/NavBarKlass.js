import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

const NavBarKlass = ({ klass }) => {

  const renderKlassTitle = () => (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{`Class ${klass.name}`}</Text>
      <Text style={styles.textStyle}>Students</Text>
    </View>
  )

  const renderKlassesTitle = () => (
    <View>
      <Text>Classes</Text>
    </View>
  )

  return (
    <>
      {klass ? renderKlassTitle() : renderKlassesTitle()}
    </>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 16,
    marginHorizontal: 20
  }
})

export default NavBarKlass
