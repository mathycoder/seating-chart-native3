import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { showStudentsPage, hideStudentsPage } from '../actions/currentKlassActions.js'
import { connect } from 'react-redux'

const NavBarKlass = ({ klass, navigation, showStudentsPage, hideStudentsPage }) => {

  const renderKlassTitle = () => (
    <View style={styles.containerStyle}>
      <Text
        onPress={() => hideStudentsPage()}
        style={styles.textStyle}
      >
        {`Class ${klass.name}`}
      </Text>
      <Text
        style={styles.textStyle}
        onPress={() => showStudentsPage()}
      >
        Students
      </Text>
    </View>
  )

  const renderKlassesTitle = () => (
    <View>
      <Text style={styles.textStyle}>Classes</Text>
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
  }
})

const mapStateToProps = state => {
  return {
    klass: state.currentKlass.klass
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showStudentsPage: () => dispatch(showStudentsPage()),
    hideStudentsPage: () => dispatch(hideStudentsPage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarKlass)
