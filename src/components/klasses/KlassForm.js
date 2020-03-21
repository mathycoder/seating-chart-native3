import React, { useState, useEffect } from 'react'
import { addKlass, updateKlass, deleteKlass } from '../../actions/klassActions.js'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList,
        TouchableOpacity, TextInput, Picker } from 'react-native'
import RNPickerSelect, { defaultStyles }  from 'react-native-picker-select';

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
      <View style={styles.periodColumn}>
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
          placeholder={{
            label: "P",
            value: null,
            color: 'gray'
          }}
          value={period}
          style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 8,
                },
                placeholder: {
                  color: 'black',
                  fontSize: 12,
                },
              }}
              Icon={() => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          borderTopWidth: 7,
                          borderTopColor: 'rgb(121, 124, 132)',
                          borderRightWidth: 7,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 7,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0
                        }}
                      />
                    );
                  }}
        />
      </View>
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
    width: 50,
    marginHorizontal: 15,
    textAlign: "center",
    alignItems: "center"
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
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "rgb(81,84,92)",
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'white',
    paddingRight: 20, // to ensure the text is never behind the icon
  }
});

function mapDispatchToProps(dispatch){
  return {
    addKlass: (klassData) => dispatch(addKlass(klassData)),
    updateKlass: (klassData, klass) => dispatch(updateKlass(klassData, klass)),
    deleteKlass: (klass) => dispatch(deleteKlass(klass))
  }
}

export default connect(null, mapDispatchToProps)(KlassForm)
