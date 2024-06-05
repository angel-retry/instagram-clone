import { Box, Flex, Grid, Skeleton, Text, VStack } from '@chakra-ui/react'
import ProfilePost from './ProfilePost'
import useGetUserPosts from '../../hooks/useGetUserPosts'
import { useContext } from 'react'
import { TabContext } from '../../contexts/TabContext'

const ProfilePosts = () => {
  const { selectedTab } = useContext(TabContext)
  const { isLoading, posts } = useGetUserPosts(selectedTab)

  const noPostsFound = !isLoading && posts.length === 0

  if (noPostsFound) return <NoPostsFound />

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)'
      }}
      gap={3}
      columnGap={3}
    >
      {
        isLoading
          ? (
              Array.from({ length: 6 }, (_, index) => (
                <VStack key={index} alignItems={'flex-start'}>
                  <Skeleton w={'full'} aspectRatio={1 / 1}>
                    <Box>content wrapped</Box>
                  </Skeleton>
                </VStack>
              ))
            )
          : (
              <>
              {posts.map(post => (<ProfilePost key={post.id} post={post} />))}
              </>
            )
      }

    </Grid>
  )
}

export default ProfilePosts

const NoPostsFound = () => {
  return (
    <Flex flexDir={'column'} textAlign={'center'} mx={'auto'} mt={10}>
      <Text fontSize={'2xl'}>No Posts Found🤔</Text>
    </Flex>
  )
}
