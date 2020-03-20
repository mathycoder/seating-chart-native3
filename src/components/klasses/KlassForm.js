import React, { useState, useEffect } from 'react'
import { addKlass, updateKlass, deleteKlass } from '../../actions/klassActions.js'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

const KlassForm = ({ displayFormSet, klass }) => {
  const [name, setName] = useState('')
  const [period, setPeriod] = useState(1)

  useEffect(() => {
    if (klass){
      setName(klass.name)
      setPeriod(klass.period)
    }
  }, [])

  return (
    <View>
      <Text>Klass Form</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

function mapDispatchToProps(dispatch){
  return {
    addKlass: (klassData) => dispatch(addKlass(klassData)),
    updateKlass: (klassData, klass) => dispatch(updateKlass(klassData, klass)),
    deleteKlass: (klass) => dispatch(deleteKlass(klass))
  }
}

export default connect(null, mapDispatchToProps)(KlassForm)
