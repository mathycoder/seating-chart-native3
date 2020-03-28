import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Desk = ({ student, index }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [moving, setMoving] = useState(false)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        setMoving(true)
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
        setMoving(false)
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5
        }).start();
      }
    })
  ).current;

  const panStyle = {
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }

  const floatingStyle = {
    opacity: 1
  }

  const activeCloneStyle = {
    display: 'block'
  }

  return (
    <>
      <View>
        <Animated.View
          style={[styles.deskWrapperStyle, (moving ? floatingStyle : null)]}
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
      <Animated.View
        style={[styles.cloneStyle, panStyle, moving ? activeCloneStyle : null]}
        {...panResponder.panHandlers}
      >
        <Text>Clone</Text>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  cloneStyle: {
    display: "none",
    position: 'absolute',
    zIndex: 999
  },
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
