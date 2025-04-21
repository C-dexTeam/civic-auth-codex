
import RewardsView from '@/views/admin/rewards/list'

const RewardsAdminPage = () => {
    return (
        <RewardsView />
    )
}


RewardsAdminPage.acl = {
    action: 'read',
    permission: 'admin'
}
RewardsAdminPage.admin = true
export default RewardsAdminPage