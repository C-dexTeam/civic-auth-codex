import CourseChaptersList from "@/views/admin/chapters/list"

const CourseChaptersPage = () => <CourseChaptersList />

CourseChaptersPage.acl = {
    action: 'read',
    permission: 'admin'
}
CourseChaptersPage.admin = true
export default CourseChaptersPage
