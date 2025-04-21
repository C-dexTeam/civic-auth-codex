import RewardEdit from '@/views/admin/rewards/edit'

const RewardEditPage = () => <RewardEdit />

RewardEditPage.acl = {
    action: 'read',
    permission: 'admin'
}
RewardEditPage.admin = true
export default RewardEditPage 