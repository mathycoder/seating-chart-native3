import React from 'react'
import { Text, View, StyleSheet, Animated } from 'react-native'

const CloneDesk = ({ student, index, pan, panResponder  }) => {
  const panStyle = {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }

  return (
    <View>
      <Animated.View
        style={[styles.deskStyle, panStyle]}
        {...panResponder.panHandlers}
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
    zIndex: -1
  },
  gapStyle: {
    width: 30
  }
})

export default CloneDesk
