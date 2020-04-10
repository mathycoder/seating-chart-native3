import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const EmptyDesk = ({ student, seatNumber, overDesk }) => {

  return (
    <View
      style={[styles.deskStyle, overDesk === `seat${seatNumber}` ? {backgroundColor: "#FFFFBF"} : null]}
    >
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
  },
  overDeskStyle: {
    backgroundColor: "yellow"
  }
})

export default EmptyDesk
