import Courses from "@/views/courses"

const CoursesPage = () => {
    return <Courses />
}

CoursesPage.acl = {
    action: 'read',
    permission: 'courses'
}
export default CoursesPage