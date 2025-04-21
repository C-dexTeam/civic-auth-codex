import { Button, IconButton } from '@mui/material'
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ClassicDialog from 'src/components/dialogs/ClassicDialog'
import DeleteDialog from 'src/components/dialogs/DeleteDialog'
import UniversityForm from 'src/components/form/university'
import { deleteUniversity, setUniversity, updateUniversity } from 'src/store/api/universities'

const UniversitiesActions = ({ row }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [values, setValues] = useState({
        name: row.name,
        city: row.city,
        type: row.type,
    })

    const dispatch = useDispatch()
    const router = useRouter()

    const handleUpdate = () => {
        dispatch(updateUniversity({ id: row.id, ...values }))
            .finally(() => setOpenEdit(false))
    }

    const handleDelete = () => {
        dispatch(deleteUniversity(row.id))
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

            <Button
                variant="outlined"
                size="small"
                onClick={() => {
                    router.replace(`/tanimlamalar/fakulteler/${row.code}`)
                    dispatch(setUniversity(row))
                }}
                sx={{ ml: 2 }}
            >
                Fakülteler
            </Button>

            <ClassicDialog
                open={openEdit}
                setOpen={setOpenEdit}
                title="Üniversite Düzenle"
                subtitle=""
                size='md'
                actions={<Button variant="outlined" size="small" onClick={() => handleUpdate()} disabled={!values?.name}>ÜNİVERSİTE DÜZENLE</Button>}
            >
                <UniversityForm
                    values={values}
                    setValues={setValues}
                />
            </ClassicDialog>

            <DeleteDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title="Üniversiteyi silmek istediğinize emin misiniz?"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default UniversitiesActions