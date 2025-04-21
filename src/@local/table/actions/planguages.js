import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { Delete, Edit } from '@mui/icons-material'
import DeleteDialog from '@/components/dialog/DeleteDialog'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deletePlanguages } from '@/store/admin/planguages'

const PlanguagesActions = ({ row }) => {
    const router = useRouter()
    const [openDelete, setOpenDelete] = useState(false)

    const dispatch = useDispatch()

    const handleEdit = () => {
        router.push(`/admin/planguages/${row.id}/edit`)
    }


    const handleDelete = () => {
        dispatch(deletePlanguages(row.id))
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
                title="Delete Planguage"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default PlanguagesActions