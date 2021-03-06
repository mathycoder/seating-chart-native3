import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'


const Stack = createStackNavigator();

const MyStack = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen
        name="Klasses"
        component={KlassesScreen}
        options={{title: 'My Classes'}}
      />
    </Stack.Navigator>

  );
}

export default MyStack
