import { useEffect, useState } from 'react'

const { Stack, Skeleton } = require('@mui/material')

const LoadingSkeleton = () => {
  const [windowWidth, setWindowWidth] = useState(700)
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Stack spacing={2}>
      {/*?Title */}
      <Skeleton variant="rounded" width={200} height={30} animation="wave" />
      <Skeleton
        variant="rounded"
        width={windowWidth * 0.7}
        height={35}
        animation="pulse"
      />
      <Skeleton
        variant="rounded"
        width={windowWidth * 0.6}
        height={30}
        animation="pulse"
      />
      <Skeleton
        variant="rounded"
        width={windowWidth * 0.7}
        height={35}
        animation="pulse"
      />
      <Skeleton
        variant="rounded"
        width={windowWidth * 0.6}
        height={30}
        animation="pulse"
      />
      <Skeleton
        variant="rounded"
        width={windowWidth * 0.7}
        height={35}
        animation="pulse"
      />
    </Stack>
  )
}

export default LoadingSkeleton
