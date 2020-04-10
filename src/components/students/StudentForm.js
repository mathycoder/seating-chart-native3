import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { addStudent, editStudent } from '../../actions/studentActions.js'
import { connect } from 'react-redux'
import ScoreDropdown from './ScoreDropdown'
import SmallButton from '../buttons/SmallButton'

const StudentForm = ({ klass, student, addStudent, editStudent, setEditStudentId, setShowForm }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [academicScore, setAcademicScore] = useState(1)
  const [behaviorScore, setBehaviorScore] = useState(1)
  const [id, setId] = useState(null)

  useEffect(() => {
    if (student){
      setFirstName(student.firstName)
      setLastName(student.lastName)
      setAcademicScore(student.academicScore)
      setBehaviorScore(student.behaviorScore)
      setId(student.id)
    }
  }, [])

  const handleSubmit = () => {
    const studentData = {
      student: {
        first_name: firstName,
        last_name: lastName,
        academic_score: academicScore,
        behavior_score: behaviorScore
      }
    }
    student ? editStudent(klass, studentData, id) : addStudent(klass, studentData)
    if (student) {
      setEditStudentId(null)
    } else {
      setShowForm(false)
      setFirstName('')
      setLastName('')
      setAcademicScore(1)
      setBehaviorScore(1)
    }
  }


  return (
    <View style={[styles.containerStyle, styles.rowStyle]}>
      <View style={styles.textInputWrapperStyle}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="First name"
          value={firstName}
          onChangeText={(newValue) => setFirstName(newValue)}
        />
      </View>
      <View style={styles.textInputWrapperStyle}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Last name"
          value={lastName}
          onChangeText={(newValue) => setLastName(newValue)}
        />
      </View>
      <View style={styles.dropdownWrapperStyle}>
        <ScoreDropdown score={academicScore} setScore={setAcademicScore}/>
      </View>
      <View style={styles.dropdownWrapperStyle}>
        <ScoreDropdown score={behaviorScore} setScore={setBehaviorScore}/>
      </View>
      <View style={styles.editButtonsStyle}>
        <View style={styles.buttonMarginStyle}>
          <SmallButton
            style={styles.buttonMarginStyle}
            title={student ? 'Update' : 'Add'}
            callbackFunction={() => handleSubmit()}
          />
        </View>
        <View style={styles.buttonMarginStyle}>
        <SmallButton
            title="X"
            callbackFunction={() => student ? setEditStudentId(null) : setShowForm(false)}
          />
        </View>
      </View>
    </View>
  )
}





const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'rgba(91,91,91, 1)'
    // backgroundColor: '#FFFFBF'
  },
  textInputWrapperStyle: {
    flex: 1,
    paddingHorizontal: 10
  },
  textInput: {
    // backgroundColor: "white",
    backgroundColor: 'rgb(242,242,242)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    width: "100%",
    fontSize: 16,
  },
  rowStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  editButtonsStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonMarginStyle: {
    marginHorizontal: 2
  },
  dropdownWrapperStyle: {
    flex: 1,
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    klass: state.currentKlass.klass
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (klass, studentData) => dispatch(addStudent(klass, studentData)),
    editStudent: (klass, studentData, studentId) => dispatch(editStudent(klass, studentData, studentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
