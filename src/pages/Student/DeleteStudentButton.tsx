import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useStudents } from '../../hooks/useStudents'
import AppModal from '../../components/AppModal'


export default function DeleteStudentButton({ id }: { id: number }) {

    const { deleteStudent } = useStudents()

    const DeleteButton = ({ onClick }: { onClick: () => void }) => (
        <Tooltip title="Remover Aluno">
            <IconButton
                color="error"
                onClick={onClick}
            >
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )

    return (
        <AppModal
            Component={DeleteButton}
            cancel='Voltar'
            confirm='Remover Aluno'
            description='O aluno será removido da lista de alunos. Essa ação é irreversível'
            onConfirm={() => deleteStudent(id)}
            title='Remover Aluno?'
        >
        </AppModal>
    )
}