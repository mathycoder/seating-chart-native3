import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchKlasses } from '../actions/klassActions.js'
import { getCurrentUser } from '../actions/currentUserActions.js'
import KlassesIndex from '../components/klasses/KlassesIndex'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import KlassScreen from './KlassScreen'

const KlassesScreen = ({ navigation, klasses, fetchKlasses }) => {
  useEffect(() => {
      fetchKlasses()
    }, [])

  return (
    <>
      <View style={styles.containerStyle}>
        <KlassesIndex navigation={navigation} />
      </View>
    </>
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
    fetchKlasses: () => dispatch(fetchKlasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesScreen)
