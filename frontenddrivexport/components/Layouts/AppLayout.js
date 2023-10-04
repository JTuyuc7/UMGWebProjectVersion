import { HeaderComponent, SideBarNavigation } from '@/components/ui'
import { Box, Grid } from '@mui/material'
import { paletColors } from '@/styles/StylesConstants'

export const AppLayout = ({ children, title }) => {
  return (
    <>
      <HeaderComponent title={title} />
      <main style={{ backgroundColor: 'gray', flex: 1, height: '100vh' }}>
        <Grid container>
          <Grid
            item
            bgcolor={paletColors.purple700}
            xs={3}
            lg={2}
            sx={{ display: { xs: 'none', md: 'block' }, padding: 1 }}
          >
            <SideBarNavigation />
          </Grid>
          <Grid
            item
            xs
            bgcolor={'gainsboro'}
            sx={{ display: 'flex', flex: 1, height: '100vh', padding: 3 }}
          >
            {children}
          </Grid>
        </Grid>
      </main>
    </>
  )
}
