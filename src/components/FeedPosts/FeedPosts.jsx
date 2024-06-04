import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'
import { InfoIcon } from '@chakra-ui/icons'

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts()

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {
        isLoading && [0, 1, 2, 3].map((_, index) => (
          <VStack key={index} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap={2} alignItems={'center'}>
              <SkeletonCircle size='10' />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} w={'200px'} />
                <Skeleton height={'10px'} w={'200px'} />
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={'500px'}>contents wrapped</Box>
            </Skeleton>
          </VStack>

        ))
      }
      { !isLoading && posts.length > 0 && (
        <>
          {
            posts.map(post => (
            <FeedPost key={post.id} post={post} />
            ))
          }
        </>
      )}

      { !isLoading && posts.length === 0 && (
        <>
        <VStack color={'white'}>
          <InfoIcon fontSize={'36px'} />
          <Text fontSize={'md'} >
            Looks like you don&apos;t have any friends.
          </Text>
          <Text>
            Stop coding and go make some !!
          </Text>
        </VStack>
        </>
      )}
    </Container>
  )
}

export default FeedPosts
