import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const EmptyDesk = ({ student, index }) => {
  return (
    <>
      <View style={styles.deskStyle}>
      </View>
      {index % 2 === 1 ? <View style={styles.gapStyle}></View> : null}
    </>
  )
}

// background: none;
// border: 1px solid lightgray;
// background-color: white;
// box-shadow: none;

const styles = StyleSheet.create({
  deskStyle: {
    width: 60,
    height: 48,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "white",
    marginVertical: 10
  },
  gapStyle: {
    width: 30
  }
})

export default EmptyDesk
