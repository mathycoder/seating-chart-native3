import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { dynamicPairsHetero, dynamicPairsHomo,
         dynamicGroupsHetero, dynamicGroupsHomo } from '../../actions/studentActions.js'
import { showBehavior, hideBehavior,
        showAcademics, hideAcademics } from '../../actions/optionActions.js'
import TypeDropdown from './TypeDropdown'
import SmallButton from '../buttons/SmallButton'
import { connect } from 'react-redux'
import Checkbox from './Checkbox'
import { hideGearMenu } from '../../actions/currentKlassActions.js'

const GearMenu = ({ open, currentKlass, currentGrouping,
                    currentAcademics, currentBehavior,
                    dynamicPairsHetero, dynamicPairsHomo,
                    dynamicGroupsHetero, dynamicGroupsHomo,
                    showBehavior, hideBehavior, showAcademics, hideAcademics,
                    students, loading, hideGearMenu }) => {

  const [groupSize, setGroupSize] = useState(4)
  const [groupingType, setGroupingType] = useState('Heterogenous')
  const [groupBy, setGroupBy] = useState('Academics')

  const possibleGroups = () => {
    return [4,3,2,1].filter(size => students.allIds.length / size <= 8)
  }

  const possibleGroupsArray = () => possibleGroups().map(num => {
    return {label: `${num}`, value: num}
  })

  const handleSubmit = () => {
    if (currentGrouping === "Groups"){
      groupingType === 'Heterogenous'
        ? dynamicGroupsHetero(currentKlass, groupSize, groupBy)
        : dynamicGroupsHomo(currentKlass, groupSize, groupBy)
    } else {
      groupingType === 'Heterogenous'
        ? dynamicPairsHetero(currentKlass, groupBy)
        : dynamicPairsHomo(currentKlass, groupBy)
    }
    hideGearMenu()
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{`Generate ${currentGrouping}`}</Text>
        <TouchableOpacity
          onPress={() => hideGearMenu() }
          style={styles.XOutStyle}>
          <Text style={styles.XOutTextStyle}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyStyle}>
        <View style={styles.optionsContainerStyle}>
          <View style={styles.optionContainerStyle}>
            <Text style={styles.optionTextStyle}>Type</Text>
            <TypeDropdown
              category={groupingType}
              setCategory={setGroupingType}
              items={[
              { label: 'Homogenous', value: 'Homogenous' },
              { label: 'Heterogenous', value: 'Heterogenous' },
              ]}
            />
          </View>
          <View style={styles.optionContainerStyle}>
            <Text style={styles.optionTextStyle}>By</Text>
            <TypeDropdown
              category={groupBy}
              setCategory={setGroupBy}
              items={[
                { label: 'Academics', value: 'Academics' },
                { label: 'Behavior', value: 'Behavior' },
                { label: 'Both', value: 'Both' },
              ]}
            />
          </View>
          { currentGrouping === 'Groups' ?
            <View style={styles.optionContainerStyle}>
              <Text style={styles.optionTextStyle}>Group Size</Text>
              <TypeDropdown
                size="small"
                category={groupSize}
                setCategory={setGroupSize}
                items={possibleGroupsArray()}
              />
            </View> : null
          }
          <View style={styles.buttonContainerStyle}>
            <SmallButton title="Generate" callbackFunction={() => handleSubmit()} />
          </View>
        </View>


        <View style={styles.settingsStyle}>
          <Text style={styles.settingStyle}>Display:</Text>
          <Checkbox title="Academics" checked={currentAcademics} callbackFunction={() => currentAcademics ? hideAcademics(): showAcademics()}/>
          <Checkbox title="Behavior" checked={currentBehavior} callbackFunction={() => currentBehavior? hideBehavior(): showBehavior()}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    width: 400,
    alignItems: 'center'

  },
  headerStyle: {
    backgroundColor: 'rgb(81,84,92)',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  XOutStyle: {
    position: 'absolute',
    color: 'white',
    left: 5,
    top: 5,
    fontSize: 16
  },
  XOutTextStyle: {
    color: 'white',
    fontSize: 16
  },
  headerTextStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 5
  },
  bodyStyle: {
    backgroundColor: 'rgb(101,104,112)',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  optionsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
    flexWrap: 'wrap'
  },
  optionContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  optionTextStyle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4
  },
  buttonContainerStyle: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  settingsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    paddingTop: 25
  },
  settingStyle: {
    color: 'white',
    fontSize: 16,
    marginTop: 2,
    marginRight: 10,
    // fontWeight: 'bold'
  }
})

const mapStateToProps = (state) => {
  return {
    currentKlass: state.currentKlass.klass,
    currentGrouping: state.currentKlass.grouping,
    currentBehavior: state.currentKlass.behavior,
    currentAcademics: state.currentKlass.academics,
    students: state.students,
    loading: state.students.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dynamicPairsHetero: (klass, groupBy) => dispatch(dynamicPairsHetero(klass, groupBy)),
    dynamicPairsHomo: (klass, groupBy) => dispatch(dynamicPairsHomo(klass, groupBy)),
    dynamicGroupsHetero: (klass, size, groupBy) => dispatch(dynamicGroupsHetero(klass, size, groupBy)),
    dynamicGroupsHomo: (klass, size, groupBy) => dispatch(dynamicGroupsHomo(klass, size, groupBy)),
    hideAcademics: () => dispatch(hideAcademics()),
    showAcademics: () => dispatch(showAcademics()),
    hideBehavior: () => dispatch(hideBehavior()),
    showBehavior: () => dispatch(showBehavior()),
    hideGearMenu: () => dispatch(hideGearMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
