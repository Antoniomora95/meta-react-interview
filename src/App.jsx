/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import { LOCATIONS, initialItems } from './mocks';

//9: 15

function StudentItem({
  student,
  selectStudentHandler
}) {
  const { id, name, isSelected } = student;
  const onChange = (id) => () => {
    selectStudentHandler(id)
  }

  return (
    <li className='student-item'>
      <input type="checkbox" name={name} id={id} onChange={onChange(id)} checked={isSelected} />
      <span>{id}</span>
      <span>{name}</span>
    </li>
  )
}
function Classroom({
  students,
  location,
  selectStudentHandler,
}) {
  if (!students) {
    return 'no data :)'
  }

  return (
    <ul>
      {
        students.filter(student => student.location === location)
          .map(student => (
            <StudentItem
              key={student.id}
              student={student}
              selectStudentHandler={selectStudentHandler}
            />
          )
          )
      }
    </ul>
  )
}

function ButtonsContainer({
  studentsLocationHandler
}) {
  const handlerMoveToRight = () => {
    studentsLocationHandler(LOCATIONS.RIGHT)
  }
  const handlerMoveToLeft = () => {
    studentsLocationHandler(LOCATIONS.LEFT)
  }
  return (
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
      <button
        style={{ marginBottom: '20px', width: '100%' }}
        onClick={handlerMoveToRight}
      >
        Going Right &#8594;
      </button>
      <button
        style={{ width: '100%' }}
        onClick={handlerMoveToLeft}
      >
        Going Left &#8592;
      </button>
    </div>
  );
}

function App() {
  const [students, setStudents] = useState(() => initialItems);

  const studentsLocationHandler = (location) => {
    const studentsUpdated = students.map((student) => {
      if (student.isSelected && student.location !== location) {
        return {
          ...student,
          isSelected: false,
          location
        }
      }
      return student;
    }, []);
    setStudents(studentsUpdated);
  }

  const selectStudentById = (id) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          isSelected: !student.isSelected
        }
      }
      return student;
    });
    setStudents(updatedStudents);
  }

  return (
    <>
      <section>
        <h3>META React frontend interview</h3>
      </section>
      <div className='container'>
        <Classroom
          location={LOCATIONS.LEFT}
          students={students}
          selectStudentHandler={selectStudentById}
        />
        <ButtonsContainer studentsLocationHandler={studentsLocationHandler} />
        <Classroom
          location={LOCATIONS.RIGHT}
          students={students}
          selectStudentHandler={selectStudentById}
        />
      </div>
    </>
  )
}

export default App
