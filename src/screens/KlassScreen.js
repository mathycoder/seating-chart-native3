import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
        ScrollContainer, PanResponder, Animated } from 'react-native'
import { connect } from 'react-redux'
import { fetchStudents } from '../actions/studentActions.js'
import { setCurrentKlass, clearCurrentKlass } from '../actions/currentKlassActions.js'
import { ScreenOrientation } from 'expo'
import { Dimensions } from "react-native"
import Desk from '../components/desks/Desk'
import EmptyDesk from '../components/desks/EmptyDesk'
import CloneDesk from '../components/desks/CloneDesk'
import StudentsIndex from '../components/students/StudentsIndex'
import { newSeat, swapSeats } from '../actions/studentActions.js'
import { setSeatLocations } from '../actions/seatActions.js'
import NavBarKlass from '../navBar/NavBarKlass'
import GearMenu from '../components/klasses/GearMenu'

const KlassScreen = ({ navigation, klasses, route, students, desks,
                       fetchStudents, setCurrentKlass, clearCurrentKlass, grouping,
                       swap, newSeat, setSeatLocations, studentsPage, gearMenu }) => {
  const [draggedStudent, setDraggedStudent] = useState(null)
  const [overDesk, _setOverDesk] = useState(null)
  const [cloneLocation, _setCloneLocation] = useState({x: 0, y: 0})
  const [panResponderEnabled, _setPanResponderEnabled] = useState(true)
  const { klass } = route.params

  const pan = useRef(new Animated.ValueXY()).current;
  const cloneLocationRef = useRef()
  const setCloneLocation = data => {
    cloneLocationRef.current = data;
    _setCloneLocation(data);
  };

  const panResponderEnabledRef = useRef(panResponderEnabled)
  const setPanResponderEnabled = data => {
    panResponderEnabledRef.current = data
    _setPanResponderEnabled(data)
  }

  const desksRef = useRef(desks)
  const studentsRef = useRef(students)
  const overDeskRef = useRef(overDesk)
  const groupingRef = useRef(grouping)

  useEffect(() => {
    gearMenu ? setPanResponderEnabled(false) : setPanResponderEnabled(true)
  }, [gearMenu])

  useEffect(() => {
    setCurrentKlass(klass)
    setSeatLocations(Dimensions.get('window').width, Dimensions.get('window').height, grouping)
    groupingRef.current = grouping
  }, [grouping])

  useEffect(() => {
    desksRef.current = desks
  }, [desks])

  useEffect(() => {
    studentsRef.current = students
  }, [students])

  const setOverDesk = data => {
    overDeskRef.current = data
    _setOverDesk(data)
  }

  useEffect(() => {
    if (klass) {
      fetchStudents(klass)
      setCurrentKlass(klass)
    }

    return () => clearCurrentKlass()
  }, [klass])



  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => panResponderEnabledRef.current,
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
            return (gesture.moveX > seat.topLeft.x && gesture.moveX < seat.topRight.x &&
                    gesture.moveY - 35> seat.topLeft.y && gesture.moveY - 35 < seat.bottomLeft.y)
          } else {
            return false
          }
        })
        setOverDesk(over)

        Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y }
          ]
        )(e, gesture)
      },
      onPanResponderRelease: (e, gesture) => {
        setPanResponderEnabled(false)
        pan.setOffset({ x: 0, y: 0 })
        pan.setValue({ x: 0, y: 0 })
        const seatNumber = overDeskRef.current ? parseInt(overDeskRef.current.split("seat")[1]) : null
        const overStudentId = studentsRef.current.allIds.find(stId => {
          const student = studentsRef.current.byId[stId]
          return parseInt(seatNumber) === (groupingRef.current === 'Pairs' ? student.seatPair : student.seatGroup)
        })

        const currentStudent = e._targetInst.memoizedProps.student
        const overStudent = overStudentId ? studentsRef.current.byId[overStudentId] : null

        if (overStudent) {
          swap(klass, currentStudent, overStudent, groupingRef.current === 'Pairs' ? 'pair' : 'group')
        } else if (overDeskRef.current) {
          newSeat(klass, currentStudent, seatNumber, groupingRef.current === 'Pairs' ? 'pair' : 'group')
        }

        setDraggedStudent(null)
        // pan.setOffset({ x: 0, y: 0 })
        // pan.setValue({ x: 0, y: 0 })
        setOverDesk(null)
        // Animated.spring(pan, {
        //   toValue: { x: 0, y: 0 },
        //   friction: 5
        // }).start();

        window.setTimeout(() => {
          setPanResponderEnabled(true)
        }, 500)
      }
    })
  ).current;


  const seats = () => {
    return [...Array(32).keys()].map(seatNumber => {
      const studentId = students.allIds.find(stId => {
        const st = students.byId[stId]
        return (grouping === 'Pairs' ? st.seatPair : st.seatGroup) === seatNumber
      })
      return studentId ? studentId : null
    })
  }

  const renderDeskRowsForPairs = () => {
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

  const renderDeskRowsForGroups = () => {
    const mySeats = seats()
    return (
      <>
        <View style={styles.rowGroupsStyle} key="group1">
          {
            [0,1].map(row => {
              const rowOfStudents = mySeats.slice(row*8, (row+1)*8)
              return (
                <View style={styles.rowGroupStyle} key={`row${row}`}>
                  {[0,1,2,3].map(pair => (
                      <View style={styles.pairStyle} key={`row${row}pair${pair}`}>
                        {renderDeskPairs(rowOfStudents, row, pair)}
                      </View>
                  ))}
                </View>
              )
            })
          }
        </View>
        <View style={styles.rowGroupsStyle} key="group2">
          {
            [2,3].map(row => {
              const rowOfStudents = mySeats.slice(row*8, (row+1)*8)
              return (
                <View style={styles.rowGroupStyle} key={`row${row}`}>
                  {[0,1,2,3].map(pair => (
                      <View style={styles.pairStyle} key={`row${row}pair${pair}`}>
                        {renderDeskPairs(rowOfStudents, row, pair)}
                      </View>
                  ))}
                </View>
              )
            })
          }
        </View>
      </>
    )
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



  const renderSeatingChart = () => (
    <>
      <View style={styles.SeatingChart}>
        {grouping === "Pairs" ? renderDeskRowsForPairs() : renderDeskRowsForGroups()}
      </View>
      <CloneDesk
        pan={pan}
        panResponder={panResponder}
        student={draggedStudent}
        setCloneLocation={setCloneLocation}
      />
    </>
  )

  const renderXOutKlass = () => (
    <TouchableOpacity
      style={{position: 'absolute', top: 10, left: 10}}
      onPress={() => navigation.goBack(null)}>
      <Text
        style={styles.xOutStyle}
        >X
      </Text>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.containerStyle}
      keyboardVerticalOffset={50}
    >
      {studentsPage ? <StudentsIndex students={students} /> : renderSeatingChart()}
      {gearMenu ? <GearMenu /> : null}
      {!studentsPage && !gearMenu ? renderXOutKlass() : null}
    </KeyboardAvoidingView>
  )
}

//border test
// {students.loading ? null : desks.allIds.map(deskId => {
//   const desk = desks.byId[deskId]
//   return (
//     <>
//       <View style={[styles.deskBorderStyle, {left: desk.bottomLeft ? desk.bottomLeft.x : 0, top: desk.bottomLeft ? desk.bottomLeft.y : 0}]}>
//       </View>
//       <View style={[styles.deskBorderStyle, {left: desk.bottomRight ? desk.bottomRight.x : 0, top: desk.bottomRight ? desk.bottomRight.y : 0}]}>
//       </View>
//       <View style={[styles.deskBorderStyle, {left: desk.topLeft ? desk.topLeft.x : 0, top: desk.topLeft ? desk.topLeft.y : 0}]}>
//       </View>
//       <View style={[styles.deskBorderStyle, {left: desk.topRight ? desk.topRight.x : 0, top: desk.topRight ? desk.topRight.y : 0}]}>
//       </View>
//     </>
//   )
// })}


const styles = StyleSheet.create({
  deskBorderStyle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 5,
     backgroundColor: 'blue'
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  xOutStyle: {
    fontSize: 20,
  },
  SeatingChart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'

  },
  rowStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  },
  rowGroupsStyle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowGroupStyle: {
    flexDirection: 'row',
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
    desks: state.seats.pairSeats,
    studentsPage: state.currentKlass.studentsPage,
    gearMenu: state.currentKlass.gearMenu,
    grouping: state.currentKlass.grouping
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: klass => dispatch(fetchStudents(klass)),
    setCurrentKlass: klass => dispatch(setCurrentKlass(klass)),
    clearCurrentKlass: () => dispatch(clearCurrentKlass()),
    swap: (klass, student1, student2, type) => dispatch(swapSeats(klass, student1, student2, type)),
    newSeat: (klass, student, seat, type) => dispatch(newSeat(klass, student, seat, type)),
    setSeatLocations: (screenWidth, screenHeight, grouping) => dispatch(setSeatLocations(screenWidth, screenHeight, grouping))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassScreen)
