import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const EmptyDesk = ({ student }) => {
  return (
    <View style={styles.deskStyle}>
    </View>
  )
}

// background: none;
// border: 1px solid lightgray;
// background-color: white;
// box-shadow: none;

const styles = StyleSheet.create({
  deskStyle: {
    width: 50,
    height: 38,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "white"
  },

})

export default EmptyDesk
