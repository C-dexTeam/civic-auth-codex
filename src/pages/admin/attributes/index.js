import AttributesView from '@/views/admin/attributes/list'

const AttributesPage = () => <AttributesView />

AttributesPage.acl = {
    action: 'read',
    permission: 'admin'
}
AttributesPage.admin = true
export default AttributesPage