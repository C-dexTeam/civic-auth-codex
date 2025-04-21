
import Code from "@/views/courses-code"


const CodeExample = () => {
    return <Code />
}

CodeExample.acl = {
    action: 'read',
    permission: 'chapter'
}
export default CodeExample