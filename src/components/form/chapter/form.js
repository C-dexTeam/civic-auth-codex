import { Button, Grid, TextField, FormControlLabel, Checkbox, MenuItem, Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, getCourseCount, getCourses } from '@/store/admin/courses'
import { fetchRewards, getRewards } from '@/store/admin/rewards'
import { fetchLanguages, getLanguages } from '@/store/admin/languages'
import { validate } from '@/utils/validation'
import { showToast } from '@/utils/showToast'
import { chapterSchema } from '@/@local/table/form-values/chapter/defaultValues'
import DefaultTextField from '../components/DefaultTextField'
import DefaultSelect from '../components/DefaultSelect'

const ChapterForm = ({ values, setValues, handleSubmit: _handleSubmit, isEdit = false }) => {
    // ** States
    const [localErrors, setLocalErrors] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // ** Hooks
    const dispatch = useDispatch()
    const courses = useSelector(getCourses)
    const languages = useSelector(getLanguages)
    const rewards = useSelector(getRewards)

    // ** Effects
    useEffect(() => {
        dispatch(fetchCourses())
        dispatch(fetchLanguages())
        dispatch(fetchRewards())
    }, [])

    useEffect(() => {
        if (values) validate(chapterSchema, values, setIsSubmitted, setLocalErrors)
    }, [values])

    console.log(values);


    // ** Handlers
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if (localErrors && Object.keys(localErrors)?.length) {
            showToast("dismiss")
            showToast("error", "Lütfen gerekli alanları kontrol edin.")
            return
        }

        let chapterCount = courses?.find(course => course?.id == values?.courseID)?.chapterCount

        _handleSubmit({
            content: values.content,
            courseID: values.courseID,
            description: values.description,
            dockerTemplate: values.dockerTemplate,
            frontendTemplate: values.frontendTemplate,
            funcName: values.funcName,
            languageID: isEdit ? values.languageID : languages?.find(language => language.value == "EN")?.id,
            order: isEdit ? values.order : chapterCount + 1,
            rewardID: values.rewardID,
            title: values.title
        })
    }

    // ** Getters
    const getError = (field) => {
        return isSubmitted && localErrors?.[field] ? localErrors[field] : undefined
    }

    // ** Handlers
    const handleChange = (e) => {
        const { name, value, checked } = e.target

        setValues({
            ...values,
            [name]: e.target.type === 'checkbox' ? checked : value
        })
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <DefaultSelect
                    required
                    label="Course"
                    id='courseID'
                    firstSelect={"-- Select a course --"}
                    value={values?.courseID || ''}
                    onChange={e => setValues({ ...values, courseID: e.target.value })}
                    items={
                        courses && courses?.length > 0 &&
                        courses?.map((item, index) => {
                            return (
                                <MenuItem key={item?.id} value={item?.id}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", width: "100%" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            {item?.imagePath && (
                                                <img src={"/api/" + item?.imagePath} style={{ width: 40, height: 40, objectFit: 'contain' }} />
                                            )}

                                            <Typography variant='body' component="span">
                                                {item?.title}
                                            </Typography>
                                        </Box>

                                        <Typography variant='caption' component="span">
                                            {item?.chapterCount} chapters
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            )
                        })
                    }
                    error={getError('courseID')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultSelect
                    label="Reward"
                    id='rewardID'
                    firstSelect={"-- Select a reward --"}
                    value={values?.rewardID || ''}
                    onChange={e => setValues({ ...values, rewardID: e.target.value })}
                    items={
                        rewards && rewards?.length > 0 &&
                        rewards?.map((item, index) => {
                            return (
                                <MenuItem key={item?.id} value={item?.id}>
                                    {item?.title}
                                </MenuItem>
                            )
                        })
                    }
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    label="Title"
                    id='title'
                    name='title'
                    value={values?.title}
                    onChange={handleChange}
                    error={getError('title')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    label="Description"
                    id='description'
                    name='description'
                    value={values?.description}
                    onChange={handleChange}
                    error={getError('description')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    label="Content"
                    id='content'
                    name='content'
                    value={values?.content}
                    onChange={handleChange}
                    error={getError('content')}
                    multiline
                    rows={4}
                />
            </Grid>

            {
                !isEdit
                &&
                <Grid item xs={12}>
                    <DefaultTextField
                        fullWidth
                        required
                        label="Function Name"
                        id='funcName'
                        name='funcName'
                        value={values?.funcName}
                        onChange={handleChange}
                        error={getError('funcName')}
                    />
                </Grid>
            }

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    label="Frontend Template"
                    id='frontendTemplate'
                    name='frontendTemplate'
                    value={values?.frontendTemplate}
                    onChange={handleChange}
                    error={getError('frontendTemplate')}
                    multiline
                    rows={4}
                />
            </Grid>

            {
                !isEdit
                &&
                <Grid item xs={12}>
                    <DefaultTextField
                        fullWidth
                        required
                        label="Docker Template"
                        id='dockerTemplate'
                        name='dockerTemplate'
                        value={values?.dockerTemplate}
                        onChange={handleChange}
                        error={getError('dockerTemplate')}
                        multiline
                        rows={4}
                    />
                </Grid>
            }

            <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                    {isEdit ? 'Update' : 'Create'} Chapter
                </Button>
            </Grid>
        </Grid>
    )
}

export default ChapterForm