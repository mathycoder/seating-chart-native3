import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, Animated, measure } from 'react-native'

const CloneDesk = ({ student, index, pan, panResponder, setCloneLocation  }) => {
  const refContainer = useRef(null)

  const panStyle = {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }

  const measure = (nativeEvent) => {
    if (refContainer){
      refContainer.current.getNode().measure((fx, fy, width, height, px, py) => {
        setCloneLocation({x: px, y: py})
      })
    }
  }

  return (
    <View>
      <Animated.View
        style={[styles.deskStyle, panStyle]}
        {...panResponder.panHandlers}
        ref={refContainer}
        onLayout={({ nativeEvent }) => measure()}
      >
        <Text>{student ? student.firstName : 'Clone'}</Text>
      </Animated.View>
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
    zIndex: -1,
  },
  gapStyle: {
    width: 30
  }
})

export default CloneDesk
