import { Button, Card, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { FormEventHandler, useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from "dayjs";
import { useStudents } from "../../hooks/useStudents";


type Props = {
    className?: string
    defaultValues?: {
        name?: string
        email?: string
        cpf?: string
        birthDate?: Dayjs
    }
}

type Errors = {
    name?: string
    cpf?: string
    email?: string
    birthDate?: string
}

const splitBy = (str: string, char: string) => (
    !str ? [] : str.split(char).filter(field => !!field)
)

export default function CreateStudent({ className = "", defaultValues = {} }: Props) {

    const { createStudent } = useStudents()
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

        if (!name) {
            setErrors(curr => ({ ...curr, name: "Campo obrigatório "}))
        }

        if (!email) {
            setErrors(curr => ({ ...curr, email: "Campo obrigatório "}))
        } else {

            const splitEmail = splitBy(email, "@")
            const doesNotIncludeAt = splitEmail.length < 2
            const doesNotIncludeDotAfterAt = splitBy(splitEmail[1], ".").length < 2
            if (doesNotIncludeAt || doesNotIncludeDotAfterAt) {
                setErrors(curr => ({ ...curr, email: "Campo deve ser um e-mail"}))
            }
        }

        if (!cpf) {
            setErrors(curr => ({ ...curr, cpf: "Campo obrigatório "}))
        }

        if (!birthDateString) {
            setErrors(curr => ({ ...curr, birthDate: "Campo obrigatório "}))
        }

        if (isNaN(birthDateDate.getTime())) {
            setErrors(curr => ({ ...curr, birthDate: "Campo deve ser uma data válida"}))
            return
        }

        if (!name || !email || !cpf || !birthDateString) {
            return
        }

        createStudent({
            name, email, cpf, birthDate: birthDateString
        })
    }

    return (
        <Card className="p-6 flex flex-col gap-6" elevation={0}>
            <Typography variant="h5">
                Criar Estudante
            </Typography>
            <form
                onSubmit={onSubmit}
                className={ "grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-start " + className }
            >

                <TextField
                    name="name"
                    label="Nome"
                    placeholder="Nome"
                    defaultValue={defaultValues.name ?? ""}
                    error={!!errors.name}
                    helperText={errors.name}
                />

                <TextField
                    name="email"
                    label="E-Mail"
                    placeholder="E-Mail"
                    defaultValue={defaultValues.email ?? ""}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    name="cpf"
                    label="CPF"
                    placeholder="CPF"
                    defaultValue={defaultValues.cpf ?? ""}
                    error={!!errors.cpf}
                    helperText={errors.cpf}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        name="birthDate"
                        label="Data de Nascimento"
                        defaultValue={defaultValues.birthDate}
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
                        Criar Aluno
                    </Button>
                </div>
            </form>
        </Card>
    )
}
