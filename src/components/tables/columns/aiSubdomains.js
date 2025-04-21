// ** MUI Imports
import {
    Typography
} from "@mui/material"
import AiSubdomainsActions from "../actions/aiSubdomains"

// ** Custom Components Imports
export const aiSubdomainsColumns = [
    {
        flex: 0.05,
        minWidth: 50,
        headerName: '',
        field: 'actions',
        renderCell: params => <AiSubdomainsActions row={params.row} />
    },
    {
        flex: 0.4,
        minWidth: 200,
        headerName: 'Alan adı',
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