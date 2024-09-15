
import { Button, Card, Typography } from "@mui/material"
import { useStudentForm } from "../../hooks/useStudentForm";
import { Student } from "../../types/Student";
import dayjs from "dayjs";
import { TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

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

            <TextField
                name="name"
                label="Nome"
                placeholder="Nome"
                defaultValue={defaultValues?.name ?? ""}
                error={!!errors.name}
                helperText={errors.name}
            />

            <TextField
                name="email"
                label="E-Mail"
                placeholder="E-Mail"
                defaultValue={defaultValues?.email ?? ""}
                error={!!errors.email}
                helperText={errors.email}
            />

            <TextField
                name="cpf"
                label="CPF"
                placeholder="CPF"
                defaultValue={defaultValues?.cpf ?? ""}
                error={!!errors.cpf}
                helperText={errors.cpf}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    name="birthDate"
                    label="Data de Nascimento"
                    defaultValue={defaultValues?.birthDate}
                    slotProps={{
                        textField: {
                            error: !!errors.birthDate,
                            helperText: errors.birthDate
                        }
                    }}
                />
            </LocalizationProvider>

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
