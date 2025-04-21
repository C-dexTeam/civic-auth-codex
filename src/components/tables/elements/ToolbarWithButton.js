// ** MUI Imports
import { Button } from '@mui/material'

// ** Icons Imports
import DefaultSearchToolbar from 'src/components/tables/elements/DefaultSearchToolbar'

const ToolbarWithButton = props => {
  const { onClick, children } = props

  return (
    <DefaultSearchToolbar {...props}>
      <Button variant='outlined' onClick={onClick}>
        {children}
      </Button>
    </DefaultSearchToolbar>
  )
}

export default ToolbarWithButton
