import { useCourses } from "../../hooks/useCourses"
import CourseForm from "./CourseForm"

export default function EditCourse() {

    const { course } = useCourses()

    if (!course) {
        return
    }

    return <CourseForm course={course} />
}