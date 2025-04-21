import ChapterEdit from '@/views/admin/chapters/edit'

const ChapterEditPage = () => <ChapterEdit />

ChapterEditPage.acl = {
    action: 'read',
    permission: 'admin'
}
ChapterEditPage.admin = true
export default ChapterEditPage