
import { TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from "dayjs"


type Props = {
    defaultValues?: {
        name?: string
        email?: string
        cpf?: string
        birthDate?: Dayjs
    },

    errors: {
        name?: string
        cpf?: string
        email?: string
        birthDate?: string
    }
}

export default function StudentFormFields({ defaultValues = {}, errors }: Props) {

    return <>
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
    </>
}