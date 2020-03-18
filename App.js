import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/store'
import { Provider, connect } from 'react-redux'

const App = () => {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Hi there!</Text>
      </View>
    </Provider>
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
