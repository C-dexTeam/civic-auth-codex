import Challenges from "@/views/challenges"

const ChallengesPage = () => <Challenges />

ChallengesPage.acl = {
    action: 'read',
    permission: 'challenges'
}
export default ChallengesPage