
import { Button, Card, Typography } from "@mui/material"
import StudentFormFields from "./StudentFormFields";
import { useStudentForm } from "../../hooks/useStudentForm";
import { Student } from "../../types/Student";
import dayjs from "dayjs";


type Props = {
    student?: Student
}

export default function StudentForm({ student }: Props) {

    const { onSubmit, errors } = useStudentForm(
        student ?
        { type: "edit", student } :
        { type: "create" }
    )

    const defaultValues = !student ? student : {
        ...student,
        birthDate: dayjs(student.birthDate)
    }

    const title = student ? "Editar Aluno" : "Criar Aluno"

    return (
        <Card className="p-6 flex flex-col gap-6" elevation={0}>
            <Typography variant="h5">
                { title }
            </Typography>
            <form
                onSubmit={onSubmit}
                className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-start"
            >

                <StudentFormFields
                    errors={errors}
                    defaultValues={defaultValues}
                />

                <div className="flex md:col-span-2 xl:col-span-4 justify-end">
                    <Button
                        variant="contained"
                        disableElevation
                        type="submit"
                        className="w-full md:w-fit"
                    >
                        { title }
                    </Button>
                </div>
            </form>
        </Card>
    )
}
