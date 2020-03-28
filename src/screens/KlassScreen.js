import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollContainer } from 'react-native'
import { connect } from 'react-redux'
import { fetchStudents } from '../actions/studentActions.js'
import { setCurrentKlass } from '../actions/currentKlassActions.js'
import { ScreenOrientation } from 'expo'
import { Dimensions } from "react-native"
import Desk from '../components/desks/Desk'
import EmptyDesk from '../components/desks/EmptyDesk'
import CloneDesk from '../components/desks/CloneDesk'
import { clearCurrentKlass } from '../actions/currentKlassActions.js'

const KlassScreen = ({ navigation, klasses, route, students,
                       fetchStudents, setCurrentKlass, clearCurrentKlass }) => {
  const { klass } = route.params

  useEffect(() => {
    if (klass) {
      fetchStudents(klass)
      setCurrentKlass(klass)
    }

    return () => clearCurrentKlass()
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

  const seats = () => {
    return [...Array(32).keys()].map(seatNumber => {
      const studentId = students.allIds.find(stId => {
        const st = students.byId[stId]
        return st.seatPair === seatNumber
      })
      return studentId ? studentId : null
    })
  }

  const renderDeskRows = () => {
    const mySeats = seats()
    return [0,1,2,3].map(row => {
      const rowOfStudents = mySeats.slice(row*8, (row+1)*8)
      return (
        <View style={styles.rowStyle} key={`row${row}`}>
          {[0,1,2,3].map(pair => (
              <View style={styles.pairStyle} key={`row${row}pair${pair}`}>
                {renderDeskPairs(rowOfStudents, row, pair)}
              </View>
          ))}
        </View>
      )
    })
  }

  const renderDeskPairs = (rowOfStudents, row, pair) => {
    const pairOfStudents = rowOfStudents.slice(pair*2, (pair+1)*2)
    return pairOfStudents.map((studentId, index) => {
      const student = students.byId[studentId]
      return student ?
              <Desk
                type={"pair"}
                key={index + row*8}
                klass={klass}
                student={student}
                index={index}
                students={students}
               />
             : <EmptyDesk
                type={"pair"}
                key={index + row*8}
                index={index}
                klass={klass}
               />
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
        {renderDeskRows()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  xOutStyle: {
    fontSize: 20,
    alignSelf: "flex-start",
    marginTop: 0,
  },
  PairSeatingChart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',

  },
  rowStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  },
  pairStyle: {
    flexDirection: 'row'
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
    setCurrentKlass: klass => dispatch(setCurrentKlass(klass)),
    clearCurrentKlass: () => dispatch(clearCurrentKlass())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassScreen)
