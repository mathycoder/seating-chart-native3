import React, { useState, useRef }  from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import { deleteStudent } from '../../actions/studentActions.js'
import StudentForm from './StudentForm'
import SmallButton from '../buttons/SmallButton'

const StudentsIndex = ({ students, deleteStudent, klass }) => {
  const [showForm, setShowForm] = useState(false)
  const [editStudentId, setEditStudentId] = useState(null)
  const [filter, setFilter] = useState('firstName')
  const [order, setOrder] = useState(true)
  const flatListRef = useRef()

  const studentIdsByFilter = (filter, ascending ) => {
    return students.allIds.sort((idA, idB) => {
      const studentA = students.byId[idA]
      const studentB = students.byId[idB]
      if (studentA[filter] > studentB[filter]) { return ascending ? 1 : -1 }
      else if (studentA[filter] < studentB[filter]) { return ascending ? -1 : 1 }
      else { return 0 }
    })
  }

  const renderStudentRow = (item, index) => {
    const student = students.byId[item]
    return (
      <>
        {editStudentId && student.id === editStudentId
          ? <StudentForm
              student={student}
              setEditStudentId={setEditStudentId}
            />
          : <View style={[styles.rowStyle, {backgroundColor: index % 2 === 0 ? 'lightgray' : 'white'}]}>
              <Text style={styles.studentTextStyle}>{student.firstName}</Text>
              <Text style={styles.studentTextStyle}>{student.lastName}</Text>
              <Text style={[styles.studentTextStyle, {textAlign: 'center'}]}>{student.academicScore}</Text>
              <Text style={[styles.studentTextStyle, {textAlign: 'center'}]}>{student.behaviorScore}</Text>
              <View style={styles.editButtonsStyle}>
                <View style={styles.buttonMarginStyle}>
                  <SmallButton title='Edit' callbackFunction={() => {
                    setEditStudentId(student.id)
                  }}/>
                </View>
                <View>
                  <SmallButton title='X' callbackFunction={() => {
                    Alert.alert(
                      'Delete Student',
                      `Are you sure you want to delete ${student.firstName} ${student.lastName}?`,
                      [
                        {text: 'Cancel', onPress: () => null},
                        {text: 'Delete', onPress: () => deleteStudent(klass, student)},
                      ]
                    )
                  }}/>
                </View>
              </View>
            </View>
        }
      </>
    )
  }

  return (
    <View style={styles.wrapperStyle}>
      <View style={[styles.rowStyle, {backgroundColor: 'grey'}]}>
        {
          [['firstName', 'First Name'],
          ['lastName', 'Last Name'],
          ['academicScore', 'Acad. Score'],
          ['behaviorScore', 'Behav. Score']].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              onPress={() => {
                filter === item[0] ? setOrder(!order) : setOrder(true)
                setFilter(item[0])
              }}
            >
              <Text style={[styles.headerStyleText, index > 1 ? {textAlign: 'center'} : null]}>{item[1]}</Text>
            </TouchableOpacity>
          ))
        }
        <View style={styles.columnHeader}></View>
      </View>
      <FlatList
        ref={flatListRef}
        scrollEnabled={true}
        style={styles.listStyle}
        data={studentIdsByFilter(filter, order)}
        keyExtractor={studentId => studentId}
        renderItem={({item, index}) => renderStudentRow(item, index)}
        ListFooterComponent={() => (
          <>
          {showForm ? <StudentForm setShowForm={setShowForm} /> : null}
          <TouchableOpacity
            onPress={() => {
              flatListRef.current.scrollToEnd({animated: true})
              setShowForm(!showForm)
            }}
            style={styles.addStudentButtonStyle}>
            <Text style={styles.addStudentButtonTextStyle}>{showForm ? 'Cancel' : 'Add Student'}</Text>
          </TouchableOpacity>
          </>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperStyle: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: 'black',
    width: '87%',
    maxWidth: 600,
    flex: 1
  },
  rowStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  columnHeader: {
    flex: 1,
  },
  headerStyleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    fontSize: 16
  },
  studentTextStyle: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16
  },
  editButtonsStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonMarginStyle: {
    marginHorizontal: 10
  },
  addStudentButtonStyle: {
    backgroundColor: 'gray',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addStudentButtonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }

})

const mapStateToProps = (state) => {
  return {
    klass: state.currentKlass.klass
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (klass, student) => dispatch(deleteStudent(klass, student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsIndex)
