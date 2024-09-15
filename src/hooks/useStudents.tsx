import { useContext } from "react"
import { Student } from "../types/Student"
import { StudentsContext } from "../contexts/StudentsContext"


const STUDENTS_KEY = "STUDENTS"

export const useStudents = () => {

    const { setStudents, students, editStudent, currentStudent, goToStudentsList } = useContext(StudentsContext)

    const getStudentsFromStorage = () => {
        const students = localStorage.getItem(STUDENTS_KEY) as string

        let studentsParsed: Array<Student>
        try {
            studentsParsed = JSON.parse(students) as Array<Student>
        } catch {
            studentsParsed = []
        }
        if (!Array.isArray(studentsParsed)) {
            studentsParsed = []
        }

        return studentsParsed
    }

    const setStudentsOnStorage = (_students: Array<Student>) => {

        let studentsString: string
        try {
            studentsString = JSON.stringify(_students)
        } catch {
            return false
        }

        localStorage.setItem(STUDENTS_KEY, studentsString)
        return true
    }

    const addStudentToStorage = (student: Omit<Student, "id">): Student|null => {

        let studentsParsed = getStudentsFromStorage()
        const newStudent = {
            ...student,
            id: getNewId(studentsParsed)
        }

        studentsParsed = [ newStudent, ...studentsParsed ]

        if (setStudentsOnStorage(studentsParsed)) {
            return newStudent
        }

        return null
    }

    const deleteStudent = (id: number) => {
        const newStudents = students.filter(student => student.id !== id)
        setStudentsOnStorage(newStudents)
        setStudents!(newStudents)
    }

    const createStudent = (student: Omit<Student, "id">) => {
        const newStudent = addStudentToStorage(student)
        if (!newStudent) {
            return
        }
        setStudents!(curr => [ ...curr, newStudent ])
    }

    const _editStudent = (student: Student) => {
        const _students = students.filter(
            _student => _student.id !== student.id
        )
        const newStudents = [ ..._students, student ]
        setStudents!(newStudents)
        setStudentsOnStorage(newStudents)
    }

    const goToEditStudentPage = (student: Student) => {
        editStudent!(student)
    }

    return {
        loadStudents: getStudentsFromStorage,
        createStudent,
        deleteStudent,
        editStudent: _editStudent,
        goToEditStudentPage,
        students,
        student: currentStudent,
        goToStudentsList
    }
}

const getNewId = (students: Array<Student>) => (
    Math.max(0, ...students.map(student => student.id)) + 1
)