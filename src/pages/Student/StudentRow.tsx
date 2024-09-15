import { Student } from '../../types/Student'
import { useState } from 'react'
import StudentLabelRow from './StudentLabelRow'
import StudentEditRow from './StudentEditRow'


export default function StudentRow({ student }: { student: Student }) {

    const [ rowState, setRowState ] = useState<"view"|"edit">("view")

    if (rowState === "view") {
        return (
            <StudentLabelRow
                student={student}
                editStudent={() => setRowState("edit")}
            />
        )
    }

    return (
        <StudentEditRow
            student={student}
            changeBackToView={() => setRowState("view")}
        />
    )
}
