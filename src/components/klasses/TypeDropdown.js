import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNPickerSelect, { defaultStyles }  from 'react-native-picker-select';

const TypeDropdown = ({ category, setCategory, items, size }) => {

  const IOSStyles = size ? pickerSelectStylesSmall : pickerSelectStyles

  return (
    <RNPickerSelect
      onValueChange={(value) => setCategory(value)}
      items={items}
      placeholder={{}}
      value={category}
      style={{
            ...IOSStyles,
            iconContainer: {
              top: 14,
              right: 6,
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
    backgroundColor: "rgb(242,242,242)",
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 20, // to ensure the text is never behind the icon
    width: 150
  }
});

const pickerSelectStylesSmall = StyleSheet.create({
  inputIOS: {
    backgroundColor: "rgb(242,242,242)",
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    width: 80,
    paddingRight: 40, // to ensure the text is never behind the icon
  }
})

export default TypeDropdown
