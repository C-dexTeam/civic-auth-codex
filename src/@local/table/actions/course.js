import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import DeleteDialog from '@/components/dialog/DeleteDialog'
import { useState } from 'react'
import { deleteCourse } from '@/store/admin/courses'
import { useDispatch } from 'react-redux'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';

const CourseActions = ({ row }) => {
    const router = useRouter()
    const [openDelete, setOpenDelete] = useState(false)

    const dispatch = useDispatch()

    const handleEdit = () => {
        router.push(`/admin/courses/${row.id}/edit`)
    }

    const handleChapters = () => {
        router.push(`/admin/courses/${row.id}/chapters`)
    }

    const handleDelete = () => {
        dispatch(deleteCourse(row.id))
    }

    return (
        <>
            <Tooltip title="Chapters">
                <IconButton onClick={handleChapters}>
                    <DvrOutlinedIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
                <IconButton onClick={handleEdit}>
                    <Edit />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
                <IconButton onClick={() => setOpenDelete(true)}>
                    <Delete />
                </IconButton>
            </Tooltip>
            <DeleteDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title="Delete Course"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default CourseActions