import { Box, Button, FormControl, Grid, MenuItem, Select, Typography, } from "@mui/material"
import DefaultTextField from "../components/DefaultTextField"
import { useEffect, useState } from "react"
import { validate } from "@/utils/validation"
import { showToast } from "@/utils/showToast"
import { useDispatch, useSelector } from "react-redux"
import { fetchRewards } from "@/store/admin/rewards"

// MUI Imports
import { styled } from '@mui/material/styles'
import MuiSlider from '@mui/material/Slider'
import DefaultSelect from "../components/DefaultSelect"
import { fetchLanguages, getLanguages } from "@/store/admin/languages"
import { planguageEditSchema, planguageSchema } from "@/@local/table/form-values/planguages/defaultValues"
import { fethcCompiler, getCompiler } from "@/store/admin/compiler"

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

const PlanguageForm = ({
    values,
    setValues,
    isEdit = false,
    handleSubmit: _handleSubmit,
    errors: propErrors
}) => {
    const [localErrors, setLocalErrors] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch()

    const defLanguages = useSelector(getLanguages)
    const compiler = useSelector(getCompiler)


    const handleSubmit = () => {
        setIsSubmitted(true);

        if (localErrors && Object.keys(localErrors)?.length) {
            console.log(localErrors, "localErrors")
            showToast("dismiss");
            showToast("error", "Lütfen gerekli alanları kontrol edin.");
            return;
        }

        if (propErrors?.length) {
            showToast("dismiss");
            showToast("error", "Lütfen gerekli alanları kontrol edin.");
            return;
        }
        _handleSubmit(values)

       
    };

    useEffect(() => {
        let data = {
            ...values,
        }
        if (data) validate(isEdit ? planguageEditSchema : planguageSchema, data, setIsSubmitted, setLocalErrors);

        dispatch(fetchLanguages())
        dispatch(fetchRewards())
        dispatch(fethcCompiler())
    }, [values]);

    const getError = (field) => {
        if (propErrors?.length) {
            const error = propErrors.find(err => err.field === field);
            return error?.error;
        }

        return isSubmitted && localErrors?.[field] ? localErrors[field] : undefined;
    };



    return (
        <Grid container spacing={0}>
            {getError('imageFile')}
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
                    required
                    error={getError('description')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    type="text"
                    name="monacoEditor"
                    label="Monaco Editor (example: javascript, python, etc.)"
                    value={values?.monacoEditor}
                    onChange={(e) =>
                        setValues({
                            ...values,
                            monacoEditor: e.target.value,
                        })
                    }
                    error={getError('monacoEditor')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    type="text"
                    name="fileExtention"
                    label="File Extention (example: .js, .py, etc.)"
                    value={values?.fileExtention}
                    onChange={(e) =>
                        setValues({
                            ...values,
                            fileExtention: e.target.value,
                        })
                    }
                    error={getError('fileExtention')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultSelect
                    required
                    label="Language"
                    id='languageID'
                    disabled ={isEdit}
                    firstSelect={"-- Select a language --"}
                    value={values?.languageID}
                    onChange={e => setValues({ ...values, languageID: e.target.value })}
                    items={
                        defLanguages && defLanguages?.length > 0 &&
                        defLanguages?.map((item, index) => {
                            return (
                                <MenuItem key={item?.id} value={item?.id}>
                                    {item?.value}
                                </MenuItem>
                            )
                        })
                    }
                    error={getError('languageID')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultSelect
                    required
                    label="Name"
                    id='name'
                    firstSelect={"-- Select a language --"}
                    value={values?.name}
                    onChange={e => setValues({ ...values, name: e.target.value })}
                    items={
                        compiler && compiler?.length > 0 && 
                       
                        compiler?.map((item, index) => {
                            return (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            )
                        })
                    }
                    error={getError('languageID')}
                />
            </Grid>


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

export default PlanguageForm