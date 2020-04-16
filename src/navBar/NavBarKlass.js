import React, { useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { showStudentsPage, hideStudentsPage, setCurrentGroup,
         showGearMenu, hideGearMenu } from '../actions/currentKlassActions.js'
import { connect } from 'react-redux'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'

const NavBarKlass = ({ klass, navigation, showStudentsPage, hideStudentsPage,
                       setCurrentGroup, grouping,
                       studentsPage, hideGearMenu, showGearMenu, gearMenu }) => {

  const setMenuRef = useRef()

  const renderKlassTitle = () => (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={() => {
          hideStudentsPage()
        }}>
        <Text style={[styles.textStyle]}>
          {`Class ${klass.name}`}
        </Text>
      </TouchableOpacity>
      <Menu
        style={{marginTop: 25, marginLeft: 5}}
        ref={setMenuRef}
        button={<Text
                  style={[styles.textStyle, {width: 52}]}
                  onPress={() => setMenuRef.current.show()}>{grouping}
                </Text>}
      >
        <MenuItem
          textStyle={{fontSize: 16}}
          onPress={() => {
            setCurrentGroup('Pairs')
            setMenuRef.current.hide()
          }}>Pairs
        </MenuItem>
        <MenuItem
          textStyle={{fontSize: 16}}
          onPress={() => {
            setCurrentGroup('Groups')
            setMenuRef.current.hide()
          }}>Groups
        </MenuItem>
      </Menu>
      <TouchableOpacity onPress={() => {
          hideStudentsPage()
          gearMenu ? hideGearMenu() : showGearMenu()
        }}>
        <Text style={[styles.textStyle, gearMenu ? styles.boldTextStyle : null]}>
          Generate
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
          hideGearMenu()
          studentsPage ? hideStudentsPage() : showStudentsPage()
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
    studentsPage: state.currentKlass.studentsPage,
    gearMenu: state.currentKlass.gearMenu,
    grouping: state.currentKlass.grouping
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showStudentsPage: () => dispatch(showStudentsPage()),
    hideStudentsPage: () => dispatch(hideStudentsPage()),
    showGearMenu: () => dispatch(showGearMenu()),
    hideGearMenu: () => dispatch(hideGearMenu()),
    setCurrentGroup: (group) => dispatch(setCurrentGroup(group))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarKlass)
