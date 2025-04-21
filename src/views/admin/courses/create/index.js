import { courseValues } from "@/@local/table/form-values/courses/defaultValues"
import CourseForm from "@/components/form/course/form"
import { createCourse } from "@/store/admin/courses"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"
import CourseCardPreview from "@/components/card/CourseCardPreview"

const CourseCreate = () => {
    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** State
    const [values, setValues] = useState(courseValues)

    // ** Handlers
    const handleSubmit = (data) => {
        let formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('languageID', data.languageID)
        formData.append('programmingLanguageID', data.programmingLanguageID)
        formData.append('rewardID', data.rewardID)
        formData.append('active', data.active)
        if (data?.files?.length > 0) {
            formData.append('imageFile', data.files[0])
        }

        dispatch(createCourse({
            formData,
            callback: () => router.replace('/admin/courses')
        }))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Courses', path: '/admin/courses' },
                        { title: 'Create Course' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Create Course</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <CourseForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={data => handleSubmit(data)}
                            isEdit={false}
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

export default CourseCreate 