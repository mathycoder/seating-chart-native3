export function fetchStudents(klass){
  return (dispatch) => {
    dispatch({ type: 'FETCH_STUDENTS_REQUEST' })
     fetch(`/klasses/${klass.id}/students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          dispatch({ type: 'FETCH_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}

export function dynamicPairsHetero(klass, groupBy){
  return (dispatch) => {
    dispatch({ type: 'REQUEST_GENERATE' })
     fetch(`/klasses/${klass.id}/students/dynamic_pairs_hetero`, {
       method: "PATCH",
       body: JSON.stringify({group_by: groupBy}),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          dispatch({ type: 'FETCH_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}

export function dynamicPairsHomo(klass, groupBy){
  return (dispatch) => {
    dispatch({ type: 'REQUEST_GENERATE' })
     fetch(`/klasses/${klass.id}/students/dynamic_pairs_homo`, {
       method: "PATCH",
       body: JSON.stringify({group_by: groupBy}),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          dispatch({ type: 'FETCH_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}

export function dynamicGroupsHetero(klass, size, groupBy){
  return (dispatch) => {
    dispatch({ type: 'REQUEST_GENERATE' })
     fetch(`/klasses/${klass.id}/students/dynamic_groups_hetero`, {
      method: "PATCH",
      body: JSON.stringify({size: size, group_by: groupBy}),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          dispatch({ type: 'FETCH_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}

export function dynamicGroupsHomo(klass, size, groupBy){
  return (dispatch) => {
    dispatch({ type: 'REQUEST_GENERATE' })
     fetch(`/klasses/${klass.id}/students/dynamic_groups_homo`, {
      method: "PATCH",
      body: JSON.stringify({size: size, group_by: groupBy}),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          dispatch({ type: 'FETCH_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}

export function addStudent(klass, studentData){
  return (dispatch) => {
    dispatch({ type: 'ADD_STUDENT_REQUEST' })
     fetch(`/klasses/${klass.id}/students`, {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: student.error })
        } else {
          dispatch({ type: 'ADD_STUDENT', student })
        }
      })
      .catch(console.log)
  }
}

export function editStudent(klass, studentData, studentId){
  return (dispatch) => {
    dispatch({type: 'START_EDITING_STUDENT', studentData, studentId})
    fetch(`/klasses/${klass.id}/students/${studentId}`, {
      method: 'PATCH',
      credentials: "include",
      body: JSON.stringify(studentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){
          dispatch({ type: 'ADD_FLASH_MESSAGE', message: student.error })
        } else {
          dispatch({ type: 'EDIT_STUDENT', student })
        }
      })
  }
}

export function swapSeats(klass, student1, student2, type){
  return (dispatch) => {
    dispatch({ type: 'SWAP_STUDENTS_REQUEST', student1, student2, grouping: type })
    const params = {studentId1: student1.id, studentId2: student2.id, type: type}
     fetch(`/klasses/${klass.id}/students/swap`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          dispatch({ type: 'SWAP_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}

export function newSeat(klass, student, seat, type){
  return dispatch => {
    dispatch({ type: 'NEW_SEAT_REQUEST', student, seat, style: type })
    const params = {seat: seat, type: type}
     fetch(`/klasses/${klass.id}/students/${student.id}`, {
      method: "PATCH",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){

        } else {
          dispatch({ type: 'NEW_SEAT', student })
        }
      })
      .catch(console.log)
  }
}

export function deleteStudent(klass, student){
  return (dispatch) => {
    dispatch({ type: 'DELETE_STUDENT_REQUEST' })
     fetch(`/klasses/${klass.id}/students/${student.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){

        } else {
          dispatch({ type: 'DELETE_STUDENT', student })
        }
      })
      .catch(console.log)
  }
}
