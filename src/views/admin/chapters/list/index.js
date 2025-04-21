import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography, Pagination } from '@mui/material'
import { Add } from '@mui/icons-material'
import { fetchChapters, getChapters, updateChapter, getFilters, setFilters } from '@/store/admin/chapters'
import { arrayMove } from '@dnd-kit/sortable'
import { fetchCourse, getCourse } from '@/store/admin/courses'
import DefaultTextField from '@/components/form/components/DefaultTextField'
import SortableList from '@/components/dnd/SortableList'
import CustomBreadcrumbs from '@/components/breadcrumbs'
const CourseChaptersList = () => {
    // ** Hooks
    const router = useRouter()
    const dispatch = useDispatch()

    // ** States
    const filters = useSelector(getFilters)
    const _setFilters = v => dispatch(setFilters(v))

    // ** Selectors
    const chapters = useSelector(getChapters)
    const course = useSelector(getCourse)

    const handleSortEnd = (event) => {
        const { active, over } = event;

        if (active?.data?.current?.sortable?.index !== over?.data?.current?.sortable?.index) {
            const oldIndex = chapters.findIndex((item, index) => index === active?.data?.current?.sortable?.index);
            const newIndex = chapters.findIndex((item, index) => index === over?.data?.current?.sortable?.index);
            const newItems = arrayMove(chapters, oldIndex, newIndex);

            newItems?.forEach((item, index) => {
                dispatch(updateChapter({ ...item, order: index }))
            });
        }
    }

    // ** Effects
    useEffect(() => {
        if (router.query.id) {
            dispatch(fetchChapters())
            dispatch(fetchCourse(router.query.id))
        }
    }, [router.query.id, filters])

    return (
        <Box>
            <CustomBreadcrumbs
                titles={[
                    { title: 'Admin', path: '/admin' },
                    { title: 'Courses', path: '/admin/courses' },
                    { title: 'Create Course' }
                ]}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">
                    {course?.title} -
                    <Typography variant="h6">
                        {course?.chapterCount} chapters
                    </Typography>
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <DefaultTextField
                        value={filters.title}
                        onChange={(e) => _setFilters({ ...filters, title: e.target.value })}
                        noMargin
                        noControl
                        sx={{
                            height: "100%",
                            "& .MuiInputBase-root": {
                                height: "100%",
                            },
                        }}
                        placeholder="Search chapter"
                    />

                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<Add />}
                        onClick={() => router.push(`/admin/courses/${router.query.id}/chapters/create`)}
                    >
                        Create Chapter
                    </Button>
                </Box>
            </Box>

            <SortableList
                chapters={chapters}
                onSortEnd={handleSortEnd}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={Math.ceil(course?.chapterCount / filters.limit)}
                    page={filters.page}
                    onChange={(e, val) => _setFilters({ ...filters, page: val })}
                    variant='outlined'
                    shape='circular'
                    color='primary'
                />
            </Box>

            {/* <Popover
                open={Boolean(filterAnchor)}
                anchorEl={filterAnchor}
                onClose={handleFilterClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <ChapterFilter
                    filters={filters}
                    setFilters={setFilters}
                    onClose={handleFilterClose}
                />
            </Popover> */}
        </Box>
    )
}

export default CourseChaptersList