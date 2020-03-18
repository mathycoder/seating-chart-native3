import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/store'
import { Provider, connect } from 'react-redux'
// import Stack from './src/navigators/Stack'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen'
import KlassesScreen from './src/screens/KlassesScreen'


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome'}} />
          <Stack.Screen name="Klasses" component={KlassesScreen} options={{title: 'Your Classes'}} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
