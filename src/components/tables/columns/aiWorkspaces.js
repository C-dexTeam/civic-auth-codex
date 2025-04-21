// ** MUI Imports
import {
    Typography
} from "@mui/material"
import AiWorkspacesActions from "../actions/aiWorkspaces"

// ** Custom Components Imports
export const aiWorkspacesColumns = [
    {
        flex: 0.05,
        minWidth: 50,
        headerName: '',
        field: 'actions',
        renderCell: params => <AiWorkspacesActions row={params.row} />
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