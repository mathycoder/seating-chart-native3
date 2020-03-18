import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchKlasses } from '../actions/klassActions.js'

const KlassesScreen = () => {
  useEffect(() => {
      fetchKlasses()
    }, [])

  return (
    <View>
      <Text>My Klasses Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

function mapStateToProps(state){
  return {
    klasses: state.klasses
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesScreen)
