import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography, Button, Box, CardActions, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useRouter } from 'next/router';
import { Delete, DragIndicator, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteChapter } from '@/store/admin/chapters';

const DragHandle = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'grab',
            p: 1,
            '&:active': {
                cursor: 'grabbing'
            }
        }}
    >
        <DragIndicator sx={{ mb: -0.75, color: theme => theme.palette.border.light }} />
        <DragIndicator sx={{ mt: -0.75, color: theme => theme.palette.border.light }} />
        <DragIndicator sx={{ mt: -0.75, color: theme => theme.palette.border.light }} />
    </Box>
);

const DraggableChapter = ({ id, chapter }) => {

    // ** States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // ** Hooks
    const router = useRouter();
    const dispatch = useDispatch();

    // ** Sortable
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    };

    const handleDetailsClick = () => {
        router.push(`/admin/chapter/${chapter.id}`);
    };

    const handleDeleteClick = () => {
        dispatch(deleteChapter(chapter.id));
    };

    return (
        <>
            <Dialog
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
            >
                <DialogTitle>Delete Chapter</DialogTitle>

                <DialogContent>
                    <Typography>Are you sure you want to delete this chapter?</Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setIsDeleteModalOpen(false)} variant='empty' color='secondary'>Cancel</Button>
                    <Button onClick={handleDeleteClick} variant='outlined' color='error'>Delete</Button>
                </DialogActions>
            </Dialog>

            <Card
                style={style}
                sx={{
                    mb: 2,
                    display: 'flex',
                    opacity: isDragging ? 0.5 : 1,
                }}
            >
                <Box
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRight: theme => `1px solid ${theme.palette.border.secondary}`,
                        '&:hover': {
                            backgroundColor: theme => theme.palette.action.hover
                        }
                    }}
                >
                    <DragHandle />
                </Box>

                <CardContent sx={{ flex: 1, padding: "1rem !important" }}>
                    <Typography variant="subtitle">{chapter.title}</Typography>
                    <Typography variant="body">{chapter.description}</Typography>
                </CardContent>

                <CardActions flat>
                    <Button
                        onClick={handleDetailsClick}
                        variant='empty'
                        color='secondary'
                    >
                        <Edit sx={{ mr: 1 }} /> Edit
                    </Button>

                    <Button
                        onClick={() => setIsDeleteModalOpen(true)}
                        variant='empty'
                        color='secondary'
                    >
                        <Delete sx={{ mr: 1 }} /> Delete
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default DraggableChapter