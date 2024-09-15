import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Course } from '../../types/Course';
import { useCourses } from '../../hooks/useCourses';
import DeleteCourseButton from './DeleteCourseButton';


type Props = { course: Course }

export default function CourseRow({ course }: Props) {

    const { goToEditCoursesPage} = useCourses()

    return (
        <TableRow
            key={course.id}
            className="flex gap-16 pt-2 w-fit min-w-full"
        >
            <TableCell>{course.id}</TableCell>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.link}</TableCell>

            <TableCell className='flex items-center'>
                <Tooltip title="Editar Curso">
                    <IconButton onClick={() => goToEditCoursesPage(course)} >
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <DeleteCourseButton id={course.id} />
            </TableCell>
        </TableRow>
    )
}
