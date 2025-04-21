import { Button, IconButton } from '@mui/material'
import { PencilOutline, TrashCanOutline } from 'mdi-material-ui'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ClassicDialog from 'src/components/dialogs/ClassicDialog'
import DeleteDialog from 'src/components/dialogs/DeleteDialog'
import DictionaryForm from 'src/components/form/dictionary/DictionaryForm'
import { deleteDictionary, updateDictionary } from 'src/store/api/dictionary'

const DictionaryActions = ({ row }) => {
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState(row)

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteDictionary(row.id))
            .finally(() => setOpenDelete(false))
    }

    const handleEdit = () => {
        dispatch(updateDictionary({
            title: values.title,
            titleEN: values.titleEN,
            description: values.description,
            descriptionEN: values.descriptionEN,
            id: values.id,
        }))
            .then(() => setOpen(false))
    }

    return (
        <>
            <IconButton size='small' onClick={() => setOpen(true)} color='warning'>
                <PencilOutline />
            </IconButton>

            <IconButton size='small' onClick={() => setOpenDelete(true)} color='error'>
                <TrashCanOutline />
            </IconButton>

            <DeleteDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title="Kelimeyi sözlükten silmek istediğinize emin misiniz?"
                handleDelete={handleDelete}
            />

            <ClassicDialog
                open={open}
                setOpen={setOpen}
                title="Kelime Düzenle"
                subtitle=""
                size='md'
                actions={
                    <>
                        <Button variant="outlined" size="small" onClick={() => handleEdit()}>KELİME DÜZENLE</Button>
                    </>
                }
            >
                <DictionaryForm
                    values={values}
                    setValues={setValues}
                />
            </ClassicDialog>
        </>
    )
}

export default DictionaryActions