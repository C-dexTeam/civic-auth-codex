import { useEffect, useState } from 'react'
// ** MUI Imports
import { TextField, Autocomplete, FormHelperText, FormControl, Typography } from '@mui/material'
// ** Store && Actions && Hooks Imports
import countries from './countries'

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

  const HandleChange = props.handleChange // *
  const Values = props.values // *
  const GetOptionsByID = props.getOptionsByID || {} // *
  const Errors = props.errors

  const { CountryCode, CountryName } = Values ?? {}

  // ** States
  const [tmpCountry, setTmpCountry] = useState(null)
  const [InitControl, setInitControl] = useState(false)

  useEffect(() => {
    if (!InitControl) {
      if (
        (CountryCode !== null && CountryCode !== undefined) ||
        (GetOptionsByID?.CountryCode !== null && GetOptionsByID?.CountryCode !== undefined)
      ) {
        if (CountryName && CountryName !== '') setTmpCountry({ code: CountryCode, name: CountryName })
        setInitControl(true)
      }
    }
  }, [CountryCode])

  useEffect(() => {
    if (tmpCountry != null && tmpCountry.code != CountryCode) {
      HandleChange({
        CountryCode: tmpCountry.code,
        CountryName: tmpCountry.name,
      })
    }
  }, [tmpCountry])

  return (
    <>
      {label ? <Typography variant='body2' component="label" {...(_props?.error ? { color: "error" } : {})}>{label}{required ? "*" : ""}</Typography> : null}
      {description ? <Typography variant='caption2' component="span" {...(_props?.error ? { color: "error" } : {})}>{description}</Typography> : null}

      <Autocomplete
        {..._props}
        fullWidth
        openOnFocus
        value={tmpCountry}
        onChange={(event, newValue) => {
          setTmpCountry(newValue)
        }}
        options={countries ?? []}
        getOptionLabel={option => option?.name}
        isOptionEqualToValue={(option, value) => option?.code === value?.CountryCode}
        autoComplete="new-password"
        renderInput={params => <TextField
          {...params}
          error={Errors?.World ? Boolean(Errors?.World) : undefined}
        />
        }
      />

      {
        _props?.error &&
        <FormHelperText error>
          {_props?.error}
        </FormHelperText>
      }
    </>
  )
}

const DefaultCountryInput = (props) => {
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

export default DefaultCountryInput