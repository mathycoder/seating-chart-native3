import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchStudents } from '../actions/studentActions.js'
import { setCurrentKlass } from '../actions/currentKlassActions.js'
import { ScreenOrientation } from 'expo'
import { Dimensions } from "react-native"
import Desk from '../components/desks/Desk'

const KlassScreen = ({ navigation, klasses, route, students,
                       fetchStudents, setCurrentKlass }) => {
  const { klass } = route.params

  useEffect(() => {
    if (klass) {
      fetchStudents(klass)
      setCurrentKlass(klass)
    }
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
    // return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

  }, [klass])

  // useEffect(() => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
  //   return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  //
  // }, [students])

  useLayoutEffect(() => {
    navigation.dangerouslyGetParent().setOptions({
      title: `Class ${klass.name}`
    });
  }, [navigation]);

  const renderDesks = () => {
    return students.allIds.map(studentId => {
      const student = students.byId[studentId]
      return (
        <Desk student={student} />
      )
    })

  }

  return (
    <View style={styles.containerStyle}>
      <Text
        onPress={() => navigation.goBack()}
        style={styles.xOutStyle}
        >X
      </Text>
      <View style={styles.PairSeatingChart}>
        {renderDesks()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  xOutStyle: {
    fontSize: 20
  },
  PairSeatingChart: {
    backgroundColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

const mapStateToProps = state => {
  return {
    klasses: state.klasses,
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: klass => dispatch(fetchStudents(klass)),
    setCurrentKlass: klass => dispatch(setCurrentKlass(klass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassScreen)
