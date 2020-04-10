import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { showStudentsPage, hideStudentsPage,
         showGearMenu, hideGearMenu } from '../actions/currentKlassActions.js'
import { connect } from 'react-redux'

const NavBarKlass = ({ klass, navigation, showStudentsPage, hideStudentsPage,
                       studentsPage, hideGearMenu, showGearMenu }) => {

  const renderKlassTitle = () => (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={() => {
          hideStudentsPage()
          hideGearMenu()
        }}>
        <Text style={[styles.textStyle, !studentsPage ? styles.boldTextStyle : null]}>
          {`Class ${klass.name}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
          hideStudentsPage()
          showGearMenu()
        }}>
        <Text style={[styles.textStyle]}>
          Generate
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
          hideGearMenu()
          showStudentsPage()
        }}>
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
    hideStudentsPage: () => dispatch(hideStudentsPage()),
    showGearMenu: () => dispatch(showGearMenu()),
    hideGearMenu: () => dispatch(hideGearMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarKlass)
