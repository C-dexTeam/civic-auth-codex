// ** MUI Imports
import { CircularProgress, FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Upload } from 'mdi-material-ui'
import { useState } from 'react'
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Img } from './styled'

const FileUploaderBlock = props => {
  const {
    title,
    files,
    setFiles,
    imageUrl = null,
    isRequired = false,
    secure = true,
    hiddenImg = false,
    error = null
  } = props

  if (files || typeof imageUrl !== 'string') {
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

  const img = files.map((file, index) => {
    return (
      <Box
        style={{
          width: 'auto',
          height: 'auto',
          right: 0,
          //position: 'absolute',
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
          <Chip
            color='error'
            variant='outlined'
            onDelete={() => handleRemoveFile(file)}
            sx={{
              marginLeft: 2.8,
              display: 'flex',
              justifyContent: 'center',
              border: 0,
              padding: 0,
              '& .MuiChip-label': {
                padding: 0
              },
              '& .MuiChip-deleteIcon': {
                padding: 0
              }
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 250,
              maxHeight: 70,
              padding: '0px 20px'
            }}
          >
            {file.type.includes('image') && (
              <img
                key={file.name}
                alt={file.name}
                className='single-file-image'
                src={URL.createObjectURL(file)}
                style={{
                  maxWidth: 250,
                  maxHeight: 70
                }}
              />
            )}
          </Box>

          <Typography
            variant='span'
            sx={{
              color: 'grey.600',
              maxWidth: 250,
              // en fazla 2 satır göster kelime uzunsa ortasına ... koy
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
      <Box {...getRootProps({ className: 'dropzone' })} sx={{ width: '100%' }}>
        <input {...getInputProps()} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 1,
            padding: '10px 20px',
            cursor: 'alias',
            gap: '20px',
            backgroundColor: 'grey.100',
            border: '1px dashed #ccc',
            height: '150px',
            borderColor: error ? 'error.main' : "#ccc"
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'start' }}>
            <Upload />

            <Box
              sx={{
                display: 'flex',
                wordBreak: 'break-word',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant='bodyLarge' sx={{ width: '100%' }}>
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

              <Typography color='secondary'>
                Bilgisayarınızdan dosya yüklemek için sürükleyin veya{' '}

                <Link href='/' onClick={handleLinkClick}>
                  tıklayın
                </Link>
              </Typography>
            </Box>
          </Box>

          {
            Loading
              ? <CircularProgress />
              : imageUrl && imageUrl != '' ? <Img alt='Logo' src={imageUrl} /> : null
          }
        </Box>

        <FormHelperText error={error}>{error}</FormHelperText>
      </Box>

      {
        hiddenImg
          ? null
          : <Box sx={{ position: 'relative' }}>{files.length && !imageUrl ? img : null}</Box>
      }
    </>
  )
}

export default FileUploaderBlock
