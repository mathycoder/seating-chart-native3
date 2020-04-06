import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const StudentForm = ({ klass }) => {
  return (
    <View style={styles.containerStyle}>
      <Text>Student Form</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40
  }
})

const mapStateToProps = state => {
  return {
    klass: state.currentKlass.klass
  }
}

export default connect(mapStateToProps, null)(StudentForm)
