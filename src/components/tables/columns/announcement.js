// ** MUI Imports
import {
    Typography
} from "@mui/material"
import CustomChip from "src/@core/components/chip"
import { showDatetime } from "src/@local-db/global/TimeOptions"
import AnnouncementActions from "../actions/announcement"
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
export const announcementColumns = [
    {
        flex: 0.05,
        minWidth: 100,
        headerName: '',
        field: 'actions',
        renderCell: params => <AnnouncementActions row={params?.row} />
    },
    {
        flex: 0.05,
        minWidth: 50,
        headerName: 'Kapak Fotoğrafı',
        field: 'coverImage',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    <img src={"/" + row.coverImage} alt="Kapak" style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }} />
                </Typography>
            )
        }
    },
    {
        flex: 0.15,
        minWidth: 150,
        headerName: 'BAŞLIK',
        field: 'title',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body2' sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.title}
                </Typography>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 200,
        headerName: 'AÇIKLAMA',
        field: 'description',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body2' sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.description}
                </Typography>
            )
        }
    },
    {
        flex: 0.075,
        minWidth: 100,
        headerName: 'DURUM',
        field: 'isDraft',
        renderCell: params => {
            const { row } = params

            return (
                <CustomChip
                    skin='light'
                    size='small'
                    label={row.isDraft ? `Taslak` : `Yayında`}
                    color={row.isDraft ? `warning` : `success`}
                    rounded
                />
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 100,
        headerName: 'OLUŞTURULMA TARİHİ',
        field: 'created_at',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body2' sx={{ color: 'text.primary' }}>
                    {showDatetime({ date: row.createdDate })}
                </Typography>
            )
        }
    },
]