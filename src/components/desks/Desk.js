import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Desk = ({ student, index }) => {
  return (
    <>
      <View style={styles.deskStyle}>
        <View style={styles.grooveStyle}></View>
        <View style={styles.deskItemsStyle}>
          <Text style={styles.deskItemsText}>{student.firstName}</Text>
          <View style={styles.ratingsStyle}>
          </View>
        </View>
      </View>
      {index % 2 === 1 ? <View style={styles.gapStyle}></View> : null}
    </>
  )
}

const styles = StyleSheet.create({
  deskStyle: {
    width: 60,
    height: 48,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#f6f6f6",
    marginVertical: 10
  },
  deskItemsText: {
    fontSize: 12
  },
  gapStyle: {
    width: 30
  }
})

export default Desk
