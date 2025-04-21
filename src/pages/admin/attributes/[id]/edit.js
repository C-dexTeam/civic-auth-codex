import AttributeEditView from '@/views/admin/attributes/edit'

const AttributeEditPage = () => <AttributeEditView />

AttributeEditPage.acl = {
    action: 'read',
    permission: 'admin'
}

AttributeEditPage.admin = true
export default AttributeEditPage