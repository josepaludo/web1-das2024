import { FormEventHandler, useState } from "react"
import { Course } from "../types/Course"
import { useCourses } from "./useCourses"


type Errors = {
    name?: string
    link?: string
}

type Props = {
    type: "create",
    course?: undefined,
} | {
    type: "edit",
    course: Course,
}

export const useCoursesForm = ({ type, course  }: Props) => {

    const { createCourse, editCourse, goToCoursesList } = useCourses()
    const [ errors, setErrors ] = useState<Errors>({})

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {

        e.preventDefault()
        setErrors(() => ({}))
        const target = e.target as unknown as { [key in keyof Errors]: { value: string }}

        const name = target.name?.value
        const link = target.link?.value

        let error = false

        if (!name) {
            setErrors(curr => ({ ...curr, name: "Campo obrigatório "}))
            error = true
        }

        if (!link) {
            setErrors(curr => ({ ...curr, link: "Campo obrigatório "}))
            error = true
        }

        if (error || !name || !link) {
            return
        }

        switch (type) {
            case "create":
                createCourse({ name, link })
                break

            case "edit":
                editCourse({ name, link, id: course.id })
                break
        }

        goToCoursesList!()
    }

    return { onSubmit, errors }
}
