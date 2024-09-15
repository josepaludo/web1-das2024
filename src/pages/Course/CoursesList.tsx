import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useCourses } from "../../hooks/useCourses"
import CourseRow from "./CourseRow"


export default function CoursesList() {

    const { courses } = useCourses()

    return <>
        <Card elevation={0}>
            <div className="w-full overflow-x-scroll p-6 flex flex-col gap-4">
                <Typography variant="h4">
                    Cursos
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { courses.map(course => (
                            <CourseRow
                                key={course.id}
                                course={course}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    </>
}