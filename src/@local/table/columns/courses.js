// ** MUI Imports
import { showDatetime } from "@/utils/timeOptions"
import {
    Typography
} from "@mui/material"
import CourseActions from "../actions/course"
import CustomTooltip from "@/components/tooltip"

export const coursesColumns = [
    // {
    //     flex: 0.03,
    //     minWidth: 30,
    //     headerName: '',
    //     field: 'actions',
    //     renderCell: params => <SubscriptionsActions row={params?.row} />
    // },
    {
        flex: 0.1,
        minWidth: 152,
        headerName: "",
        field: "actions",
        renderCell: params => <CourseActions row={params.row} />
    },
    {
        flex: 0.1,
        minWidth: 50,
        headerName: 'Image',
        field: 'imagePath',
        renderCell: params => {
            const { row } = params

            return (
                <img src={"/api/" + row.imagePath} alt={row.title} style={{ width: "auto", height: "48px", maxWidth: "100%" }} />
            )
        }
    },
    {
        flex: 0.55,
        minWidth: 100,
        headerName: 'Title',
        field: 'title',
        renderCell: params => {
            const { row } = params

            return (
                <CustomTooltip title={row.title} placement='top'>
                    <Typography variant='body1' sx={{ cursor: 'default', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.title}
                    </Typography>
                </CustomTooltip>
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 40,
        headerName: 'Chapters',
        field: 'chapterCount',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body1' sx={{ cursor: 'default' }}>
                    {row.chapterCount ?? '0'}
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