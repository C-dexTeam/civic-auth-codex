import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteCourse } from '@/store/admin/courses'
import { showToast } from '@/utils/showToast'

const DeleteDialog = ({ open, setOpen, title, handleDelete }) => {
    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = async () => {
        try {
            handleDelete()
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action cannot be undone. Are you sure you want to proceed?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color='secondary'>Cancel</Button>
                <Button onClick={handleConfirm} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog 