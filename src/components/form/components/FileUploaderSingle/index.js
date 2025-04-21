// ** MUI Imports
import { CircularProgress, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Img } from './styled'
import { HighlightOff, Upload } from '@mui/icons-material'
import CustomTooltip from '@/components/tooltip'

const FileUploaderSingle = props => {
  const {
    title,
    files,
    setFiles,
    isRequired = false,
    secure = true,
    text = null,
    noText = false,
    imgConfig = {
      url: null,
      hidden: false,
      size: "medium",
    },
    error = null
  } = props

  if (files || typeof imgConfig?.url !== 'string') {
  } else {
    console.warn('Error in FileUploaderSingle: file exist')
    return null
  }

  // ** States
  const [Loading, setLoading] = useState(false)

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: secure
      ? {
        'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg', '.webp']
      }
      : {},
    onDrop: (acceptedFiles) => {
      setLoading(true)
      setFiles(acceptedFiles.map(file => Object.assign(file)))
      setLoading(false)
    },
  })

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const getImageSize = (size) => {
    switch (size) {
      case "small":
        return { maxWidth: 80, maxHeight: 64 }
      case "large":
        return { maxWidth: 320, maxHeight: 160 }
      default: // medium
        return { maxWidth: 240, maxHeight: 80 }
    }
  }

  const img = files?.length > 0 && files?.map((file, index) => {
    const imageSize = getImageSize(imgConfig?.size)
    return (
      <Box
        style={{
          width: 'auto',
          height: 'auto',
          right: 0,
          marginRight: 20,
          paddingTop: 10,
          paddingBottom: 10
        }}
        key={index}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <CustomTooltip title="Delete Uploaded File">
            <IconButton color='error' onClick={() => handleRemoveFile(file)}>
              <HighlightOff color='error' sx={{ width: "1.75rem", height: "1.75rem" }} />
            </IconButton>
          </CustomTooltip>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: imageSize.maxWidth,
              maxHeight: imageSize.maxHeight,
              padding: '0px 20px'
            }}
          >
            {file.type.includes('image') && (
              <img
                key={file.name}
                alt={file.name}
                className='single-file-image'
                src={URL.createObjectURL(file)}
              />
            )}
          </Box>

          <Typography
            variant='span'
            sx={{
              color: 'grey.600',
              maxWidth: imageSize.maxWidth,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {file.name}
          </Typography>
        </Box>
      </Box>
    )
  })

  return (
    <>
      <Box {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />

        <Typography variant='body' sx={{ width: '100%' }}>
          {
            isRequired
              ? (
                <Typography
                  variant='span'
                  sx={{
                    fontSize: '1.25rem',
                    color: 'secondary.main'
                  }}
                >
                  <sup>*</sup>{' '}
                </Typography>
              )
              : null
          }

          {title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: noText ? 'center' : 'space-between',
            backgroundImage: error ? `url("data:image/svg+xml,%3csvg width='99%' height='100%' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='99%' height='100%' fill='none' rx='8' ry='8' stroke='%23FF0000' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` : `url("data:image/svg+xml,%3csvg width='99%' height='100%' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='99%' height='100%' fill='none' rx='8' ry='8' stroke='%23DEE0E8FF' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
            padding: '1rem 2rem',
            cursor: 'alias',
            gap: '1rem',
          }}
        >
          <Box sx={{ display: "flex", gap: '1rem' }}>
            <Typography color='secondary'>
              <Upload />
            </Typography>

            {
              noText
                ? null
                : <>
                  <Box
                    sx={{
                      display: 'flex',
                      wordBreak: 'break-word',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    {
                      text
                        ? <Typography color='secondary'>{text}</Typography>
                        : <Typography color='secondary'>
                          <Link href='/' onClick={handleLinkClick}>
                            Click
                          </Link>

                          to upload a file from your computer
                        </Typography>
                    }
                  </Box>
                </>
            }
          </Box>

          {
            Loading
              ? <CircularProgress />
              : imgConfig?.url && imgConfig?.url != ''
                ? <CustomTooltip title="Current Image">
                  <Img alt='Logo' src={imgConfig?.url} style={{ ...getImageSize(imgConfig?.size) }} />
                </CustomTooltip>
                : null
          }
        </Box>

        {error && (
          <Typography color="error" variant="caption" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {
          imgConfig?.hidden
            ? null
            : <Box sx={{ position: 'relative' }}>{files?.length ? img : null}</Box>
        }
      </Box>
    </>
  )
}

export default FileUploaderSingle
