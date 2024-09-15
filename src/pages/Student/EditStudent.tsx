import { useStudents } from "../../hooks/useStudents"
import StudentForm from "./StudentForm"


export default function EditStudent() {

    const { student } = useStudents()

    if (!student) {
        return
    }

    return <StudentForm student={student} />
}