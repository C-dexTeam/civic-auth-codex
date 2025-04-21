import { FormControl, FormHelperText, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import tr from 'dayjs/locale/tr'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import PickersCustomInput from "src/components/form/components/PickersCustomInput"

const Input = (props) => {
    let label = props.label
    let description = props.description
    let required = props.required
    let minDate = props.minDate

    // _props = props without label and description
    let _props = { ...props }
    delete _props.label
    delete _props.description
    delete _props.required
    delete _props.noMargin
    delete _props.noControl
    delete _props.minDate

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false)

    useEffect(() => () => setOpenStartDatePicker(false), [])

    return (
        <>
            {label ? <Typography variant='subtitle2' component="label" {...(_props?.error ? { color: "error" } : {})}>{label}{required ? "*" : ""}</Typography> : null}
            {description ? <Typography variant='caption' component="span" {...(_props?.error ? { color: "error" } : {})}>{description}</Typography> : null}

            <LocalizationProvider dateAdapter={AdapterDayjs} locale={tr}>
                <DateTimePicker
                    {..._props}
                    open={openStartDatePicker}
                    onOpen={() => setOpenStartDatePicker(true)}
                    onClose={() => setOpenStartDatePicker(false)}
                    openTo='year'
                    inputProps={{ placeholder: 'gg.aa.yyyy hh:mm' }}
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                    format='DD.MM.YYYY HH:mm'
                    inputFormat='DD.MM.YYYY HH:mm'
                    mask='__.__.____ __:__'
                    renderInput={params => (
                        <>
                            <PickersCustomInput
                                {...params}
                                onClick={e => {
                                    setOpenStartDatePicker(true)
                                }}
                                autoComplete='off'
                            />
                        </>
                    )}
                    minDate={minDate}
                />
            </LocalizationProvider>

            {
                _props?.error &&
                <FormHelperText error>
                    {_props?.error}
                </FormHelperText>
            }
        </>
    )
}

const DefaultDatePicker = (props) => {
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

export default DefaultDatePicker