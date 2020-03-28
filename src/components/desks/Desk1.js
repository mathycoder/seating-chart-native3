import React, { Component } from 'react'
import { Text, View, StyleSheet, PanResponder, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

class Desk extends Component {
  constructor(){
    super()
    this.state = {
      pan: new Animated.ValueXY(),
      moving: false
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      // runs when the drag starts
      onPanResponderGrant: () => {
        this.state.pan.setOffset(this.state.pan.__getValue());
        this.state.pan.setValue({ x: 0, y: 0 });
        this.setState({...this.state, moving: true})
      },
      onPanResponderMove: Animated.event([
        null, {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        console.log(gesture)
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 6
        }).start();
      }

    });
  }

  render(){
    const { student, index } = this.props
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    const elevateStyle = {
      zIndex: this.state.moving ? 999 : 1
    }

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.deskWrapperStyle, elevateStyle]}
      >
        <LinearGradient
          style={[styles.deskStyle, {shadowRadius: this.state.moving ? 0 : 1}, elevateStyle]}
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
}

const styles = StyleSheet.create({
  deskWrapperStyle: {
    shadowColor: '#888888',
    shadowOffset: { width: 0.5, height: 1 },
    shadowRadius: 1,
    shadowOpacity: .8,
    overflow: "visible",
    borderRadius: 5,
    zIndex: 1
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
    zIndex: 1

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


export default Desk
