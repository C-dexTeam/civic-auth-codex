import CourseCreate from '@/views/admin/courses/create'

const CourseCreatePage = () => <CourseCreate />

CourseCreatePage.acl = {
    action: 'read',
    permission: 'admin'
}
CourseCreatePage.admin = true
export default CourseCreatePage 