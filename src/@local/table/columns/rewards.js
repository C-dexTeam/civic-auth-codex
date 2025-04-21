// ** MUI Imports
import {
    Typography
} from "@mui/material"
import CustomTooltip from "@/components/tooltip"
import RewardActions from "../actions/rewards"

export const rewardsColumns = [
    {
        flex: 0.1,
        minWidth: 120,
        headerName: "",
        field: "actions",
        renderCell: params => <RewardActions row={params.row} />
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
        flex: 0.4,
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
        flex: 0.5,
        minWidth: 120,
        headerName: 'Description',
        field: 'description',
        renderCell: params => {
            const { row } = params

            return (
                <Typography variant='body1' sx={{ cursor: 'default' }}>
                    {row.description ?? '-'}
                </Typography>
            )
        }
    },
]