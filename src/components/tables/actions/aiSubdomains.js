import { Button, IconButton } from '@mui/material'
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ClassicDialog from 'src/components/dialogs/ClassicDialog'
import DeleteDialog from 'src/components/dialogs/DeleteDialog'
import AiSubdomainsForm from 'src/components/form/aiSubdomains'
import { deleteAiSubdomain, updateAiSubdomain } from 'src/store/api/ai_subdomains'

const AiSubdomainsActions = ({ row }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [values, setValues] = useState({ name: row.name })

    const dispatch = useDispatch()
    const router = useRouter()

    const handleUpdate = () => {
        dispatch(updateAiSubdomain({ id: row.id, ...values }))
            .finally(() => setOpenEdit(false))
    }

    const handleDelete = () => {
        dispatch(deleteAiSubdomain({ id: row.id }))
            .finally(() => setOpenDelete(false))
    }

    const handleRotateEdit = () => {
        // router.push(`/yapay-zeka-alanlari/duzenle/${row.id}`)
        setOpenEdit(true)
    }

    return (
        <>
            <IconButton size='small' onClick={() => handleRotateEdit()} color='warning'>
                <PencilOutline />
            </IconButton>

            <IconButton size='small' onClick={() => setOpenDelete(true)} color='error'>
                <TrashCanOutline />
            </IconButton>

            <ClassicDialog
                open={openEdit}
                setOpen={setOpenEdit}
                title="Yapay Zeka Alanı Düzenle"
                subtitle=""
                size='md'
                actions={<Button variant="outlined" size="small" onClick={() => handleUpdate()} disabled={!values?.name}>ALAN DÜZENLE</Button>}
            >
                <AiSubdomainsForm
                    values={values}
                    setValues={setValues}
                />
            </ClassicDialog>

            <DeleteDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title="Yapay zeka alanını silmek istediğinize emin misiniz?"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default AiSubdomainsActions