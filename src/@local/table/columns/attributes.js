// ** MUI Imports
import { Box, Typography } from "@mui/material"
import CustomTooltip from "@/components/tooltip"
import AttributeActions from "../actions/attribute"
import { useDispatch, useSelector } from "react-redux"
import { fetchReward, getReward, getRewards } from "@/store/admin/rewards"
import { useEffect } from "react"

export const attributesColumns = [
    {
        flex: 0.1,
        minWidth: 120,
        headerName: "",
        field: "actions",
        renderCell: params => <AttributeActions row={params.row} />
    },
    {
        flex: 0.3,
        minWidth: 120,
        headerName: 'Value',
        field: 'value',
        renderCell: params => {
            const { row } = params

            return (
                <CustomTooltip title={row.value} placement='top'>
                    <Typography variant='body1' sx={{ cursor: 'default', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.value}
                    </Typography>
                </CustomTooltip>
            )
        }
    },
    {
        flex: 0.3,
        minWidth: 120,
        headerName: 'Trait Type',
        field: 'traitType',
        renderCell: params => {
            const { row } = params

            return (
                <CustomTooltip title={row.traitType} placement='top'>
                    <Typography variant='body1' sx={{ cursor: 'default', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.traitType}
                    </Typography>
                </CustomTooltip>
            )
        }
    },
    {
        flex: 0.3,
        minWidth: 120,
        headerName: 'Reward',
        field: 'rewardID',
        renderCell: params => {
            const { row } = params

            // ** State
            const dispatch = useDispatch()
            const reward = useSelector(getReward)

            // ** Effects
            useEffect(() => {
                dispatch(fetchReward(row.rewardID))
            }, [dispatch, row.rewardID])


            return (
                <CustomTooltip title={reward?.name} placement='top'>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src={`/api/${reward?.imagePath}`} alt={reward?.name} width={32} height={32} style={{ width: '2rem', height: '2rem' }} />
                        <Typography variant='body1' sx={{ cursor: 'default', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {reward?.name}
                        </Typography>
                    </Box>
                </CustomTooltip>
            )
        }
    }
]