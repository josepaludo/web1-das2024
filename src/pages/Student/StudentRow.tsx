import { Student } from '../../types/Student';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useStudents } from '../../hooks/useStudents';
import DeleteStudentButton from './DeleteStudentButton';


type Props = { student: Student }

export default function StudentRow({ student }: Props) {

    const { goToEditStudentPage } = useStudents()

    return (
        <TableRow
            key={student.id}
            className="flex gap-16 pt-2 w-fit min-w-full"
        >
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.cpf}</TableCell>
            <TableCell>{student.birthDate}</TableCell>

            <TableCell className='flex items-center'>
                <Tooltip title="Editar Aluno">
                    <IconButton onClick={() => goToEditStudentPage(student)} >
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <DeleteStudentButton id={student.id} />
            </TableCell>
        </TableRow>
    )
}
