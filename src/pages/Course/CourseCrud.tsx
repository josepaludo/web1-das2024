import { useState } from "react"
import {  Tab, Tabs } from "@mui/material"
import { useCourses } from "../../hooks/useCourses"
import { Course } from "../../types/Course"
import CoursesList from "./CoursesList"
import CreateCourse from "./CreateCourse"
import EditCourse from "./EditCourse"
import { CoursesContext } from "../../contexts/CoursesContext"


export default function CourseCrud() {

    const { loadCourses } = useCourses()
    const [ courses, setCourses ] = useState<Array<Course>>(loadCourses())
    const [ index, setIndex ] = useState(0)
    const [ currentCourse, setCurrentCourse ] = useState<Course|undefined>()

    const Component = {
        0: CoursesList,
        1: CreateCourse,
        2: EditCourse
    }[index]!

    const editCourse = (course: Course) => {
        setCurrentCourse(course)
        setIndex(2)
    }

    const goToCoursesList = () => {
        setIndex(0)
    }

    const context = {
        courses,
        setCourses,
        editCourse,
        currentCourse,
        goToCoursesList
    }

    return <>
        <CoursesContext.Provider value={context}>
            <Tabs
                className="bg-white mb-4"
                value={index}
                onChange={(_, newIndex) => setIndex(newIndex)}
            >
                <Tab label="Lista de Cursos" />
                <Tab label="Criar Curso" />
                <Tab label="Editar Curso" disabled={index !== 2} />
            </Tabs>

            <Component />
        </CoursesContext.Provider>
    </>
}
