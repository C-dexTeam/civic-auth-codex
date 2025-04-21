import CourseForm from "@/components/form/course/form"
import { fetchCourse, getCourse, getErrors, updateCourse } from "@/store/admin/courses"
import { Card, CardContent, Grid, Typography, Box, Divider, Chip } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"
import CourseCardPreview from "@/components/card/CourseCardPreview"
import { planguageValues } from "@/@local/table/form-values/planguages/defaultValues"
import { fetchPlanguage, getPlanguage, updatePlanguages } from "@/store/admin/planguages"
import PlanguageForm from "@/components/form/planguages/form"

const PlanguageEdit = () => {
    const [values, setValues] = useState(planguageValues)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query

    const courseId = router.query

    const plangauge = useSelector(getPlanguage)
    const errors = useSelector(getErrors)

    useEffect(() => {
        if (id) {
            dispatch(fetchPlanguage(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (plangauge) {
            setValues({ ...values, ...plangauge })
            setLoading(false)
        }
    }, [plangauge])

    const handleSubmit = (dataMain) => {
        const data = {
            ...dataMain,
             courseId
        }
        dispatch(updatePlanguages({
            data,
            callback: () => router.replace("/admin/plangauge")
        }))
    }

    console.log("values", plangauge)

    if (loading) {
        return <Typography>Loading...</Typography>
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
            <Typography variant="h2" sx={{ mt: 2 }}>Edit Course</Typography>
        </Grid>

            <Grid item xs={12} md={12}>
                <Card>
                    <CardContent>
                        <PlanguageForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={handleSubmit}
                            isEdit={true}
                            errors={errors}
                        />
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}

export default PlanguageEdit 