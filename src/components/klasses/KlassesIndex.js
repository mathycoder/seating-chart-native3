import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import KlassForm from './KlassForm'

const KlassesIndex = ({ klasses, currentUser }) => {
  const [displayForm, displayFormSet] = useState(false)
  const [editKlassId, setEditKlassId] = useState(null)

  const renderKlassRow = (klass) => {
    return (
      <View style={styles.rowStyle}>
        <Text style={[styles.periodColumn, styles.klassStyle]}>{klass.period}</Text>
        <Text style={[styles.nameColumn, styles.klassStyle]}>{klass.name}</Text>
        <TouchableOpacity onPress={() => {
          setEditKlassId(`klass${klass.id}`)
        }}>
            <LinearGradient
              style={[styles.actionsColumn, styles.myButtonSmall]}
              start={[0.5, 0]}
              end={[0.5,1]}
              colors={['#eae0c2', '#ccc2a6']}>

              <Text style={styles.myButtonTextSmall}>Edit</Text>
            </LinearGradient>
          </TouchableOpacity>
      </View>
    )
  }

  const renderCreateKlassButton = () => (
    <TouchableOpacity onPress={() => {
      displayFormSet(!displayForm)
      setEditKlassId(null)
    }}>
        <LinearGradient
          style={styles.myButton}
          start={[0.5, 0]}
          end={[0.5,1]}
          colors={['#eae0c2', '#ccc2a6']}>

          <Text style={styles.myButtonText}>Create Class</Text>
        </LinearGradient>
      </TouchableOpacity>
  )

  return (
    <View style={styles.signupWrapper}>
      <Text style={styles.flexseatsTitle}>
        {`${currentUser.firstName}'s Classes`}
      </Text>
      <View style={styles.rowStyle}>
        <Text style={[styles.periodColumn, styles.headerStyle]}>Period</Text>
        <Text style={[styles.nameColumn, styles.headerStyle]}>Name</Text>
        <Text style={[styles.actionsColumn, styles.headerStyle]}></Text>
      </View>

      <FlatList
          scrollEnabled={false}
          style={styles.listStyle}
          data={klasses.allIds}
          keyExtractor={klassId => klassId}
          renderItem={({item}) => {
            const klass = klasses.byId[item]
            return item !== editKlassId ? renderKlassRow(klass) : <KlassForm displayFormSet={displayFormSet} klass={klass}/>
          }}

        />
        { displayForm ? <KlassForm displayFormSet={displayFormSet}/> : null }
        { !displayForm && !editKlassId ? renderCreateKlassButton() : null }

    </View>
  )
}

const styles = StyleSheet.create({
  signupWrapper: {
    backgroundColor: "rgb(166, 152, 143)",
    alignItems: "center",
    justifyContent: "space-around",
    width: 300,
    alignSelf: "center",
    borderColor: "#3e4444",
    borderWidth: 3,
    marginBottom: 130
  },
  flexseatsTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 10
  },
  rowStyle: {
    flexDirection: "row",
    width: 280,
    justifyContent: "space-around",
    marginVertical: 8
  },
  periodColumn: {
    width: 70,
    textAlign: "center"
  },
  nameColumn: {
    width: 120,
  },
  actionsColumn: {
    width: 60,
  },
  headerStyle: {
    fontWeight: "bold",
    fontSize: 20
  },
  klassStyle: {
    fontSize: 20
  },
  myButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
    borderColor: "#333029",
    borderWidth: 1,
    marginVertical: 10
  },
  myButtonText: {
    fontSize: 16
  },
  myButtonSmall: {
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderRadius: 5,
    borderColor: "#333029",
    borderWidth: 1,
    width: 40
  },
  myButtonTextSmall: {
    fontSize: 16,
    textAlign: "center"
  },

  listStyle: {
    flexGrow: 0
  }
})

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(KlassesIndex)
