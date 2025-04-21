import { Button, IconButton } from '@mui/material'
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ClassicDialog from 'src/components/dialogs/ClassicDialog'
import DeleteDialog from 'src/components/dialogs/DeleteDialog'
import FacultyForm from 'src/components/form/faculty'
import { deleteFaculty, setFaculty, updateFaculty } from 'src/store/api/universities'

const FacultiesActions = ({ row }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [values, setValues] = useState({
        name: row.name,
        universityCode: row.universityCode,
    })

    const dispatch = useDispatch()
    const router = useRouter()

    const handleUpdate = () => {
        dispatch(updateFaculty({ id: row.id, ...values }))
            .finally(() => setOpenEdit(false))
    }

    const handleDelete = () => {
        dispatch(deleteFaculty(row.id))
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
                    router.replace(`/tanimlamalar/bolumler/${row.universityCode}?facultyCode=${row.code}`)
                    dispatch(setFaculty(row))
                }}
                sx={{ ml: 2 }}
            >
                Bölümler
            </Button>

            <ClassicDialog
                open={openEdit}
                setOpen={setOpenEdit}
                title="Fakülte Düzenle"
                subtitle=""
                size='md'
                actions={<Button variant="outlined" size="small" onClick={() => handleUpdate()} disabled={!values?.name}>FAKÜLTE DÜZENLE</Button>}
            >
                <FacultyForm
                    values={values}
                    setValues={setValues}
                    edit
                />
            </ClassicDialog>

            <DeleteDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title="Fakülteyi silmek istediğinize emin misiniz?"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default FacultiesActions