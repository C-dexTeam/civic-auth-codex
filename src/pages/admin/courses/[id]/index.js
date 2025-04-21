
import CourseEdit from "@/views/admin/courses/edit"

const CourseEditPage = () => <CourseEdit />

CourseEditPage.acl = {
    action: 'read',
    permission: 'admin'
}
CourseEditPage.admin = true
export default CourseEditPage 