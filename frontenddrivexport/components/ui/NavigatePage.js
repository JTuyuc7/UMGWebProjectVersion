import { paletColors } from '@/styles/StylesConstants'
import { NavigateNext } from '@mui/icons-material'
import { Box, Typography, Fab } from '@mui/material'

const NavigatePage = ({ title, buttonText, navigateHandler }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" color={paletColors.purple700}>
        {title}
      </Typography>
      <Fab
        variant="extended"
        color="secondary"
        onClick={navigateHandler}
        sx={{ my: 2 }}
      >
        <NavigateNext sx={{ mr: 1 }} />
        {buttonText}
      </Fab>
    </Box>
  )
}

export default NavigatePage
