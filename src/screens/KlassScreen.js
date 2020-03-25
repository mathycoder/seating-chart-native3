import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchStudents } from '../actions/studentActions.js'
import { setCurrentKlass } from '../actions/currentKlassActions.js'
import { ScreenOrientation } from 'expo'
import blahScreen from './blahScreen'
import { createStackNavigator } from '@react-navigation/stack';


const KlassScreen = ({ navigation, klasses, route,
                       fetchStudents, setCurrentKlass }) => {
  const { klass } = route.params

  const ModalStack = createStackNavigator();

  useEffect(() => {
    if (klass) {
      fetchStudents(klass)
      setCurrentKlass(klass)
    }
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
    // return () => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

  }, [klass])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Class ${klass.name}`
    });
  }, [navigation]);



  return (
    <ModalStack.Navigator mode="modal">
      <ModalStack.Screen name="Blah" component={blahScreen} options={{ headerShown: false }} />
    </ModalStack.Navigator>
  )
}

// <View style={styles.containerStyle}>
//   <Text>Klass Show Page</Text>
// </View>



const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    klasses: state.klasses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: klass => dispatch(fetchStudents(klass)),
    setCurrentKlass: klass => dispatch(setCurrentKlass(klass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassScreen)
