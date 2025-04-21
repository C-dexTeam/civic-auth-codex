
import Chapters from "@/views/chapters"


const ChaptersPage = () => {

    return <Chapters  />
}

ChaptersPage.acl = {
    action: 'read',
    permission: 'chapter'
}
export default ChaptersPage