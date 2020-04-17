import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import NavBarSmallTitle from './NavBarSmallTitle'
import { connect } from 'react-redux'

const NavBarTitle = ({ klass }) => {

  const renderFullTitle = () => (
    <View style={styles.containerStyle}>
      <Text style={[styles.textStyle, {fontWeight: '700'}]}>Flex</Text>
      <Image
        style={styles.imageStyle}
        source={require('../../assets/desk.png')}
      />
      <Text style={styles.textStyle}>Seats</Text>
    </View>
  )

  return (
    <>
      {renderFullTitle()}
    </>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    width: 130,
    justifyContent: 'space-around',
    marginLeft: 15
  },
  textStyle: {
    fontSize: 25
  },
  boldStyle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  imageStyle: {
    marginTop: 10,
    width: 15,
    height: 15
  }
})

const mapStateToProps = state => {
  return {
    klass: state.currentKlass.klass
  }
}

export default connect(mapStateToProps, null)(NavBarTitle)
