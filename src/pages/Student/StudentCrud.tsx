import { useState } from "react"

import CreateStudent from "./CreateStudent"
import StudentsList from "./StudentsList"
import { Student } from "../../types/Student"
import { StudentsContext } from "../../contexts/StudentsContext"
import { useStudents } from "../../hooks/useStudents"


export default function StudentCrud() {

    const { loadStudents } = useStudents()
    const [ students, setStudents ] = useState<Array<Student>>(loadStudents())

    return <>
        <StudentsContext.Provider value={{ students, setStudents }}>
            <div className="flex flex-col gap-6">
                <StudentsList />
                <CreateStudent  />
            </div>
        </StudentsContext.Provider>
    </>
}
