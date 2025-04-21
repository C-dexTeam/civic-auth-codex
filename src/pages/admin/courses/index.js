
import CoursesAdminView from '@/views/admin/courses/list'

const CoursesAdminPage = () => <CoursesAdminView />

CoursesAdminPage.acl = {
    action: 'read',
    permission: 'admin'
}
CoursesAdminPage.admin = true
export default CoursesAdminPage