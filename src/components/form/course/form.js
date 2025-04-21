import { Box, Button, FormControl, Grid, MenuItem, Select, Typography, } from "@mui/material"
import FileUploaderSingle from "../components/FileUploaderSingle"
import DefaultTextField from "../components/DefaultTextField"
import { useEffect, useState } from "react"
import { validate } from "@/utils/validation"
import { showToast } from "@/utils/showToast"
import { courseSchema, courseEditSchema } from "@/@local/table/form-values/courses/defaultValues"
import { useDispatch, useSelector } from "react-redux"
import { getAllPlanguages, getProgrammingLanguages } from "@/store/planguages/planguagesSlice"
import { fetchRewards, getRewards } from "@/store/admin/rewards"

// MUI Imports
import { styled } from '@mui/material/styles'
import MuiSlider from '@mui/material/Slider'
import DefaultSelect from "../components/DefaultSelect"

const marks = [
    {
        value: 0
    },
    {
        value: 100
    }
]

// Styled Slider component
const Slider = styled(MuiSlider)(({ theme }) => ({
    height: 2,
    padding: '15px 0',
    color: theme.palette.primary.main,
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: theme.palette.border.light
    },
    '& .MuiSlider-track': {
        border: 'none'
    },
    '& .MuiSlider-mark': {
        width: 1,
        height: 8,
        backgroundColor: theme.palette.border.light,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor'
        }
    },
    '& .MuiSlider-thumb': {
        width: 16,
        height: 16,
        border: 'none',
        backgroundColor: theme.palette.common.white,
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02) !important',
            '@media (hover: none)': {
                boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'
            }
        }
    },
    '& .MuiSlider-valueLabel': {
        top: 8,
        fontSize: 12,
        fontWeight: 'normal',
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none'
        },
        '& *': {
            background: 'transparent',
            color: 'var(--mui-palette-common-black)',
            ...theme.applyStyles('dark', {
                color: 'var(--mui-palette-common-white)'
            })
        }
    }
}))

const CourseForm = ({
    values,
    setValues,
    isEdit = false,
    handleSubmit: _handleSubmit,
    errors: propErrors
}) => {
    const [localErrors, setLocalErrors] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [files, setFiles] = useState([])

    const dispatch = useDispatch()

    const programmingLanguages = useSelector(getProgrammingLanguages)
    const rewards = useSelector(getRewards)

    const handleSubmit = () => {
        setIsSubmitted(true);

        if (localErrors && Object.keys(localErrors)?.length) {
            showToast("dismiss");
            showToast("error", "Lütfen gerekli alanları kontrol edin.");
            return;
        }

        _handleSubmit({ ...values, files: files });
    };

    useEffect(() => {
        let data = {
            ...values,
            imageFile: files[0]
        }
        if (data) validate(isEdit ? courseEditSchema : courseSchema, data, setIsSubmitted, setLocalErrors);

        dispatch(getAllPlanguages())
        dispatch(fetchRewards())
    }, [values, files]);

    const getError = (field) => {
        if (propErrors?.length) {
            const error = propErrors.find(err => err.field === field);
            return error?.error;
        }

        return isSubmitted && localErrors?.[field] ? localErrors[field] : undefined;
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} sx={{ mb: "1rem" }}>
                <FileUploaderSingle
                    files={files}
                    setFiles={setFiles}
                    text="Upload a cover image for the course"
                    imgConfig={{ url: values?.imagePath ? "/api/" + values?.imagePath : null, size: "small" }}
                    error={getError('imageFile')}
                />
            </Grid>
            {getError('imageFile')}
            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    type="text"
                    name="title"
                    label="Title"
                    value={values?.title}
                    onChange={(e) =>
                        setValues({
                            ...values,
                            title: e.target.value,
                        })
                    }
                    required
                    error={getError('title')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    type="text"
                    name="description"
                    label="Description"
                    value={values?.description}
                    onChange={(e) =>
                        setValues({
                            ...values,
                            description: e.target.value,
                        })
                    }
                    error={getError('description')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultSelect
                    required
                    disabled={isEdit}
                    label="Programming Language"
                    id='programmingLanguageID'
                    firstSelect={"-- Select a programming language --"}
                    value={values?.programmingLanguageID || ''}
                    onChange={e => setValues({ ...values, programmingLanguageID: e.target.value })}
                    items={
                        programmingLanguages && programmingLanguages?.length > 0 &&
                        programmingLanguages?.map((item, index) => {
                            return (
                                <MenuItem key={item?.id} value={item?.id}>
                                    {item?.name}
                                </MenuItem>
                            )
                        })
                    }
                    error={getError('programmingLanguageID')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultSelect
                    required={!isEdit}
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
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <img src={"/api/" + item?.imagePath} style={{ maxHeight: "2rem" }} />
                                        {item?.name}
                                    </Box>
                                </MenuItem>
                            )
                        })
                    }
                    error={getError('rewardID')}
                />
            </Grid>

            {/* <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <Typography
                        variant='body1'
                        component="label"
                        {...(getError('rewardAmount') ? { color: "error" } : {})}
                        sx={{ mb: 2 }}
                    >
                        Reward Amount
                    </Typography>

                    <Slider
                        marks={marks}
                        value={values?.rewardAmount}
                        onChange={(event, newValue) => setValues({ ...values, rewardAmount: newValue })}
                        valueLabelDisplay='on'
                        aria-labelledby='customized-slider'
                    />
                </FormControl>
            </Grid> */}

            <Grid item xs={12}>
                <Box sx={{ textAlign: "end" }}>
                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default CourseForm