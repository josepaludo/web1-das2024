import { useContext } from "react"
import { CoursesContext } from "../contexts/CoursesContext"
import { Course } from "../types/Course"


const COURSES_KEY = "COURSES"

export const useCourses = () => {

    const { courses, currentCourse, editCourse, goToCoursesList, setCourses } = useContext(CoursesContext)

    const getCoursesFromStorage = () => {
        const courses = localStorage.getItem(COURSES_KEY) as string

        let coursesParsed: Array<Course>
        try {
            coursesParsed = JSON.parse(courses) as Array<Course>
        } catch {
            coursesParsed = []
        }
        if (!Array.isArray(coursesParsed)) {
            coursesParsed = []
        }

        return coursesParsed
    }

    const setCoursesOnStorage = (_courses: Array<Course>) => {

        let coursesString: string
        try {
            coursesString = JSON.stringify(_courses)
        } catch {
            return false
        }

        localStorage.setItem(COURSES_KEY, coursesString)
        return true
    }

    const addCourseToStorage = (course: Omit<Course, "id">): Course|null => {

        let coursesParsed = getCoursesFromStorage()
        const newCourse = {
            ...course,
            id: getNewId(coursesParsed)
        }

        coursesParsed = [ newCourse, ...coursesParsed ]

        if (setCoursesOnStorage(coursesParsed)) {
            return newCourse
        }

        return null
    }

    const deleteCourse = (id: number) => {
        const newCourses = courses.filter(course => course.id !== id)
        setCoursesOnStorage(newCourses)
        setCourses!(newCourses)
    }

    const createCourse = (course: Omit<Course, "id">) => {
        const newCourse = addCourseToStorage(course)
        if (!newCourse) {
            return
        }
        setCourses!(curr => [ ...curr, newCourse ])
    }

    const _editCourse = (course: Course) => {
        const _courses = courses.filter(
            _course => _course.id !== course.id
        )
        const newCourses = [ ..._courses, course ]
        setCourses!(newCourses)
        setCoursesOnStorage(newCourses)
    }

    const goToEditCoursesPage = (course: Course) => {
        editCourse!(course)
    }

    return {
        loadCourses: getCoursesFromStorage,
        createCourse,
        deleteCourse,
        editCourse: _editCourse,
        goToEditCoursesPage,
        courses,
        course: currentCourse,
        goToCoursesList
    }
}

const getNewId = (courses: Array<Course>) => (
    Math.max(0, ...courses.map(course => course.id)) + 1
)