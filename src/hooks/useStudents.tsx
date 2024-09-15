import { useContext } from "react"
import { Student } from "../types/Student"
import { StudentsContext } from "../contexts/StudentsContext"


const STUDENTS_KEY = "STUDENTS"

export const useStudents = () => {

    const { students } = useContext(StudentsContext)
    const { setStudents } = useContext(StudentsContext)

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

    const addStudentToStorage = (student: Omit<Student, "id">): Student|null => {

        let studentsParsed = getStudentsFromStorage()
        const newStudent = {
            ...student,
            id: getNewId(studentsParsed)
        }

        studentsParsed = [ newStudent, ...studentsParsed ]

        let studentsString: string
        try {
            studentsString = JSON.stringify(studentsParsed)
        } catch {
            return null
        }

        localStorage.setItem(STUDENTS_KEY, studentsString)
        return newStudent
    }

    const getNewId = (students: Array<Student>) => (
        Math.max(0, ...students.map(student => student.id)) + 1
    )



    const _createStudent = (student: Omit<Student, "id">) => {
        const newStudent = addStudentToStorage(student)
        if (!newStudent) {
            return
        }
        setStudents!(curr => [ ...curr, newStudent ])
    }

    return {
        createStudent: _createStudent,
        loadStudents: getStudentsFromStorage,
        students
    }
}