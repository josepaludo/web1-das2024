import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useStudents } from "../../hooks/useStudents"
import StudentRow from "./StudentRow"


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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>Data de Nascimento</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { students.map(student => (
                            <StudentRow
                                key={student.id}
                                student={student}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    </>
}