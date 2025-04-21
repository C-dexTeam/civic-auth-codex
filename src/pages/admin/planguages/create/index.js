import CourseForm from "@/components/form/course/form"
import { createCourse } from "@/store/admin/courses"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"
import CourseCardPreview from "@/components/card/CourseCardPreview"
import { createPlanguages } from "@/store/admin/planguages"
import PlanguageForm from "@/components/form/planguages/form"
import { planguageValues } from "@/@local/table/form-values/planguages/defaultValues"

const PlanguageAdd = () => {
    const [values, setValues] = useState(planguageValues)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleSubmit = (formData) => {
        dispatch(createPlanguages({ formData, callback: () => router.replace("/admin/planguages") }))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Programming Languages', path: '/admin/planguages' },
                        { title: 'Create Course' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Create Course</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
                <Card>
                    <CardContent>
                        <PlanguageForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}

PlanguageAdd.acl = {
    action: 'read',
    permission: 'admin'
}
PlanguageAdd.admin = true
export default PlanguageAdd