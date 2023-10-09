import { Grid } from "@mui/material"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export const ModalWrapper = ({ children }) => {
  return (
    <Grid
      container
      sx={{ ...style, width: { md: 500, lg: 600, xs: 300, sm: 400 } }}
    >
      <Grid item>{children}</Grid>
    </Grid>
  )
}
