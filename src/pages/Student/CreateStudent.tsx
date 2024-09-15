import { Button, Card, Typography } from "@mui/material"
import StudentFormFields from "./StudentFormFields";
import { useStudentForm } from "../../hooks/useStudentForm";


type Props = { className?: string }

export default function CreateStudent({ className = "" }: Props) {

    const { onSubmit, errors } = useStudentForm({ type: "create" })

    return (
        <Card className="p-6 flex flex-col gap-6" elevation={0}>
            <Typography variant="h5">
                Criar Estudante
            </Typography>
            <form
                onSubmit={onSubmit}
                className={ "grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-start " + className }
            >

                <StudentFormFields errors={errors} />

                <div className="flex md:col-span-2 xl:col-span-4 justify-end">
                    <Button
                        variant="contained"
                        disableElevation
                        type="submit"
                        className="w-full md:w-fit"
                    >
                        Criar Aluno
                    </Button>
                </div>
            </form>
        </Card>
    )
}
