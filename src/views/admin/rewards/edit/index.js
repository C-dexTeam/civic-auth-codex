import { rewardValues } from "@/@local/table/form-values/reward/defaultValues"
import RewardForm from "@/components/form/reward/form"
import { fetchReward, getCurrentReward, setCurrentReward, updateReward } from "@/store/admin/rewards"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"

const RewardEdit = () => {
    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query

    // ** State
    const reward = useSelector(getCurrentReward)
    const setReward = v => dispatch(setCurrentReward(v))

    // ** Handlers
    const handleSubmit = (data) => {
        let formData = new FormData()

        formData.append('id', data.id);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('symbol', data.symbol);
        if (data.files.length > 0) {
            formData.append('imageFile', data.files[0]);
        } else {
            formData.append('imageFile', null);
        }

        dispatch(updateReward({
            formData,
            callback: () => router.replace('/admin/rewards')
        }))
    }

    // ** Effects
    useEffect(() => {
        if (id) dispatch(fetchReward(id))
    }, [id, dispatch])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Rewards', path: '/admin/rewards' },
                        { title: 'Edit Reward' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Edit Reward</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <RewardForm
                            values={reward}
                            setValues={setReward}
                            handleSubmit={data => handleSubmit(data)}
                            isEdit={true}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default RewardEdit 