import React, { useState, useEffect } from 'react'
import { addKlass, updateKlass, deleteKlass } from '../../actions/klassActions.js'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList,
        TouchableOpacity, TextInput, Picker } from 'react-native'
import PeriodDropdown from './PeriodDropdown'
import SmallButton from '../buttons/SmallButton'

const KlassForm = ({ setDisplayForm,setEditKlassId, klass,
                     addKlass, updateKlass, deleteKlass }) => {
  const [name, setName] = useState('')
  const [period, setPeriod] = useState(1)

  useEffect(() => {
    if (klass){
      setName(klass.name)
      setPeriod(klass.period)
    }
  }, [])

  const submitHandler = (action) => {
    if (action === 'delete'){
      deleteKlass(klass)
    } else {
      const params = {
      klass: {
        name: name,
        period: period
      }
    }
      klass ? updateKlass(params, klass) : addKlass(params)
    }
    setDisplayForm(false)
    setEditKlassId(null)
  }

  return (
    <View style={styles.rowStyle}>
      <View style={styles.periodColumn}>
        <PeriodDropdown period={period} setPeriod={setPeriod} />
      </View>
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder="Enter Name"
        value={name}
        onChangeText={(newValue) => setName(newValue)}
      />
      <SmallButton
        title={<Text>&#10003;</Text>}
        callbackFunction={() => submitHandler('add/edit')}
      />
      <SmallButton
        title="X"
        callbackFunction={() => submitHandler('delete')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    width: 280,
    justifyContent: "space-around",
    marginVertical: 8
  },
  periodColumn: {
    width: 50,
    marginHorizontal: 15,
    textAlign: "center",
    alignItems: "center"
  },
  nameColumn: {
    width: 120,
  },
  actionsColumn: {
    width: 60,
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    width: 120,
    fontSize: 18
  }
})



function mapDispatchToProps(dispatch){
  return {
    addKlass: (klassData) => dispatch(addKlass(klassData)),
    updateKlass: (klassData, klass) => dispatch(updateKlass(klassData, klass)),
    deleteKlass: (klass) => dispatch(deleteKlass(klass))
  }
}

export default connect(null, mapDispatchToProps)(KlassForm)
