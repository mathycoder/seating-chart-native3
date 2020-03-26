import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KlassesScreen from './KlassesScreen'
import KlassScreen from './KlassScreen'

const ModalStack = createStackNavigator();

const KlassesNavigator = () => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="Klasses" component={KlassesScreen}
          options={({ navigation, route }) => ({
            title: false,
            headerLeft: (props) => <NavBarTitle props={props} />,
            headerRight: (props) => <Logout navigation={navigation} />,
            gestureEnabled: false
          })}
        />
      <ModalStack.Screen name="Klass" component={KlassScreen}
        options={({ navigation, route }) => ({
          title: false,
          gestureEnabled: false
        })}
        />
    </ModalStack.Navigator>
  )
}

export default KlassesNavigator
