import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, Animated, measure } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const CloneDesk = ({ student, index, pan, panResponder, setCloneLocation  }) => {
  const refContainer = useRef(null)

  const panStyle = {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }

  const myMeasure = (nativeEvent) => {
    if (refContainer){
      window.setTimeout(() => {
        refContainer.current.getNode().measure((fx, fy, width, height, px, py) => {
          setCloneLocation({x: px + width/2, y: py + height/2})
        })
      }, 500)
    }
  }

  return (
    <View style={{position: 'absolute', left: -50, top: -50}}>
      <Animated.View
        style={[student ? styles.deskStyle : styles.hiddenStyle, panStyle]}
        {...panResponder.panHandlers}
        ref={refContainer}
        onLayout={({ nativeEvent }) => myMeasure()}
      >
        <LinearGradient
          style={styles.deskStyle}
          start={[0.5, 0]}
          end={[0.5,1]}
          colors={['#f6f6f6', '#e9e9e9']}>
          <View style={styles.grooveStyle}></View>
          <View style={styles.deskItemsStyle}>
            <Text style={styles.deskItemsText}>{student ? student.firstName : ''}</Text>
            <View style={styles.ratingsStyle}>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
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
    zIndex: -1,
  },
  hiddenStyle: {
    borderWidth: 0,
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

export default CloneDesk
