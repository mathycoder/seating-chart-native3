import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const SmallButton = ({ callbackFunction }) => {
  return (
    <TouchableOpacity onPress={() => callbackFunction()}>
        <LinearGradient
          style={styles.myButtonSmall}
          start={[0.5, 0]}
          end={[0.5,1]}
          colors={['#eae0c2', '#ccc2a6']}>

          <Text style={styles.myButtonTextSmall}>Edit</Text>
        </LinearGradient>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  myButtonSmall: {
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderRadius: 5,
    borderColor: "#333029",
    borderWidth: 1,
    width: 40,
    alignSelf: 'center'
  },
  myButtonTextSmall: {
    fontSize: 16,
    textAlign: "center"
  }
})



export default SmallButton
