import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'

const KlassesIndex = ({ klasses, currentUser }) => {
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
          data={klasses.allIds}
          keyExtractor={klassId => klassId}
          renderItem={({item}) => {
            const klass = klasses.byId[item]
            return (
              <View style={styles.rowStyle}>
                <Text style={[styles.periodColumn, styles.klassStyle]}>{klass.period}</Text>
                <Text style={[styles.nameColumn, styles.klassStyle]}>{klass.name}</Text>
                <Text style={[styles.actionsColumn, styles.klassStyle]}></Text>
              </View>
            )
          }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  signupWrapper: {
    backgroundColor: "rgb(166, 152, 143)",
    alignItems: "center",
    justifyContent: "space-around",
    width: 300,
    height: 200,
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
    justifyContent: "space-between",
    marginVertical: 5

  },
  periodColumn: {
    width: 70,
    textAlign: "center"
  },
  nameColumn: {
    width: 130,
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
  }
})

function mapStateToProps(state){
  return {
    klasses: state.klasses,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(KlassesIndex)
