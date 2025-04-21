import PlanguageEdit from '@/views/planguage/edit'

const PlanguageEditPage = () => <PlanguageEdit />

PlanguageEditPage.acl = {
    action: 'read',
    permission: 'admin'
}
PlanguageEditPage.admin = true
export default PlanguageEditPage