import { FormEventHandler, useState } from "react"
import { useStudents } from "./useStudents"
import { Student } from "../types/Student"


type Errors = {
    name?: string
    cpf?: string
    email?: string
    birthDate?: string
}

type Props = {
    type: "create",
    student?: undefined,
    onSuccess?: () => void
} | {
    type: "edit",
    student: Student,
    onSuccess?: () => void
}

const splitBy = (str: string, char: string) => (
    !str ? [] : str.split(char).filter(field => !!field)
)

export const useStudentForm = ({ type, student, onSuccess }: Props) => {

    const { createStudent, editStudent } = useStudents()
    const [ errors, setErrors ] = useState<Errors>({})

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {

        e.preventDefault()
        setErrors(() => ({}))
        const target = e.target as unknown as { [key in keyof Errors]: { value: string }}

        const name = target.name?.value
        const cpf = target.cpf?.value
        const email = target.email?.value
        const birthDateString = target.birthDate?.value
        const birthDateDate = new Date(birthDateString as unknown as Date)

        let error = false

        if (!name) {
            setErrors(curr => ({ ...curr, name: "Campo obrigatório "}))
            error = true
        }

        if (!cpf) {
            setErrors(curr => ({ ...curr, cpf: "Campo obrigatório "}))
            error = true
        }

        if (!birthDateString) {
            setErrors(curr => ({ ...curr, birthDate: "Campo obrigatório "}))
            error = true
        }

        if (!email) {
            setErrors(curr => ({ ...curr, email: "Campo obrigatório "}))
            error = true
        } else {

            const splitEmail = splitBy(email, "@")
            const doesNotIncludeAt = splitEmail.length < 2
            const doesNotIncludeDotAfterAt = splitBy(splitEmail[1], ".").length < 2
            if (doesNotIncludeAt || doesNotIncludeDotAfterAt) {
                setErrors(curr => ({ ...curr, email: "Campo deve ser um e-mail"}))
                error = true
            }
        }

        if (isNaN(birthDateDate.getTime())) {
            setErrors(curr => ({ ...curr, birthDate: "Campo deve ser uma data válida"}))
            error = true
        }

        if (error || !name || !email || !cpf || !birthDateString) {
            return
        }

        if (onSuccess) {
            onSuccess()
        }

        switch (type) {
            case "create":
                createStudent({ name, email, cpf, birthDate: birthDateString })
                break

            case "edit":
                editStudent({
                    name,
                    email,
                    cpf,
                    id: student.id,
                    birthDate: birthDateString,
                })
                break
        }
    }

    return { onSubmit, errors }
}