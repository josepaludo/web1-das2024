import { createContext, Dispatch, SetStateAction } from "react";
import { Course } from "../types/Course";


export const CoursesContext = createContext<{
    courses: Array<Course>
    setCourses?: Dispatch<SetStateAction<Course[]>>
    editCourse?: (course: Course) => void
    currentCourse?: Course
    goToCoursesList?: () => void
}>({ courses: [] })
