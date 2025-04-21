import { courseValues } from "@/@local/table/form-values/courses/defaultValues"
import CourseForm from "@/components/form/course/form"
import { fetchCourse, getCourse, getErrors, updateCourse } from "@/store/admin/courses"
import { Card, CardContent, Grid, Typography, Box, Divider, Chip } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"
import CourseCardPreview from "@/components/card/CourseCardPreview"

const CourseEdit = () => {
    const [values, setValues] = useState(courseValues)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query

    const course = useSelector(getCourse)
    const errors = useSelector(getErrors)

    useEffect(() => {
        if (id) {
            dispatch(fetchCourse(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (course) {
            setValues({ ...values, ...course })
            setLoading(false)
        }
    }, [course])

    const handleSubmit = (data) => {

        const formData = new FormData()

        formData.append('id', data.id)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('languageID', data.languageID)
        formData.append('programmingLanguageID', data.programmingLanguageID)
        formData.append('rewardID', data.rewardID)
        if (data?.files?.length > 0) {
            formData.append('imageFile', data.files[0]);
        } else {
            formData.append('imageFile', null);
        }

        dispatch(updateCourse({
            id,
            formData,
            callback: () => router.replace("/admin/courses")
        }))
    }

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Courses', path: '/admin/courses' },
                        { title: 'Edit Course' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Edit Course</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <CourseForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={handleSubmit}
                            isEdit={true}
                            errors={errors}
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <CourseCardPreview values={values} />
            </Grid>
        </Grid>
    )
}

export default CourseEdit 