import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect, { defaultStyles }  from 'react-native-picker-select';

const PeriodDropdown = ({ period, setPeriod }) => {
  return (
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
  )
}

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

export default PeriodDropdown
