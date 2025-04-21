// ** MUI Imports
import {
    Typography
} from "@mui/material"
import { useSelector } from "react-redux"
import { getFilters } from "src/store/api/dictionary"
import DictionaryActions from "../actions/dictionary"
// ** Custom Components Imports
/**
 * 
              {
                id: 1,
                title: 'Haber 1',
                content: 'Haber 1 İçerik',
                created_at: '2021-10-10 10:10:10',
              }

 */
export const dictionaryColumns = [
    {
        flex: 0.05,
        minWidth: 100,
        headerName: '',
        field: 'actions',
        renderCell: params => <DictionaryActions row={params?.row} />
    },
    {
        flex: 0.15,
        minWidth: 220,
        headerName: 'KELİME',
        field: 'title',
        renderCell: params => {
            const { row } = params
            const filters = useSelector(getFilters)

            return (
                <Typography variant='body2' sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {
                        filters?.lang == 'en'
                            ? row.titleEN
                            : row.title
                    }
                </Typography>
            )
        }
    },
    {
        flex: 0.3,
        minWidth: 300,
        headerName: 'AÇIKLAMA',
        field: 'description',
        renderCell: params => {
            const { row } = params
            const filters = useSelector(getFilters)

            return (
                <Typography
                    variant='body2'
                    sx={{
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {
                        filters?.lang == 'en'
                            ? row.descriptionEN
                            : row.description
                    }
                </Typography>
            )
        }
    },
]