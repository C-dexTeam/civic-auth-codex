import RewardCreate from '@/views/admin/rewards/create'

const RewardCreatePage = () => <RewardCreate />

RewardCreatePage.acl = {
    action: 'read',
    permission: 'admin'
}
RewardCreatePage.admin = true
export default RewardCreatePage 