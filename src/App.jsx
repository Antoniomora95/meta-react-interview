/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import { LOCATIONS, initialItems } from './mocks';
import getLongestSubstringUniqueCharacters from './mid-level-interview';

const getStudentsForClassroom = (students) => (location) =>
  (students.filter(student => student.location === location))

function StudentItem({
  student,
  selectStudentHandler
}) {
  const { id, name, isSelected } = student;
  const onChangeHandler = (id) => () => selectStudentHandler(id);

  return (
    <li className='student-item'>
      <input type="checkbox" name={name} id={id} onChange={onChangeHandler(id)} checked={isSelected} />
      <span style={{ marginLeft: '1rem' }}>{name}</span>
    </li>
  )
}
function StudentsList({ children, ...props }) {
  return (
    <ul {...props}>{children}</ul>
  )
}

function ClassroomContainer({
  students,
  selectStudentHandler,
  ...props
}) {
  const studentItems = students.map(student => (
    <StudentItem
      key={student.id}
      student={student}
      selectStudentHandler={selectStudentHandler}
    />
  ));
  return (
    <StudentsList {...props}>
      {studentItems}
    </StudentsList>
  );
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
    <>
      <div className='buttons-container'>
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
    </>
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
        <ClassroomContainer
          students={getStudentsForClassroom(students)(LOCATIONS.LEFT)}
          selectStudentHandler={selectStudentById}
          className='align-right'
        />
        <ButtonsContainer
          studentsLocationHandler={studentsLocationHandler}
        />
        <ClassroomContainer
          students={getStudentsForClassroom(students)(LOCATIONS.RIGHT)}
          selectStudentHandler={selectStudentById}
        />
      </div>




      
      <section>

        <h3>Middle react interview</h3>
        <div>AAABBCD: {getLongestSubstringUniqueCharacters('AAABBCD')}</div>
        <div>ABCDDEFGHJK: {getLongestSubstringUniqueCharacters('ABCDDEFGHJK')}</div>
        <div>WWERRFADQ: {getLongestSubstringUniqueCharacters('WWERRFADQ')}</div>
        <div>ZZDEWWACJQ: {getLongestSubstringUniqueCharacters('ZZDEWWACJQ')}</div>
        <div>AABEBCDDAXC: {getLongestSubstringUniqueCharacters('AABEBCDDAXC')}</div>
        yei
      </section>
    </>
  )
}

export default App
