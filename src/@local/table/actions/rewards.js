import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { Delete, Edit } from '@mui/icons-material'
import DeleteDialog from '@/components/dialog/DeleteDialog'
import { useState } from 'react'
import { deleteReward } from '@/store/admin/rewards'
import { useDispatch } from 'react-redux'

const RewardActions = ({ row }) => {
    const router = useRouter()
    const [openDelete, setOpenDelete] = useState(false)

    const dispatch = useDispatch()

    const handleEdit = () => {
        router.push(`/admin/rewards/${row.id}/edit`)
    }

    const handleDelete = () => {
        dispatch(deleteReward(row.id))
    }

    return (
        <>
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
                title="Delete Reward"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default RewardActions