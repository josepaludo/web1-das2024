import { Student } from "../../types/Student"
import StudentFormFields from "./StudentFormFields"
import { useStudentForm } from "../../hooks/useStudentForm"
import { Button } from "@mui/material"
import dayjs from "dayjs"


type Props = {
    student: Student
    changeBackToView: () => void
}

export default function StudentEditRow({ student, changeBackToView }: Props) {

    const { errors, onSubmit } = useStudentForm({
        type: "edit",
        onSuccess: changeBackToView,
        student,
    })

    const defaultValues = {
        ...student,
        birthDate: dayjs(student.birthDate)
    }

    return (
        <form
            className="flex gap-4"
            onSubmit={onSubmit}
        >
            <StudentFormFields
                errors={errors}
                defaultValues={defaultValues}
            />

            <Button
                variant="outlined"
                type="submit"
                className="text-nowrap"
            >
                Salvar Alterações
            </Button>
        </form>
    )
}
