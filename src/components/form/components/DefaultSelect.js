import { Box, FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material"

const Input = (props) => {
    let label = props.label
    let description = props.description
    let disabled = props.disabled
    let required = disabled ? false : props.required
    let firstSelect = props.firstSelect
    let items = props.items

    // _props = props without label and description
    let _props = { ...props }
    delete _props.label
    delete _props.description
    delete _props.required
    delete _props.noMargin
    delete _props.noControl
    delete _props.firstSelect
    delete _props.items

    return (
        <Box sx={{ display: "flex", flexDirection: "column", cursor: disabled ? "not-allowed" : "default" }}>
            {label ? <Typography variant='body1' component="label" {...(_props?.error ? { color: "error" } : disabled ? { color: "text.disabled" } : {})}>
                {label}
                {
                    required
                        ? <Typography component="span" sx={{ color: "error.main" }}>*</Typography>
                        : ""
                }
            </Typography> : null}
            {description ? <Typography variant='caption2' component="span" {...(_props?.error ? { color: "error" } : {})}>{description}</Typography> : null}

            <Select {..._props} displayEmpty>
                <MenuItem value='' disabled={true}>
                    <Typography variant='body1' component="span" sx={{ opacity: 0.7 }}>
                        {firstSelect}
                    </Typography>
                </MenuItem>

                {items}
            </Select>

            {
                _props?.error &&
                <FormHelperText error>
                    {_props?.error}
                </FormHelperText>
            }
        </Box>
    )
}

const DefaultSelect = (props) => {
    let noMargin = props.noMargin
    let noControl = props.noControl

    return (
        <>
            {
                noControl
                    ? <Input {...props} />
                    : <FormControl fullWidth sx={{ mb: noMargin ? undefined : 2 }}>
                        <Input {...props} />
                    </FormControl>
            }
        </>
    )
}

export default DefaultSelect