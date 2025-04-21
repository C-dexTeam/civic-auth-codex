
import CreateChapter from '@/views/admin/chapters/create'

const AddChapter = () => <CreateChapter />

AddChapter.acl = {
    action: 'read',
    permission: 'admin'
}
AddChapter.admin = true
export default AddChapter