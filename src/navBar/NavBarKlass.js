import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { showStudentsPage, hideStudentsPage } from '../actions/currentKlassActions.js'
import { connect } from 'react-redux'

const NavBarKlass = ({ klass, navigation, showStudentsPage, hideStudentsPage,studentsPage }) => {

  const renderKlassTitle = () => (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={() => hideStudentsPage()}>
        <Text style={[styles.textStyle, !studentsPage ? styles.boldTextStyle : null]}>
          {`Class ${klass.name}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showStudentsPage()}>
        <Text style={[styles.textStyle, studentsPage ? styles.boldTextStyle : null]}>
          Students
        </Text>
      </TouchableOpacity>
    </View>
  )

  const renderKlassesTitle = () => (
    <View>
    </View>
  )

  return (
    <>
      {klass ? renderKlassTitle() : renderKlassesTitle()}
    </>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 16,
    marginHorizontal: 20
  },
  boldTextStyle: {
    fontWeight: '600',
    fontSize: 16,
    marginHorizontal: 18
  }
})

const mapStateToProps = state => {
  return {
    klass: state.currentKlass.klass,
    studentsPage: state.currentKlass.studentsPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showStudentsPage: () => dispatch(showStudentsPage()),
    hideStudentsPage: () => dispatch(hideStudentsPage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarKlass)
