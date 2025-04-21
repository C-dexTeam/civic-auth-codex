// ** MUI Imports
import {
    Typography
} from "@mui/material"
import UniversitiesActions from "../actions/universities"

// ** Custom Components Imports
export const universitiesColumns = [
    {
        flex: 0.05,
        minWidth: 220,
        headerName: '',
        field: 'actions',
        renderCell: params => <UniversitiesActions row={params.row} />
    },
    {
        flex: 0.1,
        minWidth: 100,
        headerName: 'ŞEHİR',
        field: 'city',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {row.city}
                </Typography>
            )
        }
    },
    {
        flex: 0.4,
        minWidth: 200,
        headerName: 'ÜNİVERSİTE ADI',
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
    {
        flex: 0.1,
        minWidth: 100,
        headerName: 'ÜNİVERSİTE TİPİ',
        field: 'type',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {row.type}
                </Typography>
            )
        }
    },
]