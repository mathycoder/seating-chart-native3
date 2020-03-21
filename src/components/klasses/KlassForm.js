import React, { useState, useEffect } from 'react'
import { addKlass, updateKlass, deleteKlass } from '../../actions/klassActions.js'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList,
        TouchableOpacity, TextInput, Picker } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const KlassForm = ({ displayFormSet, klass }) => {
  const [name, setName] = useState('')
  const [period, setPeriod] = useState(1)

  useEffect(() => {
    if (klass){
      setName(klass.name)
      setPeriod(klass.period)
    }
  }, [])

  return (
    <View style={styles.rowStyle}>
      <RNPickerSelect
        onValueChange={(value) => setPeriod(value)}
        items={[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 },
          { label: '6', value: 6 },
          { label: '7', value: 7 },
          { label: '8', value: 8 },
          { label: '9', value: 9 }
        ]}
        placeholder={{label: "Period"}}
        value={period}
      />
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder="Enter Name"
        value={name}
        onChangeText={(newValue) => setName(newValue)}
      />
      <Text style={styles.actionsColumn}>Klass Form</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    width: 280,
    justifyContent: "space-around",
    marginVertical: 8
  },
  periodColumn: {
    width: 70,
    textAlign: "center"
  },
  nameColumn: {
    width: 120,
  },
  actionsColumn: {
    width: 60,
  },
    textInput: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    width: 120,
    fontSize: 18
  },
  pickerStyle: {
    height: 20,
    width: 40,
  },
  pickerText: {
    fontSize: 18,
  }
})

function mapDispatchToProps(dispatch){
  return {
    addKlass: (klassData) => dispatch(addKlass(klassData)),
    updateKlass: (klassData, klass) => dispatch(updateKlass(klassData, klass)),
    deleteKlass: (klass) => dispatch(deleteKlass(klass))
  }
}

export default connect(null, mapDispatchToProps)(KlassForm)
