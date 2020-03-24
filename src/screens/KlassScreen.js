import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/currentUserActions.js'
import KlassesIndex from '../components/klasses/KlassesIndex'

const KlassScreen = ({ klasses, route }) => {
  const { klass } = route.params
  console.log(klass)

  return (
    <View style={styles.containerStyle}>
      <Text>{`Class ${klass.name}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    flex: 1
  }
})

function mapStateToProps(state){
  return {
    klasses: state.klasses
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassScreen)
