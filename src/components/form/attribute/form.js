import { Box, Button, Grid, MenuItem } from "@mui/material"
import DefaultTextField from "../components/DefaultTextField"
import DefaultSelect from "../components/DefaultSelect"
import { useEffect, useState } from "react"
import { validate } from "@/utils/validation"
import { showToast } from "@/utils/showToast"
import { attributeSchema, attributeEditSchema } from "@/@local/table/form-values/attributes/defaultValues"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'
import { getLoading } from "@/store/admin/attributes"
import { fetchRewards, getRewards } from "@/store/admin/rewards"

const AttributeForm = ({
    values,
    setValues,
    isEdit = false,
    handleSubmit: _handleSubmit,
    errors: propErrors
}) => {
    // ** States
    const [localErrors, setLocalErrors] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // ** Hooks
    const dispatch = useDispatch()
    const router = useRouter()

    // ** Selectors
    const loading = useSelector(getLoading)
    const rewards = useSelector(getRewards)

    // ** Effects
    useEffect(() => {
        if (values) validate(isEdit ? attributeEditSchema : attributeSchema, values, setIsSubmitted, setLocalErrors)
    }, [values])

    useEffect(() => {
        dispatch(fetchRewards())
    }, [])

    // ** Functions
    const getError = (field) => {
        if (propErrors?.length) {
            const error = propErrors.find(err => err.field === field)
            return error?.error
        }

        return isSubmitted && localErrors?.[field] ? localErrors[field] : undefined
    }

    // ** Handlers
    const handleSubmit = () => {
        setIsSubmitted(true)

        if (localErrors && Object.keys(localErrors)?.length) {
            showToast("dismiss")
            showToast("error", "Please check the required fields.")
            return
        }

        _handleSubmit(values)
    }

    return (
        <Grid container spacing={0}>
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

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    type="text"
                    name="traitType"
                    label="Trait Type"
                    value={values?.traitType}
                    onChange={(e) =>
                        setValues({
                            ...values,
                            traitType: e.target.value,
                        })
                    }
                    required
                    error={getError('traitType')}
                />
            </Grid>

            <Grid item xs={12}>
                <DefaultTextField
                    fullWidth
                    type="text"
                    name="value"
                    label="Value"
                    value={values?.value}
                    onChange={(e) =>
                        setValues({
                            ...values,
                            value: e.target.value,
                        })
                    }
                    required
                    error={getError('value')}
                />
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ textAlign: "end" }}>
                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AttributeForm