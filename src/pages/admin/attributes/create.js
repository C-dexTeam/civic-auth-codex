import CreateAttributeView from "@/views/admin/attributes/create"

const CreateAttribute = () => <CreateAttributeView />

CreateAttribute.acl = {
    action: 'read',
    permission: 'admin'
}

CreateAttribute.admin = true

export default CreateAttribute