import { createContext, Dispatch, SetStateAction } from "react";
import { Student } from "../types/Student";


export const StudentsContext = createContext<{
    students: Array<Student>
    setStudents?: Dispatch<SetStateAction<Student[]>>
    editStudent?: (student: Student) => void
    currentStudent?: Student
    goToStudentsList?: () => void
}>({ students: [] })
