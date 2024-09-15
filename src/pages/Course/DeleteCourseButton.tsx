import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AppModal from '../../components/AppModal'
import { useCourses } from '../../hooks/useCourses'


export default function DeleteCourseButton({ id }: { id: number }) {

    const { deleteCourse } = useCourses()

    const DeleteButton = ({ onClick }: { onClick: () => void }) => (
        <Tooltip title="Remover Curso">
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
            confirm='Remover Curso'
            description='O curso será removido da lista de cursos. Essa ação é irreversível'
            onConfirm={() => deleteCourse(id)}
            title='Remover Curso?'
        >
        </AppModal>
    )
}