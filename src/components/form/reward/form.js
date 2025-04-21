import { Button, Grid, TextField, FormControlLabel, Checkbox } from '@mui/material'
import { useState, useEffect } from 'react'
import { validate } from '@/utils/validation'
import { showToast } from '@/utils/showToast'
import { rewardSchema } from '@/@local/table/form-values/reward/defaultValues'
import DefaultTextField from '../components/DefaultTextField'
import FileUploaderSingle from '../components/FileUploaderSingle'

const RewardForm = ({ values, setValues, handleSubmit: _handleSubmit, isEdit = false }) => {
    // ** States
    const [localErrors, setLocalErrors] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [files, setFiles] = useState([])

    // ** Validations
    useEffect(() => {
        if (values) validate(rewardSchema, values, setIsSubmitted, setLocalErrors)
    }, [values])

    // ** Handlers
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if (localErrors && Object.keys(localErrors)?.length) {
            showToast("dismiss")
            showToast("error", "Please check the required fields.")
            return
        }

        _handleSubmit({ ...values, files: files })
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
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: "1rem" }}>
                <FileUploaderSingle
                    files={files}
                    setFiles={setFiles}
                    text="Upload a cover image for the reward"
                    imgConfig={{ url: values?.imagePath ? "/api/" + values?.imagePath : null, size: "small" }}
                    error={getError('imageFile')}
                />
            </Grid>
            {getError('imageFile')}

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    label="Name"
                    id='name'
                    name='name'
                    value={values?.name}
                    onChange={handleChange}
                    error={getError('name')}
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
                    multiline
                    rows={4}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    label="Symbol"
                    id='symbol'
                    name='symbol'
                    value={values?.symbol}
                    onChange={handleChange}
                    error={getError('symbol')}
                />
            </Grid>

            {!isEdit && (
                <Grid item xs={12}>
                    <DefaultTextField
                        fullWidth
                        required
                        label="Seller Fee"
                        id='sellerFee'
                        name='sellerFee'
                        value={values?.sellerFee}
                        onChange={handleChange}
                        error={getError('sellerFee')}
                    />
                </Grid>
            )}

            {/* <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    required
                    label="URI"
                    id='uri'
                    name='uri'
                    value={values?.uri}
                    onChange={handleChange}
                    error={getError('uri')}
                />
            </Grid> */}

            {!isEdit && (
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="active"
                                checked={values?.active}
                                onChange={handleChange}
                            />
                        }
                        label="Active"
                    />
                </Grid>
            )}

            <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                    {isEdit ? 'Update' : 'Create'} Reward
                </Button>
            </Grid>
        </Grid>
    )
}

export default RewardForm 