// ** MUI Imports
import {
    Typography
} from "@mui/material"
import FacultiesActions from "../actions/faculties"

// ** Custom Components Imports
export const facultiesColumns = [
    {
        flex: 0.05,
        minWidth: 220,
        headerName: '',
        field: 'actions',
        renderCell: params => <FacultiesActions row={params.row} />
    },
    {
        flex: 0.4,
        minWidth: 200,
        headerName: 'FAKÜLTE ADI',
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