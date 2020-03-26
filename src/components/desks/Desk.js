import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Desk = ({ student }) => {
  return (
    <View style={styles.deskStyle}>
      <View style={styles.grooveStyle}></View>
      <View style={styles.deskItemsStyle}>
        <Text style={styles.deskItemsText}>{student.firstName}</Text>
        <View style={styles.ratingsStyle}>
        </View>
      </View>
    </View>
  )
}

// <div className="desk-drop-area" ref={drop}>
//     <div ref={drag} className={`desk ${hover ? 'hover' : ''} ${isDragging ? 'dragging' : ''}`}>
//       <div className='groove' />
//       <div className="desk-items">
//         <div className="first-name">{student.firstName}</div>
//         <div className="last-name">{student.lastName}</div>
//         <div className="ratings">
//           {currentAcademics ? <span className="academic-score">{student.academicScore}</span> : null}
//           {currentBehavior ? <span className="behavior-score">{student.behaviorScore}</span> : null}
//         </div>
//       </div>
//     </div>
//   </div>

const styles = StyleSheet.create({
  deskStyle: {
    width: 50,
    height: 38,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#f6f6f6"
  },
  deskItemsText: {
    fontSize: 12
  }
})

export default Desk
