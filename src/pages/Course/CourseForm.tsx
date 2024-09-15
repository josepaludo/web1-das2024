
import { Button, Card, TextField, Typography } from "@mui/material"
import { Course } from "../../types/Course";
import { useCoursesForm } from "../../hooks/useCoursesForm";


type Props = {
    course?: Course
}

export default function CourseForm({ course }: Props) {

    const { onSubmit, errors } = useCoursesForm(
        course ?
        { type: "edit", course } :
        { type: "create" }
    )

    const title = course ? "Editar Curso" : "Criar Curso"

    return (
        <Card className="p-6 flex flex-col gap-6" elevation={0}>
            <Typography variant="h5">
                { title }
            </Typography>
            <form
                onSubmit={onSubmit}
                className="grid md:grid-cols-2 gap-4 items-start"
            >

                <TextField
                    name="name"
                    label="Nome"
                    placeholder="Nome"
                    defaultValue={course?.name ?? ""}
                    error={!!errors.name}
                    helperText={errors.name}
                />

                <TextField
                    name="link"
                    label="Link"
                    placeholder="Link"
                    defaultValue={course?.link ?? ""}
                    error={!!errors.link}
                    helperText={errors.link}
                />

                <div className="flex md:col-span-2 xl:col-span-4 justify-end">
                    <Button
                        variant="contained"
                        disableElevation
                        type="submit"
                        className="w-full md:w-fit"
                    >
                        { title }
                    </Button>
                </div>
            </form>
        </Card>
    )
}
