import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'

const StudentForm = ({ klass, student }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
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
      setFirstName('')
      setLastName('')
      setAcademicScore(1)
      setBehaviorScore(1)
    }
  }

  return (
    <View style={styles.containerStyle}>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="First name"
        value={firstName}
        onChangeText={(newValue) => setFirstName(newValue)}
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Last name"
        value={lastName}
        onChangeText={(newValue) => setLastName(newValue)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    flexDirection: 'row'
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    width: 200,
    fontSize: 16
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
