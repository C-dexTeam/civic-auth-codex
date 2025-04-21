import CourseEdit from '@/views/admin/courses/edit'

const CourseEditPage2 = () => <CourseEdit />

CourseEditPage2.acl = {
    action: 'read',
    permission: 'admin'
}
CourseEditPage2.admin = true
export default CourseEditPage2