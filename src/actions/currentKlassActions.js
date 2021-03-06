export function setCurrentKlass(klass){
  return {type: 'SET_CURRENT_KLASS', klass}
}

export function clearCurrentKlass(){
  return {type: 'CLEAR_CURRENT_KLASS'}
}

export function setCurrentGroup(group){
  return {type: 'SET_CURRENT_GROUP', group}
}

export function showStudentsPage(){
  return {type: 'SHOW_STUDENTS_PAGE'}
}

export function hideStudentsPage(){
  return {type: 'HIDE_STUDENTS_PAGE'}
}

export function showGearMenu(){
  return {type: 'SHOW_GEAR_MENU'}
}

export function hideGearMenu(){
  return {type: 'HIDE_GEAR_MENU'}
}
