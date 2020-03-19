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
import NavBarTitle from './src/navBar/NavBarTitle'
import Logout from './src/components/sessions/Logout'


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgb(125, 166, 200)',
            }
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              title: false,
              headerLeft: (props) => <NavBarTitle props={props} />
            })}
          />
          <Stack.Screen name="Klasses" component={KlassesScreen}
            options={({ navigation, route }) => ({
              title: false,
              headerLeft: (props) => <NavBarTitle props={props} />,
              headerRight: (props) => <Logout navigation={navigation} />,
              gestureEnabled: false
            })}
          />
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
