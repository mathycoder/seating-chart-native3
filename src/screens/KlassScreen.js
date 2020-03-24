import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchStudents } from '../actions/studentActions.js'
import { setCurrentKlass } from '../actions/currentKlassActions.js'

const KlassScreen = ({ navigation, klasses, route,
                       fetchStudents, setCurrentKlass }) => {
  const { klass } = route.params

  useEffect(() => {
    if (klass) {
      fetchStudents(klass)
      setCurrentKlass(klass)
    }
  }, [klass])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Class ${klass.name}`
    });
  }, [navigation]);

  return (
    <View style={styles.containerStyle}>
      <Text>Klass Show Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    klasses: state.klasses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: klass => dispatch(fetchStudents(klass)),
    setCurrentKlass: klass => dispatch(setCurrentKlass(klass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassScreen)
