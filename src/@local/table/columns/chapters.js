import { Box, Chip } from '@mui/material'
import { ChapterActions } from '@/@local/table/actions/chapter'

export const chaptersColumns = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'course',
        headerName: 'Course',
        flex: 1,
        minWidth: 150,
        valueGetter: (params) => params.row.course?.title || '-'
    },
    {
        field: 'language',
        headerName: 'Language',
        flex: 1,
        minWidth: 150,
        valueGetter: (params) => params.row.language?.name || '-'
    },
    {
        field: 'order',
        headerName: 'Order',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'reward',
        headerName: 'Reward',
        flex: 1,
        minWidth: 150,
        valueGetter: (params) => params.row.reward?.title || '-'
    },
    {
        field: 'grantsExperience',
        headerName: 'Grants Experience',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
            <Chip
                label={params.value ? 'Yes' : 'No'}
                color={params.value ? 'success' : 'error'}
                size="small"
            />
        )
    },
    {
        field: 'active',
        headerName: 'Status',
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
            <Chip
                label={params.value ? 'Active' : 'Inactive'}
                color={params.value ? 'success' : 'error'}
                size="small"
            />
        )
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        minWidth: 150,
        sortable: false,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <ChapterActions row={params.row} />
            </Box>
        )
    }
] 