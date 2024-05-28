import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

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
        isLoading && (
          Array.from({ length: 5 }, (_, index) => (
            <VStack key={index} alignItems={'flex-start'} gap={4}>
              <Skeleton w={'full'}>
                <Box h='300px'>content wrapped</Box>
              </Skeleton>
            </VStack>
          ))
        )
      }

    </Grid>
  )
}

export default ProfilePosts
