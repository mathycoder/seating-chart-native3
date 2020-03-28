import React, { useRef } from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const Desk = ({ student, index }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
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
  },
  grooveStyle: {
    backgroundColor: 'lightgray',
    height: 2,
    width: 35,
    position: 'absolute',
    top: 3
  }
})

// background-color: darkgray;
// height: 2px;
// width: 50px;
// display: block;
// margin: 0 auto;
// margin-top: 4px;

export default Desk
