import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ProfilePost from './ProfilePost'

const ProfilePosts = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setInterval(() => setIsLoading(false), 2000)
  }, [])

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)'
      }}
      gap={1}
      columnGap={1}
    >
      {
        isLoading
          ? (
              Array.from({ length: 5 }, (_, index) => (
                <VStack key={index} alignItems={'flex-start'} gap={4}>
                  <Skeleton w={'full'}>
                    <Box h='300px'>content wrapped</Box>
                  </Skeleton>
                </VStack>
              ))
            )
          : (
              <>
                <ProfilePost img='/img1.png' />
                <ProfilePost img='/img2.png' />
                <ProfilePost img='/img3.png' />
                <ProfilePost img='/img4.png' />
              </>
            )
      }

    </Grid>
  )
}

export default ProfilePosts
