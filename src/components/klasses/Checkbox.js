import React from 'react'
import CheckBox from 'react-native-check-box'

const Checkbox = ({ title, checked, callbackFunction }) => (
  <CheckBox
      style={{width: 110, marginLeft: 20}}
      checkBoxColor={'white'}
      rightText={title}
      rightTextStyle={{color: 'white', fontSize: 16, marginLeft: 5}}
      onClick={()=> callbackFunction()}
      isChecked={checked}
  />
)

export default Checkbox
