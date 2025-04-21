import { Box, FormControl, FormHelperText, TextField, Typography } from "@mui/material"

const Input = (props) => {
    let label = props.label
    let description = props.description
    let required = props.required

    // _props = props without label and description
    let _props = { ...props }
    delete _props.label
    delete _props.description
    delete _props.required
    delete _props.noMargin
    delete _props.noControl

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {label ? <Typography variant='body1' component="label" {...(_props?.error ? { color: "error" } : {})}>
                {label}
                {
                    required
                        ? <Typography component="span" sx={{ color: "error.main" }}>*</Typography>
                        : ""
                }
            </Typography> : null}
            {description ? <Typography variant='caption2' component="span" {...(_props?.error ? { color: "error" } : {})}>{description}</Typography> : null}

            <TextField {..._props} />

            {
                _props?.error &&
                <FormHelperText error>
                    {_props?.error}
                </FormHelperText>
            }
        </Box>
    )
}

const DefaultTextField = (props) => {
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

export default DefaultTextField