import { useState } from "react"
import {  Tab, Tabs } from "@mui/material"
import CreateStudent from "./CreateStudent"
import StudentsList from "./StudentsList"
import { Student } from "../../types/Student"
import { StudentsContext } from "../../contexts/StudentsContext"
import { useStudents } from "../../hooks/useStudents"
import EditStudent from "./EditStudent"


export default function StudentCrud() {

    const { loadStudents } = useStudents()
    const [ students, setStudents ] = useState<Array<Student>>(loadStudents())
    const [ index, setIndex ] = useState(0)
    const [ currentStudent, setCurrentStudent ] = useState<Student|undefined>()

    const Component = {
        0: StudentsList,
        1: CreateStudent,
        2: EditStudent
    }[index]!

    const editStudent = (student: Student) => {
        setCurrentStudent(student)
        setIndex(2)
    }

    const goToStudentsList = () => {
        setIndex(0)
    }

    const context = {
        students,
        setStudents,
        editStudent,
        currentStudent,
        goToStudentsList
    }

    return <>
        <StudentsContext.Provider value={context}>
            <Tabs
                className="bg-white mb-4"
                value={index}
                onChange={(_, newIndex) => setIndex(newIndex)}
            >
                <Tab label="Lista de Alunos" />
                <Tab label="Criar Aluno" />
                <Tab label="Editar Aluno" disabled={index !== 2} />
            </Tabs>

            <Component />
        </StudentsContext.Provider>
    </>
}
