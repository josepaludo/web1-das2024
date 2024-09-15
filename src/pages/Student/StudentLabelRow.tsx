import { Student } from '../../types/Student';
import { IconButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useStudents } from '../../hooks/useStudents';


type Props = {
    student: Student,
    editStudent: () => void
}

export default function StudentLabelRow({ student, editStudent }: Props) {

    const { deleteStudent } = useStudents()

    return (
        <div
            key={student.id}
            className="flex gap-16 border-t pt-2 w-fit min-w-full"
        >
            <LabelAndValue label="ID" value={student.id} />
            <LabelAndValue label="Nome" value={student.name} />
            <LabelAndValue label="E-Mail" value={student.email} />
            <LabelAndValue label="CPF" value={student.cpf} />
            <LabelAndValue label="Data de Nascimento" value={student.birthDate} />

            <div className='flex items-center'>
                <Tooltip title="Editar Estudante">
                    <IconButton onClick={editStudent} color="warning" >
                        <EditIcon fontSize='large' />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Remover Estudante">
                    <IconButton
                        color="error"
                        onClick={() => deleteStudent(student.id)}
                    >
                        <DeleteIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
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