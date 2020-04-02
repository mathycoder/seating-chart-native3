import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { setSeatLocation } from '../../actions/seatActions.js'
import { connect } from 'react-redux'

const Desk = ({ student, draggedStudent, panResponder, seatNumber, setSeatLocation, overDesk }) => {
  const deskRef = React.createRef()


  const myMeasure = () => {
    if (deskRef){
      window.setTimeout(() => {
        deskRef.current.measure((fx, fy, width, height, px, py) => {
          setSeatLocation(seatNumber, {
            screenX: px,
            screenY: py,
            width: width,
            height: height
          })
        })
      }, 0)
    }
  }

  const floatingStyle = student === draggedStudent ?
    {opacity: 0.2} : null

  const overStyle = overDesk === `seat${seatNumber}` ? ["yellow", "yellow"] : ['#f6f6f6', '#e9e9e9']

//onLayout={({ nativeEvent }) => myMeasure()}

  return (
    <View>
      <View
        style={[styles.deskWrapperStyle, floatingStyle]}
        {...panResponder.panHandlers}
        ref={deskRef}

        student={student}
      >
        <LinearGradient
          style={styles.deskStyle}
          start={[0.5, 0]}
          end={[0.5,1]}
          colors={overStyle}>
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

const mapDispatchToProps = dispatch => {
  return {
    setSeatLocation: (seatNumber, measurements) => dispatch(setSeatLocation(seatNumber, measurements))
  }
}

export default connect(null, mapDispatchToProps)(Desk)
