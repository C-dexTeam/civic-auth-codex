
import ChaptersCode from "@/views/courses-code.js"


const ChaptersCodePage = () => {

    return <ChaptersCode  />
}

ChaptersCodePage.acl = {
    action: 'read',
    permission: 'chapter'
}
export default ChaptersCodePage