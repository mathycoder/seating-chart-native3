import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchKlasses } from '../actions/klassActions.js'
import { getCurrentUser } from '../actions/currentUserActions.js'

const KlassesScreen = ({ klasses, fetchKlasses }) => {
  useEffect(() => {
      fetchKlasses()
    }, [])

  return (
    <View>
      <Text>Klasses Page</Text>
      <FlatList
          data={klasses.allIds}
          keyExtractor={klassId => klassId}
          renderItem={({item}) => {
            const klass = klasses.byId[item]
            return (
              <View>
                <Text>{klass.name}</Text>
              </View>
            )
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({})

function mapStateToProps(state){
  return {
    klasses: state.klasses
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchKlasses: () => dispatch(fetchKlasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KlassesScreen)
