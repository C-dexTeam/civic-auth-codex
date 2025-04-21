import { rewardValues } from "@/@local/table/form-values/reward/defaultValues"
import RewardForm from "@/components/form/reward/form"
import { createReward } from "@/store/admin/rewards"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"

const RewardCreate = () => {
    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** State
    const [values, setValues] = useState(rewardValues)

    // ** Handlers
    const handleSubmit = (data) => {
        console.log("qweqe", data);

        let formData = new FormData()

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('symbol', data.symbol);
        formData.append('sellerFee', data.sellerFee);
        if (data?.files?.length > 0) {
            formData.append('imageFile', data.files[0]);
        } else {
            formData.append('imageFile', null);
        }

        dispatch(createReward({
            formData,
            callback: () => router.replace('/admin/rewards')
        }))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Rewards', path: '/admin/rewards' },
                        { title: 'Create Reward' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Create Reward</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <RewardForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={data => handleSubmit(data)}
                            isEdit={false}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default RewardCreate