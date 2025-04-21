
import { styled } from '@mui/material/styles'

import {
    Typography,
} from '@mui/material'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(15.75)
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: 128,
    },
    maxHeight: 128,
    maxWidth: 256,
    height: 'auto',
    width: 'auto',
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4)
    }
}))

export {
    Img,
    HeadingTypography,
}