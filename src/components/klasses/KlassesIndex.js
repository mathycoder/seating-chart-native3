import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import KlassForm from './KlassForm'
import SmallButton from '../buttons/SmallButton'
import BigButton from '../buttons/BigButton'

const KlassesIndex = ({ klasses, currentUser, navigation }) => {
  const [displayForm, setDisplayForm] = useState(false)
  const [editKlassId, setEditKlassId] = useState(null)

  const renderKlassRow = (klass) => {
    return (
      <View style={styles.rowStyle}>
        <Text style={[styles.periodColumn, styles.klassStyle]}>{klass.period}</Text>
        <Text
          style={[styles.nameColumn, styles.klassStyle]}
          onPress={() => navigation.navigate('Klass', {klass: klass} )}
          >{klass.name}
        </Text>
        <View style={styles.actionsColumn}>
          <SmallButton
            title="Edit"
            callbackFunction={() => {
              setEditKlassId(`klass${klass.id}`)
              setDisplayForm(false)
            }}
          />
        </View>
      </View>
    )
  }

  const renderCreateKlassButton = () => (
    <BigButton
      callbackFunction={() => {
        setDisplayForm(!displayForm)
        setEditKlassId(null)
      }}
      title="Create Class"
    />
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
            return item !== editKlassId
              ? renderKlassRow(klass)
              : <KlassForm
                  setEditKlassId={setEditKlassId}
                  setDisplayForm={setDisplayForm}
                  klass={klass}
                />
          }}
        />
        {
          displayForm
          ? <KlassForm
              setEditKlassId={setEditKlassId}
              setDisplayForm={setDisplayForm}/>
          : null
        }
        {
          !displayForm && !editKlassId
          ? renderCreateKlassButton()
          : null
        }
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
