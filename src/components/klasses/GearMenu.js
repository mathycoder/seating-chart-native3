import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const GearMenu = () => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>Gear Menu</Text>
      </View>
      <View style={styles.bodyStyle}>
        <View style={styles.optionsContainerStyle}>
          <View style={styles.optionContainerStyle}>
            <Text style={styles.optionTextStyle}>Type</Text>
            <Text>Heterogenous</Text>
          </View>
          <View style={styles.optionContainerStyle}>
            <Text style={styles.optionTextStyle}>Type</Text>
            <Text>Heterogenous</Text>
          </View>
          <View style={styles.optionContainerStyle}>
            <Text style={styles.optionTextStyle}>Type</Text>
            <Text>Heterogenous</Text>
          </View>
        </View>
        <View style={styles.buttonContainerStyle}>
          <Text>Generate</Text>
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
    fontSize: 18,
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
    color: 'white'
  },
  buttonContainerStyle: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default GearMenu
