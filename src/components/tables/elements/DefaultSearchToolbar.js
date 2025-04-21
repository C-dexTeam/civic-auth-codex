// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { GridToolbarContainer } from '@mui/x-data-grid'
// ** Icons Imports
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import DefaultTextField from '@/components/form/components/DefaultTextField'

const StyledGridToolbarContainer = styled(GridToolbarContainer)({
  paddingTop: 2,
  paddingBottom: 2,
  marginBottom: 10,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
})

/**
 * 
 * @param {*} props 
 * @param children {Component} - Children @optional
 * @param value {String} - Search Value @required
 * @param onChange {Function} - @example (e) => setSearchText(e.target.value) @required
 * @param clearSearch {Function} - @example () => setSearchText('') @required
 */

const DefaultSearchToolbar = props => {
  const {
    children,
    value,
    onChange,
    clearSearch,
  } = props

  return (
    <StyledGridToolbarContainer>
      <Box>
        {children}
      </Box>
      <DefaultTextField
        variant='outlined'
        size='small'
        value={value}
        onChange={onChange}
        placeholder='Search…'
        InputProps={{
          startAdornment: <SearchOutlinedIcon />,
          endAdornment: (
            <IconButton title='Clear' aria-label='Clear' onClick={clearSearch}>
              <ClearOutlinedIcon fontSize='small' />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          m: theme => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider'
          },
          '& .MuiInputBase-input': {
            ml: 1,
          }
        }}
      />
    </StyledGridToolbarContainer>
  )
}

export default DefaultSearchToolbar
