// ** MUI Imports
import { showDatetime } from "@/utils/timeOptions"
import {
    Typography
} from "@mui/material"
import CustomTooltip from "@/components/tooltip"
import PlanguagesActions from "../actions/planguages"

export const planguageColumns = [
    {
        flex: 0.1,
        minWidth: 152,
        headerName: "",
        field: "actions",
        renderCell: params => <PlanguagesActions row={params.row} />
    },
    {
        flex: 0.3,
        minWidth: 60,
        headerName: 'Name',
        field: 'name',
        renderCell: params => {
            const { row } = params

            return (
                <CustomTooltip title={row.name} placement='top'>
                    <Typography variant='body1' sx={{ cursor: 'default', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.name}
                    </Typography>
                </CustomTooltip>
            )
        }
    },
    {
        flex: 0.45,
        minWidth: 70,
        headerName: 'Description',
        field: 'description',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body1' sx={{ cursor: 'default' }}>
                    {row.description?.length > 0 ? row.description : '-'}
                </Typography>
            )
        }
    },
    {
        flex: 0.15,
        minWidth: 40,
        headerName: 'Created At',
        field: 'createdAt',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body1' sx={{ cursor: 'default' }}>
                    {showDatetime(row.createdAt) ?? '-'}
                </Typography>
            )
        }
    },
]