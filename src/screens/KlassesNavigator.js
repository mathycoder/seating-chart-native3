import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KlassesScreen from './KlassesScreen'
import KlassScreen from './KlassScreen'
import { connect } from 'react-redux'
import NavBarTitle from '../navBar/NavBarTitle'
import NavBarSmallTitle from '../navBar/NavBarSmallTitle'
import NavBarKlass from '../navBar/NavBarKlass'
import Logout from '../components/sessions/Logout'

const ModalStack = createStackNavigator();

const KlassesNavigator = ({ klass }) => {
  return (
    <ModalStack.Navigator mode="modal" screenOptions={{
      headerStyle: {
        backgroundColor: 'rgb(125, 166, 200)',
      }
    }}>
      <ModalStack.Screen name="Klasses" component={KlassesScreen}
          options={({ navigation, route }) => ({
            title: false,
            headerLeft: (props) => <NavBarSmallTitle props={props} />,
            headerRight: (props) => <Logout navigation={navigation} />,
            gestureEnabled: false
          })}
        />
      <ModalStack.Screen name="Klass" component={KlassScreen}
        options={({ navigation, route }) => ({
          headerLeft: (props) => <NavBarSmallTitle props={props} />,
          headerTitle: props => <NavBarKlass navigation={navigation} />,
          headerRight: (props) => <Logout navigation={navigation} />,
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
