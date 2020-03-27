import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Desk = ({ student, index }) => {
  return (
    <View style={styles.deskWrapperStyle}>
      <LinearGradient
        style={styles.deskStyle}
        start={[0.5, 0]}
        end={[0.5,1]}
        colors={['#f6f6f6', '#e9e9e9']}>
        <View style={styles.grooveStyle}></View>
        <View style={styles.deskItemsStyle}>
          <Text style={styles.deskItemsText}>{student.firstName}</Text>
          <View style={styles.ratingsStyle}>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  deskWrapperStyle: {
    shadowColor: '#888888',
    shadowOffset: { width: 0.5, height: 1 },
    shadowRadius: 1,
    shadowOpacity: .8,
    overflow: "visible",
    borderRadius: 5,
  },
  deskStyle: {
    width: 60,
    height: 48,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "#f6f6f6",

  },
  deskItemsText: {
    fontSize: 12
  },
  gapStyle: {
    width: 30
  }
})

export default Desk
