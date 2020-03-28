import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Desk = ({ student, index }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [zIndex, setZIndex] = useState(-1)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setZIndex(1)
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        setZIndex(1)
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 6
        }).start();
      }
    })
  ).current;

  const panStyle = {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }

  return (
    <View style={{ zIndex: zIndex }}>
      <Animated.View
        style={[styles.deskWrapperStyle, panStyle]}
        {...panResponder.panHandlers}
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
    zIndex: -1
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
