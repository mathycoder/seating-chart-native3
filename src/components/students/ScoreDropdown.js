import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect, { defaultStyles }  from 'react-native-picker-select';

const ScoreDropdown = ({ score, setScore }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => setScore(value)}
      items={[
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
      ]}
      placeholder={{
        label: "",
        value: null,
        color: 'gray'
      }}
      value={score}
      style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 17,
              right: 6,
            },
            placeholder: {
              color: 'white',
              fontSize: 18,
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
                      height: 0,
                      marginRight: 35
                    }}
                  />
                );
              }}
    />
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 3,
    backgroundColor: "rgb(81,84,92)",
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'white',
    paddingRight: 20, // to ensure the text is never behind the icon
    alignSelf: 'center',
  }
});

export default ScoreDropdown
