import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const EmptyDesk = ({ student, index }) => {
  return (
    <View style={styles.deskStyle}>
    </View>
  )
}

const styles = StyleSheet.create({
  deskStyle: {
    width: 65,
    height: 52,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "white",
    zIndex: -1
  },
  gapStyle: {
    width: 30
  }
})

export default EmptyDesk
