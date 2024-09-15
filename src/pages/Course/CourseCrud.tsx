import { useState } from "react"
import {  Tab, Tabs } from "@mui/material"
import { Student } from "../../types/Student"
import { StudentsContext } from "../../contexts/StudentsContext"
import { useStudents } from "../../hooks/useStudents"
import CourseList from "./CourseList"
import CreateCourse from "./CreateCourse"


export default function CourseCrud() {

    const { loadStudents } = useStudents()
    const [ students, setStudents ] = useState<Array<Student>>(loadStudents())
    const [ index, setIndex ] = useState(0)

    const Component = {
        0: CourseList,
        1: CreateCourse,
    }[index]!

    return <>
        <StudentsContext.Provider value={{ students, setStudents }}>
                <Tabs
                    className="bg-white mb-4"
                    value={index}
                    onChange={(_, newIndex) => setIndex(newIndex)}
                >
                    <Tab label="Lista de Cursos" />
                    <Tab label="Criar Curso" />
                </Tabs>

                <Component />
        </StudentsContext.Provider>
    </>
}
