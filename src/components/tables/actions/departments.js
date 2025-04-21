import { Button, IconButton } from '@mui/material'
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ClassicDialog from 'src/components/dialogs/ClassicDialog'
import DeleteDialog from 'src/components/dialogs/DeleteDialog'
import DepartmentForm from 'src/components/form/department'
import { deleteDepartment, updateDepartment} from 'src/store/api/universities'

const DepartmentsActions = ({ row }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [values, setValues] = useState({
        name: row.name,
        universityCode: row.universityCode,
        facultyCode: row.facultyCode,
    })

    const dispatch = useDispatch()
    const router = useRouter()

    const handleUpdate = () => {
        dispatch(updateDepartment({ id: row.id, ...values }))
            .finally(() => setOpenEdit(false))
    }

    const handleDelete = () => {
        dispatch(deleteDepartment(row.id))
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
                title="Bölüm Düzenle"
                subtitle=""
                size='md'
                actions={<Button variant="outlined" size="small" onClick={() => handleUpdate()} disabled={!values?.name}>BÖLÜM DÜZENLE</Button>}
            >
                <DepartmentForm
                    values={values}
                    setValues={setValues}
                    edit
                />
            </ClassicDialog>

            <DeleteDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title="Bölümü silmek istediğinize emin misiniz?"
                handleDelete={handleDelete}
            />
        </>
    )
}

export default DepartmentsActions