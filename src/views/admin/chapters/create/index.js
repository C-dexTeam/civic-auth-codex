import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { createChapter } from '@/store/admin/chapters'
import { chapterValues } from '@/@local/table/form-values/chapter/defaultValues'
import ChapterForm from '@/components/form/chapter/form'
import CustomBreadcrumbs from '@/components/breadcrumbs'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'

const CreateChapter = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        ...chapterValues,
        courseID: router.query.id,
    })

    const handleSubmit = (data) => {
        dispatch(createChapter({ data, callback: () => router.replace("/admin/courses/${router.query.id}/chapters") }))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Courses', path: '/admin/courses' },
                        { title: 'Chapters', path: `/admin/courses/${router.query.id}/chapters` },
                        { title: 'Create Chapter' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Create Chapter</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <ChapterForm
                            values={values}
                            setValues={setValues}
                            handleSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>Course Chapters</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {values?.chapters?.map((chapter, index) => (
                                <Box key={chapter._id} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1,
                                    borderRadius: 1,
                                    bgcolor: 'background.default'
                                }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {index + 1}.
                                    </Typography>
                                    <Typography variant="body2">
                                        {chapter.title}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default CreateChapter