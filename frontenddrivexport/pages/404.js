import NavigatePage from '@/components/ui/NavigatePage'
import { useRouter } from 'next/router'

import { Box } from '@mui/material'

const PageNotFound = () => {
  const router = useRouter()

  return (
    <>
      <Box
        sx={{ display: 'flex', flex: 1, height: '100vh'}}
      >
        <NavigatePage
          title={'Seems like the page your are looking for does not exist'}
          buttonText={'Go back'}
          navigateHandler={() => router.back()}
        />
      </Box>
    </>
  )
}


export default PageNotFound
