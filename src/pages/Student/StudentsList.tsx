import { Card, Typography } from "@mui/material"
import { useStudents } from "../../hooks/useStudents"


export default function StudentsList() {

    const { students } = useStudents()

    if (students.length < 1) {
        return
    }

    return <>
        <Card elevation={0}>
            <div className="w-full overflow-x-scroll p-6 flex flex-col gap-4">
                <Typography variant="h4">
                    Estudantes
                </Typography>
                { students.map(student => (
                    <div
                        key={student.id}
                        className="flex gap-16 border-t pt-2 w-fit min-w-full"
                    >
                        <LabelAndValue label="ID" value={student.id} />
                        <LabelAndValue label="Nome" value={student.name} />
                        <LabelAndValue label="E-Mail" value={student.email} />
                        <LabelAndValue label="CPF" value={student.cpf} />
                        <LabelAndValue label="Data de Nascimento" value={student.birthDate} />
                    </div>
                ))}
            </div>
        </Card>
    </>
}

function LabelAndValue({ label, value }: { label: string, value: string|number }) {

    return (
        <div>
            <Typography variant="h6" className="text-nowrap">
                { label }
            </Typography>
            <Typography variant="body1">
                { value }
            </Typography>
        </div>
    )
}