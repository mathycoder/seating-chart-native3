import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { dynamicPairsHetero, dynamicPairsHomo,
         dynamicGroupsHetero, dynamicGroupsHomo } from '../../actions/studentActions.js'
import { showBehavior, hideBehavior,
        showAcademics, hideAcademics } from '../../actions/optionActions.js'
import TypeDropdown from './TypeDropdown'
import SmallButton from '../buttons/SmallButton'
import { connect } from 'react-redux'
import Checkbox from './Checkbox'

const GearMenu = ({ open, currentKlass, currentGrouping,
                    currentAcademics, currentBehavior,
                    dynamicPairsHetero, dynamicPairsHomo,
                    dynamicGroupsHetero, dynamicGroupsHomo,
                    showBehavior, hideBehavior, showAcademics, hideAcademics,
                    students, loading }) => {

  const [groupingType, setGroupingType] = useState('Heterogenous')
  const [groupBy, setGroupBy] = useState('Academics')

  const handleSubmit = () => {
    groupingType === 'Heterogenous'
      ? dynamicPairsHetero(currentKlass, groupBy)
      : dynamicPairsHomo(currentKlass, groupBy)
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>Generate Pairs</Text>
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
        </View>
        <View style={styles.buttonContainerStyle}>
          <SmallButton title="Generate" callbackFunction={() => handleSubmit()} />
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
    alignItems: 'center',

  },
  headerStyle: {
    backgroundColor: 'rgb(81,84,92)',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
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
    width: '95%'
  },
  optionContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GearMenu)
