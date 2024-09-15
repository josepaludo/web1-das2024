import { createContext, Dispatch, SetStateAction } from "react";
import { Student } from "../types/Student";


export const StudentsContext = createContext<{
    students: Array<Student>
    setStudents?: Dispatch<SetStateAction<Student[]>>
}>({ students: [] })
