import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur'
import { connect } from 'react-redux'

const Desk = ({ student, draggedStudent, panResponder, seatNumber,
                overDesk, currentBehavior, currentAcademics }) => {
  const floatingStyle = student === draggedStudent ?
    {opacity: 0.2} : null

  const overStyle = overDesk === `seat${seatNumber}` ? ["#FFFFBF", "#FFFFBF"] : ['#f6f6f6', '#e9e9e9']

  return (
    <View>
      <View
        style={[styles.deskWrapperStyle, floatingStyle]}
        {...panResponder.panHandlers}
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
              {currentAcademics ? <Text style={styles.academicStyle}>{student.academicScore}</Text> : null}
              {currentBehavior ? <Text style={styles.behaviorStyle}>{student.behaviorScore}</Text> : null}
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
    fontSize: 13,
    textAlign: 'center'
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
  },
  ratingsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 60,
  },
  academicStyle: {
    color: 'green',
    opacity: 0.5,
    fontSize: 12
  },
  behaviorStyle: {
    color: 'red',
    opacity: 0.5,
    fontSize: 12
  }
})

const mapStateToProps = state => {
  return {
    currentBehavior: state.currentKlass.behavior,
    currentAcademics: state.currentKlass.academics
  }
}

export default connect(mapStateToProps, null)(Desk)
