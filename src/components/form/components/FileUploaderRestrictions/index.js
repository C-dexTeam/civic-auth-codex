// ** React Imports
import { Fragment, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { Img, HeadingTypography } from './styled'
import { CircularProgress, Link } from '@mui/material'

const fileSettingsVars = {
  maxFiles: 10,
  maxSize: 30000000
}

const FileUploaderContent = props => {
  const { title, files, setFiles, isRequired, secure, showUploadedFiles, error } = props

  isRequired = isRequired ?? false
  showUploadedFiles = showUploadedFiles ?? true
  secure = secure ?? true
  error = error ?? false

  // ** States
  const [Loading, setLoading] = useState(false)

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: fileSettingsVars.maxFiles,
    maxSize: fileSettingsVars.maxSize,
    accept: secure
      ? {
        'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg', '.webp']
      }
      : {},
    onDrop: acceptedFiles => {
      setLoading(true)
      setFiles(acceptedFiles.map(file => Object.assign(file)) ?? [])
      setLoading(false)
    },
    onDropRejected: () => {
      toast.error(
        `Her biri maksimum ${(Math.round(fileSettingsVars.maxSize / 100) / 10000).toFixed(1)} MB olmak üzere toplam ${fileSettingsVars.maxFiles} adet görsel yükleyebilirsiniz.`,
        {
          duration: 2000
        }
      )
    }
  })

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList =
    files?.length > 0 &&
    files?.map(file => (
      <ListItem key={file.name}>
        <div className='file-details'>
          <div className='file-preview'>{renderFilePreview(file)}</div>
          <div>
            <Typography className='file-name'>{file.name}</Typography>
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10 > 1000
                ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
            </Typography>
          </div>
        </div>
        <IconButton onClick={() => handleRemoveFile(file)}>
          <Close fontSize='small' />
        </IconButton>
      </ListItem>
    ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <Box {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px dashed',
            borderColor: error ? 'error.main' : 'grey.300',
            borderRadius: 1,
            padding: 5,
            cursor: 'alias'
          }}
        >
          <Img alt='Upload img' src='/kale/images/upload.png' />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: ['center', 'center', 'inherit'],
              wordBreak: 'break-word',
              width: '67%'
            }}
          >
            <HeadingTypography variant='h5'>
              {isRequired ? (
                <Typography
                  variant='span'
                  sx={{
                    fontSize: '1.25rem',
                    color: 'error.main'
                  }}
                >
                  <sup>*</sup>{' '}
                </Typography>
              ) : null}
              {title}
            </HeadingTypography>

            <Typography color='secondary'>
              Bilgisayarınızdan dosya yüklemek için sürükleyin veya{' '}
              <Link href='/' onClick={handleLinkClick}>
                tıklayın
              </Link>
            </Typography>

            <Typography color='secondary'>
              Her biri maksimum <b>{(Math.round(fileSettingsVars.maxSize / 100) / 10000).toFixed(1)} MB </b>
              olmak üzere toplam <b>{fileSettingsVars.maxFiles} adet</b> dosya yükleyebilirsiniz.
            </Typography>
          </Box>
        </Box>
      </Box>

      {
        Loading
          ? <CircularProgress />
          : files?.length && showUploadedFiles ? (
            <Fragment>
              <List>{fileList}</List>
              <div className='buttons'>
                <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                  HEPSİNİ SİL
                </Button>
              </div>
            </Fragment>
          ) : null}
    </Fragment>
  )
}

const FileUploaderRestrictions = props => {
  if (!props?.files) {
    console.warn(new Error('"Error in FileUploaderRestrictions: files variable exist"'))

    return null
  }

  return <FileUploaderContent {...props} />
}

export default FileUploaderRestrictions
