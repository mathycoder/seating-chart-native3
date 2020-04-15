import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, Animated, measure } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux'

const CloneDesk = ({ student, index, pan, panResponder, setCloneLocation,
                     currentBehavior, currentAcademics   }) => {
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
      }, 300)
    }
  }

  return (
    <View style={{position: 'absolute', left: -500, top: -500}}>
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
              {currentAcademics ? <Text style={styles.academicStyle}>{student ? student.academicScore : ''}</Text> : null}
              {currentBehavior ? <Text style={styles.behaviorStyle}>{student ? student.behaviorScore : ''}</Text> : null}
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

export default connect(mapStateToProps, null)(CloneDesk)
