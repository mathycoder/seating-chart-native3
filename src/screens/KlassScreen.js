import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollContainer, PanResponder, Animated } from 'react-native'
import { connect } from 'react-redux'
import { fetchStudents } from '../actions/studentActions.js'
import { setCurrentKlass } from '../actions/currentKlassActions.js'
import { ScreenOrientation } from 'expo'
import { Dimensions } from "react-native"
import Desk from '../components/desks/Desk'
import EmptyDesk from '../components/desks/EmptyDesk'
import CloneDesk from '../components/desks/CloneDesk'
import { clearCurrentKlass } from '../actions/currentKlassActions.js'

const KlassScreen = ({ navigation, klasses, route, students, desks,
                       fetchStudents, setCurrentKlass, clearCurrentKlass }) => {
  const [draggedStudent, setDraggedStudent] = useState(null)
  const [overDesk, setOverDesk] = useState(null)
  const [cloneLocation, _setCloneLocation] = useState({x: 0, y: 0})
  const { klass } = route.params
  const pan = useRef(new Animated.ValueXY()).current;

  const cloneLocationRef = useRef()
  const setCloneLocation = data => {
    cloneLocationRef.current = data;
    _setCloneLocation(data);
  };

  const desksRef = useRef(desks)

  useEffect(() => {
    desksRef.current = desks
  }, [desks])

  useEffect(() => {
    if (klass) {
      fetchStudents(klass)
      setCurrentKlass(klass)
    }

    return () => clearCurrentKlass()
  }, [klass])

  useLayoutEffect(() => {
    navigation.dangerouslyGetParent().setOptions({
      title: `Class ${klass.name}`
    });
  }, [navigation]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        setDraggedStudent(e._targetInst.memoizedProps.student)
        // console.log("pan.x", pan.x, "gesture.x0", gesture.x0, "cloneLocationRef", cloneLocationRef.current.x)
        // console.log("pan.y", pan.y, "gesture.y0", gesture.y0, "cloneLocationRef", cloneLocationRef.current.y)
        pan.setOffset({
          x: pan.x._value + gesture.x0 - cloneLocationRef.current.x,
          y: pan.y._value + gesture.y0  - cloneLocationRef.current.y
        });

      },
      onPanResponderMove: (e, gesture) => {
        const over = desksRef.current.allIds.find(seatId => {
          const seat = desksRef.current.byId[seatId]
          if (seat.topLeft && seat.topRight && seat.bottomLeft && seat.bottomRight){
            return (gesture.x0 + pan.x._value > seat.topLeft.x && gesture.x0 + pan.x._value < seat.topRight.x &&
                    gesture.y0 + pan.y._value > seat.topLeft.y && gesture.y0 + pan.y._value < seat.bottomLeft.y)
          } else {
            return false
          }
        })
        if (overDesk !== over) { setOverDesk(over) }

        Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y }
          ]
        )(e, gesture)
      },
      onPanResponderRelease: (e, gesture) => {
        setDraggedStudent(null)
        pan.setOffset({ x: 0, y: 0 })
        pan.setValue({ x: 0, y: 0 })
        setOverDesk(null)
        // pan.flattenOffset();
        // Animated.spring(pan, {
        //   toValue: { x: 0, y: 0 },
        //   friction: 5
        // }).start();
      }
    })
  ).current;


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
      const seatNumber = row*8 + pair*2 + index
      return student ?
              <Desk
                type={"pair"}
                seatNumber={seatNumber}
                overDesk={overDesk}
                key={seatNumber}
                klass={klass}
                student={student}
                students={students}
                pan={pan}
                panResponder={panResponder}
                draggedStudent={draggedStudent}
               />
             : <EmptyDesk
                type={"pair"}
                seatNumber={seatNumber}
                overDesk={overDesk}
                key={seatNumber}
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
        {students.loading ? null : renderDeskRows()}
      </View>
      <CloneDesk
        pan={pan}
        panResponder={panResponder}
        student={draggedStudent}
        setCloneLocation={setCloneLocation}
      />
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
    students: state.students,
    desks: state.seats.pairSeats
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
