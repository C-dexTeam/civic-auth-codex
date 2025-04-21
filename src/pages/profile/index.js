import Profile from "@/views/profile"

const ProfilePage = () => {
    return <Profile />
}

ProfilePage.acl = {
    action: 'read',
    permission: 'courses'
}
export default ProfilePage