import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { setSeatLocation } from '../../actions/seatActions.js'
import { connect } from 'react-redux'

const EmptyDesk = ({ student, row, pair, index, seatNumber, setSeatLocation }) => {
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

  return (
    <View
      style={styles.deskStyle}
      ref={deskRef}
      onLayout={({ nativeEvent }) => myMeasure()}
    >
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

const mapDispatchToProps = dispatch => {
  return {
    setSeatLocation: (seatNumber, measurements) => dispatch(setSeatLocation(seatNumber, measurements))
  }
}

export default connect(null, mapDispatchToProps)(EmptyDesk)
