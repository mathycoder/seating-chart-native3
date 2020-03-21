import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const BigButton = ({ callbackFunction, title }) => {
  return (
    <TouchableOpacity onPress={() => callbackFunction()}>
        <LinearGradient
          style={styles.myButton}
          start={[0.5, 0]}
          end={[0.5,1]}
          colors={['#eae0c2', '#ccc2a6']}>

          <Text style={styles.myButtonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  myButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
    borderColor: "#333029",
    borderWidth: 1,
    marginVertical: 10
  },
  myButtonText: {
    fontSize: 16
  },
})



export default BigButton
