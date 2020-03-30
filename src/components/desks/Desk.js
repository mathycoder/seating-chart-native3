import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Desk = ({ student, draggedStudent, panResponder,
                seatsArrayRef, row, pair, index }) => {
  const [myMeasurements, _setMyMeasurements] = useState(null)

  const floatingStyle = student === draggedStudent ?
    {opacity: 0.2} : null

  const seatNumber = row*8 + pair*2 + index

  const myMeasure = () => {
    if (seatsArrayRef.current[seatNumber]){
      window.setTimeout(() => {
        seatsArrayRef.current[seatNumber].getNode().measure((fx, fy, width, height, px, py) => {
          setMyMeasurements({
            screenX: px,
            screenY: py,
            width: width,
            height: height
          })
        })
      }, 500)
    }
  }

  return (
    <View>
      <View
        style={[styles.deskWrapperStyle, floatingStyle]}
        {...panResponder.panHandlers}
        ref={seatsArrayRef.current[seatNumber]}
        onLayout={({ nativeEvent }) => myMeasure()}
        student={student}
      >
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
    zIndex: -1,
  },
  deskStyle: {
    width: 65,
    height: 52,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "#f6f6f6",
    zIndex: -1
  },
  deskItemsText: {
    fontSize: 13
  },
  gapStyle: {
    width: 30
  },
  grooveStyle: {
    backgroundColor: 'lightgray',
    height: 2,
    width: 35,
    position: 'absolute',
    top: 3
  }
})

export default Desk
