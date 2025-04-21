import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import DeleteDialog from '@/components/dialog/DeleteDialog'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteChapter } from '@/store/admin/chapters'

const ChapterActions = ({ row }) => {
    const router = useRouter()
    const [openDelete, setOpenDelete] = useState(false)
    const dispatch = useDispatch()

    const handleEdit = () => {
        router.push(`/admin/chapters/${row.id}/edit`)
    }

    const handleView = () => {
        router.push(`/admin/chapters/${row.id}`)
    }

    const handleDelete = () => {
        dispatch(deleteChapter(row.id))
        setOpenDelete(false)
    }

    return (
        <>
            <Tooltip title="View">
                <IconButton onClick={handleView}>
                    <Visibility />
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
                title="Delete Chapter"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default ChapterActions 