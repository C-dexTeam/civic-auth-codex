// ** MUI Imports
import {
    Typography
} from "@mui/material"
import DepartmentsActions from "../actions/departments"

// ** Custom Components Imports
export const departmentsColumns = [
    {
        flex: 0.05,
        minWidth: 100,
        headerName: '',
        field: 'actions',
        renderCell: params => <DepartmentsActions row={params.row} />
    },
    {
        flex: 0.4,
        minWidth: 200,
        headerName: 'BÖLÜM ADI',
        field: 'name',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {row.name}
                </Typography>
            )
        }
    },
]