import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KlassesScreen from './KlassesScreen'
import KlassScreen from './KlassScreen'
import { connect } from 'react-redux'

const ModalStack = createStackNavigator();

const KlassesNavigator = ({ klass }) => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="Klasses" component={KlassesScreen}
          options={({ navigation, route }) => ({
            title: false,
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

const mapStateToProps = state => {
  return {
    klass: state.currentKlass.klass
  }
}

export default connect(mapStateToProps, null)(KlassesNavigator)
