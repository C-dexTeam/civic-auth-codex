import { chapterValues } from "@/@local/table/form-values/chapter/defaultValues"
import ChapterForm from "@/components/form/chapter/form"
import { fetchChapter, getChapter, getCurrentChapter, getErrors, setCurrentChapter, updateChapter } from "@/store/admin/chapters"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomBreadcrumbs from "@/components/breadcrumbs"

const ChapterEdit = () => {
    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()
    const { chapterId } = router.query

    // ** State
    const chapter = useSelector(getCurrentChapter)
    const setChapter = v => dispatch(setCurrentChapter(v))

    // ** Handlers
    const handleSubmit = () => {
        dispatch(updateChapter({
            callback: () => router.replace(`/admin/courses/${formData.courseID}/chapters`)
        }))
    }

    // ** Effects
    useEffect(() => {
        if (chapterId) dispatch(fetchChapter({ id: chapterId }))
    }, [chapterId, dispatch])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <CustomBreadcrumbs
                    titles={[
                        { title: 'Admin', path: '/admin' },
                        { title: 'Courses', path: '/admin/courses' },
                        { title: 'Chapters', path: `/admin/courses/${chapter?.courseID}/chapters` },
                        { title: 'Edit Chapter' }
                    ]}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>Edit Chapter</Typography>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <ChapterForm
                            values={chapter}
                            setValues={setChapter}
                            handleSubmit={handleSubmit}
                            isEdit={true}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ChapterEdit 